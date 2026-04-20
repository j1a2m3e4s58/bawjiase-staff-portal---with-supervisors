import { u as useAuth, h as useRouter, r as reactExports, j as jsxRuntimeExports, k as Skeleton, S as SkeletonCard } from "./index-CQG1vcXg.js";
import { A as AppShell, a as Avatar, b as AvatarImage, c as AvatarFallback, X, d as User, S as Separator, L as LogOut } from "./AppShell-Bc4WOYvs.js";
import { C as ConfirmDialog } from "./ConfirmDialog-CkvSq1ph.js";
import { P as PortalCard } from "./PortalCard-D6i7wtiH.js";
import { B as Badge } from "./badge-CGkWTRBc.js";
import { e as createLucideIcon, B as Button, A as apiGetMyProfile, u as ue, C as apiUpdateMyProfile } from "./backend-client-D43GVmUU.js";
import { I as Input } from "./input-DPUfhcLy.js";
import { L as Label } from "./label-Dv6GBfaU.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BO4KPWc9.js";
import { D as DEPARTMENTS, B as BRANCHES } from "./index-DgNPai41.js";
import { M as MapPin } from "./map-pin-Ct4Dq2no.js";
import { C as CircleCheck } from "./circle-check-D6oZnHsX.js";
import { P as Pencil } from "./pencil-D-Y1ZZti.js";
import { B as Building2 } from "./building-2-C7fjpMjm.js";
import { M as Mail } from "./mail-DYxVF3HN.js";
import { C as Calendar } from "./calendar-OW3hoR31.js";
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
const __iconNode$3 = [
  [
    "path",
    {
      d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",
      key: "1tc9qg"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
];
const Camera = createLucideIcon("camera", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode$1);
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
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode);
const IT_ACCESS_CODE = "IT-2026";
function roleBadgeVariant(role) {
  if (role === "SuperAdmin") return "default";
  if (role === "HRAdmin") return "secondary";
  return "outline";
}
function roleLabel(role) {
  if (role === "SuperAdmin") return "Super Admin";
  if (role === "HRAdmin") return "HR Admin";
  return "General Staff";
}
function formatDate(ts) {
  return new Date(Number(ts)).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function formatLastSeen(ts) {
  const diff = Date.now() - Number(ts);
  if (diff < 6e4) return "Just now";
  if (diff < 36e5) return `${Math.floor(diff / 6e4)}m ago`;
  if (diff < 864e5) return `${Math.floor(diff / 36e5)}h ago`;
  return formatDate(ts);
}
function getInitials(name) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}
function ProfileSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "space-y-6 max-w-2xl mx-auto",
      "data-ocid": "profile.loading_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card-elevated rounded-xl p-6 flex flex-col sm:flex-row items-center gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-24 rounded-full flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2 w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-48" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-64" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-24 rounded-full" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-20 rounded-full" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, { lines: 4 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, { lines: 4 })
      ]
    }
  );
}
function ProfilePage() {
  const { user, updateUser, logout } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const [isEditing, setIsEditing] = reactExports.useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = reactExports.useState(false);
  const [fullname, setFullname] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [department, setDepartment] = reactExports.useState("");
  const [branch, setBranch] = reactExports.useState("");
  const [itCode, setItCode] = reactExports.useState("");
  const [itCodeError, setItCodeError] = reactExports.useState("");
  const [photoPreview, setPhotoPreview] = reactExports.useState(null);
  const [photoFile, setPhotoFile] = reactExports.useState(null);
  const fileInputRef = reactExports.useRef(null);
  const isPrivileged = (user == null ? void 0 : user.role) === "SuperAdmin" || (user == null ? void 0 : user.role) === "HRAdmin";
  const isChangingToIT = isPrivileged && department === "IT" && (user == null ? void 0 : user.department) !== "IT";
  reactExports.useEffect(() => {
    if (!user) return;
    let mounted = true;
    async function load() {
      if (!user) return;
      setIsLoading(true);
      const profile = await apiGetMyProfile(user.id);
      if (!mounted) return;
      setIsLoading(false);
      if (profile) {
        setFullname(profile.fullname);
        setPhone(profile.phone);
        setDepartment(profile.department);
        setBranch(profile.branch);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [user]);
  function handleAvatarClick() {
    var _a;
    if (isEditing) (_a = fileInputRef.current) == null ? void 0 : _a.click();
  }
  function handleFileChange(e) {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      ue.error("Please select an image file");
      return;
    }
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => {
      var _a2;
      setPhotoPreview((_a2 = ev.target) == null ? void 0 : _a2.result);
    };
    reader.readAsDataURL(file);
  }
  function handleCancelEdit() {
    if (!user) return;
    setFullname(user.fullname);
    setPhone(user.phone);
    setDepartment(user.department);
    setBranch(user.branch);
    setItCode("");
    setItCodeError("");
    setPhotoPreview(null);
    setPhotoFile(null);
    setIsEditing(false);
  }
  async function handleSave() {
    if (!user) return;
    if (isChangingToIT) {
      if (!itCode.trim()) {
        setItCodeError("IT access code is required");
        return;
      }
      if (itCode.trim() !== IT_ACCESS_CODE) {
        setItCodeError("Invalid IT access code");
        return;
      }
    }
    setIsSaving(true);
    try {
      const req = {
        fullname: fullname.trim(),
        phone: phone.trim()
      };
      if (isPrivileged) {
        req.department = department;
        req.branch = branch;
      }
      if (isChangingToIT && itCode.trim() === IT_ACCESS_CODE) {
        req.department = "IT";
      }
      if (photoFile) {
        req.imageFile = photoPreview ?? void 0;
      }
      const result = await apiUpdateMyProfile(user.id, req);
      if ("ok" in result) {
        updateUser(result.ok);
        ue.success("Profile updated successfully");
        setIsEditing(false);
        setItCode("");
        setItCodeError("");
        setPhotoFile(null);
        setPhotoPreview(null);
      } else {
        ue.error(result.err ?? "Failed to update profile");
      }
    } catch {
      ue.error("An unexpected error occurred");
    } finally {
      setIsSaving(false);
    }
  }
  function handleLogout() {
    logout();
    router.navigate({ to: "/login" });
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileSkeleton, {}) });
  }
  if (!user) return null;
  const displayPhoto = photoPreview ?? (user.imageFile ? user.imageFile : null);
  const initials = getInitials(user.fullname);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-2xl mx-auto space-y-6 pb-8",
        "data-ocid": "profile.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PortalCard, { elevated: true, "data-ocid": "profile.header.card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center sm:items-start gap-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "aria-label": "Change profile photo",
                  onClick: handleAvatarClick,
                  className: `group relative rounded-full transition-smooth ${isEditing ? "cursor-pointer ring-2 ring-primary/50 ring-offset-2 ring-offset-background" : "cursor-default"}`,
                  "data-ocid": "profile.avatar.upload_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-24 w-24", children: [
                      displayPhoto && /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: displayPhoto, alt: user.fullname }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-primary/20 text-primary text-2xl font-bold font-display", children: initials })
                    ] }),
                    isEditing && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full bg-foreground/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-6 w-6 text-background" }) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  ref: fileInputRef,
                  type: "file",
                  accept: "image/*",
                  className: "hidden",
                  onChange: handleFileChange,
                  "data-ocid": "profile.photo.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 text-center sm:text-left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground truncate", children: user.fullname }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5 truncate", children: user.email }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                user.position,
                " · ",
                user.department
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mt-3 justify-center sm:justify-start", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: roleBadgeVariant(user.role), children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-3 w-3 mr-1" }),
                  roleLabel(user.role)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3 mr-1" }),
                  user.branch
                ] }),
                user.isActive ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-xs border-secondary text-secondary",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3 mr-1" }),
                      "Active"
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-xs border-destructive text-destructive",
                    children: "Inactive"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground mt-2", children: [
                "Last seen: ",
                formatLastSeen(user.lastSeen)
              ] })
            ] }),
            !isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: () => setIsEditing(true),
                className: "flex-shrink-0 gap-1.5",
                "data-ocid": "profile.edit_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }),
                  "Edit"
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onClick: handleCancelEdit,
                className: "flex-shrink-0 gap-1.5 text-muted-foreground",
                "data-ocid": "profile.cancel_edit_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }),
                  "Cancel"
                ]
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            PortalCard,
            {
              title: isEditing ? "Edit Profile" : "Profile Details",
              subtitle: isEditing ? "Update your personal information" : void 0,
              "data-ocid": "profile.edit.card",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "fullname", className: "text-xs font-medium", children: "Full Name" }),
                  isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "fullname",
                        value: fullname,
                        onChange: (e) => setFullname(e.target.value),
                        className: "pl-9 glass-input",
                        placeholder: "Your full name",
                        "data-ocid": "profile.fullname.input"
                      }
                    )
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/40 text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4 text-muted-foreground flex-shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: user.fullname })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phone", className: "text-xs font-medium", children: "Phone Number" }),
                  isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "phone",
                        value: phone,
                        onChange: (e) => setPhone(e.target.value),
                        className: "pl-9 glass-input",
                        placeholder: "e.g. 0244123456",
                        "data-ocid": "profile.phone.input"
                      }
                    )
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/40 text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4 text-muted-foreground flex-shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: user.phone || "—" })
                  ] })
                ] }),
                isPrivileged && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "department", className: "text-xs font-medium", children: "Department" }),
                  isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Select,
                    {
                      value: department,
                      onValueChange: (val) => {
                        setDepartment(val);
                        setItCode("");
                        setItCodeError("");
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          SelectTrigger,
                          {
                            id: "department",
                            className: "glass-input",
                            "data-ocid": "profile.department.select",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select department" })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: DEPARTMENTS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: d, children: d }, d)) })
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/40 text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-4 w-4 text-muted-foreground flex-shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: user.department })
                  ] })
                ] }),
                isEditing && isChangingToIT && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 p-3 rounded-lg border border-primary/30 bg-primary/5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary font-medium", children: "You are changing to the IT department. An IT access code is required — your role will be updated to Super Admin." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "itCode", className: "text-xs font-medium", children: "IT Access Code" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "itCode",
                      type: "password",
                      value: itCode,
                      onChange: (e) => {
                        setItCode(e.target.value);
                        setItCodeError("");
                      },
                      className: "glass-input",
                      placeholder: "Enter IT access code",
                      "data-ocid": "profile.it_code.input"
                    }
                  ),
                  itCodeError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs text-destructive",
                      "data-ocid": "profile.it_code.error_state",
                      children: itCodeError
                    }
                  )
                ] }),
                isPrivileged && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "branch", className: "text-xs font-medium", children: "Branch" }),
                  isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: branch, onValueChange: setBranch, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        id: "branch",
                        className: "glass-input",
                        "data-ocid": "profile.branch.select",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select branch" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: BRANCHES.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: b, children: b }, b)) })
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/40 text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-muted-foreground flex-shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: user.branch })
                  ] })
                ] }),
                isEditing && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    onClick: handleSave,
                    disabled: isSaving,
                    className: "w-full gap-2 glass-button text-primary-foreground",
                    "data-ocid": "profile.save_button",
                    children: isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" }),
                      "Saving…"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
                      "Save Changes"
                    ] })
                  }
                )
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            PortalCard,
            {
              title: "Account Information",
              subtitle: "Read-only account details",
              "data-ocid": "profile.account.card",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  InfoRow,
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4" }),
                    label: "Email",
                    value: user.email
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "opacity-30" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  InfoRow,
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }),
                    label: "Registered",
                    value: formatDate(user.registrationTime)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "opacity-30" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  InfoRow,
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4" }),
                    label: "Role",
                    value: roleLabel(user.role)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "opacity-30" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  InfoRow,
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
                    label: "Account Status",
                    value: user.isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-secondary font-medium", children: "Active" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive font-medium", children: "Inactive" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "opacity-30" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  InfoRow,
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
                    label: "Verified",
                    value: user.isVerified ? "Yes" : "No"
                  }
                )
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PortalCard, { "data-ocid": "profile.logout.card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Sign Out" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "You will be redirected to the login page" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                className: "gap-2 border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive transition-smooth",
                onClick: () => setShowLogoutConfirm(true),
                "data-ocid": "profile.logout_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
                  "Sign Out"
                ]
              }
            )
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDialog,
      {
        open: showLogoutConfirm,
        onOpenChange: setShowLogoutConfirm,
        title: "Sign out of BARB Staff Portal?",
        description: "You will need to sign in again to access the portal.",
        confirmLabel: "Sign Out",
        cancelLabel: "Stay Signed In",
        variant: "destructive",
        onConfirm: handleLogout
      }
    )
  ] });
}
function InfoRow({
  icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 py-0.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground flex-shrink-0", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground w-24 flex-shrink-0", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground min-w-0 truncate", children: value })
  ] });
}
export {
  ProfilePage as default
};
