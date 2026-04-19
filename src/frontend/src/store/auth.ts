import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import type { ReactNode } from "react";
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

const AUTH_KEY = "barb_auth_user";
const THEME_KEY = "barb_theme";
const AUTH_EXPIRY_KEY = "barb_auth_expiry";
const REMEMBER_DAYS = 30;

function loadStoredUser(): User | null {
  try {
    const expiry = localStorage.getItem(AUTH_EXPIRY_KEY);
    if (expiry && Date.now() > Number(expiry)) {
      localStorage.removeItem(AUTH_KEY);
      localStorage.removeItem(AUTH_EXPIRY_KEY);
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

function saveStoredUser(user: User, remember: boolean) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  if (remember) {
    const expiry = Date.now() + REMEMBER_DAYS * 24 * 60 * 60 * 1000;
    localStorage.setItem(AUTH_EXPIRY_KEY, String(expiry));
  }
}

function clearStoredUser() {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(AUTH_EXPIRY_KEY);
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

  const login = useCallback((newUser: User, remember = true) => {
    setUser(newUser);
    saveStoredUser(newUser, remember);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    clearStoredUser();
  }, []);

  const updateUser = useCallback((updatedUser: User) => {
    setUser(updatedUser);
    const expiry = localStorage.getItem(AUTH_EXPIRY_KEY);
    saveStoredUser(updatedUser, !!expiry);
  }, []);

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
