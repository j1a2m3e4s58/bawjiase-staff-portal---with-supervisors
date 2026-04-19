import { AppShell } from "@/components/AppShell";
import { EmptyState } from "@/components/EmptyState";
import { PortalCard } from "@/components/PortalCard";
import { RoleGuard } from "@/components/RoleGuard";
import { SkeletonCard } from "@/components/SkeletonCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  apiSendVideoTrainingReminder,
} from "@/lib/backend-client";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Bell,
  BookOpen,
  CheckCircle2,
  Eye,
  FileText,
  GraduationCap,
  LayoutGrid,
  TrendingUp,
  Video,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ── Types ─────────────────────────────────────────────────────────────────────

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
}

interface AdminOverview {
  totalVideos: number;
  totalDocuments: number;
  totalStaff: number;
  videoStats: VideoStat[];
  docStats: DocStat[];
}

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

export default function TrainingAdminPage() {
  const navigate = useNavigate();
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [sendingReminder, setSendingReminder] = useState<number | null>(null);

  useEffect(() => {
    Promise.all([apiGetAdminTrainingOverview(), apiGetVideoWatchStats()])
      .then(([ov]) => {
        setOverview(ov as AdminOverview);
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleSendReminder(videoId: number, title: string) {
    setSendingReminder(videoId);
    try {
      await apiSendVideoTrainingReminder(videoId);
      toast.success(`Reminder sent for "${title}"`);
    } catch {
      toast.error("Failed to send reminder");
    } finally {
      setSendingReminder(null);
    }
  }

  return (
    <AppShell>
      <RoleGuard
        roles={["SuperAdmin", "HRAdmin"]}
        fallback={
          <div className="text-center py-16 text-muted-foreground">
            You do not have permission to view this page.
          </div>
        }
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
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
              </p>
            </div>
          </div>

          {loading ? (
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
                />
                <StatCard
                  icon={<GraduationCap className="h-5 w-5" />}
                  label="Eligible Staff"
                  value={overview.totalStaff}
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
                      </div>
                    )}
                  </PortalCard>
                </TabsContent>

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
                      </div>
                    )}
                  </PortalCard>
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <EmptyState
              icon={<LayoutGrid className="h-7 w-7" />}
              title="No training data available"
              description="Upload videos and documents to see analytics here."
              data-ocid="training.admin.empty_state"
            />
          )}
        </div>
      </RoleGuard>
    </AppShell>
  );
}
