import { AppShell } from "@/components/AppShell";
import { EmptyState } from "@/components/EmptyState";
import { SkeletonRow } from "@/components/SkeletonCard";
import { Button } from "@/components/ui/button";
import {
  apiGetNotifications,
  apiMarkAllNotificationsRead,
  apiMarkNotificationRead,
} from "@/lib/backend-client";
import { useAuth } from "@/store/auth";
import type { Notification, NotificationKind } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  BellOff,
  BookOpen,
  CheckCheck,
  Megaphone,
  Settings,
  ShieldAlert,
  Wrench,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

// ── Helpers ────────────────────────────────────────────────────────────────────

function kindIcon(kind: NotificationKind) {
  if (kind === "announcement") return <Megaphone className="h-4 w-4" />;
  if (kind === "training") return <BookOpen className="h-4 w-4" />;
  if (kind === "support") return <Wrench className="h-4 w-4" />;
  if (kind === "poll") return <ShieldAlert className="h-4 w-4" />;
  return <Settings className="h-4 w-4" />;
}

function kindColor(kind: NotificationKind): string {
  if (kind === "announcement") return "bg-primary/15 text-primary";
  if (kind === "training") return "bg-secondary/15 text-secondary";
  if (kind === "support") return "bg-chart-4/15 text-chart-4";
  if (kind === "poll") return "bg-accent/15 text-accent";
  return "bg-muted text-muted-foreground";
}

function timeAgo(ts: bigint): string {
  const diff = Date.now() - Number(ts);
  const secs = Math.floor(diff / 1000);
  if (secs < 60) return "Just now";
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  return new Date(Number(ts)).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

function groupLabel(ts: bigint): string {
  const d = new Date(Number(ts));
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 86400000);
  const itemDay = new Date(d.getFullYear(), d.getMonth(), d.getDate());

  if (itemDay.getTime() === today.getTime()) return "Today";
  if (itemDay.getTime() === yesterday.getTime()) return "Yesterday";
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

// ── Notification Item ──────────────────────────────────────────────────────────

interface NotifItemProps {
  notif: Notification;
  index: number;
  onRead: (id: number) => void;
}

function NotifItem({ notif, index, onRead }: NotifItemProps) {
  const navigate = useNavigate();

  const handleClick = async () => {
    if (!notif.isRead) {
      onRead(notif.id);
      await apiMarkNotificationRead(notif.id);
    }
    if (notif.linkTo) {
      navigate({ to: notif.linkTo as "/" });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`w-full text-left flex items-start gap-3 px-4 py-3.5 transition-smooth group ${
        notif.isRead
          ? "hover:bg-muted/50"
          : "bg-primary/5 hover:bg-primary/10 border-l-2 border-primary"
      }`}
      data-ocid={`notifications.item.${index}`}
    >
      {/* Kind icon */}
      <div
        className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center mt-0.5 ${kindColor(notif.kind)}`}
      >
        {kindIcon(notif.kind)}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <span
            className={`text-sm leading-snug ${notif.isRead ? "text-foreground/80" : "font-semibold text-foreground"}`}
          >
            {notif.title}
          </span>
          <span className="text-[11px] text-muted-foreground flex-shrink-0 mt-0.5">
            {timeAgo(notif.createdAt)}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
          {notif.message}
        </p>
      </div>

      {/* Unread dot */}
      {!notif.isRead && (
        <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
      )}
    </button>
  );
}

// ── NotificationsPage ──────────────────────────────────────────────────────────

export default function NotificationsPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMarkingAll, setIsMarkingAll] = useState(false);

  useEffect(() => {
    if (!user) return;
    apiGetNotifications().then((data) => {
      setNotifications(data);
      setIsLoading(false);
    });
  }, [user]);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications],
  );

  const grouped = useMemo(() => {
    const map: Record<string, Notification[]> = {};
    for (const n of notifications) {
      const label = groupLabel(n.createdAt);
      if (!map[label]) map[label] = [];
      map[label].push(n);
    }
    return map;
  }, [notifications]);

  const handleMarkRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  };

  const handleMarkAllRead = async () => {
    setIsMarkingAll(true);
    await apiMarkAllNotificationsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    toast.success("All notifications marked as read");
    setIsMarkingAll(false);
  };

  return (
    <AppShell>
      <div
        className="max-w-2xl mx-auto space-y-5"
        data-ocid="notifications.page"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Notifications
            </h1>
            {unreadCount > 0 ? (
              <p className="text-sm text-muted-foreground mt-0.5">
                <span className="font-semibold text-primary">
                  {unreadCount}
                </span>{" "}
                unread
              </p>
            ) : (
              <p className="text-sm text-muted-foreground mt-0.5">
                All caught up
              </p>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={handleMarkAllRead}
              disabled={isMarkingAll}
              data-ocid="notifications.mark_all_button"
            >
              <CheckCheck className="h-4 w-4" />
              {isMarkingAll ? "Marking…" : "Mark all read"}
            </Button>
          )}
        </div>

        {/* Content */}
        {isLoading ? (
          <div
            className="glass-card rounded-xl divide-y divide-border/30"
            data-ocid="notifications.loading_state"
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <SkeletonRow key={`sk-notif-${i}`} className="py-4" />
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <EmptyState
            icon={<BellOff className="h-7 w-7" />}
            title="You're all caught up!"
            description="No notifications yet. We'll let you know when something needs your attention."
            data-ocid="notifications.empty_state"
          />
        ) : (
          <div className="space-y-5">
            {Object.entries(grouped).map(([label, items]) => (
              <section key={label}>
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">
                  {label}
                </h2>
                <div className="glass-card rounded-xl overflow-hidden divide-y divide-border/20">
                  {items.map((notif, i) => (
                    <NotifItem
                      key={notif.id}
                      notif={notif}
                      index={i + 1}
                      onRead={handleMarkRead}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
