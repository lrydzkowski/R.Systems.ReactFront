import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { IData } from "@app/models/data";
import { GetData, UrlParameters } from "@app/models/get-data";
import { IListParameters } from "@app/models/list-parameters";

export default function useProtectedListData<TData>(
  getDataFunc: GetData<TData>,
  urlParameters: UrlParameters,
  listParameters: IListParameters,
  refreshKey: number,
  onError: (error: AxiosError) => void
): IData<TData | null> {
  const [processing, setProcessing] = useState<number>(0);
  const [data, setData] = useState<TData | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    setProcessing((x) => x + 1);
    getDataFunc(abortController, urlParameters, listParameters)
      .then((response) => {
        if (response === undefined) {
          return;
        }

        setData(response.data);
      })
      .catch(onError)
      .finally(() => {
        setProcessing((x) => x - 1);
      });

    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    listParameters.page,
    listParameters.pageSize,
    listParameters.sortingFieldName,
    listParameters.sortingOrder,
    listParameters.searchQuery,
    refreshKey,
  ]);

  return {
    processing: processing > 0,
    data,
  };
}
