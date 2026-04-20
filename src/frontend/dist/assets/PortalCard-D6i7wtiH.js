import { j as jsxRuntimeExports, c as cn } from "./index-CQG1vcXg.js";
function PortalCard({
  title,
  subtitle,
  children,
  className,
  elevated = false,
  action,
  "data-ocid": ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "rounded-xl p-5 transition-smooth",
        elevated ? "glass-card-elevated" : "glass-card",
        className
      ),
      "data-ocid": ocid,
      children: [
        (title || action) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            title && /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-base leading-tight", children: title }),
            subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: subtitle })
          ] }),
          action && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-3 flex-shrink-0", children: action })
        ] }),
        children
      ]
    }
  );
}
export {
  PortalCard as P
};
