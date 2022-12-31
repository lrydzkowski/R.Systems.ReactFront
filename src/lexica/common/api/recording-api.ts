import { buildRequestConfig, buildUrl } from "app/api/api-helpers";
import axios, { AxiosRequestConfig } from "axios";

const baseUrl = process.env.REACT_APP_LEXICA_API_URL;

export function getRecording(
  abortController: AbortController,
  accessToken: string,
  requestParameters: object,
  urlParts: string[]
) {
  const requestConfig: AxiosRequestConfig = buildRequestConfig(abortController, accessToken, requestParameters, "blob");
  const url: string = buildUrl(`${baseUrl}/recordings`, urlParts);

  return axios.get(url, requestConfig);
}
