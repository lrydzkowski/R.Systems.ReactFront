import RequireAuth from "auth/components/require-auth";
import RequireNotAuth from "auth/components/require-not-auth";
import LoginPage from "auth/pages/login-page";
import SetsPage from "lexica/pages/sets-page";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Test11Page from "test/pages/test1/test11-page";
import Test12Page from "test/pages/test1/test12-page";
import Test21Page from "test/pages/test2/test21-page";
import Test22Page from "test/pages/test2/test22-page";
import App from "./app";
import AboutPage from "./pages/about-page";
import ErrorPage from "./pages/error-page";
import HomePage from "./pages/home-page";
import NotFoundPage from "./pages/not-found-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        errorElement: <ErrorPage />,
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
            path: "sets",
            element: (
              <RequireAuth>
                <SetsPage />
              </RequireAuth>
            ),
          },
          {
            path: "test1/test1",
            element: (
              <RequireAuth>
                <Test11Page />
              </RequireAuth>
            ),
          },
          {
            path: "test1/test2",
            element: (
              <RequireAuth>
                <Test12Page />
              </RequireAuth>
            ),
          },
          {
            path: "test2/test1",
            element: (
              <RequireAuth>
                <Test21Page />
              </RequireAuth>
            ),
          },
          {
            path: "test2/test2",
            element: (
              <RequireAuth>
                <Test22Page />
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
