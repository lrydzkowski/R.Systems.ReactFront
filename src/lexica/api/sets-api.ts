import { BuildRequestConfig, BuildUrl } from "app/api/api-helpers";
import axios, { AxiosRequestConfig } from "axios";

const baseUrl = process.env.REACT_APP_LEXICA_API_URL;

export function getSets(
  abortController: AbortController,
  accessToken: string,
  requestParameters: object,
  urlParts: string[]
) {
  const requestConfig: AxiosRequestConfig = BuildRequestConfig(abortController, accessToken, requestParameters);
  const url: string = BuildUrl(`${baseUrl}/sets`, urlParts);

  return axios.get(url, requestConfig);
}
