import { AxiosRequestConfig, ResponseType } from "axios";

export function buildRequestConfig(
  abortController: AbortController,
  accessToken: string,
  requestParameters: object,
  responseType: ResponseType = "json"
): AxiosRequestConfig {
  const requestConfig: AxiosRequestConfig = {
    headers: { Authorization: `Bearer ${accessToken}` },
    signal: abortController.signal,
    params: requestParameters,
    responseType: responseType,
  };

  return requestConfig;
}

export function buildUrl(baseUrl: string, urlParts: string[]): string {
  let url = baseUrl;
  for (const urlPart of urlParts) {
    url += `/${encodeURIComponent(urlPart)}`;
  }

  return url;
}
