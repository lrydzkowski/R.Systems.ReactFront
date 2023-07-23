import { ResponseType } from "axios";

export interface IRequestOptions {
  abortController: AbortController;
  baseUrl: string;
  urlPath: string;
  urlPathParameters?: { [key: string]: string };
  urlParameters?: object;
  responseType?: ResponseType;
  accessToken?: string | null;
}

export interface IRequestOptionsWithData<TRequestData> extends IRequestOptions {
  request: TRequestData;
}
