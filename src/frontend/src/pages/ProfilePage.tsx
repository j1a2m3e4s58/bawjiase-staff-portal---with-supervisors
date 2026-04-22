import { AppShell } from "@/components/AppShell";
import { BrandLoader } from "@/components/BrandLoader";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { PortalCard } from "@/components/PortalCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  type UpdateProfileRequest,
  apiGetMyProfile,
  apiUploadProfilePhotoFile,
  apiUpdateMyProfile,
  resolveStoredAssetUrl,
} from "@/lib/backend-client";
import { useAuth } from "@/store/auth";
import { BRANCHES, DEPARTMENTS } from "@/types";
import type { Role } from "@/types";
import { useRouter } from "@tanstack/react-router";
import {
  Building2,
  Calendar,
  Camera,
  CheckCircle2,
  ImageOff,
  LogOut,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Save,
  Shield,
  User,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ── IT Access Code for privilege escalation ────────────────────────────────────
const IT_ACCESS_CODE = "IT-2026";

// ── Helpers ────────────────────────────────────────────────────────────────────

function roleBadgeVariant(role: Role): "default" | "secondary" | "outline" {
  if (role === "SuperAdmin") return "default";
  if (role === "HRAdmin") return "secondary";
  return "outline";
}

function roleLabel(role: Role): string {
  if (role === "SuperAdmin") return "Super Admin";
  if (role === "HRAdmin") return "HR Admin";
  return "General Staff";
}

function formatDate(ts: bigint): string {
  return new Date(Number(ts)).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatLastSeen(ts: bigint): string {
  const diff = Date.now() - Number(ts);
  if (diff < 60000) return "Just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return formatDate(ts);
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// ── Profile Skeleton ───────────────────────────────────────────────────────────

function ProfileSkeleton() {
  return (
    <BrandLoader label="Loading profile..." compact />
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const { user, updateUser, logout } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(!user);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Form state
  const [fullname, setFullname] = useState(() => user?.fullname ?? "");
  const [phone, setPhone] = useState(() => user?.phone ?? "");
  const [department, setDepartment] = useState(() => user?.department ?? "");
  const [branch, setBranch] = useState(() => user?.branch ?? "");
  const [itCode, setItCode] = useState("");
  const [itCodeError, setItCodeError] = useState("");

  // Photo state
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [removePhoto, setRemovePhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isPrivileged = user?.role === "SuperAdmin" || user?.role === "HRAdmin";
  const isChangingToIT =
    isPrivileged && department === "IT" && user?.department !== "IT";

  // Load profile on mount
  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    setFullname(user.fullname);
    setPhone(user.phone);
    setDepartment(user.department);
    setBranch(user.branch);
    setIsLoading(false);

    let mounted = true;
    async function load() {
      if (!user) return;
      try {
        const profile = await apiGetMyProfile(user.id);
        if (!mounted) return;
        const resolvedProfile = profile ?? user;
        setFullname(resolvedProfile.fullname);
        setPhone(resolvedProfile.phone);
        setDepartment(resolvedProfile.department);
        setBranch(resolvedProfile.branch);
      } catch {
        if (!mounted) return;
        setFullname(user.fullname);
        setPhone(user.phone);
        setDepartment(user.department);
        setBranch(user.branch);
      }
    }
    void load();
    return () => {
      mounted = false;
    };
  }, [user]);

  useEffect(() => {
    return () => {
      if (photoPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  function handleAvatarClick() {
    if (isEditing) fileInputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Please keep profile photos under 10 MB");
      return;
    }
    if (photoPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(photoPreview);
    }
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
    setRemovePhoto(false);
  }

  function handleCancelEdit() {
    if (!user) return;
    setFullname(user.fullname);
    setPhone(user.phone);
    setDepartment(user.department);
    setBranch(user.branch);
    setItCode("");
    setItCodeError("");
    if (photoPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(photoPreview);
    }
    setPhotoPreview(null);
    setPhotoFile(null);
    setRemovePhoto(false);
    setIsEditing(false);
  }

  function handleRemovePhoto() {
    if (photoPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(photoPreview);
    }
    setPhotoPreview(null);
    setPhotoFile(null);
    setRemovePhoto(true);
  }

  async function handleSave() {
    if (!user) return;

    // IT access code validation
    if (isChangingToIT) {
      if (!itCode.trim()) {
        setItCodeError("IT access code is required");
        return;
      }
      if (itCode.trim() !== IT_ACCESS_CODE) {
        setItCodeError("Invalid IT access code");
        return;
      }
    }

    setIsSaving(true);
    try {
      const req: UpdateProfileRequest = {
        fullname: fullname.trim(),
        phone: phone.trim(),
      };

      if (isPrivileged) {
        req.department = department;
        req.branch = branch;
      }

      // If changing to IT dept with valid code → SuperAdmin
      if (isChangingToIT && itCode.trim() === IT_ACCESS_CODE) {
        req.department = "IT";
      }

      // Photo upload (placeholder — attach to imageFile field)
      if (photoFile) {
        const uploaded = await apiUploadProfilePhotoFile(photoFile);
        req.imageFile = `LOCAL:${uploaded.filename}`;
      } else if (removePhoto) {
        req.imageFile = null;
      }

      const result = await apiUpdateMyProfile(user.id, req);
      if ("ok" in result) {
        updateUser(result.ok);
        toast.success("Profile updated successfully");
        setIsEditing(false);
        setItCode("");
        setItCodeError("");
        setPhotoFile(null);
        if (photoPreview?.startsWith("blob:")) {
          URL.revokeObjectURL(photoPreview);
        }
        setPhotoPreview(null);
        setRemovePhoto(false);
      } else {
        toast.error(result.err ?? "Failed to update profile");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Profile could not be updated",
      );
    } finally {
      setIsSaving(false);
    }
  }

  function handleLogout() {
    logout();
    void router.navigate({ to: "/login", replace: true });
  }

  if (isLoading) {
    return (
      <AppShell>
        <ProfileSkeleton />
      </AppShell>
    );
  }

  if (!user) return null;

  const displayPhoto = removePhoto
    ? null
    : photoPreview ?? resolveStoredAssetUrl(user.imageFile);
  const initials = getInitials(user.fullname);

  return (
    <AppShell>
      <div
        className="max-w-2xl mx-auto space-y-6 pb-8"
        data-ocid="profile.page"
      >
        {/* ── Header Card: Avatar + Identity ── */}
        <PortalCard elevated data-ocid="profile.header.card">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <button
                type="button"
                aria-label="Change profile photo"
                onClick={handleAvatarClick}
                className={`group relative rounded-full transition-smooth ${
                  isEditing
                    ? "cursor-pointer ring-2 ring-primary/50 ring-offset-2 ring-offset-background"
                    : "cursor-default"
                }`}
                data-ocid="profile.avatar.upload_button"
              >
                <Avatar className="h-24 w-24">
                  {displayPhoto && (
                    <AvatarImage src={displayPhoto} alt={user.fullname} />
                  )}
                  <AvatarFallback className="bg-primary/20 text-primary text-2xl font-bold font-display">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <div className="absolute inset-0 rounded-full bg-foreground/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
                    <Camera className="h-6 w-6 text-background" />
                  </div>
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                data-ocid="profile.photo.input"
              />
              {isEditing && (displayPhoto || user.imageFile) ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-3 w-full gap-2 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={handleRemovePhoto}
                  data-ocid="profile.photo.remove_button"
                >
                  <ImageOff className="h-4 w-4" />
                  Remove Photo
                </Button>
              ) : null}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 text-center sm:text-left">
              <h1 className="font-display font-bold text-xl text-foreground truncate">
                {user.fullname}
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5 truncate">
                {user.email}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {user.position} · {user.department}
              </p>
              <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                <Badge variant={roleBadgeVariant(user.role)}>
                  <Shield className="h-3 w-3 mr-1" />
                  {roleLabel(user.role)}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <MapPin className="h-3 w-3 mr-1" />
                  {user.branch}
                </Badge>
                {user.isActive ? (
                  <Badge
                    variant="outline"
                    className="text-xs border-secondary text-secondary"
                  >
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="text-xs border-destructive text-destructive"
                  >
                    Inactive
                  </Badge>
                )}
              </div>
              <p className="text-[11px] text-muted-foreground mt-2">
                Last seen: {formatLastSeen(user.lastSeen)}
              </p>
            </div>

            {/* Edit toggle */}
            {!isEditing ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="flex-shrink-0 gap-1.5"
                data-ocid="profile.edit_button"
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </Button>
            ) : (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleCancelEdit}
                className="flex-shrink-0 gap-1.5 text-muted-foreground"
                data-ocid="profile.cancel_edit_button"
              >
                <X className="h-3.5 w-3.5" />
                Cancel
              </Button>
            )}
          </div>
        </PortalCard>

        {/* ── Edit Form ── */}
        <PortalCard
          title={isEditing ? "Edit Profile" : "Profile Details"}
          subtitle={isEditing ? "Update your personal information" : undefined}
          data-ocid="profile.edit.card"
        >
          <div className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <Label htmlFor="fullname" className="text-xs font-medium">
                Full Name
              </Label>
              {isEditing ? (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="fullname"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    className="pl-9 glass-input"
                    placeholder="Your full name"
                    data-ocid="profile.fullname.input"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/40 text-sm">
                  <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-foreground">{user.fullname}</span>
                </div>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-xs font-medium">
                Phone Number
              </Label>
              {isEditing ? (
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-9 glass-input"
                    placeholder="e.g. 0244123456"
                    data-ocid="profile.phone.input"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/40 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-foreground">{user.phone || "—"}</span>
                </div>
              )}
            </div>

            {/* Department (privileged only) */}
            {isPrivileged && (
              <div className="space-y-1.5">
                <Label htmlFor="department" className="text-xs font-medium">
                  Department
                </Label>
                {isEditing ? (
                  <Select
                    value={department}
                    onValueChange={(val) => {
                      setDepartment(val);
                      setItCode("");
                      setItCodeError("");
                    }}
                  >
                    <SelectTrigger
                      id="department"
                      className="glass-input"
                      data-ocid="profile.department.select"
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
                ) : (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/40 text-sm">
                    <Building2 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-foreground">{user.department}</span>
                  </div>
                )}
              </div>
            )}

            {/* IT Access Code (conditional) */}
            {isEditing && isChangingToIT && (
              <div className="space-y-1.5 p-3 rounded-lg border border-primary/30 bg-primary/5">
                <p className="text-xs text-primary font-medium">
                  You are changing to the IT department. An IT access code is
                  required — your role will be updated to Super Admin.
                </p>
                <Label htmlFor="itCode" className="text-xs font-medium">
                  IT Access Code
                </Label>
                <Input
                  id="itCode"
                  type="password"
                  value={itCode}
                  onChange={(e) => {
                    setItCode(e.target.value);
                    setItCodeError("");
                  }}
                  className="glass-input"
                  placeholder="Enter IT access code"
                  data-ocid="profile.it_code.input"
                />
                {itCodeError && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="profile.it_code.error_state"
                  >
                    {itCodeError}
                  </p>
                )}
              </div>
            )}

            {/* Branch (privileged only) */}
            {isPrivileged && (
              <div className="space-y-1.5">
                <Label htmlFor="branch" className="text-xs font-medium">
                  Branch
                </Label>
                {isEditing ? (
                  <Select value={branch} onValueChange={setBranch}>
                    <SelectTrigger
                      id="branch"
                      className="glass-input"
                      data-ocid="profile.branch.select"
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
                ) : (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/40 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-foreground">{user.branch}</span>
                  </div>
                )}
              </div>
            )}

            {/* Save button */}
            {isEditing && (
              <Button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="w-full gap-2 glass-button text-primary-foreground"
                data-ocid="profile.save_button"
              >
                {isSaving ? (
                  <>
                    <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Saving…
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            )}
          </div>
        </PortalCard>

        {/* ── Account Info (read-only) ── */}
        <PortalCard
          title="Account Information"
          subtitle="Read-only account details"
          data-ocid="profile.account.card"
        >
          <div className="space-y-3">
            <InfoRow
              icon={<Mail className="h-4 w-4" />}
              label="Email"
              value={user.email}
            />
            <Separator className="opacity-30" />
            <InfoRow
              icon={<Calendar className="h-4 w-4" />}
              label="Registered"
              value={formatDate(user.registrationTime)}
            />
            <Separator className="opacity-30" />
            <InfoRow
              icon={<Shield className="h-4 w-4" />}
              label="Role"
              value={roleLabel(user.role)}
            />
            <Separator className="opacity-30" />
            <InfoRow
              icon={<CheckCircle2 className="h-4 w-4" />}
              label="Account Status"
              value={
                user.isActive ? (
                  <span className="text-secondary font-medium">Active</span>
                ) : (
                  <span className="text-destructive font-medium">Inactive</span>
                )
              }
            />
            <Separator className="opacity-30" />
            <InfoRow
              icon={<CheckCircle2 className="h-4 w-4" />}
              label="Verified"
              value={user.isVerified ? "Yes" : "No"}
            />
          </div>
        </PortalCard>

        {/* ── Danger Zone: Logout ── */}
        <PortalCard data-ocid="profile.logout.card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Sign Out</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                You will be redirected to the login page
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              className="gap-2 border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive transition-smooth"
              onClick={() => setShowLogoutConfirm(true)}
              data-ocid="profile.logout_button"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </PortalCard>
      </div>

      {/* Logout confirmation dialog */}
      <ConfirmDialog
        open={showLogoutConfirm}
        onOpenChange={setShowLogoutConfirm}
        title="Sign out of BCB Staff Portal?"
        description="You will need to sign in again to access the portal."
        confirmLabel="Sign Out"
        cancelLabel="Stay Signed In"
        variant="destructive"
        onConfirm={handleLogout}
      />
    </AppShell>
  );
}

// ── InfoRow helper ─────────────────────────────────────────────────────────────

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 py-0.5">
      <span className="text-muted-foreground flex-shrink-0">{icon}</span>
      <span className="text-xs text-muted-foreground w-24 flex-shrink-0">
        {label}
      </span>
      <span className="text-sm text-foreground min-w-0 truncate">{value}</span>
    </div>
  );
}
