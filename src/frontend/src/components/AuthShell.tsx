import { ThemeToggle } from "@/components/ThemeToggle";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

<<<<<<< HEAD
export function BARBLogoBadge() {
  return (
    <div className="flex flex-col items-center" data-ocid="auth.barb_badge">
      <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-background bg-background shadow-glass ring-4 ring-primary/20">
        <img
          src="/assets/images/bcb-logo.png"
          alt="Bawjiase Community Bank logo"
          className="h-full w-full object-cover"
        />
=======
// ── BARB Badge ─────────────────────────────────────────────────────────────────

export function BARBLogoBadge() {
  return (
    <div
      className="flex flex-col items-center gap-2"
      data-ocid="auth.barb_badge"
    >
      <div className="w-16 h-16 rounded-full flex items-center justify-center font-display font-bold text-2xl bg-primary/20 border-2 border-primary/40 text-primary ring-4 ring-primary/10 shadow-glass">
        B
      </div>
      <div className="text-center">
        <div className="font-display font-bold text-foreground tracking-wide text-sm">
          BARB
        </div>
        <div className="text-[10px] text-muted-foreground uppercase tracking-widest">
          Bawjiase Area Rural Bank
        </div>
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
      </div>
    </div>
  );
}

<<<<<<< HEAD
=======
// ── Auth Shell ─────────────────────────────────────────────────────────────────

>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
interface AuthShellProps {
  children: ReactNode;
  className?: string;
}

export function AuthShell({ children, className }: AuthShellProps) {
  return (
    <div
<<<<<<< HEAD
      className="h-screen bg-background relative overflow-hidden"
      data-ocid="auth_shell"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <img
          src="/assets/images/auth-bg.jpg"
          alt=""
          className="h-full w-full scale-105 object-cover blur-[5px]"
        />
        <div className="absolute inset-0 bg-background/45 dark:bg-background/65" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background/10 to-secondary/15" />
      </div>

=======
      className="min-h-screen flex flex-col bg-background relative overflow-hidden"
      data-ocid="auth_shell"
    >
      {/* Background gradient layers */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/15" />
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      {/* Theme toggle in corner */}
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

<<<<<<< HEAD
      <div className="relative flex h-full items-center justify-center px-4 py-8">
        <div
          className={cn(
            "relative mt-12 w-full max-w-md rounded-2xl glass-card-elevated px-6 pb-6 pt-20 shadow-glass-dark",
            className,
          )}
        >
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
=======
      {/* Content */}
      <div className="relative flex-1 flex items-center justify-center px-4 py-12">
        <div
          className={cn(
            "w-full max-w-md glass-card-elevated rounded-2xl p-8 shadow-glass-dark",
            className,
          )}
        >
          <div className="flex justify-center mb-6">
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
            <BARBLogoBadge />
          </div>
          {children}
        </div>
      </div>

<<<<<<< HEAD
=======
      {/* Footer */}
      <div className="relative text-center pb-6 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Bawjiase Area Rural Bank PLC. All rights
        reserved.
      </div>

>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
      <Toaster richColors position="top-right" />
    </div>
  );
}
