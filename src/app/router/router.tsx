import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "@app/app";
import NotRequireAuth from "@app/components/auth/not-require-auth";
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
import NewSetPage from "@lexica/pages/new-set-page";
import SetPage from "@lexica/pages/set-page";
import SetsPage from "@lexica/pages/sets-page";
import { Pages, Urls } from "./urls";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <App />,
    children: [
      {
        path: Urls.getPathWithoutLeadingSlash(Pages.login),
        element: (
          <NotRequireAuth>
            <PageWithBreadcrumbs>
              <LoginPage />
            </PageWithBreadcrumbs>
          </NotRequireAuth>
        ),
      },
      {
        path: Urls.getPathWithoutLeadingSlash(Pages.home),
        element: (
          <RequireAuth>
            <PageWithBreadcrumbs>
              <HomePage />
            </PageWithBreadcrumbs>
          </RequireAuth>
        ),
      },
      {
        path: Urls.getPathWithoutLeadingSlash(Pages.sets),
        element: (
          <RequireAuth>
            <PageWithBreadcrumbs>
              <SetsPage />
            </PageWithBreadcrumbs>
          </RequireAuth>
        ),
      },
      {
        path: Urls.getPathWithoutLeadingSlash(Pages.newSet),
        element: (
          <RequireAuth>
            <PageWithBreadcrumbs>
              <NewSetPage />
            </PageWithBreadcrumbs>
          </RequireAuth>
        ),
      },
      {
        path: Urls.getPathWithoutLeadingSlash(Pages.set),
        element: (
          <RequireAuth>
            <PageWithBreadcrumbs>
              <SetPage />
            </PageWithBreadcrumbs>
          </RequireAuth>
        ),
      },
      {
        path: Urls.getPathWithoutLeadingSlash(Pages.spellingMode),
        element: (
          <RequireAuth>
            <PageWithBreadcrumbs>
              <SpellingModePage />
            </PageWithBreadcrumbs>
          </RequireAuth>
        ),
      },
      {
        path: Urls.getPathWithoutLeadingSlash(Pages.fullMode),
        element: (
          <RequireAuth>
            <PageWithBreadcrumbs>
              <FullModePage />
            </PageWithBreadcrumbs>
          </RequireAuth>
        ),
      },
      {
        path: Urls.getPathWithoutLeadingSlash(Pages.onlyOpenQuestions),
        element: (
          <RequireAuth>
            <PageWithBreadcrumbs>
              <OnlyOpenQuestionsModePage />
            </PageWithBreadcrumbs>
          </RequireAuth>
        ),
      },
      {
        path: Urls.getPathWithoutLeadingSlash(Pages.about),
        element: (
          <RequireAuth>
            <PageWithBreadcrumbs>
              <AboutPage />
            </PageWithBreadcrumbs>
          </RequireAuth>
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
