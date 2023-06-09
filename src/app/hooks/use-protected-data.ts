import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { IData } from "@app/models/data";
import { GetData, UrlParameters } from "@app/models/get-data";

export function useProtectedData<TData>(
  getDataFuncInfo: IGetDataFuncInfo<TData>,
  refreshKey: number,
  onError: (error: AxiosError) => void
): IData<TData | null> {
  const [processing, setProcessing] = useState<number>(0);
  const [data, setData] = useState<TData | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    setProcessing((x) => x + 1);
    getDataFuncInfo
      .getDataFunc(abortController, getDataFuncInfo.urlParameters, getDataFuncInfo.requestParameters)
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
  }, [refreshKey]);

  return {
    processing: processing > 0,
    data,
  };
}

export function useProtectedMultipleData<TData>(
  getDataFuncInfo: IGetDataFuncInfo<TData>[],
  refreshKey: number,
  onError: (error: AxiosError) => void
): IData<TData[] | null> {
  const [processing, setProcessing] = useState<number>(0);
  const [data, setData] = useState<TData[] | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    setProcessing((x) => x + 1);
    Promise.all(getDataFuncInfo.map((x) => x.getDataFunc(abortController, x.urlParameters, x.requestParameters)))
      .then((responses) => {
        if (responses === undefined) {
          return;
        }

        const combinedData: TData[] = [];
        for (const response of responses) {
          if (response === undefined) {
            continue;
          }

          combinedData.push(response.data);
        }

        setData(combinedData);
      })
      .catch(onError)
      .finally(() => {
        setProcessing((x) => x - 1);
      });

    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  return {
    processing: processing > 0,
    data,
  };
}

export interface IGetDataFuncInfo<TData> {
  getDataFunc: GetData<TData>;
  urlParameters: UrlParameters;
  requestParameters: object;
}
