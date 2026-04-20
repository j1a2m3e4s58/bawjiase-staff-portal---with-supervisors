import { AppShell } from "@/components/AppShell";
import { EmptyState } from "@/components/EmptyState";
import { SkeletonCard } from "@/components/SkeletonCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
=======
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
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
<<<<<<< HEAD
import { BRANCHES } from "@/types";
import type { IncidentReport, ProfileAmendment } from "@/types";
import { useLocation } from "@tanstack/react-router";
=======
import type { IncidentReport, ProfileAmendment } from "@/types";
import { BRANCHES, DEPARTMENTS } from "@/types";
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Headphones,
<<<<<<< HEAD
  SendHorizonal,
  TriangleAlert,
  UserCog,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ISSUE_CATEGORIES = [
  "Temenos 24",
  "NETWORK",
  "NCOMPUTING",
  "REMITTANCE",
  "E-ZWICH",
  "NIA",
  "PRINTER",
  "UPS",
  "CCTV",
  "SYSTEM ADMINISTRATION",
  "COMPUTERS AND PERIPHERALS",
  "EMAIL/WEBSITE",
] as const;

const REQUEST_TYPES = [
  "T24 PASSWORD RESET",
  "T24 TOO MANY ATTEMPTS RESET",
  "ROLE CHANGE",
  "DEPARTMENTAL CHANGE",
  "TRANSFER OF PROFILE",
  "STAFF REDESIGNATION",
] as const;

const DEPARTMENTAL_CHANGES = [
  "LOAN INPUTTER TO AUTHORIZER",
  "LOAN AUTHORIZER TO INPUTTER",
  "FD INPUTTER TO AUTHORIZER",
  "FD AUTHORIZER TO INPUTTER",
] as const;

const TRANSFER_LOCATIONS = [
  "ADEISO AGENCY",
  "BAWJIASE AGENCY",
  "HEAD OFFICE",
  "OFAAKOR",
  "KASOA MARKET",
  "KASOA NEW MARKET",
] as const;
=======
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
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58

function Field({
  label,
  children,
<<<<<<< HEAD
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
=======
}: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
        {label}
      </Label>
      {children}
    </div>
  );
}

<<<<<<< HEAD
=======
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

>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
function TextInput({
  id,
  value,
  onChange,
  placeholder,
<<<<<<< HEAD
  invalid,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  invalid?: boolean;
=======
  ocid,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  ocid: string;
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
}) {
  return (
    <input
      id={id}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
<<<<<<< HEAD
      className={`h-10 w-full rounded-full border bg-card px-4 text-sm outline-none transition-smooth focus:ring-2 focus:ring-ring ${
        invalid ? "border-destructive" : "border-input"
      }`}
=======
      className="w-full h-9 rounded-md border border-input bg-card px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
      data-ocid={ocid}
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
    />
  );
}

<<<<<<< HEAD
function SelectInput({
  id,
  value,
  onChange,
  placeholder,
  options,
  invalid,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: readonly string[];
  invalid?: boolean;
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`h-10 w-full rounded-full border bg-card px-4 text-sm outline-none transition-smooth focus:ring-2 focus:ring-ring ${
        invalid ? "border-destructive" : "border-input"
      }`}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function StatusBadge({ status }: { status: string }) {
  const normalized = status.toLowerCase();
  const className =
    normalized === "resolved" || normalized === "approved"
      ? "border-green-500/30 bg-green-500/15 text-green-600 dark:text-green-400"
      : normalized === "rejected"
        ? "border-destructive/30 bg-destructive/15 text-destructive"
        : "border-yellow-500/30 bg-yellow-500/15 text-yellow-600 dark:text-yellow-400";

  return (
    <Badge variant="outline" className={className}>
      {status.replaceAll("_", " ")}
    </Badge>
  );
}

function MissingDetailsDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card-elevated max-w-sm text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500/15 text-yellow-600 dark:text-yellow-400">
          <TriangleAlert className="h-10 w-10" />
        </div>
        <DialogTitle className="font-display text-xl font-bold">
          Details Missing
        </DialogTitle>
        <DialogDescription>
          Kindly complete all required fields before submitting so we can assist
          you properly.
        </DialogDescription>
        <Button
          type="button"
          variant="secondary"
          className="mx-auto mt-2 rounded-full px-8 font-bold"
          onClick={() => onOpenChange(false)}
        >
          Review Form
        </Button>
      </DialogContent>
    </Dialog>
  );
}

function SuccessDialog({
  open,
  onOpenChange,
  message,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card-elevated max-w-sm text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary/20 text-secondary">
          <CheckCircle className="h-10 w-10" />
        </div>
        <DialogTitle className="font-display text-xl font-bold">
          Request Submitted!
        </DialogTitle>
        <DialogDescription>{message}</DialogDescription>
        <Button
          type="button"
          className="mx-auto mt-2 rounded-full px-8 font-bold"
          onClick={() => onOpenChange(false)}
        >
          Okay, Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}
=======
// ── Incident Form ──────────────────────────────────────────────────────────────

const ISSUE_CATEGORIES = [
  "Hardware",
  "Software",
  "Network",
  "T24 Core Banking",
  "Email/Password",
  "Other",
] as const;
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58

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
<<<<<<< HEAD
  const [touched, setTouched] = useState(false);
  const [showMissing, setShowMissing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const set = (key: keyof IncidentFormState) => (value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    const isValid =
      form.agency &&
      form.issueCategory &&
      form.description.trim() &&
      form.reporterName.trim() &&
      form.contact.trim();

    if (!isValid) {
      setShowMissing(true);
      return;
    }

    setSubmitting(true);
    try {
      const result = await apiSubmitIncidentReport(
=======

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
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
        {
          agency: form.agency,
          issueCategory: form.issueCategory,
          description: form.description,
          reporterName: form.reporterName,
          contact: form.contact,
        },
        user?.id ?? "",
      );
<<<<<<< HEAD

      if ("err" in result) {
        toast.error(result.err);
        return;
      }

      setShowSuccess(true);
      setForm({
        agency: user?.branch ?? "",
        issueCategory: "",
        description: "",
        reporterName: user?.fullname ?? "",
        contact: user?.phone ?? "",
      });
      setTouched(false);
      onSubmitted();
=======
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
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
    } finally {
      setSubmitting(false);
    }
  }

  return (
<<<<<<< HEAD
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
        data-ocid="incident.form"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Agency">
            <SelectInput
              id="incident-agency"
              value={form.agency}
              onChange={set("agency")}
              placeholder="Select Agency..."
              options={BRANCHES}
              invalid={touched && !form.agency}
            />
          </Field>
          <Field label="Issue Category">
            <SelectInput
              id="incident-issue"
              value={form.issueCategory}
              onChange={set("issueCategory")}
              placeholder="Select Issue..."
              options={ISSUE_CATEGORIES}
              invalid={touched && !form.issueCategory}
            />
          </Field>
          <div className="md:col-span-2">
            <Field label="Description of Issue">
              <Textarea
                value={form.description}
                onChange={(e) => set("description")(e.target.value)}
                placeholder="Describe the problem in detail..."
                rows={4}
                className={`resize-none rounded-xl bg-card ${
                  touched && !form.description.trim()
                    ? "border-destructive"
                    : ""
                }`}
              />
            </Field>
          </div>
          <Field label="Reporting Officer">
            <TextInput
              id="incident-reporter"
              value={form.reporterName}
              onChange={set("reporterName")}
              invalid={touched && !form.reporterName.trim()}
            />
          </Field>
          <Field label="Contact / Ext">
            <TextInput
              id="incident-contact"
              value={form.contact}
              onChange={set("contact")}
              placeholder="Phone or Extension"
              invalid={touched && !form.contact.trim()}
            />
          </Field>
        </div>
        <Button
          type="submit"
          disabled={submitting}
          className="h-11 w-full gap-2 rounded-full font-bold"
        >
          <SendHorizonal className="h-4 w-4" />
          {submitting ? "Submitting..." : "Submit Incident Report"}
        </Button>
      </form>
      <MissingDetailsDialog open={showMissing} onOpenChange={setShowMissing} />
      <SuccessDialog
        open={showSuccess}
        onOpenChange={setShowSuccess}
        message="The IT Department has received your incident report."
      />
    </>
  );
}

=======
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

>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
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
<<<<<<< HEAD
    t24Username: "",
=======
    t24Username: user?.email?.split("@")[0] ?? "",
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
    agency: user?.branch ?? "",
    requestType: "",
    newRole: "",
    deptChange: "",
    transferLocation: "",
    additionalDetails: "",
  });
  const [submitting, setSubmitting] = useState(false);
<<<<<<< HEAD
  const [touched, setTouched] = useState(false);
  const [showMissing, setShowMissing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const set = (key: keyof AmendmentFormState) => (value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    const needsRole = form.requestType === "ROLE CHANGE";
    const needsDepartment = form.requestType === "DEPARTMENTAL CHANGE";
    const needsTransfer = form.requestType === "TRANSFER OF PROFILE";
    const isValid =
      form.fullname.trim() &&
      form.phone.trim() &&
      form.t24Username.trim() &&
      form.agency &&
      form.requestType &&
      (!needsRole || form.newRole.trim()) &&
      (!needsDepartment || form.deptChange) &&
      (!needsTransfer || form.transferLocation);

    if (!isValid) {
      setShowMissing(true);
      return;
    }

    setSubmitting(true);
    try {
      const result = await apiSubmitProfileAmendment(
=======

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
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
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
<<<<<<< HEAD

      if ("err" in result) {
        toast.error(result.err);
        return;
      }

      setShowSuccess(true);
      setForm({
        fullname: user?.fullname ?? "",
        phone: user?.phone ?? "",
        t24Username: "",
        agency: user?.branch ?? "",
        requestType: "",
        newRole: "",
        deptChange: "",
        transferLocation: "",
        additionalDetails: "",
      });
      setTouched(false);
      onSubmitted();
=======
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
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
    } finally {
      setSubmitting(false);
    }
  }

  return (
<<<<<<< HEAD
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
        data-ocid="amendment.form"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Name">
            <TextInput
              id="amendment-name"
              value={form.fullname}
              onChange={set("fullname")}
              invalid={touched && !form.fullname.trim()}
            />
          </Field>
          <Field label="Phone Number">
            <TextInput
              id="amendment-phone"
              value={form.phone}
              onChange={set("phone")}
              placeholder="Enter your mobile number"
              invalid={touched && !form.phone.trim()}
            />
          </Field>
          <Field label="T24 Username">
            <TextInput
              id="amendment-t24"
              value={form.t24Username}
              onChange={set("t24Username")}
              placeholder="e.g. B01.JOHN"
              invalid={touched && !form.t24Username.trim()}
            />
          </Field>
          <Field label="Agency">
            <SelectInput
              id="amendment-agency"
              value={form.agency}
              onChange={set("agency")}
              placeholder="Select Agency..."
              options={BRANCHES}
              invalid={touched && !form.agency}
            />
          </Field>
          <div className="md:col-span-2">
            <Field label="Type of Request">
              <SelectInput
                id="amendment-request-type"
                value={form.requestType}
                onChange={set("requestType")}
                placeholder="Select Request..."
                options={REQUEST_TYPES}
                invalid={touched && !form.requestType}
              />
            </Field>
          </div>

          {form.requestType === "ROLE CHANGE" && (
            <div className="rounded-xl border bg-muted/20 p-4 md:col-span-2">
              <Field label="If Role Change, what is the new role?">
                <TextInput
                  id="amendment-new-role"
                  value={form.newRole}
                  onChange={set("newRole")}
                  placeholder="Enter new role here..."
                  invalid={touched && !form.newRole.trim()}
                />
              </Field>
            </div>
          )}

          {form.requestType === "DEPARTMENTAL CHANGE" && (
            <div className="rounded-xl border bg-muted/20 p-4 md:col-span-2">
              <Field label="If Departmental Change, Indicate:">
                <SelectInput
                  id="amendment-department-change"
                  value={form.deptChange}
                  onChange={set("deptChange")}
                  placeholder="Select Change..."
                  options={DEPARTMENTAL_CHANGES}
                  invalid={touched && !form.deptChange}
                />
              </Field>
            </div>
          )}

          {form.requestType === "TRANSFER OF PROFILE" && (
            <div className="rounded-xl border bg-muted/20 p-4 md:col-span-2">
              <Field label="If Transfer of Profile, where are you transferring to?">
                <SelectInput
                  id="amendment-transfer-location"
                  value={form.transferLocation}
                  onChange={set("transferLocation")}
                  placeholder="Select Destination..."
                  options={TRANSFER_LOCATIONS}
                  invalid={touched && !form.transferLocation}
                />
              </Field>
            </div>
          )}

          <div className="md:col-span-2">
            <Field label="Additional Details">
              <Textarea
                value={form.additionalDetails}
                onChange={(e) => set("additionalDetails")(e.target.value)}
                placeholder="Any additional context or justification..."
                rows={3}
                className="resize-none rounded-xl bg-card"
              />
            </Field>
          </div>
        </div>

        <Button
          type="submit"
          disabled={submitting}
          className="h-11 w-full gap-2 rounded-full font-bold"
        >
          <CheckCircle className="h-4 w-4" />
          {submitting ? "Submitting..." : "Submit Amendment Request"}
        </Button>
      </form>
      <MissingDetailsDialog open={showMissing} onOpenChange={setShowMissing} />
      <SuccessDialog
        open={showSuccess}
        onOpenChange={setShowSuccess}
        message="The IT Department has received your amendment request."
      />
    </>
  );
}

=======
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

>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
function RecentIncidents({ refreshKey }: { refreshKey: number }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [incidents, setIncidents] = useState<IncidentReport[]>([]);

  useEffect(() => {
    if (!user) return;
<<<<<<< HEAD
=======
    // refreshKey signals a reload; use it to satisfy biome exhaustive-deps
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
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
<<<<<<< HEAD
  if (!incidents.length) {
=======
  if (!incidents.length)
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
    return (
      <EmptyState
        icon={<AlertCircle className="h-8 w-8" />}
        title="No incident reports yet"
        description="Your submitted incident reports will appear here."
<<<<<<< HEAD
      />
    );
  }

  return (
    <div className="space-y-3">
      {incidents.map((incident) => (
        <div key={incident.id} className="glass-card rounded-xl p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                {incident.subject}
              </p>
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                {incident.description}
              </p>
            </div>
            <StatusBadge status={incident.status} />
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground">
            {new Date(Number(incident.createdAt)).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
=======
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
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
        </div>
      ))}
    </div>
  );
}

<<<<<<< HEAD
=======
// ── Recent Amendments ──────────────────────────────────────────────────────────

>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
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
<<<<<<< HEAD
  if (!amendments.length) {
=======
  if (!amendments.length)
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
    return (
      <EmptyState
        icon={<AlertCircle className="h-8 w-8" />}
        title="No amendment requests yet"
<<<<<<< HEAD
        description="Your submitted T24 amendment requests will appear here."
      />
    );
  }

  return (
    <div className="space-y-3">
      {amendments.map((amendment) => (
        <div key={amendment.id} className="glass-card rounded-xl p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                {amendment.field}
              </p>
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                {amendment.reason}
              </p>
            </div>
            <StatusBadge status={amendment.status} />
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground">
            {new Date(Number(amendment.createdAt)).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
=======
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
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
        </div>
      ))}
    </div>
  );
}

<<<<<<< HEAD
export default function SupportPage() {
  const location = useLocation();
  const [incRefresh, setIncRefresh] = useState(0);
  const [amRefresh, setAmRefresh] = useState(0);
  const defaultTab = location.pathname.includes("/amendment")
    ? "amendment"
    : "incident";
=======
// ── Page ───────────────────────────────────────────────────────────────────────

export default function SupportPage() {
  const [incRefresh, setIncRefresh] = useState(0);
  const [amRefresh, setAmRefresh] = useState(0);
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto space-y-6" data-ocid="support.page">
<<<<<<< HEAD
=======
        {/* Header */}
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
            <Headphones className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold text-foreground">
              IT Support
            </h1>
            <p className="text-sm text-muted-foreground">
<<<<<<< HEAD
              Report incidents or request T24 profile amendments
=======
              Report incidents or request profile amendments
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
            </p>
          </div>
        </div>

<<<<<<< HEAD
        <Tabs
          key={defaultTab}
          defaultValue={defaultTab}
          data-ocid="support.tabs"
        >
          <TabsList className="glass-card w-full justify-start">
            <TabsTrigger value="incident" data-ocid="support.incident.tab">
              <TriangleAlert className="mr-2 h-4 w-4" />
              Report Incident
            </TabsTrigger>
            <TabsTrigger value="amendment" data-ocid="support.amendment.tab">
              <UserCog className="mr-2 h-4 w-4" />
              T24 Amendment
            </TabsTrigger>
          </TabsList>

=======
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
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
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

<<<<<<< HEAD
          <TabsContent value="amendment" className="space-y-6 mt-4">
            <div className="glass-card-elevated rounded-2xl p-6">
              <h2 className="text-base font-semibold text-foreground mb-4">
                Request a T24 Amendment
=======
          {/* ── Amendment Tab ── */}
          <TabsContent value="amendment" className="space-y-6 mt-4">
            <div className="glass-card-elevated rounded-2xl p-6">
              <h2 className="text-base font-semibold text-foreground mb-4">
                Request a Profile Amendment
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
              </h2>
              <AmendmentForm onSubmitted={() => setAmRefresh((n) => n + 1)} />
            </div>

            <Separator className="opacity-30" />

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">
<<<<<<< HEAD
                My Recent T24 Requests
=======
                My Recent Requests
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
              </h3>
              <RecentAmendments refreshKey={amRefresh} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
