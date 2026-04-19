import { AppShell } from "@/components/AppShell";
import { EmptyState } from "@/components/EmptyState";
import { SkeletonCard } from "@/components/SkeletonCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  apiGetMyAmendments,
  apiGetMyIncidents,
  apiSubmitIncidentReport,
  apiSubmitProfileAmendment,
} from "@/lib/backend-client";
import { useAuth } from "@/store/auth";
import type { IncidentReport, ProfileAmendment } from "@/types";
import { BRANCHES, DEPARTMENTS } from "@/types";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Headphones,
  Send,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

// ── Status Badge ───────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    open: {
      label: "Open",
      className:
        "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border-yellow-500/30",
    },
    in_progress: {
      label: "In Progress",
      className:
        "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
    },
    resolved: {
      label: "Resolved",
      className:
        "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/30",
    },
    closed: { label: "Closed", className: "bg-muted text-muted-foreground" },
    pending: {
      label: "Pending",
      className:
        "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border-yellow-500/30",
    },
    approved: {
      label: "Approved",
      className:
        "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/30",
    },
    rejected: {
      label: "Rejected",
      className: "bg-destructive/15 text-destructive border-destructive/30",
    },
  };
  const cfg = map[status] ?? { label: status, className: "" };
  return (
    <Badge variant="outline" className={cfg.className}>
      {cfg.label}
    </Badge>
  );
}

// ── Field ──────────────────────────────────────────────────────────────────────

function Field({
  label,
  children,
}: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
        {label}
      </Label>
      {children}
    </div>
  );
}

function SelectInput({
  id,
  value,
  onChange,
  options,
  placeholder,
  ocid,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  placeholder: string;
  ocid: string;
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-9 rounded-md border border-input bg-card px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
      data-ocid={ocid}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

function TextInput({
  id,
  value,
  onChange,
  placeholder,
  ocid,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  ocid: string;
}) {
  return (
    <input
      id={id}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full h-9 rounded-md border border-input bg-card px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
      data-ocid={ocid}
    />
  );
}

// ── Incident Form ──────────────────────────────────────────────────────────────

const ISSUE_CATEGORIES = [
  "Hardware",
  "Software",
  "Network",
  "T24 Core Banking",
  "Email/Password",
  "Other",
] as const;

interface IncidentFormState {
  agency: string;
  issueCategory: string;
  description: string;
  reporterName: string;
  contact: string;
}

function IncidentForm({ onSubmitted }: { onSubmitted: () => void }) {
  const { user } = useAuth();
  const [form, setForm] = useState<IncidentFormState>({
    agency: user?.branch ?? "",
    issueCategory: "",
    description: "",
    reporterName: user?.fullname ?? "",
    contact: user?.phone ?? "",
  });
  const [submitting, setSubmitting] = useState(false);

  const set = (key: keyof IncidentFormState) => (val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.agency || !form.issueCategory || !form.description.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await apiSubmitIncidentReport(
        {
          agency: form.agency,
          issueCategory: form.issueCategory,
          description: form.description,
          reporterName: form.reporterName,
          contact: form.contact,
        },
        user?.id ?? "",
      );
      if ("err" in res) {
        toast.error(res.err);
      } else {
        toast.success("Incident report submitted successfully.");
        setForm({
          agency: user?.branch ?? "",
          issueCategory: "",
          description: "",
          reporterName: user?.fullname ?? "",
          contact: user?.phone ?? "",
        });
        onSubmitted();
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      data-ocid="incident.form"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Branch / Agency *">
          <SelectInput
            id="inc-agency"
            value={form.agency}
            onChange={set("agency")}
            options={BRANCHES}
            placeholder="Select branch"
            ocid="incident.agency.select"
          />
        </Field>
        <Field label="Issue Category *">
          <SelectInput
            id="inc-category"
            value={form.issueCategory}
            onChange={set("issueCategory")}
            options={ISSUE_CATEGORIES}
            placeholder="Select category"
            ocid="incident.category.select"
          />
        </Field>
        <Field label="Reporter Name">
          <TextInput
            id="inc-reporter"
            value={form.reporterName}
            onChange={set("reporterName")}
            ocid="incident.reporter.input"
          />
        </Field>
        <Field label="Contact Number">
          <TextInput
            id="inc-contact"
            value={form.contact}
            onChange={set("contact")}
            placeholder="e.g. 0244123456"
            ocid="incident.contact.input"
          />
        </Field>
      </div>
      <Field label="Description *">
        <Textarea
          id="inc-desc"
          value={form.description}
          onChange={(e) => set("description")(e.target.value)}
          placeholder="Describe the issue in detail..."
          rows={4}
          className="resize-none"
          data-ocid="incident.description.textarea"
        />
      </Field>
      <Button
        type="submit"
        disabled={submitting}
        className="gap-2"
        data-ocid="incident.submit_button"
      >
        <Send className="h-4 w-4" />
        {submitting ? "Submitting…" : "Submit Report"}
      </Button>
    </form>
  );
}

// ── Amendment Form ─────────────────────────────────────────────────────────────

const REQUEST_TYPES = [
  "Role Change",
  "Department Change",
  "Transfer",
  "T24 Amendment",
  "Other",
] as const;

interface AmendmentFormState {
  fullname: string;
  phone: string;
  t24Username: string;
  agency: string;
  requestType: string;
  newRole: string;
  deptChange: string;
  transferLocation: string;
  additionalDetails: string;
}

function AmendmentForm({ onSubmitted }: { onSubmitted: () => void }) {
  const { user } = useAuth();
  const [form, setForm] = useState<AmendmentFormState>({
    fullname: user?.fullname ?? "",
    phone: user?.phone ?? "",
    t24Username: user?.email?.split("@")[0] ?? "",
    agency: user?.branch ?? "",
    requestType: "",
    newRole: "",
    deptChange: "",
    transferLocation: "",
    additionalDetails: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const set = (key: keyof AmendmentFormState) => (val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.requestType || !form.agency) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await apiSubmitProfileAmendment(
        {
          fullname: form.fullname,
          phone: form.phone,
          t24Username: form.t24Username,
          agency: form.agency,
          requestType: form.requestType,
          newRole: form.newRole || undefined,
          deptChange: form.deptChange || undefined,
          transferLocation: form.transferLocation || undefined,
          additionalDetails: form.additionalDetails || undefined,
        },
        user?.id ?? "",
        user?.fullname ?? "",
      );
      if ("err" in res) {
        toast.error(res.err);
      } else {
        toast.success("Profile amendment request submitted.");
        setForm({
          fullname: user?.fullname ?? "",
          phone: user?.phone ?? "",
          t24Username: user?.email?.split("@")[0] ?? "",
          agency: user?.branch ?? "",
          requestType: "",
          newRole: "",
          deptChange: "",
          transferLocation: "",
          additionalDetails: "",
        });
        onSubmitted();
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      data-ocid="amendment.form"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Full Name">
          <TextInput
            id="am-fullname"
            value={form.fullname}
            onChange={set("fullname")}
            ocid="amendment.fullname.input"
          />
        </Field>
        <Field label="Phone Number">
          <TextInput
            id="am-phone"
            value={form.phone}
            onChange={set("phone")}
            ocid="amendment.phone.input"
          />
        </Field>
        <Field label="T24 Username">
          <TextInput
            id="am-t24"
            value={form.t24Username}
            onChange={set("t24Username")}
            ocid="amendment.t24username.input"
          />
        </Field>
        <Field label="Branch / Agency *">
          <SelectInput
            id="am-agency"
            value={form.agency}
            onChange={set("agency")}
            options={BRANCHES}
            placeholder="Select branch"
            ocid="amendment.agency.select"
          />
        </Field>
        <Field label="Request Type *">
          <SelectInput
            id="am-reqtype"
            value={form.requestType}
            onChange={set("requestType")}
            options={REQUEST_TYPES}
            placeholder="Select request type"
            ocid="amendment.request_type.select"
          />
        </Field>
        {form.requestType === "Role Change" && (
          <Field label="New Role">
            <TextInput
              id="am-newrole"
              value={form.newRole}
              onChange={set("newRole")}
              placeholder="e.g. Senior Teller"
              ocid="amendment.new_role.input"
            />
          </Field>
        )}
        {form.requestType === "Department Change" && (
          <Field label="New Department">
            <SelectInput
              id="am-dept"
              value={form.deptChange}
              onChange={set("deptChange")}
              options={DEPARTMENTS}
              placeholder="Select department"
              ocid="amendment.dept_change.select"
            />
          </Field>
        )}
        {form.requestType === "Transfer" && (
          <Field label="Transfer Location">
            <SelectInput
              id="am-transfer"
              value={form.transferLocation}
              onChange={set("transferLocation")}
              options={BRANCHES}
              placeholder="Select branch"
              ocid="amendment.transfer_location.select"
            />
          </Field>
        )}
      </div>
      <Field label="Additional Details">
        <Textarea
          id="am-details"
          value={form.additionalDetails}
          onChange={(e) => set("additionalDetails")(e.target.value)}
          placeholder="Any additional context or justification..."
          rows={3}
          className="resize-none"
          data-ocid="amendment.details.textarea"
        />
      </Field>
      <Button
        type="submit"
        disabled={submitting}
        className="gap-2"
        data-ocid="amendment.submit_button"
      >
        <Send className="h-4 w-4" />
        {submitting ? "Submitting…" : "Submit Request"}
      </Button>
    </form>
  );
}

// ── Recent Incidents ───────────────────────────────────────────────────────────

function RecentIncidents({ refreshKey }: { refreshKey: number }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [incidents, setIncidents] = useState<IncidentReport[]>([]);

  useEffect(() => {
    if (!user) return;
    // refreshKey signals a reload; use it to satisfy biome exhaustive-deps
    void refreshKey;
    let cancelled = false;
    setLoading(true);
    apiGetMyIncidents(user.id).then((data) => {
      if (!cancelled) {
        setIncidents(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [user, refreshKey]);

  if (loading) return <SkeletonCard lines={3} />;
  if (!incidents.length)
    return (
      <EmptyState
        icon={<AlertCircle className="h-8 w-8" />}
        title="No incident reports yet"
        description="Your submitted incident reports will appear here."
        data-ocid="incident.recent.empty_state"
      />
    );

  return (
    <div className="space-y-3" data-ocid="incident.recent.list">
      {incidents.map((inc, idx) => (
        <div
          key={inc.id}
          className="glass-card rounded-xl p-4 flex items-start gap-3"
          data-ocid={`incident.recent.item.${idx + 1}`}
        >
          <div className="mt-0.5">
            {inc.status === "resolved" ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <Clock className="h-4 w-4 text-yellow-500" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-foreground truncate">
                {inc.subject}
              </span>
              <StatusBadge status={inc.status} />
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
              {inc.description}
            </p>
            <p className="text-[11px] text-muted-foreground mt-1">
              {new Date(Number(inc.createdAt)).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Recent Amendments ──────────────────────────────────────────────────────────

function RecentAmendments({ refreshKey }: { refreshKey: number }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [amendments, setAmendments] = useState<ProfileAmendment[]>([]);

  useEffect(() => {
    if (!user) return;
    void refreshKey;
    let cancelled = false;
    setLoading(true);
    apiGetMyAmendments(user.id).then((data) => {
      if (!cancelled) {
        setAmendments(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [user, refreshKey]);

  if (loading) return <SkeletonCard lines={3} />;
  if (!amendments.length)
    return (
      <EmptyState
        icon={<AlertCircle className="h-8 w-8" />}
        title="No amendment requests yet"
        description="Your submitted profile amendment requests will appear here."
        data-ocid="amendment.recent.empty_state"
      />
    );

  return (
    <div className="space-y-3" data-ocid="amendment.recent.list">
      {amendments.map((am, idx) => (
        <div
          key={am.id}
          className="glass-card rounded-xl p-4 flex items-start gap-3"
          data-ocid={`amendment.recent.item.${idx + 1}`}
        >
          <div className="mt-0.5">
            {am.status === "approved" ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : am.status === "rejected" ? (
              <AlertCircle className="h-4 w-4 text-destructive" />
            ) : (
              <Clock className="h-4 w-4 text-yellow-500" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-foreground truncate">
                {am.field}
              </span>
              <StatusBadge status={am.status} />
            </div>
            {am.requestedValue && (
              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                Requested: {am.requestedValue}
              </p>
            )}
            {am.reviewNote && (
              <p className="text-xs text-muted-foreground truncate">
                Note: {am.reviewNote}
              </p>
            )}
            <p className="text-[11px] text-muted-foreground mt-1">
              {new Date(Number(am.createdAt)).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function SupportPage() {
  const [incRefresh, setIncRefresh] = useState(0);
  const [amRefresh, setAmRefresh] = useState(0);

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto space-y-6" data-ocid="support.page">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
            <Headphones className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold text-foreground">
              IT Support
            </h1>
            <p className="text-sm text-muted-foreground">
              Report incidents or request profile amendments
            </p>
          </div>
        </div>

        <Tabs defaultValue="incident" data-ocid="support.tabs">
          <TabsList className="glass-card w-full justify-start">
            <TabsTrigger value="incident" data-ocid="support.incident.tab">
              Report Incident
            </TabsTrigger>
            <TabsTrigger value="amendment" data-ocid="support.amendment.tab">
              Profile Amendment
            </TabsTrigger>
          </TabsList>

          {/* ── Incident Tab ── */}
          <TabsContent value="incident" className="space-y-6 mt-4">
            <div className="glass-card-elevated rounded-2xl p-6">
              <h2 className="text-base font-semibold text-foreground mb-4">
                Submit an Incident Report
              </h2>
              <IncidentForm onSubmitted={() => setIncRefresh((n) => n + 1)} />
            </div>

            <Separator className="opacity-30" />

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                My Recent Reports
              </h3>
              <RecentIncidents refreshKey={incRefresh} />
            </div>
          </TabsContent>

          {/* ── Amendment Tab ── */}
          <TabsContent value="amendment" className="space-y-6 mt-4">
            <div className="glass-card-elevated rounded-2xl p-6">
              <h2 className="text-base font-semibold text-foreground mb-4">
                Request a Profile Amendment
              </h2>
              <AmendmentForm onSubmitted={() => setAmRefresh((n) => n + 1)} />
            </div>

            <Separator className="opacity-30" />

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                My Recent Requests
              </h3>
              <RecentAmendments refreshKey={amRefresh} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
