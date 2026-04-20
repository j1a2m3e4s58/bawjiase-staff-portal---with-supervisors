import { u as useAuth, j as jsxRuntimeExports } from "./index-CQG1vcXg.js";
function RoleGuard({
  roles,
  children,
  fallback = null
}) {
  const { user } = useAuth();
  if (!user) return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: fallback });
  if (!roles.includes(user.role)) return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: fallback });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
}
function useHasRole(roles) {
  const { user } = useAuth();
  if (!user) return false;
  return roles.includes(user.role);
}
export {
  RoleGuard as R,
  useHasRole as u
};
