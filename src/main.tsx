import React from "react";
import ReactDOM from "react-dom/client";
import { MsalProvider } from "@azure/msal-react";
import { RouterProvider } from "react-router-dom";
import { publicClientApplication } from "./app/auth/auth-configuration";
import { router } from "./app/router/router";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MsalProvider instance={publicClientApplication}>
      <RouterProvider router={router} />
    </MsalProvider>
  </React.StrictMode>
);
