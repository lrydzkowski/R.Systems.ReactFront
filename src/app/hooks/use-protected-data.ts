import { GetData, UrlParameters } from "app/models/get-data";
import { IData } from "app/models/data";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export default function useProtectedData<TData>(
  getDataFunc: GetData<TData>,
  urlParameters: UrlParameters,
  requestParameters: object,
  refreshKey: number,
  onError: (error: AxiosError) => void
): IData<TData | null> {
  const [processing, setProcessing] = useState<number>(0);
  const [data, setData] = useState<TData | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    setProcessing((x) => x + 1);
    getDataFunc(abortController, urlParameters, requestParameters)
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
  }, [refreshKey]);

  return {
    processing: processing > 0,
    data,
  };
}
