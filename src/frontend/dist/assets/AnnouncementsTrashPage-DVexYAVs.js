import { a as useNavigate, r as reactExports, j as jsxRuntimeExports, S as SkeletonCard } from "./index-CQG1vcXg.js";
import { A as AppShell } from "./AppShell-Bc4WOYvs.js";
import { E as EmptyState } from "./EmptyState-HcQkGyve.js";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-eGI2SttW.js";
import { B as Badge } from "./badge-CGkWTRBc.js";
import { l as apiGetTrashedAnnouncements, B as Button, u as ue, k as apiLogAction } from "./backend-client-D43GVmUU.js";
import { T as Trash2 } from "./trash-2-B1TgMGVw.js";
import { A as ArchiveRestore } from "./archive-restore-B2tTIcWM.js";
import "./Combination-BpDQgzvQ.js";
import "./index-pajndnDv.js";
import "./index-CqbiV51T.js";
import "./index-D8z7wFiT.js";
function getCategoryFromAuthorId(authorId) {
  if (authorId.includes("user-2")) return "HR";
  if (authorId.includes("user-3")) return "IT";
  return "General";
}
const CATEGORY_COLORS = {
  HR: "bg-secondary/20 text-secondary border-secondary/30",
  IT: "bg-accent/20 text-accent-foreground border-accent/30",
  General: "bg-primary/15 text-primary border-primary/30"
};
function TrashedCard({
  ann,
  onRestore,
  onDelete
}) {
  const category = getCategoryFromAuthorId(ann.authorId);
  const colorClass = CATEGORY_COLORS[category] ?? CATEGORY_COLORS.General;
  const date = new Date(Number(ann.createdAt)).toLocaleDateString("en-GH", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-card rounded-xl p-5 flex items-start gap-4 opacity-80",
      "data-ocid": `trash.item.${ann.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: `text-[10px] px-2 py-0.5 border ${colorClass}`,
                children: category
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: date })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground line-clamp-1 mb-1", children: ann.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 leading-relaxed", children: ann.content }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground/60 mt-2", children: [
            "By ",
            ann.authorName
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: () => onRestore(ann.id),
              className: "text-secondary border-secondary/30 hover:bg-secondary/10 hover:text-secondary",
              "data-ocid": `trash.restore.${ann.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArchiveRestore, { className: "h-3.5 w-3.5 mr-1.5" }),
                "Restore"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                className: "text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive",
                "data-ocid": `trash.delete.${ann.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5 mr-1.5" }),
                  "Delete"
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": `trash.delete_dialog.${ann.id}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Permanently delete?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                  "This will permanently delete “",
                  ann.title,
                  "”. This action cannot be undone."
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": `trash.delete_cancel.${ann.id}`, children: "Cancel" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AlertDialogAction,
                  {
                    onClick: () => onDelete(ann.id),
                    className: "bg-destructive hover:bg-destructive/90 text-destructive-foreground",
                    "data-ocid": `trash.delete_confirm.${ann.id}`,
                    children: "Delete permanently"
                  }
                )
              ] })
            ] })
          ] })
        ] })
      ]
    }
  );
}
function AnnouncementsTrashPage() {
  const navigate = useNavigate();
  const [trashed, setTrashed] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [emptyTrashOpen, setEmptyTrashOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    apiGetTrashedAnnouncements().then((data) => {
      setTrashed(data);
      setLoading(false);
    });
  }, []);
  function handleRestore(id) {
    setTrashed((prev) => prev.filter((a) => a.id !== id));
    ue.success("Announcement restored");
    apiLogAction("Admin", "RESTORE_ANNOUNCEMENT", `ID:${id}`, "—");
  }
  function handleDelete(id) {
    setTrashed((prev) => prev.filter((a) => a.id !== id));
    ue.success("Announcement permanently deleted");
    apiLogAction("Admin", "DELETE_ANNOUNCEMENT", `ID:${id}`, "—");
  }
  function handleEmptyTrash() {
    setTrashed([]);
    setEmptyTrashOpen(false);
    ue.success("Trash emptied");
    apiLogAction("Admin", "EMPTY_TRASH", "All announcements", "—");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto space-y-6", "data-ocid": "trash.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-2xl text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-6 w-6 text-destructive/70" }),
          "Recycle Bin"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Trashed announcements — restore or delete permanently" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: () => navigate({ to: "/announcements" }),
            "data-ocid": "trash.back.link",
            children: "← Back to Announcements"
          }
        ),
        trashed.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          AlertDialog,
          {
            open: emptyTrashOpen,
            onOpenChange: setEmptyTrashOpen,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "destructive",
                  size: "sm",
                  "data-ocid": "trash.empty_trash.delete_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 mr-2" }),
                    "Empty Trash"
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "trash.empty_trash_dialog.dialog", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Empty the trash?" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                    "All ",
                    trashed.length,
                    " trashed announcement",
                    trashed.length !== 1 ? "s" : "",
                    " will be permanently deleted. This action cannot be undone."
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    AlertDialogCancel,
                    {
                      onClick: () => setEmptyTrashOpen(false),
                      "data-ocid": "trash.empty_cancel.cancel_button",
                      children: "Cancel"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    AlertDialogAction,
                    {
                      onClick: handleEmptyTrash,
                      className: "bg-destructive hover:bg-destructive/90 text-destructive-foreground",
                      "data-ocid": "trash.empty_confirm.confirm_button",
                      children: "Delete all permanently"
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      ] })
    ] }),
    !loading && trashed.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
      trashed.length,
      " item",
      trashed.length !== 1 ? "s" : "",
      " in trash"
    ] }) }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, { lines: 3 }, String(i))) }) : trashed.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-10 w-10" }),
        title: "Trash is empty",
        description: "No announcements have been moved to the trash.",
        "data-ocid": "trash.empty_state"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "trash.list", children: trashed.map((ann) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      TrashedCard,
      {
        ann,
        onRestore: handleRestore,
        onDelete: handleDelete
      },
      String(ann.id)
    )) })
  ] }) });
}
export {
  AnnouncementsTrashPage as default
};
