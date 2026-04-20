import { useAuth } from "@/store/auth";
import type { Role } from "@/types";
import type { ReactNode } from "react";

interface RoleGuardProps {
  roles: Role[];
  children: ReactNode;
  fallback?: ReactNode;
}

export function RoleGuard({
  roles,
  children,
  fallback = null,
}: RoleGuardProps) {
  const { user } = useAuth();
  if (!user) return <>{fallback}</>;
  if (!roles.includes(user.role)) return <>{fallback}</>;
  return <>{children}</>;
}

export function useHasRole(roles: Role[]): boolean {
  const { user } = useAuth();
  if (!user) return false;
  return roles.includes(user.role);
}
