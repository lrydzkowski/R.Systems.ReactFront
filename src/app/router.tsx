import RequireAuth from "auth/components/require-auth";
import RequireNotAuth from "auth/components/require-not-auth";
import LoginPage from "auth/pages/login-page";
import SetsPage from "lexica/pages/sets-page";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Test1Page from "test/pages/test1/test1-page";
import Test3Page from "test/pages/test3/test3-page";
import Test2Page from "test/pages/test2/test2-page";
import Test4Page from "test/pages/test4/test4-page";
import App from "./app";
import AboutPage from "./pages/about-page";
import ErrorPage from "./pages/error-page";
import HomePage from "./pages/home-page";
import NotFoundPage from "./pages/not-found-page";

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
              <RequireNotAuth>
                <LoginPage />
              </RequireNotAuth>
            ),
          },
          {
            path: "home",
            element: (
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            ),
          },
          {
            path: "lexica/sets",
            element: (
              <RequireAuth>
                <SetsPage />
              </RequireAuth>
            ),
          },
          {
            path: "test/test1",
            element: (
              <RequireAuth>
                <Test1Page />
              </RequireAuth>
            ),
          },
          {
            path: "test/test2",
            element: (
              <RequireAuth>
                <Test2Page />
              </RequireAuth>
            ),
          },
          {
            path: "test/test3",
            element: (
              <RequireAuth>
                <Test3Page />
              </RequireAuth>
            ),
          },
          {
            path: "test/test4",
            element: (
              <RequireAuth>
                <Test4Page />
              </RequireAuth>
            ),
          },
          {
            path: "about",
            element: (
              <RequireAuth>
                <AboutPage />
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
