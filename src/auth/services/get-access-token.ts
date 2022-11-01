import { AccountInfo, AuthenticationResult, IPublicClientApplication } from "@azure/msal-browser";
import { loginRequest } from "auth/auth-configuration";

export function getAccessToken(instance: IPublicClientApplication, accounts: AccountInfo[]): Promise<string> {
  const request = {
    ...loginRequest,
    account: accounts[0],
  };

  return instance
    .acquireTokenSilent(request)
    .then((response: AuthenticationResult) => {
      return response.accessToken;
    })
    .catch(() => {
      return instance.acquireTokenPopup(request).then((response) => {
        return response.accessToken;
      });
    });
}
