import { AuthShell } from "@/components/AuthShell";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiLogin } from "@/lib/backend-client";
import { useAuth } from "@/store/auth";
import { isOk } from "@/types";
import { Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoading(true);
    try {
      const result = await apiLogin(email, password);
      if (isOk(result)) {
        login(result.ok, rememberMe);
        toast.success(`Welcome back, ${result.ok.fullname.split(" ")[0]}!`);
        navigate({ to: "/" });
      } else {
        toast.error(result.err);
      }
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthShell>
      <div className="space-y-1 text-center mb-6">
        <h1 className="font-display font-bold text-foreground text-2xl">
          Sign In
        </h1>
        <p className="text-sm text-muted-foreground">
          Access the BARB Staff Portal
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        data-ocid="login.form"
      >
        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="you@bawjiasearearuralbank.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="glass-input pl-10"
              autoComplete="email"
              required
              data-ocid="login.email.input"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <Link
              to="/forgot-password"
              className="text-xs text-primary hover:text-primary/80 transition-smooth"
              data-ocid="login.forgot_password.link"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input pl-10 pr-10"
              autoComplete="current-password"
              required
              data-ocid="login.password.input"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              data-ocid="login.password_toggle.button"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center gap-2">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(v) => setRememberMe(v === true)}
            data-ocid="login.remember_me.checkbox"
          />
          <Label
            htmlFor="remember"
            className="text-sm text-muted-foreground cursor-pointer"
          >
            Keep me signed in for 30 days
          </Label>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full glass-button h-11 font-semibold text-sm"
          disabled={isLoading || !email || !password}
          data-ocid="login.submit_button"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Signing in…
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="text-primary font-medium hover:text-primary/80 transition-smooth"
          data-ocid="login.register.link"
        >
          Register
        </Link>
      </div>
    </AuthShell>
  );
}
