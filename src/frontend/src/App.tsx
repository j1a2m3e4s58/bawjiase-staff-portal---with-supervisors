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
const PlaceholderPage = lazy(() => import("@/pages/PlaceholderPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const AnnouncementsPage = lazy(() => import("@/pages/AnnouncementsPage"));
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
const TrainingUploadVideoPage = lazy(
  () => import("@/pages/TrainingUploadVideoPage"),
);
const TrainingUploadDocumentPage = lazy(
  () => import("@/pages/TrainingUploadDocumentPage"),
);
const TrainingAdminPage = lazy(() => import("@/pages/TrainingAdminPage"));
const SupportPage = lazy(() => import("@/pages/SupportPage"));
const SupportAdminPage = lazy(() => import("@/pages/SupportAdminPage"));

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

const supportAdminRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/support/admin",
  component: SupportAdminPage,
});

const auditRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/audit",
  component: PlaceholderPage,
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
    announcementsTrashRoute,
    directoryRoute,
    directoryPastRoute,
    trainingRoute,
    trainingVideoRoute,
    trainingUploadVideoRoute,
    trainingUploadDocumentRoute,
    trainingAdminRoute,
    formsRoute,
    notificationsRoute,
    supportRoute,
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
