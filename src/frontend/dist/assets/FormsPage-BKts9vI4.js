import { u as useAuth, r as reactExports, j as jsxRuntimeExports, S as SkeletonCard } from "./index-CQG1vcXg.js";
import { A as AppShell, F as FileText } from "./AppShell-Bc4WOYvs.js";
import { C as ConfirmDialog } from "./ConfirmDialog-CkvSq1ph.js";
import { E as EmptyState } from "./EmptyState-HcQkGyve.js";
import { B as Badge } from "./badge-CGkWTRBc.js";
import { e as createLucideIcon, m as apiGetForms, B as Button, n as apiUpdateForm, u as ue, o as apiCreateForm, p as apiDeleteForm } from "./backend-client-D43GVmUU.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-Dj3hWVMp.js";
import { I as Input } from "./input-DPUfhcLy.js";
import { L as Label } from "./label-Dv6GBfaU.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BO4KPWc9.js";
import { i as isOk } from "./index-DgNPai41.js";
import { P as Plus } from "./plus-CZQdrvYT.js";
import { S as Search } from "./search-DLrycAQr.js";
import { T as Trash2 } from "./trash-2-B1TgMGVw.js";
import { E as ExternalLink } from "./external-link-CtGDk5bB.js";
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
const __iconNode$1 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode$1);
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
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode);
const CATEGORIES = ["General", "HR", "IT", "Finance", "Operations"];
const CATEGORY_COLORS = {
  General: "bg-muted text-muted-foreground",
  HR: "bg-secondary/20 text-secondary",
  IT: "bg-accent/20 text-accent",
  Finance: "bg-primary/20 text-primary",
  Operations: "bg-chart-4/20 text-chart-4"
};
function resolveFormUrl(fileUrl) {
  if (fileUrl.startsWith("http://") || fileUrl.startsWith("https://")) {
    return fileUrl;
  }
  return `https://drive.google.com/file/d/${fileUrl}/view`;
}
function extractDriveFileId(input) {
  const slashMatch = input.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (slashMatch) return slashMatch[1];
  const idMatch = input.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch) return idMatch[1];
  return input;
}
function formatDate(ts) {
  return new Date(Number(ts)).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
function FormDialog({
  open,
  onOpenChange,
  initial,
  onSave,
  isSaving
}) {
  const [title, setTitle] = reactExports.useState((initial == null ? void 0 : initial.title) ?? "");
  const [category, setCategory] = reactExports.useState(
    (initial == null ? void 0 : initial.category) ?? "General"
  );
  const [fileUrl, setFileUrl] = reactExports.useState((initial == null ? void 0 : initial.fileUrl) ?? "");
  reactExports.useEffect(() => {
    setTitle((initial == null ? void 0 : initial.title) ?? "");
    setCategory((initial == null ? void 0 : initial.category) ?? "General");
    setFileUrl((initial == null ? void 0 : initial.fileUrl) ?? "");
  }, [initial]);
  const handleSubmit = async () => {
    if (!title.trim() || !fileUrl.trim()) {
      ue.error("Title and file URL are required");
      return;
    }
    const processedUrl = extractDriveFileId(fileUrl.trim());
    await onSave({
      title: title.trim(),
      description: "",
      fileUrl: processedUrl,
      category,
      visibleTo: ["GeneralStaff", "HRAdmin", "SuperAdmin"]
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "glass-card-elevated sm:max-w-md",
      "data-ocid": "forms.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: initial ? "Edit Form" : "Add New Form" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "form-title", children: "Form Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "form-title",
                value: title,
                onChange: (e) => setTitle(e.target.value),
                placeholder: "e.g. Staff Leave Application",
                "data-ocid": "forms.title.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "form-category", children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: category, onValueChange: setCategory, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  id: "form-category",
                  "data-ocid": "forms.category.select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: cat, children: cat }, cat)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "form-url", children: "File URL / Google Drive Link" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "form-url",
                value: fileUrl,
                onChange: (e) => setFileUrl(e.target.value),
                placeholder: "Paste Google Drive URL or direct link",
                "data-ocid": "forms.url.input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Paste a Google Drive sharing URL, a",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: "/d/FILE_ID/" }),
              " link, or any direct HTTPS link."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => onOpenChange(false),
              "data-ocid": "forms.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              onClick: handleSubmit,
              disabled: isSaving,
              "data-ocid": "forms.submit_button",
              children: isSaving ? "Saving…" : initial ? "Save Changes" : "Add Form"
            }
          )
        ] })
      ]
    }
  ) });
}
function FormCard({ form, canAdmin, onEdit, onDelete, index }) {
  const catColor = CATEGORY_COLORS[form.category] ?? CATEGORY_COLORS.General;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-card rounded-xl p-4 flex items-start gap-4 hover:shadow-glass transition-smooth group",
      "data-ocid": `forms.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground truncate leading-snug", children: form.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `text-[11px] flex-shrink-0 ${catColor}`, children: form.category })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-1.5 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Added ",
              formatDate(form.createdAt)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-smooth", children: [
          canAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "icon",
                className: "h-8 w-8",
                onClick: () => onEdit(form),
                "data-ocid": `forms.edit_button.${index}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-3.5 w-3.5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "icon",
                className: "h-8 w-8 text-destructive hover:text-destructive",
                onClick: () => onDelete(form),
                "data-ocid": `forms.delete_button.${index}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              size: "sm",
              className: "h-8 text-xs gap-1.5",
              onClick: () => window.open(resolveFormUrl(form.fileUrl), "_blank"),
              "data-ocid": `forms.open_button.${index}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" }),
                "Open"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function FormsPage() {
  const { user } = useAuth();
  const canAdmin = (user == null ? void 0 : user.role) === "SuperAdmin" || (user == null ? void 0 : user.role) === "HRAdmin";
  const [forms, setForms] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [search, setSearch] = reactExports.useState("");
  const [activeCategory, setActiveCategory] = reactExports.useState("All");
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [editingForm, setEditingForm] = reactExports.useState();
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const [deleteTarget, setDeleteTarget] = reactExports.useState();
  const [isDeleting, setIsDeleting] = reactExports.useState(false);
  reactExports.useEffect(() => {
    apiGetForms().then((data) => {
      setForms(data);
      setIsLoading(false);
    });
  }, []);
  const filtered = reactExports.useMemo(() => {
    return forms.filter((f) => {
      const matchSearch = !search || f.title.toLowerCase().includes(search.toLowerCase());
      const matchCat = activeCategory === "All" || f.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [forms, search, activeCategory]);
  const grouped = reactExports.useMemo(() => {
    const map = {};
    for (const f of filtered) {
      if (!map[f.category]) map[f.category] = [];
      map[f.category].push(f);
    }
    return map;
  }, [filtered]);
  const handleSave = async (req) => {
    setIsSaving(true);
    try {
      if (editingForm) {
        const res = await apiUpdateForm(editingForm.id, req);
        if (isOk(res)) {
          setForms(
            (prev) => prev.map((f) => f.id === editingForm.id ? res.ok : f)
          );
          ue.success("Form updated");
        } else {
          ue.error(res.err);
        }
      } else {
        const res = await apiCreateForm(req);
        if (isOk(res)) {
          setForms((prev) => [res.ok, ...prev]);
          ue.success("Form added");
        } else {
          ue.error(res.err);
        }
      }
      setDialogOpen(false);
      setEditingForm(void 0);
    } finally {
      setIsSaving(false);
    }
  };
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    const res = await apiDeleteForm(deleteTarget.id);
    if (isOk(res)) {
      setForms((prev) => prev.filter((f) => f.id !== deleteTarget.id));
      ue.success("Form removed");
    } else {
      ue.error(res.err);
    }
    setIsDeleting(false);
    setDeleteTarget(void 0);
  };
  const categoryTabs = ["All", ...CATEGORIES];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto space-y-6", "data-ocid": "forms.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Forms Centre" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Access and download official bank forms" })
        ] }),
        canAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "sm",
            className: "gap-2",
            onClick: () => {
              setEditingForm(void 0);
              setDialogOpen(true);
            },
            "data-ocid": "forms.add_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
              "Add Form"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            className: "pl-9",
            placeholder: "Search forms…",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            "data-ocid": "forms.search_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", "data-ocid": "forms.category.tab", children: categoryTabs.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setActiveCategory(cat),
          className: `px-3 py-1.5 rounded-full text-xs font-medium transition-smooth ${activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-muted/60 text-muted-foreground hover:bg-muted"}`,
          "data-ocid": `forms.filter.${cat.toLowerCase()}`,
          children: cat
        },
        cat
      )) }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "forms.loading_state", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, { lines: 2 }, i)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-7 w-7" }),
          title: "No forms found",
          description: search ? `No forms match "${search}"` : "No forms available in this category yet.",
          actionLabel: canAdmin ? "Add Form" : void 0,
          onAction: canAdmin ? () => {
            setEditingForm(void 0);
            setDialogOpen(true);
          } : void 0,
          "data-ocid": "forms.empty_state"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: Object.entries(grouped).map(([category, catForms]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: category }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: catForms.map((form, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          FormCard,
          {
            form,
            canAdmin,
            onEdit: (f) => {
              setEditingForm(f);
              setDialogOpen(true);
            },
            onDelete: setDeleteTarget,
            index: i + 1
          },
          form.id
        )) })
      ] }, category)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FormDialog,
      {
        open: dialogOpen,
        onOpenChange: (open) => {
          setDialogOpen(open);
          if (!open) setEditingForm(void 0);
        },
        initial: editingForm,
        onSave: handleSave,
        isSaving
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDialog,
      {
        open: !!deleteTarget,
        onOpenChange: (open) => !open && setDeleteTarget(void 0),
        title: "Delete Form?",
        description: `Remove "${deleteTarget == null ? void 0 : deleteTarget.title}" from the forms centre? This cannot be undone.`,
        confirmLabel: isDeleting ? "Deleting…" : "Delete",
        variant: "destructive",
        onConfirm: handleDelete
      }
    )
  ] });
}
export {
  FormsPage as default
};
