import { AppShell } from "@/components/AppShell";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useHasRole } from "@/components/RoleGuard";
import { SkeletonCard } from "@/components/SkeletonCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type UpdateStaffRequest,
  apiArchiveStaff,
  apiGetActiveStaff,
  apiUpdateStaff,
} from "@/lib/backend-client";
import { useAuth } from "@/store/auth";
import { BRANCHES, DEPARTMENTS, type User } from "@/types";
import { Archive, Building2, MapPin, Search, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

// ── Helpers ────────────────────────────────────────────────────────────────────

function isOnline(lastSeen: bigint): boolean {
  const fiveMinutesAgo = BigInt(Date.now() - 5 * 60 * 1000);
  return lastSeen > fiveMinutesAgo;
}

function getInitials(fullname: string): string {
  return fullname
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const IT_ACCESS_CODE = "IT2024";

const ROLE_LABELS: Record<User["role"], string> = {
  SuperAdmin: "Super Admin",
  HRAdmin: "HR Admin",
  GeneralStaff: "Staff",
};

const ROLE_VARIANT: Record<User["role"], "default" | "secondary" | "outline"> =
  {
    SuperAdmin: "default",
    HRAdmin: "secondary",
    GeneralStaff: "outline",
  };

// ── Online Status Summary ──────────────────────────────────────────────────────

function OnlineSummary({ staff }: { staff: User[] }) {
  const online = staff.filter((u) => isOnline(u.lastSeen));
  const byBranch = BRANCHES.reduce<Record<string, number>>((acc, b) => {
    acc[b] = online.filter((u) => u.branch === b).length;
    return acc;
  }, {});

  return (
    <div
      className="flex flex-wrap items-center gap-2 glass-card rounded-xl px-4 py-3 text-sm"
      data-ocid="directory.online_summary"
    >
      <span className="flex items-center gap-1.5 font-semibold text-foreground">
        <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        {online.length} staff online
      </span>
      {BRANCHES.map((b) =>
        byBranch[b] > 0 ? (
          <span key={b} className="text-muted-foreground">
            · {byBranch[b]} in {b}
          </span>
        ) : null,
      )}
    </div>
  );
}

// ── Staff Card ─────────────────────────────────────────────────────────────────

interface StaffCardProps {
  staff: User;
  canEdit: boolean;
  isSelf: boolean;
  onEdit: (staff: User) => void;
  onArchive: (staff: User) => void;
  index: number;
}

function StaffCard({
  staff,
  canEdit,
  isSelf,
  onEdit,
  onArchive,
  index,
}: StaffCardProps) {
  const online = isOnline(staff.lastSeen);
  const initials = getInitials(staff.fullname);
  const canArchive = canEdit && !isSelf && staff.role !== "SuperAdmin";

  return (
    <div
      className="glass-card rounded-xl p-4 flex flex-col gap-3 hover:glass-card-elevated transition-smooth cursor-default group"
      data-ocid={`directory.staff_card.item.${index}`}
    >
      {/* Avatar + name row */}
      <div className="flex items-start gap-3">
        <div className="relative flex-shrink-0">
          <Avatar className="h-11 w-11 ring-2 ring-border/40">
            {staff.imageFile && (
              <AvatarImage src={staff.imageFile} alt={staff.fullname} />
            )}
            <AvatarFallback className="bg-primary/20 text-primary font-bold text-sm">
              {initials}
            </AvatarFallback>
          </Avatar>
          {online && (
            <span
              className="absolute bottom-0 right-0 block w-3 h-3 rounded-full bg-green-500 ring-2 ring-card"
              title="Online"
            />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-foreground text-sm truncate leading-tight">
            {staff.fullname}
          </div>
          <div className="text-xs text-muted-foreground truncate mt-0.5">
            {staff.position || "—"}
          </div>
        </div>
        <Badge
          variant={ROLE_VARIANT[staff.role]}
          className="text-[10px] flex-shrink-0 mt-0.5"
        >
          {ROLE_LABELS[staff.role]}
        </Badge>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1 truncate">
          <Building2 className="h-3 w-3 flex-shrink-0" />
          <span className="truncate">{staff.department}</span>
        </span>
        <span className="flex items-center gap-1 truncate">
          <MapPin className="h-3 w-3 flex-shrink-0" />
          <span className="truncate">{staff.branch}</span>
        </span>
      </div>

      {/* Actions — admin only */}
      {canEdit && (
        <div className="flex gap-2 pt-1 border-t border-border/30">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="flex-1 h-7 text-xs"
            onClick={() => onEdit(staff)}
            data-ocid={`directory.edit_button.${index}`}
          >
            Edit
          </Button>
          {canArchive && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => onArchive(staff)}
              data-ocid={`directory.archive_button.${index}`}
            >
              <Archive className="h-3.5 w-3.5 mr-1" />
              Archive
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

// ── Edit Staff Modal ───────────────────────────────────────────────────────────

interface EditStaffModalProps {
  staff: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: (updated: User) => void;
}

function EditStaffModal({
  staff,
  open,
  onOpenChange,
  onSaved,
}: EditStaffModalProps) {
  const [department, setDepartment] = useState("");
  const [branch, setBranch] = useState("");
  const [position, setPosition] = useState("");
  const [itCode, setItCode] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (staff) {
      setDepartment(staff.department);
      setBranch(staff.branch);
      setPosition(staff.position);
      setItCode("");
    }
  }, [staff]);

  const needsItCode = department === "IT" && staff?.department !== "IT";

  async function handleSave() {
    if (!staff) return;
    if (needsItCode && itCode !== IT_ACCESS_CODE) {
      toast.error("Invalid IT access code");
      return;
    }
    setSaving(true);
    const req: UpdateStaffRequest = { department, branch, position };
    const result = await apiUpdateStaff(staff.id, req);
    setSaving(false);
    if ("ok" in result) {
      toast.success("Staff member updated successfully");
      onSaved(result.ok);
      onOpenChange(false);
    } else {
      toast.error(result.err ?? "Failed to update staff member");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="glass-card-elevated sm:max-w-md"
        data-ocid="directory.edit_staff.dialog"
      >
        <DialogHeader>
          <DialogTitle>Edit Staff Member</DialogTitle>
          <DialogDescription>
            Update department, branch, or position for {staff?.fullname}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="edit-dept">Department</Label>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger
                id="edit-dept"
                data-ocid="directory.edit_staff.department.select"
              >
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {DEPARTMENTS.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {needsItCode && (
            <div className="space-y-1.5">
              <Label htmlFor="edit-it-code">
                IT Access Code <span className="text-destructive">*</span>
              </Label>
              <Input
                id="edit-it-code"
                type="password"
                placeholder="Enter IT department access code"
                value={itCode}
                onChange={(e) => setItCode(e.target.value)}
                data-ocid="directory.edit_staff.it_code.input"
              />
              <p className="text-xs text-muted-foreground">
                Required when assigning a staff member to the IT department.
              </p>
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="edit-branch">Branch</Label>
            <Select value={branch} onValueChange={setBranch}>
              <SelectTrigger
                id="edit-branch"
                data-ocid="directory.edit_staff.branch.select"
              >
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>
              <SelectContent>
                {BRANCHES.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-position">Position</Label>
            <Input
              id="edit-position"
              placeholder="e.g. Teller, Loan Officer"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              data-ocid="directory.edit_staff.position.input"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            data-ocid="directory.edit_staff.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={saving}
            data-ocid="directory.edit_staff.save_button"
          >
            {saving ? "Saving…" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ── Directory Page ─────────────────────────────────────────────────────────────

export default function DirectoryPage() {
  const { user: currentUser } = useAuth();
  const canEdit = useHasRole(["SuperAdmin", "HRAdmin"]);

  const [staff, setStaff] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editTarget, setEditTarget] = useState<User | null>(null);
  const [archiveTarget, setArchiveTarget] = useState<User | null>(null);
  const [archiving, setArchiving] = useState(false);

  useEffect(() => {
    void (async () => {
      const data = await apiGetActiveStaff();
      setStaff(data);
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return staff;
    return staff.filter(
      (u) =>
        u.fullname.toLowerCase().includes(q) ||
        u.department.toLowerCase().includes(q) ||
        u.branch.toLowerCase().includes(q) ||
        u.position.toLowerCase().includes(q),
    );
  }, [staff, search]);

  const grouped = useMemo(() => {
    const map = new Map<string, User[]>();
    for (const u of filtered) {
      if (!map.has(u.department)) map.set(u.department, []);
      map.get(u.department)!.push(u);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  function handleSaved(updated: User) {
    setStaff((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
  }

  async function handleArchiveConfirm() {
    if (!archiveTarget) return;
    setArchiving(true);
    const result = await apiArchiveStaff(archiveTarget.id);
    setArchiving(false);
    if ("ok" in result) {
      toast.success(`${archiveTarget.fullname} has been archived`);
      setStaff((prev) => prev.filter((u) => u.id !== archiveTarget.id));
    } else {
      toast.error(result.err ?? "Failed to archive staff member");
    }
    setArchiveTarget(null);
  }

  // Running index across all cards for deterministic data-ocid
  let cardIndex = 0;

  return (
    <AppShell>
      <div className="space-y-6 max-w-7xl mx-auto" data-ocid="directory.page">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              Staff Directory
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {staff.length} active staff member{staff.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }, (_, i) => `sk-${i}`).map((k) => (
              <SkeletonCard key={k} lines={2} hasAvatar />
            ))}
          </div>
        ) : (
          <>
            {/* Online Summary */}
            {staff.length > 0 && <OnlineSummary staff={staff} />}

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, department, or branch…"
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                data-ocid="directory.search_input"
              />
            </div>

            {/* Grouped Results */}
            {grouped.length === 0 ? (
              <div
                className="text-center py-16 glass-card rounded-xl"
                data-ocid="directory.empty_state"
              >
                <Users className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
                <p className="text-foreground font-medium">No staff found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {search
                    ? "Try a different search term"
                    : "No active staff members"}
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {grouped.map(([dept, members]) => (
                  <section
                    key={dept}
                    data-ocid={`directory.dept_section.${dept.toLowerCase().replace(/\s+/g, "_")}`}
                  >
                    {/* Dept header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-display font-semibold text-foreground text-sm uppercase tracking-wider">
                          {dept}
                        </span>
                        <Badge
                          variant="secondary"
                          className="text-xs tabular-nums"
                        >
                          {members.length}
                        </Badge>
                      </div>
                      <div className="flex-1 h-px bg-border/50" />
                    </div>

                    {/* Staff grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                      {members.map((member) => {
                        const idx = ++cardIndex;
                        return (
                          <StaffCard
                            key={member.id}
                            staff={member}
                            canEdit={canEdit}
                            isSelf={currentUser?.id === member.id}
                            onEdit={setEditTarget}
                            onArchive={setArchiveTarget}
                            index={idx}
                          />
                        );
                      })}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Edit Modal */}
      <EditStaffModal
        staff={editTarget}
        open={!!editTarget}
        onOpenChange={(open) => {
          if (!open) setEditTarget(null);
        }}
        onSaved={handleSaved}
      />

      {/* Archive Confirm */}
      <ConfirmDialog
        open={!!archiveTarget}
        onOpenChange={(open) => {
          if (!open) setArchiveTarget(null);
        }}
        title="Archive Staff Member"
        description={`Are you sure you want to archive ${archiveTarget?.fullname}? They will be moved to Past Staff and lose portal access.`}
        confirmLabel={archiving ? "Archiving…" : "Archive"}
        cancelLabel="Cancel"
        variant="destructive"
        onConfirm={handleArchiveConfirm}
      />
    </AppShell>
  );
}
