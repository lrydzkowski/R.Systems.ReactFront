import { PublicClientApplication } from "@azure/msal-browser";
import { Urls } from "./routing/urls";

export const publicClientApplication = new PublicClientApplication({
  auth: {
    clientId: getClientId(),
    authority: getAuthority(),
    redirectUri: Urls.pages.login.path,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
});

export const loginRequest = {
  scopes: getScopes(),
};

function getClientId(): string {
  const clientId = process.env.REACT_APP_AZURE_AD_B2C_CLIENT_ID ?? "";
  if (clientId.length === 0) {
    throw new Error("Azure AD B2C client id doesn't exist.");
  }

  return clientId;
}

function getAuthority(): string {
  const authority = process.env.REACT_APP_AZURE_AD_B2C_AUTHORITY ?? "";
  if (authority.length === 0) {
    throw new Error("Azure AD B2C authority doesn't exist.");
  }

  return authority;
}

function getScopes(): string[] {
  const scopes = process.env.REACT_APP_AZURE_AD_B2C_SCOPES ?? "";
  if (scopes.length === 0) {
    throw new Error("Azure AD B2C scopes doesn't exist.");
  }

  return scopes.split(" ");
}
