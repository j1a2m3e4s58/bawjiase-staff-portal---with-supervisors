import { j as jsxRuntimeExports, c as cn, a as useNavigate, r as reactExports, S as SkeletonCard } from "./index-CQG1vcXg.js";
import { A as AppShell, F as FileText, G as GraduationCap, B as Bell } from "./AppShell-Bc4WOYvs.js";
import { E as EmptyState } from "./EmptyState-HcQkGyve.js";
import { P as PortalCard } from "./PortalCard-D6i7wtiH.js";
import { R as RoleGuard } from "./RoleGuard-_co_iNxv.js";
import { B as Badge } from "./badge-CGkWTRBc.js";
import { O as apiGetAdminTrainingOverview, Q as apiGetVideoWatchStats, B as Button, K as apiSendVideoTrainingReminder, u as ue } from "./backend-client-D43GVmUU.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-DwEVqHqo.js";
import { A as ArrowLeft } from "./arrow-left-bPk6U5to.js";
import { L as LayoutGrid } from "./layout-grid-CBvqLpzq.js";
import { V as Video } from "./video-CTZN46Ft.js";
import { T as TrendingUp } from "./trending-up-BK21g05S.js";
import { B as BookOpen } from "./book-open-DApsL0_H.js";
import { E as Eye } from "./eye-CcPu1L07.js";
import { C as CircleCheck } from "./circle-check-D6oZnHsX.js";
import "./Combination-BpDQgzvQ.js";
import "./index-pajndnDv.js";
import "./index-CqbiV51T.js";
function Table({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "table",
        {
          "data-slot": "table",
          className: cn("w-full caption-bottom text-sm", className),
          ...props
        }
      )
    }
  );
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tr",
    {
      "data-slot": "table-row",
      className: cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      ),
      ...props
    }
  );
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function StatCard({
  icon,
  label,
  value,
  sub
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-xl p-4 flex items-start gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-display font-bold text-foreground leading-tight", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium text-foreground/80", children: label }),
      sub && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: sub })
    ] })
  ] });
}
function PctBadge({ pct }) {
  const color = pct >= 80 ? "bg-secondary/10 text-secondary border-secondary/20" : pct >= 50 ? "bg-amber-500/10 text-amber-600 border-amber-400/20" : "bg-destructive/10 text-destructive border-destructive/20";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: `text-xs font-semibold ${color}`, children: [
    Math.round(pct),
    "%"
  ] });
}
function TrainingAdminPage() {
  const navigate = useNavigate();
  const [overview, setOverview] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [sendingReminder, setSendingReminder] = reactExports.useState(null);
  reactExports.useEffect(() => {
    Promise.all([apiGetAdminTrainingOverview(), apiGetVideoWatchStats()]).then(([ov]) => {
      setOverview(ov);
    }).finally(() => setLoading(false));
  }, []);
  async function handleSendReminder(videoId, title) {
    setSendingReminder(videoId);
    try {
      await apiSendVideoTrainingReminder(videoId);
      ue.success(`Reminder sent for "${title}"`);
    } catch {
      ue.error("Failed to send reminder");
    } finally {
      setSendingReminder(null);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    RoleGuard,
    {
      roles: ["SuperAdmin", "HRAdmin"],
      fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-16 text-muted-foreground", children: "You do not have permission to view this page." }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              className: "gap-1.5 -ml-1 mb-2",
              onClick: () => navigate({ to: "/training" }),
              "data-ocid": "training.admin.back_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
                "Training Portal"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "h-5 w-5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground", children: "Training Dashboard" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Completion rates, engagement stats and reminders" })
        ] }) }),
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, { lines: 2 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, { lines: 2 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, { lines: 2 })
        ] }) : overview ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "h-5 w-5" }),
                label: "Total Videos",
                value: overview.totalVideos,
                sub: "Active uploads"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5" }),
                label: "Total Documents",
                value: overview.totalDocuments,
                sub: "Active uploads"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-5 w-5" }),
                label: "Eligible Staff",
                value: overview.totalStaff,
                sub: "All active employees"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-5 w-5" }),
                label: "Avg. Completion",
                value: overview.videoStats.length ? `${Math.round(
                  overview.videoStats.reduce(
                    (acc, v) => acc + v.completionPct,
                    0
                  ) / overview.videoStats.length
                )}%` : "—",
                sub: "Across all videos"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "videos", "data-ocid": "training.admin.tabs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { "data-ocid": "training.admin.tabs_list", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                TabsTrigger,
                {
                  value: "videos",
                  "data-ocid": "training.admin.tab.videos",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "h-4 w-4 mr-1.5" }),
                    "Videos"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                TabsTrigger,
                {
                  value: "documents",
                  "data-ocid": "training.admin.tab.documents",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4 mr-1.5" }),
                    "Documents"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "videos", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PortalCard, { children: overview.videoStats.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              EmptyState,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "h-6 w-6" }),
                title: "No video data yet",
                description: "Upload training videos to see completion stats here.",
                "data-ocid": "training.admin.video.empty_state"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { "data-ocid": "training.admin.video.table", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Title" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Eligible" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Watched" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Completion" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Mandatory Not Done" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Actions" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: overview.videoStats.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                TableRow,
                {
                  "data-ocid": `training.admin.video.row.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm text-foreground line-clamp-1", children: v.title }),
                      v.isMandatory && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-[10px] bg-destructive/10 text-destructive border-destructive/20 shrink-0", children: "Mandatory" })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right text-sm", children: v.eligibleCount }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5 text-muted-foreground" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: v.watchedCount })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5 text-muted-foreground" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(PctBadge, { pct: v.completionPct })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: v.isMandatory && v.incompleteUsers.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-destructive font-medium", children: [
                      v.incompleteUsers.length,
                      " staff"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "—" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "button",
                        variant: "outline",
                        size: "sm",
                        className: "text-xs gap-1.5 h-7",
                        disabled: sendingReminder === v.id,
                        onClick: () => handleSendReminder(v.id, v.title),
                        "data-ocid": `training.admin.video.reminder_button.${i + 1}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-3 w-3" }),
                          sendingReminder === v.id ? "Sending..." : "Remind"
                        ]
                      }
                    ) })
                  ]
                },
                v.id
              )) })
            ] }) }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "documents", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PortalCard, { children: overview.docStats.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              EmptyState,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-6 w-6" }),
                title: "No document data yet",
                description: "Upload training documents to see engagement stats here.",
                "data-ocid": "training.admin.doc.empty_state"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { "data-ocid": "training.admin.doc.table", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Title" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Eligible" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Opened" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Open Rate" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: overview.docStats.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                TableRow,
                {
                  "data-ocid": `training.admin.doc.row.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm text-foreground line-clamp-1", children: d.title }),
                      d.isMandatory && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-[10px] bg-destructive/10 text-destructive border-destructive/20 shrink-0", children: "Mandatory" })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right text-sm", children: d.eligibleCount }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5 text-muted-foreground" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: d.openedCount })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PctBadge, { pct: d.openedPct }) })
                  ]
                },
                d.id
              )) })
            ] }) }) }) })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "h-7 w-7" }),
            title: "No training data available",
            description: "Upload videos and documents to see analytics here.",
            "data-ocid": "training.admin.empty_state"
          }
        )
      ] })
    }
  ) });
}
export {
  TrainingAdminPage as default
};
