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
import {
  removeAgmRegistration,
  toggleAgmCheckIn,
  type AgmRegistrationRecord,
  useAgmRegistrations,
} from "@/lib/agm-portal";
import { cn } from "@/lib/utils";
import {
  CheckSquare,
  Download,
  FileText,
  Phone,
  Search,
  ShieldCheck,
  Square,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}

function exportAgmCsv(records: AgmRegistrationRecord[]) {
  const headers = [
    "Member Number",
    "Shareholder Name",
    "Attendee Name",
    "Mode",
    "Phone",
    "Verification Code",
    "Proxy Note",
    "Status",
    "Registered At",
  ];
  const rows = records.map((item) => [
    item.shareholderNumber,
    item.shareholderName,
    item.attendeeName,
    item.mode,
    item.attendeePhone,
    item.verificationCode,
    item.proxyReason,
    item.checkedIn ? "Checked In" : "Registered",
    formatDate(item.registeredAt),
  ]);
  const csv = [headers, ...rows]
    .map((row) =>
      row.map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`).join(","),
    )
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `agm-registered-shareholders-${Date.now()}.csv`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function AgmShareholdersPage() {
  const registrations = useAgmRegistrations();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "in-person" | "proxy">(
    "all",
  );
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);

  const filteredRecords = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    return registrations.filter((item) => {
      const matchesType =
        typeFilter === "all" ||
        (typeFilter === "in-person" && item.mode === "In Person") ||
        (typeFilter === "proxy" && item.mode === "Proxy");
      const haystack = [
        item.shareholderName,
        item.shareholderNumber,
        item.attendeeName,
        item.attendeePhone,
        item.verificationCode,
        item.proxyReason,
      ]
        .join(" ")
        .toLowerCase();
      return matchesType && (!normalized || haystack.includes(normalized));
    });
  }, [registrations, search, typeFilter]);

  const selectedRecord =
    filteredRecords.find((item) => item.id === selectedRecordId) ??
    registrations.find((item) => item.id === selectedRecordId) ??
    null;

  const stats = useMemo(
    () => ({
      total: registrations.length,
      inPerson: registrations.filter((item) => item.mode === "In Person").length,
      proxy: registrations.filter((item) => item.mode === "Proxy").length,
      checkedIn: registrations.filter((item) => item.checkedIn).length,
    }),
    [registrations],
  );

  const allVisibleSelected =
    filteredRecords.length > 0 &&
    filteredRecords.every((item) => selectedIds.includes(item.id));

  const toggleSelected = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  const toggleSelectAll = () => {
    if (allVisibleSelected) {
      setSelectedIds((current) =>
        current.filter((id) => !filteredRecords.some((item) => item.id === id)),
      );
      return;
    }
    setSelectedIds((current) => [
      ...new Set([...current, ...filteredRecords.map((item) => item.id)]),
    ]);
  };

  const removeSelected = () => {
    selectedIds.forEach((id) => removeAgmRegistration(id));
    setSelectedIds([]);
    setSelectedRecordId(null);
  };

  return (
    <AppShell>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6" data-ocid="agm.shareholders.page">
        <section className="rounded-3xl border border-border/60 bg-card/95 px-6 py-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <Badge className="rounded-full border border-primary/20 bg-primary/15 px-3 py-1 text-primary">
                AGM Shareholders
              </Badge>
              <div>
                <h1 className="font-display text-3xl font-bold text-foreground">
                  Registered shareholder list
                </h1>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
                  This page now reflects the AGM registrations created inside the
                  portal, so the desk and list-management flow are finally connected.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                className="min-h-11 rounded-lg gap-2"
                onClick={() => exportAgmCsv(filteredRecords)}
                disabled={filteredRecords.length === 0}
              >
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
              {selectedIds.length > 0 ? (
                <Button
                  variant="outline"
                  className="min-h-11 rounded-lg gap-2 border-destructive/30 text-destructive hover:bg-destructive/10"
                  onClick={removeSelected}
                >
                  <Trash2 className="h-4 w-4" />
                  Remove Selected ({selectedIds.length})
                </Button>
              ) : null}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Registered", value: stats.total, accent: "text-foreground" },
            { label: "In Person", value: stats.inPerson, accent: "text-primary" },
            { label: "Proxy", value: stats.proxy, accent: "text-primary" },
            { label: "Checked In", value: stats.checkedIn, accent: "text-primary" },
          ].map((stat) => (
            <Card key={stat.label} className="border-border/60 bg-card/95">
              <CardContent className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {stat.label}
                </p>
                <p className={cn("mt-2 font-display text-3xl font-bold", stat.accent)}>
                  {stat.value.toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="space-y-4">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search name, member no, phone, proxy, or code..."
                className="min-h-11 rounded-xl border-border/60 bg-card/95 pl-9 pr-9"
              />
              {search ? (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : null}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto">
              {[
                { label: "All", value: "all" },
                { label: "In Person", value: "in-person" },
                { label: "Proxy", value: "proxy" },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() =>
                    setTypeFilter(item.value as "all" | "in-person" | "proxy")
                  }
                  className={cn(
                    "min-h-11 whitespace-nowrap rounded-lg border px-4 text-sm font-medium",
                    typeFilter === item.value
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border/60 bg-card/95 text-muted-foreground hover:bg-muted/30 hover:text-foreground",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <Card className="overflow-hidden border-border/60 bg-card/95">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border/40 bg-muted/25">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      <button
                        type="button"
                        onClick={toggleSelectAll}
                        className="flex items-center gap-2"
                      >
                        {allVisibleSelected ? (
                          <CheckSquare className="h-4 w-4 text-primary" />
                        ) : (
                          <Square className="h-4 w-4" />
                        )}
                        Select all
                      </button>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Member No
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Shareholder
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Contact
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Verification Code
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-20 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border/60 bg-muted/20">
                            <Users className="h-7 w-7 text-muted-foreground" />
                          </div>
                          <p className="font-medium text-foreground">
                            No registered shareholders yet
                          </p>
                          <p className="max-w-md text-sm leading-6 text-muted-foreground">
                            As soon as you complete registrations on the AGM desk,
                            they will appear here automatically.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredRecords.map((record, index) => (
                      <tr
                        key={record.id}
                        className={cn(
                          "cursor-pointer border-b border-border/30 transition-colors hover:bg-muted/20",
                          selectedRecordId === record.id && "bg-primary/10",
                        )}
                        onClick={() => setSelectedRecordId(record.id)}
                      >
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              toggleSelected(record.id);
                            }}
                            className="flex items-center justify-center"
                            aria-label={
                              selectedIds.includes(record.id)
                                ? `Deselect ${record.shareholderName}`
                                : `Select ${record.shareholderName}`
                            }
                          >
                            {selectedIds.includes(record.id) ? (
                              <CheckSquare className="h-4 w-4 text-primary" />
                            ) : (
                              <Square className="h-4 w-4 text-muted-foreground" />
                            )}
                          </button>
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-foreground">
                          {record.shareholderNumber}
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-foreground">
                            {record.shareholderName}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Attendee: {record.attendeeName}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline">{record.mode}</Badge>
                        </td>
                        <td className="px-4 py-3 text-xs text-foreground">
                          {record.attendeePhone}
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-primary">
                          {record.verificationCode}
                        </td>
                        <td className="px-4 py-3">
                          <Badge
                            className={cn(
                              "border text-xs",
                              record.checkedIn
                                ? "border-primary/25 bg-primary/15 text-primary"
                                : "border-border/70 bg-muted/25 text-foreground",
                            )}
                          >
                            {record.checkedIn ? "Checked In" : "Registered"}
                          </Badge>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>

          {selectedRecord ? (
            <Card className="border-border/60 bg-card/95" data-ocid="agm.shareholders.details">
              <CardHeader>
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <CardTitle className="font-display text-xl">
                      {selectedRecord.shareholderName}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Member No: {selectedRecord.shareholderNumber}
                    </CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      className="rounded-lg"
                      onClick={() => toggleAgmCheckIn(selectedRecord.id)}
                    >
                      {selectedRecord.checkedIn ? "Reverse Check-In" : "Mark Checked In"}
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-lg border-destructive/30 text-destructive hover:bg-destructive/10"
                      onClick={() => {
                        removeAgmRegistration(selectedRecord.id);
                        setSelectedRecordId(null);
                        setSelectedIds((current) =>
                          current.filter((id) => id !== selectedRecord.id),
                        );
                      }}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                      <Users className="h-3.5 w-3.5" />
                      Registration Type
                    </div>
                    <p className="mt-2 font-semibold text-foreground">{selectedRecord.mode}</p>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                      <Phone className="h-3.5 w-3.5" />
                      Contact Number
                    </div>
                    <p className="mt-2 font-semibold text-foreground">
                      {selectedRecord.attendeePhone}
                    </p>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Verification Code
                    </div>
                    <p className="mt-2 font-mono text-sm font-bold text-primary">
                      {selectedRecord.verificationCode}
                    </p>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                      <FileText className="h-3.5 w-3.5" />
                      Registered At
                    </div>
                    <p className="mt-2 font-semibold text-foreground">
                      {formatDate(selectedRecord.registeredAt)}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Proxy / registration note
                  </p>
                  <p className="mt-2 text-sm leading-6 text-foreground">
                    {selectedRecord.proxyReason || "No extra note was recorded for this registration."}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : null}
        </section>
      </div>
    </AppShell>
  );
}
