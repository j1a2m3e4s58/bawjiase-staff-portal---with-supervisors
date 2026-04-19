import { AppShell } from "@/components/AppShell";
import { EmptyState } from "@/components/EmptyState";
import { PortalCard } from "@/components/PortalCard";
import { RoleGuard } from "@/components/RoleGuard";
import { SkeletonCard } from "@/components/SkeletonCard";
import { StatCard } from "@/components/StatCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { apiGetAnnouncements, apiGetStaffStats } from "@/lib/backend-client";
import type { AnnouncementWithPoll, PollOption, StaffStats } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  Building2,
  GitBranchPlus,
  Megaphone,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ── Category helpers ──────────────────────────────────────────────────────────

function getCategoryFromAuthorDept(authorId: string): string {
  if (authorId.includes("user-2")) return "HR";
  if (authorId.includes("user-3")) return "IT";
  return "General";
}

const CATEGORY_COLORS: Record<string, string> = {
  HR: "bg-secondary/20 text-secondary border-secondary/30",
  IT: "bg-accent/20 text-accent-foreground border-accent/30",
  General: "bg-primary/15 text-primary border-primary/30",
};

// ── Date grouping ─────────────────────────────────────────────────────────────

function getDateLabel(ts: bigint): string {
  const d = new Date(Number(ts));
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 86400000);
  const itemDay = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  if (itemDay.getTime() === today.getTime()) return "Today";
  if (itemDay.getTime() === yesterday.getTime()) return "Yesterday";
  return d.toLocaleDateString("en-GH", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function groupByDate(items: AnnouncementWithPoll[]) {
  const groups: Record<string, AnnouncementWithPoll[]> = {};
  for (const item of items) {
    const label = getDateLabel(item.createdAt);
    if (!groups[label]) groups[label] = [];
    groups[label].push(item);
  }
  return groups;
}

// ── Poll inline voting ─────────────────────────────────────────────────────────

function PollWidget({
  poll,
  announcementId,
}: {
  poll: NonNullable<AnnouncementWithPoll["poll"]>;
  announcementId: number;
}) {
  const [voted, setVoted] = useState<number | null>(poll.userVotedOptionId);
  const [options, setOptions] = useState<PollOption[]>(poll.options);
  const [total, setTotal] = useState(poll.totalVotes);

  function handleVote(optionId: number) {
    if (voted !== null || !poll.isActive) return;
    setVoted(optionId);
    setTotal((t) => t + 1);
    setOptions((opts) =>
      opts.map((o) => (o.id === optionId ? { ...o, votes: o.votes + 1 } : o)),
    );
  }

  return (
    <div
      className="mt-3 pt-3 border-t border-border/30 space-y-2"
      data-ocid={`dashboard.announcement.poll.${announcementId}`}
    >
      <p className="text-xs font-semibold text-foreground/80">
        {poll.question}
      </p>
      <div className="space-y-1.5">
        {options.map((opt) => {
          const pct = total > 0 ? Math.round((opt.votes / total) * 100) : 0;
          const isVoted = voted === opt.id;
          return (
            <button
              key={String(opt.id)}
              type="button"
              onClick={() => handleVote(opt.id)}
              disabled={voted !== null || !poll.isActive}
              className={`w-full text-left rounded-lg overflow-hidden border transition-smooth ${
                isVoted
                  ? "border-primary/50 bg-primary/10"
                  : "border-border/40 hover:border-primary/30 hover:bg-muted/40"
              } disabled:cursor-default`}
              data-ocid={`dashboard.poll.option.${opt.id}`}
            >
              <div className="relative px-3 py-1.5">
                {voted !== null && (
                  <div
                    className="absolute inset-y-0 left-0 bg-primary/10 rounded-lg transition-all"
                    style={{ width: `${pct}%` }}
                  />
                )}
                <div className="relative flex items-center justify-between">
                  <span className="text-xs text-foreground/90">{opt.text}</span>
                  {voted !== null && (
                    <span className="text-xs font-bold text-primary">
                      {pct}%
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
      <p className="text-[10px] text-muted-foreground">
        {total} {total === 1 ? "vote" : "votes"} ·{" "}
        {poll.isActive ? "Poll open" : "Poll closed"}
      </p>
    </div>
  );
}

// ── Announcement Card ─────────────────────────────────────────────────────────

function AnnouncementCard({
  ann,
  onDismiss,
}: {
  ann: AnnouncementWithPoll;
  onDismiss: (id: number) => void;
}) {
  const category = getCategoryFromAuthorDept(ann.authorId);
  const colorClass = CATEGORY_COLORS[category] ?? CATEGORY_COLORS.General;
  const date = new Date(Number(ann.createdAt)).toLocaleDateString("en-GH", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      className="glass-card rounded-xl p-4 group relative"
      data-ocid={`dashboard.announcement.item.${ann.id}`}
    >
      <button
        type="button"
        onClick={() => onDismiss(ann.id)}
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-smooth p-1 rounded-md hover:bg-muted/60 text-muted-foreground"
        aria-label="Dismiss announcement"
        data-ocid={`dashboard.announcement.dismiss.${ann.id}`}
      >
        <X className="h-3.5 w-3.5" />
      </button>
      <div className="flex items-start gap-2 mb-2 pr-6">
        <Badge
          variant="outline"
          className={`text-[10px] px-2 py-0.5 border ${colorClass}`}
        >
          {category}
        </Badge>
        <span className="text-[10px] text-muted-foreground ml-auto pt-0.5 whitespace-nowrap">
          {date}
        </span>
      </div>
      <h4 className="font-display font-semibold text-sm text-foreground leading-snug mb-1">
        {ann.title}
      </h4>
      <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
        {ann.content}
      </p>
      <p className="text-[10px] text-muted-foreground/70 mt-2">
        By {ann.authorName}
      </p>
      {ann.poll && <PollWidget poll={ann.poll} announcementId={ann.id} />}
    </div>
  );
}

// ── Chart colours ─────────────────────────────────────────────────────────────

const PIE_COLORS = [
  "oklch(var(--chart-1))",
  "oklch(var(--chart-2))",
  "oklch(var(--chart-3))",
  "oklch(var(--chart-4))",
  "oklch(var(--chart-5))",
];

// ── Leadership Snapshot ───────────────────────────────────────────────────────

function LeadershipSnapshot({
  stats,
  announcementsCount,
}: {
  stats: StaffStats;
  announcementsCount: number;
}) {
  const topBranch = Object.entries(stats.byBranch).sort(
    ([, a], [, b]) => b - a,
  )[0];
  const topDept = Object.entries(stats.byDepartment).sort(
    ([, a], [, b]) => b - a,
  )[0];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {[
        {
          label: "Top Active Branch",
          value: topBranch?.[0] ?? "—",
          sub: `${topBranch?.[1] ?? 0} staff`,
          icon: <Building2 className="h-4 w-4 text-primary" />,
        },
        {
          label: "Largest Department",
          value: topDept?.[0] ?? "—",
          sub: `${topDept?.[1] ?? 0} members`,
          icon: <Users className="h-4 w-4 text-secondary" />,
        },
        {
          label: "Active Announcements",
          value: String(announcementsCount),
          sub: "currently visible",
          icon: <Megaphone className="h-4 w-4 text-accent-foreground" />,
        },
      ].map((item) => (
        <div
          key={item.label}
          className="glass-card rounded-xl px-4 py-3 flex items-center gap-3"
        >
          <div className="w-9 h-9 rounded-lg bg-muted/60 flex items-center justify-center flex-shrink-0">
            {item.icon}
          </div>
          <div className="min-w-0">
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
              {item.label}
            </div>
            <div className="text-sm font-display font-bold text-foreground truncate">
              {item.value}
            </div>
            <div className="text-[10px] text-muted-foreground">{item.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Dashboard Page ─────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [stats, setStats] = useState<StaffStats | null>(null);
  const [announcements, setAnnouncements] = useState<AnnouncementWithPoll[]>(
    [],
  );
  const [dismissed, setDismissed] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([apiGetStaffStats(), apiGetAnnouncements()]).then(([s, a]) => {
      setStats(s);
      setAnnouncements(a);
      setLoading(false);
    });
  }, []);

  function handleDismiss(id: number) {
    setDismissed((d) => new Set([...d, id]));
  }

  const visibleAnnouncements = announcements.filter(
    (a) => !a.isDismissed && !dismissed.has(a.id),
  );

  const branchChartData = stats
    ? Object.entries(stats.byBranch).map(([name, value]) => ({
        name: name.replace("KASOA ", "K."),
        value,
      }))
    : [];

  const deptChartData = stats
    ? Object.entries(stats.byDepartment)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 6)
        .map(([name, value]) => ({ name, value }))
    : [];

  const grouped = groupByDate(visibleAnnouncements);
  const dateGroups = Object.keys(grouped);

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-6" data-ocid="dashboard.page">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              Dashboard
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Welcome back — here's your portal overview
            </p>
          </div>
          <RoleGuard roles={["SuperAdmin", "HRAdmin"]}>
            <Button
              asChild
              variant="outline"
              size="sm"
              data-ocid="dashboard.manage_announcements.link"
            >
              <Link to="/announcements">
                <Megaphone className="h-4 w-4 mr-2" />
                Manage Announcements
              </Link>
            </Button>
          </RoleGuard>
        </div>

        {/* Stats Row */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCard key={String(i)} lines={2} />
            ))}
          </div>
        ) : (
          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            data-ocid="dashboard.stats.section"
          >
            <StatCard
              icon={<Users className="h-5 w-5 text-primary" />}
              value={stats?.active ?? 0}
              label="Active Staff"
              trend={2}
              trendLabel="this month"
              data-ocid="dashboard.stat.active_staff"
            />
            <StatCard
              icon={<Building2 className="h-5 w-5 text-secondary" />}
              value={Object.keys(stats?.byBranch ?? {}).length}
              label="Branch Coverage"
              data-ocid="dashboard.stat.branch_coverage"
              iconClassName="bg-secondary/10"
            />
            <StatCard
              icon={<Activity className="h-5 w-5 text-accent-foreground" />}
              value={announcements.length}
              label="Open Announcements"
              data-ocid="dashboard.stat.open_announcements"
              iconClassName="bg-accent/10"
            />
            <StatCard
              icon={<GitBranchPlus className="h-5 w-5 text-chart-4" />}
              value={`${Math.round(((stats?.active ?? 0) / (stats?.total ?? 1)) * 100)}%`}
              label="Active Resolution Rate"
              trend={5}
              trendLabel="vs last month"
              data-ocid="dashboard.stat.resolution_rate"
              iconClassName="bg-[oklch(var(--chart-4)/0.15)]"
            />
          </div>
        )}

        {/* Charts */}
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <SkeletonCard lines={6} hasImage />
            <SkeletonCard lines={6} hasImage />
          </div>
        ) : (
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-4"
            data-ocid="dashboard.charts.section"
          >
            <PortalCard
              title="Branch Staff Distribution"
              subtitle="Active staff count per branch"
              data-ocid="dashboard.chart.branch"
            >
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={branchChartData}
                  layout="vertical"
                  margin={{ left: 16, right: 16 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(var(--border))"
                    horizontal={false}
                  />
                  <XAxis
                    type="number"
                    tick={{
                      fontSize: 11,
                      fill: "oklch(var(--muted-foreground))",
                    }}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{
                      fontSize: 11,
                      fill: "oklch(var(--muted-foreground))",
                    }}
                    width={90}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "oklch(var(--card))",
                      border: "1px solid oklch(var(--border))",
                      borderRadius: 8,
                      fontSize: 12,
                      color: "oklch(var(--foreground))",
                    }}
                  />
                  <Bar
                    dataKey="value"
                    fill="oklch(var(--primary))"
                    radius={[0, 4, 4, 0]}
                    name="Staff"
                  />
                </BarChart>
              </ResponsiveContainer>
            </PortalCard>

            <PortalCard
              title="Department Distribution"
              subtitle="Top departments by headcount"
              data-ocid="dashboard.chart.department"
            >
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={deptChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {deptChartData.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "oklch(var(--card))",
                      border: "1px solid oklch(var(--border))",
                      borderRadius: 8,
                      fontSize: 12,
                      color: "oklch(var(--foreground))",
                    }}
                  />
                  <Legend
                    formatter={(value: string) => (
                      <span
                        style={{
                          fontSize: 11,
                          color: "oklch(var(--muted-foreground))",
                        }}
                      >
                        {value}
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </PortalCard>
          </div>
        )}

        {/* Leadership Snapshot */}
        {loading ? (
          <SkeletonCard lines={2} />
        ) : (
          stats && (
            <div data-ocid="dashboard.leadership.section">
              <h2 className="font-display font-semibold text-base text-foreground mb-3">
                Leadership Snapshot
              </h2>
              <LeadershipSnapshot
                stats={stats}
                announcementsCount={visibleAnnouncements.length}
              />
            </div>
          )
        )}

        {/* News Feed */}
        <div data-ocid="dashboard.announcements.section">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-semibold text-base text-foreground">
              Announcements &amp; News Feed
            </h2>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-xs"
              data-ocid="dashboard.view_all.link"
            >
              <Link to="/announcements">View all</Link>
            </Button>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <SkeletonCard key={String(i)} lines={3} />
              ))}
            </div>
          ) : visibleAnnouncements.length === 0 ? (
            <EmptyState
              icon={<Megaphone className="h-10 w-10" />}
              title="No announcements"
              description="There are no active announcements right now."
              data-ocid="dashboard.announcements.empty_state"
            />
          ) : (
            <div className="space-y-6">
              {dateGroups.map((group) => (
                <div key={group}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {group}
                    </span>
                    <div className="flex-1 h-px bg-border/40" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                    {grouped[group].map((ann) => (
                      <AnnouncementCard
                        key={String(ann.id)}
                        ann={ann}
                        onDismiss={handleDismiss}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
