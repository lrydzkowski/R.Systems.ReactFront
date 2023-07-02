import { PublicClientApplication } from "@azure/msal-browser";
import { Pages, Urls } from "@app/router/urls";

export const publicClientApplication = new PublicClientApplication({
  auth: {
    clientId: getClientId(),
    authority: getAuthority(),
    redirectUri: Urls.getPath(Pages.login),
    postLogoutRedirectUri: Urls.getPath(Pages.login),
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
});

export const loginRequest = { scopes: getScopes(), prompt: "select_account" };

function getClientId(): string {
  const clientId = import.meta.env.VITE_AZURE_AD_CLIENT_ID ?? "";
  if (clientId.length === 0) {
    throw new Error("Azure AD client id doesn't exist.");
  }

  return clientId;
}

function getAuthority(): string {
  const authority = import.meta.env.VITE_AZURE_AD_AUTHORITY ?? "";
  if (authority.length === 0) {
    throw new Error("Azure AD authority doesn't exist.");
  }

  return authority;
}

function getScopes(): string[] {
  const scopes = import.meta.env.VITE_AZURE_AD_B2C_SCOPES ?? "";
  if (scopes.length === 0) {
    throw new Error("Azure AD scopes doesn't exist.");
  }

  return scopes.split(" ");
}
