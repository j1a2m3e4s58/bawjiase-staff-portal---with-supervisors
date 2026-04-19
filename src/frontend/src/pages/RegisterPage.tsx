import { AuthShell } from "@/components/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiRegister } from "@/lib/backend-client";
import { useAuth } from "@/store/auth";
import { BRANCHES, DEPARTMENTS, isOk } from "@/types";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Simple hash for demo — production uses a real hash
function simpleHash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }
  return String(Math.abs(h));
}

export default function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<"form" | "verify">("form");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form fields
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [branch, setBranch] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [verifyCode, setVerifyCode] = useState("");

  const needsAccessCode = department === "IT" || department === "HR";

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!email.endsWith("@bawjiasearearuralbank.com")) {
      toast.error("Please use your official @bawjiasearearuralbank.com email");
      return;
    }
    setIsLoading(true);
    try {
      const role =
        department === "IT" || department === "HR"
          ? accessCode === "BARB-IT-2026"
            ? "SuperAdmin"
            : "HRAdmin"
          : "GeneralStaff";

      const result = await apiRegister({
        fullname,
        phone,
        email,
        passwordHash: simpleHash(password),
        role,
        position,
        department,
        branch,
        accessCode: needsAccessCode ? accessCode : undefined,
      });

      if (isOk(result)) {
        setStep("verify");
        toast.success(
          "Registration submitted! Check your email for verification code.",
        );
      } else {
        toast.error(result.err);
      }
    } catch {
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (verifyCode.length < 6) {
      toast.error("Please enter the 6-digit code from your email.");
      return;
    }
    setIsLoading(true);
    try {
      // For demo: auto-verify
      const loginResult = await import("@/lib/backend-client").then((m) =>
        m.apiVerifyEmail(email, verifyCode),
      );
      if (isOk(loginResult)) {
        const userResult = await import("@/lib/backend-client").then((m) =>
          m.apiLogin(email, simpleHash(password)),
        );
        if (isOk(userResult)) {
          login(userResult.ok, true);
          toast.success(
            `Welcome to BARB Staff Portal, ${userResult.ok.fullname.split(" ")[0]}!`,
          );
          navigate({ to: "/" });
        }
      } else {
        toast.error("Invalid verification code. Please try again.");
      }
    } catch {
      toast.error("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  if (step === "verify") {
    return (
      <AuthShell>
        <div className="space-y-1 text-center mb-6">
          <h1 className="font-display font-bold text-foreground text-2xl">
            Verify Your Email
          </h1>
          <p className="text-sm text-muted-foreground">
            We sent a 6-digit code to <strong>{email}</strong>
          </p>
        </div>
        <form
          onSubmit={handleVerify}
          className="space-y-4"
          data-ocid="verify.form"
        >
          <div className="space-y-1.5">
            <Label htmlFor="code">Verification Code</Label>
            <Input
              id="code"
              type="text"
              inputMode="numeric"
              pattern="\d{6}"
              maxLength={6}
              placeholder="000000"
              value={verifyCode}
              onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, ""))}
              className="glass-input text-center text-xl tracking-widest font-mono h-14"
              required
              data-ocid="verify.code.input"
            />
          </div>
          <Button
            type="submit"
            className="w-full glass-button h-11 font-semibold"
            disabled={isLoading || verifyCode.length < 6}
            data-ocid="verify.submit_button"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Verifying…
              </>
            ) : (
              "Verify & Sign In"
            )}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Didn&apos;t get the code?{" "}
            <button
              type="button"
              className="text-primary hover:underline"
              onClick={() => toast.info("Resend code feature — demo mode")}
              data-ocid="verify.resend.button"
            >
              Resend
            </button>
          </p>
        </form>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <div className="space-y-1 text-center mb-6">
        <h1 className="font-display font-bold text-foreground text-2xl">
          Create Account
        </h1>
        <p className="text-sm text-muted-foreground">
          Join the BARB Staff Portal
        </p>
      </div>

      <form
        onSubmit={handleRegister}
        className="space-y-3.5"
        data-ocid="register.form"
      >
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 space-y-1.5">
            <Label htmlFor="fullname">Full Name</Label>
            <Input
              id="fullname"
              placeholder="Your full name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="glass-input"
              required
              data-ocid="register.fullname.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="024 XXX XXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="glass-input"
              required
              data-ocid="register.phone.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              placeholder="Your position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="glass-input"
              required
              data-ocid="register.position.input"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="reg-email">Official Email</Label>
          <Input
            id="reg-email"
            type="email"
            placeholder="you@bawjiasearearuralbank.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="glass-input"
            autoComplete="email"
            required
            data-ocid="register.email.input"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="reg-password">Password</Label>
          <div className="relative">
            <Input
              id="reg-password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input pr-10"
              autoComplete="new-password"
              minLength={8}
              required
              data-ocid="register.password.input"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide" : "Show"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>Department</Label>
            <Select value={department} onValueChange={setDepartment} required>
              <SelectTrigger
                className="glass-input"
                data-ocid="register.department.select"
              >
                <SelectValue placeholder="Select dept." />
              </SelectTrigger>
              <SelectContent>
                {DEPARTMENTS.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Branch</Label>
            <Select value={branch} onValueChange={setBranch} required>
              <SelectTrigger
                className="glass-input"
                data-ocid="register.branch.select"
              >
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>
              <SelectContent>
                {BRANCHES.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {needsAccessCode && (
          <div className="space-y-1.5">
            <Label htmlFor="access-code">
              {department === "IT" ? "IT" : "HR"} Access Code
            </Label>
            <Input
              id="access-code"
              placeholder="Enter access code provided by your department head"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              className="glass-input"
              required={needsAccessCode}
              data-ocid="register.access_code.input"
            />
          </div>
        )}

        <Button
          type="submit"
          className="w-full glass-button h-11 font-semibold mt-1"
          disabled={
            isLoading ||
            !email ||
            !password ||
            !department ||
            !branch ||
            !fullname
          }
          data-ocid="register.submit_button"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Creating
              Account…
            </>
          ) : (
            <>
              Create Account
              <ChevronRight className="h-4 w-4 ml-1" />
            </>
          )}
        </Button>
      </form>

      <div className="mt-5 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-primary font-medium hover:text-primary/80 transition-smooth"
          data-ocid="register.login.link"
        >
          Sign In
        </Link>
      </div>
    </AuthShell>
  );
}
