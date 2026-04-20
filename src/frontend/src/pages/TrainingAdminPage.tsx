import { AppShell } from "@/components/AppShell";
import { EmptyState } from "@/components/EmptyState";
import { PortalCard } from "@/components/PortalCard";
import { RoleGuard } from "@/components/RoleGuard";
import { SkeletonCard } from "@/components/SkeletonCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  apiGetAdminTrainingOverview,
=======
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  apiGetAdminTrainingOverview,
  apiGetVideoWatchStats,
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
  apiSendVideoTrainingReminder,
} from "@/lib/backend-client";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Bell,
  BookOpen,
<<<<<<< HEAD
=======
  CheckCircle2,
  Eye,
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
  FileText,
  GraduationCap,
  LayoutGrid,
  TrendingUp,
  Video,
} from "lucide-react";
<<<<<<< HEAD
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

=======
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ── Types ─────────────────────────────────────────────────────────────────────

>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
interface VideoStat {
  id: number;
  title: string;
  eligibleCount: number;
  watchedCount: number;
  completionPct: number;
  isMandatory: boolean;
  incompleteUsers: string[];
}

interface DocStat {
  id: number;
  title: string;
  eligibleCount: number;
  openedCount: number;
  openedPct: number;
  isMandatory: boolean;
<<<<<<< HEAD
  incompleteUsers: string[];
=======
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
}

interface AdminOverview {
  totalVideos: number;
  totalDocuments: number;
  totalStaff: number;
  videoStats: VideoStat[];
  docStats: DocStat[];
}

<<<<<<< HEAD
function StatCard({
  label,
  value,
  sub,
  icon,
}: {
  label: string;
  value: string | number;
  sub: string;
  icon: React.ReactNode;
}) {
  return (
    <PortalCard className="h-full">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <div>
          <div className="font-display text-2xl font-bold text-foreground">
            {value}
          </div>
          <div className="text-sm font-medium text-foreground">{label}</div>
          <div className="text-xs text-muted-foreground">{sub}</div>
        </div>
      </div>
    </PortalCard>
  );
}

=======
// ── Stat Card ─────────────────────────────────────────────────────────────────

function StatCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="glass-card rounded-xl p-4 flex items-start gap-3">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
        {icon}
      </div>
      <div>
        <div className="text-2xl font-display font-bold text-foreground leading-tight">
          {value}
        </div>
        <div className="text-xs font-medium text-foreground/80">{label}</div>
        {sub && <div className="text-[11px] text-muted-foreground">{sub}</div>}
      </div>
    </div>
  );
}

// ── Completion Badge ──────────────────────────────────────────────────────────

function PctBadge({ pct }: { pct: number }) {
  const color =
    pct >= 80
      ? "bg-secondary/10 text-secondary border-secondary/20"
      : pct >= 50
        ? "bg-amber-500/10 text-amber-600 border-amber-400/20"
        : "bg-destructive/10 text-destructive border-destructive/20";
  return (
    <Badge className={`text-xs font-semibold ${color}`}>
      {Math.round(pct)}%
    </Badge>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
export default function TrainingAdminPage() {
  const navigate = useNavigate();
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [sendingReminder, setSendingReminder] = useState<number | null>(null);

  useEffect(() => {
<<<<<<< HEAD
    apiGetAdminTrainingOverview()
      .then((data) => setOverview(data as AdminOverview))
      .finally(() => setLoading(false));
  }, []);

  const overallVideoCompletion = useMemo(() => {
    if (!overview?.videoStats.length) return 0;
    return Math.round(
      overview.videoStats.reduce((sum, item) => sum + item.completionPct, 0) /
        overview.videoStats.length,
    );
  }, [overview]);

  const overallDocCompletion = useMemo(() => {
    if (!overview?.docStats.length) return 0;
    return Math.round(
      overview.docStats.reduce((sum, item) => sum + item.openedPct, 0) /
        overview.docStats.length,
    );
  }, [overview]);

  async function sendReminder(videoId: number, title: string) {
=======
    Promise.all([apiGetAdminTrainingOverview(), apiGetVideoWatchStats()])
      .then(([ov]) => {
        setOverview(ov as AdminOverview);
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleSendReminder(videoId: number, title: string) {
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
    setSendingReminder(videoId);
    try {
      await apiSendVideoTrainingReminder(videoId);
      toast.success(`Reminder sent for "${title}"`);
<<<<<<< HEAD
=======
    } catch {
      toast.error("Failed to send reminder");
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
    } finally {
      setSendingReminder(null);
    }
  }

  return (
    <AppShell>
      <RoleGuard
        roles={["SuperAdmin", "HRAdmin"]}
        fallback={
<<<<<<< HEAD
          <div className="py-16 text-center text-muted-foreground">
=======
          <div className="text-center py-16 text-muted-foreground">
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
            You do not have permission to view this page.
          </div>
        }
      >
        <div className="space-y-6">
<<<<<<< HEAD
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
=======
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
            <div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
<<<<<<< HEAD
                className="-ml-1 mb-2 gap-1.5"
                onClick={() => navigate({ to: "/training" })}
              >
                <ArrowLeft className="h-4 w-4" />
                Training portal
              </Button>
              <div className="flex items-center gap-2">
                <LayoutGrid className="h-5 w-5 text-primary" />
                <h1 className="font-display text-2xl font-bold text-foreground">
                  Training Dashboard
                </h1>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Completion summaries for training videos and document
                acknowledgements.
=======
                className="gap-1.5 -ml-1 mb-2"
                onClick={() => navigate({ to: "/training" })}
                data-ocid="training.admin.back_button"
              >
                <ArrowLeft className="h-4 w-4" />
                Training Portal
              </Button>
              <div className="flex items-center gap-2">
                <LayoutGrid className="h-5 w-5 text-primary" />
                <h1 className="font-display font-bold text-xl text-foreground">
                  Training Dashboard
                </h1>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">
                Completion rates, engagement stats and reminders
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
              </p>
            </div>
          </div>

          {loading ? (
<<<<<<< HEAD
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                "dashboard-skeleton-1",
                "dashboard-skeleton-2",
                "dashboard-skeleton-3",
                "dashboard-skeleton-4",
              ].map((key) => (
                <SkeletonCard key={key} lines={3} />
              ))}
            </div>
          ) : !overview ? (
            <EmptyState
              icon={<LayoutGrid className="h-7 w-7" />}
              title="No dashboard data available"
              description="Upload training videos or documents to start tracking engagement."
            />
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <StatCard
                  icon={<Video className="h-5 w-5" />}
                  label="Training Videos"
                  value={overview.totalVideos}
                  sub="active items"
                />
                <StatCard
                  icon={<FileText className="h-5 w-5" />}
                  label="Documents"
                  value={overview.totalDocuments}
                  sub="active items"
=======
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <SkeletonCard lines={2} />
              <SkeletonCard lines={2} />
              <SkeletonCard lines={2} />
            </div>
          ) : overview ? (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <StatCard
                  icon={<Video className="h-5 w-5" />}
                  label="Total Videos"
                  value={overview.totalVideos}
                  sub="Active uploads"
                />
                <StatCard
                  icon={<FileText className="h-5 w-5" />}
                  label="Total Documents"
                  value={overview.totalDocuments}
                  sub="Active uploads"
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
                />
                <StatCard
                  icon={<GraduationCap className="h-5 w-5" />}
                  label="Eligible Staff"
                  value={overview.totalStaff}
<<<<<<< HEAD
                  sub="active staff pool"
                />
                <StatCard
                  icon={<TrendingUp className="h-5 w-5" />}
                  label="Overall Completion"
                  value={`${Math.round((overallVideoCompletion + overallDocCompletion) / 2)}%`}
                  sub="videos and documents"
                />
              </div>

              <Tabs defaultValue="videos">
                <TabsList>
                  <TabsTrigger value="videos">
                    <Video className="mr-1.5 h-4 w-4" />
                    Video Dashboard
                  </TabsTrigger>
                  <TabsTrigger value="documents">
                    <BookOpen className="mr-1.5 h-4 w-4" />
                    Documents Dashboard
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="videos" className="space-y-5">
                  <div className="grid gap-4 lg:grid-cols-4">
                    <StatCard
                      icon={<Video className="h-5 w-5" />}
                      label="Videos"
                      value={overview.totalVideos}
                      sub="current catalogue"
                    />
                    <StatCard
                      icon={<GraduationCap className="h-5 w-5" />}
                      label="Eligible Views"
                      value={overview.videoStats.reduce(
                        (sum, item) => sum + item.eligibleCount,
                        0,
                      )}
                      sub="all assigned staff"
                    />
                    <StatCard
                      icon={<Bell className="h-5 w-5" />}
                      label="Watched"
                      value={overview.videoStats.reduce(
                        (sum, item) => sum + item.watchedCount,
                        0,
                      )}
                      sub="staff starts/completions"
                    />
                    <StatCard
                      icon={<TrendingUp className="h-5 w-5" />}
                      label="Overall Completion"
                      value={`${overallVideoCompletion}%`}
                      sub="average across videos"
                    />
                  </div>

                  <PortalCard
                    title="Completion Summary"
                    subtitle="Mirrors the original training dashboard structure."
                  >
                    <div className="space-y-4">
                      {overview.videoStats.map((video) => (
                        <div
                          key={video.id}
                          className="rounded-lg border border-border/40 bg-background/40 p-4"
                        >
                          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <div className="font-display text-lg font-semibold text-foreground">
                                  {video.title}
                                </div>
                                {video.isMandatory && (
                                  <Badge className="bg-destructive/10 text-destructive border-destructive/20">
                                    Mandatory
                                  </Badge>
                                )}
                              </div>
                              <div className="mt-1 text-sm text-muted-foreground">
                                {video.watchedCount} of {video.eligibleCount}{" "}
                                eligible staff completed this video.
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="min-w-16 text-right text-sm font-semibold text-foreground">
                                {video.completionPct}%
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="gap-1.5"
                                disabled={sendingReminder === video.id}
                                onClick={() =>
                                  sendReminder(video.id, video.title)
                                }
                              >
                                <Bell className="h-4 w-4" />
                                {sendingReminder === video.id
                                  ? "Sending..."
                                  : "Remind"}
                              </Button>
                            </div>
                          </div>
                          <Progress
                            value={video.completionPct}
                            className="mt-4 h-2.5"
                          />
                        </div>
                      ))}
                    </div>
                  </PortalCard>

                  <PortalCard
                    title="Mandatory Incomplete"
                    subtitle="Staff still missing mandatory video completion."
                  >
                    {overview.videoStats.every(
                      (video) =>
                        !video.isMandatory ||
                        video.incompleteUsers.length === 0,
                    ) ? (
                      <div className="text-sm text-muted-foreground">
                        All mandatory videos are currently completed.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {overview.videoStats
                          .filter(
                            (video) =>
                              video.isMandatory &&
                              video.incompleteUsers.length > 0,
                          )
                          .map((video) => (
                            <div
                              key={`missing-${video.id}`}
                              className="rounded-lg border border-border/40 bg-background/40 p-4"
                            >
                              <div className="font-medium text-foreground">
                                {video.title}
                              </div>
                              <div className="mt-2 flex flex-wrap gap-2">
                                {video.incompleteUsers.map((name) => (
                                  <Badge
                                    key={`${video.id}-${name}`}
                                    variant="outline"
                                  >
                                    {name}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ))}
=======
                  sub="All active employees"
                />
                <StatCard
                  icon={<TrendingUp className="h-5 w-5" />}
                  label="Avg. Completion"
                  value={
                    overview.videoStats.length
                      ? `${Math.round(
                          overview.videoStats.reduce(
                            (acc, v) => acc + v.completionPct,
                            0,
                          ) / overview.videoStats.length,
                        )}%`
                      : "—"
                  }
                  sub="Across all videos"
                />
              </div>

              {/* Tabs */}
              <Tabs defaultValue="videos" data-ocid="training.admin.tabs">
                <TabsList data-ocid="training.admin.tabs_list">
                  <TabsTrigger
                    value="videos"
                    data-ocid="training.admin.tab.videos"
                  >
                    <Video className="h-4 w-4 mr-1.5" />
                    Videos
                  </TabsTrigger>
                  <TabsTrigger
                    value="documents"
                    data-ocid="training.admin.tab.documents"
                  >
                    <BookOpen className="h-4 w-4 mr-1.5" />
                    Documents
                  </TabsTrigger>
                </TabsList>

                {/* Videos Table */}
                <TabsContent value="videos" className="mt-4">
                  <PortalCard>
                    {overview.videoStats.length === 0 ? (
                      <EmptyState
                        icon={<Video className="h-6 w-6" />}
                        title="No video data yet"
                        description="Upload training videos to see completion stats here."
                        data-ocid="training.admin.video.empty_state"
                      />
                    ) : (
                      <div className="overflow-x-auto">
                        <Table data-ocid="training.admin.video.table">
                          <TableHeader>
                            <TableRow>
                              <TableHead>Title</TableHead>
                              <TableHead className="text-right">
                                Eligible
                              </TableHead>
                              <TableHead className="text-right">
                                Watched
                              </TableHead>
                              <TableHead className="text-right">
                                Completion
                              </TableHead>
                              <TableHead className="text-right">
                                Mandatory Not Done
                              </TableHead>
                              <TableHead className="text-right">
                                Actions
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {overview.videoStats.map((v, i) => (
                              <TableRow
                                key={v.id}
                                data-ocid={`training.admin.video.row.${i + 1}`}
                              >
                                <TableCell>
                                  <div className="flex items-center gap-2 min-w-0">
                                    <span className="font-medium text-sm text-foreground line-clamp-1">
                                      {v.title}
                                    </span>
                                    {v.isMandatory && (
                                      <Badge className="text-[10px] bg-destructive/10 text-destructive border-destructive/20 shrink-0">
                                        Mandatory
                                      </Badge>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell className="text-right text-sm">
                                  {v.eligibleCount}
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                                    <span className="text-sm">
                                      {v.watchedCount}
                                    </span>
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground" />
                                    <PctBadge pct={v.completionPct} />
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">
                                  {v.isMandatory &&
                                  v.incompleteUsers.length > 0 ? (
                                    <span className="text-xs text-destructive font-medium">
                                      {v.incompleteUsers.length} staff
                                    </span>
                                  ) : (
                                    <span className="text-xs text-muted-foreground">
                                      —
                                    </span>
                                  )}
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="text-xs gap-1.5 h-7"
                                    disabled={sendingReminder === v.id}
                                    onClick={() =>
                                      handleSendReminder(v.id, v.title)
                                    }
                                    data-ocid={`training.admin.video.reminder_button.${i + 1}`}
                                  >
                                    <Bell className="h-3 w-3" />
                                    {sendingReminder === v.id
                                      ? "Sending..."
                                      : "Remind"}
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
                      </div>
                    )}
                  </PortalCard>
                </TabsContent>

<<<<<<< HEAD
                <TabsContent value="documents" className="space-y-5">
                  <div className="grid gap-4 lg:grid-cols-4">
                    <StatCard
                      icon={<FileText className="h-5 w-5" />}
                      label="Documents"
                      value={overview.totalDocuments}
                      sub="current library"
                    />
                    <StatCard
                      icon={<GraduationCap className="h-5 w-5" />}
                      label="Eligible Views"
                      value={overview.docStats.reduce(
                        (sum, item) => sum + item.eligibleCount,
                        0,
                      )}
                      sub="staff assigned to read"
                    />
                    <StatCard
                      icon={<BookOpen className="h-5 w-5" />}
                      label="Opened"
                      value={overview.docStats.reduce(
                        (sum, item) => sum + item.openedCount,
                        0,
                      )}
                      sub="acknowledged documents"
                    />
                    <StatCard
                      icon={<TrendingUp className="h-5 w-5" />}
                      label="Overall Completion"
                      value={`${overallDocCompletion}%`}
                      sub="average open rate"
                    />
                  </div>

                  <PortalCard
                    title="Document Summary"
                    subtitle="Built from the original documents dashboard flow."
                  >
                    <div className="space-y-4">
                      {overview.docStats.map((doc) => (
                        <div
                          key={doc.id}
                          className="rounded-lg border border-border/40 bg-background/40 p-4"
                        >
                          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <div className="font-display text-lg font-semibold text-foreground">
                                  {doc.title}
                                </div>
                                {doc.isMandatory && (
                                  <Badge className="bg-destructive/10 text-destructive border-destructive/20">
                                    Mandatory
                                  </Badge>
                                )}
                              </div>
                              <div className="mt-1 text-sm text-muted-foreground">
                                {doc.openedCount} of {doc.eligibleCount}{" "}
                                eligible staff opened this document.
                              </div>
                            </div>
                            <div className="min-w-16 text-right text-sm font-semibold text-foreground">
                              {doc.openedPct}%
                            </div>
                          </div>
                          <Progress
                            value={doc.openedPct}
                            className="mt-4 h-2.5"
                          />
                        </div>
                      ))}
                    </div>
                  </PortalCard>

                  <PortalCard
                    title="Mandatory Incomplete"
                    subtitle="Users still missing mandatory document acknowledgements."
                  >
                    {overview.docStats.every(
                      (doc) =>
                        !doc.isMandatory || doc.incompleteUsers.length === 0,
                    ) ? (
                      <div className="text-sm text-muted-foreground">
                        All mandatory documents are currently opened by their
                        assigned staff.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {overview.docStats
                          .filter(
                            (doc) =>
                              doc.isMandatory && doc.incompleteUsers.length > 0,
                          )
                          .map((doc) => (
                            <div
                              key={`doc-missing-${doc.id}`}
                              className="rounded-lg border border-border/40 bg-background/40 p-4"
                            >
                              <div className="font-medium text-foreground">
                                {doc.title}
                              </div>
                              <div className="mt-2 flex flex-wrap gap-2">
                                {doc.incompleteUsers.map((name) => (
                                  <Badge
                                    key={`${doc.id}-${name}`}
                                    variant="outline"
                                  >
                                    {name}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ))}
=======
                {/* Documents Table */}
                <TabsContent value="documents" className="mt-4">
                  <PortalCard>
                    {overview.docStats.length === 0 ? (
                      <EmptyState
                        icon={<BookOpen className="h-6 w-6" />}
                        title="No document data yet"
                        description="Upload training documents to see engagement stats here."
                        data-ocid="training.admin.doc.empty_state"
                      />
                    ) : (
                      <div className="overflow-x-auto">
                        <Table data-ocid="training.admin.doc.table">
                          <TableHeader>
                            <TableRow>
                              <TableHead>Title</TableHead>
                              <TableHead className="text-right">
                                Eligible
                              </TableHead>
                              <TableHead className="text-right">
                                Opened
                              </TableHead>
                              <TableHead className="text-right">
                                Open Rate
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {overview.docStats.map((d, i) => (
                              <TableRow
                                key={d.id}
                                data-ocid={`training.admin.doc.row.${i + 1}`}
                              >
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium text-sm text-foreground line-clamp-1">
                                      {d.title}
                                    </span>
                                    {d.isMandatory && (
                                      <Badge className="text-[10px] bg-destructive/10 text-destructive border-destructive/20 shrink-0">
                                        Mandatory
                                      </Badge>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell className="text-right text-sm">
                                  {d.eligibleCount}
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                                    <span className="text-sm">
                                      {d.openedCount}
                                    </span>
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">
                                  <PctBadge pct={d.openedPct} />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
                      </div>
                    )}
                  </PortalCard>
                </TabsContent>
              </Tabs>
            </>
<<<<<<< HEAD
=======
          ) : (
            <EmptyState
              icon={<LayoutGrid className="h-7 w-7" />}
              title="No training data available"
              description="Upload videos and documents to see analytics here."
              data-ocid="training.admin.empty_state"
            />
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
          )}
        </div>
      </RoleGuard>
    </AppShell>
  );
}
