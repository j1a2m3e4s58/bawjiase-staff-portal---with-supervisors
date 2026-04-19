import { a as useNavigate, r as reactExports, j as jsxRuntimeExports, f as SkeletonRow } from "./index-CQG1vcXg.js";
import { A as AppShell, a as Avatar, c as AvatarFallback } from "./AppShell-Bc4WOYvs.js";
import { C as ConfirmDialog } from "./ConfirmDialog-CkvSq1ph.js";
import { E as EmptyState } from "./EmptyState-HcQkGyve.js";
import { u as useHasRole } from "./RoleGuard-_co_iNxv.js";
import { B as Badge } from "./badge-CGkWTRBc.js";
import { e as createLucideIcon, t as apiGetArchivedStaff, v as apiRestoreStaff, u as ue, w as apiDeleteStaff, B as Button } from "./backend-client-D43GVmUU.js";
import { B as Building2 } from "./building-2-C7fjpMjm.js";
import { M as MapPin } from "./map-pin-Ct4Dq2no.js";
import { A as ArchiveRestore } from "./archive-restore-B2tTIcWM.js";
import { T as Trash2 } from "./trash-2-B1TgMGVw.js";
import "./Combination-BpDQgzvQ.js";
import "./index-pajndnDv.js";
import "./index-CqbiV51T.js";
import "./alert-dialog-eGI2SttW.js";
import "./index-D8z7wFiT.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  [
    "path",
    {
      d: "M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71",
      key: "1jlk70"
    }
  ],
  [
    "path",
    {
      d: "M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264",
      key: "18rp1v"
    }
  ]
];
const ShieldOff = createLucideIcon("shield-off", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "17", x2: "22", y1: "8", y2: "13", key: "3nzzx3" }],
  ["line", { x1: "22", x2: "17", y1: "8", y2: "13", key: "1swrse" }]
];
const UserX = createLucideIcon("user-x", __iconNode);
function getInitials(fullname) {
  return fullname.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}
function formatDate(ts) {
  const d = new Date(Number(ts));
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
const ROLE_LABELS = {
  SuperAdmin: "Super Admin",
  HRAdmin: "HR Admin",
  GeneralStaff: "Staff"
};
function PastStaffRow({
  staff,
  index,
  onRestore,
  onDelete
}) {
  const initials = getInitials(staff.fullname);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center gap-4 px-4 py-3 glass-card rounded-xl hover:glass-card-elevated transition-smooth",
      "data-ocid": `past_staff.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-10 w-10 flex-shrink-0 ring-2 ring-border/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-muted text-muted-foreground font-semibold text-sm", children: initials }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-foreground truncate", children: staff.fullname }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-[10px] flex-shrink-0", children: ROLE_LABELS[staff.role] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground truncate mt-0.5", children: staff.email }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center flex-wrap gap-3 mt-1.5 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-3 w-3" }),
              staff.department
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
              staff.branch
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-muted-foreground/70", children: [
              "Archived ",
              formatDate(staff.lastSeen)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              className: "h-8 text-xs gap-1.5 text-secondary hover:text-secondary",
              onClick: () => onRestore(staff),
              "data-ocid": `past_staff.restore_button.${index}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArchiveRestore, { className: "h-3.5 w-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Restore" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              className: "h-8 text-xs gap-1.5 text-destructive hover:text-destructive hover:bg-destructive/10",
              onClick: () => onDelete(staff),
              "data-ocid": `past_staff.delete_button.${index}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Delete" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function PastStaffPage() {
  const canAccess = useHasRole(["SuperAdmin", "HRAdmin"]);
  const navigate = useNavigate();
  const [staff, setStaff] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [restoreTarget, setRestoreTarget] = reactExports.useState(null);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [busy, setBusy] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!canAccess) {
      void navigate({ to: "/directory" });
    }
  }, [canAccess, navigate]);
  reactExports.useEffect(() => {
    void (async () => {
      const data = await apiGetArchivedStaff();
      setStaff(data);
      setLoading(false);
    })();
  }, []);
  async function handleRestoreConfirm() {
    if (!restoreTarget) return;
    setBusy(true);
    const result = await apiRestoreStaff(restoreTarget.id);
    setBusy(false);
    if ("ok" in result) {
      ue.success(`${restoreTarget.fullname} has been restored`);
      setStaff((prev) => prev.filter((u) => u.id !== restoreTarget.id));
    } else {
      ue.error(result.err ?? "Failed to restore staff member");
    }
    setRestoreTarget(null);
  }
  async function handleDeleteConfirm() {
    if (!deleteTarget) return;
    setBusy(true);
    const result = await apiDeleteStaff(deleteTarget.id);
    setBusy(false);
    if ("ok" in result) {
      ue.success(`${deleteTarget.fullname} has been permanently deleted`);
      setStaff((prev) => prev.filter((u) => u.id !== deleteTarget.id));
    } else {
      ue.error(result.err ?? "Failed to delete staff member");
    }
    setDeleteTarget(null);
  }
  if (!canAccess) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-4xl mx-auto", "data-ocid": "past_staff.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-display font-bold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { className: "h-6 w-6 text-muted-foreground" }),
          "Past Staff"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Archived staff members — restore or permanently remove records." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 rounded-lg px-3 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldOff, { className: "h-3.5 w-3.5 flex-shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Archived staff cannot log in. Restoring grants them portal access again." })
      ] }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: Array.from({ length: 5 }, (_, i) => `sk-${i}`).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonRow, {}, k)) }) : staff.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { className: "h-10 w-10 text-muted-foreground/40" }),
          title: "No past staff",
          description: "Archived staff members will appear here.",
          "data-ocid": "past_staff.empty_state"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", "data-ocid": "past_staff.list", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide", children: [
          staff.length,
          " archived member",
          staff.length !== 1 ? "s" : ""
        ] }) }),
        staff.map((member, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          PastStaffRow,
          {
            staff: member,
            index: i + 1,
            onRestore: setRestoreTarget,
            onDelete: setDeleteTarget
          },
          member.id
        ))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDialog,
      {
        open: !!restoreTarget,
        onOpenChange: (open) => {
          if (!open) setRestoreTarget(null);
        },
        title: "Restore Staff Member",
        description: `Restore ${restoreTarget == null ? void 0 : restoreTarget.fullname} to active staff? They will regain portal access.`,
        confirmLabel: busy ? "Restoring…" : "Restore",
        cancelLabel: "Cancel",
        variant: "default",
        onConfirm: handleRestoreConfirm
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDialog,
      {
        open: !!deleteTarget,
        onOpenChange: (open) => {
          if (!open) setDeleteTarget(null);
        },
        title: "Permanently Delete Staff Record",
        description: `This will permanently delete ${deleteTarget == null ? void 0 : deleteTarget.fullname}'s record. This action cannot be undone.`,
        confirmLabel: busy ? "Deleting…" : "Delete Permanently",
        cancelLabel: "Cancel",
        variant: "destructive",
        onConfirm: handleDeleteConfirm
      }
    )
  ] });
}
export {
  PastStaffPage as default
};
