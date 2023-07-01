import { AxiosRequestConfig, ResponseType } from "axios";

export function buildRequestConfig(
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
