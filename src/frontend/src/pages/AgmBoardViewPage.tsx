import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  saveAgmSettings,
  useAgmRegistrations,
  useAgmSettings,
  useAgmShareholders,
} from "@/lib/agm-portal";
import {
  Download,
  Expand,
  RefreshCw,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

function exportBoardCsv(
  metrics: Array<[string, string]>,
  latestRegistrations: Array<{ name: string; type: string; time: string }>,
) {
  const rows: string[][] = [
    ["Generated", new Date().toISOString()],
    ...metrics,
    [],
    ["Recent Registration", "Type", "Time"],
    ...latestRegistrations.map((item) => [item.name, item.type, item.time]),
  ];
  const csv = rows
    .map((row) =>
      row.map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`).join(","),
    )
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `agm-board-summary-${Date.now()}.csv`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function MetricTile({
  label,
  value,
  icon: Icon,
  enlarged = false,
}: {
  label: string;
  value: string;
  icon: typeof Users;
  enlarged?: boolean;
}) {
  return (
    <Card className="border-border/60 bg-card/95">
      <CardHeader className="pb-3">
        <CardTitle
          className={`flex items-center gap-2 ${enlarged ? "text-lg" : "text-base"}`}
        >
          <Icon className={`${enlarged ? "h-5 w-5" : "h-4 w-4"} text-primary`} />
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p
          className={`font-display font-bold text-foreground ${
            enlarged ? "text-5xl" : "text-3xl"
          }`}
        >
          {value}
        </p>
      </CardContent>
    </Card>
  );
}

export default function AgmBoardViewPage() {
  const shareholders = useAgmShareholders();
  const registrations = useAgmRegistrations();
  const settings = useAgmSettings();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [liveRefresh, setLiveRefresh] = useState(settings.boardAutoRefresh);
  const [refreshTick, setRefreshTick] = useState(0);

  useEffect(() => {
    setLiveRefresh(settings.boardAutoRefresh);
  }, [settings.boardAutoRefresh]);

  const summary = useMemo(() => {
    const total = shareholders.length;
    const registered = registrations.length;
    const checkedIn = registrations.filter((item) => item.checkedIn).length;
    const proxy = registrations.filter((item) => item.mode === "Proxy").length;
    const inPerson = registrations.filter((item) => item.mode === "In Person").length;
    const attendanceRate = total > 0 ? (checkedIn / total) * 100 : 0;
    const quorumRequired = settings.quorumThreshold;
    const quorumReached = attendanceRate >= quorumRequired;
    return {
      total,
      registered,
      checkedIn,
      proxy,
      inPerson,
      attendanceRate,
      quorumRequired,
      quorumReached,
    };
  }, [registrations, shareholders, refreshTick, settings.quorumThreshold]);

  const recentRegistrations = useMemo(
    () =>
      [...registrations]
        .sort(
          (left, right) =>
            new Date(right.registeredAt).getTime() -
            new Date(left.registeredAt).getTime(),
        )
        .slice(0, 5)
        .map((item) => ({
          name: item.shareholderName,
          type: item.mode,
          time: new Date(item.registeredAt).toLocaleString(),
        })),
    [registrations, refreshTick],
  );

  const metrics: Array<[string, string]> = [
    ["Total Shareholders", summary.total.toLocaleString()],
    ["Registered", summary.registered.toLocaleString()],
    ["Checked In", summary.checkedIn.toLocaleString()],
    ["In Person", summary.inPerson.toLocaleString()],
    ["Proxy", summary.proxy.toLocaleString()],
    ["Attendance Rate", `${summary.attendanceRate.toFixed(1)}%`],
    ["Quorum Required", `${summary.quorumRequired}%`],
    ["Quorum Status", summary.quorumReached ? "Reached" : "Not Reached"],
  ];

  useEffect(() => {
    const onFullscreenChange = () =>
      setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  useEffect(() => {
    if (!liveRefresh) return;
    const interval = window.setInterval(() => {
      setRefreshTick((value) => value + 1);
    }, 8000);
    return () => window.clearInterval(interval);
  }, [liveRefresh]);

  const handleExport = () => {
    exportBoardCsv(metrics, recentRegistrations);
  };

  const handleFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }
    await document.documentElement.requestFullscreen();
  };

  return (
    <AppShell>
      <div
        className={`mx-auto space-y-6 ${
          isFullscreen
            ? "max-w-none min-h-screen bg-background px-3 py-5 sm:px-6 lg:px-10"
            : "max-w-7xl"
        }`}
        data-ocid="agm.board.page"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Chairman / Board View
            </p>
            <h1 className="font-display text-2xl font-bold text-foreground">
              {settings.agmName} Executive Summary
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Live board-facing attendance and quorum view for the {settings.yearLabel} AGM inside the Staff Portal.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <Button
              variant="outline"
              className="min-h-[44px] gap-2"
              onClick={handleExport}
            >
              <Download className="h-4 w-4" />
              Export Board CSV
            </Button>
            <Button
              variant="outline"
              className="min-h-[44px] gap-2"
              onClick={() =>
                setLiveRefresh((value) => {
                  const next = !value;
                  saveAgmSettings({ boardAutoRefresh: next });
                  return next;
                })
              }
            >
              <RefreshCw className={`h-4 w-4 ${liveRefresh ? "animate-spin" : ""}`} />
              {liveRefresh ? "Live Refresh On" : "Live Refresh Off"}
            </Button>
            <Button
              variant="outline"
              className="min-h-[44px] gap-2"
              onClick={() => void handleFullscreen()}
            >
              <Expand className="h-4 w-4" />
              {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </Button>
          </div>
        </div>

        <Card className="border-primary/25 bg-primary/10">
          <CardContent
            className={`grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4 ${
              isFullscreen ? "lg:gap-6 lg:p-8" : ""
            }`}
          >
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-primary/80">
                Quorum Status
              </p>
              <p
                className={`mt-2 font-display font-bold text-foreground ${
                  isFullscreen ? "text-4xl" : "text-2xl"
                }`}
              >
                {summary.quorumReached ? "Reached" : "Not Reached"}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Attendance {summary.attendanceRate.toFixed(1)}% · Required {summary.quorumRequired}%
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-primary/80">
                Registered
              </p>
              <p
                className={`mt-2 font-display font-bold text-foreground ${
                  isFullscreen ? "text-5xl" : "text-3xl"
                }`}
              >
                {summary.registered.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-primary/80">
                Checked In
              </p>
              <p
                className={`mt-2 font-display font-bold text-foreground ${
                  isFullscreen ? "text-5xl" : "text-3xl"
                }`}
              >
                {summary.checkedIn.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-primary/80">
                Proxy
              </p>
              <p
                className={`mt-2 font-display font-bold text-foreground ${
                  isFullscreen ? "text-5xl" : "text-3xl"
                }`}
              >
                {summary.proxy.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 lg:grid-cols-4">
          <MetricTile
            label="Total Shareholders"
            value={summary.total.toLocaleString()}
            icon={Users}
            enlarged={isFullscreen}
          />
          <MetricTile
            label="In-Person Registrations"
            value={summary.inPerson.toLocaleString()}
            icon={UserCheck}
            enlarged={isFullscreen}
          />
          <MetricTile
            label="Live Attendance Rate"
            value={`${summary.attendanceRate.toFixed(1)}%`}
            icon={TrendingUp}
            enlarged={isFullscreen}
          />
          <MetricTile
            label="Proxy Registrations"
            value={summary.proxy.toLocaleString()}
            icon={ShieldCheck}
            enlarged={isFullscreen}
          />
        </div>

        <div
          className={`grid gap-4 ${
            isFullscreen ? "xl:grid-cols-[1.5fr_1fr]" : "lg:grid-cols-[1.4fr_1fr]"
          }`}
        >
          <Card className="border-border/60 bg-card/95">
            <CardHeader>
              <CardTitle className={isFullscreen ? "text-lg" : "text-base"}>
                Board Highlights
              </CardTitle>
            </CardHeader>
            <CardContent
              className={`space-y-3 text-muted-foreground ${
                isFullscreen ? "text-base" : "text-sm"
              }`}
            >
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <span>AGM Scope</span>
                <span className="font-semibold text-foreground">{settings.venue}</span>
              </div>
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <span>Represented Shares</span>
                <span className="font-semibold text-foreground">
                  {registrations
                    .reduce((sum, item) => sum + item.shareholding, 0)
                    .toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <span>Total Imported Shares</span>
                <span className="font-semibold text-foreground">
                  {shareholders.reduce((sum, item) => sum + item.shareholding, 0).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Quorum Position ({settings.yearLabel})</span>
                <Badge variant={summary.quorumReached ? "default" : "secondary"}>
                  {summary.quorumReached ? "On track" : "Below target"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/95">
            <CardHeader>
              <CardTitle className={isFullscreen ? "text-lg" : "text-base"}>
                Most Recent Registrations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentRegistrations.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No registrations have been completed yet.
                </p>
              ) : (
                recentRegistrations.map((item) => (
                  <div
                    key={`${item.name}-${item.type}-${item.time}`}
                    className="flex items-center justify-between border-b border-border/60 pb-3 last:border-b-0 last:pb-0"
                  >
                    <div>
                      <p
                        className={`font-medium text-foreground ${
                          isFullscreen ? "text-lg" : ""
                        }`}
                      >
                        {item.name}
                      </p>
                      <p
                        className={`${isFullscreen ? "text-sm" : "text-xs"} text-muted-foreground`}
                      >
                        {item.type} • {item.time}
                      </p>
                    </div>
                    <Badge variant="outline">{item.type}</Badge>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
