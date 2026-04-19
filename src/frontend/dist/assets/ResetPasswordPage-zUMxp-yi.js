import { a as useNavigate, b as useSearch, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-CQG1vcXg.js";
import { A as AuthShell, L as LoaderCircle } from "./AuthShell-e9-md1Cn.js";
import { B as Button, u as ue, d as apiConfirmPasswordReset } from "./backend-client-D43GVmUU.js";
import { I as Input } from "./input-DPUfhcLy.js";
import { L as Label } from "./label-Dv6GBfaU.js";
import { i as isOk } from "./index-DgNPai41.js";
import { C as CircleCheck } from "./circle-check-D6oZnHsX.js";
import { L as Lock } from "./lock-BnRLoo6f.js";
import { E as EyeOff } from "./eye-off-DyVHeqct.js";
import { E as Eye } from "./eye-CcPu1L07.js";
function simpleHash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(31, h) + s.charCodeAt(i) | 0;
  }
  return String(Math.abs(h));
}
function ResetPasswordPage() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const token = search.token ?? "";
  const [newPassword, setNewPassword] = reactExports.useState("");
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [done, setDone] = reactExports.useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      ue.error("Passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      ue.error("Password must be at least 8 characters.");
      return;
    }
    if (!token) {
      ue.error("Invalid or expired reset link.");
      return;
    }
    setIsLoading(true);
    try {
      const result = await apiConfirmPasswordReset(
        token,
        simpleHash(newPassword)
      );
      if (isOk(result)) {
        setDone(true);
        setTimeout(() => navigate({ to: "/login" }), 3e3);
      } else {
        ue.error(
          result.err || "Failed to reset password. The link may have expired."
        );
      }
    } catch {
      ue.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }
  if (done) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 text-center py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-secondary/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-7 w-7 text-secondary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground text-xl mb-1", children: "Password Reset!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Your password has been updated. Redirecting to sign in…" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/login",
          className: "text-sm text-primary hover:text-primary/80 transition-smooth",
          "data-ocid": "reset.login.link",
          children: "Go to Sign In"
        }
      )
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AuthShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-center mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-foreground text-2xl", children: "New Password" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Choose a strong password for your account" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        className: "space-y-4",
        "data-ocid": "reset.form",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "new-password", children: "New Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "new-password",
                  type: showPassword ? "text" : "password",
                  placeholder: "At least 8 characters",
                  value: newPassword,
                  onChange: (e) => setNewPassword(e.target.value),
                  className: "glass-input pl-10 pr-10",
                  autoComplete: "new-password",
                  minLength: 8,
                  required: true,
                  "data-ocid": "reset.new_password.input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth",
                  onClick: () => setShowPassword(!showPassword),
                  "aria-label": showPassword ? "Hide" : "Show",
                  children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "confirm-password", children: "Confirm Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "confirm-password",
                  type: showPassword ? "text" : "password",
                  placeholder: "Repeat new password",
                  value: confirmPassword,
                  onChange: (e) => setConfirmPassword(e.target.value),
                  className: "glass-input pl-10",
                  autoComplete: "new-password",
                  required: true,
                  "data-ocid": "reset.confirm_password.input"
                }
              )
            ] }),
            confirmPassword && newPassword !== confirmPassword && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs text-destructive mt-1",
                "data-ocid": "reset.password_mismatch.error_state",
                children: "Passwords do not match"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              className: "w-full glass-button h-11 font-semibold",
              disabled: isLoading || !newPassword || !confirmPassword || newPassword !== confirmPassword,
              "data-ocid": "reset.submit_button",
              children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
                " Resetting…"
              ] }) : "Reset Password"
            }
          )
        ]
      }
    )
  ] });
}
export {
  ResetPasswordPage as default
};
