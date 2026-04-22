import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import type { ReactNode } from "react";
import { apiLogout, apiUpdateLastSeen } from "@/lib/backend-client";
import type { User } from "../types";

// ── Theme ─────────────────────────────────────────────────────────────────────

type ThemeMode = "light" | "dark";

function applyTheme(mode: ThemeMode) {
  const root = document.documentElement;
  if (mode === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

// ── Auth Storage ──────────────────────────────────────────────────────────────

const AUTH_KEY = "bcb_auth_user";
const THEME_KEY = "bcb_theme";
const AUTH_EXPIRY_KEY = "bcb_auth_expiry";
const AUTH_ACTIVITY_KEY = "bcb_last_activity";
const SESSION_EXPIRED_EVENT = "bcb:session-expired";
const REMEMBER_DAYS = 30;
const INACTIVITY_LIMIT_MS = 15 * 60 * 1000;
const PRESENCE_PING_MS = 60 * 1000;

function markActivity(timestamp = Date.now()) {
  localStorage.setItem(AUTH_ACTIVITY_KEY, String(timestamp));
}

function loadStoredUser(): User | null {
  try {
    const expiry = localStorage.getItem(AUTH_EXPIRY_KEY);
    if (expiry && Date.now() > Number(expiry)) {
      localStorage.removeItem(AUTH_KEY);
      localStorage.removeItem(AUTH_EXPIRY_KEY);
      localStorage.removeItem(AUTH_ACTIVITY_KEY);
      return null;
    }
    const lastActivity = localStorage.getItem(AUTH_ACTIVITY_KEY);
    if (lastActivity && Date.now() - Number(lastActivity) > INACTIVITY_LIMIT_MS) {
      localStorage.removeItem(AUTH_KEY);
      localStorage.removeItem(AUTH_EXPIRY_KEY);
      localStorage.removeItem(AUTH_ACTIVITY_KEY);
      return null;
    }
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as User;
    // Re-hydrate bigints
    parsed.lastSeen = BigInt(parsed.lastSeen ?? 0);
    parsed.registrationTime = BigInt(parsed.registrationTime ?? 0);
    return parsed;
  } catch {
    return null;
  }
}

function saveStoredUser(user: User, remember: boolean, updateActivity = true) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  if (updateActivity) {
    markActivity();
  }
  if (remember) {
    const expiry = Date.now() + REMEMBER_DAYS * 24 * 60 * 60 * 1000;
    localStorage.setItem(AUTH_EXPIRY_KEY, String(expiry));
  }
}

function clearStoredUser() {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(AUTH_EXPIRY_KEY);
  localStorage.removeItem(AUTH_ACTIVITY_KEY);
}

// ── Context ───────────────────────────────────────────────────────────────────

interface AuthContextValue {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (user: User, remember?: boolean) => void;
  logout: () => void;
  updateUser: (user: User) => void;
  themeMode: ThemeMode;
  toggleTheme: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ── Provider ──────────────────────────────────────────────────────────────────

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const authSessionRef = useRef(0);
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const stored = localStorage.getItem(THEME_KEY) as ThemeMode | null;
    return stored ?? "dark";
  });

  useEffect(() => {
    applyTheme(themeMode);
  }, [themeMode]);

  useEffect(() => {
    const storedUser = loadStoredUser();
    setUser(storedUser);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const handleSessionExpired = () => {
      authSessionRef.current += 1;
      setUser(null);
      clearStoredUser();
    };

    window.addEventListener(SESSION_EXPIRED_EVENT, handleSessionExpired);
    return () => {
      window.removeEventListener(SESSION_EXPIRED_EVENT, handleSessionExpired);
    };
  }, []);

  useEffect(() => {
    if (!user) return;

    const sessionId = authSessionRef.current;
    let cancelled = false;
    let timeoutId: number | undefined;
    let lastPing = 0;

    const persistUser = (updatedUser: User) => {
      if (cancelled || authSessionRef.current !== sessionId) return;
      const mergedUser = {
        ...updatedUser,
        sessionToken: updatedUser.sessionToken ?? user.sessionToken,
      };
      setUser(mergedUser);
      const remember = !!localStorage.getItem(AUTH_EXPIRY_KEY);
      saveStoredUser(mergedUser, remember, false);
    };

    const pingPresence = async () => {
      const result = await apiUpdateLastSeen(user.id);
      if (cancelled || authSessionRef.current !== sessionId) return;
      if ("ok" in result) {
        persistUser(result.ok);
      }
    };

    const scheduleTimeout = () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        if (cancelled || authSessionRef.current !== sessionId) return;
        setUser(null);
        clearStoredUser();
      }, INACTIVITY_LIMIT_MS);
    };

    const handleActivity = () => {
      const now = Date.now();
      markActivity(now);
      scheduleTimeout();
      if (document.visibilityState === "visible" && now - lastPing >= PRESENCE_PING_MS) {
        lastPing = now;
        void pingPresence();
      }
    };

    handleActivity();

    const intervalId = window.setInterval(() => {
      if (cancelled || authSessionRef.current !== sessionId) return;
      const lastActivity = Number(localStorage.getItem(AUTH_ACTIVITY_KEY) ?? "0");
      if (!lastActivity || Date.now() - lastActivity > INACTIVITY_LIMIT_MS) {
        setUser(null);
        clearStoredUser();
        return;
      }
      if (document.visibilityState === "visible") {
        void pingPresence();
      }
    }, PRESENCE_PING_MS);

    const onVisibility = () => {
      if (document.visibilityState === "visible") handleActivity();
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("mousedown", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("touchstart", handleActivity);
    window.addEventListener("focus", handleActivity);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      if (timeoutId) window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("mousedown", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("touchstart", handleActivity);
      window.removeEventListener("focus", handleActivity);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [user]);

  const login = useCallback((newUser: User, remember = true) => {
    authSessionRef.current += 1;
    setUser(newUser);
    saveStoredUser(newUser, remember);
  }, []);

  const logout = useCallback(() => {
    const currentUserId = user?.id;
    if (currentUserId) {
      void apiLogout(currentUserId);
    }
    authSessionRef.current += 1;
    setUser(null);
    clearStoredUser();
  }, [user]);

  const updateUser = useCallback((updatedUser: User) => {
    const mergedUser = {
      ...updatedUser,
      sessionToken: updatedUser.sessionToken ?? user?.sessionToken,
    };
    setUser(mergedUser);
    const expiry = localStorage.getItem(AUTH_EXPIRY_KEY);
    saveStoredUser(mergedUser, !!expiry);
  }, [user?.sessionToken]);

  const toggleTheme = useCallback(() => {
    setThemeMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem(THEME_KEY, next);
      return next;
    });
  }, []);

  const value: AuthContextValue = {
    user,
    isLoggedIn: !!user,
    isLoading,
    login,
    logout,
    updateUser,
    themeMode,
    toggleTheme,
  };

  return React.createElement(AuthContext.Provider, { value }, children);
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
