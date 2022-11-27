import RequireAuth from "auth/components/require-auth";
import NotRequireAuth from "auth/components/not-require-auth";
import LoginPage from "auth/pages/login-page";
import SetsPage from "lexica/pages/sets-page";
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
import SetPage from "lexica/pages/set-page";
import PageWithBreadcrumbs from "app/components/page-with-breadcrumbs";

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
            path: "lexica/sets/:setPaths",
            element: (
              <RequireAuth>
                <PageWithBreadcrumbs>
                  <SetPage />
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
            element: <Navigate to="/login" replace />,
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
