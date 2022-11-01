import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "report-web-vitals";
import { MsalProvider } from "@azure/msal-react";
import { RouterProvider } from "react-router-dom";
import { router } from "app/router";
import { publicClientApplication } from "auth/auth-configuration";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <MsalProvider instance={publicClientApplication}>
      <RouterProvider router={router} />
    </MsalProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
