import { a as useNavigate, r as reactExports, j as jsxRuntimeExports, S as SkeletonCard } from "./index-CQG1vcXg.js";
import { A as AppShell, G as GraduationCap, F as FileText } from "./AppShell-Bc4WOYvs.js";
import { C as ConfirmDialog } from "./ConfirmDialog-CkvSq1ph.js";
import { E as EmptyState } from "./EmptyState-HcQkGyve.js";
import { P as PortalCard } from "./PortalCard-D6i7wtiH.js";
import { R as RoleGuard } from "./RoleGuard-_co_iNxv.js";
import { B as Badge } from "./badge-CGkWTRBc.js";
import { e as createLucideIcon, D as apiGetTrainingVideos, E as apiGetTrainingDocuments, B as Button, u as ue, F as apiArchiveTrainingVideo, G as apiDeleteTrainingVideo } from "./backend-client-D43GVmUU.js";
import { I as Input } from "./input-DPUfhcLy.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BO4KPWc9.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-DwEVqHqo.js";
import { L as LayoutGrid } from "./layout-grid-CBvqLpzq.js";
import { V as Video } from "./video-CTZN46Ft.js";
import { B as BookOpen } from "./book-open-DApsL0_H.js";
import { S as Search } from "./search-DLrycAQr.js";
import { U as Upload } from "./upload-D78Fede5.js";
import { C as Calendar } from "./calendar-OW3hoR31.js";
import { A as Archive } from "./archive-CJwnrXuQ.js";
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
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polygon", { points: "10 8 16 12 10 16 10 8", key: "1cimsy" }]
];
const CirclePlay = createLucideIcon("circle-play", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M8 13h2", key: "yr2amv" }],
  ["path", { d: "M14 13h2", key: "un5t4a" }],
  ["path", { d: "M8 17h2", key: "2yhykz" }],
  ["path", { d: "M14 17h2", key: "10kma7" }]
];
const FileSpreadsheet = createLucideIcon("file-spreadsheet", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M9 13v-1h6v1", key: "1bb014" }],
  ["path", { d: "M12 12v6", key: "3ahymv" }],
  ["path", { d: "M11 18h2", key: "12mj7e" }]
];
const FileType = createLucideIcon("file-type", __iconNode$1);
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
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
function formatDate(ts) {
  return new Date(Number(ts)).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function DocIcon({ fileType }) {
  const t = fileType.toLowerCase();
  if (t.includes("pdf"))
    return /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-8 w-8 text-destructive/80" });
  if (t.includes("xls") || t.includes("sheet"))
    return /* @__PURE__ */ jsxRuntimeExports.jsx(FileSpreadsheet, { className: "h-8 w-8 text-secondary" });
  if (t.includes("ppt") || t.includes("presentation"))
    return /* @__PURE__ */ jsxRuntimeExports.jsx(FileType, { className: "h-8 w-8 text-accent" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-8 w-8 text-primary" });
}
function VideoCard({
  video,
  index,
  isAdmin,
  onArchive,
  onDelete
}) {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-card rounded-xl overflow-hidden transition-smooth hover:shadow-glass group",
      "data-ocid": `training.video.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "w-full relative aspect-video bg-primary/10 flex items-center justify-center cursor-pointer overflow-hidden",
            onClick: () => navigate({ to: `/training/video/${video.id}` }),
            "data-ocid": `training.video.play_button.${index}`,
            children: [
              video.thumbnailUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: video.thumbnailUrl,
                  alt: video.title,
                  className: "w-full h-full object-cover"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "h-12 w-12 text-primary/50" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth bg-foreground/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "h-14 w-14 text-primary-foreground drop-shadow-lg" }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "flex-1 text-left",
                onClick: () => navigate({ to: `/training/video/${video.id}` }),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm leading-snug line-clamp-2 hover:text-primary transition-colors", children: video.title })
              }
            ),
            video.visibleTo.length < 3 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-[10px] shrink-0", children: "Dept" })
          ] }),
          video.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2", children: video.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-[11px] text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDate(video.uploadedAt) })
            ] }),
            video.category && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-[10px] bg-primary/10 text-primary border-primary/20", children: video.category })
          ] }),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2 border-t border-border/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                className: "flex-1 text-xs gap-1.5",
                onClick: () => onArchive(video),
                "data-ocid": `training.video.archive_button.${index}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Archive, { className: "h-3.5 w-3.5" }),
                  "Archive"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                className: "flex-1 text-xs gap-1.5 text-destructive hover:text-destructive border-destructive/30 hover:bg-destructive/10",
                onClick: () => onDelete(video),
                "data-ocid": `training.video.delete_button.${index}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
                  "Delete"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function DocCard({
  doc,
  index,
  isAdmin,
  onOpen,
  onArchive,
  onDelete
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-card rounded-xl p-4 transition-smooth hover:shadow-glass flex flex-col gap-3",
      "data-ocid": `training.doc.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-lg bg-muted flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DocIcon, { fileType: doc.fileType }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "text-left w-full",
                onClick: () => onOpen(doc),
                "data-ocid": `training.doc.open_button.${index}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground line-clamp-2 hover:text-primary transition-colors", children: doc.title })
              }
            ),
            doc.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 mt-0.5", children: doc.description })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-[11px] text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDate(doc.uploadedAt) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            doc.fileType && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-[10px] uppercase", children: doc.fileType.split("/").pop() }),
            doc.visibleTo.length < 3 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-[10px]", children: "Dept" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "default",
              size: "sm",
              className: "flex-1 text-xs gap-1.5",
              onClick: () => onOpen(doc),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" }),
                "Open"
              ]
            }
          ),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                className: "text-xs gap-1",
                onClick: () => onArchive(doc),
                "data-ocid": `training.doc.archive_button.${index}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Archive, { className: "h-3.5 w-3.5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                className: "text-xs gap-1 text-destructive hover:text-destructive border-destructive/30 hover:bg-destructive/10",
                onClick: () => onDelete(doc),
                "data-ocid": `training.doc.delete_button.${index}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function TrainingHubPage() {
  const navigate = useNavigate();
  const [tab, setTab] = reactExports.useState("videos");
  const [videos, setVideos] = reactExports.useState([]);
  const [loadingVideos, setLoadingVideos] = reactExports.useState(true);
  const [videoSearch, setVideoSearch] = reactExports.useState("");
  const [videoFilter, setVideoFilter] = reactExports.useState("all");
  const [docs, setDocs] = reactExports.useState([]);
  const [loadingDocs, setLoadingDocs] = reactExports.useState(true);
  const [docSearch, setDocSearch] = reactExports.useState("");
  const [docFilter, setDocFilter] = reactExports.useState("all");
  const [archiveVideoTarget, setArchiveVideoTarget] = reactExports.useState(null);
  const [deleteVideoTarget, setDeleteVideoTarget] = reactExports.useState(null);
  const [archiveDocTarget, setArchiveDocTarget] = reactExports.useState(null);
  const [deleteDocTarget, setDeleteDocTarget] = reactExports.useState(null);
  reactExports.useEffect(() => {
    apiGetTrainingVideos().then(setVideos).finally(() => setLoadingVideos(false));
    apiGetTrainingDocuments().then(setDocs).finally(() => setLoadingDocs(false));
  }, []);
  const filteredVideos = videos.filter((v) => !v.isArchived).filter(
    (v) => v.title.toLowerCase().includes(videoSearch.toLowerCase()) || v.description.toLowerCase().includes(videoSearch.toLowerCase())
  ).filter((v) => {
    if (videoFilter === "general") return v.visibleTo.length >= 3;
    if (videoFilter === "department") return v.visibleTo.length < 3;
    return true;
  });
  const filteredDocs = docs.filter((d) => !d.isArchived).filter(
    (d) => d.title.toLowerCase().includes(docSearch.toLowerCase()) || d.description.toLowerCase().includes(docSearch.toLowerCase())
  ).filter((d) => {
    if (docFilter === "general") return d.visibleTo.length >= 3;
    if (docFilter === "department") return d.visibleTo.length < 3;
    return true;
  });
  async function handleArchiveVideo() {
    if (!archiveVideoTarget) return;
    await apiArchiveTrainingVideo(archiveVideoTarget.id);
    setVideos(
      (prev) => prev.map(
        (v) => v.id === archiveVideoTarget.id ? { ...v, isArchived: true } : v
      )
    );
    ue.success(`"${archiveVideoTarget.title}" archived`);
    setArchiveVideoTarget(null);
  }
  async function handleDeleteVideo() {
    if (!deleteVideoTarget) return;
    await apiDeleteTrainingVideo(deleteVideoTarget.id);
    setVideos((prev) => prev.filter((v) => v.id !== deleteVideoTarget.id));
    ue.success(`"${deleteVideoTarget.title}" deleted`);
    setDeleteVideoTarget(null);
  }
  async function handleOpenDoc(doc) {
    window.open(doc.fileUrl, "_blank", "noopener noreferrer");
    ue.info(`Opening "${doc.title}"`);
  }
  function handleArchiveDoc(doc) {
    setArchiveDocTarget(doc);
  }
  function handleDeleteDoc(doc) {
    setDeleteDocTarget(doc);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-6 w-6 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Training Portal" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Videos, documents and learning resources for all staff" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(RoleGuard, { roles: ["SuperAdmin", "HRAdmin"], children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 flex-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "gap-1.5",
          onClick: () => navigate({ to: "/training/admin" }),
          "data-ocid": "training.dashboard_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "h-4 w-4" }),
            "Dashboard"
          ]
        }
      ) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: tab, onValueChange: setTab, "data-ocid": "training.tabs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-5", "data-ocid": "training.tabs_list", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "videos", "data-ocid": "training.tab.videos", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "h-4 w-4 mr-1.5" }),
          "Videos"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "documents", "data-ocid": "training.tab.documents", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4 mr-1.5" }),
          "Documents"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "videos", className: "mt-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PortalCard, { className: "mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Search videos...",
                value: videoSearch,
                onChange: (e) => setVideoSearch(e.target.value),
                className: "pl-9",
                "data-ocid": "training.video.search_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: videoFilter, onValueChange: setVideoFilter, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "w-full sm:w-44",
                "data-ocid": "training.video.filter_select",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Visibility" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Videos" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "general", children: "General Staff" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "department", children: "Department Only" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(RoleGuard, { roles: ["SuperAdmin", "HRAdmin"], children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              className: "gap-1.5 shrink-0",
              onClick: () => navigate({ to: "/training/upload-video" }),
              "data-ocid": "training.upload_video_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4" }),
                "Upload Video"
              ]
            }
          ) })
        ] }) }),
        loadingVideos ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: Array.from({ length: 6 }, (_, i) => `sk-v-${i}`).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, { hasImage: true, lines: 3 }, k)) }) : filteredVideos.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "h-7 w-7" }),
            title: "No videos found",
            description: videoSearch ? "Try adjusting your search or filters." : "No training videos have been uploaded yet.",
            "data-ocid": "training.video.empty_state"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          RoleGuard,
          {
            roles: ["SuperAdmin", "HRAdmin"],
            fallback: filteredVideos.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              VideoCard,
              {
                video: v,
                index: i + 1,
                isAdmin: false,
                onArchive: () => {
                },
                onDelete: () => {
                }
              },
              v.id
            )),
            children: filteredVideos.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              VideoCard,
              {
                video: v,
                index: i + 1,
                isAdmin: true,
                onArchive: setArchiveVideoTarget,
                onDelete: setDeleteVideoTarget
              },
              v.id
            ))
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "documents", className: "mt-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PortalCard, { className: "mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Search documents...",
                value: docSearch,
                onChange: (e) => setDocSearch(e.target.value),
                className: "pl-9",
                "data-ocid": "training.doc.search_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: docFilter, onValueChange: setDocFilter, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "w-full sm:w-44",
                "data-ocid": "training.doc.filter_select",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Visibility" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Documents" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "general", children: "General Staff" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "department", children: "Department Only" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(RoleGuard, { roles: ["SuperAdmin", "HRAdmin"], children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              className: "gap-1.5 shrink-0",
              onClick: () => navigate({ to: "/training/upload-document" }),
              "data-ocid": "training.upload_doc_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4" }),
                "Upload Document"
              ]
            }
          ) })
        ] }) }),
        loadingDocs ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: Array.from({ length: 6 }, (_, i) => `sk-d-${i}`).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, { lines: 4 }, k)) }) : filteredDocs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-7 w-7" }),
            title: "No documents found",
            description: docSearch ? "Try adjusting your search or filters." : "No training documents have been uploaded yet.",
            "data-ocid": "training.doc.empty_state"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: filteredDocs.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          DocCard,
          {
            doc: d,
            index: i + 1,
            isAdmin: false,
            onOpen: handleOpenDoc,
            onArchive: handleArchiveDoc,
            onDelete: handleDeleteDoc
          },
          d.id
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDialog,
      {
        open: !!archiveVideoTarget,
        onOpenChange: (o) => !o && setArchiveVideoTarget(null),
        title: "Archive Video",
        description: `Archive "${archiveVideoTarget == null ? void 0 : archiveVideoTarget.title}"? It will no longer be visible to staff.`,
        confirmLabel: "Archive",
        onConfirm: handleArchiveVideo
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDialog,
      {
        open: !!deleteVideoTarget,
        onOpenChange: (o) => !o && setDeleteVideoTarget(null),
        title: "Delete Video",
        description: `Permanently delete "${deleteVideoTarget == null ? void 0 : deleteVideoTarget.title}"? This cannot be undone.`,
        confirmLabel: "Delete",
        variant: "destructive",
        onConfirm: handleDeleteVideo
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDialog,
      {
        open: !!archiveDocTarget,
        onOpenChange: (o) => !o && setArchiveDocTarget(null),
        title: "Archive Document",
        description: `Archive "${archiveDocTarget == null ? void 0 : archiveDocTarget.title}"?`,
        confirmLabel: "Archive",
        onConfirm: async () => {
          if (!archiveDocTarget) return;
          setDocs(
            (prev) => prev.map(
              (d) => d.id === archiveDocTarget.id ? { ...d, isArchived: true } : d
            )
          );
          ue.success(`"${archiveDocTarget.title}" archived`);
          setArchiveDocTarget(null);
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDialog,
      {
        open: !!deleteDocTarget,
        onOpenChange: (o) => !o && setDeleteDocTarget(null),
        title: "Delete Document",
        description: `Permanently delete "${deleteDocTarget == null ? void 0 : deleteDocTarget.title}"?`,
        confirmLabel: "Delete",
        variant: "destructive",
        onConfirm: async () => {
          if (!deleteDocTarget) return;
          setDocs((prev) => prev.filter((d) => d.id !== deleteDocTarget.id));
          ue.success(`"${deleteDocTarget.title}" deleted`);
          setDeleteDocTarget(null);
        }
      }
    ),
    videos.filter((v) => v.isArchived).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center gap-2 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-amber-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        videos.filter((v) => v.isArchived).length,
        " archived videos hidden from view"
      ] })
    ] })
  ] });
}
export {
  TrainingHubPage as default
};
