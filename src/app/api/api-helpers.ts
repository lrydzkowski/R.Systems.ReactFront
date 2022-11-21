import { AxiosRequestConfig } from "axios";

export function BuildRequestConfig(
  abortController: AbortController,
  accessToken: string,
  requestParameters: object
): AxiosRequestConfig {
  const requestConfig: AxiosRequestConfig = {
    headers: { Authorization: `Bearer ${accessToken}` },
    signal: abortController.signal,
    params: requestParameters,
  };

  return requestConfig;
}

export function BuildUrl(baseUrl: string, urlParts: string[]): string {
  let url = baseUrl;
  for (const urlPart of urlParts) {
    url += `/${encodeURIComponent(urlPart)}`;
  }

  return url;
}
