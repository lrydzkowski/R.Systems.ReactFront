import NotRequireAuth from "app/components/not-require-auth";
import LoginPage from "app/pages/login-page";
import SetsPage from "lexica/common/pages/sets-page";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Test1Page from "test/pages/test1-page";
import Test3Page from "test/pages/test3-page";
import Test2Page from "test/pages/test2-page";
import Test4Page from "test/pages/test4-page";
import App from "../app";
import AboutPage from "../pages/about-page";
import ErrorPage from "../pages/error-page";
import HomePage from "../pages/home-page";
import NotFoundPage from "../pages/not-found-page";
import SetPage from "lexica/common/pages/set-page";
import PageWithBreadcrumbs from "app/components/page-with-breadcrumbs";
import SpellingModePage from "lexica/spelling-mode/spelling-mode-page";
import FullModePage from "lexica/full-mode/full-mode-page";
import OnlyOpenQuestionsModePage from "lexica/only-open-questions-mode/only-open-questions-mode-page";
import RequireAuth from "app/components/require-auth";
import { Urls } from "./urls";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <App />,
    children: [
      {
        children: [
          {
            path: Urls.getPathWithoutLeadingSlash("login"),
            element: (
              <NotRequireAuth>
                <PageWithBreadcrumbs>
                  <LoginPage />
                </PageWithBreadcrumbs>
              </NotRequireAuth>
            ),
          },
          {
            path: Urls.getPathWithoutLeadingSlash("home"),
            element: (
              <RequireAuth>
                <PageWithBreadcrumbs>
                  <HomePage />
                </PageWithBreadcrumbs>
              </RequireAuth>
            ),
          },
          {
            path: Urls.getPathWithoutLeadingSlash("sets"),
            element: (
              <RequireAuth>
                <PageWithBreadcrumbs>
                  <SetsPage />
                </PageWithBreadcrumbs>
              </RequireAuth>
            ),
          },
          {
            path: Urls.getPathWithoutLeadingSlash("setWithPaths"),
            element: (
              <RequireAuth>
                <PageWithBreadcrumbs>
                  <SetPage />
                </PageWithBreadcrumbs>
              </RequireAuth>
            ),
          },
          {
            path: Urls.getPathWithoutLeadingSlash("spellingModeWithPaths"),
            element: (
              <RequireAuth>
                <PageWithBreadcrumbs>
                  <SpellingModePage />
                </PageWithBreadcrumbs>
              </RequireAuth>
            ),
          },
          {
            path: Urls.getPathWithoutLeadingSlash("fullModeWithPaths"),
            element: (
              <RequireAuth>
                <PageWithBreadcrumbs>
                  <FullModePage />
                </PageWithBreadcrumbs>
              </RequireAuth>
            ),
          },
          {
            path: Urls.getPathWithoutLeadingSlash("onlyOpenQuestionsModeWithPaths"),
            element: (
              <RequireAuth>
                <PageWithBreadcrumbs>
                  <OnlyOpenQuestionsModePage />
                </PageWithBreadcrumbs>
              </RequireAuth>
            ),
          },
          {
            path: Urls.getPathWithoutLeadingSlash("test1"),
            element: (
              <RequireAuth>
                <PageWithBreadcrumbs>
                  <Test1Page />
                </PageWithBreadcrumbs>
              </RequireAuth>
            ),
          },
          {
            path: Urls.getPathWithoutLeadingSlash("test2"),
            element: (
              <RequireAuth>
                <PageWithBreadcrumbs>
                  <Test2Page />
                </PageWithBreadcrumbs>
              </RequireAuth>
            ),
          },
          {
            path: Urls.getPathWithoutLeadingSlash("test3"),
            element: (
              <RequireAuth>
                <PageWithBreadcrumbs>
                  <Test3Page />
                </PageWithBreadcrumbs>
              </RequireAuth>
            ),
          },
          {
            path: Urls.getPathWithoutLeadingSlash("test4"),
            element: (
              <RequireAuth>
                <PageWithBreadcrumbs>
                  <Test4Page />
                </PageWithBreadcrumbs>
              </RequireAuth>
            ),
          },
          {
            path: Urls.getPathWithoutLeadingSlash("about"),
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
            element: <Navigate to={Urls.pages.login.path} replace />,
          },
          {
            path: "*",
            element: <NotFoundPage />,
          },
        ],
      },
    ],
  },
]);
