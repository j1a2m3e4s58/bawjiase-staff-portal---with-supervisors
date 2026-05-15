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
  saveAgmRegistration,
  useAgmShareholders,
  type AgmRegistrationMode as RegistrationMode,
  type AgmShareholderView,
} from "@/lib/agm-portal";
import { cn } from "@/lib/utils";
import {
  ArrowLeftRight,
  CheckCircle2,
  Search,
  ShieldCheck,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

type RegistrationReceipt = {
  type: RegistrationMode;
  attendeeName: string;
  shareholderName: string;
  verificationCode: string;
  registrationId: string;
};

function generateCode() {
  return `AGM-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Date.now().toString().slice(-4)}`;
}

function ShareholderStatusBadge({
  status,
}: {
  status: AgmShareholderView["status"];
}) {
  return status === "Registered" ? (
    <Badge className="border border-primary/20 bg-primary/15 text-primary">
      Registered
    </Badge>
  ) : (
    <Badge variant="outline" className="border-border/70 text-muted-foreground">
      Not Registered
    </Badge>
  );
}

export default function AgmRegistrationPage() {
  const shareholders = useAgmShareholders();
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mode, setMode] = useState<RegistrationMode>("In Person");
  const [attendeeName, setAttendeeName] = useState("");
  const [attendeePhone, setAttendeePhone] = useState("");
  const [proxyReason, setProxyReason] = useState("");
  const [receipt, setReceipt] = useState<RegistrationReceipt | null>(null);

  const filteredShareholders = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return shareholders.filter((item) => {
      if (!normalized) return true;
      return (
        item.fullName.toLowerCase().includes(normalized) ||
        item.shareholderNumber.toLowerCase().includes(normalized) ||
        item.phone.toLowerCase().includes(normalized)
      );
    }).sort((left, right) => left.fullName.localeCompare(right.fullName));
  }, [query, shareholders]);

  const selected = shareholders.find((item) => item.id === selectedId) ?? null;

  const resetForm = () => {
    setAttendeeName("");
    setAttendeePhone("");
    setProxyReason("");
    setReceipt(null);
  };

  const handleSelect = (shareholder: AgmShareholderView) => {
    setSelectedId(shareholder.id);
    setMode("In Person");
    setReceipt(null);
    setAttendeeName(shareholder.fullName);
    setAttendeePhone(shareholder.phone);
    setProxyReason("");
  };

  const handleSubmit = () => {
    if (!selected) return;
    const effectiveAttendeeName =
      attendeeName.trim() || (mode === "In Person" ? selected.fullName : "Proxy Representative");
    const registration = saveAgmRegistration({
      shareholderId: selected.id,
      shareholderName: selected.fullName,
      shareholderNumber: selected.shareholderNumber,
      shareholding: selected.shareholding,
      attendeeName: effectiveAttendeeName,
      attendeePhone: attendeePhone.trim(),
      mode,
      proxyReason: proxyReason.trim(),
      verificationCode: generateCode(),
    });
    const nextReceipt: RegistrationReceipt = {
      type: mode,
      attendeeName: effectiveAttendeeName,
      shareholderName: selected.fullName,
      verificationCode: registration.verificationCode,
      registrationId: registration.id,
    };
    setReceipt(nextReceipt);
  };

  const canSubmit =
    !!selected &&
    attendeeName.trim().length > 0 &&
    attendeePhone.trim().length > 0 &&
    (mode === "In Person" || proxyReason.trim().length > 0);

  return (
    <AppShell>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6" data-ocid="agm.registration.page">
        <section className="rounded-3xl border border-border/60 bg-card/95 px-6 py-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <Badge className="rounded-full border border-primary/20 bg-primary/15 px-3 py-1 text-primary">
                AGM Registration Desk
              </Badge>
              <div>
                <h1 className="font-display text-3xl font-bold text-foreground">
                  Register AGM attendees
                </h1>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
                  This is the first in-portal AGM registration migration. It keeps the
                  original left search list and right registration panel flow so we can
                  move the full AGM workflow in safely.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-border/60 bg-muted/20 px-4 py-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 font-medium text-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" />
                AGM 2026 intake window open
              </div>
              <p className="mt-1 text-xs leading-5">
                Search a shareholder, choose in-person or proxy, and issue the
                registration code from one panel.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[360px_minmax(0,1fr)]">
          <Card className="overflow-hidden border-border/60 bg-card/95">
            <CardHeader className="space-y-3 border-b border-border/40 pb-4">
              <div>
                <CardTitle className="font-display text-lg">Find shareholder</CardTitle>
                <CardDescription>
                  Search by name, shareholder number, or phone.
                </CardDescription>
              </div>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search shareholder..."
                  className="h-11 rounded-xl border-border/60 bg-muted/30 pl-9 pr-9"
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                ) : null}
              </div>
            </CardHeader>
            <CardContent className="max-h-[680px] overflow-y-auto px-0">
              {filteredShareholders.map((shareholder, index) => (
                <button
                  key={shareholder.id}
                  type="button"
                  onClick={() => handleSelect(shareholder)}
                  className={cn(
                    "flex w-full items-start gap-3 border-b border-border/30 px-5 py-4 text-left transition-smooth hover:bg-muted/20",
                    selectedId === shareholder.id && "bg-primary/10",
                  )}
                  data-ocid={`agm.registration.shareholder.${index + 1}`}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                    <Users className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate font-semibold text-foreground">
                        {shareholder.fullName}
                      </p>
                      <ShareholderStatusBadge status={shareholder.status} />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      #{shareholder.shareholderNumber}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {shareholder.shareholding.toLocaleString()} shares
                    </p>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/95">
            {!selected ? (
              <CardContent className="flex min-h-[520px] flex-col items-center justify-center gap-4 p-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                  <UserPlus className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Select a shareholder
                  </h2>
                  <p className="mx-auto max-w-md text-sm leading-6 text-muted-foreground">
                    Once you pick a shareholder from the left, we will open the
                    AGM registration form here with the same two-path flow:
                    in-person or proxy registration.
                  </p>
                </div>
              </CardContent>
            ) : receipt ? (
              <CardContent className="p-6">
                <div className="mx-auto flex max-w-xl flex-col items-center rounded-3xl border border-primary/20 bg-primary/5 px-6 py-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h2 className="mt-4 font-display text-2xl font-bold text-foreground">
                    Registration recorded
                  </h2>
                  <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                    The AGM desk has captured this attendee and generated a verification code for check-in.
                  </p>

                  <div className="mt-6 w-full space-y-3 rounded-2xl border border-border/60 bg-card px-5 py-4 text-left">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs uppercase tracking-wide text-muted-foreground">
                        Shareholder
                      </span>
                      <span className="font-semibold text-foreground">
                        {receipt.shareholderName}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs uppercase tracking-wide text-muted-foreground">
                        Attendee
                      </span>
                      <span className="font-semibold text-foreground">
                        {receipt.attendeeName}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs uppercase tracking-wide text-muted-foreground">
                        Mode
                      </span>
                      <span className="font-semibold text-foreground">{receipt.type}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs uppercase tracking-wide text-muted-foreground">
                        Verification Code
                      </span>
                      <span className="font-mono text-sm font-bold text-primary">
                        {receipt.verificationCode}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <Button onClick={resetForm} variant="outline" className="rounded-lg">
                      Stay on this shareholder
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedId(null);
                        resetForm();
                      }}
                      className="rounded-lg"
                    >
                      Register another attendee
                    </Button>
                  </div>
                </div>
              </CardContent>
            ) : (
              <>
                <CardHeader className="border-b border-border/40">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <CardTitle className="font-display text-xl">
                        {selected.fullName}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        #{selected.shareholderNumber} •{" "}
                        {selected.shareholding.toLocaleString()} shares
                      </CardDescription>
                    </div>
                    <ShareholderStatusBadge status={selected.status} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {(["In Person", "Proxy"] as RegistrationMode[]).map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setMode(option);
                          setReceipt(null);
                          if (option === "In Person") {
                            setAttendeeName(selected.fullName);
                            setAttendeePhone(selected.phone);
                          }
                        }}
                        className={cn(
                          "rounded-2xl border px-4 py-4 text-left transition-smooth",
                          mode === option
                            ? "border-primary/35 bg-primary/10"
                            : "border-border/60 bg-muted/15 hover:bg-muted/25",
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                            {option === "In Person" ? (
                              <UserPlus className="h-5 w-5" />
                            ) : (
                              <ArrowLeftRight className="h-5 w-5" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{option}</p>
                            <p className="text-xs text-muted-foreground">
                              {option === "In Person"
                                ? "Shareholder attends directly"
                                : "Representative attends on behalf"}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Attendee name
                      </label>
                      <Input
                        value={attendeeName}
                        onChange={(event) => setAttendeeName(event.target.value)}
                        placeholder={
                          mode === "In Person"
                            ? "Shareholder full name"
                            : "Proxy representative name"
                        }
                        className="h-11 rounded-xl border-border/60 bg-muted/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Contact number
                      </label>
                      <Input
                        value={attendeePhone}
                        onChange={(event) => setAttendeePhone(event.target.value)}
                        placeholder="Phone number"
                        className="h-11 rounded-xl border-border/60 bg-muted/20"
                      />
                    </div>
                  </div>

                  {mode === "Proxy" ? (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Proxy note
                      </label>
                      <textarea
                        value={proxyReason}
                        onChange={(event) => setProxyReason(event.target.value)}
                        placeholder="State the relationship or authority for this proxy registration..."
                        className="min-h-32 w-full rounded-2xl border border-border/60 bg-muted/20 px-4 py-3 text-sm text-foreground outline-none transition-smooth placeholder:text-muted-foreground focus:border-primary/35 focus:bg-background"
                      />
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-border/60 bg-muted/20 px-4 py-3 text-sm text-muted-foreground">
                      In-person registration keeps the shareholder as the active attendee and prepares them for AGM check-in.
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      onClick={handleSubmit}
                      disabled={!canSubmit}
                      className="min-h-11 rounded-lg px-5"
                    >
                      Save AGM Registration
                    </Button>
                    <Button
                      variant="outline"
                      onClick={resetForm}
                      className="min-h-11 rounded-lg px-5"
                    >
                      Clear form
                    </Button>
                  </div>
                </CardContent>
              </>
            )}
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
