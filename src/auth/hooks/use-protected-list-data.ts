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
  page: number,
  pageSize: number,
  sortingFieldName: string,
  sortingOrder: string,
  searchQuery: string | null,
  refreshKey: number
): IData<TData | null> {
  const { instance, accounts } = useMsal();
  const [processing, setProcessing] = useState<number>(0);
  const [data, setData] = useState<TData | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    setProcessing((x) => x + 1);
    getAccessToken(instance, accounts)
      .then((accessToken) =>
        getDataFunc(abortController, accessToken, { page, pageSize, sortingFieldName, sortingOrder, searchQuery })
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
  }, [instance, accounts, page, pageSize, sortingFieldName, sortingOrder, searchQuery, refreshKey]);

  return {
    processing: processing > 0,
    data,
  };
}
