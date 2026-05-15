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
  importAgmShareholders,
  resetAgmShareholdersToSeed,
  type AgmShareholderSeed,
  useAgmShareholders,
} from "@/lib/agm-portal";
import {
  AlertCircle,
  CheckCircle2,
  FileSpreadsheet,
  RotateCcw,
  Upload,
} from "lucide-react";
import { useState } from "react";

type ParsedImportRow = {
  shareholderNumber: string;
  fullName: string;
  phone: string;
  shareholding: number;
};

function normalizeHeader(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function parseDelimitedText(raw: string) {
  const lines = raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  if (lines.length < 2) {
    return { rows: [] as ParsedImportRow[], warnings: ["The file needs a header row and at least one shareholder row."] };
  }

  const delimiter = lines[0].includes("\t")
    ? "\t"
    : lines[0].includes(";")
      ? ";"
      : ",";

  const splitRow = (line: string) =>
    line
      .split(delimiter)
      .map((item) => item.trim().replace(/^"|"$/g, ""));

  const headers = splitRow(lines[0]).map(normalizeHeader);
  const columnIndex = {
    shareholderNumber: headers.findIndex((value) =>
      ["shareholdernumber", "membernumber", "memberno", "memberid", "chitnumber"].includes(value),
    ),
    fullName: headers.findIndex((value) =>
      ["fullname", "name", "shareholdername"].includes(value),
    ),
    phone: headers.findIndex((value) =>
      ["phone", "phonenumber", "contactnumber", "telephone", "mobile"].includes(value),
    ),
    shareholding: headers.findIndex((value) =>
      ["shareholding", "shares", "sharecount", "numberofshares"].includes(value),
    ),
  };

  const warnings: string[] = [];
  if (columnIndex.shareholderNumber < 0) warnings.push("Could not find a shareholder number column.");
  if (columnIndex.fullName < 0) warnings.push("Could not find a full name column.");
  if (columnIndex.phone < 0) warnings.push("Could not find a phone column. Phones will be left blank.");
  if (columnIndex.shareholding < 0) warnings.push("Could not find a shareholding column. Shareholding will default to 0.");

  const rows = lines.slice(1).reduce<ParsedImportRow[]>((accumulator, line) => {
    const columns = splitRow(line);
    const shareholderNumber =
      columnIndex.shareholderNumber >= 0 ? columns[columnIndex.shareholderNumber] ?? "" : "";
    const fullName = columnIndex.fullName >= 0 ? columns[columnIndex.fullName] ?? "" : "";
    if (!shareholderNumber || !fullName) return accumulator;
    const phone = columnIndex.phone >= 0 ? columns[columnIndex.phone] ?? "" : "";
    const shareholdingRaw =
      columnIndex.shareholding >= 0 ? columns[columnIndex.shareholding] ?? "0" : "0";
    const shareholding = Number(shareholdingRaw.replace(/,/g, ""));
    accumulator.push({
      shareholderNumber,
      fullName,
      phone,
      shareholding: Number.isFinite(shareholding) ? shareholding : 0,
    });
    return accumulator;
  }, []);

  if (rows.length === 0) {
    warnings.push("No valid shareholder rows were found after parsing the file.");
  }

  return { rows, warnings };
}

export default function AgmImportPage() {
  const [fileName, setFileName] = useState("");
  const [parsedRows, setParsedRows] = useState<ParsedImportRow[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [importedCount, setImportedCount] = useState<number | null>(null);
  const currentShareholders = useAgmShareholders();

  async function handleFileChange(file: File | null) {
    if (!file) return;
    setImportedCount(null);
    setFileName(file.name);
    const text = await file.text();
    const parsed = parseDelimitedText(text);
    setParsedRows(parsed.rows);
    setWarnings(parsed.warnings);
  }

  function handleImport() {
    const nextShareholders: AgmShareholderSeed[] = parsedRows.map((row, index) => ({
      id: `agm-import-${index + 1}-${row.shareholderNumber.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      fullName: row.fullName,
      shareholderNumber: row.shareholderNumber,
      phone: row.phone,
      shareholding: row.shareholding,
    }));
    importAgmShareholders(nextShareholders);
    setImportedCount(nextShareholders.length);
  }

  return (
    <AppShell>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6" data-ocid="agm.import.page">
        <section className="rounded-3xl border border-border/60 bg-card/95 px-6 py-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <Badge className="rounded-full border border-primary/20 bg-primary/15 px-3 py-1 text-primary">
                AGM Import
              </Badge>
              <div>
                <h1 className="font-display text-3xl font-bold text-foreground">
                  Import shareholder lists
                </h1>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
                  Bring AGM shareholder data into the portal so registration and the
                  shareholders page can run on your imported list instead of the
                  starter sample records.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-border/60 bg-muted/20 px-4 py-3 text-sm text-muted-foreground">
              CSV, comma-separated text, semicolon-separated text, and tab-separated
              files are supported in this first pass.
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="border-border/60 bg-card/95">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display text-lg">
                <Upload className="h-5 w-5 text-primary" />
                Upload file
              </CardTitle>
              <CardDescription>
                We will auto-detect common shareholder columns like name, member
                number, phone, and shareholding.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-primary/30 bg-primary/5 px-6 text-center">
                <FileSpreadsheet className="mb-3 h-10 w-10 text-primary" />
                <span className="text-sm font-semibold text-foreground">
                  Choose AGM shareholder file
                </span>
                <span className="mt-1 text-xs text-muted-foreground">
                  CSV, TXT, or spreadsheet-export text files
                </span>
                <input
                  type="file"
                  accept=".csv,.txt,.tsv"
                  className="hidden"
                  onChange={(event) => handleFileChange(event.target.files?.[0] ?? null)}
                />
              </label>

              {fileName ? (
                <div className="rounded-xl border border-border/60 bg-muted/20 px-4 py-3 text-sm text-muted-foreground">
                  Loaded file: <span className="font-semibold text-foreground">{fileName}</span>
                </div>
              ) : null}

              {warnings.length > 0 ? (
                <div className="space-y-2 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-4">
                  {warnings.map((warning) => (
                    <div key={warning} className="flex items-start gap-2 text-sm text-amber-200">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>{warning}</span>
                    </div>
                  ))}
                </div>
              ) : null}

              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handleImport}
                  disabled={parsedRows.length === 0}
                  className="min-h-11 rounded-lg px-5"
                >
                  Import {parsedRows.length > 0 ? parsedRows.length.toLocaleString() : ""} Shareholders
                </Button>
                <Button
                  variant="outline"
                  className="min-h-11 rounded-lg px-5"
                  onClick={() => {
                    setFileName("");
                    setParsedRows([]);
                    setWarnings([]);
                    setImportedCount(null);
                  }}
                >
                  Clear Upload
                </Button>
                <Button
                  variant="outline"
                  className="min-h-11 rounded-lg px-5"
                  onClick={() => {
                    resetAgmShareholdersToSeed();
                    setImportedCount(null);
                  }}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Restore Starter List
                </Button>
              </div>

              {importedCount !== null ? (
                <div className="flex items-start gap-3 rounded-2xl border border-primary/25 bg-primary/10 px-4 py-4 text-sm">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">
                      Import complete
                    </p>
                    <p className="mt-1 text-muted-foreground">
                      {importedCount.toLocaleString()} shareholder records now power the AGM module.
                    </p>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/95">
            <CardHeader>
              <CardTitle className="font-display text-lg">Preview & current library</CardTitle>
              <CardDescription>
                A quick look at what will be imported and what the AGM module is currently using.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Parsed rows
                </p>
                <div className="mt-3 max-h-64 overflow-y-auto rounded-2xl border border-border/60">
                  {parsedRows.length === 0 ? (
                    <div className="px-4 py-10 text-center text-sm text-muted-foreground">
                      Upload a file to preview shareholder rows here.
                    </div>
                  ) : (
                    <table className="w-full text-sm">
                      <thead className="border-b border-border/40 bg-muted/25">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Member No
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Name
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Shares
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {parsedRows.slice(0, 8).map((row) => (
                          <tr key={`${row.shareholderNumber}-${row.fullName}`} className="border-b border-border/30">
                            <td className="px-4 py-3 font-mono text-xs text-foreground">
                              {row.shareholderNumber}
                            </td>
                            <td className="px-4 py-3 text-foreground">{row.fullName}</td>
                            <td className="px-4 py-3 text-foreground">
                              {row.shareholding.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Current AGM shareholder source
                </p>
                <div className="mt-3 rounded-2xl border border-border/60 bg-muted/20 px-4 py-4">
                  <p className="text-3xl font-display font-bold text-foreground">
                    {currentShareholders.length.toLocaleString()}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    live shareholder records available to AGM registration and the AGM shareholders page
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
