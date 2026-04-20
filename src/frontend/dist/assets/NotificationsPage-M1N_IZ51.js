import { u as useAuth, r as reactExports, j as jsxRuntimeExports, f as SkeletonRow, a as useNavigate } from "./index-CQG1vcXg.js";
import { A as AppShell, M as Megaphone } from "./AppShell-Bc4WOYvs.js";
import { E as EmptyState } from "./EmptyState-HcQkGyve.js";
import { e as createLucideIcon, x as apiGetNotifications, B as Button, y as apiMarkAllNotificationsRead, u as ue, z as apiMarkNotificationRead } from "./backend-client-D43GVmUU.js";
import { B as BookOpen } from "./book-open-DApsL0_H.js";
import "./Combination-BpDQgzvQ.js";
import "./index-pajndnDv.js";
import "./index-CqbiV51T.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742",
      key: "178tsu"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05", key: "1hqiys" }]
];
const BellOff = createLucideIcon("bell-off", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M18 6 7 17l-5-5", key: "116fxf" }],
  ["path", { d: "m22 10-7.5 7.5L13 16", key: "ke71qq" }]
];
const CheckCheck = createLucideIcon("check-check", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Settings = createLucideIcon("settings", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  ["path", { d: "M12 16h.01", key: "1drbdi" }]
];
const ShieldAlert = createLucideIcon("shield-alert", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
      key: "cbrjhi"
    }
  ]
];
const Wrench = createLucideIcon("wrench", __iconNode);
function kindIcon(kind) {
  if (kind === "announcement") return /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { className: "h-4 w-4" });
  if (kind === "training") return /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" });
  if (kind === "support") return /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "h-4 w-4" });
  if (kind === "poll") return /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-4 w-4" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-4 w-4" });
}
function kindColor(kind) {
  if (kind === "announcement") return "bg-primary/15 text-primary";
  if (kind === "training") return "bg-secondary/15 text-secondary";
  if (kind === "support") return "bg-chart-4/15 text-chart-4";
  if (kind === "poll") return "bg-accent/15 text-accent";
  return "bg-muted text-muted-foreground";
}
function timeAgo(ts) {
  const diff = Date.now() - Number(ts);
  const secs = Math.floor(diff / 1e3);
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
    month: "short"
  });
}
function groupLabel(ts) {
  const d = new Date(Number(ts));
  const now = /* @__PURE__ */ new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 864e5);
  const itemDay = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  if (itemDay.getTime() === today.getTime()) return "Today";
  if (itemDay.getTime() === yesterday.getTime()) return "Yesterday";
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });
}
function NotifItem({ notif, index, onRead }) {
  const navigate = useNavigate();
  const handleClick = async () => {
    if (!notif.isRead) {
      onRead(notif.id);
      await apiMarkNotificationRead(notif.id);
    }
    if (notif.linkTo) {
      navigate({ to: notif.linkTo });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: handleClick,
      className: `w-full text-left flex items-start gap-3 px-4 py-3.5 transition-smooth group ${notif.isRead ? "hover:bg-muted/50" : "bg-primary/5 hover:bg-primary/10 border-l-2 border-primary"}`,
      "data-ocid": `notifications.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center mt-0.5 ${kindColor(notif.kind)}`,
            children: kindIcon(notif.kind)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-sm leading-snug ${notif.isRead ? "text-foreground/80" : "font-semibold text-foreground"}`,
                children: notif.title
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground flex-shrink-0 mt-0.5", children: timeAgo(notif.createdAt) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-2", children: notif.message })
        ] }),
        !notif.isRead && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" })
      ]
    }
  );
}
function NotificationsPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [isMarkingAll, setIsMarkingAll] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!user) return;
    apiGetNotifications().then((data) => {
      setNotifications(data);
      setIsLoading(false);
    });
  }, [user]);
  const unreadCount = reactExports.useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications]
  );
  const grouped = reactExports.useMemo(() => {
    const map = {};
    for (const n of notifications) {
      const label = groupLabel(n.createdAt);
      if (!map[label]) map[label] = [];
      map[label].push(n);
    }
    return map;
  }, [notifications]);
  const handleMarkRead = (id) => {
    setNotifications(
      (prev) => prev.map((n) => n.id === id ? { ...n, isRead: true } : n)
    );
  };
  const handleMarkAllRead = async () => {
    setIsMarkingAll(true);
    await apiMarkAllNotificationsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    ue.success("All notifications marked as read");
    setIsMarkingAll(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-2xl mx-auto space-y-5",
      "data-ocid": "notifications.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Notifications" }),
            unreadCount > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: unreadCount }),
              " ",
              "unread"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "All caught up" })
          ] }),
          unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              className: "gap-2",
              onClick: handleMarkAllRead,
              disabled: isMarkingAll,
              "data-ocid": "notifications.mark_all_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCheck, { className: "h-4 w-4" }),
                isMarkingAll ? "Marking…" : "Mark all read"
              ]
            }
          )
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "glass-card rounded-xl divide-y divide-border/30",
            "data-ocid": "notifications.loading_state",
            children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonRow, { className: "py-4" }, `sk-notif-${i}`))
          }
        ) : notifications.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BellOff, { className: "h-7 w-7" }),
            title: "You're all caught up!",
            description: "No notifications yet. We'll let you know when something needs your attention.",
            "data-ocid": "notifications.empty_state"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", children: Object.entries(grouped).map(([label, items]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-card rounded-xl overflow-hidden divide-y divide-border/20", children: items.map((notif, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            NotifItem,
            {
              notif,
              index: i + 1,
              onRead: handleMarkRead
            },
            notif.id
          )) })
        ] }, label)) })
      ]
    }
  ) });
}
export {
  NotificationsPage as default
};
