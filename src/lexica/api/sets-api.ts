import axios, { AxiosRequestConfig } from "axios";

const baseUrl = process.env.REACT_APP_LEXICA_API_URL;

export function getSets(abortController: AbortController, accessToken: string, requestParameters: object) {
  const requestConfig: AxiosRequestConfig = {
    headers: { Authorization: `Bearer ${accessToken}` },
    signal: abortController.signal,
    params: requestParameters,
  };

  return axios.get(`${baseUrl}/sets`, requestConfig);
}
