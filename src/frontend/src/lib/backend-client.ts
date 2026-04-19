/**
 * Typed API client for the Bawjiase Staff Portal backend.
 * Since the backend schema evolves via bindgen, we work with mock/local
 * implementations here to match the contract signatures.
 * All functions are designed to be swapped to real actor calls.
 */

import type {
  Announcement,
  AnnouncementWithPoll,
  ApiResult,
  AuditLog,
  IncidentReport,
  Notification,
  PortalForm,
  ProfileAmendment,
  StaffStats,
  TrainingDocument,
  TrainingVideo,
  User,
} from "../types";

// ── Helpers ───────────────────────────────────────────────────────────────────

function ok<T>(value: T): ApiResult<T> {
  return { ok: value };
}

function err<T>(message: string): ApiResult<T> {
  return { err: message };
}

// ── Auth / Registration ───────────────────────────────────────────────────────

export interface RegisterRequest {
  fullname: string;
  phone: string;
  email: string;
  passwordHash: string;
  role: string;
  position: string;
  department: string;
  branch: string;
  accessCode?: string;
}

export interface UpdateProfileRequest {
  fullname?: string;
  phone?: string;
  position?: string;
  department?: string;
  branch?: string;
  imageFile?: string;
}

export interface UpdateStaffRequest extends UpdateProfileRequest {
  role?: string;
  isActive?: boolean;
}

// Simulate backend calls — replace actor body when bindgen exposes methods

let _mockUsers: User[] = [
  {
    id: "mock-user-1",
    fullname: "Sarah Mensah",
    phone: "0244123456",
    email: "sarah.mensah@bawjiasearearuralbank.com",
    role: "SuperAdmin",
    position: "Branch Manager",
    department: "HEAD OFFICE",
    branch: "HEAD OFFICE",
    imageFile: null,
    isActive: true,
    isVerified: true,
    lastSeen: BigInt(Date.now()),
    registrationTime: BigInt(Date.now() - 86400000),
    isArchived: false,
  },
  {
    id: "mock-user-2",
    fullname: "Emmanuel Asante",
    phone: "0201987654",
    email: "e.asante@bawjiasearearuralbank.com",
    role: "HRAdmin",
    position: "HR Officer",
    department: "HR",
    branch: "BAWJIASE",
    imageFile: null,
    isActive: true,
    isVerified: true,
    lastSeen: BigInt(Date.now() - 3600000),
    registrationTime: BigInt(Date.now() - 172800000),
    isArchived: false,
  },
  {
    id: "mock-user-3",
    fullname: "Abena Ofori",
    phone: "0557234789",
    email: "a.ofori@bawjiasearearuralbank.com",
    role: "GeneralStaff",
    position: "Teller",
    department: "BANKING OPERATIONS",
    branch: "ADEISO",
    imageFile: null,
    isActive: true,
    isVerified: true,
    lastSeen: BigInt(Date.now() - 7200000),
    registrationTime: BigInt(Date.now() - 259200000),
    isArchived: false,
  },
];

let _pendingVerification: Record<string, User> = {};

export async function apiRegister(
  req: RegisterRequest,
): Promise<ApiResult<User>> {
  await delay(600);
  const existing = _mockUsers.find((u) => u.email === req.email);
  if (existing) return err("Email already registered");
  const newUser: User = {
    id: `user-${Date.now()}`,
    fullname: req.fullname,
    phone: req.phone,
    email: req.email,
    role: req.role as User["role"],
    position: req.position,
    department: req.department,
    branch: req.branch,
    imageFile: null,
    isActive: true,
    isVerified: false,
    lastSeen: BigInt(Date.now()),
    registrationTime: BigInt(Date.now()),
    isArchived: false,
  };
  _pendingVerification[req.email] = newUser;
  return ok(newUser);
}

export async function apiVerifyEmail(
  email: string,
  _code: string,
): Promise<ApiResult<null>> {
  await delay(400);
  const user = _pendingVerification[email];
  if (!user) return err("No pending verification for this email");
  user.isVerified = true;
  _mockUsers.push(user);
  delete _pendingVerification[email];
  return ok(null);
}

export async function apiResendCode(email: string): Promise<ApiResult<null>> {
  await delay(300);
  if (!_pendingVerification[email]) return err("Email not found");
  return ok(null);
}

export async function apiLogin(
  email: string,
  _passwordHash: string,
): Promise<ApiResult<User>> {
  await delay(700);
  const user = _mockUsers.find(
    (u) => u.email === email && !u.isArchived && u.isActive,
  );
  if (!user) return err("Invalid email or password");
  if (!user.isVerified) return err("Email not verified");
  user.lastSeen = BigInt(Date.now());
  return ok(user);
}

export async function apiLogout(): Promise<void> {
  await delay(200);
}

export async function apiRequestPasswordReset(
  email: string,
): Promise<ApiResult<string>> {
  await delay(500);
  const user = _mockUsers.find((u) => u.email === email);
  if (!user) return err("Email not found");
  return ok("Password reset link sent to your email");
}

export async function apiConfirmPasswordReset(
  _token: string,
  _newPasswordHash: string,
): Promise<ApiResult<null>> {
  await delay(500);
  return ok(null);
}

// ── Profile ───────────────────────────────────────────────────────────────────

export async function apiGetMyProfile(userId: string): Promise<User | null> {
  await delay(300);
  return _mockUsers.find((u) => u.id === userId) ?? null;
}

export async function apiUpdateMyProfile(
  userId: string,
  req: UpdateProfileRequest,
): Promise<ApiResult<User>> {
  await delay(400);
  const idx = _mockUsers.findIndex((u) => u.id === userId);
  if (idx < 0) return err("User not found");
  _mockUsers[idx] = { ..._mockUsers[idx], ...req };
  return ok(_mockUsers[idx]);
}

// ── Staff ─────────────────────────────────────────────────────────────────────

export async function apiGetActiveStaff(): Promise<User[]> {
  await delay(400);
  return _mockUsers.filter((u) => !u.isArchived && u.isActive);
}

export async function apiGetArchivedStaff(): Promise<User[]> {
  await delay(400);
  return _mockUsers.filter((u) => u.isArchived);
}

export async function apiGetStaffMember(userId: string): Promise<User | null> {
  await delay(200);
  return _mockUsers.find((u) => u.id === userId) ?? null;
}

export async function apiUpdateStaff(
  userId: string,
  req: UpdateStaffRequest,
): Promise<ApiResult<User>> {
  await delay(400);
  const idx = _mockUsers.findIndex((u) => u.id === userId);
  if (idx < 0) return err("Staff member not found");
  _mockUsers[idx] = { ..._mockUsers[idx], ...req } as User;
  return ok(_mockUsers[idx]);
}

export async function apiArchiveStaff(
  userId: string,
): Promise<ApiResult<null>> {
  await delay(300);
  const user = _mockUsers.find((u) => u.id === userId);
  if (!user) return err("Staff member not found");
  user.isArchived = true;
  user.isActive = false;
  return ok(null);
}

export async function apiRestoreStaff(
  userId: string,
): Promise<ApiResult<null>> {
  await delay(300);
  const user = _mockUsers.find((u) => u.id === userId);
  if (!user) return err("Staff member not found");
  user.isArchived = false;
  user.isActive = true;
  return ok(null);
}

export async function apiDeleteStaff(userId: string): Promise<ApiResult<null>> {
  await delay(300);
  const idx = _mockUsers.findIndex((u) => u.id === userId);
  if (idx < 0) return err("Staff member not found");
  _mockUsers.splice(idx, 1);
  return ok(null);
}

export async function apiGetStaffStats(): Promise<StaffStats> {
  await delay(300);
  const active = _mockUsers.filter((u) => !u.isArchived);
  const byDept: Record<string, number> = {};
  const byBranch: Record<string, number> = {};
  const byRole: Record<string, number> = {};
  for (const u of active) {
    byDept[u.department] = (byDept[u.department] ?? 0) + 1;
    byBranch[u.branch] = (byBranch[u.branch] ?? 0) + 1;
    byRole[u.role] = (byRole[u.role] ?? 0) + 1;
  }
  return {
    total: _mockUsers.length,
    active: active.length,
    archived: _mockUsers.filter((u) => u.isArchived).length,
    byDepartment: byDept,
    byBranch: byBranch,
    byRole: byRole,
  };
}

// ── Announcements ─────────────────────────────────────────────────────────────

const _announcements: AnnouncementWithPoll[] = [
  {
    id: 1,
    title: "BARB Annual General Meeting 2026",
    content:
      "All staff are cordially invited to the Annual General Meeting scheduled for Friday, 24 April 2026 at the Head Office auditorium at 10:00 AM. Attendance is mandatory for all department heads.",
    imageUrl: null,
    fileUrl: null,
    authorId: "mock-user-1",
    authorName: "Sarah Mensah",
    createdAt: BigInt(Date.now() - 86400000),
    updatedAt: BigInt(Date.now() - 86400000),
    isDismissed: false,
    isTrashed: false,
    poll: {
      id: 1,
      question: "Will you attend in person or virtually?",
      options: [
        { id: 1, text: "In Person", votes: 34 },
        { id: 2, text: "Virtually", votes: 12 },
        { id: 3, text: "I cannot attend", votes: 5 },
      ],
      totalVotes: 51,
      userVotedOptionId: null,
      endDate: BigInt(Date.now() + 259200000),
      isActive: true,
    },
  },
  {
    id: 2,
    title: "New Farm Loan Policy Effective May 2026",
    content:
      "The Credit Department has updated the farm loan policy. All loan officers should review the new guidelines before processing any farm loan applications from 1 May 2026.",
    imageUrl: null,
    fileUrl: null,
    authorId: "mock-user-1",
    authorName: "Sarah Mensah",
    createdAt: BigInt(Date.now() - 172800000),
    updatedAt: BigInt(Date.now() - 172800000),
    isDismissed: false,
    isTrashed: false,
    poll: null,
  },
  {
    id: 3,
    title: "Mandatory IT Security Training — All Staff",
    content:
      "The IT Department has scheduled a mandatory cybersecurity awareness training for all staff. Sessions will run from Monday to Wednesday next week. Please confirm your preferred session slot.",
    imageUrl: null,
    fileUrl: null,
    authorId: "mock-user-2",
    authorName: "Emmanuel Asante",
    createdAt: BigInt(Date.now() - 259200000),
    updatedAt: BigInt(Date.now() - 259200000),
    isDismissed: false,
    isTrashed: false,
    poll: null,
  },
];

export async function apiGetAnnouncements(): Promise<AnnouncementWithPoll[]> {
  await delay(400);
  return _announcements.filter((a) => !a.isTrashed);
}

export async function apiGetTrashedAnnouncements(): Promise<Announcement[]> {
  await delay(300);
  return _announcements.filter((a) => a.isTrashed);
}

// ── Notifications ─────────────────────────────────────────────────────────────

const _notifications: Notification[] = [
  {
    id: 1,
    userId: "mock-user-1",
    kind: "announcement",
    title: "New Announcement",
    message: "BARB Annual General Meeting 2026 has been posted",
    linkTo: "/announcements",
    isRead: false,
    createdAt: BigInt(Date.now() - 3600000),
  },
  {
    id: 2,
    userId: "mock-user-1",
    kind: "training",
    title: "New Training Material",
    message: "Cybersecurity Fundamentals course is now available",
    linkTo: "/training",
    isRead: false,
    createdAt: BigInt(Date.now() - 7200000),
  },
  {
    id: 3,
    userId: "mock-user-1",
    kind: "system",
    title: "Profile Updated",
    message: "Your profile information has been updated successfully",
    linkTo: "/profile",
    isRead: true,
    createdAt: BigInt(Date.now() - 86400000),
  },
];

export async function apiGetUnreadNotificationCount(): Promise<number> {
  await delay(200);
  return _notifications.filter((n) => !n.isRead).length;
}

export async function apiGetNotifications(): Promise<Notification[]> {
  await delay(300);
  return [..._notifications].sort(
    (a, b) => Number(b.createdAt) - Number(a.createdAt),
  );
}

export async function apiMarkNotificationRead(id: number): Promise<boolean> {
  await delay(150);
  const notif = _notifications.find((n) => n.id === id);
  if (notif) notif.isRead = true;
  return !!notif;
}

export async function apiMarkAllNotificationsRead(): Promise<void> {
  await delay(200);
  for (const n of _notifications) n.isRead = true;
}

// ── Forms Centre ──────────────────────────────────────────────────────────────

let _forms: PortalForm[] = [
  {
    id: 1,
    title: "Staff Leave Application Form",
    description: "Apply for annual, sick, or emergency leave",
    fileUrl: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs",
    category: "HR",
    visibleTo: ["GeneralStaff", "HRAdmin", "SuperAdmin"],
    createdAt: BigInt(Date.now() - 2592000000),
    updatedAt: BigInt(Date.now() - 2592000000),
  },
  {
    id: 2,
    title: "IT Incident Report Form",
    description: "Report hardware, software, or network issues",
    fileUrl: "1FgT9nPqR7sKdLmVwXzBaYcEhNjUoIpQr",
    category: "IT",
    visibleTo: ["GeneralStaff", "HRAdmin", "SuperAdmin"],
    createdAt: BigInt(Date.now() - 1728000000),
    updatedAt: BigInt(Date.now() - 1728000000),
  },
  {
    id: 3,
    title: "Profile Amendment Request",
    description: "Request changes to your staff profile information",
    fileUrl: "1KhJmNpQrStUvWxYzAbCdEfGhIjKlMnOp",
    category: "HR",
    visibleTo: ["GeneralStaff", "HRAdmin", "SuperAdmin"],
    createdAt: BigInt(Date.now() - 864000000),
    updatedAt: BigInt(Date.now() - 864000000),
  },
  {
    id: 4,
    title: "Loan Application — Staff Welfare",
    description: "Apply for a staff welfare loan through the credit department",
    fileUrl: "https://forms.office.com/r/BarbStaffWelfareForm",
    category: "Finance",
    visibleTo: ["GeneralStaff", "HRAdmin", "SuperAdmin"],
    createdAt: BigInt(Date.now() - 432000000),
    updatedAt: BigInt(Date.now() - 432000000),
  },
  {
    id: 5,
    title: "Branch Operations Daily Report",
    description: "End-of-day operations summary for branch managers",
    fileUrl: "1PqRsTuVwXyZaBcDeFgHiJkLmNoPqRsTu",
    category: "Operations",
    visibleTo: ["HRAdmin", "SuperAdmin"],
    createdAt: BigInt(Date.now() - 172800000),
    updatedAt: BigInt(Date.now() - 172800000),
  },
  {
    id: 6,
    title: "Staff Appraisal Form — Q2 2026",
    description: "Quarterly performance appraisal submission for all staff",
    fileUrl: "1VwXyZaBcDeFgHiJkLmNoPqRsTuVwXyZa",
    category: "General",
    visibleTo: ["GeneralStaff", "HRAdmin", "SuperAdmin"],
    createdAt: BigInt(Date.now() - 86400000),
    updatedAt: BigInt(Date.now() - 86400000),
  },
];

let _formIdCounter = _forms.length + 1;

export interface CreateFormRequest {
  title: string;
  description: string;
  fileUrl: string;
  category: string;
  visibleTo: PortalForm["visibleTo"];
}

export async function apiGetForms(): Promise<PortalForm[]> {
  await delay(350);
  return [..._forms].sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
}

export async function apiCreateForm(
  req: CreateFormRequest,
): Promise<ApiResult<PortalForm>> {
  await delay(400);
  const form: PortalForm = {
    id: _formIdCounter++,
    title: req.title,
    description: req.description,
    fileUrl: req.fileUrl,
    category: req.category,
    visibleTo: req.visibleTo,
    createdAt: BigInt(Date.now()),
    updatedAt: BigInt(Date.now()),
  };
  _forms.unshift(form);
  return ok(form);
}

export async function apiUpdateForm(
  id: number,
  req: Partial<CreateFormRequest>,
): Promise<ApiResult<PortalForm>> {
  await delay(350);
  const idx = _forms.findIndex((f) => f.id === id);
  if (idx < 0) return err("Form not found");
  _forms[idx] = { ..._forms[idx], ...req, updatedAt: BigInt(Date.now()) };
  return ok(_forms[idx]);
}

export async function apiDeleteForm(id: number): Promise<ApiResult<null>> {
  await delay(300);
  const idx = _forms.findIndex((f) => f.id === id);
  if (idx < 0) return err("Form not found");
  _forms.splice(idx, 1);
  return ok(null);
}

// ── Training ──────────────────────────────────────────────────────────────────

export interface UploadVideoRequest {
  title: string;
  description: string;
  videoUrl: string;
  storageType: "Drive" | "Local";
  visibility: "General" | "Department";
  department?: string;
  mandatory?: boolean;
  allowDownload?: boolean;
}

export interface UploadDocumentRequest {
  title: string;
  description: string;
  fileUrl: string;
  fileType: string;
  storageType: "Drive" | "Local";
  visibility: "General" | "Department";
  department?: string;
  mandatory?: boolean;
  allowDownload?: boolean;
}

export interface VideoProgress {
  videoId: number;
  progressPercent: number;
  isComplete: boolean;
  lastWatched: bigint;
}

export interface VideoWatchStat {
  videoId: number;
  title: string;
  totalWatched: number;
  completedCount: number;
}

export interface AdminTrainingOverview {
  totalVideos: number;
  totalDocuments: number;
  totalStaff: number;
  videoStats: {
    id: number;
    title: string;
    eligibleCount: number;
    watchedCount: number;
    completionPct: number;
    isMandatory: boolean;
    incompleteUsers: string[];
  }[];
  docStats: {
    id: number;
    title: string;
    eligibleCount: number;
    openedCount: number;
    openedPct: number;
    isMandatory: boolean;
  }[];
}

const _trainingVideos: TrainingVideo[] = [
  {
    id: 1,
    title: "Cybersecurity Fundamentals for Bank Staff",
    description:
      "Essential cybersecurity practices including phishing awareness, password management, and safe online banking protocols for all BARB staff.",
    videoUrl: "DRIVE:1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74",
    thumbnailUrl: null,
    duration: 1800,
    category: "IT Security",
    visibleTo: ["GeneralStaff", "HRAdmin", "SuperAdmin"],
    uploadedBy: "Emmanuel Asante",
    uploadedAt: BigInt(Date.now() - 604800000),
    viewCount: 42,
    isArchived: false,
  },
  {
    id: 2,
    title: "AML & KYC Compliance Training 2026",
    description:
      "Anti-Money Laundering and Know Your Customer procedures as per Bank of Ghana regulations. Mandatory for all customer-facing staff.",
    videoUrl: "DRIVE:1KhJmNpQrStUvWxYzAbCdEfGhIjKlMnOp5",
    thumbnailUrl: null,
    duration: 2700,
    category: "Compliance",
    visibleTo: ["GeneralStaff", "HRAdmin", "SuperAdmin"],
    uploadedBy: "Sarah Mensah",
    uploadedAt: BigInt(Date.now() - 1209600000),
    viewCount: 67,
    isArchived: false,
  },
  {
    id: 3,
    title: "T24 Core Banking System — Loan Modules",
    description:
      "Step-by-step guide to processing farm and personal loans in the T24 Core Banking System. Credit department staff only.",
    videoUrl: "DRIVE:1PqRsTuVwXyZaBcDeFgHiJkLmNoPqRsTu2",
    thumbnailUrl: null,
    duration: 3600,
    category: "Banking Operations",
    visibleTo: ["HRAdmin", "SuperAdmin"],
    uploadedBy: "Emmanuel Asante",
    uploadedAt: BigInt(Date.now() - 2592000000),
    viewCount: 18,
    isArchived: false,
  },
  {
    id: 4,
    title: "Customer Service Excellence — BARB Standards",
    description:
      "Delivering world-class service at every touchpoint: greeting, problem resolution, escalation, and feedback management.",
    videoUrl: "LOCAL:customer_service_excellence.mp4",
    thumbnailUrl: null,
    duration: 2100,
    category: "Customer Service",
    visibleTo: ["GeneralStaff", "HRAdmin", "SuperAdmin"],
    uploadedBy: "Sarah Mensah",
    uploadedAt: BigInt(Date.now() - 432000000),
    viewCount: 55,
    isArchived: false,
  },
];

const _trainingDocuments: TrainingDocument[] = [
  {
    id: 1,
    title: "BARB Staff Handbook 2026",
    description:
      "Comprehensive guide to BARB policies, procedures, benefits, and staff conduct expectations.",
    fileUrl: "DRIVE:1VwXyZaBcDeFgHiJkLmNoPqRsTuVwXyZaB",
    fileType: "application/pdf",
    category: "HR",
    visibleTo: ["GeneralStaff", "HRAdmin", "SuperAdmin"],
    uploadedBy: "Emmanuel Asante",
    uploadedAt: BigInt(Date.now() - 2592000000),
    downloadCount: 89,
    isArchived: false,
  },
  {
    id: 2,
    title: "Anti-Money Laundering Policy 2026",
    description:
      "Updated AML policy incorporating Bank of Ghana's latest directives. All staff must acknowledge receipt.",
    fileUrl: "DRIVE:1AbCdEfGhIjKlMnOpQrStUvWxYzAbCdEfG",
    fileType: "application/pdf",
    category: "Compliance",
    visibleTo: ["GeneralStaff", "HRAdmin", "SuperAdmin"],
    uploadedBy: "Sarah Mensah",
    uploadedAt: BigInt(Date.now() - 1209600000),
    downloadCount: 72,
    isArchived: false,
  },
  {
    id: 3,
    title: "Branch Operations Manual — KASOA Branches",
    description:
      "Daily operations checklist, cash handling procedures, and end-of-day reporting for KASOA MAIN and KASOA NEW MARKET.",
    fileUrl: "DRIVE:1HiJkLmNoPqRsTuVwXyZaBcDeFgHiJkLmN",
    fileType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    category: "Operations",
    visibleTo: ["HRAdmin", "SuperAdmin"],
    uploadedBy: "Sarah Mensah",
    uploadedAt: BigInt(Date.now() - 864000000),
    downloadCount: 23,
    isArchived: false,
  },
  {
    id: 4,
    title: "IT Security Policy — Password & Access Control",
    description:
      "Password requirements, system access protocols, and incident reporting guidelines for all BARB IT systems.",
    fileUrl: "DRIVE:1OpQrStUvWxYzAbCdEfGhIjKlMnOpQrStU",
    fileType: "application/pdf",
    category: "IT Security",
    visibleTo: ["GeneralStaff", "HRAdmin", "SuperAdmin"],
    uploadedBy: "Emmanuel Asante",
    uploadedAt: BigInt(Date.now() - 172800000),
    downloadCount: 61,
    isArchived: false,
  },
];

const _videoProgress: Record<string, VideoProgress> = {};
let _videoIdCounter = _trainingVideos.length + 1;
let _docIdCounter = _trainingDocuments.length + 1;

export async function apiGetTrainingVideos(): Promise<TrainingVideo[]> {
  await delay(400);
  return [..._trainingVideos].sort(
    (a, b) => Number(b.uploadedAt) - Number(a.uploadedAt),
  );
}

export async function apiGetTrainingVideo(
  id: number,
): Promise<TrainingVideo | null> {
  await delay(200);
  return _trainingVideos.find((v) => v.id === id) ?? null;
}

export async function apiUploadTrainingVideo(
  req: UploadVideoRequest,
): Promise<ApiResult<TrainingVideo>> {
  await delay(600);
  const video: TrainingVideo = {
    id: _videoIdCounter++,
    title: req.title,
    description: req.description,
    videoUrl: req.videoUrl,
    thumbnailUrl: null,
    duration: 0,
    category:
      req.visibility === "Department"
        ? (req.department ?? "General")
        : "General",
    visibleTo:
      req.visibility === "General"
        ? ["GeneralStaff", "HRAdmin", "SuperAdmin"]
        : ["HRAdmin", "SuperAdmin"],
    uploadedBy: "Current User",
    uploadedAt: BigInt(Date.now()),
    viewCount: 0,
    isArchived: false,
  };
  _trainingVideos.unshift(video);
  return ok(video);
}

export async function apiUpdateTrainingProgress(
  videoId: number,
  progressPercent: number,
): Promise<void> {
  await delay(100);
  const key = `user-mock-${videoId}`;
  _videoProgress[key] = {
    videoId,
    progressPercent,
    isComplete: progressPercent >= 98,
    lastWatched: BigInt(Date.now()),
  };
}

export async function apiGetMyVideoProgress(
  videoId: number,
): Promise<VideoProgress | null> {
  await delay(150);
  return _videoProgress[`user-mock-${videoId}`] ?? null;
}

export async function apiGetVideoWatchStats(): Promise<VideoWatchStat[]> {
  await delay(300);
  return _trainingVideos.map((v) => ({
    videoId: v.id,
    title: v.title,
    totalWatched: v.viewCount,
    completedCount: Math.floor(v.viewCount * 0.7),
  }));
}

export async function apiGetTrainingDocuments(): Promise<TrainingDocument[]> {
  await delay(400);
  return [..._trainingDocuments].sort(
    (a, b) => Number(b.uploadedAt) - Number(a.uploadedAt),
  );
}

export async function apiGetTrainingDocument(
  id: number,
): Promise<TrainingDocument | null> {
  await delay(200);
  return _trainingDocuments.find((d) => d.id === id) ?? null;
}

export async function apiUploadTrainingDocument(
  req: UploadDocumentRequest,
): Promise<ApiResult<TrainingDocument>> {
  await delay(600);
  const doc: TrainingDocument = {
    id: _docIdCounter++,
    title: req.title,
    description: req.description,
    fileUrl: req.fileUrl,
    fileType: req.fileType,
    category:
      req.visibility === "Department"
        ? (req.department ?? "General")
        : "General",
    visibleTo:
      req.visibility === "General"
        ? ["GeneralStaff", "HRAdmin", "SuperAdmin"]
        : ["HRAdmin", "SuperAdmin"],
    uploadedBy: "Current User",
    uploadedAt: BigInt(Date.now()),
    downloadCount: 0,
    isArchived: false,
  };
  _trainingDocuments.unshift(doc);
  return ok(doc);
}

export async function apiMarkDocumentOpened(id: number): Promise<void> {
  await delay(100);
  const doc = _trainingDocuments.find((d) => d.id === id);
  if (doc) doc.downloadCount += 1;
}

export async function apiGetDocumentViewStats(): Promise<
  { docId: number; title: string; openedCount: number }[]
> {
  await delay(300);
  return _trainingDocuments.map((d) => ({
    docId: d.id,
    title: d.title,
    openedCount: d.downloadCount,
  }));
}

export async function apiGetAdminTrainingOverview(): Promise<AdminTrainingOverview> {
  await delay(500);
  const totalStaff = _mockUsers.filter((u) => !u.isArchived).length;
  return {
    totalVideos: _trainingVideos.filter((v) => !v.isArchived).length,
    totalDocuments: _trainingDocuments.filter((d) => !d.isArchived).length,
    totalStaff,
    videoStats: _trainingVideos
      .filter((v) => !v.isArchived)
      .map((v) => ({
        id: v.id,
        title: v.title,
        eligibleCount:
          v.visibleTo.length >= 3 ? totalStaff : Math.floor(totalStaff * 0.5),
        watchedCount: v.viewCount,
        completionPct:
          v.viewCount > 0 ? Math.min((v.viewCount / totalStaff) * 100, 100) : 0,
        isMandatory: v.visibleTo.length >= 3,
        incompleteUsers:
          v.viewCount < totalStaff
            ? _mockUsers
                .slice(0, Math.max(0, totalStaff - v.viewCount))
                .map((u) => u.fullname)
            : [],
      })),
    docStats: _trainingDocuments
      .filter((d) => !d.isArchived)
      .map((d) => ({
        id: d.id,
        title: d.title,
        eligibleCount:
          d.visibleTo.length >= 3 ? totalStaff : Math.floor(totalStaff * 0.5),
        openedCount: d.downloadCount,
        openedPct:
          d.downloadCount > 0
            ? Math.min((d.downloadCount / totalStaff) * 100, 100)
            : 0,
        isMandatory: d.visibleTo.length >= 3,
      })),
  };
}

export async function apiArchiveTrainingVideo(
  id: number,
): Promise<ApiResult<null>> {
  await delay(300);
  const video = _trainingVideos.find((v) => v.id === id);
  if (!video) return err("Video not found");
  video.isArchived = true;
  return ok(null);
}

export async function apiDeleteTrainingVideo(
  id: number,
): Promise<ApiResult<null>> {
  await delay(300);
  const idx = _trainingVideos.findIndex((v) => v.id === id);
  if (idx < 0) return err("Video not found");
  _trainingVideos.splice(idx, 1);
  return ok(null);
}

export async function apiSendVideoTrainingReminder(
  _videoId: number,
): Promise<ApiResult<null>> {
  await delay(400);
  return ok(null);
}

// ── IT Support ────────────────────────────────────────────────────────────────

export interface SubmitIncidentRequest {
  agency: string;
  issueCategory: string;
  description: string;
  reporterName: string;
  contact: string;
}

export interface SubmitAmendmentRequest {
  fullname: string;
  phone: string;
  t24Username: string;
  agency: string;
  requestType: string;
  newRole?: string;
  deptChange?: string;
  transferLocation?: string;
  additionalDetails?: string;
}

const _incidents: IncidentReport[] = [
  {
    id: 1,
    reporterId: "mock-user-3",
    reporterName: "Abena Ofori",
    subject: "T24 Core Banking",
    description:
      "Unable to process savings withdrawals — T24 module throwing error code 504 during peak hours. Affects all tellers at ADEISO branch.",
    priority: "high",
    status: "open",
    assignedTo: null,
    resolution: null,
    createdAt: BigInt(Date.now() - 7200000),
    updatedAt: BigInt(Date.now() - 7200000),
  },
  {
    id: 2,
    reporterId: "mock-user-2",
    reporterName: "Emmanuel Asante",
    subject: "Email/Password",
    description:
      "Staff member locked out of corporate email. Password reset not functioning via standard portal.",
    priority: "medium",
    status: "resolved",
    assignedTo: "mock-user-1",
    resolution:
      "Password reset completed via admin panel. User regained access.",
    createdAt: BigInt(Date.now() - 172800000),
    updatedAt: BigInt(Date.now() - 86400000),
  },
  {
    id: 3,
    reporterId: "mock-user-3",
    reporterName: "Abena Ofori",
    subject: "Network",
    description:
      "Intermittent internet connectivity at ADEISO branch affecting online banking transactions.",
    priority: "medium",
    status: "open",
    assignedTo: null,
    resolution: null,
    createdAt: BigInt(Date.now() - 3600000),
    updatedAt: BigInt(Date.now() - 3600000),
  },
];

const _amendments: ProfileAmendment[] = [
  {
    id: 1,
    requesterId: "mock-user-3",
    requesterName: "Abena Ofori",
    field: "Department Change",
    currentValue: "BANKING OPERATIONS",
    requestedValue: "E-BANKING",
    reason: "Transfer approved — KASOA MAIN branch",
    status: "pending",
    reviewedBy: null,
    reviewNote: null,
    createdAt: BigInt(Date.now() - 86400000),
    updatedAt: BigInt(Date.now() - 86400000),
  },
  {
    id: 2,
    requesterId: "mock-user-2",
    requesterName: "Emmanuel Asante",
    field: "T24 Amendment",
    currentValue: "HR Officer",
    requestedValue: "Senior HR Officer",
    reason: "Promotion effective April 2026",
    status: "approved",
    reviewedBy: "mock-user-1",
    reviewNote: "Approved. T24 role updated.",
    createdAt: BigInt(Date.now() - 259200000),
    updatedAt: BigInt(Date.now() - 172800000),
  },
];

let _incidentIdCounter = 4;
let _amendmentIdCounter = 3;

export async function apiSubmitIncidentReport(
  req: SubmitIncidentRequest,
  reporterId: string,
): Promise<ApiResult<IncidentReport>> {
  await delay(500);
  const report: IncidentReport = {
    id: _incidentIdCounter++,
    reporterId,
    reporterName: req.reporterName,
    subject: req.issueCategory,
    description: req.description,
    priority: "medium",
    status: "open",
    assignedTo: null,
    resolution: null,
    createdAt: BigInt(Date.now()),
    updatedAt: BigInt(Date.now()),
  };
  _incidents.unshift(report);
  return ok(report);
}

export async function apiSubmitProfileAmendment(
  req: SubmitAmendmentRequest,
  requesterId: string,
  requesterName: string,
): Promise<ApiResult<ProfileAmendment>> {
  await delay(500);
  const amendment: ProfileAmendment = {
    id: _amendmentIdCounter++,
    requesterId,
    requesterName,
    field: req.requestType,
    currentValue: "",
    requestedValue: req.additionalDetails ?? "",
    reason: req.additionalDetails ?? req.requestType,
    status: "pending",
    reviewedBy: null,
    reviewNote: null,
    createdAt: BigInt(Date.now()),
    updatedAt: BigInt(Date.now()),
  };
  _amendments.unshift(amendment);
  return ok(amendment);
}

export async function apiGetIncidentReports(): Promise<IncidentReport[]> {
  await delay(400);
  return [..._incidents].sort(
    (a, b) => Number(b.createdAt) - Number(a.createdAt),
  );
}

export async function apiGetMyIncidents(
  userId: string,
): Promise<IncidentReport[]> {
  await delay(300);
  return _incidents
    .filter((i) => i.reporterId === userId)
    .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
    .slice(0, 5);
}

export async function apiGetProfileAmendments(): Promise<ProfileAmendment[]> {
  await delay(400);
  return [..._amendments].sort(
    (a, b) => Number(b.createdAt) - Number(a.createdAt),
  );
}

export async function apiGetMyAmendments(
  userId: string,
): Promise<ProfileAmendment[]> {
  await delay(300);
  return _amendments
    .filter((a) => a.requesterId === userId)
    .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
    .slice(0, 5);
}

export async function apiResolveIncidentReport(
  id: number,
  resolution: string,
): Promise<ApiResult<null>> {
  await delay(300);
  const incident = _incidents.find((i) => i.id === id);
  if (!incident) return err("Incident not found");
  incident.status = "resolved";
  incident.resolution = resolution;
  incident.updatedAt = BigInt(Date.now());
  return ok(null);
}

export async function apiResolveProfileAmendment(
  id: number,
  approved: boolean,
  note: string,
  reviewerId: string,
): Promise<ApiResult<null>> {
  await delay(300);
  const amendment = _amendments.find((a) => a.id === id);
  if (!amendment) return err("Amendment not found");
  amendment.status = approved ? "approved" : "rejected";
  amendment.reviewedBy = reviewerId;
  amendment.reviewNote = note;
  amendment.updatedAt = BigInt(Date.now());
  return ok(null);
}

export async function apiDeleteResolvedIncidents(
  ids: number[],
): Promise<ApiResult<null>> {
  await delay(300);
  for (const id of ids) {
    const idx = _incidents.findIndex((i) => i.id === id);
    if (idx >= 0) _incidents.splice(idx, 1);
  }
  return ok(null);
}

export async function apiDeleteResolvedAmendments(
  ids: number[],
): Promise<ApiResult<null>> {
  await delay(300);
  for (const id of ids) {
    const idx = _amendments.findIndex((a) => a.id === id);
    if (idx >= 0) _amendments.splice(idx, 1);
  }
  return ok(null);
}

export function apiExportIncidentsCsv(incidents: IncidentReport[]): string {
  const headers = [
    "ID",
    "Reporter",
    "Category",
    "Description",
    "Status",
    "Priority",
    "Date",
  ];
  const rows = incidents.map((i) => [
    String(i.id),
    i.reporterName,
    i.subject,
    `"${i.description.replace(/"/g, '""')}"`,
    i.status,
    i.priority,
    new Date(Number(i.createdAt)).toLocaleDateString(),
  ]);
  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}

export function apiExportAmendmentsCsv(amendments: ProfileAmendment[]): string {
  const headers = [
    "ID",
    "Requester",
    "Field",
    "Current Value",
    "Requested Value",
    "Status",
    "Date",
  ];
  const rows = amendments.map((a) => [
    String(a.id),
    a.requesterName,
    a.field,
    `"${a.currentValue.replace(/"/g, '""')}"`,
    `"${a.requestedValue.replace(/"/g, '""')}"`,
    a.status,
    new Date(Number(a.createdAt)).toLocaleDateString(),
  ]);
  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}

// ── Audit Logs ────────────────────────────────────────────────────────────────
const _auditLogs: AuditLog[] = [
  {
    id: 1,
    actorId: "mock-user-1",
    actorName: "Sarah Mensah",
    action: "LOGIN",
    target: "System",
    ipAddress: "192.168.1.10",
    timestamp: BigInt(Date.now() - 1800000),
  },
  {
    id: 2,
    actorId: "mock-user-2",
    actorName: "Emmanuel Asante",
    action: "UPDATE_STAFF",
    target: "Abena Ofori",
    ipAddress: "192.168.1.22",
    timestamp: BigInt(Date.now() - 3600000),
  },
  {
    id: 3,
    actorId: "mock-user-1",
    actorName: "Sarah Mensah",
    action: "CREATE_ANNOUNCEMENT",
    target: "BARB Annual General Meeting 2026",
    ipAddress: "192.168.1.10",
    timestamp: BigInt(Date.now() - 86400000),
  },
];

export async function apiLogAction(
  actorName: string,
  action: string,
  target: string,
  ipAddress: string,
): Promise<void> {
  _auditLogs.unshift({
    id: _auditLogs.length + 1,
    actorId: "current-user",
    actorName,
    action,
    target,
    ipAddress,
    timestamp: BigInt(Date.now()),
  });
}

export async function apiGetAuditLogs(): Promise<AuditLog[]> {
  await delay(400);
  return [..._auditLogs].sort(
    (a, b) => Number(b.timestamp) - Number(a.timestamp),
  );
}

export async function apiDeleteAuditLog(id: number): Promise<ApiResult<null>> {
  await delay(200);
  const idx = _auditLogs.findIndex((l) => l.id === id);
  if (idx < 0) return err("Log entry not found");
  _auditLogs.splice(idx, 1);
  return ok(null);
}

export async function apiDeleteAuditLogs(
  ids: number[],
): Promise<ApiResult<null>> {
  await delay(300);
  for (const id of ids) {
    const idx = _auditLogs.findIndex((l) => l.id === id);
    if (idx >= 0) _auditLogs.splice(idx, 1);
  }
  return ok(null);
}

// ── Util ──────────────────────────────────────────────────────────────────────

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
