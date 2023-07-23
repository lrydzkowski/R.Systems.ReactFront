import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "@app/app";
import NotRequireAuth from "@app/components/auth/not-require-auth";
import RequireAdmin from "@app/components/auth/require-admin";
import RequireAuth from "@app/components/auth/require-auth";
import PageWithBreadcrumbs from "@app/components/layout/page-with-breadcrumbs";
import AboutPage from "@app/pages/about-page";
import ErrorPage from "@app/pages/error-page";
import HomePage from "@app/pages/home-page";
import LoginPage from "@app/pages/login-page";
import NotFoundPage from "@app/pages/not-found-page";
import FullModePage from "@lexica/modes/full-mode/full-mode-page";
import OnlyOpenQuestionsModePage from "@lexica/modes/only-open-questions-mode/only-open-questions-mode-page";
import SpellingModePage from "@lexica/modes/spelling-mode/spelling-mode-page";
import EditSetPage from "@lexica/pages/edit-set-page";
import NewSetPage from "@lexica/pages/new-set-page";
import SetPage from "@lexica/pages/set-page";
import SetsPage from "@lexica/pages/sets-page";
import useUrls, { Pages } from "./use-urls";

export const AppRouterProvider = (): JSX.Element => {
  const { getPathWithoutLeadingSlash } = useUrls();
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
      element: <App />,
      children: [
        {
          path: getPathWithoutLeadingSlash(Pages.login),
          element: (
            <NotRequireAuth>
              <PageWithBreadcrumbs>
                <LoginPage />
              </PageWithBreadcrumbs>
            </NotRequireAuth>
          ),
        },
        {
          path: getPathWithoutLeadingSlash(Pages.home),
          element: (
            <RequireAuth>
              <PageWithBreadcrumbs>
                <HomePage />
              </PageWithBreadcrumbs>
            </RequireAuth>
          ),
        },
        {
          path: getPathWithoutLeadingSlash(Pages.sets),
          element: (
            <RequireAuth>
              <PageWithBreadcrumbs>
                <SetsPage />
              </PageWithBreadcrumbs>
            </RequireAuth>
          ),
        },
        {
          path: getPathWithoutLeadingSlash(Pages.newSet),
          element: (
            <RequireAuth>
              <RequireAdmin>
                <PageWithBreadcrumbs>
                  <NewSetPage />
                </PageWithBreadcrumbs>
              </RequireAdmin>
            </RequireAuth>
          ),
        },
        {
          path: getPathWithoutLeadingSlash(Pages.editSet),
          element: (
            <RequireAuth>
              <RequireAdmin>
                <PageWithBreadcrumbs>
                  <EditSetPage />
                </PageWithBreadcrumbs>
              </RequireAdmin>
            </RequireAuth>
          ),
        },
        {
          path: getPathWithoutLeadingSlash(Pages.set),
          element: (
            <RequireAuth>
              <PageWithBreadcrumbs>
                <SetPage />
              </PageWithBreadcrumbs>
            </RequireAuth>
          ),
        },
        {
          path: getPathWithoutLeadingSlash(Pages.spellingMode),
          element: (
            <RequireAuth>
              <PageWithBreadcrumbs>
                <SpellingModePage />
              </PageWithBreadcrumbs>
            </RequireAuth>
          ),
        },
        {
          path: getPathWithoutLeadingSlash(Pages.fullMode),
          element: (
            <RequireAuth>
              <PageWithBreadcrumbs>
                <FullModePage />
              </PageWithBreadcrumbs>
            </RequireAuth>
          ),
        },
        {
          path: getPathWithoutLeadingSlash(Pages.onlyOpenQuestions),
          element: (
            <RequireAuth>
              <PageWithBreadcrumbs>
                <OnlyOpenQuestionsModePage />
              </PageWithBreadcrumbs>
            </RequireAuth>
          ),
        },
        {
          path: getPathWithoutLeadingSlash(Pages.about),
          element: (
            <PageWithBreadcrumbs>
              <AboutPage />
            </PageWithBreadcrumbs>
          ),
        },
        {
          path: "",
          element: <Navigate to="login" replace />,
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
