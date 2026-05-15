import { useSyncExternalStore } from "react";

export type AgmRegistrationMode = "In Person" | "Proxy";

export type AgmShareholderSeed = {
  id: string;
  fullName: string;
  shareholderNumber: string;
  shareholding: number;
  phone: string;
};

export type AgmRegistrationRecord = {
  id: string;
  shareholderId: string;
  shareholderName: string;
  shareholderNumber: string;
  shareholding: number;
  attendeeName: string;
  attendeePhone: string;
  mode: AgmRegistrationMode;
  proxyReason: string;
  verificationCode: string;
  registeredAt: string;
  checkedIn: boolean;
};

export type AgmShareholderView = AgmShareholderSeed & {
  status: "Not Registered" | "Registered";
  registration?: AgmRegistrationRecord;
};

export type AgmModuleSettings = {
  agmName: string;
  agmDate: string;
  venue: string;
  quorumThreshold: number;
  yearLabel: string;
  yearLocked: boolean;
  yearArchived: boolean;
  boardAutoRefresh: boolean;
};

export type AgmYearArchive = {
  id: string;
  archivedAt: string;
  note: string;
  settings: AgmModuleSettings;
  shareholders: AgmShareholderSeed[];
  registrations: AgmRegistrationRecord[];
};

export type AgmPortalState = {
  settings: AgmModuleSettings;
  shareholders: AgmShareholderSeed[];
  registrations: AgmRegistrationRecord[];
  archives: AgmYearArchive[];
};

export type AgmSyncStatus = {
  mode: "idle" | "syncing" | "synced" | "local-only";
  lastSyncedAt: number | null;
  message: string;
};

const REGISTRATIONS_STORAGE_KEY = "bcb_agm_portal_registrations";
const SHAREHOLDER_STORAGE_KEY = "bcb_agm_portal_shareholders";
const SETTINGS_STORAGE_KEY = "bcb_agm_portal_settings";
const ARCHIVE_STORAGE_KEY = "bcb_agm_portal_archives";
const AUTH_STORAGE_KEY = "bcb_auth_user";
const EVENT_NAME = "bcb:agm-portal-updated";
const OPTIONAL_API_TIMEOUT_MS = 8000;
const MAIL_API_URL = (
  import.meta.env.VITE_MAIL_API_URL || `${window.location.origin}/mail-api/api`
).replace(/\/$/, "");

const AGM_SHAREHOLDER_SEEDS: AgmShareholderSeed[] = [
  {
    id: "agm-001",
    fullName: "Kwabena Asare",
    shareholderNumber: "SH-1042",
    shareholding: 15400,
    phone: "0599779664",
  },
  {
    id: "agm-002",
    fullName: "Jane Afua Bruku",
    shareholderNumber: "SH-1059",
    shareholding: 9300,
    phone: "0248154869",
  },
  {
    id: "agm-003",
    fullName: "Nathaniel Oglie Narh",
    shareholderNumber: "SH-1108",
    shareholding: 22850,
    phone: "0246377830",
  },
  {
    id: "agm-004",
    fullName: "Ato Asiedu Mensah",
    shareholderNumber: "SH-1116",
    shareholding: 12000,
    phone: "0247554428",
  },
  {
    id: "agm-005",
    fullName: "Desmond Tettey Quarshie",
    shareholderNumber: "SH-1133",
    shareholding: 17640,
    phone: "0243670230",
  },
];

const DEFAULT_AGM_SETTINGS: AgmModuleSettings = {
  agmName: "Bawjiase Community Bank AGM",
  agmDate: "2026-06-15",
  venue: "Head Office Auditorium",
  quorumThreshold: 50,
  yearLabel: "2026",
  yearLocked: false,
  yearArchived: false,
  boardAutoRefresh: true,
};

function createDefaultAgmState(): AgmPortalState {
  return {
    settings: { ...DEFAULT_AGM_SETTINGS },
    shareholders: AGM_SHAREHOLDER_SEEDS.map((item) => ({ ...item })),
    registrations: [],
    archives: [],
  };
}

function emitChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(EVENT_NAME));
}

function parseStoredJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function readLocalState(): AgmPortalState {
  const fallback = createDefaultAgmState();
  const settings = {
    ...DEFAULT_AGM_SETTINGS,
    ...parseStoredJson<Partial<AgmModuleSettings>>(SETTINGS_STORAGE_KEY, {}),
  };
  const shareholders = parseStoredJson<AgmShareholderSeed[]>(
    SHAREHOLDER_STORAGE_KEY,
    fallback.shareholders,
  );
  const registrations = parseStoredJson<AgmRegistrationRecord[]>(
    REGISTRATIONS_STORAGE_KEY,
    [],
  );
  const archives = parseStoredJson<AgmYearArchive[]>(ARCHIVE_STORAGE_KEY, []);

  return {
    settings,
    shareholders: Array.isArray(shareholders) && shareholders.length > 0 ? shareholders : fallback.shareholders,
    registrations: Array.isArray(registrations) ? registrations : [],
    archives: Array.isArray(archives) ? archives : [],
  };
}

function persistLocalState(state: AgmPortalState, notify = true) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(state.settings));
  window.localStorage.setItem(
    SHAREHOLDER_STORAGE_KEY,
    JSON.stringify(state.shareholders),
  );
  window.localStorage.setItem(
    REGISTRATIONS_STORAGE_KEY,
    JSON.stringify(state.registrations),
  );
  window.localStorage.setItem(ARCHIVE_STORAGE_KEY, JSON.stringify(state.archives));
  if (notify) emitChange();
}

function getStoredSessionToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { sessionToken?: string };
    return typeof parsed.sessionToken === "string" && parsed.sessionToken
      ? parsed.sessionToken
      : null;
  } catch {
    return null;
  }
}

function withSessionToken(url: string): string {
  const token = getStoredSessionToken();
  if (!token) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}sessionToken=${encodeURIComponent(token)}`;
}

function getAuthHeaders(): Record<string, string> | undefined {
  const token = getStoredSessionToken();
  return token ? { Authorization: `Bearer ${token}` } : undefined;
}

function normalizeRemoteState(raw: unknown): AgmPortalState | null {
  if (!raw || typeof raw !== "object") return null;
  const source = raw as Record<string, unknown>;
  const fallback = createDefaultAgmState();
  return {
    settings: {
      ...DEFAULT_AGM_SETTINGS,
      ...(typeof source.settings === "object" && source.settings
        ? (source.settings as Partial<AgmModuleSettings>)
        : {}),
    },
    shareholders:
      Array.isArray(source.shareholders) && source.shareholders.length > 0
        ? (source.shareholders as AgmShareholderSeed[])
        : fallback.shareholders,
    registrations: Array.isArray(source.registrations)
      ? (source.registrations as AgmRegistrationRecord[])
      : [],
    archives: Array.isArray(source.archives)
      ? (source.archives as AgmYearArchive[])
      : [],
  };
}

let stateSnapshot = readLocalState();
let hydrationPromise: Promise<void> | null = null;
let syncSnapshot: AgmSyncStatus = {
  mode: "idle",
  lastSyncedAt: null,
  message: "AGM sync has not started yet.",
};

function updateSyncStatus(next: AgmSyncStatus) {
  syncSnapshot = next;
  emitChange();
}

async function fetchRemoteState(): Promise<AgmPortalState | null> {
  if (typeof window === "undefined") return null;
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), OPTIONAL_API_TIMEOUT_MS);
  updateSyncStatus({
    mode: "syncing",
    lastSyncedAt: syncSnapshot.lastSyncedAt,
    message: "Syncing AGM data from the shared backend...",
  });
  try {
    const response = await fetch(withSessionToken(`${MAIL_API_URL}/agm/state`), {
      method: "GET",
      cache: "no-store",
      headers: getAuthHeaders(),
      signal: controller.signal,
    });
    if (!response.ok) {
      updateSyncStatus({
        mode: "local-only",
        lastSyncedAt: syncSnapshot.lastSyncedAt,
        message: "Shared AGM backend is unavailable. Using local fallback data.",
      });
      return null;
    }
    const data = (await response.json().catch(() => ({}))) as {
      state?: unknown;
    };
    const normalized = normalizeRemoteState(data.state);
    updateSyncStatus({
      mode: "synced",
      lastSyncedAt: Date.now(),
      message: "AGM data is synced with the shared backend.",
    });
    return normalized;
  } catch {
    updateSyncStatus({
      mode: "local-only",
      lastSyncedAt: syncSnapshot.lastSyncedAt,
      message: "Shared AGM backend is unavailable. Using local fallback data.",
    });
    return null;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

async function saveRemoteState(state: AgmPortalState): Promise<void> {
  if (typeof window === "undefined") return;
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), OPTIONAL_API_TIMEOUT_MS);
  updateSyncStatus({
    mode: "syncing",
    lastSyncedAt: syncSnapshot.lastSyncedAt,
    message: "Saving AGM changes to the shared backend...",
  });
  try {
    const response = await fetch(withSessionToken(`${MAIL_API_URL}/agm/state`), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(getAuthHeaders() ?? {}),
      },
      body: JSON.stringify({ state }),
      signal: controller.signal,
    });
    if (!response.ok) {
      updateSyncStatus({
        mode: "local-only",
        lastSyncedAt: syncSnapshot.lastSyncedAt,
        message: "AGM changes were saved locally, but the shared backend did not respond.",
      });
      return;
    }
    updateSyncStatus({
      mode: "synced",
      lastSyncedAt: Date.now(),
      message: "AGM data is synced with the shared backend.",
    });
  } catch {
    updateSyncStatus({
      mode: "local-only",
      lastSyncedAt: syncSnapshot.lastSyncedAt,
      message: "AGM changes were saved locally, but the shared backend did not respond.",
    });
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function updateState(
  next:
    | AgmPortalState
    | ((current: AgmPortalState) => AgmPortalState),
  options?: { persistRemote?: boolean; notify?: boolean },
) {
  const resolved = typeof next === "function" ? next(stateSnapshot) : next;
  stateSnapshot = resolved;
  persistLocalState(stateSnapshot, options?.notify ?? true);
  if (options?.persistRemote !== false) {
    void saveRemoteState(stateSnapshot);
  }
  return stateSnapshot;
}

function getSnapshot() {
  return stateSnapshot;
}

function ensureHydrated() {
  if (typeof window === "undefined" || hydrationPromise) return;
  hydrationPromise = (async () => {
    const remote = await fetchRemoteState();
    if (remote) {
      stateSnapshot = remote;
      persistLocalState(stateSnapshot, false);
      emitChange();
    }
  })().finally(() => {
    hydrationPromise = null;
  });
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => undefined;
  ensureHydrated();
  const handleStorage = (event: StorageEvent) => {
    if (
      event.key === REGISTRATIONS_STORAGE_KEY ||
      event.key === SHAREHOLDER_STORAGE_KEY ||
      event.key === SETTINGS_STORAGE_KEY ||
      event.key === ARCHIVE_STORAGE_KEY
    ) {
      stateSnapshot = readLocalState();
      callback();
    }
  };
  const handleEvent = () => {
    stateSnapshot = readLocalState();
    callback();
  };
  window.addEventListener("storage", handleStorage);
  window.addEventListener(EVENT_NAME, handleEvent);
  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(EVENT_NAME, handleEvent);
  };
}

export function useAgmRegistrations() {
  return useSyncExternalStore(
    subscribe,
    () => getSnapshot().registrations,
    () => [],
  );
}

export function useAgmSettings() {
  return useSyncExternalStore(
    subscribe,
    () => getSnapshot().settings,
    () => DEFAULT_AGM_SETTINGS,
  );
}

export function useAgmArchives() {
  return useSyncExternalStore(subscribe, () => getSnapshot().archives, () => []);
}

export function useAgmSyncStatus() {
  return useSyncExternalStore(subscribe, () => syncSnapshot, () => syncSnapshot);
}

export async function refreshAgmState() {
  const remote = await fetchRemoteState();
  if (remote) {
    stateSnapshot = remote;
    persistLocalState(stateSnapshot, false);
    emitChange();
  }
}

export function getAgmShareholders(): AgmShareholderView[] {
  const { registrations, shareholders } = getSnapshot();
  return shareholders.map((seed) => {
    const registration =
      registrations.find((item) => item.shareholderId === seed.id) ?? undefined;
    return {
      ...seed,
      status: registration ? "Registered" : "Not Registered",
      registration,
    };
  });
}

export function useAgmShareholders() {
  return useSyncExternalStore(subscribe, getAgmShareholders, () => []);
}

export function saveAgmRegistration(
  input: Omit<AgmRegistrationRecord, "id" | "registeredAt" | "checkedIn">,
) {
  const nextRecord: AgmRegistrationRecord = {
    ...input,
    id: `agm-reg-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    registeredAt: new Date().toISOString(),
    checkedIn: false,
  };
  updateState((current) => ({
    ...current,
    registrations: [
      ...current.registrations.filter(
        (item) => item.shareholderId !== input.shareholderId,
      ),
      nextRecord,
    ],
  }));
  return nextRecord;
}

export function removeAgmRegistration(registrationId: string) {
  updateState((current) => ({
    ...current,
    registrations: current.registrations.filter((item) => item.id !== registrationId),
  }));
}

export function toggleAgmCheckIn(registrationId: string) {
  updateState((current) => ({
    ...current,
    registrations: current.registrations.map((item) =>
      item.id === registrationId ? { ...item, checkedIn: !item.checkedIn } : item,
    ),
  }));
}

export function importAgmShareholders(records: AgmShareholderSeed[]) {
  const cleaned = records
    .map((item, index) => ({
      id:
        item.id?.trim() ||
        `agm-import-${index + 1}-${item.shareholderNumber
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")}`,
      fullName: item.fullName.trim(),
      shareholderNumber: item.shareholderNumber.trim(),
      shareholding: Number.isFinite(item.shareholding) ? item.shareholding : 0,
      phone: item.phone.trim(),
    }))
    .filter(
      (item) => item.fullName.length > 0 && item.shareholderNumber.length > 0,
    );

  updateState((current) => {
    const nextShareholders =
      cleaned.length > 0 ? cleaned : AGM_SHAREHOLDER_SEEDS.map((item) => ({ ...item }));
    const validIds = new Set(nextShareholders.map((item) => item.id));
    return {
      ...current,
      shareholders: nextShareholders,
      registrations: current.registrations.filter((item) =>
        validIds.has(item.shareholderId),
      ),
    };
  });
}

export function resetAgmShareholdersToSeed() {
  updateState((current) => ({
    ...current,
    shareholders: AGM_SHAREHOLDER_SEEDS.map((item) => ({ ...item })),
  }));
}

export function saveAgmSettings(
  updates: Partial<AgmModuleSettings>,
): AgmModuleSettings {
  const next = updateState((current) => ({
    ...current,
    settings: {
      ...current.settings,
      ...updates,
    },
  }));
  return next.settings;
}

export function resetAgmModule() {
  updateState(createDefaultAgmState());
}

export function clearAgmRegistrations() {
  updateState((current) => ({
    ...current,
    registrations: [],
  }));
}

export function archiveCurrentAgmYear(note = "") {
  const current = getSnapshot();
  const archive: AgmYearArchive = {
    id: `agm-archive-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    archivedAt: new Date().toISOString(),
    note: note.trim(),
    settings: { ...current.settings },
    shareholders: current.shareholders.map((item) => ({ ...item })),
    registrations: current.registrations.map((item) => ({ ...item })),
  };
  updateState((existing) => ({
    ...existing,
    settings: {
      ...existing.settings,
      yearArchived: true,
    },
    archives: [archive, ...existing.archives].sort(
      (left, right) =>
        new Date(right.archivedAt).getTime() - new Date(left.archivedAt).getTime(),
    ),
  }));
  return archive;
}

export function restoreArchivedAgmYear(archiveId: string) {
  const archive = getSnapshot().archives.find((item) => item.id === archiveId);
  if (!archive) return null;
  updateState((current) => ({
    ...current,
    settings: {
      ...archive.settings,
      yearArchived: false,
    },
    shareholders: archive.shareholders.map((item) => ({ ...item })),
    registrations: archive.registrations.map((item) => ({ ...item })),
  }));
  return archive;
}

export function deleteArchivedAgmYear(archiveId: string) {
  updateState((current) => ({
    ...current,
    archives: current.archives.filter((item) => item.id !== archiveId),
  }));
}
