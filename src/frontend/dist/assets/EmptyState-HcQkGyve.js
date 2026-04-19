import { j as jsxRuntimeExports, c as cn } from "./index-CQG1vcXg.js";
import { B as Button } from "./backend-client-D43GVmUU.js";
function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
  "data-ocid": ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center",
        className
      ),
      "data-ocid": ocid,
      children: [
        icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4 text-muted-foreground", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-lg mb-1.5", children: title }),
        description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: description }),
        actionLabel && onAction && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "mt-5",
            onClick: onAction,
            "data-ocid": "empty_state.primary_button",
            children: actionLabel
          }
        )
      ]
    }
  );
}
export {
  EmptyState as E
};
