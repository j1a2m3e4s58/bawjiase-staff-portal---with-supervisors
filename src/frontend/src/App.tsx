import { BrandLoader } from "@/components/BrandLoader";
import { appBasePath, withBase } from "@/lib/app-base";
import { AuthProvider, useAuth } from "@/store/auth";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useNavigate,
} from "@tanstack/react-router";
import { Suspense, lazy, useEffect } from "react";

// ── Lazy Pages ─────────────────────────────────────────────────────────────────

const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("@/pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("@/pages/ResetPasswordPage"));
const VerifyEmailPage = lazy(() => import("@/pages/VerifyEmailPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const AnnouncementsPage = lazy(() => import("@/pages/AnnouncementsPage"));
const NewsPortalPage = lazy(() => import("@/pages/NewsPortalPage"));
const AnnouncementsTrashPage = lazy(
  () => import("@/pages/AnnouncementsTrashPage"),
);
const FormsPage = lazy(() => import("@/pages/FormsPage"));
const DirectoryPage = lazy(() => import("@/pages/DirectoryPage"));
const SupervisorManagementPage = lazy(
  () => import("@/pages/SupervisorManagementPage"),
);
const PastStaffPage = lazy(() => import("@/pages/PastStaffPage"));
const NotificationsPage = lazy(() => import("@/pages/NotificationsPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const TrainingHubPage = lazy(() => import("@/pages/TrainingHubPage"));
const TrainingVideoPage = lazy(() => import("@/pages/TrainingVideoPage"));
const TrainingDocumentPage = lazy(() => import("@/pages/TrainingDocumentPage"));
const TrainingUploadVideoPage = lazy(
  () => import("@/pages/TrainingUploadVideoPage"),
);
const TrainingUploadDocumentPage = lazy(
  () => import("@/pages/TrainingUploadDocumentPage"),
);
const TrainingAdminPage = lazy(() => import("@/pages/TrainingAdminPage"));
const SupportPage = lazy(() => import("@/pages/SupportPage"));
const SupportAdminPage = lazy(() => import("@/pages/SupportAdminPage"));
const AuditLogsPage = lazy(() => import("@/pages/AuditLogsPage"));

// ── Loading Fallback ───────────────────────────────────────────────────────────

function PageLoading() {
  return <BrandLoader fullscreen label="Opening your workspace..." />;
}

function AppErrorScreen({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="min-h-screen bg-background px-6 py-10 flex items-center justify-center">
      <div className="glass-card-elevated max-w-lg w-full rounded-2xl p-8 text-center space-y-4">
        <img
          src={withBase("assets/images/bcb-logo.png")}
          alt="BCB Staff Portal"
          className="mx-auto h-20 w-20 rounded-full object-cover border-4 border-background shadow-glass"
        />
        <div className="space-y-2">
          <h1 className="font-display text-2xl font-bold text-foreground">
            {title}
          </h1>
          <p className="text-sm text-muted-foreground leading-6">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function RouteErrorComponent() {
  return (
    <AppErrorScreen
      title="We hit a page error"
      description="The portal could not render this page properly. Please refresh once. If it keeps happening, the deploy configuration or a runtime page error still needs attention."
    />
  );
}

function RouteNotFoundComponent() {
  return (
    <AppErrorScreen
      title="Page not found"
      description="This route is not being served correctly yet. On Render, that usually means the rewrite rule or deploy output needs adjustment."
    />
  );
}

// ── Auth Guards (component-based, using useNavigate) ──────────────────────────

function AuthGuard() {
  const { isLoggedIn, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate({ to: "/login", replace: true });
    }
  }, [isLoggedIn, isLoading, navigate]);

  if (isLoading) return <PageLoading />;
  if (!isLoggedIn) return <PageLoading />;
  return (
    <Suspense fallback={<PageLoading />}>
      <Outlet />
    </Suspense>
  );
}

function GuestGuard() {
  const { isLoggedIn, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      navigate({ to: "/", replace: true });
    }
  }, [isLoggedIn, isLoading, navigate]);

  if (isLoading) return <PageLoading />;
  if (isLoggedIn) return <PageLoading />;
  return (
    <Suspense fallback={<PageLoading />}>
      <Outlet />
    </Suspense>
  );
}

// ── Route Tree ─────────────────────────────────────────────────────────────────

const rootRoute = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: RouteNotFoundComponent,
  errorComponent: RouteErrorComponent,
});

// Guest routes (redirect to / if already logged in)
const guestRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "guest",
  component: GuestGuard,
});

const loginRoute = createRoute({
  getParentRoute: () => guestRoute,
  path: "/login",
  component: LoginPage,
});

const registerRoute = createRoute({
  getParentRoute: () => guestRoute,
  path: "/register",
  component: RegisterPage,
});

const forgotRoute = createRoute({
  getParentRoute: () => guestRoute,
  path: "/forgot-password",
  component: ForgotPasswordPage,
});

const resetRoute = createRoute({
  getParentRoute: () => guestRoute,
  path: "/reset-password",
  component: ResetPasswordPage,
});

const verifyRoute = createRoute({
  getParentRoute: () => guestRoute,
  path: "/verify-email",
  component: VerifyEmailPage,
});

// Protected routes
const protectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "protected",
  component: AuthGuard,
});

const dashboardRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/",
  component: DashboardPage,
});

const announcementsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/announcements",
  component: AnnouncementsPage,
});

const newsPortalRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/news-portal",
  component: NewsPortalPage,
});

const announcementsTrashRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/announcements/trash",
  component: AnnouncementsTrashPage,
});

const directoryRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/directory",
  component: DirectoryPage,
});

const directoryPastRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/directory/past-staff",
  component: PastStaffPage,
});

const supervisorManagementRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/directory/supervisors",
  component: SupervisorManagementPage,
});

const trainingRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/training",
  component: TrainingHubPage,
});

const trainingVideoRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/training/video/$id",
  component: TrainingVideoPage,
});

const trainingDocumentRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/training/document/$id",
  component: TrainingDocumentPage,
});

const trainingUploadVideoRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/training/upload-video",
  component: TrainingUploadVideoPage,
});

const trainingUploadDocumentRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/training/upload-document",
  component: TrainingUploadDocumentPage,
});

const trainingAdminRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/training/admin",
  component: TrainingAdminPage,
});

const formsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/forms",
  component: FormsPage,
});

const notificationsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/notifications",
  component: NotificationsPage,
});

const supportRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/support",
  component: SupportPage,
});

const supportIncidentRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/support/incident",
  component: SupportPage,
});

const supportAmendmentRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/support/amendment",
  component: SupportPage,
});

const supportAdminRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/support/admin",
  component: SupportAdminPage,
});

const auditRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/audit",
  component: AuditLogsPage,
});

const profileRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/profile",
  component: ProfilePage,
});

// ── Router ────────────────────────────────────────────────────────────────────

const routeTree = rootRoute.addChildren([
  guestRoute.addChildren([
    loginRoute,
    registerRoute,
    forgotRoute,
    resetRoute,
    verifyRoute,
  ]),
  protectedRoute.addChildren([
    dashboardRoute,
    announcementsRoute,
    newsPortalRoute,
    announcementsTrashRoute,
    directoryRoute,
    directoryPastRoute,
    supervisorManagementRoute,
    trainingRoute,
    trainingVideoRoute,
    trainingDocumentRoute,
    trainingUploadVideoRoute,
    trainingUploadDocumentRoute,
    trainingAdminRoute,
    formsRoute,
    notificationsRoute,
    supportRoute,
    supportIncidentRoute,
    supportAmendmentRoute,
    supportAdminRoute,
    auditRoute,
    profileRoute,
  ]),
]);

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  basepath: appBasePath,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
