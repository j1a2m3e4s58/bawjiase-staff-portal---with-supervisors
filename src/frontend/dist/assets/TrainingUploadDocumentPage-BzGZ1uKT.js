import { a as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-CQG1vcXg.js";
import { A as AppShell } from "./AppShell-Bc4WOYvs.js";
import { P as PortalCard } from "./PortalCard-D6i7wtiH.js";
import { R as RoleGuard } from "./RoleGuard-_co_iNxv.js";
import { B as Button, M as apiUploadTrainingDocument, u as ue } from "./backend-client-D43GVmUU.js";
import { I as Input } from "./input-DPUfhcLy.js";
import { L as Label } from "./label-Dv6GBfaU.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BO4KPWc9.js";
import { L as Link, C as CloudUpload, S as Switch } from "./switch-B_4-IZ9N.js";
import { T as Textarea } from "./textarea-jc3bt3IQ.js";
import { D as DEPARTMENTS } from "./index-DgNPai41.js";
import { A as ArrowLeft } from "./arrow-left-bPk6U5to.js";
import { B as BookOpen } from "./book-open-DApsL0_H.js";
import { U as Upload } from "./upload-D78Fede5.js";
import "./Combination-BpDQgzvQ.js";
import "./index-pajndnDv.js";
import "./index-CqbiV51T.js";
import "./index-BICF_Lkm.js";
function TrainingUploadDocumentPage() {
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
  const [allowDownload, setAllowDownload] = reactExports.useState(true);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const isValid = title.trim().length > 0 && (storageType === "Drive" ? driveInput.trim().length > 0 : localFile !== null) && (visibility === "General" || department.length > 0);
  function getFileType(file) {
    var _a;
    if (file.type) return file.type;
    const ext = ((_a = file.name.split(".").pop()) == null ? void 0 : _a.toLowerCase()) ?? "";
    const map = {
      pdf: "application/pdf",
      doc: "application/msword",
      docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      xls: "application/vnd.ms-excel",
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ppt: "application/vnd.ms-powerpoint",
      pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    };
    return map[ext] ?? "application/octet-stream";
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!isValid || submitting) return;
    setSubmitting(true);
    try {
      const fileUrl = storageType === "Drive" ? `DRIVE:${driveInput.trim()}` : `LOCAL:${(localFile == null ? void 0 : localFile.name) ?? ""}`;
      const fileType = storageType === "Local" && localFile ? getFileType(localFile) : "drive";
      await apiUploadTrainingDocument({
        title: title.trim(),
        description: description.trim(),
        fileUrl,
        fileType,
        storageType,
        visibility,
        department: visibility === "Department" ? department : void 0,
        mandatory,
        allowDownload
      });
      ue.success("Document uploaded successfully");
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
      fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-16 text-muted-foreground", children: "You do not have permission to upload training documents." }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            className: "gap-1.5 -ml-1",
            onClick: () => navigate({ to: "/training" }),
            "data-ocid": "training.upload_doc.back_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
              "Training Portal"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-5 w-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground", children: "Upload Training Document" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PortalCard, { title: "Document Information", elevated: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "doc-title", children: "Title *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "doc-title",
                  value: title,
                  onChange: (e) => setTitle(e.target.value),
                  placeholder: "e.g. Anti-Money Laundering Policy 2026",
                  required: true,
                  "data-ocid": "training.upload_doc.title_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "doc-description", children: "Description" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "doc-description",
                  value: description,
                  onChange: (e) => setDescription(e.target.value),
                  placeholder: "Brief description of this document...",
                  rows: 3,
                  "data-ocid": "training.upload_doc.description_input"
                }
              )
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PortalCard, { title: "Document Source", elevated: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Storage Type *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: ["Drive", "Local"].map((type) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setStorageType(type),
                  className: `flex-1 flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-smooth ${storageType === type ? "border-primary bg-primary/5 text-primary" : "border-border/50 hover:border-primary/30 text-muted-foreground"}`,
                  "data-ocid": `training.upload_doc.storage_${type.toLowerCase()}_button`,
                  children: [
                    type === "Drive" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CloudUpload, { className: "h-5 w-5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: type === "Drive" ? "Google Drive" : "Upload File" })
                  ]
                },
                type
              )) })
            ] }),
            storageType === "Drive" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "drive-url", children: "Google Drive URL or File ID *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "drive-url",
                  value: driveInput,
                  onChange: (e) => setDriveInput(e.target.value),
                  placeholder: "Paste Drive URL or file ID...",
                  "data-ocid": "training.upload_doc.drive_input"
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "doc-file", children: "Document File *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `border-2 border-dashed rounded-lg p-6 text-center transition-smooth ${localFile ? "border-secondary bg-secondary/5" : "border-border/50 hover:border-primary/40"}`,
                  "data-ocid": "training.upload_doc.dropzone",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "doc-file",
                        type: "file",
                        accept: ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx",
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
                        htmlFor: "doc-file",
                        className: "cursor-pointer flex flex-col items-center gap-2",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-8 w-8 text-muted-foreground" }),
                          localFile ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-secondary", children: localFile.name }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "Click to select document" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "PDF, Word, Excel, PowerPoint" })
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
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "training.upload_doc.visibility_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
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
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "training.upload_doc.department_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select department..." }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: DEPARTMENTS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: d, children: d }, d)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-2 border-t border-border/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-foreground", children: "Mandatory Reading" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Mark as required for eligible staff" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Switch,
                {
                  checked: mandatory,
                  onCheckedChange: setMandatory,
                  "data-ocid": "training.upload_doc.mandatory_switch"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-2 border-t border-border/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-foreground", children: "Allow Download" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Let staff download this document" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Switch,
                {
                  checked: allowDownload,
                  onCheckedChange: setAllowDownload,
                  "data-ocid": "training.upload_doc.download_switch"
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
                "data-ocid": "training.upload_doc.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: !isValid || submitting,
                className: "gap-1.5",
                "data-ocid": "training.upload_doc.submit_button",
                children: submitting ? "Uploading..." : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4" }),
                  "Upload Document"
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
  TrainingUploadDocumentPage as default
};
