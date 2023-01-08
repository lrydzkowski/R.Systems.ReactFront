import { ErrorCodes } from "app/models/error-codes";
import { UrlInfo } from "app/models/url-info";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";

export function sendGetRequest<TData>(
  abortController: AbortController,
  baseUrl: string,
  urlPath: string,
  urlPathParameters: { [key: string]: string } = {},
  requestParameters: object = {},
  responseType: ResponseType = "json",
  accessToken: string | null = null
): Promise<AxiosResponse<TData> | void> {
  const requestConfig: AxiosRequestConfig = buildRequestConfig(
    abortController,
    accessToken,
    requestParameters,
    responseType
  );
  const fullUrl = new UrlInfo(baseUrl, urlPath, urlPathParameters).build();

  return axios.get(fullUrl, requestConfig).catch((error: AxiosError) => {
    if (error.code === ErrorCodes.cancelled) {
      return;
    }

    throw error;
  });
}

function buildRequestConfig(
  abortController: AbortController,
  accessToken: string | null,
  requestParameters: object,
  responseType: ResponseType = "json"
): AxiosRequestConfig {
  const requestConfig: AxiosRequestConfig = {
    signal: abortController.signal,
    params: requestParameters,
    responseType: responseType,
  };
  if (accessToken !== null) {
    if (requestConfig.headers === undefined) {
      requestConfig.headers = {};
    }
    requestConfig.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return requestConfig;
}
