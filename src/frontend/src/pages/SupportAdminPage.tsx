import { AppShell } from "@/components/AppShell";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { EmptyState } from "@/components/EmptyState";
<<<<<<< HEAD
=======
import { useHasRole } from "@/components/RoleGuard";
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
import { SkeletonCard } from "@/components/SkeletonCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
<<<<<<< HEAD
=======
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
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
<<<<<<< HEAD
import { Link, useNavigate } from "@tanstack/react-router";
=======
import { useNavigate } from "@tanstack/react-router";
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
import {
  AlertCircle,
  CheckCircle2,
  ClipboardList,
  Download,
<<<<<<< HEAD
  MapPin,
  Phone,
  Settings2,
  Shield,
  Trash2,
  UserCog,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

function downloadCsv(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

=======
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

>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
function formatDate(ts: bigint) {
  return new Date(Number(ts)).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

<<<<<<< HEAD
function statusLabel(status: string) {
  return status === "resolved" ? "Resolved" : "Open";
}

function StatusChip({ status }: { status: string }) {
  const resolved = status === "resolved";
  return (
    <Badge
      variant="outline"
      className={
        resolved
          ? "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/30"
          : "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border-yellow-500/30"
      }
    >
      {statusLabel(status)}
    </Badge>
  );
}

function IncidentIssueBadge({ issue }: { issue: string }) {
  return (
    <Badge
      variant="outline"
      className="bg-yellow-500/15 text-yellow-700 dark:text-yellow-300 border-yellow-500/25"
    >
      {issue}
    </Badge>
  );
}

function AmendmentTypeBadge({ type }: { type: string }) {
  return (
    <Badge
      variant="outline"
      className="bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-500/25"
    >
      {type}
    </Badge>
  );
}

function SummaryStrip({
  incidents,
  amendments,
}: {
  incidents: IncidentReport[];
  amendments: ProfileAmendment[];
}) {
  const openIncidents = incidents.filter((item) => item.status !== "resolved");
  const openAmendments = amendments.filter(
    (item) => item.status !== "resolved",
  );

=======
// ── Summary Cards ──────────────────────────────────────────────────────────────

function SummaryCards({
  openIncidents,
  openAmendments,
}: {
  openIncidents: number;
  openAmendments: number;
}) {
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="glass-card rounded-xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-yellow-500/15 flex items-center justify-center">
          <AlertCircle className="h-5 w-5 text-yellow-500" />
        </div>
        <div>
          <div className="text-2xl font-display font-bold text-foreground">
<<<<<<< HEAD
            {openIncidents.length}
=======
            {openIncidents}
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
          </div>
          <div className="text-xs text-muted-foreground">Open Incidents</div>
        </div>
      </div>
      <div className="glass-card rounded-xl p-4 flex items-center gap-3">
<<<<<<< HEAD
        <div className="w-10 h-10 rounded-xl bg-cyan-500/15 flex items-center justify-center">
          <UserCog className="h-5 w-5 text-cyan-500" />
        </div>
        <div>
          <div className="text-2xl font-display font-bold text-foreground">
            {openAmendments.length}
          </div>
          <div className="text-xs text-muted-foreground">Open T24 Requests</div>
=======
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
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
        </div>
      </div>
    </div>
  );
}

<<<<<<< HEAD
function IncidentsSection() {
  const [loading, setLoading] = useState(true);
  const [incidents, setIncidents] = useState<IncidentReport[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [selectionNotice, setSelectionNotice] = useState(false);
  const [confirmResolve, setConfirmResolve] = useState<number | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [busy, setBusy] = useState(false);
=======
// ── Incidents Table ────────────────────────────────────────────────────────────

function IncidentsTable() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [incidents, setIncidents] = useState<IncidentReport[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [confirmResolve, setConfirmResolve] = useState<number | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58

  const load = useCallback(async () => {
    setLoading(true);
    const data = await apiGetIncidentReports();
    setIncidents(data);
<<<<<<< HEAD
    setSelected(new Set());
    setLoading(false);
=======
    setLoading(false);
    setSelected(new Set());
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
  }, []);

  useEffect(() => {
    load();
  }, [load]);

<<<<<<< HEAD
  const resolvedIds = useMemo(
    () =>
      incidents
        .filter((incident) => incident.status === "resolved")
        .map((i) => i.id),
    [incidents],
  );
=======
  const openCount = incidents.filter((i) => i.status === "open").length;
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58

  function toggleSelect(id: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

<<<<<<< HEAD
  async function handleResolve(id: number) {
    setBusy(true);
    const result = await apiResolveIncidentReport(id, "Resolved by IT Admin.");
    if ("err" in result) {
      toast.error(result.err);
    } else {
      toast.success("Incident resolved.");
      await load();
    }
    setBusy(false);
=======
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
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
    setConfirmResolve(null);
  }

  async function handleDeleteSelected() {
<<<<<<< HEAD
    if (selected.size === 0) {
      setSelectionNotice(true);
      return;
    }
    setBusy(true);
    const result = await apiDeleteResolvedIncidents(Array.from(selected));
    if ("err" in result) {
      toast.error(result.err);
    } else {
      toast.success(`${selected.size} resolved incident(s) deleted.`);
      await load();
    }
    setBusy(false);
=======
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
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
    setConfirmDelete(false);
  }

  function handleExport() {
<<<<<<< HEAD
    downloadCsv(apiExportIncidentsCsv(incidents), "IT_Incident_Reports.csv");
    toast.success("IT_Incident_Reports.csv downloaded.");
  }

  if (loading) return <SkeletonCard lines={6} />;

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="p-5 border-b border-border/40 flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
            Incident Reports
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Track and resolve reported technical issues.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            type="button"
            variant="outline"
            className="gap-2"
            onClick={handleExport}
            data-ocid="incidents.export_button"
          >
            <Download className="h-4 w-4" />
            Export Data
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="gap-2"
            onClick={() =>
              selected.size > 0
                ? setConfirmDelete(true)
                : setSelectionNotice(true)
            }
            data-ocid="incidents.delete_button"
          >
            <Trash2 className="h-4 w-4" />
            Delete Selected
=======
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
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
          </Button>
        </div>
      </div>

<<<<<<< HEAD
      {incidents.length === 0 ? (
        <div className="p-6">
          <EmptyState
            icon={<ClipboardList className="h-8 w-8" />}
            title="All Clear! No incidents pending."
            description=""
            data-ocid="incidents.empty_state"
          />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 bg-muted/20">
                <th className="p-3 text-left text-xs uppercase tracking-wide text-muted-foreground w-14">
                  Select
                </th>
                <th className="p-3 text-left text-xs uppercase tracking-wide text-muted-foreground">
                  Date
                </th>
                <th className="p-3 text-left text-xs uppercase tracking-wide text-muted-foreground">
                  Location
                </th>
                <th className="p-3 text-left text-xs uppercase tracking-wide text-muted-foreground">
                  Reporter Details
                </th>
                <th className="p-3 text-left text-xs uppercase tracking-wide text-muted-foreground">
                  Issue Type
                </th>
                <th className="p-3 text-left text-xs uppercase tracking-wide text-muted-foreground">
                  Description
                </th>
                <th className="p-3 text-right text-xs uppercase tracking-wide text-muted-foreground">
=======
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
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
<<<<<<< HEAD
              {incidents.map((incident, index) => {
                const resolved = incident.status === "resolved";
                return (
                  <tr
                    key={incident.id}
                    className={`border-b border-border/30 ${
                      resolved ? "bg-muted/25" : "hover:bg-muted/10"
                    }`}
                    data-ocid={`incidents.row.${index + 1}`}
                  >
                    <td className="p-3">
                      {resolved ? (
                        <Checkbox
                          checked={selected.has(incident.id)}
                          onCheckedChange={() => toggleSelect(incident.id)}
                          data-ocid={`incidents.checkbox.${index + 1}`}
                        />
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="p-3 text-muted-foreground font-medium whitespace-nowrap">
                      {formatDate(incident.createdAt)}
                    </td>
                    <td className="p-3 font-semibold text-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-emerald-500" />
                        {incident.agency ?? "-"}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-foreground">
                        {incident.reporterName}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 inline-flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-emerald-500" />
                        {incident.contact ?? "-"}
                      </div>
                    </td>
                    <td className="p-3">
                      <IncidentIssueBadge
                        issue={incident.issueCategory ?? incident.subject}
                      />
                    </td>
                    <td className="p-3 text-foreground/90 max-w-[320px]">
                      <span className="line-clamp-2 block">
                        {incident.description}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      {resolved ? (
                        <StatusChip status={incident.status} />
                      ) : (
=======
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
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="gap-1 text-green-600 border-green-500/30 hover:bg-green-500/10"
<<<<<<< HEAD
                          onClick={() => setConfirmResolve(incident.id)}
                          disabled={busy}
                          data-ocid={`incidents.resolve_button.${index + 1}`}
=======
                          onClick={() => setConfirmResolve(inc.id)}
                          disabled={actionLoading}
                          data-ocid={`incidents.resolve_button.${idx + 1}`}
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
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
<<<<<<< HEAD
      )}

      <ConfirmDialog
        open={selectionNotice}
        onOpenChange={setSelectionNotice}
        title="No resolved item selected"
        description="Select at least one resolved incident to delete."
        confirmLabel="OK"
        cancelLabel="Close"
        onConfirm={() => setSelectionNotice(false)}
      />
      <ConfirmDialog
        open={confirmResolve !== null}
        onOpenChange={() => setConfirmResolve(null)}
        title="Resolve Incident?"
        description="This incident will be marked as resolved."
        confirmLabel="Resolve"
=======
      </div>

      <ConfirmDialog
        open={confirmResolve !== null}
        onOpenChange={() => setConfirmResolve(null)}
        title="Mark as Resolved?"
        description="This incident will be marked as resolved. You can delete it afterwards."
        confirmLabel="Mark Resolved"
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
        onConfirm={() =>
          confirmResolve !== null && handleResolve(confirmResolve)
        }
      />
      <ConfirmDialog
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
<<<<<<< HEAD
        title={`Delete ${selected.size} resolved incident(s)?`}
        description="Only resolved items can be deleted."
        confirmLabel="Delete Selected"
=======
        title={`Delete ${selected.size} incident(s)?`}
        description="Deleted incidents cannot be recovered."
        confirmLabel="Delete"
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
        variant="destructive"
        onConfirm={handleDeleteSelected}
      />

<<<<<<< HEAD
      <span className="hidden">{resolvedIds.length}</span>
=======
      {/* suppress unused warning */}
      <span className="hidden">{user?.id}</span>
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
    </div>
  );
}

<<<<<<< HEAD
function AmendmentsSection() {
=======
// ── Amendments Table ───────────────────────────────────────────────────────────

function AmendmentsTable() {
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [amendments, setAmendments] = useState<ProfileAmendment[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
<<<<<<< HEAD
  const [selectionNotice, setSelectionNotice] = useState(false);
  const [confirmResolve, setConfirmResolve] = useState<number | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [busy, setBusy] = useState(false);
=======
  const [confirmResolve, setConfirmResolve] = useState<{
    id: number;
    approve: boolean;
  } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58

  const load = useCallback(async () => {
    setLoading(true);
    const data = await apiGetProfileAmendments();
    setAmendments(data);
<<<<<<< HEAD
    setSelected(new Set());
    setLoading(false);
=======
    setLoading(false);
    setSelected(new Set());
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
  }, []);

  useEffect(() => {
    load();
  }, [load]);

<<<<<<< HEAD
=======
  const openCount = amendments.filter((a) => a.status === "pending").length;

>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
  function toggleSelect(id: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

<<<<<<< HEAD
  async function handleResolve(id: number) {
    setBusy(true);
    const result = await apiResolveProfileAmendment(
      id,
      true,
      "Resolved by IT Admin.",
      user?.id ?? "",
    );
    if ("err" in result) {
      toast.error(result.err);
    } else {
      toast.success("Amendment request resolved.");
      await load();
    }
    setBusy(false);
=======
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
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
    setConfirmResolve(null);
  }

  async function handleDeleteSelected() {
<<<<<<< HEAD
    if (selected.size === 0) {
      setSelectionNotice(true);
      return;
    }
    setBusy(true);
    const result = await apiDeleteResolvedAmendments(Array.from(selected));
    if ("err" in result) {
      toast.error(result.err);
    } else {
      toast.success(`${selected.size} resolved amendment(s) deleted.`);
      await load();
    }
    setBusy(false);
=======
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
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
    setConfirmDelete(false);
  }

  function handleExport() {
<<<<<<< HEAD
    downloadCsv(
      apiExportAmendmentsCsv(amendments),
      "T24_Amendment_Requests.csv",
    );
    toast.success("T24_Amendment_Requests.csv downloaded.");
  }

  if (loading) return <SkeletonCard lines={6} />;

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="p-5 border-b border-border/40 flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
            <UserCog className="h-5 w-5 text-cyan-500" />
            T24 Amendment Requests
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage profile changes and T24 user updates.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            type="button"
            variant="outline"
            className="gap-2"
            onClick={handleExport}
            data-ocid="amendments.export_button"
          >
            <Download className="h-4 w-4" />
            Export Data
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="gap-2"
            onClick={() =>
              selected.size > 0
                ? setConfirmDelete(true)
                : setSelectionNotice(true)
            }
            data-ocid="amendments.delete_button"
          >
            <Trash2 className="h-4 w-4" />
            Delete Selected
=======
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
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
          </Button>
        </div>
      </div>

<<<<<<< HEAD
      {amendments.length === 0 ? (
        <div className="p-6">
          <EmptyState
            icon={<Settings2 className="h-8 w-8" />}
            title="No pending requests."
            description=""
            data-ocid="amendments.empty_state"
          />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 bg-muted/20">
                <th className="p-3 text-left text-xs uppercase tracking-wide text-muted-foreground w-14">
                  Select
                </th>
                <th className="p-3 text-left text-xs uppercase tracking-wide text-muted-foreground">
                  Date
                </th>
                <th className="p-3 text-left text-xs uppercase tracking-wide text-muted-foreground">
                  T24 User / Agency
                </th>
                <th className="p-3 text-left text-xs uppercase tracking-wide text-muted-foreground">
                  Request Type
                </th>
                <th className="p-3 text-left text-xs uppercase tracking-wide text-muted-foreground">
                  Contact
                </th>
                <th className="p-3 text-left text-xs uppercase tracking-wide text-muted-foreground">
                  Change Details
                </th>
                <th className="p-3 text-right text-xs uppercase tracking-wide text-muted-foreground">
=======
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
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
<<<<<<< HEAD
              {amendments.map((amendment, index) => {
                const resolved = amendment.status === "resolved";
                return (
                  <tr
                    key={amendment.id}
                    className={`border-b border-border/30 ${
                      resolved ? "bg-muted/25" : "hover:bg-muted/10"
                    }`}
                    data-ocid={`amendments.row.${index + 1}`}
                  >
                    <td className="p-3">
                      {resolved ? (
                        <Checkbox
                          checked={selected.has(amendment.id)}
                          onCheckedChange={() => toggleSelect(amendment.id)}
                          data-ocid={`amendments.checkbox.${index + 1}`}
                        />
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="p-3 text-muted-foreground font-medium whitespace-nowrap">
                      {formatDate(amendment.createdAt)}
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-primary">
                        {amendment.t24Username ?? "-"}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {amendment.agency ?? "-"}
                      </div>
                    </td>
                    <td className="p-3">
                      <AmendmentTypeBadge
                        type={amendment.requestType ?? amendment.field}
                      />
                    </td>
                    <td className="p-3 font-medium text-foreground">
                      {amendment.phone ?? "-"}
                    </td>
                    <td className="p-3 text-foreground/90 max-w-[320px]">
                      <div className="space-y-1 text-sm">
                        {amendment.newRole && (
                          <div className="text-emerald-600 dark:text-emerald-400">
                            New Role: {amendment.newRole}
                          </div>
                        )}
                        {amendment.deptChange && (
                          <div>{amendment.deptChange}</div>
                        )}
                        {amendment.transferLocation && (
                          <div className="text-primary">
                            To: {amendment.transferLocation}
                          </div>
                        )}
                        {!amendment.newRole &&
                          !amendment.deptChange &&
                          !amendment.transferLocation && (
                            <div>{amendment.reason}</div>
                          )}
                      </div>
                    </td>
                    <td className="p-3 text-right">
                      {resolved ? (
                        <StatusChip status={amendment.status} />
                      ) : (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="gap-1 text-green-600 border-green-500/30 hover:bg-green-500/10"
                          onClick={() => setConfirmResolve(amendment.id)}
                          disabled={busy}
                          data-ocid={`amendments.resolve_button.${index + 1}`}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Resolve
                        </Button>
=======
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
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
<<<<<<< HEAD
      )}

      <ConfirmDialog
        open={selectionNotice}
        onOpenChange={setSelectionNotice}
        title="No resolved item selected"
        description="Select at least one resolved amendment to delete."
        confirmLabel="OK"
        cancelLabel="Close"
        onConfirm={() => setSelectionNotice(false)}
      />
      <ConfirmDialog
        open={confirmResolve !== null}
        onOpenChange={() => setConfirmResolve(null)}
        title="Resolve Amendment?"
        description="This T24 amendment request will be marked as resolved."
        confirmLabel="Resolve"
        onConfirm={() =>
          confirmResolve !== null && handleResolve(confirmResolve)
=======
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
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
        }
      />
      <ConfirmDialog
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
<<<<<<< HEAD
        title={`Delete ${selected.size} resolved amendment(s)?`}
        description="Only resolved items can be deleted."
        confirmLabel="Delete Selected"
=======
        title={`Delete ${selected.size} amendment(s)?`}
        description="Deleted amendments cannot be recovered."
        confirmLabel="Delete"
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
        variant="destructive"
        onConfirm={handleDeleteSelected}
      />
    </div>
  );
}

<<<<<<< HEAD
export default function SupportAdminPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const canAccess = user?.department === "IT" || user?.role === "SuperAdmin";
=======
// ── Page ───────────────────────────────────────────────────────────────────────

export default function SupportAdminPage() {
  const isAdmin = useHasRole(["SuperAdmin", "HRAdmin"]);
  const navigate = useNavigate();
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
  const [incidents, setIncidents] = useState<IncidentReport[]>([]);
  const [amendments, setAmendments] = useState<ProfileAmendment[]>([]);

  useEffect(() => {
<<<<<<< HEAD
    if (!canAccess) {
      navigate({ to: "/support/incident" });
    }
  }, [canAccess, navigate]);
=======
    if (!isAdmin) {
      navigate({ to: "/support" });
    }
  }, [isAdmin, navigate]);
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58

  useEffect(() => {
    apiGetIncidentReports().then(setIncidents);
    apiGetProfileAmendments().then(setAmendments);
  }, []);

<<<<<<< HEAD
  if (!canAccess) return null;
=======
  if (!isAdmin) return null;

  const openIncidents = incidents.filter((i) => i.status === "open").length;
  const openAmendments = amendments.filter(
    (a) => a.status === "pending",
  ).length;
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58

  return (
    <AppShell>
      <div
        className="max-w-6xl mx-auto space-y-6"
        data-ocid="support_admin.page"
      >
<<<<<<< HEAD
        <div className="flex items-center justify-between gap-4 flex-wrap glass-card rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              IT ADMIN CENTER
            </h1>
          </div>
          <Button asChild variant="outline" className="rounded-full gap-2">
            <Link to="/">Dashboard</Link>
          </Button>
        </div>

        <SummaryStrip incidents={incidents} amendments={amendments} />

        <div className="space-y-6">
          <IncidentsSection />
          <AmendmentsSection />
        </div>
=======
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
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
      </div>
    </AppShell>
  );
}
