import { AppShell } from "@/components/AppShell";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { EmptyState } from "@/components/EmptyState";
import { PortalCard } from "@/components/PortalCard";
import { RoleGuard } from "@/components/RoleGuard";
import { SkeletonCard } from "@/components/SkeletonCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
<<<<<<< HEAD
  apiArchiveTrainingDocument,
  apiArchiveTrainingVideo,
  apiDeleteTrainingDocument,
  apiDeleteTrainingVideo,
  apiGetMyDocumentOpenState,
  apiGetMyVideoProgress,
  apiGetTrainingDocuments,
  apiGetTrainingVideos,
} from "@/lib/backend-client";
import { useAuth } from "@/store/auth";
import type { TrainingDocument, TrainingVideo } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  Archive,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
=======
  apiArchiveTrainingVideo,
  apiDeleteTrainingVideo,
  apiGetTrainingDocuments,
  apiGetTrainingVideos,
} from "@/lib/backend-client";
import type { TrainingDocument, TrainingVideo } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  Archive,
  BookOpen,
  Calendar,
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
  ExternalLink,
  FileSpreadsheet,
  FileText,
  FileType,
  GraduationCap,
  LayoutGrid,
  PlayCircle,
  Search,
  Trash2,
  Upload,
  Video,
} from "lucide-react";
<<<<<<< HEAD
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

=======
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ── Helpers ───────────────────────────────────────────────────────────────────

>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
function formatDate(ts: bigint): string {
  return new Date(Number(ts)).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function DocIcon({ fileType }: { fileType: string }) {
<<<<<<< HEAD
  const type = fileType.toLowerCase();
  if (type.includes("pdf")) {
    return <FileText className="h-7 w-7 text-destructive/80" />;
  }
  if (type.includes("sheet") || type.includes("xls")) {
    return <FileSpreadsheet className="h-7 w-7 text-secondary" />;
  }
  if (type.includes("presentation") || type.includes("ppt")) {
    return <FileType className="h-7 w-7 text-accent" />;
  }
  return <BookOpen className="h-7 w-7 text-primary" />;
}

function visibilityLabel(
  value?: "General" | "Department",
  department?: string | null,
) {
  if (value === "Department") return department || "Department";
  return "General";
}

export default function TrainingHubPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === "HRAdmin" || user?.role === "SuperAdmin";

  const [tab, setTab] = useState("videos");
  const [videos, setVideos] = useState<TrainingVideo[]>([]);
  const [documents, setDocuments] = useState<TrainingDocument[]>([]);
  const [videoProgress, setVideoProgress] = useState<Record<number, number>>(
    {},
  );
  const [documentOpened, setDocumentOpened] = useState<Record<number, boolean>>(
    {},
  );
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [loadingDocuments, setLoadingDocuments] = useState(true);
  const [query, setQuery] = useState("");
  const [visibilityFilter, setVisibilityFilter] = useState("all");
  const [mandatoryFilter, setMandatoryFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");

=======
  const t = fileType.toLowerCase();
  if (t.includes("pdf"))
    return <FileText className="h-8 w-8 text-destructive/80" />;
  if (t.includes("xls") || t.includes("sheet"))
    return <FileSpreadsheet className="h-8 w-8 text-secondary" />;
  if (t.includes("ppt") || t.includes("presentation"))
    return <FileType className="h-8 w-8 text-accent" />;
  return <BookOpen className="h-8 w-8 text-primary" />;
}

// ── Video Card ────────────────────────────────────────────────────────────────

interface VideoCardProps {
  video: TrainingVideo;
  index: number;
  isAdmin: boolean;
  onArchive: (v: TrainingVideo) => void;
  onDelete: (v: TrainingVideo) => void;
}

function VideoCard({
  video,
  index,
  isAdmin,
  onArchive,
  onDelete,
}: VideoCardProps) {
  const navigate = useNavigate();
  return (
    <div
      className="glass-card rounded-xl overflow-hidden transition-smooth hover:shadow-glass group"
      data-ocid={`training.video.item.${index}`}
    >
      {/* Thumbnail */}
      <button
        type="button"
        className="w-full relative aspect-video bg-primary/10 flex items-center justify-center cursor-pointer overflow-hidden"
        onClick={() => navigate({ to: `/training/video/${video.id}` })}
        data-ocid={`training.video.play_button.${index}`}
      >
        {video.thumbnailUrl ? (
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
            <Video className="h-12 w-12 text-primary/50" />
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth bg-foreground/20">
          <PlayCircle className="h-14 w-14 text-primary-foreground drop-shadow-lg" />
        </div>
      </button>

      {/* Body */}
      <div className="p-4 space-y-2">
        <div className="flex items-start gap-2">
          <button
            type="button"
            className="flex-1 text-left"
            onClick={() => navigate({ to: `/training/video/${video.id}` })}
          >
            <h3 className="font-display font-semibold text-foreground text-sm leading-snug line-clamp-2 hover:text-primary transition-colors">
              {video.title}
            </h3>
          </button>
          {video.visibleTo.length < 3 && (
            <Badge variant="outline" className="text-[10px] shrink-0">
              Dept
            </Badge>
          )}
        </div>

        {video.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {video.description}
          </p>
        )}

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formatDate(video.uploadedAt)}</span>
          </div>
          {video.category && (
            <Badge className="text-[10px] bg-primary/10 text-primary border-primary/20">
              {video.category}
            </Badge>
          )}
        </div>

        {isAdmin && (
          <div className="flex gap-2 pt-2 border-t border-border/30">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex-1 text-xs gap-1.5"
              onClick={() => onArchive(video)}
              data-ocid={`training.video.archive_button.${index}`}
            >
              <Archive className="h-3.5 w-3.5" />
              Archive
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex-1 text-xs gap-1.5 text-destructive hover:text-destructive border-destructive/30 hover:bg-destructive/10"
              onClick={() => onDelete(video)}
              data-ocid={`training.video.delete_button.${index}`}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Document Card ─────────────────────────────────────────────────────────────

interface DocCardProps {
  doc: TrainingDocument;
  index: number;
  isAdmin: boolean;
  onOpen: (d: TrainingDocument) => void;
  onArchive: (d: TrainingDocument) => void;
  onDelete: (d: TrainingDocument) => void;
}

function DocCard({
  doc,
  index,
  isAdmin,
  onOpen,
  onArchive,
  onDelete,
}: DocCardProps) {
  return (
    <div
      className="glass-card rounded-xl p-4 transition-smooth hover:shadow-glass flex flex-col gap-3"
      data-ocid={`training.doc.item.${index}`}
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
          <DocIcon fileType={doc.fileType} />
        </div>
        <div className="flex-1 min-w-0">
          <button
            type="button"
            className="text-left w-full"
            onClick={() => onOpen(doc)}
            data-ocid={`training.doc.open_button.${index}`}
          >
            <h3 className="font-display font-semibold text-sm text-foreground line-clamp-2 hover:text-primary transition-colors">
              {doc.title}
            </h3>
          </button>
          {doc.description && (
            <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
              {doc.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          <span>{formatDate(doc.uploadedAt)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          {doc.fileType && (
            <Badge variant="outline" className="text-[10px] uppercase">
              {doc.fileType.split("/").pop()}
            </Badge>
          )}
          {doc.visibleTo.length < 3 && (
            <Badge variant="outline" className="text-[10px]">
              Dept
            </Badge>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="default"
          size="sm"
          className="flex-1 text-xs gap-1.5"
          onClick={() => onOpen(doc)}
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Open
        </Button>
        {isAdmin && (
          <>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="text-xs gap-1"
              onClick={() => onArchive(doc)}
              data-ocid={`training.doc.archive_button.${index}`}
            >
              <Archive className="h-3.5 w-3.5" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="text-xs gap-1 text-destructive hover:text-destructive border-destructive/30 hover:bg-destructive/10"
              onClick={() => onDelete(doc)}
              data-ocid={`training.doc.delete_button.${index}`}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function TrainingHubPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("videos");

  // Videos state
  const [videos, setVideos] = useState<TrainingVideo[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [videoSearch, setVideoSearch] = useState("");
  const [videoFilter, setVideoFilter] = useState("all");

  // Documents state
  const [docs, setDocs] = useState<TrainingDocument[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(true);
  const [docSearch, setDocSearch] = useState("");
  const [docFilter, setDocFilter] = useState("all");

  // Confirm dialogs
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
  const [archiveVideoTarget, setArchiveVideoTarget] =
    useState<TrainingVideo | null>(null);
  const [deleteVideoTarget, setDeleteVideoTarget] =
    useState<TrainingVideo | null>(null);
  const [archiveDocTarget, setArchiveDocTarget] =
    useState<TrainingDocument | null>(null);
  const [deleteDocTarget, setDeleteDocTarget] =
    useState<TrainingDocument | null>(null);

  useEffect(() => {
    apiGetTrainingVideos()
<<<<<<< HEAD
      .then(async (items) => {
        setVideos(items);
        const progressEntries = await Promise.all(
          items.map(async (video) => {
            const progress = await apiGetMyVideoProgress(video.id);
            return [video.id, progress?.progressPercent ?? 0] as const;
          }),
        );
        setVideoProgress(Object.fromEntries(progressEntries));
      })
      .finally(() => setLoadingVideos(false));

    apiGetTrainingDocuments()
      .then(async (items) => {
        setDocuments(items);
        const openedEntries = await Promise.all(
          items.map(async (doc) => {
            const state = await apiGetMyDocumentOpenState(doc.id);
            return [doc.id, state.isOpened] as const;
          }),
        );
        setDocumentOpened(Object.fromEntries(openedEntries));
      })
      .finally(() => setLoadingDocuments(false));
  }, []);

  const departments = useMemo(() => {
    const values = new Set<string>();
    for (const video of videos) {
      if (video.department) values.add(video.department);
    }
    for (const doc of documents) {
      if (doc.department) values.add(doc.department);
    }
    return [...values].sort();
  }, [videos, documents]);

  function matchesCommonFilters(item: {
    title: string;
    description: string;
    visibility?: "General" | "Department";
    department?: string | null;
    isMandatory?: boolean;
    category: string;
  }) {
    const term = query.trim().toLowerCase();
    const matchesQuery =
      !term ||
      item.title.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term) ||
      (item.department ?? "").toLowerCase().includes(term);
    const matchesVisibility =
      visibilityFilter === "all" ||
      item.visibility?.toLowerCase() === visibilityFilter;
    const matchesMandatory =
      mandatoryFilter === "all" ||
      (mandatoryFilter === "mandatory"
        ? !!item.isMandatory
        : !item.isMandatory);
    const matchesDepartment =
      departmentFilter === "all" ||
      (item.department ?? "").toUpperCase() === departmentFilter;
    return (
      matchesQuery && matchesVisibility && matchesMandatory && matchesDepartment
    );
  }

  const filteredVideos = videos.filter(matchesCommonFilters);
  const filteredDocuments = documents.filter(matchesCommonFilters);
=======
      .then(setVideos)
      .finally(() => setLoadingVideos(false));
    apiGetTrainingDocuments()
      .then(setDocs)
      .finally(() => setLoadingDocs(false));
  }, []);

  // ── Filters ──────────────────────────────────────────────────────────────────

  const filteredVideos = videos
    .filter((v) => !v.isArchived)
    .filter(
      (v) =>
        v.title.toLowerCase().includes(videoSearch.toLowerCase()) ||
        v.description.toLowerCase().includes(videoSearch.toLowerCase()),
    )
    .filter((v) => {
      if (videoFilter === "general") return v.visibleTo.length >= 3;
      if (videoFilter === "department") return v.visibleTo.length < 3;
      return true;
    });

  const filteredDocs = docs
    .filter((d) => !d.isArchived)
    .filter(
      (d) =>
        d.title.toLowerCase().includes(docSearch.toLowerCase()) ||
        d.description.toLowerCase().includes(docSearch.toLowerCase()),
    )
    .filter((d) => {
      if (docFilter === "general") return d.visibleTo.length >= 3;
      if (docFilter === "department") return d.visibleTo.length < 3;
      return true;
    });

  // ── Actions ───────────────────────────────────────────────────────────────────
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58

  async function handleArchiveVideo() {
    if (!archiveVideoTarget) return;
    await apiArchiveTrainingVideo(archiveVideoTarget.id);
    setVideos((prev) =>
<<<<<<< HEAD
      prev.filter((item) => item.id !== archiveVideoTarget.id),
=======
      prev.map((v) =>
        v.id === archiveVideoTarget.id ? { ...v, isArchived: true } : v,
      ),
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
    );
    toast.success(`"${archiveVideoTarget.title}" archived`);
    setArchiveVideoTarget(null);
  }

  async function handleDeleteVideo() {
    if (!deleteVideoTarget) return;
    await apiDeleteTrainingVideo(deleteVideoTarget.id);
<<<<<<< HEAD
    setVideos((prev) =>
      prev.filter((item) => item.id !== deleteVideoTarget.id),
    );
=======
    setVideos((prev) => prev.filter((v) => v.id !== deleteVideoTarget.id));
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
    toast.success(`"${deleteVideoTarget.title}" deleted`);
    setDeleteVideoTarget(null);
  }

<<<<<<< HEAD
  async function handleArchiveDocument() {
    if (!archiveDocTarget) return;
    await apiArchiveTrainingDocument(archiveDocTarget.id);
    setDocuments((prev) =>
      prev.filter((item) => item.id !== archiveDocTarget.id),
    );
    toast.success(`"${archiveDocTarget.title}" archived`);
    setArchiveDocTarget(null);
  }

  async function handleDeleteDocument() {
    if (!deleteDocTarget) return;
    await apiDeleteTrainingDocument(deleteDocTarget.id);
    setDocuments((prev) =>
      prev.filter((item) => item.id !== deleteDocTarget.id),
    );
    toast.success(`"${deleteDocTarget.title}" deleted`);
    setDeleteDocTarget(null);
=======
  async function handleOpenDoc(doc: TrainingDocument) {
    window.open(doc.fileUrl, "_blank", "noopener noreferrer");
    toast.info(`Opening "${doc.title}"`);
  }

  function handleArchiveDoc(doc: TrainingDocument) {
    setArchiveDocTarget(doc);
  }

  function handleDeleteDoc(doc: TrainingDocument) {
    setDeleteDocTarget(doc);
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
  }

  return (
    <AppShell>
<<<<<<< HEAD
      <div className="space-y-6">
        <PortalCard
          className="overflow-hidden"
          action={
            <RoleGuard roles={["SuperAdmin", "HRAdmin"]}>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  onClick={() => navigate({ to: "/training/admin" })}
                >
                  <LayoutGrid className="h-4 w-4" />
                  Dashboard
                </Button>
                {tab === "videos" ? (
                  <Button
                    type="button"
                    size="sm"
                    className="gap-1.5"
                    onClick={() => navigate({ to: "/training/upload-video" })}
                  >
                    <Upload className="h-4 w-4" />
                    Upload Video
                  </Button>
                ) : (
                  <Button
                    type="button"
                    size="sm"
                    className="gap-1.5"
                    onClick={() =>
                      navigate({ to: "/training/upload-document" })
                    }
                  >
                    <Upload className="h-4 w-4" />
                    Upload Document
                  </Button>
                )}
              </div>
            </RoleGuard>
          }
        >
          <div className="grid gap-5 lg:grid-cols-[1.35fr_.95fr]">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-primary" />
                <h1 className="font-display text-2xl font-bold text-foreground">
                  Training And Documents Portal
                </h1>
              </div>
              <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
                Access training videos, policy documents, and mandatory internal
                materials shaped around the workflow from the original staff
                portal.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  {videos.length} active videos
                </Badge>
                <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                  {documents.length} active documents
                </Badge>
                {user?.department && (
                  <Badge variant="outline">{user.department}</Badge>
                )}
              </div>
            </div>

            <PortalCard className="p-4">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-lg border border-border/40 bg-background/40 p-3">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Training progress
                  </div>
                  <div className="mt-2 text-2xl font-display font-bold text-foreground">
                    {
                      Object.values(videoProgress).filter(
                        (value) => value >= 98,
                      ).length
                    }
                  </div>
                  <div className="text-xs text-muted-foreground">
                    completed videos in your feed
                  </div>
                </div>
                <div className="rounded-lg border border-border/40 bg-background/40 p-3">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Documents opened
                  </div>
                  <div className="mt-2 text-2xl font-display font-bold text-foreground">
                    {Object.values(documentOpened).filter(Boolean).length}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    documents reviewed by this account
                  </div>
                </div>
              </div>
            </PortalCard>
          </div>
        </PortalCard>

        <PortalCard>
          <div className="grid gap-3 lg:grid-cols-[1.4fr_repeat(3,minmax(0,1fr))]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by title, description, category, or department"
                className="pl-9"
              />
            </div>
            <Select
              value={visibilityFilter}
              onValueChange={setVisibilityFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All visibility</SelectItem>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="department">Department</SelectItem>
              </SelectContent>
            </Select>
            <Select value={mandatoryFilter} onValueChange={setMandatoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Mandatory" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All items</SelectItem>
                <SelectItem value="mandatory">Mandatory only</SelectItem>
                <SelectItem value="optional">Optional only</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={departmentFilter}
              onValueChange={setDepartmentFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All departments</SelectItem>
                {departments.map((department) => (
                  <SelectItem key={department} value={department}>
                    {department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </PortalCard>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="videos">
              <Video className="mr-1.5 h-4 w-4" />
              Training Videos
            </TabsTrigger>
            <TabsTrigger value="documents">
              <BookOpen className="mr-1.5 h-4 w-4" />
              Documents
            </TabsTrigger>
          </TabsList>

          <TabsContent value="videos" className="space-y-4">
            {loadingVideos ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {[
                  "video-skeleton-1",
                  "video-skeleton-2",
                  "video-skeleton-3",
                  "video-skeleton-4",
                  "video-skeleton-5",
                  "video-skeleton-6",
                ].map((key) => (
                  <SkeletonCard key={key} hasImage lines={4} />
                ))}
              </div>
            ) : filteredVideos.length === 0 ? (
              <EmptyState
                icon={<Video className="h-7 w-7" />}
                title="No training videos match these filters"
                description="Try another search or loosen the visibility and department filters."
              />
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredVideos.map((video) => {
                  const progress = videoProgress[video.id] ?? 0;
                  const watched = progress > 0;
                  const completed = progress >= 98;
                  return (
                    <PortalCard key={video.id} className="p-0 overflow-hidden">
                      <button
                        type="button"
                        className="flex aspect-video w-full items-center justify-center bg-primary/10"
                        onClick={() =>
                          navigate({ to: `/training/video/${video.id}` })
                        }
                      >
                        <PlayCircle className="h-14 w-14 text-primary/60" />
                      </button>
                      <div className="space-y-4 p-5">
                        <div className="flex flex-wrap items-start gap-2">
                          <div className="min-w-0 flex-1">
                            <h3 className="font-display text-lg font-semibold text-foreground">
                              {video.title}
                            </h3>
                            <p className="mt-1 line-clamp-3 text-sm text-muted-foreground">
                              {video.description}
                            </p>
                          </div>
                          <Badge
                            className={
                              completed
                                ? "bg-secondary/10 text-secondary border-secondary/20"
                                : watched
                                  ? "bg-amber-500/10 text-amber-600 border-amber-400/20"
                                  : "bg-primary/10 text-primary border-primary/20"
                            }
                          >
                            {completed
                              ? "Watched"
                              : watched
                                ? "In progress"
                                : "Not watched"}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">
                            {visibilityLabel(
                              video.visibility,
                              video.department,
                            )}
                          </Badge>
                          {video.isMandatory && (
                            <Badge className="bg-destructive/10 text-destructive border-destructive/20">
                              Mandatory
                            </Badge>
                          )}
                          <Badge className="bg-primary/10 text-primary border-primary/20">
                            {video.category}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Clock3 className="h-3.5 w-3.5" />
                            {formatDate(video.uploadedAt)}
                          </div>
                          <span>{Math.round(progress)}% complete</span>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            type="button"
                            className="flex-1 gap-1.5"
                            onClick={() =>
                              navigate({ to: `/training/video/${video.id}` })
                            }
                          >
                            <PlayCircle className="h-4 w-4" />
                            Watch Video
                          </Button>
                          {isAdmin && (
                            <>
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => setArchiveVideoTarget(video)}
                              >
                                <Archive className="h-4 w-4" />
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="border-destructive/30 text-destructive hover:bg-destructive/10"
                                onClick={() => setDeleteVideoTarget(video)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </PortalCard>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            {loadingDocuments ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
                {[
                  "doc-skeleton-1",
                  "doc-skeleton-2",
                  "doc-skeleton-3",
                  "doc-skeleton-4",
                ].map((key) => (
                  <SkeletonCard key={key} lines={4} />
                ))}
              </div>
            ) : filteredDocuments.length === 0 ? (
              <EmptyState
                icon={<BookOpen className="h-7 w-7" />}
                title="No documents match these filters"
                description="Try another search or visibility filter."
              />
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {filteredDocuments.map((doc) => {
                  const opened = documentOpened[doc.id] ?? false;
                  return (
                    <PortalCard key={doc.id}>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                            <DocIcon fileType={doc.fileType} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-start gap-2">
                              <h3 className="font-display text-lg font-semibold text-foreground">
                                {doc.title}
                              </h3>
                              <Badge
                                className={
                                  opened
                                    ? "bg-secondary/10 text-secondary border-secondary/20"
                                    : "bg-primary/10 text-primary border-primary/20"
                                }
                              >
                                {opened ? "Opened" : "Not opened"}
                              </Badge>
                            </div>
                            <p className="mt-1 line-clamp-3 text-sm text-muted-foreground">
                              {doc.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">
                            {visibilityLabel(doc.visibility, doc.department)}
                          </Badge>
                          {doc.isMandatory && (
                            <Badge className="bg-destructive/10 text-destructive border-destructive/20">
                              Mandatory
                            </Badge>
                          )}
                          <Badge className="bg-primary/10 text-primary border-primary/20">
                            {doc.category}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div>{formatDate(doc.uploadedAt)}</div>
                          <div>{doc.downloadCount} opened</div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            type="button"
                            className="flex-1 gap-1.5"
                            onClick={() =>
                              navigate({ to: `/training/document/${doc.id}` })
                            }
                          >
                            <ExternalLink className="h-4 w-4" />
                            Open Document
                          </Button>
                          {isAdmin && (
                            <>
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => setArchiveDocTarget(doc)}
                              >
                                <Archive className="h-4 w-4" />
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="border-destructive/30 text-destructive hover:bg-destructive/10"
                                onClick={() => setDeleteDocTarget(doc)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </PortalCard>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <PortalCard className="bg-primary/5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="font-display text-lg font-semibold text-foreground">
                Need the full completion view?
              </div>
              <div className="text-sm text-muted-foreground">
                Open the dashboard to review eligible counts, completion
                percentages, and staff still missing mandatory training.
              </div>
            </div>
            <RoleGuard roles={["SuperAdmin", "HRAdmin"]}>
              <Button
                type="button"
                className="gap-1.5"
                onClick={() => navigate({ to: "/training/admin" })}
              >
                Open Dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </RoleGuard>
          </div>
        </PortalCard>
      </div>

      <ConfirmDialog
        open={!!archiveVideoTarget}
        onOpenChange={(open) => !open && setArchiveVideoTarget(null)}
        title="Archive video"
        description={`Archive "${archiveVideoTarget?.title}" from the training portal?`}
=======
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <GraduationCap className="h-6 w-6 text-primary" />
            <h1 className="font-display font-bold text-2xl text-foreground">
              Training Portal
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Videos, documents and learning resources for all staff
          </p>
        </div>
        <RoleGuard roles={["SuperAdmin", "HRAdmin"]}>
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => navigate({ to: "/training/admin" })}
              data-ocid="training.dashboard_button"
            >
              <LayoutGrid className="h-4 w-4" />
              Dashboard
            </Button>
          </div>
        </RoleGuard>
      </div>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={setTab} data-ocid="training.tabs">
        <TabsList className="mb-5" data-ocid="training.tabs_list">
          <TabsTrigger value="videos" data-ocid="training.tab.videos">
            <Video className="h-4 w-4 mr-1.5" />
            Videos
          </TabsTrigger>
          <TabsTrigger value="documents" data-ocid="training.tab.documents">
            <BookOpen className="h-4 w-4 mr-1.5" />
            Documents
          </TabsTrigger>
        </TabsList>

        {/* ── Videos Tab ──────────────────────────────────────────────────────── */}
        <TabsContent value="videos" className="mt-0">
          <PortalCard className="mb-5">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search videos..."
                  value={videoSearch}
                  onChange={(e) => setVideoSearch(e.target.value)}
                  className="pl-9"
                  data-ocid="training.video.search_input"
                />
              </div>
              <Select value={videoFilter} onValueChange={setVideoFilter}>
                <SelectTrigger
                  className="w-full sm:w-44"
                  data-ocid="training.video.filter_select"
                >
                  <SelectValue placeholder="Visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Videos</SelectItem>
                  <SelectItem value="general">General Staff</SelectItem>
                  <SelectItem value="department">Department Only</SelectItem>
                </SelectContent>
              </Select>
              <RoleGuard roles={["SuperAdmin", "HRAdmin"]}>
                <Button
                  type="button"
                  className="gap-1.5 shrink-0"
                  onClick={() => navigate({ to: "/training/upload-video" })}
                  data-ocid="training.upload_video_button"
                >
                  <Upload className="h-4 w-4" />
                  Upload Video
                </Button>
              </RoleGuard>
            </div>
          </PortalCard>

          {loadingVideos ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }, (_, i) => `sk-v-${i}`).map((k) => (
                <SkeletonCard key={k} hasImage lines={3} />
              ))}
            </div>
          ) : filteredVideos.length === 0 ? (
            <EmptyState
              icon={<Video className="h-7 w-7" />}
              title="No videos found"
              description={
                videoSearch
                  ? "Try adjusting your search or filters."
                  : "No training videos have been uploaded yet."
              }
              data-ocid="training.video.empty_state"
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <RoleGuard
                roles={["SuperAdmin", "HRAdmin"]}
                fallback={filteredVideos.map((v, i) => (
                  <VideoCard
                    key={v.id}
                    video={v}
                    index={i + 1}
                    isAdmin={false}
                    onArchive={() => {}}
                    onDelete={() => {}}
                  />
                ))}
              >
                {filteredVideos.map((v, i) => (
                  <VideoCard
                    key={v.id}
                    video={v}
                    index={i + 1}
                    isAdmin={true}
                    onArchive={setArchiveVideoTarget}
                    onDelete={setDeleteVideoTarget}
                  />
                ))}
              </RoleGuard>
            </div>
          )}
        </TabsContent>

        {/* ── Documents Tab ────────────────────────────────────────────────────── */}
        <TabsContent value="documents" className="mt-0">
          <PortalCard className="mb-5">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents..."
                  value={docSearch}
                  onChange={(e) => setDocSearch(e.target.value)}
                  className="pl-9"
                  data-ocid="training.doc.search_input"
                />
              </div>
              <Select value={docFilter} onValueChange={setDocFilter}>
                <SelectTrigger
                  className="w-full sm:w-44"
                  data-ocid="training.doc.filter_select"
                >
                  <SelectValue placeholder="Visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Documents</SelectItem>
                  <SelectItem value="general">General Staff</SelectItem>
                  <SelectItem value="department">Department Only</SelectItem>
                </SelectContent>
              </Select>
              <RoleGuard roles={["SuperAdmin", "HRAdmin"]}>
                <Button
                  type="button"
                  className="gap-1.5 shrink-0"
                  onClick={() => navigate({ to: "/training/upload-document" })}
                  data-ocid="training.upload_doc_button"
                >
                  <Upload className="h-4 w-4" />
                  Upload Document
                </Button>
              </RoleGuard>
            </div>
          </PortalCard>

          {loadingDocs ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }, (_, i) => `sk-d-${i}`).map((k) => (
                <SkeletonCard key={k} lines={4} />
              ))}
            </div>
          ) : filteredDocs.length === 0 ? (
            <EmptyState
              icon={<BookOpen className="h-7 w-7" />}
              title="No documents found"
              description={
                docSearch
                  ? "Try adjusting your search or filters."
                  : "No training documents have been uploaded yet."
              }
              data-ocid="training.doc.empty_state"
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDocs.map((d, i) => (
                <DocCard
                  key={d.id}
                  doc={d}
                  index={i + 1}
                  isAdmin={false}
                  onOpen={handleOpenDoc}
                  onArchive={handleArchiveDoc}
                  onDelete={handleDeleteDoc}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Confirm Dialogs */}
      <ConfirmDialog
        open={!!archiveVideoTarget}
        onOpenChange={(o) => !o && setArchiveVideoTarget(null)}
        title="Archive Video"
        description={`Archive "${archiveVideoTarget?.title}"? It will no longer be visible to staff.`}
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
        confirmLabel="Archive"
        onConfirm={handleArchiveVideo}
      />
      <ConfirmDialog
        open={!!deleteVideoTarget}
<<<<<<< HEAD
        onOpenChange={(open) => !open && setDeleteVideoTarget(null)}
        title="Delete video"
        description={`Delete "${deleteVideoTarget?.title}" permanently?`}
=======
        onOpenChange={(o) => !o && setDeleteVideoTarget(null)}
        title="Delete Video"
        description={`Permanently delete "${deleteVideoTarget?.title}"? This cannot be undone.`}
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDeleteVideo}
      />
      <ConfirmDialog
        open={!!archiveDocTarget}
<<<<<<< HEAD
        onOpenChange={(open) => !open && setArchiveDocTarget(null)}
        title="Archive document"
        description={`Archive "${archiveDocTarget?.title}" from the documents portal?`}
        confirmLabel="Archive"
        onConfirm={handleArchiveDocument}
      />
      <ConfirmDialog
        open={!!deleteDocTarget}
        onOpenChange={(open) => !open && setDeleteDocTarget(null)}
        title="Delete document"
        description={`Delete "${deleteDocTarget?.title}" permanently?`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDeleteDocument}
      />
=======
        onOpenChange={(o) => !o && setArchiveDocTarget(null)}
        title="Archive Document"
        description={`Archive "${archiveDocTarget?.title}"?`}
        confirmLabel="Archive"
        onConfirm={async () => {
          if (!archiveDocTarget) return;
          setDocs((prev) =>
            prev.map((d) =>
              d.id === archiveDocTarget.id ? { ...d, isArchived: true } : d,
            ),
          );
          toast.success(`"${archiveDocTarget.title}" archived`);
          setArchiveDocTarget(null);
        }}
      />
      <ConfirmDialog
        open={!!deleteDocTarget}
        onOpenChange={(o) => !o && setDeleteDocTarget(null)}
        title="Delete Document"
        description={`Permanently delete "${deleteDocTarget?.title}"?`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={async () => {
          if (!deleteDocTarget) return;
          setDocs((prev) => prev.filter((d) => d.id !== deleteDocTarget.id));
          toast.success(`"${deleteDocTarget.title}" deleted`);
          setDeleteDocTarget(null);
        }}
      />

      {/* Admin floating warning */}
      {videos.filter((v) => v.isArchived).length > 0 && (
        <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <span>
            {videos.filter((v) => v.isArchived).length} archived videos hidden
            from view
          </span>
        </div>
      )}
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
    </AppShell>
  );
}
