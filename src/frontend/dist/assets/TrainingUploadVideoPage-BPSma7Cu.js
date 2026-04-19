import { a as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-CQG1vcXg.js";
import { A as AppShell } from "./AppShell-Bc4WOYvs.js";
import { P as PortalCard } from "./PortalCard-D6i7wtiH.js";
import { R as RoleGuard } from "./RoleGuard-_co_iNxv.js";
import { B as Badge } from "./badge-CGkWTRBc.js";
import { e as createLucideIcon, B as Button, L as apiUploadTrainingVideo, u as ue } from "./backend-client-D43GVmUU.js";
import { I as Input } from "./input-DPUfhcLy.js";
import { L as Label } from "./label-Dv6GBfaU.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BO4KPWc9.js";
import { L as Link, C as CloudUpload, S as Switch } from "./switch-B_4-IZ9N.js";
import { T as Textarea } from "./textarea-jc3bt3IQ.js";
import { D as DEPARTMENTS } from "./index-DgNPai41.js";
import { A as ArrowLeft } from "./arrow-left-bPk6U5to.js";
import { V as Video } from "./video-CTZN46Ft.js";
import { U as Upload } from "./upload-D78Fede5.js";
import "./Combination-BpDQgzvQ.js";
import "./index-pajndnDv.js";
import "./index-CqbiV51T.js";
import "./index-BICF_Lkm.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode);
function extractDriveId(input) {
  const match = input.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ?? input.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  return (match == null ? void 0 : match[1]) ?? input.trim();
}
function TrainingUploadVideoPage() {
  const navigate = useNavigate();
  const [title, setTitle] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [storageType, setStorageType] = reactExports.useState("Drive");
  const [driveInput, setDriveInput] = reactExports.useState("");
  const [localFile, setLocalFile] = reactExports.useState(null);
  const [visibility, setVisibility] = reactExports.useState(
    "General"
  );
  const [department, setDepartment] = reactExports.useState("");
  const [mandatory, setMandatory] = reactExports.useState(false);
  const [allowDownload, setAllowDownload] = reactExports.useState(false);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const driveId = driveInput ? extractDriveId(driveInput) : "";
  const isValid = title.trim().length > 0 && (storageType === "Drive" ? driveId.length > 0 : localFile !== null) && (visibility === "General" || department.length > 0);
  async function handleSubmit(e) {
    e.preventDefault();
    if (!isValid || submitting) return;
    setSubmitting(true);
    try {
      const videoUrl = storageType === "Drive" ? `DRIVE:${driveId}` : `LOCAL:${(localFile == null ? void 0 : localFile.name) ?? ""}`;
      await apiUploadTrainingVideo({
        title: title.trim(),
        description: description.trim(),
        videoUrl,
        storageType,
        visibility,
        department: visibility === "Department" ? department : void 0,
        mandatory,
        allowDownload
      });
      ue.success("Video uploaded successfully");
      navigate({ to: "/training" });
    } catch {
      ue.error("Upload failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    RoleGuard,
    {
      roles: ["SuperAdmin", "HRAdmin"],
      fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-16 text-muted-foreground", children: "You do not have permission to upload training videos." }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            className: "gap-1.5 -ml-1",
            onClick: () => navigate({ to: "/training" }),
            "data-ocid": "training.upload_video.back_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
              "Training Portal"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "h-5 w-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground", children: "Upload Training Video" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PortalCard, { title: "Video Information", elevated: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "title", children: "Title *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "title",
                  value: title,
                  onChange: (e) => setTitle(e.target.value),
                  placeholder: "e.g. Cybersecurity Awareness Training",
                  required: true,
                  "data-ocid": "training.upload_video.title_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "description", children: "Description" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "description",
                  value: description,
                  onChange: (e) => setDescription(e.target.value),
                  placeholder: "Brief description of this video...",
                  rows: 3,
                  "data-ocid": "training.upload_video.description_input"
                }
              )
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PortalCard, { title: "Video Source", elevated: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Storage Type *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: ["Drive", "Local"].map((type) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setStorageType(type),
                  className: `flex-1 flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-smooth ${storageType === type ? "border-primary bg-primary/5 text-primary" : "border-border/50 hover:border-primary/30 text-muted-foreground"}`,
                  "data-ocid": `training.upload_video.storage_${type.toLowerCase()}_button`,
                  children: [
                    type === "Drive" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CloudUpload, { className: "h-5 w-5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: type === "Drive" ? "Google Drive" : "Upload File" })
                  ]
                },
                type
              )) })
            ] }),
            storageType === "Drive" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "driveInput", children: "Google Drive URL or File ID *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "driveInput",
                  value: driveInput,
                  onChange: (e) => setDriveInput(e.target.value),
                  placeholder: "Paste Drive URL or file ID...",
                  "data-ocid": "training.upload_video.drive_input"
                }
              ),
              driveInput && driveId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-secondary", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "h-3.5 w-3.5" }),
                "Extracted ID:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-[10px] font-mono",
                    children: driveId
                  }
                )
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "videoFile", children: "Video File *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `border-2 border-dashed rounded-lg p-6 text-center transition-smooth cursor-pointer ${localFile ? "border-secondary bg-secondary/5" : "border-border/50 hover:border-primary/40"}`,
                  "data-ocid": "training.upload_video.dropzone",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "videoFile",
                        type: "file",
                        accept: "video/mp4,video/quicktime,video/x-msvideo,video/x-matroska,video/webm",
                        className: "hidden",
                        onChange: (e) => {
                          var _a;
                          return setLocalFile(((_a = e.target.files) == null ? void 0 : _a[0]) ?? null);
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "label",
                      {
                        htmlFor: "videoFile",
                        className: "cursor-pointer flex flex-col items-center gap-2",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-8 w-8 text-muted-foreground" }),
                          localFile ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-secondary", children: localFile.name }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "Click to select video" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "MP4, MOV, AVI, MKV, WebM" })
                          ] })
                        ]
                      }
                    )
                  ]
                }
              )
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PortalCard, { title: "Visibility & Access", elevated: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Visible To *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: visibility,
                  onValueChange: (v) => setVisibility(v),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "training.upload_video.visibility_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "General", children: "All Staff (General)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Department", children: "Specific Department" })
                    ] })
                  ]
                }
              )
            ] }),
            visibility === "Department" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Department *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: department, onValueChange: setDepartment, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "training.upload_video.department_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select department..." }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: DEPARTMENTS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: d, children: d }, d)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-2 border-t border-border/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-foreground", children: "Mandatory Training" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Mark as required for eligible staff" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Switch,
                {
                  checked: mandatory,
                  onCheckedChange: setMandatory,
                  "data-ocid": "training.upload_video.mandatory_switch"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-2 border-t border-border/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-foreground", children: "Allow Download" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Let staff download this video" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Switch,
                {
                  checked: allowDownload,
                  onCheckedChange: setAllowDownload,
                  "data-ocid": "training.upload_video.download_switch"
                }
              )
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => navigate({ to: "/training" }),
                "data-ocid": "training.upload_video.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: !isValid || submitting,
                className: "gap-1.5",
                "data-ocid": "training.upload_video.submit_button",
                children: submitting ? "Uploading..." : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4" }),
                  "Upload Video"
                ] })
              }
            )
          ] })
        ] })
      ] })
    }
  ) });
}
export {
  TrainingUploadVideoPage as default
};
