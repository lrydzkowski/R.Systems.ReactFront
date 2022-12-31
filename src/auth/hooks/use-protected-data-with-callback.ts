import { useMsal } from "@azure/msal-react";
import { ErrorCodes } from "app/api/error-codes";
import { getAccessToken } from "auth/services/get-access-token";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect } from "react";

export default function useProtectedDataWithCallback<TData>(
  getDataFunc: (
    abortController: AbortController,
    accessToken: string,
    requestParameters: object,
    urlParts: string[]
  ) => Promise<AxiosResponse<TData>>,
  word: string,
  onSuccess: (data: TData) => void,
  onError: (error: AxiosError) => void
): void {
  const { instance, accounts } = useMsal();

  useEffect(() => {
    const abortController = new AbortController();
    getAccessToken(instance, accounts)
      .then((accessToken) => getDataFunc(abortController, accessToken, {}, [word]))
      .then((response) => {
        onSuccess(response.data);
      })
      .catch((error: AxiosError) => {
        if (error.code === ErrorCodes.cancelled) {
          return;
        }
        onError(error);
      });

    return () => abortController.abort();
  }, [instance, accounts, word]);
}
