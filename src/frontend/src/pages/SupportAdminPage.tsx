import { AppShell } from "@/components/AppShell";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { EmptyState } from "@/components/EmptyState";
import { useHasRole } from "@/components/RoleGuard";
import { SkeletonCard } from "@/components/SkeletonCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  apiDeleteResolvedAmendments,
  apiDeleteResolvedIncidents,
  apiExportAmendmentsCsv,
  apiExportIncidentsCsv,
  apiGetIncidentReports,
  apiGetProfileAmendments,
  apiResolveIncidentReport,
  apiResolveProfileAmendment,
} from "@/lib/backend-client";
import { useAuth } from "@/store/auth";
import type { IncidentReport, ProfileAmendment } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  CheckCircle2,
  ClipboardList,
  Download,
  Settings2,
  Trash2,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

// ── Helpers ────────────────────────────────────────────────────────────────────

function downloadCsv(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function StatusBadge({ status }: { status: string }) {
  if (status === "open" || status === "pending")
    return (
      <Badge
        variant="outline"
        className="bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border-yellow-500/30 text-[11px]"
      >
        {status === "open" ? "Open" : "Pending"}
      </Badge>
    );
  if (status === "resolved" || status === "approved")
    return (
      <Badge
        variant="outline"
        className="bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/30 text-[11px]"
      >
        {status === "resolved" ? "Resolved" : "Approved"}
      </Badge>
    );
  if (status === "rejected")
    return (
      <Badge
        variant="outline"
        className="bg-destructive/15 text-destructive border-destructive/30 text-[11px]"
      >
        Rejected
      </Badge>
    );
  return (
    <Badge variant="outline" className="text-[11px]">
      {status}
    </Badge>
  );
}

function formatDate(ts: bigint) {
  return new Date(Number(ts)).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// ── Summary Cards ──────────────────────────────────────────────────────────────

function SummaryCards({
  openIncidents,
  openAmendments,
}: {
  openIncidents: number;
  openAmendments: number;
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="glass-card rounded-xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-yellow-500/15 flex items-center justify-center">
          <AlertCircle className="h-5 w-5 text-yellow-500" />
        </div>
        <div>
          <div className="text-2xl font-display font-bold text-foreground">
            {openIncidents}
          </div>
          <div className="text-xs text-muted-foreground">Open Incidents</div>
        </div>
      </div>
      <div className="glass-card rounded-xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center">
          <Settings2 className="h-5 w-5 text-blue-500" />
        </div>
        <div>
          <div className="text-2xl font-display font-bold text-foreground">
            {openAmendments}
          </div>
          <div className="text-xs text-muted-foreground">
            Pending Amendments
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Incidents Table ────────────────────────────────────────────────────────────

function IncidentsTable() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [incidents, setIncidents] = useState<IncidentReport[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [confirmResolve, setConfirmResolve] = useState<number | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await apiGetIncidentReports();
    setIncidents(data);
    setLoading(false);
    setSelected(new Set());
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openCount = incidents.filter((i) => i.status === "open").length;

  function toggleSelect(id: number) {
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
      setSelected(new Set());
    } else {
      setSelected(new Set(resolved.map((i) => i.id)));
    }
  }

  async function handleResolve(id: number) {
    setActionLoading(true);
    const res = await apiResolveIncidentReport(id, "Resolved by IT Admin.");
    if ("err" in res) {
      toast.error(res.err);
    } else {
      toast.success("Incident marked as resolved.");
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
      toast.error(res.err);
    } else {
      toast.success(`${ids.length} incident(s) deleted.`);
      await load();
    }
    setActionLoading(false);
    setConfirmDelete(false);
  }

  function handleExport() {
    const csv = apiExportIncidentsCsv(incidents);
    downloadCsv(csv, "incidents.csv");
    toast.success("incidents.csv downloaded.");
  }

  const resolvedIds = incidents
    .filter((i) => i.status === "resolved")
    .map((i) => i.id);
  const allResolved =
    resolvedIds.length > 0 && selected.size === resolvedIds.length;

  if (loading) return <SkeletonCard lines={4} />;
  if (!incidents.length)
    return (
      <EmptyState
        icon={<ClipboardList className="h-8 w-8" />}
        title="No incident reports"
        description="No incidents have been submitted yet."
        data-ocid="incidents.empty_state"
      />
    );

  return (
    <div className="space-y-3" data-ocid="incidents.table">
      {/* Summary + actions */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span className="text-sm text-muted-foreground">
          {openCount} open · {incidents.length} total
        </span>
        <div className="flex gap-2">
          {selected.size > 0 && (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="gap-1.5"
              onClick={() => setConfirmDelete(true)}
              data-ocid="incidents.delete_button"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete ({selected.size})
            </Button>
          )}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={handleExport}
            data-ocid="incidents.export_button"
          >
            <Download className="h-3.5 w-3.5" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30">
                <th className="p-3 w-10">
                  <Checkbox
                    checked={allResolved}
                    onCheckedChange={toggleAll}
                    data-ocid="incidents.select_all.checkbox"
                  />
                </th>
                <th className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Category
                </th>
                <th className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Description
                </th>
                <th className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Reporter
                </th>
                <th className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Status
                </th>
                <th className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Date
                </th>
                <th className="p-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((inc, idx) => {
                const isResolved = inc.status === "resolved";
                return (
                  <tr
                    key={inc.id}
                    className="border-b border-border/30 hover:bg-muted/20 transition-colors"
                    data-ocid={`incidents.row.${idx + 1}`}
                  >
                    <td className="p-3">
                      {isResolved && (
                        <Checkbox
                          checked={selected.has(inc.id)}
                          onCheckedChange={() => toggleSelect(inc.id)}
                          data-ocid={`incidents.checkbox.${idx + 1}`}
                        />
                      )}
                    </td>
                    <td className="p-3 font-medium text-foreground">
                      {inc.subject}
                    </td>
                    <td className="p-3 text-muted-foreground max-w-[200px]">
                      <span className="line-clamp-2 block">
                        {inc.description}
                      </span>
                    </td>
                    <td className="p-3 text-foreground/80">
                      {inc.reporterName}
                    </td>
                    <td className="p-3">
                      <StatusBadge status={inc.status} />
                    </td>
                    <td className="p-3 text-muted-foreground text-xs whitespace-nowrap">
                      {formatDate(inc.createdAt)}
                    </td>
                    <td className="p-3 text-right">
                      {!isResolved && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="gap-1 text-green-600 border-green-500/30 hover:bg-green-500/10"
                          onClick={() => setConfirmResolve(inc.id)}
                          disabled={actionLoading}
                          data-ocid={`incidents.resolve_button.${idx + 1}`}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Resolve
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog
        open={confirmResolve !== null}
        onOpenChange={() => setConfirmResolve(null)}
        title="Mark as Resolved?"
        description="This incident will be marked as resolved. You can delete it afterwards."
        confirmLabel="Mark Resolved"
        onConfirm={() =>
          confirmResolve !== null && handleResolve(confirmResolve)
        }
      />
      <ConfirmDialog
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        title={`Delete ${selected.size} incident(s)?`}
        description="Deleted incidents cannot be recovered."
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDeleteSelected}
      />

      {/* suppress unused warning */}
      <span className="hidden">{user?.id}</span>
    </div>
  );
}

// ── Amendments Table ───────────────────────────────────────────────────────────

function AmendmentsTable() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [amendments, setAmendments] = useState<ProfileAmendment[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [confirmResolve, setConfirmResolve] = useState<{
    id: number;
    approve: boolean;
  } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await apiGetProfileAmendments();
    setAmendments(data);
    setLoading(false);
    setSelected(new Set());
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openCount = amendments.filter((a) => a.status === "pending").length;

  function toggleSelect(id: number) {
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
      setSelected(new Set());
    } else {
      setSelected(new Set(resolved.map((a) => a.id)));
    }
  }

  async function handleResolve(id: number, approve: boolean) {
    setActionLoading(true);
    const res = await apiResolveProfileAmendment(
      id,
      approve,
      approve ? "Approved by admin." : "Rejected by admin.",
      user?.id ?? "",
    );
    if ("err" in res) {
      toast.error(res.err);
    } else {
      toast.success(approve ? "Amendment approved." : "Amendment rejected.");
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
      toast.error(res.err);
    } else {
      toast.success(`${ids.length} amendment(s) deleted.`);
      await load();
    }
    setActionLoading(false);
    setConfirmDelete(false);
  }

  function handleExport() {
    const csv = apiExportAmendmentsCsv(amendments);
    downloadCsv(csv, "amendments.csv");
    toast.success("amendments.csv downloaded.");
  }

  const resolvedIds = amendments
    .filter((a) => a.status !== "pending")
    .map((a) => a.id);
  const allResolved =
    resolvedIds.length > 0 && selected.size === resolvedIds.length;

  if (loading) return <SkeletonCard lines={4} />;
  if (!amendments.length)
    return (
      <EmptyState
        icon={<Settings2 className="h-8 w-8" />}
        title="No amendment requests"
        description="No profile amendment requests have been submitted."
        data-ocid="amendments.empty_state"
      />
    );

  return (
    <div className="space-y-3" data-ocid="amendments.table">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span className="text-sm text-muted-foreground">
          {openCount} pending · {amendments.length} total
        </span>
        <div className="flex gap-2">
          {selected.size > 0 && (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="gap-1.5"
              onClick={() => setConfirmDelete(true)}
              data-ocid="amendments.delete_button"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete ({selected.size})
            </Button>
          )}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={handleExport}
            data-ocid="amendments.export_button"
          >
            <Download className="h-3.5 w-3.5" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30">
                <th className="p-3 w-10">
                  <Checkbox
                    checked={allResolved}
                    onCheckedChange={toggleAll}
                    data-ocid="amendments.select_all.checkbox"
                  />
                </th>
                <th className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Requester
                </th>
                <th className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Request Type
                </th>
                <th className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Details
                </th>
                <th className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Status
                </th>
                <th className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Date
                </th>
                <th className="p-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {amendments.map((am, idx) => {
                const isPending = am.status === "pending";
                return (
                  <tr
                    key={am.id}
                    className="border-b border-border/30 hover:bg-muted/20 transition-colors"
                    data-ocid={`amendments.row.${idx + 1}`}
                  >
                    <td className="p-3">
                      {!isPending && (
                        <Checkbox
                          checked={selected.has(am.id)}
                          onCheckedChange={() => toggleSelect(am.id)}
                          data-ocid={`amendments.checkbox.${idx + 1}`}
                        />
                      )}
                    </td>
                    <td className="p-3 font-medium text-foreground">
                      {am.requesterName}
                    </td>
                    <td className="p-3 text-foreground/80">{am.field}</td>
                    <td className="p-3 text-muted-foreground max-w-[180px]">
                      <span className="line-clamp-2 block">{am.reason}</span>
                    </td>
                    <td className="p-3">
                      <StatusBadge status={am.status} />
                    </td>
                    <td className="p-3 text-muted-foreground text-xs whitespace-nowrap">
                      {formatDate(am.createdAt)}
                    </td>
                    <td className="p-3">
                      {isPending && (
                        <div className="flex gap-1 justify-end">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="gap-1 text-green-600 border-green-500/30 hover:bg-green-500/10 text-xs"
                            onClick={() =>
                              setConfirmResolve({ id: am.id, approve: true })
                            }
                            disabled={actionLoading}
                            data-ocid={`amendments.approve_button.${idx + 1}`}
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Approve
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="gap-1 text-destructive border-destructive/30 hover:bg-destructive/10 text-xs"
                            onClick={() =>
                              setConfirmResolve({ id: am.id, approve: false })
                            }
                            disabled={actionLoading}
                            data-ocid={`amendments.reject_button.${idx + 1}`}
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog
        open={confirmResolve !== null}
        onOpenChange={() => setConfirmResolve(null)}
        title={
          confirmResolve?.approve ? "Approve Amendment?" : "Reject Amendment?"
        }
        description={
          confirmResolve?.approve
            ? "This request will be approved and the requester notified."
            : "This request will be rejected and the requester notified."
        }
        confirmLabel={confirmResolve?.approve ? "Approve" : "Reject"}
        variant={confirmResolve?.approve ? "default" : "destructive"}
        onConfirm={() =>
          confirmResolve !== null &&
          handleResolve(confirmResolve.id, confirmResolve.approve)
        }
      />
      <ConfirmDialog
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        title={`Delete ${selected.size} amendment(s)?`}
        description="Deleted amendments cannot be recovered."
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDeleteSelected}
      />
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function SupportAdminPage() {
  const isAdmin = useHasRole(["SuperAdmin", "HRAdmin"]);
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState<IncidentReport[]>([]);
  const [amendments, setAmendments] = useState<ProfileAmendment[]>([]);

  useEffect(() => {
    if (!isAdmin) {
      navigate({ to: "/support" });
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    apiGetIncidentReports().then(setIncidents);
    apiGetProfileAmendments().then(setAmendments);
  }, []);

  if (!isAdmin) return null;

  const openIncidents = incidents.filter((i) => i.status === "open").length;
  const openAmendments = amendments.filter(
    (a) => a.status === "pending",
  ).length;

  return (
    <AppShell>
      <div
        className="max-w-6xl mx-auto space-y-6"
        data-ocid="support_admin.page"
      >
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
            <Settings2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold text-foreground">
              IT Support Admin
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage incident reports and profile amendment requests
            </p>
          </div>
        </div>

        <SummaryCards
          openIncidents={openIncidents}
          openAmendments={openAmendments}
        />

        <Tabs defaultValue="incidents" data-ocid="support_admin.tabs">
          <TabsList className="glass-card w-full justify-start">
            <TabsTrigger
              value="incidents"
              data-ocid="support_admin.incidents.tab"
            >
              Incidents
              {openIncidents > 0 && (
                <Badge className="ml-2 bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-[10px] h-4 px-1.5">
                  {openIncidents}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="amendments"
              data-ocid="support_admin.amendments.tab"
            >
              Amendments
              {openAmendments > 0 && (
                <Badge className="ml-2 bg-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] h-4 px-1.5">
                  {openAmendments}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="incidents" className="mt-4">
            <IncidentsTable />
          </TabsContent>
          <TabsContent value="amendments" className="mt-4">
            <AmendmentsTable />
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
