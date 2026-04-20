import { a as useNavigate, r as reactExports, j as jsxRuntimeExports, u as useAuth, S as SkeletonCard } from "./index-CQG1vcXg.js";
import { A as AppShell, C as ClipboardList } from "./AppShell-Bc4WOYvs.js";
import { C as ConfirmDialog } from "./ConfirmDialog-CkvSq1ph.js";
import { E as EmptyState } from "./EmptyState-HcQkGyve.js";
import { u as useHasRole } from "./RoleGuard-_co_iNxv.js";
import { B as Badge } from "./badge-CGkWTRBc.js";
import { e as createLucideIcon, W as apiGetIncidentReports, X as apiGetProfileAmendments, B as Button, Y as apiExportIncidentsCsv, u as ue, Z as apiResolveIncidentReport, _ as apiDeleteResolvedIncidents, $ as apiExportAmendmentsCsv, a0 as apiResolveProfileAmendment, a1 as apiDeleteResolvedAmendments } from "./backend-client-D43GVmUU.js";
import { C as Checkbox } from "./checkbox-CBUzxxNr.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-DwEVqHqo.js";
import { C as CircleAlert } from "./circle-alert-BoxjduFh.js";
import { T as Trash2 } from "./trash-2-B1TgMGVw.js";
import { D as Download } from "./download-Ce82FHA-.js";
import { C as CircleCheck } from "./circle-check-D6oZnHsX.js";
import "./Combination-BpDQgzvQ.js";
import "./index-pajndnDv.js";
import "./index-CqbiV51T.js";
import "./alert-dialog-eGI2SttW.js";
import "./index-D8z7wFiT.js";
import "./index-BICF_Lkm.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M20 7h-9", key: "3s1dr2" }],
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
];
const Settings2 = createLucideIcon("settings-2", __iconNode);
function downloadCsv(content, filename) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
function StatusBadge({ status }) {
  if (status === "open" || status === "pending")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Badge,
      {
        variant: "outline",
        className: "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border-yellow-500/30 text-[11px]",
        children: status === "open" ? "Open" : "Pending"
      }
    );
  if (status === "resolved" || status === "approved")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Badge,
      {
        variant: "outline",
        className: "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/30 text-[11px]",
        children: status === "resolved" ? "Resolved" : "Approved"
      }
    );
  if (status === "rejected")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Badge,
      {
        variant: "outline",
        className: "bg-destructive/15 text-destructive border-destructive/30 text-[11px]",
        children: "Rejected"
      }
    );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-[11px]", children: status });
}
function formatDate(ts) {
  return new Date(Number(ts)).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function SummaryCards({
  openIncidents,
  openAmendments
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-xl p-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-yellow-500/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-5 w-5 text-yellow-500" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-display font-bold text-foreground", children: openIncidents }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Open Incidents" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-xl p-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings2, { className: "h-5 w-5 text-blue-500" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-display font-bold text-foreground", children: openAmendments }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Pending Amendments" })
      ] })
    ] })
  ] });
}
function IncidentsTable() {
  const { user } = useAuth();
  const [loading, setLoading] = reactExports.useState(true);
  const [incidents, setIncidents] = reactExports.useState([]);
  const [selected, setSelected] = reactExports.useState(/* @__PURE__ */ new Set());
  const [confirmResolve, setConfirmResolve] = reactExports.useState(null);
  const [confirmDelete, setConfirmDelete] = reactExports.useState(false);
  const [actionLoading, setActionLoading] = reactExports.useState(false);
  const load = reactExports.useCallback(async () => {
    setLoading(true);
    const data = await apiGetIncidentReports();
    setIncidents(data);
    setLoading(false);
    setSelected(/* @__PURE__ */ new Set());
  }, []);
  reactExports.useEffect(() => {
    load();
  }, [load]);
  const openCount = incidents.filter((i) => i.status === "open").length;
  function toggleSelect(id) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  function toggleAll() {
    const resolved = incidents.filter((i) => i.status === "resolved");
    if (selected.size === resolved.length) {
      setSelected(/* @__PURE__ */ new Set());
    } else {
      setSelected(new Set(resolved.map((i) => i.id)));
    }
  }
  async function handleResolve(id) {
    setActionLoading(true);
    const res = await apiResolveIncidentReport(id, "Resolved by IT Admin.");
    if ("err" in res) {
      ue.error(res.err);
    } else {
      ue.success("Incident marked as resolved.");
      await load();
    }
    setActionLoading(false);
    setConfirmResolve(null);
  }
  async function handleDeleteSelected() {
    setActionLoading(true);
    const ids = Array.from(selected);
    const res = await apiDeleteResolvedIncidents(ids);
    if ("err" in res) {
      ue.error(res.err);
    } else {
      ue.success(`${ids.length} incident(s) deleted.`);
      await load();
    }
    setActionLoading(false);
    setConfirmDelete(false);
  }
  function handleExport() {
    const csv = apiExportIncidentsCsv(incidents);
    downloadCsv(csv, "incidents.csv");
    ue.success("incidents.csv downloaded.");
  }
  const resolvedIds = incidents.filter((i) => i.status === "resolved").map((i) => i.id);
  const allResolved = resolvedIds.length > 0 && selected.size === resolvedIds.length;
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, { lines: 4 });
  if (!incidents.length)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-8 w-8" }),
        title: "No incident reports",
        description: "No incidents have been submitted yet.",
        "data-ocid": "incidents.empty_state"
      }
    );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "incidents.table", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
        openCount,
        " open · ",
        incidents.length,
        " total"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        selected.size > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "destructive",
            size: "sm",
            className: "gap-1.5",
            onClick: () => setConfirmDelete(true),
            "data-ocid": "incidents.delete_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
              "Delete (",
              selected.size,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            className: "gap-1.5",
            onClick: handleExport,
            "data-ocid": "incidents.export_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
              "Export CSV"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-card rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/50 bg-muted/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 w-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Checkbox,
          {
            checked: allResolved,
            onCheckedChange: toggleAll,
            "data-ocid": "incidents.select_all.checkbox"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Reporter" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Action" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: incidents.map((inc, idx) => {
        const isResolved = inc.status === "resolved";
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b border-border/30 hover:bg-muted/20 transition-colors",
            "data-ocid": `incidents.row.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: isResolved && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Checkbox,
                {
                  checked: selected.has(inc.id),
                  onCheckedChange: () => toggleSelect(inc.id),
                  "data-ocid": `incidents.checkbox.${idx + 1}`
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 font-medium text-foreground", children: inc.subject }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-muted-foreground max-w-[200px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-2 block", children: inc.description }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-foreground/80", children: inc.reporterName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: inc.status }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-muted-foreground text-xs whitespace-nowrap", children: formatDate(inc.createdAt) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-right", children: !isResolved && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "sm",
                  className: "gap-1 text-green-600 border-green-500/30 hover:bg-green-500/10",
                  onClick: () => setConfirmResolve(inc.id),
                  disabled: actionLoading,
                  "data-ocid": `incidents.resolve_button.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }),
                    "Resolve"
                  ]
                }
              ) })
            ]
          },
          inc.id
        );
      }) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDialog,
      {
        open: confirmResolve !== null,
        onOpenChange: () => setConfirmResolve(null),
        title: "Mark as Resolved?",
        description: "This incident will be marked as resolved. You can delete it afterwards.",
        confirmLabel: "Mark Resolved",
        onConfirm: () => confirmResolve !== null && handleResolve(confirmResolve)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDialog,
      {
        open: confirmDelete,
        onOpenChange: setConfirmDelete,
        title: `Delete ${selected.size} incident(s)?`,
        description: "Deleted incidents cannot be recovered.",
        confirmLabel: "Delete",
        variant: "destructive",
        onConfirm: handleDeleteSelected
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden", children: user == null ? void 0 : user.id })
  ] });
}
function AmendmentsTable() {
  const { user } = useAuth();
  const [loading, setLoading] = reactExports.useState(true);
  const [amendments, setAmendments] = reactExports.useState([]);
  const [selected, setSelected] = reactExports.useState(/* @__PURE__ */ new Set());
  const [confirmResolve, setConfirmResolve] = reactExports.useState(null);
  const [confirmDelete, setConfirmDelete] = reactExports.useState(false);
  const [actionLoading, setActionLoading] = reactExports.useState(false);
  const load = reactExports.useCallback(async () => {
    setLoading(true);
    const data = await apiGetProfileAmendments();
    setAmendments(data);
    setLoading(false);
    setSelected(/* @__PURE__ */ new Set());
  }, []);
  reactExports.useEffect(() => {
    load();
  }, [load]);
  const openCount = amendments.filter((a) => a.status === "pending").length;
  function toggleSelect(id) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  function toggleAll() {
    const resolved = amendments.filter((a) => a.status !== "pending");
    if (selected.size === resolved.length) {
      setSelected(/* @__PURE__ */ new Set());
    } else {
      setSelected(new Set(resolved.map((a) => a.id)));
    }
  }
  async function handleResolve(id, approve) {
    setActionLoading(true);
    const res = await apiResolveProfileAmendment(
      id,
      approve,
      approve ? "Approved by admin." : "Rejected by admin.",
      (user == null ? void 0 : user.id) ?? ""
    );
    if ("err" in res) {
      ue.error(res.err);
    } else {
      ue.success(approve ? "Amendment approved." : "Amendment rejected.");
      await load();
    }
    setActionLoading(false);
    setConfirmResolve(null);
  }
  async function handleDeleteSelected() {
    setActionLoading(true);
    const ids = Array.from(selected);
    const res = await apiDeleteResolvedAmendments(ids);
    if ("err" in res) {
      ue.error(res.err);
    } else {
      ue.success(`${ids.length} amendment(s) deleted.`);
      await load();
    }
    setActionLoading(false);
    setConfirmDelete(false);
  }
  function handleExport() {
    const csv = apiExportAmendmentsCsv(amendments);
    downloadCsv(csv, "amendments.csv");
    ue.success("amendments.csv downloaded.");
  }
  const resolvedIds = amendments.filter((a) => a.status !== "pending").map((a) => a.id);
  const allResolved = resolvedIds.length > 0 && selected.size === resolvedIds.length;
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, { lines: 4 });
  if (!amendments.length)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings2, { className: "h-8 w-8" }),
        title: "No amendment requests",
        description: "No profile amendment requests have been submitted.",
        "data-ocid": "amendments.empty_state"
      }
    );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "amendments.table", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
        openCount,
        " pending · ",
        amendments.length,
        " total"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        selected.size > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "destructive",
            size: "sm",
            className: "gap-1.5",
            onClick: () => setConfirmDelete(true),
            "data-ocid": "amendments.delete_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
              "Delete (",
              selected.size,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            className: "gap-1.5",
            onClick: handleExport,
            "data-ocid": "amendments.export_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
              "Export CSV"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-card rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/50 bg-muted/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 w-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Checkbox,
          {
            checked: allResolved,
            onCheckedChange: toggleAll,
            "data-ocid": "amendments.select_all.checkbox"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Requester" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Request Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Action" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: amendments.map((am, idx) => {
        const isPending = am.status === "pending";
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b border-border/30 hover:bg-muted/20 transition-colors",
            "data-ocid": `amendments.row.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: !isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Checkbox,
                {
                  checked: selected.has(am.id),
                  onCheckedChange: () => toggleSelect(am.id),
                  "data-ocid": `amendments.checkbox.${idx + 1}`
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 font-medium text-foreground", children: am.requesterName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-foreground/80", children: am.field }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-muted-foreground max-w-[180px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-2 block", children: am.reason }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: am.status }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-muted-foreground text-xs whitespace-nowrap", children: formatDate(am.createdAt) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 justify-end", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    className: "gap-1 text-green-600 border-green-500/30 hover:bg-green-500/10 text-xs",
                    onClick: () => setConfirmResolve({ id: am.id, approve: true }),
                    disabled: actionLoading,
                    "data-ocid": `amendments.approve_button.${idx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }),
                      "Approve"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    className: "gap-1 text-destructive border-destructive/30 hover:bg-destructive/10 text-xs",
                    onClick: () => setConfirmResolve({ id: am.id, approve: false }),
                    disabled: actionLoading,
                    "data-ocid": `amendments.reject_button.${idx + 1}`,
                    children: "Reject"
                  }
                )
              ] }) })
            ]
          },
          am.id
        );
      }) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDialog,
      {
        open: confirmResolve !== null,
        onOpenChange: () => setConfirmResolve(null),
        title: (confirmResolve == null ? void 0 : confirmResolve.approve) ? "Approve Amendment?" : "Reject Amendment?",
        description: (confirmResolve == null ? void 0 : confirmResolve.approve) ? "This request will be approved and the requester notified." : "This request will be rejected and the requester notified.",
        confirmLabel: (confirmResolve == null ? void 0 : confirmResolve.approve) ? "Approve" : "Reject",
        variant: (confirmResolve == null ? void 0 : confirmResolve.approve) ? "default" : "destructive",
        onConfirm: () => confirmResolve !== null && handleResolve(confirmResolve.id, confirmResolve.approve)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDialog,
      {
        open: confirmDelete,
        onOpenChange: setConfirmDelete,
        title: `Delete ${selected.size} amendment(s)?`,
        description: "Deleted amendments cannot be recovered.",
        confirmLabel: "Delete",
        variant: "destructive",
        onConfirm: handleDeleteSelected
      }
    )
  ] });
}
function SupportAdminPage() {
  const isAdmin = useHasRole(["SuperAdmin", "HRAdmin"]);
  const navigate = useNavigate();
  const [incidents, setIncidents] = reactExports.useState([]);
  const [amendments, setAmendments] = reactExports.useState([]);
  reactExports.useEffect(() => {
    if (!isAdmin) {
      navigate({ to: "/support" });
    }
  }, [isAdmin, navigate]);
  reactExports.useEffect(() => {
    apiGetIncidentReports().then(setIncidents);
    apiGetProfileAmendments().then(setAmendments);
  }, []);
  if (!isAdmin) return null;
  const openIncidents = incidents.filter((i) => i.status === "open").length;
  const openAmendments = amendments.filter(
    (a) => a.status === "pending"
  ).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-6xl mx-auto space-y-6",
      "data-ocid": "support_admin.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings2, { className: "h-5 w-5 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground", children: "IT Support Admin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Manage incident reports and profile amendment requests" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SummaryCards,
          {
            openIncidents,
            openAmendments
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "incidents", "data-ocid": "support_admin.tabs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "glass-card w-full justify-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: "incidents",
                "data-ocid": "support_admin.incidents.tab",
                children: [
                  "Incidents",
                  openIncidents > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "ml-2 bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-[10px] h-4 px-1.5", children: openIncidents })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: "amendments",
                "data-ocid": "support_admin.amendments.tab",
                children: [
                  "Amendments",
                  openAmendments > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "ml-2 bg-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] h-4 px-1.5", children: openAmendments })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "incidents", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IncidentsTable, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "amendments", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AmendmentsTable, {}) })
        ] })
      ]
    }
  ) });
}
export {
  SupportAdminPage as default
};
