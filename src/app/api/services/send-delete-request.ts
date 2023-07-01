import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
import { ErrorCodes } from "@app/models/error-codes";
import { UrlInfo } from "@app/models/url-info";
import { buildRequestConfig } from "./build-request-config";

export function sendDeleteRequest<TResponseData>(
  abortController: AbortController,
  baseUrl: string,
  urlPath: string,
  urlPathParameters: { [key: string]: string } = {},
  urlParameters: object = {},
  responseType: ResponseType = "json",
  accessToken: string | null = null
): Promise<AxiosResponse<TResponseData> | void> {
  const requestConfig: AxiosRequestConfig = buildRequestConfig(
    abortController,
    accessToken,
    urlParameters,
    responseType
  );
  const fullUrl = new UrlInfo(baseUrl, urlPath, urlPathParameters).build();

  return axios.delete(fullUrl, requestConfig).catch((error: AxiosError) => {
    if (error.code === ErrorCodes.cancelled) {
      return;
    }

    throw error;
  });
}
