import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
import { ErrorCodes } from "@app/models/error-codes";
import { UrlInfo } from "@app/models/url-info";

export function sendGetRequest<TData>(
  abortController: AbortController,
  baseUrl: string,
  urlPath: string,
  urlPathParameters: { [key: string]: string } = {},
  urlParameters: object = {},
  responseType: ResponseType = "json",
  accessToken: string | null = null
): Promise<AxiosResponse<TData> | void> {
  const requestConfig: AxiosRequestConfig = buildRequestConfig(
    abortController,
    accessToken,
    urlParameters,
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
  urlParameters: object,
  responseType: ResponseType = "json"
): AxiosRequestConfig {
  const requestConfig: AxiosRequestConfig = {
    signal: abortController.signal,
    params: urlParameters,
    responseType: responseType,
  };
  if (accessToken !== null) {
    if (requestConfig.headers === undefined) {
      requestConfig.headers = {};
    }
    requestConfig.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  requestConfig.paramsSerializer = {
    indexes: null,
  };

  return requestConfig;
}
