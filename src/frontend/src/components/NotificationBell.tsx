import { Button } from "@/components/ui/button";
import { apiGetUnreadNotificationCount } from "@/lib/backend-client";
import { useNavigate } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface NotificationBellProps {
  className?: string;
}

export function NotificationBell({ className }: NotificationBellProps) {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const fetchCount = useCallback(async () => {
    try {
      const n = await apiGetUnreadNotificationCount();
      setCount(n);
    } catch {
      // silent
    }
  }, []);

  useEffect(() => {
    fetchCount();
    const interval = setInterval(fetchCount, 60_000);
    return () => clearInterval(interval);
  }, [fetchCount]);

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`relative ${className ?? ""}`}
      aria-label={`Notifications — ${count} unread`}
      data-ocid="notification_bell.button"
      onClick={() => navigate({ to: "/notifications" })}
    >
      <Bell className="h-5 w-5" />
      {count > 0 && (
        <span
          className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground"
          data-ocid="notification_bell.badge"
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Button>
  );
}
