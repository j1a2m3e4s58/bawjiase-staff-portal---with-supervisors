import { AppShell } from "@/components/AppShell";
import { ConfirmDialog } from "@/components/ConfirmDialog";
<<<<<<< HEAD
=======
import { useHasRole } from "@/components/RoleGuard";
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
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
<<<<<<< HEAD
import { useNavigate } from "@tanstack/react-router";
import {
  Archive,
  Building2,
  Mail,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  UserX,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

const IT_ACCESS_CODE = "BARB-IT-2026";
=======
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
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58

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

<<<<<<< HEAD
function isOnline(lastSeen: bigint): boolean {
  return lastSeen > BigInt(Date.now() - 5 * 60 * 1000);
}

function getInitials(fullname: string): string {
  return fullname
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function normalizeBranch(branch: string) {
  const upper = branch.trim().toUpperCase();
  return upper.includes("OFFAKOR") ? "OFAAKOR" : upper;
}

function formatLastSeen(ts: bigint): string {
  return new Date(Number(ts)).toLocaleString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function canManageDirectory(user: User | null) {
  return (
    user?.role === "SuperAdmin" ||
    user?.department === "IT" ||
    user?.department === "HR"
  );
}

function OnlineSummary({ staff }: { staff: User[] }) {
  const online = staff.filter((user) => isOnline(user.lastSeen));
  const byBranch = BRANCHES.reduce<Record<string, number>>((acc, branch) => {
    acc[branch] = online.filter(
      (user) => normalizeBranch(user.branch) === branch,
    ).length;
=======
// ── Online Status Summary ──────────────────────────────────────────────────────

function OnlineSummary({ staff }: { staff: User[] }) {
  const online = staff.filter((u) => isOnline(u.lastSeen));
  const byBranch = BRANCHES.reduce<Record<string, number>>((acc, b) => {
    acc[b] = online.filter((u) => u.branch === b).length;
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
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
<<<<<<< HEAD
      {BRANCHES.map((branch) => (
        <span
          key={branch}
          className="inline-flex items-center gap-1 rounded-full border border-border/60 px-2 py-1 text-xs text-muted-foreground"
        >
          <span className="font-medium">{branch}</span>
          <Badge
            variant={byBranch[branch] > 0 ? "default" : "outline"}
            className="h-5 min-w-5 justify-center rounded-full px-1 text-[10px]"
          >
            {byBranch[branch]}
          </Badge>
        </span>
      ))}
=======
      {BRANCHES.map((b) =>
        byBranch[b] > 0 ? (
          <span key={b} className="text-muted-foreground">
            · {byBranch[b]} in {b}
          </span>
        ) : null,
      )}
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
    </div>
  );
}

<<<<<<< HEAD
interface StaffCardProps {
  staff: User;
  canEdit: boolean;
  canSeeLastSeen: boolean;
=======
// ── Staff Card ─────────────────────────────────────────────────────────────────

interface StaffCardProps {
  staff: User;
  canEdit: boolean;
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
  isSelf: boolean;
  onEdit: (staff: User) => void;
  onArchive: (staff: User) => void;
  index: number;
}

function StaffCard({
  staff,
  canEdit,
<<<<<<< HEAD
  canSeeLastSeen,
=======
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
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
<<<<<<< HEAD
=======
      {/* Avatar + name row */}
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
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
<<<<<<< HEAD
          <span
            className={`absolute bottom-0 right-0 block w-3 h-3 rounded-full ring-2 ring-card ${
              online ? "bg-green-500" : "bg-destructive"
            }`}
            title={online ? "Online" : "Offline"}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <div className="font-semibold text-foreground text-sm truncate leading-tight">
              {staff.fullname}
            </div>
            {staff.isVerified && (
              <ShieldCheck
                className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0"
                aria-label="Verified staff"
              />
            )}
          </div>
          <div className="text-xs text-muted-foreground truncate mt-0.5">
            {staff.position || ROLE_LABELS[staff.role]}
          </div>
          <div
            className={`text-[11px] font-medium mt-1 ${
              online ? "text-emerald-500" : "text-destructive"
            }`}
          >
            {online ? "Online Now" : "Offline"}
            {!online && canSeeLastSeen && Number(staff.lastSeen) > 0
              ? ` . Left ${formatLastSeen(staff.lastSeen)}`
              : ""}
          </div>
        </div>

=======
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
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
        <Badge
          variant={ROLE_VARIANT[staff.role]}
          className="text-[10px] flex-shrink-0 mt-0.5"
        >
          {ROLE_LABELS[staff.role]}
        </Badge>
      </div>

<<<<<<< HEAD
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1 truncate">
          <Building2 className="h-3 w-3 flex-shrink-0" />
          <span className="truncate">{staff.department || "Other"}</span>
=======
      {/* Meta */}
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1 truncate">
          <Building2 className="h-3 w-3 flex-shrink-0" />
          <span className="truncate">{staff.department}</span>
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
        </span>
        <span className="flex items-center gap-1 truncate">
          <MapPin className="h-3 w-3 flex-shrink-0" />
          <span className="truncate">{staff.branch}</span>
        </span>
      </div>

<<<<<<< HEAD
      <div className="space-y-1.5 text-xs text-muted-foreground border-t border-border/30 pt-3">
        <a
          href={`mailto:${staff.email}`}
          className="flex items-center gap-2 hover:text-primary transition-colors"
        >
          <Mail className="h-3.5 w-3.5 text-primary flex-shrink-0" />
          <span className="truncate">{staff.email}</span>
        </a>
        <a
          href={`tel:${staff.phone}`}
          className="flex items-center gap-2 hover:text-primary transition-colors"
        >
          <Phone className="h-3.5 w-3.5 text-amber-500 flex-shrink-0" />
          <span className="truncate">{staff.phone}</span>
        </a>
      </div>

=======
      {/* Actions — admin only */}
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
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

<<<<<<< HEAD
=======
// ── Edit Staff Modal ───────────────────────────────────────────────────────────

>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
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
<<<<<<< HEAD
      setDepartment(staff.department || "ADMIN");
      setBranch(staff.branch || "HEAD OFFICE");
      setPosition(staff.position || "");
=======
      setDepartment(staff.department);
      setBranch(staff.branch);
      setPosition(staff.position);
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
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
<<<<<<< HEAD

    setSaving(true);
    const req: UpdateStaffRequest = {
      department,
      branch,
      position,
      accessCode: needsItCode ? itCode : undefined,
    };
    const result = await apiUpdateStaff(staff.id, req);
    setSaving(false);

=======
    setSaving(true);
    const req: UpdateStaffRequest = { department, branch, position };
    const result = await apiUpdateStaff(staff.id, req);
    setSaving(false);
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
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
<<<<<<< HEAD
          <DialogTitle>Update Staff Details</DialogTitle>
          <DialogDescription>
            Update position, branch, or department for {staff?.fullname}.
=======
          <DialogTitle>Edit Staff Member</DialogTitle>
          <DialogDescription>
            Update department, branch, or position for {staff?.fullname}.
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
<<<<<<< HEAD
            <Label htmlFor="edit-position">Position / Job Title</Label>
            <Input
              id="edit-position"
              placeholder="e.g. Teller, Loan Officer"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              data-ocid="directory.edit_staff.position.input"
            />
          </div>

=======
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

>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
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
<<<<<<< HEAD
                {BRANCHES.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
=======
                {BRANCHES.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
<<<<<<< HEAD
            <Label htmlFor="edit-dept">Department</Label>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger
                id="edit-dept"
                data-ocid="directory.edit_staff.department.select"
              >
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {DEPARTMENTS.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item === "IT" ? "IT (Restricted)" : item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {needsItCode && (
            <div className="space-y-1.5 rounded-lg border border-border/60 bg-muted/20 p-3">
              <Label htmlFor="edit-it-code">
                Department Access Code{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="edit-it-code"
                type="password"
                placeholder="Enter access code"
                value={itCode}
                onChange={(e) => setItCode(e.target.value)}
                data-ocid="directory.edit_staff.it_code.input"
              />
              <p className="text-xs text-muted-foreground">
                Required when promoting a user to IT/Super Admin.
              </p>
            </div>
          )}
=======
            <Label htmlFor="edit-position">Position</Label>
            <Input
              id="edit-position"
              placeholder="e.g. Teller, Loan Officer"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              data-ocid="directory.edit_staff.position.input"
            />
          </div>
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
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
<<<<<<< HEAD
            {saving ? "Saving..." : "Save Changes"}
=======
            {saving ? "Saving…" : "Save Changes"}
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

<<<<<<< HEAD
export default function DirectoryPage() {
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  const canEdit = canManageDirectory(currentUser);
=======
// ── Directory Page ─────────────────────────────────────────────────────────────

export default function DirectoryPage() {
  const { user: currentUser } = useAuth();
  const canEdit = useHasRole(["SuperAdmin", "HRAdmin"]);
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58

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
<<<<<<< HEAD
      (user) =>
        user.fullname.toLowerCase().includes(q) ||
        user.department.toLowerCase().includes(q) ||
        user.branch.toLowerCase().includes(q) ||
        user.position.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        user.phone.toLowerCase().includes(q),
=======
      (u) =>
        u.fullname.toLowerCase().includes(q) ||
        u.department.toLowerCase().includes(q) ||
        u.branch.toLowerCase().includes(q) ||
        u.position.toLowerCase().includes(q),
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
    );
  }, [staff, search]);

  const grouped = useMemo(() => {
    const map = new Map<string, User[]>();
<<<<<<< HEAD
    for (const user of filtered) {
      const department = user.department || "Other";
      if (!map.has(department)) map.set(department, []);
      map.get(department)!.push(user);
=======
    for (const u of filtered) {
      if (!map.has(u.department)) map.set(u.department, []);
      map.get(u.department)!.push(u);
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  function handleSaved(updated: User) {
<<<<<<< HEAD
    setStaff((prev) =>
      prev.map((member) => (member.id === updated.id ? updated : member)),
    );
=======
    setStaff((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
  }

  async function handleArchiveConfirm() {
    if (!archiveTarget) return;
<<<<<<< HEAD
    if (archiveTarget.id === currentUser?.id) {
      toast.error("You cannot archive yourself.");
      setArchiveTarget(null);
      return;
    }

    setArchiving(true);
    const result = await apiArchiveStaff(archiveTarget.id);
    setArchiving(false);

    if ("ok" in result) {
      toast.success(`${archiveTarget.fullname} moved to Past Staff records.`);
      setStaff((prev) => prev.filter((user) => user.id !== archiveTarget.id));
=======
    setArchiving(true);
    const result = await apiArchiveStaff(archiveTarget.id);
    setArchiving(false);
    if ("ok" in result) {
      toast.success(`${archiveTarget.fullname} has been archived`);
      setStaff((prev) => prev.filter((u) => u.id !== archiveTarget.id));
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
    } else {
      toast.error(result.err ?? "Failed to archive staff member");
    }
    setArchiveTarget(null);
  }

<<<<<<< HEAD
=======
  // Running index across all cards for deterministic data-ocid
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
  let cardIndex = 0;

  return (
    <AppShell>
      <div className="space-y-6 max-w-7xl mx-auto" data-ocid="directory.page">
<<<<<<< HEAD
=======
        {/* Header */}
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
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
<<<<<<< HEAD
          {canEdit && (
            <Button
              type="button"
              variant="outline"
              className="gap-2"
              onClick={() => navigate({ to: "/directory/past-staff" })}
              data-ocid="directory.past_staff_button"
            >
              <UserX className="h-4 w-4" />
              Past Staff
            </Button>
          )}
=======
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
<<<<<<< HEAD
            {Array.from({ length: 6 }, (_, index) => `sk-${index}`).map(
              (key) => (
                <SkeletonCard key={key} lines={2} hasAvatar />
              ),
            )}
          </div>
        ) : (
          <>
            {staff.length > 0 && <OnlineSummary staff={staff} />}

            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search staff directory..."
=======
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
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                data-ocid="directory.search_input"
              />
            </div>

<<<<<<< HEAD
=======
            {/* Grouped Results */}
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
            {grouped.length === 0 ? (
              <div
                className="text-center py-16 glass-card rounded-xl"
                data-ocid="directory.empty_state"
              >
                <Users className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
<<<<<<< HEAD
                <p className="text-foreground font-medium">
                  No staff match your search
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Try a different name, branch, department, email, or phone
                  number.
=======
                <p className="text-foreground font-medium">No staff found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {search
                    ? "Try a different search term"
                    : "No active staff members"}
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
                </p>
              </div>
            ) : (
              <div className="space-y-8">
<<<<<<< HEAD
                {grouped.map(([department, members]) => (
                  <section
                    key={department}
                    data-ocid={`directory.dept_section.${department.toLowerCase().replace(/\s+/g, "_")}`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-display font-semibold text-foreground text-sm uppercase tracking-wider">
                          {department}
=======
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
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
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

<<<<<<< HEAD
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                      {members.map((member) => {
                        const index = ++cardIndex;
=======
                    {/* Staff grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                      {members.map((member) => {
                        const idx = ++cardIndex;
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
                        return (
                          <StaffCard
                            key={member.id}
                            staff={member}
                            canEdit={canEdit}
<<<<<<< HEAD
                            canSeeLastSeen={canEdit}
                            isSelf={currentUser?.id === member.id}
                            onEdit={setEditTarget}
                            onArchive={setArchiveTarget}
                            index={index}
=======
                            isSelf={currentUser?.id === member.id}
                            onEdit={setEditTarget}
                            onArchive={setArchiveTarget}
                            index={idx}
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
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

<<<<<<< HEAD
=======
      {/* Edit Modal */}
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
      <EditStaffModal
        staff={editTarget}
        open={!!editTarget}
        onOpenChange={(open) => {
          if (!open) setEditTarget(null);
        }}
        onSaved={handleSaved}
      />

<<<<<<< HEAD
=======
      {/* Archive Confirm */}
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
      <ConfirmDialog
        open={!!archiveTarget}
        onOpenChange={(open) => {
          if (!open) setArchiveTarget(null);
        }}
<<<<<<< HEAD
        title="Remove Staff Member"
        description={`You are about to remove ${archiveTarget?.fullname} from the active directory and move the record to Past Staff.`}
        confirmLabel={archiving ? "Removing..." : "Yes, Remove"}
=======
        title="Archive Staff Member"
        description={`Are you sure you want to archive ${archiveTarget?.fullname}? They will be moved to Past Staff and lose portal access.`}
        confirmLabel={archiving ? "Archiving…" : "Archive"}
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
        cancelLabel="Cancel"
        variant="destructive"
        onConfirm={handleArchiveConfirm}
      />
    </AppShell>
  );
}
