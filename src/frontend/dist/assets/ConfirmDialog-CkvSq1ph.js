import { j as jsxRuntimeExports } from "./index-CQG1vcXg.js";
import { A as AlertDialog, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-eGI2SttW.js";
function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  onConfirm
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    AlertDialogContent,
    {
      className: "glass-card-elevated",
      "data-ocid": "confirm.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: title }),
          description && /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "confirm.cancel_button", children: cancelLabel }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AlertDialogAction,
            {
              onClick: onConfirm,
              className: variant === "destructive" ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : "",
              "data-ocid": "confirm.confirm_button",
              children: confirmLabel
            }
          )
        ] })
      ]
    }
  ) });
}
export {
  ConfirmDialog as C
};
