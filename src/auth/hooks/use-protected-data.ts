import { useMsal } from "@azure/msal-react";
import { IData } from "app/models/data";
import { getAccessToken } from "auth/services/get-access-token";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export default function useProtectedData<TData>(
  getDataFunc: (abortController: AbortController, accessToken: string) => Promise<AxiosResponse<TData>>
): IData<TData | null> {
  const [processing, setProcessing] = useState<boolean>(true);
  const { instance, accounts } = useMsal();
  const [data, setData] = useState<TData | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    getAccessToken(instance, accounts)
      .then((accessToken) => getDataFunc(abortController, accessToken))
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setProcessing(false));

    return () => abortController.abort();
  }, [instance, accounts]);

  return {
    processing,
    data,
  };
}
