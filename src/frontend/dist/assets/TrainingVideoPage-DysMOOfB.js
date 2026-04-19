import { r as reactExports, j as jsxRuntimeExports, c as cn, l as useParams, a as useNavigate, S as SkeletonCard } from "./index-CQG1vcXg.js";
import { e as createContextScope, A as AppShell, d as User, B as Bell } from "./AppShell-Bc4WOYvs.js";
import { C as ConfirmDialog } from "./ConfirmDialog-CkvSq1ph.js";
import { P as PortalCard } from "./PortalCard-D6i7wtiH.js";
import { R as RoleGuard } from "./RoleGuard-_co_iNxv.js";
import { B as Badge } from "./badge-CGkWTRBc.js";
import { P as Primitive, H as apiGetTrainingVideo, I as apiGetMyVideoProgress, J as apiUpdateTrainingProgress, u as ue, B as Button, F as apiArchiveTrainingVideo, G as apiDeleteTrainingVideo, K as apiSendVideoTrainingReminder } from "./backend-client-D43GVmUU.js";
import { V as Video } from "./video-CTZN46Ft.js";
import { A as ArrowLeft } from "./arrow-left-bPk6U5to.js";
import { C as CircleCheck } from "./circle-check-D6oZnHsX.js";
import { C as Calendar } from "./calendar-OW3hoR31.js";
import { E as ExternalLink } from "./external-link-CtGDk5bB.js";
import { D as Download } from "./download-Ce82FHA-.js";
import { A as Archive } from "./archive-CJwnrXuQ.js";
import { T as Trash2 } from "./trash-2-B1TgMGVw.js";
import "./Combination-BpDQgzvQ.js";
import "./index-pajndnDv.js";
import "./index-CqbiV51T.js";
import "./alert-dialog-eGI2SttW.js";
import "./index-D8z7wFiT.js";
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext] = createContextScope(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeProgress,
      value: valueProp = null,
      max: maxProp,
      getValueLabel = defaultGetValueLabel,
      ...progressProps
    } = props;
    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
      console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
    }
    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
    if (valueProp !== null && !isValidValueNumber(valueProp, max)) {
      console.error(getInvalidValueError(`${valueProp}`, "Progress"));
    }
    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressProvider, { scope: __scopeProgress, value, max, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "aria-valuemax": max,
        "aria-valuemin": 0,
        "aria-valuenow": isNumber(value) ? value : void 0,
        "aria-valuetext": valueLabel,
        role: "progressbar",
        "data-state": getProgressState(value, max),
        "data-value": value ?? void 0,
        "data-max": max,
        ...progressProps,
        ref: forwardedRef
      }
    ) });
  }
);
Progress$1.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeProgress, ...indicatorProps } = props;
    const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": getProgressState(context.value, context.max),
        "data-value": context.value ?? void 0,
        "data-max": context.max,
        ...indicatorProps,
        ref: forwardedRef
      }
    );
  }
);
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
  return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
  return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
  return typeof value === "number";
}
function isValidMaxNumber(max) {
  return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
  return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root = Progress$1;
var Indicator = ProgressIndicator;
function Progress({
  className,
  value,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "progress",
      className: cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          "data-slot": "progress-indicator",
          className: "bg-primary h-full w-full flex-1 transition-all",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  );
}
function formatDate(ts) {
  return new Date(Number(ts)).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function extractDriveId(input) {
  const match = input.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ?? input.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  return (match == null ? void 0 : match[1]) ?? input.trim();
}
function isDriveVideo(video) {
  return video.videoUrl.includes("drive.google.com") || video.videoUrl.startsWith("DRIVE:");
}
function getDriveEmbedUrl(video) {
  const rawId = video.videoUrl.startsWith("DRIVE:") ? video.videoUrl.replace("DRIVE:", "") : extractDriveId(video.videoUrl);
  return `https://drive.google.com/file/d/${rawId}/preview`;
}
function VideoPlayer({
  video,
  initialProgress,
  onProgressUpdate,
  onComplete
}) {
  const videoRef = reactExports.useRef(null);
  const lastReportRef = reactExports.useRef(0);
  const completedRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (videoRef.current && initialProgress > 0) {
      const duration = videoRef.current.duration;
      if (duration) {
        videoRef.current.currentTime = initialProgress / 100 * duration;
      }
    }
  }, [initialProgress]);
  const handleTimeUpdate = reactExports.useCallback(() => {
    const el = videoRef.current;
    if (!el || !el.duration) return;
    const pct = el.currentTime / el.duration * 100;
    if (pct >= 98 && !completedRef.current) {
      completedRef.current = true;
      onComplete();
    }
    if (pct - lastReportRef.current >= 5) {
      lastReportRef.current = pct;
      onProgressUpdate(pct);
    }
  }, [onProgressUpdate, onComplete]);
  if (isDriveVideo(video)) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-video bg-foreground/5 rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "iframe",
      {
        src: getDriveEmbedUrl(video),
        title: video.title,
        className: "w-full h-full border-0",
        allow: "autoplay",
        allowFullScreen: true
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-video bg-foreground/5 rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "video",
    {
      ref: videoRef,
      src: video.videoUrl,
      controls: true,
      className: "w-full h-full",
      onTimeUpdate: handleTimeUpdate,
      preload: "metadata",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("track", { kind: "captions" })
    }
  ) });
}
function TrainingVideoPage() {
  const { id } = useParams({ strict: false });
  const navigate = useNavigate();
  const [video, setVideo] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [progress, setProgress] = reactExports.useState(0);
  const [isComplete, setIsComplete] = reactExports.useState(false);
  const [archiveOpen, setArchiveOpen] = reactExports.useState(false);
  const [deleteOpen, setDeleteOpen] = reactExports.useState(false);
  const [reminderOpen, setReminderOpen] = reactExports.useState(false);
  const videoId = Number(id);
  reactExports.useEffect(() => {
    Promise.all([apiGetTrainingVideo(videoId), apiGetMyVideoProgress(videoId)]).then(([v, prog]) => {
      setVideo(v);
      if (prog) {
        setProgress(prog.progressPercent);
        setIsComplete(prog.isComplete);
      }
    }).finally(() => setLoading(false));
  }, [videoId]);
  const handleProgressUpdate = reactExports.useCallback(
    async (pct) => {
      await apiUpdateTrainingProgress(videoId, pct);
      setProgress(pct);
    },
    [videoId]
  );
  const handleComplete = reactExports.useCallback(async () => {
    await apiUpdateTrainingProgress(videoId, 100);
    setProgress(100);
    setIsComplete(true);
    ue.success("Training complete! Well done.", { icon: "🎉" });
  }, [videoId]);
  async function handleArchive() {
    if (!video) return;
    await apiArchiveTrainingVideo(video.id);
    ue.success(`"${video.title}" archived`);
    navigate({ to: "/training" });
  }
  async function handleDelete() {
    if (!video) return;
    await apiDeleteTrainingVideo(video.id);
    ue.success(`"${video.title}" deleted`);
    navigate({ to: "/training" });
  }
  async function handleReminder() {
    if (!video) return;
    await apiSendVideoTrainingReminder(video.id);
    ue.success("Reminder sent to staff who haven't completed this video");
    setReminderOpen(false);
  }
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, { hasImage: true, lines: 4 }) }) });
  }
  if (!video) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto text-center py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "h-12 w-12 text-muted-foreground mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-xl mb-2", children: "Video not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          onClick: () => navigate({ to: "/training" }),
          children: "Back to Training"
        }
      )
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          className: "gap-1.5 -ml-1",
          onClick: () => navigate({ to: "/training" }),
          "data-ocid": "training.video.back_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
            "Training Portal"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        VideoPlayer,
        {
          video,
          initialProgress: progress,
          onProgressUpdate: handleProgressUpdate,
          onComplete: handleComplete
        }
      ),
      !isDriveVideo(video) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Your progress" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
            Math.round(progress),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: progress, className: "h-2" }),
        isComplete && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-1.5 text-xs text-secondary font-medium mt-1",
            "data-ocid": "training.video.complete_badge",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
              "Training complete"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(PortalCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground", children: video.title }),
              isComplete && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-secondary/10 text-secondary border-secondary/20 text-xs gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }),
                "Completed"
              ] }),
              video.category && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-primary/20 text-xs", children: video.category })
            ] }),
            video.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: video.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-muted-foreground flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-3.5 w-3.5" }),
                video.uploadedBy
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
                formatDate(video.uploadedAt)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap shrink-0", children: [
            isDriveVideo(video) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                className: "gap-1.5 text-xs",
                onClick: () => window.open(video.videoUrl, "_blank", "noopener noreferrer"),
                "data-ocid": "training.video.drive_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" }),
                  "Open in Drive"
                ]
              }
            ),
            video.viewCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                className: "gap-1.5 text-xs pointer-events-none",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
                  video.viewCount,
                  " views"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(RoleGuard, { roles: ["SuperAdmin", "HRAdmin"], children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-4 border-t border-border/30 mt-4 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              className: "gap-1.5 text-xs",
              onClick: () => setReminderOpen(true),
              "data-ocid": "training.video.reminder_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-3.5 w-3.5" }),
                "Send Reminder"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              className: "gap-1.5 text-xs",
              onClick: () => setArchiveOpen(true),
              "data-ocid": "training.video.archive_button",
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
              className: "gap-1.5 text-xs text-destructive hover:text-destructive border-destructive/30 hover:bg-destructive/10",
              onClick: () => setDeleteOpen(true),
              "data-ocid": "training.video.delete_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
                "Delete"
              ]
            }
          )
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDialog,
      {
        open: reminderOpen,
        onOpenChange: setReminderOpen,
        title: "Send Training Reminder",
        description: `Send a notification to all staff who haven't completed "${video.title}"?`,
        confirmLabel: "Send Reminder",
        onConfirm: handleReminder
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDialog,
      {
        open: archiveOpen,
        onOpenChange: setArchiveOpen,
        title: "Archive Video",
        description: `Archive "${video.title}"? It will no longer be visible to staff.`,
        confirmLabel: "Archive",
        onConfirm: handleArchive
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDialog,
      {
        open: deleteOpen,
        onOpenChange: setDeleteOpen,
        title: "Delete Video",
        description: `Permanently delete "${video.title}"? This cannot be undone.`,
        confirmLabel: "Delete",
        variant: "destructive",
        onConfirm: handleDelete
      }
    )
  ] });
}
export {
  TrainingVideoPage as default
};
