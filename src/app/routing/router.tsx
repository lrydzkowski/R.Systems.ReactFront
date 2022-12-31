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
import { urls } from "./urls";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <App />,
    children: [
      {
        children: [
          {
            path: "login",
            element: (
              <NotRequireAuth>
                <PageWithBreadcrumbs>
                  <LoginPage />
                </PageWithBreadcrumbs>
              </NotRequireAuth>
            ),
          },
          {
            path: "home",
            element: (
              <RequireAuth>
                <PageWithBreadcrumbs>
                  <HomePage />
                </PageWithBreadcrumbs>
              </RequireAuth>
            ),
          },
          {
            path: "lexica/sets",
            element: (
              <RequireAuth>
                <PageWithBreadcrumbs>
                  <SetsPage />
                </PageWithBreadcrumbs>
              </RequireAuth>
            ),
          },
          {
            path: "lexica/sets/content/:setPaths",
            element: (
              <RequireAuth>
                <PageWithBreadcrumbs>
                  <SetPage />
                </PageWithBreadcrumbs>
              </RequireAuth>
            ),
          },
          {
            path: "lexica/sets/spelling-mode/:setPaths",
            element: (
              <RequireAuth>
                <PageWithBreadcrumbs>
                  <SpellingModePage />
                </PageWithBreadcrumbs>
              </RequireAuth>
            ),
          },
          {
            path: "lexica/sets/full-mode/:setPaths",
            element: (
              <RequireAuth>
                <PageWithBreadcrumbs>
                  <FullModePage />
                </PageWithBreadcrumbs>
              </RequireAuth>
            ),
          },
          {
            path: "lexica/sets/only-open-questions-mode/:setPaths",
            element: (
              <RequireAuth>
                <PageWithBreadcrumbs>
                  <OnlyOpenQuestionsModePage />
                </PageWithBreadcrumbs>
              </RequireAuth>
            ),
          },
          {
            path: "test/test1",
            element: (
              <RequireAuth>
                <PageWithBreadcrumbs>
                  <Test1Page />
                </PageWithBreadcrumbs>
              </RequireAuth>
            ),
          },
          {
            path: "test/test2",
            element: (
              <RequireAuth>
                <PageWithBreadcrumbs>
                  <Test2Page />
                </PageWithBreadcrumbs>
              </RequireAuth>
            ),
          },
          {
            path: "test/test3",
            element: (
              <RequireAuth>
                <PageWithBreadcrumbs>
                  <Test3Page />
                </PageWithBreadcrumbs>
              </RequireAuth>
            ),
          },
          {
            path: "test/test4",
            element: (
              <RequireAuth>
                <PageWithBreadcrumbs>
                  <Test4Page />
                </PageWithBreadcrumbs>
              </RequireAuth>
            ),
          },
          {
            path: "about",
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
            element: <Navigate to={urls.pages.login} replace />,
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
