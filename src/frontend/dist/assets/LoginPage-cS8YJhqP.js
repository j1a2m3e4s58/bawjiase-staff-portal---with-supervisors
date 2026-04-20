import { u as useAuth, a as useNavigate, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-CQG1vcXg.js";
import { A as AuthShell, L as LoaderCircle } from "./AuthShell-e9-md1Cn.js";
import { B as Button, a as apiLogin, u as ue } from "./backend-client-D43GVmUU.js";
import { C as Checkbox } from "./checkbox-CBUzxxNr.js";
import { I as Input } from "./input-DPUfhcLy.js";
import { L as Label } from "./label-Dv6GBfaU.js";
import { i as isOk } from "./index-DgNPai41.js";
import { M as Mail } from "./mail-DYxVF3HN.js";
import { L as Lock } from "./lock-BnRLoo6f.js";
import { E as EyeOff } from "./eye-off-DyVHeqct.js";
import { E as Eye } from "./eye-CcPu1L07.js";
import "./index-pajndnDv.js";
import "./index-BICF_Lkm.js";
import "./index-CqbiV51T.js";
function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [rememberMe, setRememberMe] = reactExports.useState(true);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoading(true);
    try {
      const result = await apiLogin(email, password);
      if (isOk(result)) {
        login(result.ok, rememberMe);
        ue.success(`Welcome back, ${result.ok.fullname.split(" ")[0]}!`);
        navigate({ to: "/" });
      } else {
        ue.error(result.err);
      }
    } catch {
      ue.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AuthShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-center mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-foreground text-2xl", children: "Sign In" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Access the BARB Staff Portal" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        className: "space-y-4",
        "data-ocid": "login.form",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", className: "text-sm font-medium", children: "Email Address" }),
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
                  "data-ocid": "login.email.input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", className: "text-sm font-medium", children: "Password" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/forgot-password",
                  className: "text-xs text-primary hover:text-primary/80 transition-smooth",
                  "data-ocid": "login.forgot_password.link",
                  children: "Forgot password?"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "password",
                  type: showPassword ? "text" : "password",
                  placeholder: "Enter your password",
                  value: password,
                  onChange: (e) => setPassword(e.target.value),
                  className: "glass-input pl-10 pr-10",
                  autoComplete: "current-password",
                  required: true,
                  "data-ocid": "login.password.input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth",
                  onClick: () => setShowPassword(!showPassword),
                  "aria-label": showPassword ? "Hide password" : "Show password",
                  "data-ocid": "login.password_toggle.button",
                  children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Checkbox,
              {
                id: "remember",
                checked: rememberMe,
                onCheckedChange: (v) => setRememberMe(v === true),
                "data-ocid": "login.remember_me.checkbox"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "remember",
                className: "text-sm text-muted-foreground cursor-pointer",
                children: "Keep me signed in for 30 days"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              className: "w-full glass-button h-11 font-semibold text-sm",
              disabled: isLoading || !email || !password,
              "data-ocid": "login.submit_button",
              children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
                "Signing in…"
              ] }) : "Sign In"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 text-center text-sm text-muted-foreground", children: [
      "Don't have an account?",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/register",
          className: "text-primary font-medium hover:text-primary/80 transition-smooth",
          "data-ocid": "login.register.link",
          children: "Register"
        }
      )
    ] })
  ] });
}
export {
  LoginPage as default
};
