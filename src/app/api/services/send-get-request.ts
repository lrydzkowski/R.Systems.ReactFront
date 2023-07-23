import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
import { ErrorCodes } from "@app/models/error-codes";
import { UrlInfo } from "@app/models/url-info";
import { IRequestOptions } from "../models/request-options";
import { buildRequestConfig } from "./build-request-config";

export function sendGetRequestAsync<TResponseData>(
  options: IRequestOptions
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

  return axios.get(fullUrl, requestConfig).catch((error: AxiosError) => {
    if (error.code === ErrorCodes.cancelled) {
      return;
    }

    throw error;
  });
}
