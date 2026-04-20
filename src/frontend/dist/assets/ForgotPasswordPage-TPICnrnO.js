import { r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-CQG1vcXg.js";
import { A as AuthShell, L as LoaderCircle } from "./AuthShell-e9-md1Cn.js";
import { B as Button, c as apiRequestPasswordReset, u as ue } from "./backend-client-D43GVmUU.js";
import { I as Input } from "./input-DPUfhcLy.js";
import { L as Label } from "./label-Dv6GBfaU.js";
import { i as isOk } from "./index-DgNPai41.js";
import { C as CircleCheck } from "./circle-check-D6oZnHsX.js";
import { A as ArrowLeft } from "./arrow-left-bPk6U5to.js";
import { M as Mail } from "./mail-DYxVF3HN.js";
function ForgotPasswordPage() {
  const [email, setEmail] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [sent, setSent] = reactExports.useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    try {
      const result = await apiRequestPasswordReset(email);
      if (isOk(result)) {
        setSent(true);
      } else {
        ue.error(result.err);
      }
    } catch {
      ue.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }
  if (sent) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 text-center py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-secondary/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-7 w-7 text-secondary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground text-xl mb-1", children: "Check Your Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "We've sent a password reset link to",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: email })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground max-w-xs", children: "The link expires in 30 minutes. If you don't see it, check your spam folder." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/login",
          className: "flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-smooth mt-2",
          "data-ocid": "forgot.back_to_login.link",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
            "Back to Sign In"
          ]
        }
      )
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AuthShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-center mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-foreground text-2xl", children: "Reset Password" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Enter your official email to receive a reset link" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        className: "space-y-4",
        "data-ocid": "forgot.form",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Official Email Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "email",
                  type: "email",
                  placeholder: "you@bawjiasearearuralbank.com",
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  className: "glass-input pl-10",
                  autoComplete: "email",
                  required: true,
                  "data-ocid": "forgot.email.input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              className: "w-full glass-button h-11 font-semibold",
              disabled: isLoading || !email,
              "data-ocid": "forgot.submit_button",
              children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
                " Sending…"
              ] }) : "Send Reset Link"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/login",
        className: "flex items-center justify-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-smooth",
        "data-ocid": "forgot.back_to_login.link",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
          "Back to Sign In"
        ]
      }
    ) })
  ] });
}
export {
  ForgotPasswordPage as default
};
