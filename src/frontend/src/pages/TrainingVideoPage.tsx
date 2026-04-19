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
} from "@/lib/backend-client";
import type { TrainingVideo } from "@/types";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  Archive,
  ArrowLeft,
  Bell,
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

function formatDate(ts: bigint): string {
  return new Date(Number(ts)).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

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
  video: TrainingVideo;
  initialProgress: number;
  onProgressUpdate: (pct: number) => void;
  onComplete: () => void;
}

function VideoPlayer({
  video,
  initialProgress,
  onProgressUpdate,
  onComplete,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastReportRef = useRef(0);
  const completedRef = useRef(false);

  useEffect(() => {
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
    return (
      <div className="relative aspect-video bg-foreground/5 rounded-xl overflow-hidden">
        <iframe
          src={getDriveEmbedUrl(video)}
          title={video.title}
          className="w-full h-full border-0"
          allow="autoplay"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-video bg-foreground/5 rounded-xl overflow-hidden">
      <video
        ref={videoRef}
        src={video.videoUrl}
        controls
        className="w-full h-full"
        onTimeUpdate={handleTimeUpdate}
        preload="metadata"
      >
        <track kind="captions" />
      </video>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function TrainingVideoPage() {
  const { id } = useParams({ strict: false }) as { id: string };
  const navigate = useNavigate();

  const [video, setVideo] = useState<TrainingVideo | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const [archiveOpen, setArchiveOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [reminderOpen, setReminderOpen] = useState(false);

  const videoId = Number(id);

  useEffect(() => {
    Promise.all([apiGetTrainingVideo(videoId), apiGetMyVideoProgress(videoId)])
      .then(([v, prog]) => {
        setVideo(v);
        if (prog) {
          setProgress(prog.progressPercent);
          setIsComplete(prog.isComplete);
        }
      })
      .finally(() => setLoading(false));
  }, [videoId]);

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

  if (loading) {
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto space-y-4">
          <SkeletonCard hasImage lines={4} />
        </div>
      </AppShell>
    );
  }

  if (!video) {
    return (
      <AppShell>
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
          </Button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-5">
        {/* Back */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
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
      />
      <ConfirmDialog
        open={archiveOpen}
        onOpenChange={setArchiveOpen}
        title="Archive Video"
        description={`Archive "${video.title}"? It will no longer be visible to staff.`}
        confirmLabel="Archive"
        onConfirm={handleArchive}
      />
      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Video"
        description={`Permanently delete "${video.title}"? This cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
      />
    </AppShell>
  );
}
