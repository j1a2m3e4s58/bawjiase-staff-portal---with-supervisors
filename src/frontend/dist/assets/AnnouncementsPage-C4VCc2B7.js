import { r as reactExports, j as jsxRuntimeExports, L as Link, S as SkeletonCard } from "./index-CQG1vcXg.js";
import { A as AppShell, M as Megaphone, X } from "./AppShell-Bc4WOYvs.js";
import { E as EmptyState } from "./EmptyState-HcQkGyve.js";
import { u as useHasRole, R as RoleGuard } from "./RoleGuard-_co_iNxv.js";
import { B as Badge } from "./badge-CGkWTRBc.js";
import { j as apiGetAnnouncements, B as Button, u as ue, k as apiLogAction } from "./backend-client-D43GVmUU.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-Dj3hWVMp.js";
import { I as Input } from "./input-DPUfhcLy.js";
import { L as Label } from "./label-Dv6GBfaU.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BO4KPWc9.js";
import { T as Textarea } from "./textarea-jc3bt3IQ.js";
import { T as Trash2 } from "./trash-2-B1TgMGVw.js";
import { S as Search } from "./search-DLrycAQr.js";
import { P as Plus } from "./plus-CZQdrvYT.js";
import { P as Pencil } from "./pencil-D-Y1ZZti.js";
import "./Combination-BpDQgzvQ.js";
import "./index-pajndnDv.js";
import "./index-CqbiV51T.js";
import "./index-D8z7wFiT.js";
import "./index-BICF_Lkm.js";
function getCategoryFromAuthorDept(authorId) {
  if (authorId.includes("user-2")) return "HR";
  if (authorId.includes("user-3")) return "IT";
  return "General";
}
const CATEGORY_COLORS = {
  HR: "bg-secondary/20 text-secondary border-secondary/30",
  IT: "bg-accent/20 text-accent-foreground border-accent/30",
  General: "bg-primary/15 text-primary border-primary/30"
};
function getDateLabel(ts) {
  const d = new Date(Number(ts));
  const now = /* @__PURE__ */ new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 864e5);
  const itemDay = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  if (itemDay.getTime() === today.getTime()) return "Today";
  if (itemDay.getTime() === yesterday.getTime()) return "Yesterday";
  return d.toLocaleDateString("en-GH", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}
function groupByDate(items) {
  const groups = {};
  for (const item of items) {
    const label = getDateLabel(item.createdAt);
    if (!groups[label]) groups[label] = [];
    groups[label].push(item);
  }
  return groups;
}
function PollWidget({
  poll,
  announcementId
}) {
  const [voted, setVoted] = reactExports.useState(poll.userVotedOptionId);
  const [options, setOptions] = reactExports.useState(poll.options);
  const [total, setTotal] = reactExports.useState(poll.totalVotes);
  function handleVote(optionId) {
    if (voted !== null || !poll.isActive) return;
    setVoted(optionId);
    setTotal((t) => t + 1);
    setOptions(
      (opts) => opts.map((o) => o.id === optionId ? { ...o, votes: o.votes + 1 } : o)
    );
    ue.success("Vote recorded!");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "mt-4 pt-4 border-t border-border/30 space-y-2",
      "data-ocid": `announcements.poll.${announcementId}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground/80", children: poll.question }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: options.map((opt) => {
          const pct = total > 0 ? Math.round(opt.votes / total * 100) : 0;
          const isVoted = voted === opt.id;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => handleVote(opt.id),
              disabled: voted !== null || !poll.isActive,
              className: `w-full text-left rounded-lg overflow-hidden border transition-smooth ${isVoted ? "border-primary/50 bg-primary/10" : "border-border/40 hover:border-primary/30 hover:bg-muted/40"} disabled:cursor-default`,
              "data-ocid": `announcements.poll.option.${opt.id}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative px-4 py-2", children: [
                voted !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute inset-y-0 left-0 bg-primary/10 rounded-lg transition-all",
                    style: { width: `${pct}%` }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground/90", children: opt.text }),
                  voted !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-primary", children: [
                    pct,
                    "%"
                  ] })
                ] })
              ] })
            },
            String(opt.id)
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          total,
          " ",
          total === 1 ? "vote" : "votes",
          " ·",
          " ",
          poll.isActive ? "Poll open" : "Poll closed"
        ] })
      ]
    }
  );
}
function AnnouncementCard({
  ann,
  onDismiss,
  onEdit,
  onTrash,
  isAdmin
}) {
  const category = getCategoryFromAuthorDept(ann.authorId);
  const colorClass = CATEGORY_COLORS[category] ?? CATEGORY_COLORS.General;
  const date = new Date(Number(ann.createdAt)).toLocaleDateString("en-GH", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-card rounded-xl p-5 group relative",
      "data-ocid": `announcements.item.${ann.id}`,
      children: [
        ann.imageUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-48 rounded-lg overflow-hidden mb-4 bg-muted/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: ann.imageUrl,
            alt: ann.title,
            className: "w-full h-full object-cover"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: `text-[10px] px-2 py-0.5 border ${colorClass}`,
              children: category
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-auto pt-0.5 whitespace-nowrap", children: date })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base text-foreground leading-snug mb-2", children: ann.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: ann.content }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/70 mt-3", children: [
          "By ",
          ann.authorName
        ] }),
        ann.poll && /* @__PURE__ */ jsxRuntimeExports.jsx(PollWidget, { poll: ann.poll, announcementId: ann.id }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-4 pt-3 border-t border-border/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => onDismiss(ann.id),
              className: "text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-smooth px-2 py-1 rounded hover:bg-muted/60",
              "data-ocid": `announcements.dismiss.${ann.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }),
                "Dismiss"
              ]
            }
          ),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => onEdit(ann),
                className: "text-xs text-primary hover:text-primary/80 flex items-center gap-1.5 transition-smooth px-2 py-1 rounded hover:bg-primary/10",
                "data-ocid": `announcements.edit.${ann.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }),
                  "Edit"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => onTrash(ann.id),
                className: "text-xs text-destructive hover:text-destructive/80 flex items-center gap-1.5 transition-smooth px-2 py-1 rounded hover:bg-destructive/10",
                "data-ocid": `announcements.trash.${ann.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
                  "Move to Trash"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function AnnouncementModal({
  open,
  onClose,
  onSave,
  editing
}) {
  var _a, _b;
  const [form, setForm] = reactExports.useState({
    title: (editing == null ? void 0 : editing.title) ?? "",
    content: (editing == null ? void 0 : editing.content) ?? "",
    category: editing ? getCategoryFromAuthorDept(editing.authorId) : "General",
    pollQuestion: ((_a = editing == null ? void 0 : editing.poll) == null ? void 0 : _a.question) ?? "",
    pollOptions: ((_b = editing == null ? void 0 : editing.poll) == null ? void 0 : _b.options.map((o) => o.text)) ?? ["", ""]
  });
  const [submitting, setSubmitting] = reactExports.useState(false);
  reactExports.useEffect(() => {
    var _a2, _b2;
    setForm({
      title: (editing == null ? void 0 : editing.title) ?? "",
      content: (editing == null ? void 0 : editing.content) ?? "",
      category: editing ? getCategoryFromAuthorDept(editing.authorId) : "General",
      pollQuestion: ((_a2 = editing == null ? void 0 : editing.poll) == null ? void 0 : _a2.question) ?? "",
      pollOptions: ((_b2 = editing == null ? void 0 : editing.poll) == null ? void 0 : _b2.options.map((o) => o.text)) ?? ["", ""]
    });
  }, [editing]);
  function addPollOption() {
    setForm((f) => ({ ...f, pollOptions: [...f.pollOptions, ""] }));
  }
  function updatePollOption(idx, val) {
    setForm((f) => {
      const newOpts = [...f.pollOptions];
      newOpts[idx] = val;
      return { ...f, pollOptions: newOpts };
    });
  }
  function removePollOption(idx) {
    setForm((f) => ({
      ...f,
      pollOptions: f.pollOptions.filter((_, i) => i !== idx)
    }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      ue.error("Title and content are required");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 400));
    onSave(form);
    setSubmitting(false);
    onClose();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-2xl max-h-[90vh] overflow-y-auto",
      "data-ocid": "announcements.create_dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: editing ? "Edit Announcement" : "Create Announcement" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ann-title", children: "Title *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "ann-title",
                placeholder: "Announcement title",
                value: form.title,
                onChange: (e) => setForm((f) => ({ ...f, title: e.target.value })),
                "data-ocid": "announcements.title.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ann-body", children: "Content *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "ann-body",
                placeholder: "Write the full announcement body...",
                rows: 5,
                value: form.content,
                onChange: (e) => setForm((f) => ({ ...f, content: e.target.value })),
                "data-ocid": "announcements.content.textarea"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: form.category,
                  onValueChange: (v) => setForm((f) => ({ ...f, category: v })),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "announcements.category.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "General", children: "General" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "HR", children: "HR" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "IT", children: "IT" })
                    ] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ann-image", children: "Image URL (optional)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "ann-image",
                  placeholder: "https://...",
                  disabled: true,
                  className: "opacity-50"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-3 border-t border-border/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-semibold", children: "Poll (optional)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Poll question",
                value: form.pollQuestion,
                onChange: (e) => setForm((f) => ({ ...f, pollQuestion: e.target.value })),
                "data-ocid": "announcements.poll_question.input"
              }
            ),
            form.pollQuestion && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              form.pollOptions.map((opt, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: `Option ${idx + 1}`,
                    value: opt,
                    onChange: (e) => updatePollOption(idx, e.target.value),
                    "data-ocid": `announcements.poll_option.input.${idx + 1}`
                  }
                ),
                form.pollOptions.length > 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "icon",
                    onClick: () => removePollOption(idx),
                    "data-ocid": `announcements.remove_poll_option.${idx + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                  }
                )
              ] }, String(idx))),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "sm",
                  onClick: addPollOption,
                  "data-ocid": "announcements.add_poll_option.button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1" }),
                    "Add Option"
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-end pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: onClose,
                "data-ocid": "announcements.cancel.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: submitting,
                "data-ocid": "announcements.submit.submit_button",
                children: submitting ? "Saving…" : editing ? "Save Changes" : "Publish"
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
function AnnouncementsPage() {
  const [announcements, setAnnouncements] = reactExports.useState(
    []
  );
  const [loading, setLoading] = reactExports.useState(true);
  const [dismissed, setDismissed] = reactExports.useState(/* @__PURE__ */ new Set());
  const [search, setSearch] = reactExports.useState("");
  const [filterCategory, setFilterCategory] = reactExports.useState("all");
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const isAdmin = useHasRole(["SuperAdmin", "HRAdmin"]);
  reactExports.useEffect(() => {
    apiGetAnnouncements().then((data) => {
      setAnnouncements(data);
      setLoading(false);
    });
  }, []);
  function handleDismiss(id) {
    setDismissed((d) => /* @__PURE__ */ new Set([...d, id]));
  }
  function handleTrash(id) {
    setAnnouncements(
      (prev) => prev.map((a) => a.id === id ? { ...a, isTrashed: true } : a)
    );
    ue.success("Moved to trash");
    apiLogAction("Admin", "TRASH_ANNOUNCEMENT", `ID:${id}`, "—");
  }
  function handleEdit(ann) {
    setEditing(ann);
    setModalOpen(true);
  }
  function handleCreate() {
    setEditing(null);
    setModalOpen(true);
  }
  function handleSave(data) {
    if (editing) {
      setAnnouncements(
        (prev) => prev.map(
          (a) => a.id === editing.id ? { ...a, title: data.title, content: data.content } : a
        )
      );
      ue.success("Announcement updated");
    } else {
      const newAnn = {
        id: Date.now(),
        title: data.title,
        content: data.content,
        imageUrl: null,
        fileUrl: null,
        authorId: "mock-user-1",
        authorName: "You",
        createdAt: BigInt(Date.now()),
        updatedAt: BigInt(Date.now()),
        isDismissed: false,
        isTrashed: false,
        poll: data.pollQuestion ? {
          id: Date.now(),
          question: data.pollQuestion,
          options: data.pollOptions.filter(Boolean).map((text, i) => ({ id: i + 1, text, votes: 0 })),
          totalVotes: 0,
          userVotedOptionId: null,
          endDate: null,
          isActive: true
        } : null
      };
      setAnnouncements((prev) => [newAnn, ...prev]);
      ue.success("Announcement published");
    }
  }
  const filtered = announcements.filter((a) => {
    if (a.isTrashed || dismissed.has(a.id)) return false;
    const cat = getCategoryFromAuthorDept(a.authorId);
    if (filterCategory !== "all" && cat !== filterCategory) return false;
    if (search && !a.title.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });
  const grouped = groupByDate(filtered);
  const dateGroups = Object.keys(grouped);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-5xl mx-auto space-y-6",
      "data-ocid": "announcements.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Announcements" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Bank-wide news, policies and updates" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RoleGuard, { roles: ["SuperAdmin", "HRAdmin"], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              variant: "outline",
              size: "sm",
              "data-ocid": "announcements.recycle_bin.link",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/announcements/trash", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 mr-2" }),
                "Recycle Bin"
              ] })
            }
          ) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-3 flex-wrap",
            "data-ocid": "announcements.filter.section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[200px]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "Search announcements…",
                    value: search,
                    onChange: (e) => setSearch(e.target.value),
                    className: "pl-9",
                    "data-ocid": "announcements.search.search_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filterCategory, onValueChange: setFilterCategory, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "w-36",
                    "data-ocid": "announcements.category_filter.select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Category" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Categories" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "General", children: "General" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "HR", children: "HR" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "IT", children: "IT" })
                ] })
              ] })
            ]
          }
        ),
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, { lines: 4, hasImage: true }, String(i))) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { className: "h-10 w-10" }),
            title: "No announcements",
            description: search || filterCategory !== "all" ? "Try adjusting your search or filter." : "No announcements have been posted yet.",
            "data-ocid": "announcements.empty_state"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", children: dateGroups.map((group) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: group }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border/40" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: grouped[group].map((ann) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            AnnouncementCard,
            {
              ann,
              onDismiss: handleDismiss,
              onEdit: handleEdit,
              onTrash: handleTrash,
              isAdmin
            },
            String(ann.id)
          )) })
        ] }, group)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(RoleGuard, { roles: ["SuperAdmin", "HRAdmin"], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleCreate,
            className: "fixed bottom-24 md:bottom-6 right-6 w-14 h-14 rounded-full glass-card-elevated bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-smooth z-30",
            "aria-label": "Create announcement",
            "data-ocid": "announcements.create.open_modal_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-6 w-6" })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AnnouncementModal,
          {
            open: modalOpen,
            onClose: () => {
              setModalOpen(false);
              setEditing(null);
            },
            onSave: handleSave,
            editing
          }
        )
      ]
    }
  ) });
}
export {
  AnnouncementsPage as default
};
