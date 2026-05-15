import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  refreshAgmState,
  useAgmArchives,
  useAgmRegistrations,
  useAgmSettings,
  useAgmShareholders,
  useAgmSyncStatus,
} from "@/lib/agm-portal";
import { Link } from "@tanstack/react-router";
import {
  Archive,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileBarChart2,
  Landmark,
  PieChart,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  Upload,
  UserPlus,
  Users,
} from "lucide-react";

function MetricCard({
  label,
  value,
  hint,
  icon: Icon,
}: {
  label: string;
  value: string;
  hint: string;
  icon: typeof Users;
}) {
  return (
    <Card className="border-border/60 bg-card/95">
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          <p className="font-display text-2xl font-bold text-foreground">
            {value}
          </p>
          <p className="text-xs text-muted-foreground">{hint}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function SummaryLine({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border/50 bg-card/70 px-4 py-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold text-foreground">{value}</span>
    </div>
  );
}

function QuickAction({
  to,
  icon: Icon,
  label,
  description,
}: {
  to: string;
  icon: typeof Users;
  label: string;
  description: string;
}) {
  return (
    <Link
      to={to}
      className="group rounded-xl border border-border/60 bg-card/90 p-4 transition-smooth hover:border-primary/35 hover:bg-primary/5"
    >
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-foreground">{label}</p>
          <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
        </div>
        <p className="text-xs leading-5 text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
}

export default function AgmPortalPage() {
  const settings = useAgmSettings();
  const archives = useAgmArchives();
  const registrations = useAgmRegistrations();
  const shareholders = useAgmShareholders();
  const syncStatus = useAgmSyncStatus();

  const checkedIn = registrations.filter((item) => item.checkedIn).length;
  const proxyCount = registrations.filter((item) => item.mode === "Proxy").length;
  const inPersonCount = registrations.length - proxyCount;
  const importedShares = shareholders.reduce(
    (sum, item) => sum + item.shareholding,
    0,
  );
  const representedShares = registrations.reduce(
    (sum, item) => sum + item.shareholding,
    0,
  );
  const registrationRate =
    shareholders.length > 0 ? (registrations.length / shareholders.length) * 100 : 0;
  const checkInRate =
    shareholders.length > 0 ? (checkedIn / shareholders.length) * 100 : 0;
  const quorumReached = registrationRate >= settings.quorumThreshold;
  const latestArchive = archives[0] ?? null;

  return (
    <AppShell>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6" data-ocid="agm.page">
        <div
          className={`rounded-2xl border px-4 py-3 text-sm ${
            syncStatus.mode === "synced"
              ? "border-primary/25 bg-primary/10 text-primary"
              : syncStatus.mode === "local-only"
                ? "border-amber-500/25 bg-amber-500/10 text-amber-200"
                : "border-border/60 bg-muted/20 text-foreground"
          }`}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium">
                {syncStatus.mode === "synced"
                  ? "Shared AGM sync is active"
                  : syncStatus.mode === "local-only"
                    ? "AGM is using local fallback mode"
                    : syncStatus.mode === "syncing"
                      ? "AGM sync is in progress"
                      : "AGM sync is standing by"}
              </p>
              <p className="mt-1 text-xs opacity-90">
                {syncStatus.message}
                {syncStatus.lastSyncedAt
                  ? ` Last synced ${new Date(syncStatus.lastSyncedAt).toLocaleString()}.`
                  : ""}
              </p>
            </div>
            <Button variant="outline" className="min-h-10" onClick={() => void refreshAgmState()}>
              Refresh Sync
            </Button>
          </div>
        </div>

        <section className="overflow-hidden rounded-3xl border border-border/60 bg-card/95">
          <div className="grid gap-6 px-6 py-7 lg:grid-cols-[1.6fr_0.9fr] lg:px-8">
            <div className="space-y-4">
              <Badge className="rounded-full border border-primary/20 bg-primary/15 px-3 py-1 text-primary">
                AGM Portal
              </Badge>
              <div className="space-y-2">
                <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Annual General Meeting workspace
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                  The AGM module now runs as a year-aware workspace inside the Staff Portal,
                  with shared data for imports, registration, reporting, board view, and
                  archive history.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="min-h-11 rounded-lg px-5">
                  <Link to="/agm/registration">Open Registration Desk</Link>
                </Button>
                <Button asChild variant="outline" className="min-h-11 rounded-lg px-5">
                  <Link to="/agm/reports">Open AGM Reports</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-muted/20 p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Active AGM cycle
                  </p>
                  <p className="mt-2 text-lg font-semibold text-foreground">
                    {settings.agmName}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Landmark className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-5 space-y-3">
                <SummaryLine label="Portal route" value="/agm" />
                <SummaryLine label="Active AGM year" value={settings.yearLabel} />
                <SummaryLine
                  label="Quorum position"
                  value={quorumReached ? "On track" : "Below target"}
                />
                <SummaryLine
                  label="Archive history"
                  value={`${archives.length} snapshots`}
                />
              </div>
            </div>
          </div>
        </section>

        <section
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
          data-ocid="agm.metrics"
        >
          <MetricCard
            label="Imported Shareholders"
            value={shareholders.length.toLocaleString()}
            hint="Current live shareholder register"
            icon={Landmark}
          />
          <MetricCard
            label="Registrations"
            value={registrations.length.toLocaleString()}
            hint="Live AGM registration records"
            icon={CheckCircle2}
          />
          <MetricCard
            label="Checked In"
            value={checkedIn.toLocaleString()}
            hint="Attendees already checked in"
            icon={UserPlus}
          />
          <MetricCard
            label="History"
            value={archives.length.toLocaleString()}
            hint="Archived AGM year snapshots"
            icon={ShieldCheck}
          />
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.35fr_0.95fr]">
          <Card className="border-border/60 bg-card/95">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display text-lg">
                <PieChart className="h-5 w-5 text-primary" />
                Active AGM year summary
              </CardTitle>
              <CardDescription>
                A clean readout of the AGM cycle that is currently live in the portal.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <MetricCard
                  label="Registration Rate"
                  value={`${registrationRate.toFixed(1)}%`}
                  hint={`${registrations.length} of ${shareholders.length} imported shareholders`}
                  icon={TrendingUp}
                />
                <MetricCard
                  label="Check-In Rate"
                  value={`${checkInRate.toFixed(1)}%`}
                  hint={`${checkedIn} attendees checked in so far`}
                  icon={CheckCircle2}
                />
                <MetricCard
                  label="Represented Shares"
                  value={representedShares.toLocaleString()}
                  hint={`of ${importedShares.toLocaleString()} imported shares`}
                  icon={Landmark}
                />
                <MetricCard
                  label="Proxy Mix"
                  value={proxyCount.toLocaleString()}
                  hint={`${inPersonCount} in-person registrations`}
                  icon={Users}
                />
              </div>

              <div className="grid gap-3 lg:grid-cols-2">
                <SummaryLine label="AGM name" value={settings.agmName} />
                <SummaryLine label="Active year" value={settings.yearLabel} />
                <SummaryLine label="Venue" value={settings.venue} />
                <SummaryLine label="AGM date" value={settings.agmDate} />
                <SummaryLine
                  label="Quorum threshold"
                  value={`${settings.quorumThreshold}%`}
                />
                <SummaryLine
                  label="Board refresh default"
                  value={settings.boardAutoRefresh ? "On" : "Off"}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/95">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display text-lg">
                <TrendingUp className="h-5 w-5 text-primary" />
                AGM quick actions
              </CardTitle>
              <CardDescription>
                Move quickly between the operational pages driving the current AGM year.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              <QuickAction
                to="/agm/registration"
                icon={UserPlus}
                label="Registration Desk"
                description="Handle attendee registration and verification."
              />
              <QuickAction
                to="/agm/shareholders"
                icon={Users}
                label="Shareholders"
                description="Browse and manage registered shareholder records."
              />
              <QuickAction
                to="/agm/import"
                icon={Upload}
                label="Import Data"
                description="Bring AGM shareholder sheets into the portal."
              />
              <QuickAction
                to="/agm/reports"
                icon={FileBarChart2}
                label="Reports"
                description="Open attendance and AGM summary reporting."
              />
              <QuickAction
                to="/agm/board"
                icon={TrendingUp}
                label="Board View"
                description="Review the board-facing AGM summary."
              />
              <QuickAction
                to="/agm/admin"
                icon={CalendarDays}
                label="AGM Admin"
                description="Configure AGM year settings and archive history."
              />
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
          <Card className="border-border/60 bg-card/95">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display text-lg">
                <Archive className="h-5 w-5 text-primary" />
                AGM cycle snapshot
              </CardTitle>
              <CardDescription>
                The live module now has an active year, a quorum picture, and a recoverable archive path.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="rounded-xl border border-border/50 bg-muted/20 px-4 py-3">
                <span className="font-medium text-foreground">{settings.agmName}</span> is the active AGM workspace.
              </div>
              <div className="rounded-xl border border-border/50 bg-muted/20 px-4 py-3">
                Venue: <span className="font-medium text-foreground">{settings.venue}</span>
              </div>
              <div className="rounded-xl border border-border/50 bg-muted/20 px-4 py-3">
                Quorum threshold:{" "}
                <span className="font-medium text-foreground">{settings.quorumThreshold}%</span>
                {" "}•{" "}
                {settings.yearArchived ? "Archived year flag is on." : "Current year is live."}
              </div>
              <div className="rounded-xl border border-border/50 bg-muted/20 px-4 py-3">
                Registration health:{" "}
                <span className="font-medium text-foreground">
                  {quorumReached ? "quorum trend is healthy" : "quorum needs attention"}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/95">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display text-lg">
                <Clock3 className="h-5 w-5 text-primary" />
                Year archive overview
              </CardTitle>
              <CardDescription>
                Keep track of the latest archived AGM cycle and the live archive inventory.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <MetricCard
                  label="Archived Years"
                  value={archives.length.toLocaleString()}
                  hint="Recoverable AGM snapshots"
                  icon={Archive}
                />
                <MetricCard
                  label="Current Year State"
                  value={settings.yearArchived ? "Archived" : "Live"}
                  hint={settings.yearLocked ? "Year lock is on" : "Year lock is off"}
                  icon={settings.yearArchived ? ShieldAlert : ShieldCheck}
                />
              </div>

              {latestArchive ? (
                <div className="rounded-2xl border border-border/60 bg-muted/15 p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline">{latestArchive.settings.yearLabel}</Badge>
                    <span className="text-sm font-semibold text-foreground">
                      {latestArchive.settings.agmName}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Archived {new Date(latestArchive.archivedAt).toLocaleString()}
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <SummaryLine
                      label="Registrations"
                      value={latestArchive.registrations.length.toLocaleString()}
                    />
                    <SummaryLine
                      label="Shareholders"
                      value={latestArchive.shareholders.length.toLocaleString()}
                    />
                  </div>
                  {latestArchive.note ? (
                    <p className="mt-3 text-sm leading-6 text-foreground/85">
                      {latestArchive.note}
                    </p>
                  ) : null}
                </div>
              ) : (
                <div className="rounded-2xl border border-border/60 bg-muted/15 px-4 py-10 text-center text-sm text-muted-foreground">
                  No AGM year has been archived yet. Use AGM Admin when you want to preserve the current cycle.
                </div>
              )}

              <Button asChild variant="outline" className="min-h-11">
                <Link to="/agm/admin">Open AGM Admin History</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
