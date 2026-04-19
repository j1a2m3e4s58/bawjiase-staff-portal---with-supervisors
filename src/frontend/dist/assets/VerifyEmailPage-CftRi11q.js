import { a as useNavigate, b as useSearch, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-CQG1vcXg.js";
import { A as AuthShell, L as LoaderCircle } from "./AuthShell-e9-md1Cn.js";
import { B as Button, f as apiVerifyEmail, u as ue, g as apiResendCode } from "./backend-client-D43GVmUU.js";
import { I as Input } from "./input-DPUfhcLy.js";
import { L as Label } from "./label-Dv6GBfaU.js";
import { i as isOk } from "./index-DgNPai41.js";
import { A as ArrowLeft } from "./arrow-left-bPk6U5to.js";
function VerifyEmailPage() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const email = search.email ?? "";
  const [code, setCode] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [isResending, setIsResending] = reactExports.useState(false);
  async function handleVerify(e) {
    e.preventDefault();
    if (code.length < 6) return;
    setIsLoading(true);
    try {
      const result = await apiVerifyEmail(email, code);
      if (isOk(result)) {
        ue.success("Email verified! Please sign in.");
        navigate({ to: "/login" });
      } else {
        ue.error(result.err || "Invalid code. Please try again.");
      }
    } catch {
      ue.error("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }
  async function handleResend() {
    if (!email) {
      ue.error("Email address is missing. Please re-register.");
      return;
    }
    setIsResending(true);
    try {
      const result = await apiResendCode(email);
      if (isOk(result)) {
        ue.success("New verification code sent!");
      } else {
        ue.error(result.err || "Could not resend code.");
      }
    } catch {
      ue.error("Failed to resend code.");
    } finally {
      setIsResending(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AuthShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-center mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-foreground text-2xl", children: "Verify Your Email" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: email ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        "We sent a 6-digit code to",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: email })
      ] }) : "Enter the 6-digit verification code from your email" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleVerify,
        className: "space-y-4",
        "data-ocid": "verify_email.form",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "verify-code", children: "Verification Code" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "verify-code",
                type: "text",
                inputMode: "numeric",
                pattern: "\\d{6}",
                maxLength: 6,
                placeholder: "000000",
                value: code,
                onChange: (e) => setCode(e.target.value.replace(/\D/g, "")),
                className: "glass-input text-center text-2xl tracking-[0.5em] font-mono h-14",
                required: true,
                "data-ocid": "verify_email.code.input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "Check your spam folder if you don't see it within 2 minutes" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              className: "w-full glass-button h-11 font-semibold",
              disabled: isLoading || code.length < 6,
              "data-ocid": "verify_email.submit_button",
              children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
                " Verifying…"
              ] }) : "Verify Email"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-col items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        "Didn't receive the code?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "text-primary font-medium hover:text-primary/80 transition-smooth disabled:opacity-50",
            onClick: handleResend,
            disabled: isResending,
            "data-ocid": "verify_email.resend.button",
            children: isResending ? "Sending…" : "Resend Code"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/login",
          className: "flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth",
          "data-ocid": "verify_email.back.link",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
            "Back to Sign In"
          ]
        }
      )
    ] })
  ] });
}
export {
  VerifyEmailPage as default
};
