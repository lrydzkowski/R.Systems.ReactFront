import { AxiosResponse } from "axios";

export declare type GetData<TData> = (
  abortController: AbortController,
  urlParameters: UrlParameters,
  requestParameters: object
) => Promise<AxiosResponse<TData> | void>;

export interface UrlParameters {
  [key: string]: string;
}
