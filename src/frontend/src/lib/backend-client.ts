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
  DashboardOverview,
  IncidentReport,
  Notification,
  PortalForm,
  ProfileAmendment,
  StaffStats,
  TrainingDocument,
  TrainingVideo,
  User,
} from "../types";

const OFFICIAL_EMAIL_DOMAIN = "@bawjiasearearuralbank.com";
const IT_ACCESS_CODE = "BARB-IT-2026";
const HR_ACCESS_CODE = "BARB-HR-2026";
const MAIL_API_URL = (
  import.meta.env.VITE_MAIL_API_URL || "http://127.0.0.1:4185/api"
).replace(/\/$/, "");
const ANNOUNCEMENT_DISMISS_KEY = "barb_announcement_dismissals";
const USERS_STORE_KEY = "barb_mock_users";
const OPTIONAL_API_TIMEOUT_MS = 1500;

// ── Helpers ───────────────────────────────────────────────────────────────────

function ok<T>(value: T): ApiResult<T> {
  return { ok: value };
}

function err<T>(message: string): ApiResult<T> {
  return { err: message };
}

async function postMailApi(path: string, payload: Record<string, string>) {
  const response = await fetch(`${MAIL_API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await response.json().catch(() => ({}))) as {
    error?: string;
  };
  if (!response.ok) {
    throw new Error(data.error || "Email could not be sent");
  }
}

async function sendVerificationCode(email: string, code: string) {
  await postMailApi("/send-verification-email", { email, code });
}

async function sendPasswordResetEmail(email: string, resetUrl: string) {
  await postMailApi("/send-password-reset-email", { email, resetUrl });
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
  accessCode?: string;
}

// Simulate backend calls — replace actor body when bindgen exposes methods

const IMPORTED_DB_TEMP_PASSWORD_HASH = "816495661"; // Barb@2026

const INITIAL_MOCK_USERS: User[] = [
  {
    id: "db-user-6",
    fullname: "Desmond Tettey Quarshie",
    phone: "0243670230",
    email: "dquarshie@bawjiasearearuralbank.com",
    role: "GeneralStaff",
    position: "Staff",
    department: "BANKING OPERATIONS",
    branch: "HEAD OFFICE",
    imageFile: null,
    isActive: true,
    isVerified: true,
    lastSeen: BigInt(1772637593885),
    registrationTime: BigInt(0),
    isArchived: false,
  },
  {
    id: "db-user-9",
    fullname: "Jane Afua Bruku",
    phone: "0248154869",
    email: "jbruku@bawjiasearearuralbank.com",
    role: "GeneralStaff",
    position: "Staff",
    department: "COMPLIANCE",
    branch: "HEAD OFFICE",
    imageFile: null,
    isActive: true,
    isVerified: true,
    lastSeen: BigInt(1770741882598),
    registrationTime: BigInt(0),
    isArchived: false,
  },
  {
    id: "db-user-5",
    fullname: "Kwabena Asare",
    phone: "0599779664",
    email: "kasare@bawjiasearearuralbank.com",
    role: "GeneralStaff",
    position: "Staff",
    department: "COMPLIANCE",
    branch: "HEAD OFFICE",
    imageFile: null,
    isActive: true,
    isVerified: true,
    lastSeen: BigInt(1770990814598),
    registrationTime: BigInt(0),
    isArchived: false,
  },
  {
    id: "db-user-8",
    fullname: "Kwesi Adu Snr Yeenu-Prah",
    phone: "0555443053",
    email: "kyeenu-prah@bawjiasearearuralbank.com",
    role: "HRAdmin",
    position: "Staff",
    department: "HR",
    branch: "HEAD OFFICE",
    imageFile: "/profile_pics/f658de3c2aa8ca6d.jpeg",
    isActive: true,
    isVerified: true,
    lastSeen: BigInt(1770296150530),
    registrationTime: BigInt(0),
    isArchived: false,
  },
  {
    id: "db-user-4",
    fullname: "Ato Asiedu Mensah",
    phone: "0247554428",
    email: "amensah@bawjiasearearuralbank.com",
    role: "SuperAdmin",
    position: "Staff",
    department: "IT",
    branch: "HEAD OFFICE",
    imageFile: null,
    isActive: true,
    isVerified: true,
    lastSeen: BigInt(1770975614364),
    registrationTime: BigInt(0),
    isArchived: false,
  },
  {
    id: "db-user-2",
    fullname: "James Lincoln Awuah",
    phone: "0536799490",
    email: "lawuah@bawjiasearearuralbank.com",
    role: "SuperAdmin",
    position: "Staff",
    department: "IT",
    branch: "HEAD OFFICE",
    imageFile: "/profile_pics/88efb134d068db11.jpg",
    isActive: true,
    isVerified: true,
    lastSeen: BigInt(1775309044811),
    registrationTime: BigInt(0),
    isArchived: false,
  },
  {
    id: "db-user-3",
    fullname: "Nathaniel Oglie Narh",
    phone: "0246377830",
    email: "nnarh@bawjiasearearuralbank.com",
    role: "SuperAdmin",
    position: "Staff",
    department: "IT",
    branch: "HEAD OFFICE",
    imageFile: null,
    isActive: true,
    isVerified: true,
    lastSeen: BigInt(1769519876185),
    registrationTime: BigInt(0),
    isArchived: false,
  },
  {
    id: "db-user-7",
    fullname: "GABRIEL OWUSU",
    phone: "0246315586",
    email: "gowusu@bawjiasearearuralbank.com",
    role: "GeneralStaff",
    position: "Staff",
    department: "RECOVERY",
    branch: "HEAD OFFICE",
    imageFile: null,
    isActive: true,
    isVerified: true,
    lastSeen: BigInt(1769689048721),
    registrationTime: BigInt(0),
    isArchived: false,
  },
];

function serializeUsers(users: User[]) {
  return JSON.stringify(
    users.map((user) => ({
      ...user,
      lastSeen: user.lastSeen.toString(),
      registrationTime: user.registrationTime.toString(),
    })),
  );
}

function deserializeUsers(raw: string): User[] {
  return (JSON.parse(raw) as Array<
    Omit<User, "lastSeen" | "registrationTime"> & {
      lastSeen: string | number;
      registrationTime: string | number;
    }
  >).map((user) => ({
    ...user,
    lastSeen: BigInt(user.lastSeen ?? 0),
    registrationTime: BigInt(user.registrationTime ?? 0),
  }));
}

function loadUsersStore(): User[] {
  if (typeof window === "undefined") {
    return INITIAL_MOCK_USERS.map((user) => ({ ...user }));
  }
  try {
    const raw = window.localStorage.getItem(USERS_STORE_KEY);
    if (!raw) {
      window.localStorage.setItem(
        USERS_STORE_KEY,
        serializeUsers(INITIAL_MOCK_USERS),
      );
      return INITIAL_MOCK_USERS.map((user) => ({ ...user }));
    }
    return deserializeUsers(raw);
  } catch {
    return INITIAL_MOCK_USERS.map((user) => ({ ...user }));
  }
}

async function postOptionalApi(
  path: string,
  payload: Record<string, string>,
): Promise<Record<string, unknown> | null> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), OPTIONAL_API_TIMEOUT_MS);
  try {
    const response = await fetch(`${MAIL_API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!response.ok) return null;
    return (await response.json().catch(() => ({}))) as Record<string, unknown>;
  } catch {
    return null;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

async function getOptionalApi(path: string): Promise<Record<string, unknown> | null> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), OPTIONAL_API_TIMEOUT_MS);
  try {
    const response = await fetch(`${MAIL_API_URL}${path}`, {
      method: "GET",
      signal: controller.signal,
    });
    if (!response.ok) return null;
    return (await response.json().catch(() => ({}))) as Record<string, unknown>;
  } catch {
    return null;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function currentPresenceTimestampMs(): bigint {
  return BigInt(Date.now());
}

function applyPresenceMap(users: User[], presence: Record<string, bigint>) {
  for (const user of users) {
    const sharedLastSeen = presence[user.id];
    user.isOnlineNow = !!sharedLastSeen;
    if (sharedLastSeen) {
      user.lastSeen = sharedLastSeen;
    }
  }
}

async function fetchSharedPresenceMap(): Promise<Record<string, bigint>> {
  const payload = await getOptionalApi("/presence");
  const rawPresence = payload?.presence;
  if (!rawPresence || typeof rawPresence !== "object") {
    return {};
  }
  return Object.entries(rawPresence as Record<string, unknown>).reduce<Record<string, bigint>>(
    (acc, [userId, seconds]) => {
      const numeric =
        typeof seconds === "number"
          ? seconds
          : typeof seconds === "string"
            ? Number(seconds)
            : NaN;
      if (Number.isFinite(numeric) && numeric > 0) {
        acc[userId] = BigInt(Math.trunc(numeric * 1000));
      }
      return acc;
    },
    {},
  );
}

async function pingSharedPresence(userId: string) {
  const payload = await postOptionalApi("/presence/ping", { userId });
  const lastSeen = payload?.lastSeen;
  if (typeof lastSeen === "number" && Number.isFinite(lastSeen)) {
    return BigInt(Math.trunc(lastSeen * 1000));
  }
  if (typeof lastSeen === "string" && Number.isFinite(Number(lastSeen))) {
    return BigInt(Math.trunc(Number(lastSeen) * 1000));
  }
  return null;
}

async function logoutSharedPresence(userId: string) {
  await postOptionalApi("/presence/logout", { userId });
}

let _mockUsers: User[] = loadUsersStore();

function syncUsersFromStorage() {
  _mockUsers = loadUsersStore();
}

function persistUsersStore() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(USERS_STORE_KEY, serializeUsers(_mockUsers));
}

let _pendingVerification: Record<string, User> = {};
let _verificationCodes: Record<string, string> = {};
let _passwordHashes: Record<string, string> = {
  "dquarshie@bawjiasearearuralbank.com": IMPORTED_DB_TEMP_PASSWORD_HASH,
  "jbruku@bawjiasearearuralbank.com": IMPORTED_DB_TEMP_PASSWORD_HASH,
  "kasare@bawjiasearearuralbank.com": IMPORTED_DB_TEMP_PASSWORD_HASH,
  "kyeenu-prah@bawjiasearearuralbank.com": IMPORTED_DB_TEMP_PASSWORD_HASH,
  "amensah@bawjiasearearuralbank.com": IMPORTED_DB_TEMP_PASSWORD_HASH,
  "lawuah@bawjiasearearuralbank.com": IMPORTED_DB_TEMP_PASSWORD_HASH,
  "nnarh@bawjiasearearuralbank.com": IMPORTED_DB_TEMP_PASSWORD_HASH,
  "gowusu@bawjiasearearuralbank.com": IMPORTED_DB_TEMP_PASSWORD_HASH,
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function getDismissalStore(): Record<string, number[]> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(ANNOUNCEMENT_DISMISS_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, number[]>;
  } catch {
    return {};
  }
}

function saveDismissalStore(store: Record<string, number[]>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ANNOUNCEMENT_DISMISS_KEY, JSON.stringify(store));
}

function getDismissedAnnouncementIds(userId: string | undefined) {
  if (!userId) return new Set<number>();
  const store = getDismissalStore();
  return new Set(store[userId] ?? []);
}

function addDismissedAnnouncement(userId: string, announcementId: number) {
  const store = getDismissalStore();
  const current = new Set(store[userId] ?? []);
  current.add(announcementId);
  store[userId] = Array.from(current);
  saveDismissalStore(store);
}

function verificationCodeFor(email: string) {
  const seed = Array.from(email).reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return String((seed % 900000) + 100000);
}

function roleFromRegistration(req: RegisterRequest): User["role"] {
  if (req.department === "IT") return "SuperAdmin";
  if (req.department === "HR") return "HRAdmin";
  return "GeneralStaff";
}

function roleFromDepartment(department: string): User["role"] {
  if (department === "IT") return "SuperAdmin";
  if (department === "HR") return "HRAdmin";
  return "GeneralStaff";
}

function isPortalStaff(user: User) {
  return !["MASTER ADMIN", "System Admin"].includes(user.fullname);
}

export async function apiRegister(
  req: RegisterRequest,
): Promise<ApiResult<User>> {
  await delay(600);
  syncUsersFromStorage();
  const email = normalizeEmail(req.email);
  if (!email.endsWith(OFFICIAL_EMAIL_DOMAIN)) {
    return err("Please use your official Bawjiase email address.");
  }
  if (req.department === "IT" && req.accessCode !== IT_ACCESS_CODE) {
    return err("Incorrect IT access code. Registration blocked.");
  }
  if (req.department === "HR" && req.accessCode !== HR_ACCESS_CODE) {
    return err("Incorrect HR access code. Registration blocked.");
  }

  const existing = _mockUsers.find((u) => u.email === email);
  if (existing?.isVerified) return err("Email already registered");

  const newUser: User = {
    id: existing?.id ?? `user-${Date.now()}`,
    fullname: req.fullname,
    phone: req.phone,
    email,
    role: roleFromRegistration(req),
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
  _pendingVerification[email] = newUser;
  _verificationCodes[email] = verificationCodeFor(email);
  _passwordHashes[email] = req.passwordHash;
  try {
    await sendVerificationCode(email, _verificationCodes[email]);
  } catch (error) {
    return err(
      error instanceof Error ? error.message : "Email could not be sent",
    );
  }
  return ok(newUser);
}

export async function apiVerifyEmail(
  email: string,
  code: string,
): Promise<ApiResult<null>> {
  await delay(400);
  syncUsersFromStorage();
  const normalizedEmail = normalizeEmail(email);
  const user = _pendingVerification[normalizedEmail];
  if (!user) return err("No pending verification for this email");
  if (_verificationCodes[normalizedEmail] !== code) {
    return err("Incorrect verification code");
  }
  user.isVerified = true;
  const existingIdx = _mockUsers.findIndex((u) => u.email === normalizedEmail);
  if (existingIdx >= 0) {
    _mockUsers[existingIdx] = user;
  } else {
    _mockUsers.push(user);
  }
  persistUsersStore();
  delete _pendingVerification[normalizedEmail];
  delete _verificationCodes[normalizedEmail];
  return ok(null);
}

export async function apiResendCode(email: string): Promise<ApiResult<null>> {
  await delay(300);
  const normalizedEmail = normalizeEmail(email);
  if (!_pendingVerification[normalizedEmail]) return err("Email not found");
  _verificationCodes[normalizedEmail] = verificationCodeFor(
    `${normalizedEmail}-${Date.now()}`,
  );
  try {
    await sendVerificationCode(
      normalizedEmail,
      _verificationCodes[normalizedEmail],
    );
  } catch (error) {
    return err(
      error instanceof Error ? error.message : "Email could not be sent",
    );
  }
  return ok(null);
}

export async function apiLogin(
  email: string,
  passwordHash: string,
): Promise<ApiResult<User>> {
  await delay(700);
  syncUsersFromStorage();
  const normalizedEmail = normalizeEmail(email);
  if (_passwordHashes[normalizedEmail] !== passwordHash) {
    return err("Invalid email or password");
  }
  const user = _mockUsers.find(
    (u) => u.email === normalizedEmail && !u.isArchived && u.isActive,
  );
  if (!user) return err("Invalid email or password");
  if (!user.isVerified) return err("Email not verified");
  user.lastSeen = currentPresenceTimestampMs();
  user.isOnlineNow = true;
  const sharedLastSeen = await pingSharedPresence(user.id);
  if (sharedLastSeen) {
    user.lastSeen = sharedLastSeen;
  }
  persistUsersStore();
  return ok(user);
}

export async function apiUpdateLastSeen(
  userId: string,
): Promise<ApiResult<User>> {
  await delay(120);
  syncUsersFromStorage();
  const user = _mockUsers.find((item) => item.id === userId && item.isActive);
  if (!user || user.isArchived) return err("User not found");
  user.lastSeen = currentPresenceTimestampMs();
  user.isOnlineNow = true;
  const sharedLastSeen = await pingSharedPresence(userId);
  if (sharedLastSeen) {
    user.lastSeen = sharedLastSeen;
  }
  persistUsersStore();
  return ok({ ...user });
}

export async function apiLogout(userId?: string): Promise<void> {
  if (userId) {
    syncUsersFromStorage();
    const user = _mockUsers.find((item) => item.id === userId);
    if (user) {
      user.isOnlineNow = false;
      persistUsersStore();
    }
    await logoutSharedPresence(userId);
  }
}

export async function apiRequestPasswordReset(
  email: string,
): Promise<ApiResult<string>> {
  await delay(500);
  const normalizedEmail = normalizeEmail(email);
  const user = _mockUsers.find((u) => u.email === normalizedEmail);
  if (!user) return err("Email not found");
  const resetUrl = `${window.location.origin}/reset-password?token=${encodeURIComponent(normalizedEmail)}`;
  try {
    await sendPasswordResetEmail(normalizedEmail, resetUrl);
  } catch (error) {
    return err(
      error instanceof Error ? error.message : "Email could not be sent",
    );
  }
  return ok("Password reset link sent to your email");
}

export async function apiConfirmPasswordReset(
  token: string,
  newPasswordHash: string,
): Promise<ApiResult<null>> {
  await delay(500);
  const email = normalizeEmail(token);
  if (!_mockUsers.some((u) => u.email === email))
    return err("Invalid reset token");
  _passwordHashes[email] = newPasswordHash;
  return ok(null);
}

// ── Profile ───────────────────────────────────────────────────────────────────

export async function apiGetMyProfile(userId: string): Promise<User | null> {
  await delay(300);
  syncUsersFromStorage();
  const sharedPresence = await fetchSharedPresenceMap();
  applyPresenceMap(_mockUsers, sharedPresence);
  const user = _mockUsers.find((u) => u.id === userId) ?? null;
  persistUsersStore();
  return user ? { ...user } : null;
}

export async function apiUpdateMyProfile(
  userId: string,
  req: UpdateProfileRequest,
): Promise<ApiResult<User>> {
  await delay(400);
  syncUsersFromStorage();
  const idx = _mockUsers.findIndex((u) => u.id === userId);
  if (idx < 0) return err("User not found");
  _mockUsers[idx] = { ..._mockUsers[idx], ...req };
  persistUsersStore();
  return ok(_mockUsers[idx]);
}

// ── Staff ─────────────────────────────────────────────────────────────────────

export async function apiGetActiveStaff(): Promise<User[]> {
  await delay(400);
  syncUsersFromStorage();
  const sharedPresence = await fetchSharedPresenceMap();
  applyPresenceMap(_mockUsers, sharedPresence);
  persistUsersStore();
  return _mockUsers
    .filter((u) => isPortalStaff(u) && !u.isArchived && u.isActive)
    .sort(
      (a, b) =>
        a.department.localeCompare(b.department) ||
        a.fullname.localeCompare(b.fullname),
    );
}

export async function apiGetArchivedStaff(): Promise<User[]> {
  await delay(400);
  syncUsersFromStorage();
  return _mockUsers
    .filter((u) => isPortalStaff(u) && u.isArchived)
    .sort((a, b) => a.fullname.localeCompare(b.fullname));
}

export async function apiGetStaffMember(userId: string): Promise<User | null> {
  await delay(200);
  syncUsersFromStorage();
  return _mockUsers.find((u) => u.id === userId) ?? null;
}

export async function apiUpdateStaff(
  userId: string,
  req: UpdateStaffRequest,
): Promise<ApiResult<User>> {
  await delay(400);
  syncUsersFromStorage();
  const idx = _mockUsers.findIndex((u) => u.id === userId);
  if (idx < 0) return err("Staff member not found");
  const existing = _mockUsers[idx];
  if (
    req.department === "IT" &&
    existing.department !== "IT" &&
    req.accessCode !== IT_ACCESS_CODE
  ) {
    return err("Access denied: invalid IT security code.");
  }
  _mockUsers[idx] = {
    ...existing,
    ...req,
    role: req.department ? roleFromDepartment(req.department) : existing.role,
  } as User;
  persistUsersStore();
  return ok(_mockUsers[idx]);
}

export async function apiArchiveStaff(
  userId: string,
): Promise<ApiResult<null>> {
  await delay(300);
  syncUsersFromStorage();
  const user = _mockUsers.find((u) => u.id === userId);
  if (!user) return err("Staff member not found");
  if (user.role === "SuperAdmin") return err("Cannot archive Super Admin.");
  user.isArchived = true;
  user.isActive = false;
  persistUsersStore();
  return ok(null);
}

export async function apiRestoreStaff(
  userId: string,
): Promise<ApiResult<null>> {
  await delay(300);
  syncUsersFromStorage();
  const user = _mockUsers.find((u) => u.id === userId);
  if (!user) return err("Staff member not found");
  user.isArchived = false;
  user.isActive = true;
  persistUsersStore();
  return ok(null);
}

export async function apiDeleteStaff(userId: string): Promise<ApiResult<null>> {
  await delay(300);
  syncUsersFromStorage();
  const idx = _mockUsers.findIndex((u) => u.id === userId);
  if (idx < 0) return err("Staff member not found");
  _mockUsers.splice(idx, 1);
  persistUsersStore();
  return ok(null);
}

export async function apiGetStaffStats(): Promise<StaffStats> {
  await delay(300);
  syncUsersFromStorage();
  const active = _mockUsers.filter((u) => !u.isArchived && u.isActive);
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

export async function apiGetDashboardOverview(): Promise<DashboardOverview> {
  await delay(350);
  const activeStaff = _mockUsers.filter(
    (u) =>
      u.isActive &&
      !u.isArchived &&
      !["MASTER ADMIN", "System Admin"].includes(u.fullname),
  );
  const branchOrder = [
    "HEAD OFFICE",
    "BAWJIASE",
    "ADEISO",
    "OFAAKOR",
    "KASOA NEW MARKET",
    "KASOA MAIN",
  ];
  const branchCounts = new Map<string, number>(
    branchOrder.map((branch) => [branch, 0]),
  );
  const departmentCounts = new Map<string, number>();

  for (const user of activeStaff) {
    const branch = user.branch.trim().toUpperCase();
    branchCounts.set(branch, (branchCounts.get(branch) ?? 0) + 1);
    if (user.role !== "SuperAdmin") {
      const department = user.department.trim().toUpperCase() || "OTHER";
      departmentCounts.set(
        department,
        (departmentCounts.get(department) ?? 0) + 1,
      );
    }
  }

  const branchDistribution = branchOrder.map((name) => ({
    name,
    value: branchCounts.get(name) ?? 0,
  }));
  const departmentDistribution = [...departmentCounts.entries()]
    .sort(([, a], [, b]) => b - a)
    .map(([name, value]) => ({ name, value }));
  const supportPending =
    _incidents.filter((i) => i.status !== "resolved").length +
    _amendments.filter((a) => a.status === "pending").length;
  const supportResolved =
    _incidents.filter((i) => i.status === "resolved").length +
    _amendments.filter((a) => a.status !== "pending").length;
  const ticketFlow = supportPending + supportResolved;
  const topBranch = branchDistribution.reduce(
    (best, item) => (item.value > best.value ? item : best),
    { name: "No Active Branch", value: 0 },
  );
  const topDepartment = departmentDistribution.reduce(
    (best, item) => (item.value > best.value ? item : best),
    { name: "No Active Department", value: 0 },
  );

  return {
    totalStaff: activeStaff.length,
    activeBranches: branchDistribution.filter((item) => item.value > 0).length,
    openOperations: supportPending,
    resolutionRate: ticketFlow
      ? Math.round((supportResolved / ticketFlow) * 100)
      : 0,
    resolvedCount: supportResolved,
    newsTotal: _announcements.filter((a) => !a.isTrashed).length,
    topBranch: topBranch.name,
    topBranchCount: topBranch.value,
    topDepartment: topDepartment.name,
    topDepartmentCount: topDepartment.value,
    branchDistribution,
    departmentDistribution:
      departmentDistribution.length > 0
        ? departmentDistribution
        : [{ name: "No Data", value: 0 }],
    supportPending,
    supportResolved,
  };
}

// ── Announcements ─────────────────────────────────────────────────────────────

const _announcements: AnnouncementWithPoll[] = [
  {
    id: 1,
    title: "BARB Annual General Meeting 2026",
    content:
      "All staff are cordially invited to the Annual General Meeting scheduled for Friday, 24 April 2026 at the Head Office auditorium at 10:00 AM. Attendance is mandatory for all department heads.",
    category: "HR",
    imageUrl: null,
    fileUrl: null,
    attachmentName: null,
    allowDownload: true,
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
    category: "HR",
    imageUrl: null,
    fileUrl: null,
    attachmentName: null,
    allowDownload: true,
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
    category: "IT",
    imageUrl: null,
    fileUrl: null,
    attachmentName: null,
    allowDownload: true,
    authorId: "mock-user-2",
    authorName: "Emmanuel Asante",
    createdAt: BigInt(Date.now() - 259200000),
    updatedAt: BigInt(Date.now() - 259200000),
    isDismissed: false,
    isTrashed: false,
    poll: null,
  },
];

export interface CreateAnnouncementRequest {
  title: string;
  content: string;
  category: string;
  imageUrl?: string | null;
  fileUrl?: string | null;
  attachmentName?: string | null;
  allowDownload?: boolean;
  pollQuestion?: string;
  pollOptions?: string[];
}

export interface UpdateAnnouncementRequest
  extends Partial<CreateAnnouncementRequest> {}

let _announcementIdCounter = _announcements.length + 1;
let _pollIdCounter = 2;
let _pollOptionIdCounter = 4;
const _announcementVotes = new Map<string, number>();

export async function apiGetAnnouncements(
  userId?: string,
): Promise<AnnouncementWithPoll[]> {
  await delay(400);
  const dismissedIds = getDismissedAnnouncementIds(userId);
  return _announcements
    .filter((a) => !a.isTrashed && !dismissedIds.has(a.id))
    .sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
}

export async function apiGetTrashedAnnouncements(): Promise<Announcement[]> {
  await delay(300);
  return _announcements
    .filter((a) => a.isTrashed)
    .sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
}

export async function apiCreateAnnouncement(
  req: CreateAnnouncementRequest,
  author: Pick<User, "id" | "fullname" | "department">,
): Promise<ApiResult<AnnouncementWithPoll>> {
  await delay(450);
  const now = BigInt(Date.now());
  const cleanPollOptions = (req.pollOptions ?? [])
    .map((option) => option.trim())
    .filter(Boolean);

  const announcement: AnnouncementWithPoll = {
    id: _announcementIdCounter++,
    title: req.title.trim(),
    content: req.content.trim(),
    category: req.category.trim() || author.department,
    imageUrl: req.imageUrl ?? null,
    fileUrl: req.fileUrl ?? null,
    attachmentName: req.attachmentName ?? null,
    allowDownload: req.allowDownload ?? true,
    authorId: author.id,
    authorName: author.fullname,
    createdAt: now,
    updatedAt: now,
    isDismissed: false,
    isTrashed: false,
    poll:
      req.pollQuestion?.trim() && cleanPollOptions.length >= 2
        ? {
            id: _pollIdCounter++,
            question: req.pollQuestion.trim(),
            options: cleanPollOptions.map((text) => ({
              id: _pollOptionIdCounter++,
              text,
              votes: 0,
            })),
            totalVotes: 0,
            userVotedOptionId: null,
            endDate: null,
            isActive: true,
          }
        : null,
  };

  _announcements.unshift(announcement);
  return ok(announcement);
}

export async function apiUpdateAnnouncement(
  id: number,
  req: UpdateAnnouncementRequest,
): Promise<ApiResult<AnnouncementWithPoll>> {
  await delay(350);
  const announcement = _announcements.find((item) => item.id === id);
  if (!announcement) return err("Announcement not found");

  announcement.title = req.title?.trim() ?? announcement.title;
  announcement.content = req.content?.trim() ?? announcement.content;
  announcement.category = req.category?.trim() ?? announcement.category;
  announcement.imageUrl =
    req.imageUrl === undefined ? announcement.imageUrl : req.imageUrl;
  announcement.fileUrl =
    req.fileUrl === undefined ? announcement.fileUrl : req.fileUrl;
  announcement.attachmentName =
    req.attachmentName === undefined
      ? announcement.attachmentName
      : req.attachmentName;
  announcement.allowDownload =
    req.allowDownload === undefined
      ? announcement.allowDownload
      : req.allowDownload;
  announcement.updatedAt = BigInt(Date.now());

  if (req.pollQuestion !== undefined || req.pollOptions !== undefined) {
    const cleanPollOptions = (req.pollOptions ?? [])
      .map((option) => option.trim())
      .filter(Boolean);
    announcement.poll =
      req.pollQuestion?.trim() && cleanPollOptions.length >= 2
        ? {
            id: announcement.poll?.id ?? _pollIdCounter++,
            question: req.pollQuestion.trim(),
            options: cleanPollOptions.map((text) => ({
              id: _pollOptionIdCounter++,
              text,
              votes: 0,
            })),
            totalVotes: 0,
            userVotedOptionId: null,
            endDate: null,
            isActive: true,
          }
        : null;
  }

  return ok(announcement);
}

export async function apiDismissAnnouncement(
  id: number,
  userId: string,
): Promise<ApiResult<null>> {
  await delay(200);
  const announcement = _announcements.find((item) => item.id === id);
  if (!announcement) return err("Announcement not found");
  addDismissedAnnouncement(userId, id);
  return ok(null);
}

export async function apiTrashAnnouncement(
  id: number,
): Promise<ApiResult<null>> {
  await delay(250);
  const announcement = _announcements.find((item) => item.id === id);
  if (!announcement) return err("Announcement not found");
  announcement.isTrashed = true;
  return ok(null);
}

export async function apiRestoreAnnouncement(
  id: number,
): Promise<ApiResult<null>> {
  await delay(250);
  const announcement = _announcements.find((item) => item.id === id);
  if (!announcement) return err("Announcement not found");
  announcement.isTrashed = false;
  announcement.isDismissed = false;
  return ok(null);
}

export async function apiDeleteAnnouncement(
  id: number,
): Promise<ApiResult<null>> {
  await delay(250);
  const index = _announcements.findIndex((item) => item.id === id);
  if (index < 0) return err("Announcement not found");
  _announcements.splice(index, 1);
  return ok(null);
}

export async function apiEmptyAnnouncementTrash(): Promise<ApiResult<null>> {
  await delay(300);
  for (let index = _announcements.length - 1; index >= 0; index -= 1) {
    if (_announcements[index].isTrashed) {
      _announcements.splice(index, 1);
    }
  }
  return ok(null);
}

export async function apiVoteAnnouncementPoll(
  pollId: number,
  optionId: number,
  userId: string,
): Promise<ApiResult<NonNullable<AnnouncementWithPoll["poll"]>>> {
  await delay(250);
  const voteKey = `${userId}:${pollId}`;
  if (_announcementVotes.has(voteKey)) {
    return err("You have already voted on this poll");
  }

  const announcement = _announcements.find((item) => item.poll?.id === pollId);
  if (!announcement?.poll) return err("Poll not found");

  const option = announcement.poll.options.find((item) => item.id === optionId);
  if (!option) return err("Poll option not found");

  option.votes += 1;
  announcement.poll.totalVotes += 1;
  announcement.poll.userVotedOptionId = optionId;
  _announcementVotes.set(voteKey, optionId);
  return ok({ ...announcement.poll, options: [...announcement.poll.options] });
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
    id: 4,
    title: "OATH OF SECRECY",
    description: "",
    fileUrl: "1Qlab6ipjgP2aw2wOYU1SO99cX8tsf1kj",
    category: "FINANCE",
    visibleTo: ["GeneralStaff", "HRAdmin", "SuperAdmin"],
    visibility: "General",
    department: null,
    createdAt: BigInt(1767176110787),
    updatedAt: BigInt(1767176110787),
  },
  {
    id: 2,
    title: "CODE OF CONDUCT",
    description: "",
    fileUrl: "1Fu97vLE4A_TAkiwLu__8vNRvsiCudjx7",
    category: "HR",
    visibleTo: ["GeneralStaff", "HRAdmin", "SuperAdmin"],
    visibility: "General",
    department: null,
    createdAt: BigInt(1767176110787),
    updatedAt: BigInt(1767176110787),
  },
  {
    id: 7,
    title: "CRP TEMPLATE",
    description: "",
    fileUrl:
      "https://docs.google.com/spreadsheets/d/1eBukKjoMlfJijF-h9QBrnDkIyYAc7juZ/edit?usp=sharing&ouid=105604838323272569561&rtpof=true&sd=true",
    category: "HR",
    visibleTo: ["GeneralStaff", "HRAdmin", "SuperAdmin"],
    visibility: "General",
    department: null,
    createdAt: BigInt(1769219989122),
    updatedAt: BigInt(1769219989122),
  },
  {
    id: 6,
    title: "LEAVE FORM",
    description: "",
    fileUrl: "10XyOJ1tgF0A2F8-ID7wwg6UYSinkWbOQ",
    category: "HR",
    visibleTo: ["GeneralStaff", "HRAdmin", "SuperAdmin"],
    visibility: "General",
    department: null,
    createdAt: BigInt(1767176116253),
    updatedAt: BigInt(1767176116253),
  },
  {
    id: 3,
    title: "Medical Forms",
    description: "",
    fileUrl: "1iGpcNdrJbPQ0C3PRvs1AW3JXOLK4SRMH",
    category: "HR",
    visibleTo: ["GeneralStaff", "HRAdmin", "SuperAdmin"],
    visibility: "General",
    department: null,
    createdAt: BigInt(1767176110787),
    updatedAt: BigInt(1767176110787),
  },
  {
    id: 1,
    title: "2025 END OF YEAR APPRAISAL",
    description: "",
    fileUrl: "1x0qDGKMudExHenT46QqCMm8ln0J2RjTE",
    category: "OPERATIONS",
    visibleTo: ["GeneralStaff", "HRAdmin", "SuperAdmin"],
    visibility: "General",
    department: null,
    createdAt: BigInt(1767176110787),
    updatedAt: BigInt(1767176110787),
  },
  {
    id: 5,
    title: "STAFF FAMILY FORM",
    description: "",
    fileUrl: "1LxW2ERPBr6N8qwb4yQ22jy8B-4OO2qZ5",
    category: "SUSU",
    visibleTo: ["GeneralStaff", "HRAdmin", "SuperAdmin"],
    visibility: "General",
    department: null,
    createdAt: BigInt(1767176110787),
    updatedAt: BigInt(1767176110787),
  },
];

let _formIdCounter = Math.max(..._forms.map((form) => form.id)) + 1;

export interface CreateFormRequest {
  title: string;
  description: string;
  fileUrl: string;
  category: string;
  visibleTo: PortalForm["visibleTo"];
  visibility?: PortalForm["visibility"];
  department?: string | null;
}

function canManageForms(user?: User | null) {
  return (
    user?.role === "SuperAdmin" ||
    user?.department === "IT" ||
    user?.department === "HR"
  );
}

function canUserSeeForm(form: PortalForm, user?: User | null) {
  if (canManageForms(user)) return true;
  const allowedCategories = new Set(["GENERAL", "HR"]);
  if (user?.department) allowedCategories.add(user.department.toUpperCase());
  return allowedCategories.has((form.category || "").toUpperCase());
}

export function apiExtractDriveFileId(driveRef: string): string {
  const value = driveRef.trim();
  if (!value) return "";
  if (!value.includes("drive.google.com")) return value;
  if (value.includes("/d/")) {
    return value.split("/d/")[1].split("/")[0].split("?")[0];
  }
  if (value.includes("id=")) {
    return value.split("id=")[1].split("&")[0];
  }
  return value;
}

export function apiOpenFormUrl(fileRef: string): string {
  const value = fileRef.trim();
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }
  return `https://drive.google.com/file/d/${value}/view`;
}

export function apiDownloadFormUrl(fileRef: string): string {
  const value = fileRef.trim();
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }
  return `https://drive.google.com/uc?export=download&id=${value}`;
}

export async function apiGetForms(user?: User | null): Promise<PortalForm[]> {
  await delay(350);
  return _forms
    .filter((form) => canUserSeeForm(form, user))
    .sort(
      (a, b) =>
        a.category.localeCompare(b.category) || a.title.localeCompare(b.title),
    );
}

export async function apiCreateForm(
  req: CreateFormRequest,
): Promise<ApiResult<PortalForm>> {
  await delay(400);
  const form: PortalForm = {
    id: _formIdCounter++,
    title: req.title,
    description: req.description,
    fileUrl: apiExtractDriveFileId(req.fileUrl),
    category: req.category,
    visibleTo: req.visibleTo,
    visibility: req.visibility ?? "General",
    department:
      req.visibility === "Department" ? (req.department ?? null) : null,
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
  _forms[idx] = {
    ..._forms[idx],
    ...req,
    fileUrl: req.fileUrl
      ? apiExtractDriveFileId(req.fileUrl)
      : _forms[idx].fileUrl,
    department:
      req.visibility === "Department"
        ? (req.department ?? _forms[idx].department ?? null)
        : req.visibility === "General"
          ? null
          : _forms[idx].department,
    updatedAt: BigInt(Date.now()),
  };
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
    incompleteUsers: string[];
  }[];
}

const AUTH_STORAGE_KEY = "barb_auth_user";

function getStoredAuthUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as User;
    parsed.lastSeen = BigInt(parsed.lastSeen ?? 0);
    parsed.registrationTime = BigInt(parsed.registrationTime ?? 0);
    return parsed;
  } catch {
    return null;
  }
}

function getPortalActiveUsers() {
  return _mockUsers.filter(
    (u) => isPortalStaff(u) && u.isActive && !u.isArchived,
  );
}

function isTrainingManager(user: User | null | undefined) {
  return user?.role === "HRAdmin" || user?.role === "SuperAdmin";
}

function extractDriveId(input: string): string {
  const trimmed = input.trim();
  const match =
    trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ??
    trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  return match?.[1] ?? trimmed.replace(/^DRIVE:/, "");
}

function isGoogleDocUrl(input: string) {
  return /docs\.google\.com/i.test(input.trim());
}

function localAssetUrl(ref: string) {
  const filename = ref.replace(/^LOCAL:/, "").trim();
  return filename ? `/uploads/${filename}` : "";
}

export function resolveTrainingVideoEmbedUrl(video: TrainingVideo): string {
  const raw = video.driveRef || video.videoUrl;
  if (video.storageType === "Local" || raw.startsWith("LOCAL:")) {
    return localAssetUrl(raw);
  }
  if (isGoogleDocUrl(raw)) return raw;
  return `https://drive.google.com/file/d/${extractDriveId(raw)}/preview`;
}

export function resolveTrainingVideoOpenUrl(video: TrainingVideo): string {
  const raw = video.driveRef || video.videoUrl;
  if (video.storageType === "Local" || raw.startsWith("LOCAL:")) {
    return localAssetUrl(raw);
  }
  if (isGoogleDocUrl(raw)) return raw;
  return `https://drive.google.com/file/d/${extractDriveId(raw)}/view`;
}

export function resolveTrainingVideoDownloadUrl(video: TrainingVideo): string {
  const raw = video.driveRef || video.videoUrl;
  if (video.storageType === "Local" || raw.startsWith("LOCAL:")) {
    return localAssetUrl(raw);
  }
  if (isGoogleDocUrl(raw)) return raw;
  return `https://drive.google.com/uc?export=download&id=${extractDriveId(raw)}`;
}

export function resolveTrainingDocumentViewUrl(doc: TrainingDocument): string {
  const raw = doc.driveRef || doc.fileUrl;
  if (doc.storageType === "Local" || raw.startsWith("LOCAL:")) {
    return localAssetUrl(raw);
  }
  if (isGoogleDocUrl(raw)) return raw;
  return `https://drive.google.com/file/d/${extractDriveId(raw)}/view`;
}

export function resolveTrainingDocumentDownloadUrl(
  doc: TrainingDocument,
): string {
  const raw = doc.driveRef || doc.fileUrl;
  if (doc.storageType === "Local" || raw.startsWith("LOCAL:")) {
    return localAssetUrl(raw);
  }
  if (isGoogleDocUrl(raw)) return raw;
  return `https://drive.google.com/uc?export=download&id=${extractDriveId(raw)}`;
}

function currentTrainingUser() {
  return getStoredAuthUser();
}

function canUserAccessVideo(video: TrainingVideo, user: User | null) {
  if (!user) return false;
  if (isTrainingManager(user)) return true;
  if (video.visibility !== "Department") return true;
  return (
    user.department.toUpperCase() === (video.department ?? "").toUpperCase()
  );
}

function canUserAccessDocument(doc: TrainingDocument, user: User | null) {
  if (!user) return false;
  if (isTrainingManager(user)) return true;
  if (doc.visibility !== "Department") return true;
  return user.department.toUpperCase() === (doc.department ?? "").toUpperCase();
}

function eligibleUsersForVideo(video: TrainingVideo) {
  return getPortalActiveUsers().filter((user) =>
    video.visibility === "Department"
      ? user.department.toUpperCase() === (video.department ?? "").toUpperCase()
      : true,
  );
}

function eligibleUsersForDocument(doc: TrainingDocument) {
  return getPortalActiveUsers().filter((user) =>
    doc.visibility === "Department"
      ? user.department.toUpperCase() === (doc.department ?? "").toUpperCase()
      : true,
  );
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
    visibility: "General",
    department: null,
    isMandatory: true,
    allowDownload: false,
    storageType: "Drive",
    driveRef: "DRIVE:1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74",
    localFilename: null,
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
    visibility: "General",
    department: null,
    isMandatory: true,
    allowDownload: false,
    storageType: "Drive",
    driveRef: "DRIVE:1KhJmNpQrStUvWxYzAbCdEfGhIjKlMnOp5",
    localFilename: null,
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
    visibility: "Department",
    department: "CREDIT",
    isMandatory: true,
    allowDownload: false,
    storageType: "Drive",
    driveRef: "DRIVE:1PqRsTuVwXyZaBcDeFgHiJkLmNoPqRsTu2",
    localFilename: null,
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
    videoUrl: "DRIVE:1CuSt0MerServ1ceExceL1ence2026",
    thumbnailUrl: null,
    duration: 2100,
    category: "Customer Service",
    visibleTo: ["GeneralStaff", "HRAdmin", "SuperAdmin"],
    visibility: "General",
    department: null,
    isMandatory: false,
    allowDownload: true,
    storageType: "Drive",
    driveRef: "DRIVE:1CuSt0MerServ1ceExceL1ence2026",
    localFilename: null,
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
    visibility: "General",
    department: null,
    isMandatory: true,
    allowDownload: true,
    storageType: "Drive",
    driveRef: "DRIVE:1VwXyZaBcDeFgHiJkLmNoPqRsTuVwXyZaB",
    localFilename: null,
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
    visibility: "General",
    department: null,
    isMandatory: true,
    allowDownload: true,
    storageType: "Drive",
    driveRef: "DRIVE:1AbCdEfGhIjKlMnOpQrStUvWxYzAbCdEfG",
    localFilename: null,
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
    visibility: "Department",
    department: "BANKING OPERATIONS",
    isMandatory: true,
    allowDownload: true,
    storageType: "Drive",
    driveRef: "DRIVE:1HiJkLmNoPqRsTuVwXyZaBcDeFgHiJkLmN",
    localFilename: null,
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
    visibility: "General",
    department: null,
    isMandatory: true,
    allowDownload: true,
    storageType: "Drive",
    driveRef: "DRIVE:1OpQrStUvWxYzAbCdEfGhIjKlMnOpQrStU",
    localFilename: null,
    uploadedBy: "Emmanuel Asante",
    uploadedAt: BigInt(Date.now() - 172800000),
    downloadCount: 61,
    isArchived: false,
  },
];

const _videoProgress: Record<string, VideoProgress> = {};
const _documentOpens: Record<string, bigint> = {};
let _videoIdCounter = _trainingVideos.length + 1;
let _docIdCounter = _trainingDocuments.length + 1;

function videoProgressKey(userId: string, videoId: number) {
  return `${userId}-${videoId}`;
}

function documentOpenKey(userId: string, docId: number) {
  return `${userId}-${docId}`;
}

_videoProgress[videoProgressKey("db-user-2", 1)] = {
  videoId: 1,
  progressPercent: 100,
  isComplete: true,
  lastWatched: BigInt(Date.now() - 43200000),
};
_videoProgress[videoProgressKey("db-user-6", 1)] = {
  videoId: 1,
  progressPercent: 72,
  isComplete: false,
  lastWatched: BigInt(Date.now() - 21600000),
};
_videoProgress[videoProgressKey("db-user-9", 2)] = {
  videoId: 2,
  progressPercent: 100,
  isComplete: true,
  lastWatched: BigInt(Date.now() - 86400000),
};
_videoProgress[videoProgressKey("db-user-7", 4)] = {
  videoId: 4,
  progressPercent: 100,
  isComplete: true,
  lastWatched: BigInt(Date.now() - 86400000),
};
_documentOpens[documentOpenKey("db-user-2", 1)] = BigInt(Date.now() - 43200000);
_documentOpens[documentOpenKey("db-user-8", 1)] = BigInt(
  Date.now() - 172800000,
);
_documentOpens[documentOpenKey("db-user-6", 2)] = BigInt(Date.now() - 86400000);
_documentOpens[documentOpenKey("db-user-3", 4)] = BigInt(Date.now() - 5400000);

export async function apiGetTrainingVideos(): Promise<TrainingVideo[]> {
  await delay(400);
  const user = currentTrainingUser();
  return _trainingVideos
    .filter((video) => !video.isArchived)
    .filter((video) => canUserAccessVideo(video, user))
    .sort((a, b) => Number(b.uploadedAt) - Number(a.uploadedAt));
}

export async function apiGetTrainingVideo(
  id: number,
): Promise<TrainingVideo | null> {
  await delay(200);
  const user = currentTrainingUser();
  const video =
    _trainingVideos.find((item) => item.id === id && !item.isArchived) ?? null;
  if (!video || !canUserAccessVideo(video, user)) return null;
  return video;
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
    visibility: req.visibility,
    department:
      req.visibility === "Department" ? (req.department ?? null) : null,
    isMandatory: !!req.mandatory,
    allowDownload: !!req.allowDownload,
    storageType: req.storageType,
    driveRef: req.storageType === "Drive" ? req.videoUrl : null,
    localFilename:
      req.storageType === "Local" ? req.videoUrl.replace(/^LOCAL:/, "") : null,
    uploadedBy: currentTrainingUser()?.fullname ?? "Current User",
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
  const user = currentTrainingUser();
  if (!user) return;
  const key = videoProgressKey(user.id, videoId);
  _videoProgress[key] = {
    videoId,
    progressPercent,
    isComplete: progressPercent >= 98,
    lastWatched: BigInt(Date.now()),
  };
  const watchedCount = Object.values(_videoProgress).filter(
    (item) => item.videoId === videoId && item.progressPercent > 0,
  ).length;
  const video = _trainingVideos.find((item) => item.id === videoId);
  if (video) video.viewCount = watchedCount;
}

export async function apiGetMyVideoProgress(
  videoId: number,
): Promise<VideoProgress | null> {
  await delay(150);
  const user = currentTrainingUser();
  if (!user) return null;
  return _videoProgress[videoProgressKey(user.id, videoId)] ?? null;
}

export async function apiGetVideoWatchStats(): Promise<VideoWatchStat[]> {
  await delay(300);
  return _trainingVideos
    .filter((video) => !video.isArchived)
    .map((video) => ({
      videoId: video.id,
      title: video.title,
      totalWatched: Object.values(_videoProgress).filter(
        (item) => item.videoId === video.id && item.progressPercent > 0,
      ).length,
      completedCount: Object.values(_videoProgress).filter(
        (item) => item.videoId === video.id && item.isComplete,
      ).length,
    }));
}

export async function apiGetTrainingDocuments(): Promise<TrainingDocument[]> {
  await delay(400);
  const user = currentTrainingUser();
  return _trainingDocuments
    .filter((doc) => !doc.isArchived)
    .filter((doc) => canUserAccessDocument(doc, user))
    .sort((a, b) => Number(b.uploadedAt) - Number(a.uploadedAt));
}

export async function apiGetTrainingDocument(
  id: number,
): Promise<TrainingDocument | null> {
  await delay(200);
  const user = currentTrainingUser();
  const doc =
    _trainingDocuments.find((item) => item.id === id && !item.isArchived) ??
    null;
  if (!doc || !canUserAccessDocument(doc, user)) return null;
  return doc;
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
    visibility: req.visibility,
    department:
      req.visibility === "Department" ? (req.department ?? null) : null,
    isMandatory: !!req.mandatory,
    allowDownload: !!req.allowDownload,
    storageType: req.storageType,
    driveRef: req.storageType === "Drive" ? req.fileUrl : null,
    localFilename:
      req.storageType === "Local" ? req.fileUrl.replace(/^LOCAL:/, "") : null,
    uploadedBy: currentTrainingUser()?.fullname ?? "Current User",
    uploadedAt: BigInt(Date.now()),
    downloadCount: 0,
    isArchived: false,
  };
  _trainingDocuments.unshift(doc);
  return ok(doc);
}

export async function apiMarkDocumentOpened(id: number): Promise<void> {
  await delay(100);
  const user = currentTrainingUser();
  if (!user) return;
  _documentOpens[documentOpenKey(user.id, id)] = BigInt(Date.now());
  const doc = _trainingDocuments.find((item) => item.id === id);
  if (doc) {
    doc.downloadCount = Object.keys(_documentOpens).filter((key) =>
      key.endsWith(`-${id}`),
    ).length;
  }
}

export async function apiGetDocumentViewStats(): Promise<
  { docId: number; title: string; openedCount: number }[]
> {
  await delay(300);
  return _trainingDocuments
    .filter((doc) => !doc.isArchived)
    .map((doc) => ({
      docId: doc.id,
      title: doc.title,
      openedCount: Object.keys(_documentOpens).filter((key) =>
        key.endsWith(`-${doc.id}`),
      ).length,
    }));
}

export async function apiGetMyDocumentOpenState(
  docId: number,
): Promise<{ isOpened: boolean; openedAt: bigint | null }> {
  await delay(120);
  const user = currentTrainingUser();
  if (!user) return { isOpened: false, openedAt: null };
  const openedAt = _documentOpens[documentOpenKey(user.id, docId)] ?? null;
  return {
    isOpened: openedAt !== null,
    openedAt,
  };
}

export async function apiGetAdminTrainingOverview(): Promise<AdminTrainingOverview> {
  await delay(500);
  const totalStaff = getPortalActiveUsers().length;
  return {
    totalVideos: _trainingVideos.filter((v) => !v.isArchived).length,
    totalDocuments: _trainingDocuments.filter((d) => !d.isArchived).length,
    totalStaff,
    videoStats: _trainingVideos
      .filter((v) => !v.isArchived)
      .map((v) => {
        const eligibleUsers = eligibleUsersForVideo(v);
        const completedUserIds = new Set(
          Object.entries(_videoProgress)
            .filter(
              ([, progress]) =>
                progress.videoId === v.id && progress.isComplete,
            )
            .map(([key]) => key.split("-").slice(0, -1).join("-")),
        );
        const watchedUserIds = new Set(
          Object.entries(_videoProgress)
            .filter(
              ([, progress]) =>
                progress.videoId === v.id && progress.progressPercent > 0,
            )
            .map(([key]) => key.split("-").slice(0, -1).join("-")),
        );
        return {
          id: v.id,
          title: v.title,
          eligibleCount: eligibleUsers.length,
          watchedCount: watchedUserIds.size,
          completionPct: eligibleUsers.length
            ? Math.round((completedUserIds.size / eligibleUsers.length) * 100)
            : 0,
          isMandatory: !!v.isMandatory,
          incompleteUsers: eligibleUsers
            .filter((user) => !completedUserIds.has(user.id))
            .map((user) => user.fullname),
        };
      }),
    docStats: _trainingDocuments
      .filter((d) => !d.isArchived)
      .map((d) => {
        const eligibleUsers = eligibleUsersForDocument(d);
        const openedUserIds = new Set(
          Object.keys(_documentOpens)
            .filter((key) => key.endsWith(`-${d.id}`))
            .map((key) => key.split("-").slice(0, -1).join("-")),
        );
        return {
          id: d.id,
          title: d.title,
          eligibleCount: eligibleUsers.length,
          openedCount: openedUserIds.size,
          openedPct: eligibleUsers.length
            ? Math.round((openedUserIds.size / eligibleUsers.length) * 100)
            : 0,
          isMandatory: !!d.isMandatory,
          incompleteUsers: eligibleUsers
            .filter((user) => !openedUserIds.has(user.id))
            .map((user) => user.fullname),
        };
      }),
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

export async function apiArchiveTrainingDocument(
  id: number,
): Promise<ApiResult<null>> {
  await delay(300);
  const doc = _trainingDocuments.find((item) => item.id === id);
  if (!doc) return err("Document not found");
  doc.isArchived = true;
  return ok(null);
}

export async function apiDeleteTrainingDocument(
  id: number,
): Promise<ApiResult<null>> {
  await delay(300);
  const idx = _trainingDocuments.findIndex((item) => item.id === id);
  if (idx < 0) return err("Document not found");
  _trainingDocuments.splice(idx, 1);
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
    reporterName: "Nathaniel Oglie Narh",
    agency: "ADEISO",
    contact: "0552571081",
    issueCategory: "NIA",
    subject: "NIA",
    description: "{cfdjlfdln",
    priority: "high",
    status: "resolved",
    assignedTo: null,
    resolution: "Resolved by IT Admin.",
    createdAt: BigInt(1769040000000),
    updatedAt: BigInt(1769043600000),
  },
  {
    id: 2,
    reporterId: "db-user-3",
    reporterName: "Nathaniel Oglie Narh",
    agency: "HEAD OFFICE",
    contact: "0552571081",
    issueCategory: "NCOMPUTING",
    subject: "NCOMPUTING",
    description: "NComputing device is not powering on",
    priority: "medium",
    status: "resolved",
    assignedTo: "db-user-2",
    resolution: "Resolved by IT Admin.",
    createdAt: BigInt(1768867200000),
    updatedAt: BigInt(1768870800000),
  },
  {
    id: 3,
    reporterId: "mock-user-3",
    reporterName: "Abena Ofori",
    agency: "ADEISO",
    contact: "0557234789",
    issueCategory: "NETWORK",
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
    fullname: "Abena Ofori",
    phone: "0557234789",
    t24Username: "B01.AOFORI",
    agency: "KASOA MAIN",
    requestType: "DEPARTMENTAL CHANGE",
    deptChange: "BANKING OPERATIONS -> E-BANKING",
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
    fullname: "Emmanuel Asante",
    phone: "0201987654",
    t24Username: "HO1.EASANTE",
    agency: "HEAD OFFICE",
    requestType: "ROLE CHANGE",
    newRole: "Senior HR Officer",
    field: "T24 Amendment",
    currentValue: "HR Officer",
    requestedValue: "Senior HR Officer",
    reason: "Promotion effective April 2026",
    status: "resolved",
    reviewedBy: "mock-user-1",
    reviewNote: "Resolved by IT Admin.",
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
    agency: req.agency,
    contact: req.contact,
    issueCategory: req.issueCategory,
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
    fullname: req.fullname,
    phone: req.phone,
    t24Username: req.t24Username,
    agency: req.agency,
    requestType: req.requestType,
    newRole: req.newRole,
    deptChange: req.deptChange,
    transferLocation: req.transferLocation,
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
  _approved: boolean,
  note: string,
  reviewerId: string,
): Promise<ApiResult<null>> {
  await delay(300);
  const amendment = _amendments.find((a) => a.id === id);
  if (!amendment) return err("Amendment not found");
  amendment.status = "resolved";
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
    "Date",
    "Agency",
    "Reporter",
    "Contact",
    "Category",
    "Description",
    "Status",
  ];
  const rows = incidents.map((i) => [
    String(i.id),
    new Date(Number(i.createdAt)).toLocaleDateString("en-GB"),
    i.agency ?? "",
    i.reporterName,
    i.contact ?? "",
    i.issueCategory ?? i.subject,
    `"${i.description.replace(/"/g, '""')}"`,
    i.status,
  ]);
  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}

export function apiExportAmendmentsCsv(amendments: ProfileAmendment[]): string {
  const headers = [
    "ID",
    "Date",
    "Agency",
    "Name",
    "Phone",
    "Username",
    "Request Type",
    "Details",
    "Status",
  ];
  const rows = amendments.map((a) => [
    String(a.id),
    new Date(Number(a.createdAt)).toLocaleDateString("en-GB"),
    a.agency ?? "",
    a.fullname ?? a.requesterName,
    a.phone ?? "",
    a.t24Username ?? "",
    a.requestType ?? a.field,
    `"${`${a.newRole ?? ""} ${a.deptChange ?? ""} ${a.transferLocation ?? ""}`.trim().replace(/"/g, '""')}"`,
    a.status,
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
