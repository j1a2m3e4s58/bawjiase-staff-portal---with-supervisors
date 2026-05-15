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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  archiveCurrentAgmYear,
  clearAgmRegistrations,
  deleteArchivedAgmYear,
  importAgmShareholders,
  refreshAgmState,
  resetAgmModule,
  resetAgmShareholdersToSeed,
  restoreArchivedAgmYear,
  saveAgmSettings,
  useAgmArchives,
  useAgmRegistrations,
  useAgmShareholders,
  useAgmSettings,
  useAgmSyncStatus,
} from "@/lib/agm-portal";
import { cn } from "@/lib/utils";
import { useAuth } from "@/store/auth";
import {
  AlertTriangle,
  Archive,
  CheckCircle2,
  Download,
  History,
  Lock,
  RefreshCcw,
  RotateCcw,
  Settings2,
  ShieldAlert,
  Trash2,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type NoticeTone = "default" | "success" | "danger";

type AdminSettingsForm = {
  agmName: string;
  agmDate: string;
  venue: string;
  quorumThreshold: number;
  yearLabel: string;
  yearLocked: boolean;
  yearArchived: boolean;
  boardAutoRefresh: boolean;
};

const RESET_PHRASE = "RESET AGM MODULE";

function exportModuleSnapshot(rows: string[][]) {
  const csv = rows
    .map((row) =>
      row.map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`).join(","),
    )
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `agm-admin-snapshot-${Date.now()}.csv`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function InfoPill({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-muted/20 px-4 py-3">
      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 font-display text-2xl font-bold text-foreground">
        {value}
      </p>
    </div>
  );
}

function ActionCard({
  title,
  description,
  icon: Icon,
  actionLabel,
  actionVariant = "outline",
  onAction,
}: {
  title: string;
  description: string;
  icon: typeof Settings2;
  actionLabel: string;
  actionVariant?: "outline" | "destructive" | "default";
  onAction: () => void;
}) {
  return (
    <Card className="border-border/60 bg-card/95">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Icon className="h-4 w-4 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant={actionVariant} className="min-h-11" onClick={onAction}>
          {actionLabel}
        </Button>
      </CardContent>
    </Card>
  );
}

export default function AgmAdminPage() {
  const { user } = useAuth();
  const settings = useAgmSettings();
  const syncStatus = useAgmSyncStatus();
  const archives = useAgmArchives();
  const registrations = useAgmRegistrations();
  const shareholders = useAgmShareholders();
  const [form, setForm] = useState<AdminSettingsForm>(settings);
  const [notice, setNotice] = useState("");
  const [noticeTone, setNoticeTone] = useState<NoticeTone>("default");
  const [resetInput, setResetInput] = useState("");
  const [archiveNote, setArchiveNote] = useState("");

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  const canManageAgm =
    user?.role === "SuperAdmin" || user?.role === "HRAdmin";

  const summary = useMemo(() => {
    const totalShareholders = shareholders.length;
    const registered = registrations.length;
    const checkedIn = registrations.filter((item) => item.checkedIn).length;
    const proxy = registrations.filter((item) => item.mode === "Proxy").length;
    const representedShares = registrations.reduce(
      (sum, item) => sum + item.shareholding,
      0,
    );
    const importedShares = shareholders.reduce(
      (sum, item) => sum + item.shareholding,
      0,
    );
    const registrationRate =
      totalShareholders > 0 ? (registered / totalShareholders) * 100 : 0;
    const quorumReached = registrationRate >= settings.quorumThreshold;
    return {
      totalShareholders,
      registered,
      checkedIn,
      proxy,
      representedShares,
      importedShares,
      registrationRate,
      quorumReached,
    };
  }, [registrations, settings.quorumThreshold, shareholders]);

  const setBanner = (message: string, tone: NoticeTone = "default") => {
    setNotice(message);
    setNoticeTone(tone);
  };

  const handleSaveSettings = () => {
    saveAgmSettings({
      agmName: form.agmName.trim() || settings.agmName,
      agmDate: form.agmDate,
      venue: form.venue.trim() || settings.venue,
      quorumThreshold: Math.min(100, Math.max(1, Number(form.quorumThreshold) || 50)),
      yearLabel: form.yearLabel.trim() || settings.yearLabel,
      yearLocked: form.yearLocked,
      yearArchived: form.yearArchived,
      boardAutoRefresh: form.boardAutoRefresh,
    });
    setBanner("AGM admin settings saved to the shared portal module.", "success");
  };

  const handleExportSnapshot = () => {
    exportModuleSnapshot([
      ["Metric", "Value"],
      ["AGM Name", settings.agmName],
      ["AGM Year", settings.yearLabel],
      ["Venue", settings.venue],
      ["AGM Date", settings.agmDate],
      ["Quorum Threshold", `${settings.quorumThreshold}%`],
      ["Imported Shareholders", String(summary.totalShareholders)],
      ["Registrations", String(summary.registered)],
      ["Checked In", String(summary.checkedIn)],
      ["Proxy", String(summary.proxy)],
      ["Registration Rate", `${summary.registrationRate.toFixed(1)}%`],
      ["Represented Shares", String(summary.representedShares)],
      ["Imported Shares", String(summary.importedShares)],
    ]);
    setBanner("AGM snapshot exported as CSV.", "success");
  };

  const handleRestoreSeed = () => {
    resetAgmShareholdersToSeed();
    setBanner("Starter AGM shareholder list restored.", "success");
  };

  const handleNormalizeImportedData = () => {
    importAgmShareholders(
      shareholders.map((item) => ({
        id: item.id,
        fullName: item.fullName,
        shareholderNumber: item.shareholderNumber,
        shareholding: item.shareholding,
        phone: item.phone,
      })),
    );
    setBanner("Imported shareholder data has been cleaned and re-saved.", "success");
  };

  const handleClearRegistrations = () => {
    clearAgmRegistrations();
    setBanner("All AGM registrations and check-in records have been cleared.", "danger");
  };

  const handleArchiveCurrentYear = () => {
    const archived = archiveCurrentAgmYear(archiveNote);
    setArchiveNote("");
    setBanner(
      `${archived.settings.yearLabel} has been archived into AGM history.`,
      "success",
    );
  };

  const handleRestoreArchive = (archiveId: string) => {
    const restored = restoreArchivedAgmYear(archiveId);
    if (!restored) {
      setBanner("That AGM archive could not be reopened.", "danger");
      return;
    }
    setBanner(
      `${restored.settings.yearLabel} is now the active AGM year again.`,
      "success",
    );
  };

  const handleDeleteArchive = (archiveId: string, yearLabel: string) => {
    deleteArchivedAgmYear(archiveId);
    setBanner(`${yearLabel} has been removed from AGM history.`, "danger");
  };

  const handleResetModule = () => {
    if (resetInput.trim() !== RESET_PHRASE) {
      setBanner("Type RESET AGM MODULE exactly before clearing everything.", "danger");
      return;
    }
    resetAgmModule();
    setResetInput("");
    setBanner("The AGM module has been reset to its starter state.", "danger");
  };

  if (!canManageAgm) {
    return (
      <AppShell>
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6" data-ocid="agm.admin.denied">
          <Card className="border-border/60 bg-card/95">
            <CardHeader>
              <Badge className="w-fit rounded-full border border-amber-500/25 bg-amber-500/10 text-amber-200">
                AGM Admin Restricted
              </Badge>
              <CardTitle className="mt-3 font-display text-2xl">
                This control layer is limited to HR and Super Admin
              </CardTitle>
              <CardDescription className="max-w-2xl text-sm leading-6">
                AGM operational settings can affect the whole registration module,
                so only HR and Super Admin accounts can open this page.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6" data-ocid="agm.admin.page">
        <div
          className={cn(
            "rounded-2xl border px-4 py-3 text-sm",
            syncStatus.mode === "synced"
              ? "border-primary/25 bg-primary/10 text-primary"
              : syncStatus.mode === "local-only"
                ? "border-amber-500/25 bg-amber-500/10 text-amber-200"
                : "border-border/60 bg-muted/20 text-foreground",
          )}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium">
                {syncStatus.mode === "synced"
                  ? "AGM admin is saving to the shared backend"
                  : syncStatus.mode === "local-only"
                    ? "AGM admin is currently using local fallback"
                    : syncStatus.mode === "syncing"
                      ? "AGM admin sync is in progress"
                      : "AGM admin sync is standing by"}
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

        <section className="rounded-3xl border border-border/60 bg-card/95 px-6 py-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <Badge className="rounded-full border border-primary/20 bg-primary/15 px-3 py-1 text-primary">
                AGM Admin Center
              </Badge>
              <div>
                <h1 className="font-display text-3xl font-bold text-foreground">
                  Control the AGM module
                </h1>
                <p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">
                  Manage AGM year settings, live module status, and operational resets for
                  the AGM pages we have already connected into this portal.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant={settings.yearLocked ? "secondary" : "outline"}>
                {settings.yearLocked ? "Year Locked" : "Year Open"}
              </Badge>
              <Badge variant={settings.yearArchived ? "secondary" : "outline"}>
                {settings.yearArchived ? "Archived" : "Active Year"}
              </Badge>
              <Badge variant={summary.quorumReached ? "default" : "secondary"}>
                {summary.quorumReached ? "Quorum On Track" : "Quorum Below Target"}
              </Badge>
            </div>
          </div>
        </section>

        {notice ? (
          <div
            className={cn(
              "rounded-2xl border px-4 py-3 text-sm",
              noticeTone === "success"
                ? "border-primary/25 bg-primary/10 text-primary"
                : noticeTone === "danger"
                  ? "border-destructive/30 bg-destructive/10 text-destructive"
                  : "border-border/60 bg-muted/20 text-foreground",
            )}
          >
            {notice}
          </div>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <InfoPill label="Imported Shareholders" value={summary.totalShareholders} />
          <InfoPill label="Registrations" value={summary.registered} />
          <InfoPill label="Checked In" value={summary.checkedIn} />
          <InfoPill label="Proxy" value={summary.proxy} />
          <InfoPill label="Registration Rate" value={`${summary.registrationRate.toFixed(1)}%`} />
        </div>

        <Tabs defaultValue="settings" className="gap-4">
          <TabsList className="flex h-auto w-full gap-1 overflow-x-auto rounded-2xl bg-muted/40 p-1 sm:grid sm:grid-cols-5">
            <TabsTrigger value="settings" className="min-h-11 shrink-0">
              Settings
            </TabsTrigger>
            <TabsTrigger value="status" className="min-h-11 shrink-0">
              Module Status
            </TabsTrigger>
            <TabsTrigger value="history" className="min-h-11 shrink-0">
              Year History
            </TabsTrigger>
            <TabsTrigger value="operations" className="min-h-11 shrink-0">
              Operations
            </TabsTrigger>
            <TabsTrigger value="danger" className="min-h-11 shrink-0">
              Danger Zone
            </TabsTrigger>
          </TabsList>

          <TabsContent value="settings">
            <Card className="border-border/60 bg-card/95">
              <CardHeader>
                <CardTitle className="font-display text-xl">AGM year settings</CardTitle>
                <CardDescription>
                  These values drive the AGM board summary and set the operational tone for the current AGM cycle.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="agm-name">AGM name</Label>
                    <Input
                      id="agm-name"
                      value={form.agmName}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, agmName: event.target.value }))
                      }
                      className="min-h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agm-year">Active AGM year</Label>
                    <Input
                      id="agm-year"
                      value={form.yearLabel}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, yearLabel: event.target.value }))
                      }
                      className="min-h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agm-date">AGM date</Label>
                    <Input
                      id="agm-date"
                      type="date"
                      value={form.agmDate}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, agmDate: event.target.value }))
                      }
                      className="min-h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agm-quorum">Quorum threshold (%)</Label>
                    <Input
                      id="agm-quorum"
                      type="number"
                      min={1}
                      max={100}
                      value={form.quorumThreshold}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          quorumThreshold: Number(event.target.value),
                        }))
                      }
                      className="min-h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="agm-venue">Venue</Label>
                  <Input
                    id="agm-venue"
                    value={form.venue}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, venue: event.target.value }))
                    }
                    className="min-h-11"
                  />
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                  <div className="rounded-2xl border border-border/60 bg-muted/15 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-foreground">Lock AGM year</p>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          Freeze operational changes while keeping the module visible.
                        </p>
                      </div>
                      <Switch
                        checked={form.yearLocked}
                        onCheckedChange={(checked) =>
                          setForm((current) => ({ ...current, yearLocked: checked }))
                        }
                      />
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-muted/15 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-foreground">Archive AGM year</p>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          Mark the year as historical while preserving the current data.
                        </p>
                      </div>
                      <Switch
                        checked={form.yearArchived}
                        onCheckedChange={(checked) =>
                          setForm((current) => ({ ...current, yearArchived: checked }))
                        }
                      />
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-muted/15 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-foreground">Board auto refresh</p>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          Control the default live-refresh setting on the AGM board screen.
                        </p>
                      </div>
                      <Switch
                        checked={form.boardAutoRefresh}
                        onCheckedChange={(checked) =>
                          setForm((current) => ({ ...current, boardAutoRefresh: checked }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button className="min-h-11" onClick={handleSaveSettings}>
                    Save AGM Settings
                  </Button>
                  <Button
                    variant="outline"
                    className="min-h-11"
                    onClick={() => setForm(settings)}
                  >
                    Reset Form
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="status">
            <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
              <Card className="border-border/60 bg-card/95">
                <CardHeader>
                  <CardTitle className="font-display text-xl">Live AGM module status</CardTitle>
                  <CardDescription>
                    The admin center is reading the same shared AGM store as registration, shareholders, reports, and board view.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  <InfoPill label="Imported Shares" value={summary.importedShares.toLocaleString()} />
                  <InfoPill label="Represented Shares" value={summary.representedShares.toLocaleString()} />
                  <InfoPill label="Quorum Threshold" value={`${settings.quorumThreshold}%`} />
                  <InfoPill label="Board Refresh" value={settings.boardAutoRefresh ? "On" : "Off"} />
                  <InfoPill label="Venue" value={settings.venue} />
                  <InfoPill label="AGM Date" value={settings.agmDate} />
                </CardContent>
              </Card>

              <Card className="border-border/60 bg-card/95">
                <CardHeader>
                  <CardTitle className="font-display text-xl">Operational flags</CardTitle>
                  <CardDescription>
                    Quick read on the control switches shaping the current AGM year.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-xl border border-border/60 bg-muted/15 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium text-foreground">Year lock state</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Controls whether the current AGM year should be treated as frozen.
                        </p>
                      </div>
                      <Badge variant={settings.yearLocked ? "secondary" : "outline"}>
                        {settings.yearLocked ? "Locked" : "Open"}
                      </Badge>
                    </div>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-muted/15 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium text-foreground">Archive state</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Indicates whether this AGM year should be treated as historical.
                        </p>
                      </div>
                      <Badge variant={settings.yearArchived ? "secondary" : "outline"}>
                        {settings.yearArchived ? "Archived" : "Active"}
                      </Badge>
                    </div>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-muted/15 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium text-foreground">Quorum position</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Uses registration rate against the threshold set for this AGM year.
                        </p>
                      </div>
                      <Badge variant={summary.quorumReached ? "default" : "secondary"}>
                        {summary.quorumReached ? "On track" : "Below target"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
              <Card className="border-border/60 bg-card/95">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display text-xl">
                    <History className="h-5 w-5 text-primary" />
                    Archive current AGM year
                  </CardTitle>
                  <CardDescription>
                    Capture the live shareholders, registrations, and settings as a recoverable AGM history snapshot.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <InfoPill label="Current AGM Year" value={settings.yearLabel} />
                    <InfoPill label="Archived Years" value={archives.length} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agm-archive-note">Archive note</Label>
                    <Input
                      id="agm-archive-note"
                      value={archiveNote}
                      onChange={(event) => setArchiveNote(event.target.value)}
                      placeholder="Optional note about this AGM cycle"
                      className="min-h-11"
                    />
                  </div>
                  <Button className="min-h-11" onClick={handleArchiveCurrentYear}>
                    Archive {settings.yearLabel}
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border/60 bg-card/95">
                <CardHeader>
                  <CardTitle className="font-display text-xl">Archived AGM years</CardTitle>
                  <CardDescription>
                    Reopen a previous AGM cycle into the live module or remove old history snapshots.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {archives.length === 0 ? (
                    <div className="rounded-2xl border border-border/60 bg-muted/15 px-4 py-10 text-center text-sm text-muted-foreground">
                      No AGM years have been archived yet.
                    </div>
                  ) : (
                    archives.map((archive) => (
                      <div
                        key={archive.id}
                        className="rounded-2xl border border-border/60 bg-muted/15 p-4"
                      >
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="font-semibold text-foreground">
                                {archive.settings.agmName}
                              </p>
                              <Badge variant="outline">{archive.settings.yearLabel}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Archived {new Date(archive.archivedAt).toLocaleString()}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {archive.registrations.length} registrations • {archive.shareholders.length} shareholders
                            </p>
                            {archive.note ? (
                              <p className="text-sm leading-6 text-foreground/85">
                                {archive.note}
                              </p>
                            ) : null}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Button
                              variant="outline"
                              className="min-h-10 gap-2"
                              onClick={() => handleRestoreArchive(archive.id)}
                            >
                              <RotateCcw className="h-4 w-4" />
                              Reopen Year
                            </Button>
                            <Button
                              variant="destructive"
                              className="min-h-10 gap-2"
                              onClick={() =>
                                handleDeleteArchive(archive.id, archive.settings.yearLabel)
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete Archive
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="operations">
            <div className="grid gap-4 xl:grid-cols-2">
              <ActionCard
                title="Restore starter shareholder list"
                description="Bring back the built-in AGM demo shareholder list when you need a known starting point."
                icon={RefreshCcw}
                actionLabel="Restore Starter List"
                onAction={handleRestoreSeed}
              />
              <ActionCard
                title="Normalize imported shareholder data"
                description="Re-save the current imported list through the AGM importer cleanup flow."
                icon={Users}
                actionLabel="Normalize Imported Data"
                onAction={handleNormalizeImportedData}
              />
              <ActionCard
                title="Clear all registrations"
                description="Remove all AGM registrations and check-in records while keeping the shareholder list intact."
                icon={Lock}
                actionLabel="Clear Registrations"
                actionVariant="default"
                onAction={handleClearRegistrations}
              />
              <ActionCard
                title="Export AGM module snapshot"
                description="Download a compact AGM admin CSV with the current year settings and operational counts."
                icon={Download}
                actionLabel="Export Snapshot"
                onAction={handleExportSnapshot}
              />
            </div>
          </TabsContent>

          <TabsContent value="danger">
            <Card className="border-destructive/30 bg-card/95">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display text-xl text-foreground">
                  <ShieldAlert className="h-5 w-5 text-destructive" />
                  AGM danger zone
                </CardTitle>
                <CardDescription>
                  These actions hit the shared AGM store used by import, registration, shareholders, reports, and board view.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-destructive/25 bg-destructive/10 p-4">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <p className="mt-3 font-medium text-foreground">Registrations will be cleared</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      Every AGM registration and check-in record will be removed.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-destructive/25 bg-destructive/10 p-4">
                    <Archive className="h-5 w-5 text-destructive" />
                    <p className="mt-3 font-medium text-foreground">Settings will reset</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      AGM year metadata will revert to the starter defaults.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-destructive/25 bg-destructive/10 p-4">
                    <CheckCircle2 className="h-5 w-5 text-destructive" />
                    <p className="mt-3 font-medium text-foreground">Starter list will return</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      Imported shareholder data will be replaced with the built-in starter list.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="agm-reset-confirmation">
                    Type <span className="font-mono">{RESET_PHRASE}</span> to continue
                  </Label>
                  <Input
                    id="agm-reset-confirmation"
                    value={resetInput}
                    onChange={(event) => setResetInput(event.target.value)}
                    placeholder={RESET_PHRASE}
                    className="min-h-11"
                  />
                </div>

                <Button
                  variant="destructive"
                  className="min-h-11"
                  onClick={handleResetModule}
                >
                  Reset AGM Module
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
