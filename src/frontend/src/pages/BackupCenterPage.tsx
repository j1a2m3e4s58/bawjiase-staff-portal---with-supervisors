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
import { apiDownloadProductionBackup } from "@/lib/backend-client";
import { useAuth } from "@/store/auth";
import { AlertTriangle, Database, Download, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const BACKUP_ITEMS = [
  "Staff directory and profile records",
  "Password hashes and auth recovery stores",
  "Announcements, forms, training videos, and training documents",
  "Notifications, video progress, document opens, and reminders",
  "Presence/session stores and audit logs",
];

export default function BackupCenterPage() {
  const { user } = useAuth();
  const [downloading, setDownloading] = useState(false);
  const canBackup =
    user?.role === "SuperAdmin" || user?.role === "HRAdmin";

  async function handleDownload() {
    setDownloading(true);
    const result = await apiDownloadProductionBackup();
    setDownloading(false);
    if ("err" in result) {
      toast.error(result.err);
      return;
    }
    toast.success(`Backup downloaded: ${result.ok}`);
  }

  return (
    <AppShell>
      <div className="container-page py-8 space-y-6 animate-fade-in">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge variant="outline" className="mb-3 gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" />
              IT/HR protected
            </Badge>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Backup Center
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Download one production JSON backup before migration, major
              deployments, or client handover.
            </p>
          </div>
          <Button
            type="button"
            onClick={handleDownload}
            disabled={!canBackup || downloading}
            className="gap-2"
            data-ocid="backup.download_production_backup"
          >
            <Download className="h-4 w-4" />
            {downloading ? "Preparing backup..." : "Download Backup"}
          </Button>
        </div>

        <Card className="glass-card-elevated">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              What This Backup Includes
            </CardTitle>
            <CardDescription>
              The file is meant for IT/HR only and should be stored securely.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {BACKUP_ITEMS.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-border/60 bg-muted/30 px-4 py-3 text-sm"
              >
                {item}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-amber-500/30 bg-amber-500/10">
          <CardContent className="flex gap-3 pt-6 text-sm text-amber-900 dark:text-amber-200">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Security warning</p>
              <p className="mt-1 leading-6">
                This backup can contain sensitive staff and authentication data.
                Do not send it through public WhatsApp groups or leave it on a
                shared computer.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
