import { AppShell } from "@/components/AppShell";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { PortalCard } from "@/components/PortalCard";
import { RoleGuard } from "@/components/RoleGuard";
import { SkeletonCard } from "@/components/SkeletonCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  apiArchiveTrainingVideo,
  apiDeleteTrainingVideo,
  apiGetMyVideoProgress,
  apiGetTrainingVideo,
  apiSendVideoTrainingReminder,
  apiUpdateTrainingProgress,
<<<<<<< HEAD
  resolveTrainingVideoDownloadUrl,
  resolveTrainingVideoEmbedUrl,
  resolveTrainingVideoOpenUrl,
=======
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
} from "@/lib/backend-client";
import type { TrainingVideo } from "@/types";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  Archive,
  ArrowLeft,
  Bell,
<<<<<<< HEAD
  CheckCircle2,
  Download,
  ExternalLink,
  PlayCircle,
  Trash2,
  User,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

=======
  Calendar,
  CheckCircle2,
  Download,
  ExternalLink,
  Trash2,
  User,
  Video,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ── Helpers ───────────────────────────────────────────────────────────────────

>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
function formatDate(ts: bigint): string {
  return new Date(Number(ts)).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

<<<<<<< HEAD
function isDriveVideo(video: TrainingVideo) {
  return video.storageType !== "Local";
}

function VideoViewer({
  video,
  initialProgress,
  onProgressUpdate,
  onComplete,
}: {
=======
function extractDriveId(input: string): string {
  // Handle full Drive URLs: /file/d/{id}/view or ?id={id}
  const match =
    input.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ??
    input.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  return match?.[1] ?? input.trim();
}

function isDriveVideo(video: TrainingVideo): boolean {
  return (
    video.videoUrl.includes("drive.google.com") ||
    video.videoUrl.startsWith("DRIVE:")
  );
}

function getDriveEmbedUrl(video: TrainingVideo): string {
  const rawId = video.videoUrl.startsWith("DRIVE:")
    ? video.videoUrl.replace("DRIVE:", "")
    : extractDriveId(video.videoUrl);
  return `https://drive.google.com/file/d/${rawId}/preview`;
}

// ── Video Player ──────────────────────────────────────────────────────────────

interface VideoPlayerProps {
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
  video: TrainingVideo;
  initialProgress: number;
  onProgressUpdate: (pct: number) => void;
  onComplete: () => void;
<<<<<<< HEAD
}) {
=======
}

function VideoPlayer({
  video,
  initialProgress,
  onProgressUpdate,
  onComplete,
}: VideoPlayerProps) {
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastReportRef = useRef(0);
  const completedRef = useRef(false);

  useEffect(() => {
<<<<<<< HEAD
    const element = videoRef.current;
    if (!element || initialProgress <= 0 || !element.duration) return;
    element.currentTime = (initialProgress / 100) * element.duration;
  }, [initialProgress]);

  const handleTimeUpdate = useCallback(() => {
    const element = videoRef.current;
    if (!element || !element.duration) return;
    const pct = (element.currentTime / element.duration) * 100;
=======
    if (videoRef.current && initialProgress > 0) {
      const duration = videoRef.current.duration;
      if (duration) {
        videoRef.current.currentTime = (initialProgress / 100) * duration;
      }
    }
  }, [initialProgress]);

  const handleTimeUpdate = useCallback(() => {
    const el = videoRef.current;
    if (!el || !el.duration) return;
    const pct = (el.currentTime / el.duration) * 100;
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
    if (pct >= 98 && !completedRef.current) {
      completedRef.current = true;
      onComplete();
    }
    if (pct - lastReportRef.current >= 5) {
      lastReportRef.current = pct;
      onProgressUpdate(pct);
    }
<<<<<<< HEAD
  }, [onComplete, onProgressUpdate]);

  if (isDriveVideo(video)) {
    return (
      <div className="overflow-hidden rounded-xl border border-border/40 bg-background/60">
        <iframe
          src={resolveTrainingVideoEmbedUrl(video)}
          title={video.title}
          className="aspect-video w-full border-0"
=======
  }, [onProgressUpdate, onComplete]);

  if (isDriveVideo(video)) {
    return (
      <div className="relative aspect-video bg-foreground/5 rounded-xl overflow-hidden">
        <iframe
          src={getDriveEmbedUrl(video)}
          title={video.title}
          className="w-full h-full border-0"
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
          allow="autoplay"
          allowFullScreen
        />
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <div className="overflow-hidden rounded-xl border border-border/40 bg-background/60">
      <video
        ref={videoRef}
        src={resolveTrainingVideoOpenUrl(video)}
        controls
        preload="metadata"
        className="aspect-video w-full"
        onTimeUpdate={handleTimeUpdate}
=======
    <div className="relative aspect-video bg-foreground/5 rounded-xl overflow-hidden">
      <video
        ref={videoRef}
        src={video.videoUrl}
        controls
        className="w-full h-full"
        onTimeUpdate={handleTimeUpdate}
        preload="metadata"
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
      >
        <track kind="captions" />
      </video>
    </div>
  );
}

<<<<<<< HEAD
export default function TrainingVideoPage() {
  const { id } = useParams({ strict: false }) as { id: string };
  const navigate = useNavigate();
  const videoId = Number(id);
=======
// ── Main Page ─────────────────────────────────────────────────────────────────

export default function TrainingVideoPage() {
  const { id } = useParams({ strict: false }) as { id: string };
  const navigate = useNavigate();
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58

  const [video, setVideo] = useState<TrainingVideo | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
<<<<<<< HEAD
=======
  const [isComplete, setIsComplete] = useState(false);

>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [reminderOpen, setReminderOpen] = useState(false);

<<<<<<< HEAD
  useEffect(() => {
    Promise.all([apiGetTrainingVideo(videoId), apiGetMyVideoProgress(videoId)])
      .then(([videoData, progressData]) => {
        setVideo(videoData);
        setProgress(progressData?.progressPercent ?? 0);
=======
  const videoId = Number(id);

  useEffect(() => {
    Promise.all([apiGetTrainingVideo(videoId), apiGetMyVideoProgress(videoId)])
      .then(([v, prog]) => {
        setVideo(v);
        if (prog) {
          setProgress(prog.progressPercent);
          setIsComplete(prog.isComplete);
        }
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
      })
      .finally(() => setLoading(false));
  }, [videoId]);

<<<<<<< HEAD
  const completed = progress >= 98;

=======
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
  const handleProgressUpdate = useCallback(
    async (pct: number) => {
      await apiUpdateTrainingProgress(videoId, pct);
      setProgress(pct);
    },
    [videoId],
  );

  const handleComplete = useCallback(async () => {
    await apiUpdateTrainingProgress(videoId, 100);
    setProgress(100);
<<<<<<< HEAD
    toast.success("Training marked complete.");
  }, [videoId]);

  const viewerNote = useMemo(() => {
    if (!video) return "";
    return isDriveVideo(video)
      ? "This video is streamed through Google Drive preview, just like the original portal flow."
      : "This local upload follows the internal viewer flow and keeps progress tracking active while you watch.";
  }, [video]);
=======
    setIsComplete(true);
    toast.success("Training complete! Well done.", { icon: "🎉" });
  }, [videoId]);

  async function handleArchive() {
    if (!video) return;
    await apiArchiveTrainingVideo(video.id);
    toast.success(`"${video.title}" archived`);
    navigate({ to: "/training" });
  }

  async function handleDelete() {
    if (!video) return;
    await apiDeleteTrainingVideo(video.id);
    toast.success(`"${video.title}" deleted`);
    navigate({ to: "/training" });
  }

  async function handleReminder() {
    if (!video) return;
    await apiSendVideoTrainingReminder(video.id);
    toast.success("Reminder sent to staff who haven't completed this video");
    setReminderOpen(false);
  }
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58

  if (loading) {
    return (
      <AppShell>
<<<<<<< HEAD
        <div className="mx-auto max-w-5xl">
          <SkeletonCard hasImage lines={5} />
=======
        <div className="max-w-4xl mx-auto space-y-4">
          <SkeletonCard hasImage lines={4} />
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
        </div>
      </AppShell>
    );
  }

  if (!video) {
    return (
      <AppShell>
<<<<<<< HEAD
        <div className="mx-auto max-w-3xl text-center py-16">
          <PlayCircle className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
          <h2 className="font-display text-xl font-semibold text-foreground">
            Training video not found
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            This training item is unavailable or you no longer have permission
            to view it.
          </p>
          <Button
            type="button"
            className="mt-5"
            onClick={() => navigate({ to: "/training" })}
          >
            Back to portal
=======
        <div className="max-w-4xl mx-auto text-center py-16">
          <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-display font-semibold text-xl mb-2">
            Video not found
          </h2>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate({ to: "/training" })}
          >
            Back to Training
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
          </Button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
<<<<<<< HEAD
      <div className="mx-auto max-w-6xl space-y-5">
=======
      <div className="max-w-4xl mx-auto space-y-5">
        {/* Back */}
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
        <Button
          type="button"
          variant="ghost"
          size="sm"
<<<<<<< HEAD
          className="-ml-1 gap-1.5"
          onClick={() => navigate({ to: "/training" })}
        >
          <ArrowLeft className="h-4 w-4" />
          Training portal
        </Button>

        <div className="grid gap-5 xl:grid-cols-[1.5fr_.9fr]">
          <div className="space-y-5">
            <VideoViewer
              video={video}
              initialProgress={progress}
              onProgressUpdate={handleProgressUpdate}
              onComplete={handleComplete}
            />

            <PortalCard>
              <div className="space-y-4">
                <div className="flex flex-wrap items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <h1 className="font-display text-2xl font-bold text-foreground">
                      {video.title}
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {video.description}
                    </p>
                  </div>
                  <Badge
                    className={
                      completed
                        ? "bg-secondary/10 text-secondary border-secondary/20"
                        : "bg-primary/10 text-primary border-primary/20"
                    }
                  >
                    {completed ? "Completed" : "In progress"}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">
                    {video.visibility === "Department"
                      ? video.department || "Department"
                      : "General"}
                  </Badge>
                  {video.isMandatory && (
                    <Badge className="bg-destructive/10 text-destructive border-destructive/20">
                      Mandatory
                    </Badge>
                  )}
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    {video.category}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Your completion progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2.5" />
                  {completed && (
                    <div className="flex items-center gap-1.5 text-xs font-medium text-secondary">
                      <CheckCircle2 className="h-4 w-4" />
                      You have completed this training video.
                    </div>
                  )}
                </div>
              </div>
            </PortalCard>
          </div>

          <div className="space-y-5">
            <PortalCard
              title="Training Details"
              subtitle="Structured from the original training view flow."
            >
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Uploaded by</span>
                  <span className="font-medium text-foreground">
                    {video.uploadedBy}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Uploaded on</span>
                  <span className="font-medium text-foreground">
                    {formatDate(video.uploadedAt)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">
                    Eligible audience
                  </span>
                  <span className="font-medium text-foreground">
                    {video.visibility === "Department"
                      ? video.department || "Department"
                      : "All staff"}
                  </span>
                </div>
                <div className="rounded-lg border border-border/40 bg-background/50 p-3 text-xs leading-6 text-muted-foreground">
                  {viewerNote}
                </div>
              </div>
            </PortalCard>

            <PortalCard title="Actions">
              <div className="space-y-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={() =>
                    window.open(
                      resolveTrainingVideoOpenUrl(video),
                      "_blank",
                      "noopener,noreferrer",
                    )
                  }
                >
                  <ExternalLink className="h-4 w-4" />
                  Open in full view
                </Button>
                {video.allowDownload && (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={() =>
                      window.open(
                        resolveTrainingVideoDownloadUrl(video),
                        "_blank",
                        "noopener,noreferrer",
                      )
                    }
                  >
                    <Download className="h-4 w-4" />
                    Download video
                  </Button>
                )}
              </div>
            </PortalCard>

            <RoleGuard roles={["SuperAdmin", "HRAdmin"]}>
              <PortalCard title="Admin Controls">
                <div className="space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={() => setReminderOpen(true)}
                  >
                    <Bell className="h-4 w-4" />
                    Send reminder
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={() => setArchiveOpen(true)}
                  >
                    <Archive className="h-4 w-4" />
                    Archive video
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-start gap-2 border-destructive/30 text-destructive hover:bg-destructive/10"
                    onClick={() => setDeleteOpen(true)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete video
                  </Button>
                </div>
              </PortalCard>
            </RoleGuard>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={reminderOpen}
        onOpenChange={setReminderOpen}
        title="Send reminder"
        description={`Send a reminder for "${video.title}" to staff who have not completed it yet?`}
        confirmLabel="Send Reminder"
        onConfirm={async () => {
          await apiSendVideoTrainingReminder(video.id);
          toast.success("Reminder sent.");
          setReminderOpen(false);
        }}
=======
          className="gap-1.5 -ml-1"
          onClick={() => navigate({ to: "/training" })}
          data-ocid="training.video.back_button"
        >
          <ArrowLeft className="h-4 w-4" />
          Training Portal
        </Button>

        {/* Video Player */}
        <VideoPlayer
          video={video}
          initialProgress={progress}
          onProgressUpdate={handleProgressUpdate}
          onComplete={handleComplete}
        />

        {/* Progress bar */}
        {!isDriveVideo(video) && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Your progress</span>
              <span className="font-medium text-foreground">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            {isComplete && (
              <div
                className="flex items-center gap-1.5 text-xs text-secondary font-medium mt-1"
                data-ocid="training.video.complete_badge"
              >
                <CheckCircle2 className="h-4 w-4" />
                Training complete
              </div>
            )}
          </div>
        )}

        {/* Metadata */}
        <PortalCard>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-display font-bold text-xl text-foreground">
                  {video.title}
                </h1>
                {isComplete && (
                  <Badge className="bg-secondary/10 text-secondary border-secondary/20 text-xs gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Completed
                  </Badge>
                )}
                {video.category && (
                  <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                    {video.category}
                  </Badge>
                )}
              </div>
              {video.description && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {video.description}
                </p>
              )}
              <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5" />
                  {video.uploadedBy}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(video.uploadedAt)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap shrink-0">
              {isDriveVideo(video) && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-xs"
                  onClick={() =>
                    window.open(video.videoUrl, "_blank", "noopener noreferrer")
                  }
                  data-ocid="training.video.drive_button"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Open in Drive
                </Button>
              )}
              {video.viewCount > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-xs pointer-events-none"
                >
                  <Download className="h-3.5 w-3.5" />
                  {video.viewCount} views
                </Button>
              )}
            </div>
          </div>

          <RoleGuard roles={["SuperAdmin", "HRAdmin"]}>
            <div className="flex items-center gap-2 pt-4 border-t border-border/30 mt-4 flex-wrap">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1.5 text-xs"
                onClick={() => setReminderOpen(true)}
                data-ocid="training.video.reminder_button"
              >
                <Bell className="h-3.5 w-3.5" />
                Send Reminder
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1.5 text-xs"
                onClick={() => setArchiveOpen(true)}
                data-ocid="training.video.archive_button"
              >
                <Archive className="h-3.5 w-3.5" />
                Archive
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1.5 text-xs text-destructive hover:text-destructive border-destructive/30 hover:bg-destructive/10"
                onClick={() => setDeleteOpen(true)}
                data-ocid="training.video.delete_button"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </Button>
            </div>
          </RoleGuard>
        </PortalCard>
      </div>

      {/* Confirm dialogs */}
      <ConfirmDialog
        open={reminderOpen}
        onOpenChange={setReminderOpen}
        title="Send Training Reminder"
        description={`Send a notification to all staff who haven't completed "${video.title}"?`}
        confirmLabel="Send Reminder"
        onConfirm={handleReminder}
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
      />
      <ConfirmDialog
        open={archiveOpen}
        onOpenChange={setArchiveOpen}
<<<<<<< HEAD
        title="Archive video"
        description={`Archive "${video.title}" from the training portal?`}
        confirmLabel="Archive"
        onConfirm={async () => {
          await apiArchiveTrainingVideo(video.id);
          toast.success(`"${video.title}" archived`);
          navigate({ to: "/training" });
        }}
=======
        title="Archive Video"
        description={`Archive "${video.title}"? It will no longer be visible to staff.`}
        confirmLabel="Archive"
        onConfirm={handleArchive}
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
      />
      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
<<<<<<< HEAD
        title="Delete video"
        description={`Delete "${video.title}" permanently?`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={async () => {
          await apiDeleteTrainingVideo(video.id);
          toast.success(`"${video.title}" deleted`);
          navigate({ to: "/training" });
        }}
=======
        title="Delete Video"
        description={`Permanently delete "${video.title}"? This cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
      />
    </AppShell>
  );
}
