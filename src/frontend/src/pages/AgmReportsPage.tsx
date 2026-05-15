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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAgmRegistrations, useAgmShareholders } from "@/lib/agm-portal";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  Award,
  BarChart3,
  CheckCircle2,
  Download,
  FileText,
  Search,
  ShieldCheck,
  Users,
  X,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";

type AttendanceFilter =
  | "all"
  | "in-person"
  | "proxy"
  | "checked-in"
  | "not-registered";

function exportCsv(filename: string, headers: string[], rows: string[][]) {
  const csv = [headers, ...rows]
    .map((row) =>
      row.map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`).join(","),
    )
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}

function StatPill({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: number | string;
  tone?: "default" | "primary" | "warning";
}) {
  const toneClass =
    tone === "primary"
      ? "border-primary/25 bg-primary/10 text-primary"
      : tone === "warning"
        ? "border-amber-500/25 bg-amber-500/10 text-amber-200"
        : "border-border/60 bg-muted/20 text-foreground";
  return (
    <div className={cn("rounded-lg border px-3 py-2 text-sm", toneClass)}>
      <span className="font-semibold">{value}</span>
      <span className="ml-2 opacity-75">{label}</span>
    </div>
  );
}

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="border-border/60 bg-card/95">
      <CardHeader>
        <CardTitle className="font-display text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default function AgmReportsPage() {
  const shareholders = useAgmShareholders();
  const registrations = useAgmRegistrations();
  const [reportSearch, setReportSearch] = useState("");
  const [attendanceFilter, setAttendanceFilter] =
    useState<AttendanceFilter>("all");
  const [selectedBadgeId, setSelectedBadgeId] = useState<string | null>(null);

  const normalizedSearch = reportSearch.trim().toLowerCase();

  const attendanceRows = useMemo(() => {
    return shareholders
      .map((shareholder) => {
        const registration = shareholder.registration;
        return {
          id: shareholder.id,
          number: shareholder.shareholderNumber,
          name: shareholder.fullName,
          shareholding: shareholder.shareholding,
          status: registration
            ? registration.checkedIn
              ? "Checked In"
              : "Registered"
            : "Not Registered",
          type: registration?.mode ?? "—",
          attendeeName: registration?.attendeeName ?? "—",
          phone: registration?.attendeePhone || shareholder.phone || "—",
          verificationCode: registration?.verificationCode ?? "—",
          registeredAt: registration?.registeredAt ?? "",
          proxyReason: registration?.proxyReason ?? "",
        };
      })
      .filter((row) => {
        const matchesText =
          !normalizedSearch ||
          [
            row.number,
            row.name,
            row.status,
            row.type,
            row.attendeeName,
            row.phone,
            row.verificationCode,
            row.proxyReason,
          ]
            .join(" ")
            .toLowerCase()
            .includes(normalizedSearch);
        if (!matchesText) return false;
        if (attendanceFilter === "all") return true;
        if (attendanceFilter === "in-person") return row.type === "In Person";
        if (attendanceFilter === "proxy") return row.type === "Proxy";
        if (attendanceFilter === "checked-in") return row.status === "Checked In";
        return row.status === "Not Registered";
      });
  }, [attendanceFilter, normalizedSearch, shareholders]);

  const proxyRows = useMemo(
    () =>
      registrations.filter((item) => {
        if (item.mode !== "Proxy") return false;
        if (!normalizedSearch) return true;
        return [
          item.shareholderName,
          item.attendeeName,
          item.attendeePhone,
          item.verificationCode,
          item.proxyReason,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);
      }),
    [normalizedSearch, registrations],
  );

  const noShowRows = useMemo(
    () =>
      attendanceRows.filter(
        (row) => row.status === "Registered" || row.status === "Not Registered",
      ),
    [attendanceRows],
  );

  const badgeRows = useMemo(
    () =>
      registrations.filter((item) => {
        if (!normalizedSearch) return true;
        return [
          item.shareholderName,
          item.shareholderNumber,
          item.attendeeName,
          item.verificationCode,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);
      }),
    [normalizedSearch, registrations],
  );

  const insightStats = useMemo(() => {
    const totalShareholders = shareholders.length;
    const registeredCount = registrations.length;
    const checkedInCount = registrations.filter((item) => item.checkedIn).length;
    const proxyCount = registrations.filter((item) => item.mode === "Proxy").length;
    const inPersonCount = registrations.filter(
      (item) => item.mode === "In Person",
    ).length;
    const totalShares = shareholders.reduce(
      (sum, item) => sum + item.shareholding,
      0,
    );
    const representedShares = registrations.reduce(
      (sum, item) => sum + item.shareholding,
      0,
    );
    return {
      totalShareholders,
      registeredCount,
      checkedInCount,
      proxyCount,
      inPersonCount,
      registrationRate:
        totalShareholders > 0 ? (registeredCount / totalShareholders) * 100 : 0,
      checkInRate:
        totalShareholders > 0 ? (checkedInCount / totalShareholders) * 100 : 0,
      representedShares,
      totalShares,
    };
  }, [registrations, shareholders]);

  const selectedBadge =
    badgeRows.find((item) => item.id === selectedBadgeId) ?? null;

  const exportAttendance = () =>
    exportCsv(
      `agm-attendance-${Date.now()}.csv`,
      [
        "Member Number",
        "Shareholder",
        "Attendee",
        "Shareholding",
        "Status",
        "Type",
        "Phone",
        "Verification Code",
      ],
      attendanceRows.map((row) => [
        row.number,
        row.name,
        row.attendeeName,
        row.shareholding.toLocaleString(),
        row.status,
        row.type,
        row.phone,
        row.verificationCode,
      ]),
    );

  const exportProxy = () =>
    exportCsv(
      `agm-proxy-${Date.now()}.csv`,
      ["Member Number", "Shareholder", "Proxy Name", "Proxy Contact", "Proxy Note"],
      proxyRows.map((row) => [
        row.shareholderNumber,
        row.shareholderName,
        row.attendeeName,
        row.attendeePhone,
        row.proxyReason || "—",
      ]),
    );

  const exportNoShow = () =>
    exportCsv(
      `agm-no-show-${Date.now()}.csv`,
      ["Member Number", "Shareholder", "Status", "Phone"],
      noShowRows.map((row) => [row.number, row.name, row.status, row.phone]),
    );

  return (
    <AppShell>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6" data-ocid="agm.reports.page">
        <section className="rounded-3xl border border-border/60 bg-card/95 px-6 py-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <Badge className="rounded-full border border-primary/20 bg-primary/15 px-3 py-1 text-primary">
                AGM Reports
              </Badge>
              <div>
                <h1 className="font-display text-3xl font-bold text-foreground">
                  Reports & analytics
                </h1>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
                  Attendance, proxy, no-show, badge, and summary views are now
                  generated from the AGM data already living inside this portal.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <StatPill label="Registered" value={registrations.length} tone="primary" />
              <StatPill
                label="Checked In"
                value={registrations.filter((item) => item.checkedIn).length}
                tone="primary"
              />
              <StatPill
                label="Not Registered"
                value={shareholders.length - registrations.length}
                tone="warning"
              />
            </div>
          </div>
        </section>

        <div className="rounded-2xl border border-border/60 bg-card/95 p-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={reportSearch}
              onChange={(event) => setReportSearch(event.target.value)}
              placeholder="Search by name, member number, status, phone, proxy, or code"
              className="min-h-11 rounded-xl border-border/60 bg-muted/20 pl-9 pr-9"
            />
            {reportSearch ? (
              <button
                type="button"
                onClick={() => setReportSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        </div>

        <Tabs defaultValue="attendance" className="gap-4">
          <TabsList className="flex h-auto w-full gap-1 overflow-x-auto rounded-2xl bg-muted/40 p-1 sm:grid sm:grid-cols-5">
            <TabsTrigger value="attendance" className="min-h-11 shrink-0 text-xs sm:text-sm">
              Attendance
            </TabsTrigger>
            <TabsTrigger value="proxy" className="min-h-11 shrink-0 text-xs sm:text-sm">
              Proxy
            </TabsTrigger>
            <TabsTrigger value="noshow" className="min-h-11 shrink-0 text-xs sm:text-sm">
              No-Show
            </TabsTrigger>
            <TabsTrigger value="badges" className="min-h-11 shrink-0 text-xs sm:text-sm">
              Badges
            </TabsTrigger>
            <TabsTrigger value="insights" className="min-h-11 shrink-0 text-xs sm:text-sm">
              Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="attendance">
            <SectionCard
              title="Attendance report"
              description="Review the full AGM attendance picture, including registered, checked-in, and not-registered shareholders."
            >
              <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: "all", label: "All" },
                    { value: "in-person", label: "In Person" },
                    { value: "proxy", label: "Proxy" },
                    { value: "checked-in", label: "Checked In" },
                    { value: "not-registered", label: "Not Registered" },
                  ].map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() =>
                        setAttendanceFilter(item.value as AttendanceFilter)
                      }
                      className={cn(
                        "min-h-10 rounded-lg border px-4 text-sm font-medium",
                        attendanceFilter === item.value
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border/60 bg-muted/20 text-muted-foreground hover:bg-muted/30 hover:text-foreground",
                      )}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <Button variant="outline" className="gap-2 rounded-lg" onClick={exportAttendance}>
                  <Download className="h-4 w-4" />
                  Export CSV
                </Button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-border/60">
                <table className="w-full text-sm">
                  <thead className="border-b border-border/40 bg-muted/25">
                    <tr>
                      {[
                        "Member No",
                        "Name",
                        "Shareholding",
                        "Status",
                        "Type",
                        "Verification Code",
                      ].map((header) => (
                        <th
                          key={header}
                          className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceRows.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-16 text-center text-sm text-muted-foreground">
                          No attendance rows match the current search or filter.
                        </td>
                      </tr>
                    ) : (
                      attendanceRows.map((row) => (
                        <tr key={row.id} className="border-b border-border/30">
                          <td className="px-4 py-3 font-mono text-xs text-foreground">
                            {row.number}
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-medium text-foreground">{row.name}</div>
                            <div className="text-xs text-muted-foreground">
                              Attendee: {row.attendeeName}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-foreground">
                            {row.shareholding.toLocaleString()}
                          </td>
                          <td className="px-4 py-3">
                            <Badge
                              className={cn(
                                "border text-xs",
                                row.status === "Checked In"
                                  ? "border-primary/25 bg-primary/15 text-primary"
                                  : row.status === "Not Registered"
                                    ? "border-amber-500/25 bg-amber-500/10 text-amber-200"
                                    : "border-border/60 bg-muted/20 text-foreground",
                              )}
                            >
                              {row.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">{row.type}</td>
                          <td className="px-4 py-3 font-mono text-xs text-primary">
                            {row.verificationCode}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </SectionCard>
          </TabsContent>

          <TabsContent value="proxy">
            <SectionCard
              title="Proxy report"
              description="Track all proxy registrations, contact details, and recorded proxy notes."
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  <StatPill label="Proxy registrations" value={proxyRows.length} tone="primary" />
                  <StatPill
                    label="With notes"
                    value={proxyRows.filter((item) => item.proxyReason.trim()).length}
                  />
                </div>
                <Button variant="outline" className="gap-2 rounded-lg" onClick={exportProxy}>
                  <Download className="h-4 w-4" />
                  Export CSV
                </Button>
              </div>

              {proxyRows.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 py-14 text-center">
                  <AlertTriangle className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    No proxy registrations match the current filter.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {proxyRows.map((row) => (
                    <div
                      key={row.id}
                      className="rounded-xl border border-border/60 bg-muted/15 p-4"
                    >
                      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                          <p className="font-semibold text-foreground">
                            {row.shareholderName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Proxy attendee: {row.attendeeName}
                          </p>
                        </div>
                        <Badge variant="outline">Proxy</Badge>
                      </div>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        <div className="rounded-lg border border-border/50 bg-card/80 px-3 py-3">
                          <p className="text-xs uppercase tracking-wide text-muted-foreground">
                            Member No
                          </p>
                          <p className="mt-1 font-mono text-sm text-foreground">
                            {row.shareholderNumber}
                          </p>
                        </div>
                        <div className="rounded-lg border border-border/50 bg-card/80 px-3 py-3">
                          <p className="text-xs uppercase tracking-wide text-muted-foreground">
                            Contact
                          </p>
                          <p className="mt-1 text-sm text-foreground">{row.attendeePhone}</p>
                        </div>
                        <div className="rounded-lg border border-border/50 bg-card/80 px-3 py-3">
                          <p className="text-xs uppercase tracking-wide text-muted-foreground">
                            Verification Code
                          </p>
                          <p className="mt-1 font-mono text-sm text-primary">
                            {row.verificationCode}
                          </p>
                        </div>
                        <div className="rounded-lg border border-border/50 bg-card/80 px-3 py-3">
                          <p className="text-xs uppercase tracking-wide text-muted-foreground">
                            Registered At
                          </p>
                          <p className="mt-1 text-sm text-foreground">
                            {formatDate(row.registeredAt)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 rounded-lg border border-border/50 bg-card/80 px-3 py-3">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                          Proxy note
                        </p>
                        <p className="mt-1 text-sm leading-6 text-foreground">
                          {row.proxyReason || "No proxy note was recorded for this registration."}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </SectionCard>
          </TabsContent>

          <TabsContent value="noshow">
            <SectionCard
              title="No-show report"
              description="See who still has not registered or who registered but has not yet checked in."
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  <StatPill
                    label="Still not registered"
                    value={attendanceRows.filter((row) => row.status === "Not Registered").length}
                    tone="warning"
                  />
                  <StatPill
                    label="Registered, not checked in"
                    value={attendanceRows.filter((row) => row.status === "Registered").length}
                  />
                </div>
                <Button variant="outline" className="gap-2 rounded-lg" onClick={exportNoShow}>
                  <Download className="h-4 w-4" />
                  Export CSV
                </Button>
              </div>

              {noShowRows.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 py-14 text-center">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                  <p className="text-sm text-muted-foreground">
                    Everyone in the current report view has already checked in.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-border/60">
                  <table className="w-full text-sm">
                    <thead className="border-b border-border/40 bg-muted/25">
                      <tr>
                        {["Member No", "Shareholder", "Status", "Contact"].map((header) => (
                          <th
                            key={header}
                            className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {noShowRows.map((row) => (
                        <tr key={row.id} className="border-b border-border/30">
                          <td className="px-4 py-3 font-mono text-xs text-foreground">
                            {row.number}
                          </td>
                          <td className="px-4 py-3 font-medium text-foreground">
                            {row.name}
                          </td>
                          <td className="px-4 py-3">
                            <Badge
                              className={cn(
                                "border text-xs",
                                row.status === "Not Registered"
                                  ? "border-amber-500/25 bg-amber-500/10 text-amber-200"
                                  : "border-border/60 bg-muted/20 text-foreground",
                              )}
                            >
                              {row.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-sm text-foreground">{row.phone}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </SectionCard>
          </TabsContent>

          <TabsContent value="badges">
            <SectionCard
              title="Badge generation"
              description="Use this list to quickly inspect the details that should appear on AGM attendance badges."
            >
              {badgeRows.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 py-14 text-center">
                  <Award className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    No badge-ready registrations match the current search.
                  </p>
                </div>
              ) : (
                <div className="grid gap-3 lg:grid-cols-[1fr_0.9fr]">
                  <div className="space-y-3">
                    {badgeRows.map((row) => (
                      <button
                        key={row.id}
                        type="button"
                        onClick={() => setSelectedBadgeId(row.id)}
                        className={cn(
                          "w-full rounded-xl border px-4 py-4 text-left transition-smooth",
                          selectedBadgeId === row.id
                            ? "border-primary/35 bg-primary/10"
                            : "border-border/60 bg-muted/15 hover:bg-muted/25",
                        )}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-semibold text-foreground">{row.shareholderName}</p>
                            <p className="text-sm text-muted-foreground">
                              {row.attendeeName} • {row.shareholderNumber}
                            </p>
                          </div>
                          <Badge variant="outline">{row.mode}</Badge>
                        </div>
                        <p className="mt-3 font-mono text-xs text-primary">
                          {row.verificationCode}
                        </p>
                      </button>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-border/60 bg-muted/15 p-5">
                    {selectedBadge ? (
                      <div className="space-y-4">
                        <div className="rounded-2xl border border-primary/25 bg-card/90 px-5 py-6 text-center">
                          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                            AGM ATTENDANCE BADGE
                          </p>
                          <p className="mt-4 font-display text-2xl font-bold text-foreground">
                            {selectedBadge.attendeeName}
                          </p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            for {selectedBadge.shareholderName}
                          </p>
                          <div className="mt-5 inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                            {selectedBadge.mode}
                          </div>
                          <p className="mt-5 font-mono text-lg font-bold text-primary">
                            {selectedBadge.verificationCode}
                          </p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="rounded-lg border border-border/50 bg-card/80 px-3 py-3">
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">
                              Member Number
                            </p>
                            <p className="mt-1 font-mono text-sm text-foreground">
                              {selectedBadge.shareholderNumber}
                            </p>
                          </div>
                          <div className="rounded-lg border border-border/50 bg-card/80 px-3 py-3">
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">
                              Contact
                            </p>
                            <p className="mt-1 text-sm text-foreground">
                              {selectedBadge.attendeePhone}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex min-h-60 flex-col items-center justify-center gap-3 text-center">
                        <Award className="h-8 w-8 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Select a badge-ready registration to preview its AGM badge details.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </SectionCard>
          </TabsContent>

          <TabsContent value="insights">
            <SectionCard
              title="Post-AGM insights"
              description="A compact view of the live AGM picture based on imported shareholders and recorded registrations."
            >
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <Card className="border-border/60 bg-muted/15">
                  <CardContent className="p-5">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Registration Rate
                    </p>
                    <p className="mt-2 font-display text-3xl font-bold text-foreground">
                      {insightStats.registrationRate.toFixed(1)}%
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {insightStats.registeredCount} of {insightStats.totalShareholders} shareholders registered
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border/60 bg-muted/15">
                  <CardContent className="p-5">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Check-In Rate
                    </p>
                    <p className="mt-2 font-display text-3xl font-bold text-foreground">
                      {insightStats.checkInRate.toFixed(1)}%
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {insightStats.checkedInCount} attendees checked in
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border/60 bg-muted/15">
                  <CardContent className="p-5">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Proxy Mix
                    </p>
                    <p className="mt-2 font-display text-3xl font-bold text-foreground">
                      {insightStats.proxyCount}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      proxy versus {insightStats.inPersonCount} in-person registrations
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border/60 bg-muted/15">
                  <CardContent className="p-5">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Shares Represented
                    </p>
                    <p className="mt-2 font-display text-3xl font-bold text-foreground">
                      {insightStats.representedShares.toLocaleString()}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      of {insightStats.totalShares.toLocaleString()} total imported shares
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-5 rounded-2xl border border-border/60 bg-muted/20 px-5 py-5">
                <div className="flex items-start gap-3">
                  <BarChart3 className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">AGM summary note</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      The AGM module is now far enough along that imported shareholder data,
                      AGM desk registrations, shareholder listing, and reports are all
                      connected inside one portal workflow. The remaining high-value pages
                      are the board view and admin controls.
                    </p>
                  </div>
                </div>
              </div>
            </SectionCard>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
