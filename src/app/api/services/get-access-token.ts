import { AuthenticationResult } from "@azure/msal-browser";
import { loginRequest, publicClientApplication } from "app/auth-configuration";

export function getAccessToken(): Promise<string> {
  const account = publicClientApplication.getAllAccounts()[0];
  const request = {
    ...loginRequest,
    account: account,
  };

  return publicClientApplication
    .acquireTokenSilent(request)
    .then((response: AuthenticationResult) => {
      return response.accessToken;
    })
    .catch(() => {
      return publicClientApplication.acquireTokenPopup(request).then((response) => {
        return response.accessToken;
      });
    });
}
