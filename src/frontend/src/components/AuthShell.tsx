import { ThemeToggle } from "@/components/ThemeToggle";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

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
      </div>
    </div>
  );
}

// ── Auth Shell ─────────────────────────────────────────────────────────────────

interface AuthShellProps {
  children: ReactNode;
  className?: string;
}

export function AuthShell({ children, className }: AuthShellProps) {
  return (
    <div
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
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      {/* Content */}
      <div className="relative flex-1 flex items-center justify-center px-4 py-12">
        <div
          className={cn(
            "w-full max-w-md glass-card-elevated rounded-2xl p-8 shadow-glass-dark",
            className,
          )}
        >
          <div className="flex justify-center mb-6">
            <BARBLogoBadge />
          </div>
          {children}
        </div>
      </div>

      {/* Footer */}
      <div className="relative text-center pb-6 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Bawjiase Area Rural Bank PLC. All rights
        reserved.
      </div>

      <Toaster richColors position="top-right" />
    </div>
  );
}
