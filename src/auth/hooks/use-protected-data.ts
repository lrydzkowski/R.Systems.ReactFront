import { useMsal } from "@azure/msal-react";
import { ErrorCodes } from "app/api/error-codes";
import { IData } from "app/models/data";
import { getAccessToken } from "auth/services/get-access-token";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export default function useProtectedData<TData>(
  getDataFunc: (
    abortController: AbortController,
    accessToken: string,
    requestParameters: object,
    urlParts: string[]
  ) => Promise<AxiosResponse<TData>>,
  urlParts: string[],
  refreshKey: number,
  onError: (error: AxiosError) => void
): IData<TData | null> {
  const [processing, setProcessing] = useState<number>(0);
  const { instance, accounts } = useMsal();
  const [data, setData] = useState<TData | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    setProcessing((x) => x + 1);
    getAccessToken(instance, accounts)
      .then((accessToken) => getDataFunc(abortController, accessToken, {}, urlParts))
      .then((response) => {
        setData(response.data);
      })
      .catch((error: AxiosError) => {
        if (error.code === ErrorCodes.cancelled) {
          return;
        }
        onError(error);
      })
      .finally(() => {
        setProcessing((x) => x - 1);
      });

    return () => abortController.abort();
  }, [instance, accounts, refreshKey]);

  return {
    processing: processing > 0,
    data,
  };
}
