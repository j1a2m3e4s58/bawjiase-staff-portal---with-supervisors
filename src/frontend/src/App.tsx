import { SkeletonCard } from "@/components/SkeletonCard";
import { AuthProvider, useAuth } from "@/store/auth";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { Suspense, lazy, useEffect } from "react";

// ── Lazy Pages ─────────────────────────────────────────────────────────────────

const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("@/pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("@/pages/ResetPasswordPage"));
const VerifyEmailPage = lazy(() => import("@/pages/VerifyEmailPage"));
<<<<<<< HEAD
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const AnnouncementsPage = lazy(() => import("@/pages/AnnouncementsPage"));
const NewsPortalPage = lazy(() => import("@/pages/NewsPortalPage"));
=======
const PlaceholderPage = lazy(() => import("@/pages/PlaceholderPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const AnnouncementsPage = lazy(() => import("@/pages/AnnouncementsPage"));
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
const AnnouncementsTrashPage = lazy(
  () => import("@/pages/AnnouncementsTrashPage"),
);
const FormsPage = lazy(() => import("@/pages/FormsPage"));
const DirectoryPage = lazy(() => import("@/pages/DirectoryPage"));
const PastStaffPage = lazy(() => import("@/pages/PastStaffPage"));
const NotificationsPage = lazy(() => import("@/pages/NotificationsPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const TrainingHubPage = lazy(() => import("@/pages/TrainingHubPage"));
const TrainingVideoPage = lazy(() => import("@/pages/TrainingVideoPage"));
<<<<<<< HEAD
const TrainingDocumentPage = lazy(() => import("@/pages/TrainingDocumentPage"));
=======
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
const TrainingUploadVideoPage = lazy(
  () => import("@/pages/TrainingUploadVideoPage"),
);
const TrainingUploadDocumentPage = lazy(
  () => import("@/pages/TrainingUploadDocumentPage"),
);
const TrainingAdminPage = lazy(() => import("@/pages/TrainingAdminPage"));
const SupportPage = lazy(() => import("@/pages/SupportPage"));
const SupportAdminPage = lazy(() => import("@/pages/SupportAdminPage"));
<<<<<<< HEAD
const AuditLogsPage = lazy(() => import("@/pages/AuditLogsPage"));
=======
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58

// ── Loading Fallback ───────────────────────────────────────────────────────────

function PageLoading() {
  return (
    <div className="min-h-screen bg-background p-6 space-y-4">
      <SkeletonCard lines={2} />
      <SkeletonCard lines={4} hasImage />
    </div>
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
  notFoundComponent: () => null,
  errorComponent: () => null,
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

<<<<<<< HEAD
const newsPortalRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/news-portal",
  component: NewsPortalPage,
});

=======
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
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

<<<<<<< HEAD
const trainingDocumentRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/training/document/$id",
  component: TrainingDocumentPage,
});

=======
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
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

<<<<<<< HEAD
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

=======
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
const supportAdminRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/support/admin",
  component: SupportAdminPage,
});

const auditRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/audit",
<<<<<<< HEAD
  component: AuditLogsPage,
=======
  component: PlaceholderPage,
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
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
<<<<<<< HEAD
    newsPortalRoute,
=======
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
    announcementsTrashRoute,
    directoryRoute,
    directoryPastRoute,
    trainingRoute,
    trainingVideoRoute,
<<<<<<< HEAD
    trainingDocumentRoute,
=======
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
    trainingUploadVideoRoute,
    trainingUploadDocumentRoute,
    trainingAdminRoute,
    formsRoute,
    notificationsRoute,
    supportRoute,
<<<<<<< HEAD
    supportIncidentRoute,
    supportAmendmentRoute,
=======
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
    supportAdminRoute,
    auditRoute,
    profileRoute,
  ]),
]);

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
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
