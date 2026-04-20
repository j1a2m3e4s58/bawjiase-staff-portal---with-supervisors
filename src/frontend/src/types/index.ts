// ── Enums / Constants ────────────────────────────────────────────────────────

export const DEPARTMENTS = [
  "IT",
  "HR",
<<<<<<< HEAD
=======
  "HEAD OFFICE",
  "BAWJIASE",
  "KASOA MAIN",
  "KASOA NEW MARKET",
  "ADEISO",
  "OFAAKOR",
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
  "BANKING OPERATIONS",
  "E-BANKING",
  "MICROFINANCE",
  "CREDIT",
  "RECOVERY",
  "SUSU",
  "COMPLIANCE",
  "AUDIT",
  "ADMIN",
] as const;

export const BRANCHES = [
  "HEAD OFFICE",
  "BAWJIASE",
  "ADEISO",
  "OFAAKOR",
  "KASOA NEW MARKET",
  "KASOA MAIN",
] as const;

export type Department = (typeof DEPARTMENTS)[number];
export type Branch = (typeof BRANCHES)[number];
export type Role = "GeneralStaff" | "HRAdmin" | "SuperAdmin";

// ── Core User ─────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  fullname: string;
  phone: string;
  email: string;
  role: Role;
  position: string;
  department: string;
  branch: string;
  imageFile: string | null;
  isActive: boolean;
  isVerified: boolean;
  lastSeen: bigint;
  registrationTime: bigint;
  isArchived: boolean;
}

// ── Announcements & Polls ─────────────────────────────────────────────────────

export interface PollOption {
  id: number;
  text: string;
  votes: number;
}

export interface Poll {
  id: number;
  question: string;
  options: PollOption[];
  totalVotes: number;
  userVotedOptionId: number | null;
  endDate: bigint | null;
  isActive: boolean;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
<<<<<<< HEAD
  category: string;
  imageUrl: string | null;
  fileUrl: string | null;
  attachmentName: string | null;
  allowDownload: boolean;
=======
  imageUrl: string | null;
  fileUrl: string | null;
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
  authorId: string;
  authorName: string;
  createdAt: bigint;
  updatedAt: bigint;
  isDismissed: boolean;
  isTrashed: boolean;
}

export interface AnnouncementWithPoll extends Announcement {
  poll: Poll | null;
}

// ── Notifications ─────────────────────────────────────────────────────────────

export type NotificationKind =
  | "announcement"
  | "poll"
  | "training"
  | "support"
  | "system";

export interface Notification {
  id: number;
  userId: string;
  kind: NotificationKind;
  title: string;
  message: string;
  linkTo: string | null;
  isRead: boolean;
  createdAt: bigint;
}

// ── Forms Centre ──────────────────────────────────────────────────────────────

export interface PortalForm {
  id: number;
  title: string;
  description: string;
  fileUrl: string;
  category: string;
  visibleTo: Role[];
<<<<<<< HEAD
  visibility?: "General" | "Department";
  department?: string | null;
=======
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
  createdAt: bigint;
  updatedAt: bigint;
}

// ── Training ──────────────────────────────────────────────────────────────────

export interface TrainingVideo {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string | null;
  duration: number;
  category: string;
  visibleTo: Role[];
<<<<<<< HEAD
  visibility?: "General" | "Department";
  department?: string | null;
  isMandatory?: boolean;
  allowDownload?: boolean;
  storageType?: "Drive" | "Local";
  driveRef?: string | null;
  localFilename?: string | null;
=======
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
  uploadedBy: string;
  uploadedAt: bigint;
  viewCount: number;
  isArchived: boolean;
}

export interface TrainingDocument {
  id: number;
  title: string;
  description: string;
  fileUrl: string;
  fileType: string;
  category: string;
  visibleTo: Role[];
<<<<<<< HEAD
  visibility?: "General" | "Department";
  department?: string | null;
  isMandatory?: boolean;
  allowDownload?: boolean;
  storageType?: "Drive" | "Local";
  driveRef?: string | null;
  localFilename?: string | null;
=======
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
  uploadedBy: string;
  uploadedAt: bigint;
  downloadCount: number;
  isArchived: boolean;
}

// ── IT Support ────────────────────────────────────────────────────────────────

export type IncidentStatus = "open" | "in_progress" | "resolved" | "closed";
export type IncidentPriority = "low" | "medium" | "high" | "critical";

export interface IncidentReport {
  id: number;
  reporterId: string;
  reporterName: string;
<<<<<<< HEAD
  agency?: string;
  contact?: string;
  issueCategory?: string;
=======
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
  subject: string;
  description: string;
  priority: IncidentPriority;
  status: IncidentStatus;
  assignedTo: string | null;
  resolution: string | null;
  createdAt: bigint;
  updatedAt: bigint;
}

export interface ProfileAmendment {
  id: number;
  requesterId: string;
  requesterName: string;
<<<<<<< HEAD
  fullname?: string;
  phone?: string;
  t24Username?: string;
  agency?: string;
  requestType?: string;
  newRole?: string;
  deptChange?: string;
  transferLocation?: string;
=======
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
  field: string;
  currentValue: string;
  requestedValue: string;
  reason: string;
<<<<<<< HEAD
  status: "pending" | "approved" | "rejected" | "resolved";
=======
  status: "pending" | "approved" | "rejected";
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
  reviewedBy: string | null;
  reviewNote: string | null;
  createdAt: bigint;
  updatedAt: bigint;
}

// ── Audit Logs ────────────────────────────────────────────────────────────────

export interface AuditLog {
  id: number;
  actorId: string;
  actorName: string;
  action: string;
  target: string;
  ipAddress: string;
  timestamp: bigint;
}

// ── Stats ─────────────────────────────────────────────────────────────────────

export interface StaffStats {
  total: number;
  active: number;
  archived: number;
  byDepartment: Record<string, number>;
  byBranch: Record<string, number>;
  byRole: Record<string, number>;
}

<<<<<<< HEAD
export interface DistributionPoint {
  name: string;
  value: number;
}

export interface DashboardOverview {
  totalStaff: number;
  activeBranches: number;
  openOperations: number;
  resolutionRate: number;
  resolvedCount: number;
  newsTotal: number;
  topBranch: string;
  topBranchCount: number;
  topDepartment: string;
  topDepartmentCount: number;
  branchDistribution: DistributionPoint[];
  departmentDistribution: DistributionPoint[];
  supportPending: number;
  supportResolved: number;
}

=======
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
// ── API Results ───────────────────────────────────────────────────────────────

export type ApiResult<T> = { ok: T } | { err: string };

export function isOk<T>(result: ApiResult<T>): result is { ok: T } {
  return "ok" in result;
}

export function unwrapOk<T>(result: ApiResult<T>): T {
  if (isOk(result)) return result.ok;
  throw new Error((result as { err: string }).err);
}
