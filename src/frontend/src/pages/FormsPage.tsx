import { AppShell } from "@/components/AppShell";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { EmptyState } from "@/components/EmptyState";
import { SkeletonCard } from "@/components/SkeletonCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type CreateFormRequest,
  apiCreateForm,
  apiDeleteForm,
  apiGetForms,
  apiUpdateForm,
} from "@/lib/backend-client";
import { useAuth } from "@/store/auth";
import type { PortalForm, Role } from "@/types";
import { isOk } from "@/types";
import {
  CalendarDays,
  Edit2,
  ExternalLink,
  FileText,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

// ── Constants ──────────────────────────────────────────────────────────────────

const CATEGORIES = ["General", "HR", "IT", "Finance", "Operations"] as const;
type Category = (typeof CATEGORIES)[number];

const CATEGORY_COLORS: Record<Category, string> = {
  General: "bg-muted text-muted-foreground",
  HR: "bg-secondary/20 text-secondary",
  IT: "bg-accent/20 text-accent",
  Finance: "bg-primary/20 text-primary",
  Operations: "bg-chart-4/20 text-chart-4",
};

// ── Helpers ────────────────────────────────────────────────────────────────────

function resolveFormUrl(fileUrl: string): string {
  if (fileUrl.startsWith("http://") || fileUrl.startsWith("https://")) {
    return fileUrl;
  }
  return `https://drive.google.com/file/d/${fileUrl}/view`;
}

function extractDriveFileId(input: string): string {
  // /d/FILE_ID/ pattern
  const slashMatch = input.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (slashMatch) return slashMatch[1];
  // ?id=FILE_ID pattern
  const idMatch = input.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch) return idMatch[1];
  return input;
}

function formatDate(ts: bigint): string {
  return new Date(Number(ts)).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ── Form Dialog ────────────────────────────────────────────────────────────────

interface FormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial?: PortalForm;
  onSave: (req: CreateFormRequest) => Promise<void>;
  isSaving: boolean;
}

function FormDialog({
  open,
  onOpenChange,
  initial,
  onSave,
  isSaving,
}: FormDialogProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [category, setCategory] = useState<string>(
    initial?.category ?? "General",
  );
  const [fileUrl, setFileUrl] = useState(initial?.fileUrl ?? "");

  // Reset when initial changes
  useEffect(() => {
    setTitle(initial?.title ?? "");
    setCategory(initial?.category ?? "General");
    setFileUrl(initial?.fileUrl ?? "");
  }, [initial]);

  const handleSubmit = async () => {
    if (!title.trim() || !fileUrl.trim()) {
      toast.error("Title and file URL are required");
      return;
    }
    const processedUrl = extractDriveFileId(fileUrl.trim());
    await onSave({
      title: title.trim(),
      description: "",
      fileUrl: processedUrl,
      category,
      visibleTo: ["GeneralStaff", "HRAdmin", "SuperAdmin"] as Role[],
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="glass-card-elevated sm:max-w-md"
        data-ocid="forms.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display">
            {initial ? "Edit Form" : "Add New Form"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="form-title">Form Title</Label>
            <Input
              id="form-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Staff Leave Application"
              data-ocid="forms.title.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="form-category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger
                id="form-category"
                data-ocid="forms.category.select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="form-url">File URL / Google Drive Link</Label>
            <Input
              id="form-url"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              placeholder="Paste Google Drive URL or direct link"
              data-ocid="forms.url.input"
            />
            <p className="text-xs text-muted-foreground">
              Paste a Google Drive sharing URL, a{" "}
              <span className="font-mono">/d/FILE_ID/</span> link, or any direct
              HTTPS link.
            </p>
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            data-ocid="forms.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSaving}
            data-ocid="forms.submit_button"
          >
            {isSaving ? "Saving…" : initial ? "Save Changes" : "Add Form"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ── Form Card ──────────────────────────────────────────────────────────────────

interface FormCardProps {
  form: PortalForm;
  canAdmin: boolean;
  onEdit: (form: PortalForm) => void;
  onDelete: (form: PortalForm) => void;
  index: number;
}

function FormCard({ form, canAdmin, onEdit, onDelete, index }: FormCardProps) {
  const catColor =
    CATEGORY_COLORS[form.category as Category] ?? CATEGORY_COLORS.General;

  return (
    <div
      className="glass-card rounded-xl p-4 flex items-start gap-4 hover:shadow-glass transition-smooth group"
      data-ocid={`forms.item.${index}`}
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
        <FileText className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm text-foreground truncate leading-snug">
            {form.title}
          </h3>
          <Badge className={`text-[11px] flex-shrink-0 ${catColor}`}>
            {form.category}
          </Badge>
        </div>
        <div className="flex items-center gap-1.5 mt-1.5 text-xs text-muted-foreground">
          <CalendarDays className="h-3.5 w-3.5" />
          <span>Added {formatDate(form.createdAt)}</span>
        </div>
      </div>
      <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-smooth">
        {canAdmin && (
          <>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onEdit(form)}
              data-ocid={`forms.edit_button.${index}`}
            >
              <Edit2 className="h-3.5 w-3.5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={() => onDelete(form)}
              data-ocid={`forms.delete_button.${index}`}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </>
        )}
        <Button
          type="button"
          size="sm"
          className="h-8 text-xs gap-1.5"
          onClick={() => window.open(resolveFormUrl(form.fileUrl), "_blank")}
          data-ocid={`forms.open_button.${index}`}
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Open
        </Button>
      </div>
    </div>
  );
}

// ── FormsPage ─────────────────────────────────────────────────────────────────

export default function FormsPage() {
  const { user } = useAuth();
  const canAdmin = user?.role === "SuperAdmin" || user?.role === "HRAdmin";

  const [forms, setForms] = useState<PortalForm[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingForm, setEditingForm] = useState<PortalForm | undefined>();
  const [isSaving, setIsSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<PortalForm | undefined>();
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    apiGetForms().then((data) => {
      setForms(data);
      setIsLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    return forms.filter((f) => {
      const matchSearch =
        !search || f.title.toLowerCase().includes(search.toLowerCase());
      const matchCat =
        activeCategory === "All" || f.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [forms, search, activeCategory]);

  const grouped = useMemo(() => {
    const map: Record<string, PortalForm[]> = {};
    for (const f of filtered) {
      if (!map[f.category]) map[f.category] = [];
      map[f.category].push(f);
    }
    return map;
  }, [filtered]);

  const handleSave = async (req: CreateFormRequest) => {
    setIsSaving(true);
    try {
      if (editingForm) {
        const res = await apiUpdateForm(editingForm.id, req);
        if (isOk(res)) {
          setForms((prev) =>
            prev.map((f) => (f.id === editingForm.id ? res.ok : f)),
          );
          toast.success("Form updated");
        } else {
          toast.error(res.err);
        }
      } else {
        const res = await apiCreateForm(req);
        if (isOk(res)) {
          setForms((prev) => [res.ok, ...prev]);
          toast.success("Form added");
        } else {
          toast.error(res.err);
        }
      }
      setDialogOpen(false);
      setEditingForm(undefined);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    const res = await apiDeleteForm(deleteTarget.id);
    if (isOk(res)) {
      setForms((prev) => prev.filter((f) => f.id !== deleteTarget.id));
      toast.success("Form removed");
    } else {
      toast.error(res.err);
    }
    setIsDeleting(false);
    setDeleteTarget(undefined);
  };

  const categoryTabs = ["All", ...CATEGORIES];

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto space-y-6" data-ocid="forms.page">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Forms Centre
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Access and download official bank forms
            </p>
          </div>
          {canAdmin && (
            <Button
              type="button"
              size="sm"
              className="gap-2"
              onClick={() => {
                setEditingForm(undefined);
                setDialogOpen(true);
              }}
              data-ocid="forms.add_button"
            >
              <Plus className="h-4 w-4" />
              Add Form
            </Button>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search forms…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-ocid="forms.search_input"
          />
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 flex-wrap" data-ocid="forms.category.tab">
          {categoryTabs.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-smooth ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted"
              }`}
              data-ocid={`forms.filter.${cat.toLowerCase()}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="space-y-3" data-ocid="forms.loading_state">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCard key={i} lines={2} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<FileText className="h-7 w-7" />}
            title="No forms found"
            description={
              search
                ? `No forms match "${search}"`
                : "No forms available in this category yet."
            }
            actionLabel={canAdmin ? "Add Form" : undefined}
            onAction={
              canAdmin
                ? () => {
                    setEditingForm(undefined);
                    setDialogOpen(true);
                  }
                : undefined
            }
            data-ocid="forms.empty_state"
          />
        ) : (
          <div className="space-y-6">
            {Object.entries(grouped).map(([category, catForms]) => (
              <section key={category}>
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  {category}
                </h2>
                <div className="space-y-2.5">
                  {catForms.map((form, i) => (
                    <FormCard
                      key={form.id}
                      form={form}
                      canAdmin={canAdmin}
                      onEdit={(f) => {
                        setEditingForm(f);
                        setDialogOpen(true);
                      }}
                      onDelete={setDeleteTarget}
                      index={i + 1}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Dialog */}
      <FormDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setEditingForm(undefined);
        }}
        initial={editingForm}
        onSave={handleSave}
        isSaving={isSaving}
      />

      {/* Delete Confirm */}
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(undefined)}
        title="Delete Form?"
        description={`Remove "${deleteTarget?.title}" from the forms centre? This cannot be undone.`}
        confirmLabel={isDeleting ? "Deleting…" : "Delete"}
        variant="destructive"
        onConfirm={handleDelete}
      />
    </AppShell>
  );
}
