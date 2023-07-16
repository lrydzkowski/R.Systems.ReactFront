import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
import { ErrorCodes } from "@app/models/error-codes";
import { UrlInfo } from "@app/models/url-info";
import { IRequestOptionsWithData } from "../models/request-options";
import { buildRequestConfig } from "./build-request-config";

export function sendPostRequestAsync<TRequestData, TResponseData>(
  options: IRequestOptionsWithData<TRequestData>
): Promise<AxiosResponse<TResponseData> | void> {
  const urlPathParameters = options.urlPathParameters ?? {};
  const urlParameters = options.urlParameters ?? {};
  const responseType = options.responseType ?? ("json" as ResponseType);
  const accessToken = options.accessToken ?? null;

  const requestConfig: AxiosRequestConfig = buildRequestConfig(
    options.abortController,
    accessToken,
    urlParameters,
    responseType
  );
  const fullUrl = new UrlInfo(options.baseUrl, options.urlPath, urlPathParameters).build();

  return axios.post(fullUrl, options.request, requestConfig).catch((error: AxiosError) => {
    if (error.code === ErrorCodes.cancelled) {
      return;
    }

    throw error;
  });
}
