import { u as useAuth, r as reactExports, j as jsxRuntimeExports, S as SkeletonCard } from "./index-CQG1vcXg.js";
import { A as AppShell, U as Users, a as Avatar, b as AvatarImage, c as AvatarFallback } from "./AppShell-Bc4WOYvs.js";
import { C as ConfirmDialog } from "./ConfirmDialog-CkvSq1ph.js";
import { u as useHasRole } from "./RoleGuard-_co_iNxv.js";
import { B as Badge } from "./badge-CGkWTRBc.js";
import { q as apiGetActiveStaff, r as apiArchiveStaff, u as ue, B as Button, s as apiUpdateStaff } from "./backend-client-D43GVmUU.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, e as DialogDescription, d as DialogFooter } from "./dialog-Dj3hWVMp.js";
import { I as Input } from "./input-DPUfhcLy.js";
import { L as Label } from "./label-Dv6GBfaU.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BO4KPWc9.js";
import { B as BRANCHES, D as DEPARTMENTS } from "./index-DgNPai41.js";
import { S as Search } from "./search-DLrycAQr.js";
import { B as Building2 } from "./building-2-C7fjpMjm.js";
import { M as MapPin } from "./map-pin-Ct4Dq2no.js";
import { A as Archive } from "./archive-CJwnrXuQ.js";
import "./Combination-BpDQgzvQ.js";
import "./index-pajndnDv.js";
import "./index-CqbiV51T.js";
import "./alert-dialog-eGI2SttW.js";
import "./index-D8z7wFiT.js";
import "./index-BICF_Lkm.js";
function isOnline(lastSeen) {
  const fiveMinutesAgo = BigInt(Date.now() - 5 * 60 * 1e3);
  return lastSeen > fiveMinutesAgo;
}
function getInitials(fullname) {
  return fullname.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}
const IT_ACCESS_CODE = "IT2024";
const ROLE_LABELS = {
  SuperAdmin: "Super Admin",
  HRAdmin: "HR Admin",
  GeneralStaff: "Staff"
};
const ROLE_VARIANT = {
  SuperAdmin: "default",
  HRAdmin: "secondary",
  GeneralStaff: "outline"
};
function OnlineSummary({ staff }) {
  const online = staff.filter((u) => isOnline(u.lastSeen));
  const byBranch = BRANCHES.reduce((acc, b) => {
    acc[b] = online.filter((u) => u.branch === b).length;
    return acc;
  }, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-wrap items-center gap-2 glass-card rounded-xl px-4 py-3 text-sm",
      "data-ocid": "directory.online_summary",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 font-semibold text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" }),
          online.length,
          " staff online"
        ] }),
        BRANCHES.map(
          (b) => byBranch[b] > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            "· ",
            byBranch[b],
            " in ",
            b
          ] }, b) : null
        )
      ]
    }
  );
}
function StaffCard({
  staff,
  canEdit,
  isSelf,
  onEdit,
  onArchive,
  index
}) {
  const online = isOnline(staff.lastSeen);
  const initials = getInitials(staff.fullname);
  const canArchive = canEdit && !isSelf && staff.role !== "SuperAdmin";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-card rounded-xl p-4 flex flex-col gap-3 hover:glass-card-elevated transition-smooth cursor-default group",
      "data-ocid": `directory.staff_card.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-11 w-11 ring-2 ring-border/40", children: [
              staff.imageFile && /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: staff.imageFile, alt: staff.fullname }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-primary/20 text-primary font-bold text-sm", children: initials })
            ] }),
            online && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "absolute bottom-0 right-0 block w-3 h-3 rounded-full bg-green-500 ring-2 ring-card",
                title: "Online"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground text-sm truncate leading-tight", children: staff.fullname }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground truncate mt-0.5", children: staff.position || "—" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: ROLE_VARIANT[staff.role],
              className: "text-[10px] flex-shrink-0 mt-0.5",
              children: ROLE_LABELS[staff.role]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 truncate", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-3 w-3 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: staff.department })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 truncate", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: staff.branch })
          ] })
        ] }),
        canEdit && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1 border-t border-border/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              className: "flex-1 h-7 text-xs",
              onClick: () => onEdit(staff),
              "data-ocid": `directory.edit_button.${index}`,
              children: "Edit"
            }
          ),
          canArchive && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              className: "h-7 text-xs text-destructive hover:text-destructive hover:bg-destructive/10",
              onClick: () => onArchive(staff),
              "data-ocid": `directory.archive_button.${index}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Archive, { className: "h-3.5 w-3.5 mr-1" }),
                "Archive"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function EditStaffModal({
  staff,
  open,
  onOpenChange,
  onSaved
}) {
  const [department, setDepartment] = reactExports.useState("");
  const [branch, setBranch] = reactExports.useState("");
  const [position, setPosition] = reactExports.useState("");
  const [itCode, setItCode] = reactExports.useState("");
  const [saving, setSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (staff) {
      setDepartment(staff.department);
      setBranch(staff.branch);
      setPosition(staff.position);
      setItCode("");
    }
  }, [staff]);
  const needsItCode = department === "IT" && (staff == null ? void 0 : staff.department) !== "IT";
  async function handleSave() {
    if (!staff) return;
    if (needsItCode && itCode !== IT_ACCESS_CODE) {
      ue.error("Invalid IT access code");
      return;
    }
    setSaving(true);
    const req = { department, branch, position };
    const result = await apiUpdateStaff(staff.id, req);
    setSaving(false);
    if ("ok" in result) {
      ue.success("Staff member updated successfully");
      onSaved(result.ok);
      onOpenChange(false);
    } else {
      ue.error(result.err ?? "Failed to update staff member");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "glass-card-elevated sm:max-w-md",
      "data-ocid": "directory.edit_staff.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Edit Staff Member" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
            "Update department, branch, or position for ",
            staff == null ? void 0 : staff.fullname,
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-dept", children: "Department" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: department, onValueChange: setDepartment, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  id: "edit-dept",
                  "data-ocid": "directory.edit_staff.department.select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select department" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: DEPARTMENTS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: d, children: d }, d)) })
            ] })
          ] }),
          needsItCode && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "edit-it-code", children: [
              "IT Access Code ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "edit-it-code",
                type: "password",
                placeholder: "Enter IT department access code",
                value: itCode,
                onChange: (e) => setItCode(e.target.value),
                "data-ocid": "directory.edit_staff.it_code.input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Required when assigning a staff member to the IT department." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-branch", children: "Branch" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: branch, onValueChange: setBranch, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  id: "edit-branch",
                  "data-ocid": "directory.edit_staff.branch.select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select branch" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: BRANCHES.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: b, children: b }, b)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-position", children: "Position" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "edit-position",
                placeholder: "e.g. Teller, Loan Officer",
                value: position,
                onChange: (e) => setPosition(e.target.value),
                "data-ocid": "directory.edit_staff.position.input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => onOpenChange(false),
              "data-ocid": "directory.edit_staff.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              onClick: handleSave,
              disabled: saving,
              "data-ocid": "directory.edit_staff.save_button",
              children: saving ? "Saving…" : "Save Changes"
            }
          )
        ] })
      ]
    }
  ) });
}
function DirectoryPage() {
  const { user: currentUser } = useAuth();
  const canEdit = useHasRole(["SuperAdmin", "HRAdmin"]);
  const [staff, setStaff] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [search, setSearch] = reactExports.useState("");
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const [archiveTarget, setArchiveTarget] = reactExports.useState(null);
  const [archiving, setArchiving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    void (async () => {
      const data = await apiGetActiveStaff();
      setStaff(data);
      setLoading(false);
    })();
  }, []);
  const filtered = reactExports.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return staff;
    return staff.filter(
      (u) => u.fullname.toLowerCase().includes(q) || u.department.toLowerCase().includes(q) || u.branch.toLowerCase().includes(q) || u.position.toLowerCase().includes(q)
    );
  }, [staff, search]);
  const grouped = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const u of filtered) {
      if (!map.has(u.department)) map.set(u.department, []);
      map.get(u.department).push(u);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);
  function handleSaved(updated) {
    setStaff((prev) => prev.map((u) => u.id === updated.id ? updated : u));
  }
  async function handleArchiveConfirm() {
    if (!archiveTarget) return;
    setArchiving(true);
    const result = await apiArchiveStaff(archiveTarget.id);
    setArchiving(false);
    if ("ok" in result) {
      ue.success(`${archiveTarget.fullname} has been archived`);
      setStaff((prev) => prev.filter((u) => u.id !== archiveTarget.id));
    } else {
      ue.error(result.err ?? "Failed to archive staff member");
    }
    setArchiveTarget(null);
  }
  let cardIndex = 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-7xl mx-auto", "data-ocid": "directory.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-display font-bold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-6 w-6 text-primary" }),
          "Staff Directory"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
          staff.length,
          " active staff member",
          staff.length !== 1 ? "s" : ""
        ] })
      ] }) }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: Array.from({ length: 6 }, (_, i) => `sk-${i}`).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, { lines: 2, hasAvatar: true }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        staff.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(OnlineSummary, { staff }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Search by name, department, or branch…",
              className: "pl-9",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              "data-ocid": "directory.search_input"
            }
          )
        ] }),
        grouped.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-center py-16 glass-card rounded-xl",
            "data-ocid": "directory.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-10 w-10 text-muted-foreground/40 mx-auto mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium", children: "No staff found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: search ? "Try a different search term" : "No active staff members" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", children: grouped.map(([dept, members]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            "data-ocid": `directory.dept_section.${dept.toLowerCase().replace(/\s+/g, "_")}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-foreground text-sm uppercase tracking-wider", children: dept }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "secondary",
                      className: "text-xs tabular-nums",
                      children: members.length
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border/50" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3", children: members.map((member) => {
                const idx = ++cardIndex;
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  StaffCard,
                  {
                    staff: member,
                    canEdit,
                    isSelf: (currentUser == null ? void 0 : currentUser.id) === member.id,
                    onEdit: setEditTarget,
                    onArchive: setArchiveTarget,
                    index: idx
                  },
                  member.id
                );
              }) })
            ]
          },
          dept
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditStaffModal,
      {
        staff: editTarget,
        open: !!editTarget,
        onOpenChange: (open) => {
          if (!open) setEditTarget(null);
        },
        onSaved: handleSaved
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDialog,
      {
        open: !!archiveTarget,
        onOpenChange: (open) => {
          if (!open) setArchiveTarget(null);
        },
        title: "Archive Staff Member",
        description: `Are you sure you want to archive ${archiveTarget == null ? void 0 : archiveTarget.fullname}? They will be moved to Past Staff and lose portal access.`,
        confirmLabel: archiving ? "Archiving…" : "Archive",
        cancelLabel: "Cancel",
        variant: "destructive",
        onConfirm: handleArchiveConfirm
      }
    )
  ] });
}
export {
  DirectoryPage as default
};
