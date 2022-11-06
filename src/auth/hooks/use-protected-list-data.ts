import { useMsal } from "@azure/msal-react";
import { IData } from "app/models/data";
import { getAccessToken } from "auth/services/get-access-token";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export default function useProtectedListData<TData>(
  getDataFunc: (
    abortController: AbortController,
    accessToken: string,
    requestParameters: object
  ) => Promise<AxiosResponse<TData>>,
  pageNumber: number,
  pageSize: number
): IData<TData | null> {
  const [processing, setProcessing] = useState<number>(0);
  const { instance, accounts } = useMsal();
  const [data, setData] = useState<TData | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    setProcessing((x) => x + 1);
    getAccessToken(instance, accounts)
      .then((accessToken) =>
        getDataFunc(abortController, accessToken, { firstIndex: pageNumber * pageSize, numberOfRows: pageSize })
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setProcessing((x) => x - 1);
      });

    return () => abortController.abort();
  }, [instance, accounts, pageNumber, pageSize]);

  return {
    processing: processing > 0,
    data,
  };
}
