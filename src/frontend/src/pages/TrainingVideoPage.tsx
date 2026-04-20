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
  resolveTrainingVideoDownloadUrl,
  resolveTrainingVideoEmbedUrl,
  resolveTrainingVideoOpenUrl,
} from "@/lib/backend-client";
import type { TrainingVideo } from "@/types";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  Archive,
  ArrowLeft,
  Bell,
  CheckCircle2,
  Download,
  ExternalLink,
  PlayCircle,
  Trash2,
  User,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

function formatDate(ts: bigint): string {
  return new Date(Number(ts)).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function isDriveVideo(video: TrainingVideo) {
  return video.storageType !== "Local";
}

function VideoViewer({
  video,
  initialProgress,
  onProgressUpdate,
  onComplete,
}: {
  video: TrainingVideo;
  initialProgress: number;
  onProgressUpdate: (pct: number) => void;
  onComplete: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastReportRef = useRef(0);
  const completedRef = useRef(false);

  useEffect(() => {
    const element = videoRef.current;
    if (!element || initialProgress <= 0 || !element.duration) return;
    element.currentTime = (initialProgress / 100) * element.duration;
  }, [initialProgress]);

  const handleTimeUpdate = useCallback(() => {
    const element = videoRef.current;
    if (!element || !element.duration) return;
    const pct = (element.currentTime / element.duration) * 100;
    if (pct >= 98 && !completedRef.current) {
      completedRef.current = true;
      onComplete();
    }
    if (pct - lastReportRef.current >= 5) {
      lastReportRef.current = pct;
      onProgressUpdate(pct);
    }
  }, [onComplete, onProgressUpdate]);

  if (isDriveVideo(video)) {
    return (
      <div className="overflow-hidden rounded-xl border border-border/40 bg-background/60">
        <iframe
          src={resolveTrainingVideoEmbedUrl(video)}
          title={video.title}
          className="aspect-video w-full border-0"
          allow="autoplay"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border/40 bg-background/60">
      <video
        ref={videoRef}
        src={resolveTrainingVideoOpenUrl(video)}
        controls
        preload="metadata"
        className="aspect-video w-full"
        onTimeUpdate={handleTimeUpdate}
      >
        <track kind="captions" />
      </video>
    </div>
  );
}

export default function TrainingVideoPage() {
  const { id } = useParams({ strict: false }) as { id: string };
  const navigate = useNavigate();
  const videoId = Number(id);

  const [video, setVideo] = useState<TrainingVideo | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [reminderOpen, setReminderOpen] = useState(false);

  useEffect(() => {
    Promise.all([apiGetTrainingVideo(videoId), apiGetMyVideoProgress(videoId)])
      .then(([videoData, progressData]) => {
        setVideo(videoData);
        setProgress(progressData?.progressPercent ?? 0);
      })
      .finally(() => setLoading(false));
  }, [videoId]);

  const completed = progress >= 98;

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
    toast.success("Training marked complete.");
  }, [videoId]);

  const viewerNote = useMemo(() => {
    if (!video) return "";
    return isDriveVideo(video)
      ? "This video is streamed through Google Drive preview, just like the original portal flow."
      : "This local upload follows the internal viewer flow and keeps progress tracking active while you watch.";
  }, [video]);

  if (loading) {
    return (
      <AppShell>
        <div className="mx-auto max-w-5xl">
          <SkeletonCard hasImage lines={5} />
        </div>
      </AppShell>
    );
  }

  if (!video) {
    return (
      <AppShell>
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
          </Button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl space-y-5">
        <Button
          type="button"
          variant="ghost"
          size="sm"
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
      />
      <ConfirmDialog
        open={archiveOpen}
        onOpenChange={setArchiveOpen}
        title="Archive video"
        description={`Archive "${video.title}" from the training portal?`}
        confirmLabel="Archive"
        onConfirm={async () => {
          await apiArchiveTrainingVideo(video.id);
          toast.success(`"${video.title}" archived`);
          navigate({ to: "/training" });
        }}
      />
      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete video"
        description={`Delete "${video.title}" permanently?`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={async () => {
          await apiDeleteTrainingVideo(video.id);
          toast.success(`"${video.title}" deleted`);
          navigate({ to: "/training" });
        }}
      />
    </AppShell>
  );
}
