import { Auth0Provider } from "@auth0/auth0-react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { getAuth0ClientId, getAuth0Domain } from "@app/auth/auth0-configuration";
import { AppRouterProvider } from "@app/router/app-router-provider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain={getAuth0Domain()}
      clientId={getAuth0ClientId()}
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <AppRouterProvider />
    </Auth0Provider>
  </React.StrictMode>
);
