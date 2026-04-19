const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/backend-client-D43GVmUU.js","assets/index-CQG1vcXg.js","assets/index-i02e4Ars.css"])))=>i.map(i=>d[i]);
import { u as useAuth, a as useNavigate, r as reactExports, j as jsxRuntimeExports, L as Link, _ as __vitePreload } from "./index-CQG1vcXg.js";
import { A as AuthShell, L as LoaderCircle } from "./AuthShell-e9-md1Cn.js";
import { B as Button, u as ue, b as apiRegister } from "./backend-client-D43GVmUU.js";
import { I as Input } from "./input-DPUfhcLy.js";
import { L as Label } from "./label-Dv6GBfaU.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BO4KPWc9.js";
import { D as DEPARTMENTS, B as BRANCHES, i as isOk } from "./index-DgNPai41.js";
import { E as EyeOff } from "./eye-off-DyVHeqct.js";
import { E as Eye } from "./eye-CcPu1L07.js";
import { C as ChevronRight } from "./Combination-BpDQgzvQ.js";
import "./index-pajndnDv.js";
import "./index-BICF_Lkm.js";
function simpleHash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(31, h) + s.charCodeAt(i) | 0;
  }
  return String(Math.abs(h));
}
function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = reactExports.useState("form");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [fullname, setFullname] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [position, setPosition] = reactExports.useState("");
  const [department, setDepartment] = reactExports.useState("");
  const [branch, setBranch] = reactExports.useState("");
  const [accessCode, setAccessCode] = reactExports.useState("");
  const [verifyCode, setVerifyCode] = reactExports.useState("");
  const needsAccessCode = department === "IT" || department === "HR";
  async function handleRegister(e) {
    e.preventDefault();
    if (!email.endsWith("@bawjiasearearuralbank.com")) {
      ue.error("Please use your official @bawjiasearearuralbank.com email");
      return;
    }
    setIsLoading(true);
    try {
      const role = department === "IT" || department === "HR" ? accessCode === "BARB-IT-2026" ? "SuperAdmin" : "HRAdmin" : "GeneralStaff";
      const result = await apiRegister({
        fullname,
        phone,
        email,
        passwordHash: simpleHash(password),
        role,
        position,
        department,
        branch,
        accessCode: needsAccessCode ? accessCode : void 0
      });
      if (isOk(result)) {
        setStep("verify");
        ue.success(
          "Registration submitted! Check your email for verification code."
        );
      } else {
        ue.error(result.err);
      }
    } catch {
      ue.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }
  async function handleVerify(e) {
    e.preventDefault();
    if (verifyCode.length < 6) {
      ue.error("Please enter the 6-digit code from your email.");
      return;
    }
    setIsLoading(true);
    try {
      const loginResult = await __vitePreload(() => import("./backend-client-D43GVmUU.js").then((n) => n.a7), true ? __vite__mapDeps([0,1,2]) : void 0).then(
        (m) => m.apiVerifyEmail(email, verifyCode)
      );
      if (isOk(loginResult)) {
        const userResult = await __vitePreload(() => import("./backend-client-D43GVmUU.js").then((n) => n.a7), true ? __vite__mapDeps([0,1,2]) : void 0).then(
          (m) => m.apiLogin(email, simpleHash(password))
        );
        if (isOk(userResult)) {
          login(userResult.ok, true);
          ue.success(
            `Welcome to BARB Staff Portal, ${userResult.ok.fullname.split(" ")[0]}!`
          );
          navigate({ to: "/" });
        }
      } else {
        ue.error("Invalid verification code. Please try again.");
      }
    } catch {
      ue.error("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }
  if (step === "verify") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(AuthShell, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-center mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-foreground text-2xl", children: "Verify Your Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "We sent a 6-digit code to ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: email })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleVerify,
          className: "space-y-4",
          "data-ocid": "verify.form",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "code", children: "Verification Code" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "code",
                  type: "text",
                  inputMode: "numeric",
                  pattern: "\\d{6}",
                  maxLength: 6,
                  placeholder: "000000",
                  value: verifyCode,
                  onChange: (e) => setVerifyCode(e.target.value.replace(/\D/g, "")),
                  className: "glass-input text-center text-xl tracking-widest font-mono h-14",
                  required: true,
                  "data-ocid": "verify.code.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "w-full glass-button h-11 font-semibold",
                disabled: isLoading || verifyCode.length < 6,
                "data-ocid": "verify.submit_button",
                children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
                  " Verifying…"
                ] }) : "Verify & Sign In"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground", children: [
              "Didn't get the code?",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "text-primary hover:underline",
                  onClick: () => ue.info("Resend code feature — demo mode"),
                  "data-ocid": "verify.resend.button",
                  children: "Resend"
                }
              )
            ] })
          ]
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AuthShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-center mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-foreground text-2xl", children: "Create Account" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Join the BARB Staff Portal" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleRegister,
        className: "space-y-3.5",
        "data-ocid": "register.form",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "fullname", children: "Full Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "fullname",
                  placeholder: "Your full name",
                  value: fullname,
                  onChange: (e) => setFullname(e.target.value),
                  className: "glass-input",
                  required: true,
                  "data-ocid": "register.fullname.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phone", children: "Phone" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "phone",
                  type: "tel",
                  placeholder: "024 XXX XXXX",
                  value: phone,
                  onChange: (e) => setPhone(e.target.value),
                  className: "glass-input",
                  required: true,
                  "data-ocid": "register.phone.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "position", children: "Position" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "position",
                  placeholder: "Your position",
                  value: position,
                  onChange: (e) => setPosition(e.target.value),
                  className: "glass-input",
                  required: true,
                  "data-ocid": "register.position.input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reg-email", children: "Official Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "reg-email",
                type: "email",
                placeholder: "you@bawjiasearearuralbank.com",
                value: email,
                onChange: (e) => setEmail(e.target.value),
                className: "glass-input",
                autoComplete: "email",
                required: true,
                "data-ocid": "register.email.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reg-password", children: "Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "reg-password",
                  type: showPassword ? "text" : "password",
                  placeholder: "Create a strong password",
                  value: password,
                  onChange: (e) => setPassword(e.target.value),
                  className: "glass-input pr-10",
                  autoComplete: "new-password",
                  minLength: 8,
                  required: true,
                  "data-ocid": "register.password.input"
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
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Department" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: department, onValueChange: setDepartment, required: true, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "glass-input",
                    "data-ocid": "register.department.select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select dept." })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: DEPARTMENTS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: d, children: d }, d)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Branch" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: branch, onValueChange: setBranch, required: true, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "glass-input",
                    "data-ocid": "register.branch.select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select branch" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: BRANCHES.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: b, children: b }, b)) })
              ] })
            ] })
          ] }),
          needsAccessCode && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "access-code", children: [
              department === "IT" ? "IT" : "HR",
              " Access Code"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "access-code",
                placeholder: "Enter access code provided by your department head",
                value: accessCode,
                onChange: (e) => setAccessCode(e.target.value),
                className: "glass-input",
                required: needsAccessCode,
                "data-ocid": "register.access_code.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              className: "w-full glass-button h-11 font-semibold mt-1",
              disabled: isLoading || !email || !password || !department || !branch || !fullname,
              "data-ocid": "register.submit_button",
              children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
                " Creating Account…"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                "Create Account",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 ml-1" })
              ] })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 text-center text-sm text-muted-foreground", children: [
      "Already have an account?",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/login",
          className: "text-primary font-medium hover:text-primary/80 transition-smooth",
          "data-ocid": "register.login.link",
          children: "Sign In"
        }
      )
    ] })
  ] });
}
export {
  RegisterPage as default
};
