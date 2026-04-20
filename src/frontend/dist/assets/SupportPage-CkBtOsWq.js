import { r as reactExports, j as jsxRuntimeExports, u as useAuth, S as SkeletonCard } from "./index-CQG1vcXg.js";
import { A as AppShell, H as Headphones, S as Separator } from "./AppShell-Bc4WOYvs.js";
import { E as EmptyState } from "./EmptyState-HcQkGyve.js";
import { B as Badge } from "./badge-CGkWTRBc.js";
import { e as createLucideIcon, B as Button, R as apiGetMyIncidents, S as apiGetMyAmendments, u as ue, U as apiSubmitIncidentReport, V as apiSubmitProfileAmendment } from "./backend-client-D43GVmUU.js";
import { L as Label } from "./label-Dv6GBfaU.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-DwEVqHqo.js";
import { T as Textarea } from "./textarea-jc3bt3IQ.js";
import { B as BRANCHES, D as DEPARTMENTS } from "./index-DgNPai41.js";
import { C as CircleAlert } from "./circle-alert-BoxjduFh.js";
import "./Combination-BpDQgzvQ.js";
import "./index-pajndnDv.js";
import "./index-CqbiV51T.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$1);
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
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
function StatusBadge({ status }) {
  const map = {
    open: {
      label: "Open",
      className: "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border-yellow-500/30"
    },
    in_progress: {
      label: "In Progress",
      className: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30"
    },
    resolved: {
      label: "Resolved",
      className: "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/30"
    },
    closed: { label: "Closed", className: "bg-muted text-muted-foreground" },
    pending: {
      label: "Pending",
      className: "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border-yellow-500/30"
    },
    approved: {
      label: "Approved",
      className: "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/30"
    },
    rejected: {
      label: "Rejected",
      className: "bg-destructive/15 text-destructive border-destructive/30"
    }
  };
  const cfg = map[status] ?? { label: status, className: "" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: cfg.className, children: cfg.label });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: label }),
    children
  ] });
}
function SelectInput({
  id,
  value,
  onChange,
  options,
  placeholder,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "select",
    {
      id,
      value,
      onChange: (e) => onChange(e.target.value),
      className: "w-full h-9 rounded-md border border-input bg-card px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors",
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: placeholder }),
        options.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: opt, children: opt }, opt))
      ]
    }
  );
}
function TextInput({
  id,
  value,
  onChange,
  placeholder,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      id,
      type: "text",
      value,
      onChange: (e) => onChange(e.target.value),
      placeholder,
      className: "w-full h-9 rounded-md border border-input bg-card px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors",
      "data-ocid": ocid
    }
  );
}
const ISSUE_CATEGORIES = [
  "Hardware",
  "Software",
  "Network",
  "T24 Core Banking",
  "Email/Password",
  "Other"
];
function IncidentForm({ onSubmitted }) {
  const { user } = useAuth();
  const [form, setForm] = reactExports.useState({
    agency: (user == null ? void 0 : user.branch) ?? "",
    issueCategory: "",
    description: "",
    reporterName: (user == null ? void 0 : user.fullname) ?? "",
    contact: (user == null ? void 0 : user.phone) ?? ""
  });
  const [submitting, setSubmitting] = reactExports.useState(false);
  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));
  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.agency || !form.issueCategory || !form.description.trim()) {
      ue.error("Please fill in all required fields.");
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
          contact: form.contact
        },
        (user == null ? void 0 : user.id) ?? ""
      );
      if ("err" in res) {
        ue.error(res.err);
      } else {
        ue.success("Incident report submitted successfully.");
        setForm({
          agency: (user == null ? void 0 : user.branch) ?? "",
          issueCategory: "",
          description: "",
          reporterName: (user == null ? void 0 : user.fullname) ?? "",
          contact: (user == null ? void 0 : user.phone) ?? ""
        });
        onSubmitted();
      }
    } finally {
      setSubmitting(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "space-y-4",
      "data-ocid": "incident.form",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Branch / Agency *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectInput,
            {
              id: "inc-agency",
              value: form.agency,
              onChange: set("agency"),
              options: BRANCHES,
              placeholder: "Select branch",
              ocid: "incident.agency.select"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Issue Category *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectInput,
            {
              id: "inc-category",
              value: form.issueCategory,
              onChange: set("issueCategory"),
              options: ISSUE_CATEGORIES,
              placeholder: "Select category",
              ocid: "incident.category.select"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Reporter Name", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            TextInput,
            {
              id: "inc-reporter",
              value: form.reporterName,
              onChange: set("reporterName"),
              ocid: "incident.reporter.input"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Contact Number", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            TextInput,
            {
              id: "inc-contact",
              value: form.contact,
              onChange: set("contact"),
              placeholder: "e.g. 0244123456",
              ocid: "incident.contact.input"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Description *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "inc-desc",
            value: form.description,
            onChange: (e) => set("description")(e.target.value),
            placeholder: "Describe the issue in detail...",
            rows: 4,
            className: "resize-none",
            "data-ocid": "incident.description.textarea"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "submit",
            disabled: submitting,
            className: "gap-2",
            "data-ocid": "incident.submit_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }),
              submitting ? "Submitting…" : "Submit Report"
            ]
          }
        )
      ]
    }
  );
}
const REQUEST_TYPES = [
  "Role Change",
  "Department Change",
  "Transfer",
  "T24 Amendment",
  "Other"
];
function AmendmentForm({ onSubmitted }) {
  var _a;
  const { user } = useAuth();
  const [form, setForm] = reactExports.useState({
    fullname: (user == null ? void 0 : user.fullname) ?? "",
    phone: (user == null ? void 0 : user.phone) ?? "",
    t24Username: ((_a = user == null ? void 0 : user.email) == null ? void 0 : _a.split("@")[0]) ?? "",
    agency: (user == null ? void 0 : user.branch) ?? "",
    requestType: "",
    newRole: "",
    deptChange: "",
    transferLocation: "",
    additionalDetails: ""
  });
  const [submitting, setSubmitting] = reactExports.useState(false);
  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));
  async function handleSubmit(e) {
    var _a2;
    e.preventDefault();
    if (!form.requestType || !form.agency) {
      ue.error("Please fill in all required fields.");
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
          newRole: form.newRole || void 0,
          deptChange: form.deptChange || void 0,
          transferLocation: form.transferLocation || void 0,
          additionalDetails: form.additionalDetails || void 0
        },
        (user == null ? void 0 : user.id) ?? "",
        (user == null ? void 0 : user.fullname) ?? ""
      );
      if ("err" in res) {
        ue.error(res.err);
      } else {
        ue.success("Profile amendment request submitted.");
        setForm({
          fullname: (user == null ? void 0 : user.fullname) ?? "",
          phone: (user == null ? void 0 : user.phone) ?? "",
          t24Username: ((_a2 = user == null ? void 0 : user.email) == null ? void 0 : _a2.split("@")[0]) ?? "",
          agency: (user == null ? void 0 : user.branch) ?? "",
          requestType: "",
          newRole: "",
          deptChange: "",
          transferLocation: "",
          additionalDetails: ""
        });
        onSubmitted();
      }
    } finally {
      setSubmitting(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "space-y-4",
      "data-ocid": "amendment.form",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Full Name", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            TextInput,
            {
              id: "am-fullname",
              value: form.fullname,
              onChange: set("fullname"),
              ocid: "amendment.fullname.input"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Phone Number", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            TextInput,
            {
              id: "am-phone",
              value: form.phone,
              onChange: set("phone"),
              ocid: "amendment.phone.input"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "T24 Username", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            TextInput,
            {
              id: "am-t24",
              value: form.t24Username,
              onChange: set("t24Username"),
              ocid: "amendment.t24username.input"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Branch / Agency *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectInput,
            {
              id: "am-agency",
              value: form.agency,
              onChange: set("agency"),
              options: BRANCHES,
              placeholder: "Select branch",
              ocid: "amendment.agency.select"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Request Type *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectInput,
            {
              id: "am-reqtype",
              value: form.requestType,
              onChange: set("requestType"),
              options: REQUEST_TYPES,
              placeholder: "Select request type",
              ocid: "amendment.request_type.select"
            }
          ) }),
          form.requestType === "Role Change" && /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "New Role", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            TextInput,
            {
              id: "am-newrole",
              value: form.newRole,
              onChange: set("newRole"),
              placeholder: "e.g. Senior Teller",
              ocid: "amendment.new_role.input"
            }
          ) }),
          form.requestType === "Department Change" && /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "New Department", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectInput,
            {
              id: "am-dept",
              value: form.deptChange,
              onChange: set("deptChange"),
              options: DEPARTMENTS,
              placeholder: "Select department",
              ocid: "amendment.dept_change.select"
            }
          ) }),
          form.requestType === "Transfer" && /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Transfer Location", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectInput,
            {
              id: "am-transfer",
              value: form.transferLocation,
              onChange: set("transferLocation"),
              options: BRANCHES,
              placeholder: "Select branch",
              ocid: "amendment.transfer_location.select"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Additional Details", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "am-details",
            value: form.additionalDetails,
            onChange: (e) => set("additionalDetails")(e.target.value),
            placeholder: "Any additional context or justification...",
            rows: 3,
            className: "resize-none",
            "data-ocid": "amendment.details.textarea"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "submit",
            disabled: submitting,
            className: "gap-2",
            "data-ocid": "amendment.submit_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }),
              submitting ? "Submitting…" : "Submit Request"
            ]
          }
        )
      ]
    }
  );
}
function RecentIncidents({ refreshKey }) {
  const { user } = useAuth();
  const [loading, setLoading] = reactExports.useState(true);
  const [incidents, setIncidents] = reactExports.useState([]);
  reactExports.useEffect(() => {
    if (!user) return;
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
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, { lines: 3 });
  if (!incidents.length)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-8 w-8" }),
        title: "No incident reports yet",
        description: "Your submitted incident reports will appear here.",
        "data-ocid": "incident.recent.empty_state"
      }
    );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "incident.recent.list", children: incidents.map((inc, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-card rounded-xl p-4 flex items-start gap-3",
      "data-ocid": `incident.recent.item.${idx + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5", children: inc.status === "resolved" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4 text-green-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-yellow-500" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground truncate", children: inc.subject }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: inc.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-2", children: inc.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-1", children: new Date(Number(inc.createdAt)).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
          }) })
        ] })
      ]
    },
    inc.id
  )) });
}
function RecentAmendments({ refreshKey }) {
  const { user } = useAuth();
  const [loading, setLoading] = reactExports.useState(true);
  const [amendments, setAmendments] = reactExports.useState([]);
  reactExports.useEffect(() => {
    if (!user) return;
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
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, { lines: 3 });
  if (!amendments.length)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-8 w-8" }),
        title: "No amendment requests yet",
        description: "Your submitted profile amendment requests will appear here.",
        "data-ocid": "amendment.recent.empty_state"
      }
    );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "amendment.recent.list", children: amendments.map((am, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-card rounded-xl p-4 flex items-start gap-3",
      "data-ocid": `amendment.recent.item.${idx + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5", children: am.status === "approved" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4 text-green-500" }) : am.status === "rejected" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4 text-destructive" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-yellow-500" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground truncate", children: am.field }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: am.status })
          ] }),
          am.requestedValue && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5 truncate", children: [
            "Requested: ",
            am.requestedValue
          ] }),
          am.reviewNote && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
            "Note: ",
            am.reviewNote
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-1", children: new Date(Number(am.createdAt)).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
          }) })
        ] })
      ]
    },
    am.id
  )) });
}
function SupportPage() {
  const [incRefresh, setIncRefresh] = reactExports.useState(0);
  const [amRefresh, setAmRefresh] = reactExports.useState(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto space-y-6", "data-ocid": "support.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Headphones, { className: "h-5 w-5 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground", children: "IT Support" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Report incidents or request profile amendments" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "incident", "data-ocid": "support.tabs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "glass-card w-full justify-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "incident", "data-ocid": "support.incident.tab", children: "Report Incident" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "amendment", "data-ocid": "support.amendment.tab", children: "Profile Amendment" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "incident", className: "space-y-6 mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card-elevated rounded-2xl p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground mb-4", children: "Submit an Incident Report" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(IncidentForm, { onSubmitted: () => setIncRefresh((n) => n + 1) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "opacity-30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground mb-3", children: "My Recent Reports" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(RecentIncidents, { refreshKey: incRefresh })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "amendment", className: "space-y-6 mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card-elevated rounded-2xl p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground mb-4", children: "Request a Profile Amendment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AmendmentForm, { onSubmitted: () => setAmRefresh((n) => n + 1) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "opacity-30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground mb-3", children: "My Recent Requests" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(RecentAmendments, { refreshKey: amRefresh })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  SupportPage as default
};
