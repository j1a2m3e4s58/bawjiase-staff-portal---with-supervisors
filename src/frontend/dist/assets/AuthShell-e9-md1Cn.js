import { e as createLucideIcon, T as ThemeToggle, h as Toaster } from "./backend-client-D43GVmUU.js";
import { j as jsxRuntimeExports, c as cn } from "./index-CQG1vcXg.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode);
function BARBLogoBadge() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center gap-2",
      "data-ocid": "auth.barb_badge",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full flex items-center justify-center font-display font-bold text-2xl bg-primary/20 border-2 border-primary/40 text-primary ring-4 ring-primary/10 shadow-glass", children: "B" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-foreground tracking-wide text-sm", children: "BARB" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground uppercase tracking-widest", children: "Bawjiase Area Rural Bank" })
        ] })
      ]
    }
  );
}
function AuthShell({ children, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen flex flex-col bg-background relative overflow-hidden",
      "data-ocid": "auth_shell",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/15" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-secondary/10 blur-3xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex-1 flex items-center justify-center px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "w-full max-w-md glass-card-elevated rounded-2xl p-8 shadow-glass-dark",
              className
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BARBLogoBadge, {}) }),
              children
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative text-center pb-6 text-xs text-muted-foreground", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " Bawjiase Area Rural Bank PLC. All rights reserved."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-right" })
      ]
    }
  );
}
export {
  AuthShell as A,
  LoaderCircle as L
};
