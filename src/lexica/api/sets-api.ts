import axios, { AxiosRequestConfig } from "axios";

const baseUrl = process.env.REACT_APP_LEXICA_API_URL;

export function getSets(abortController: AbortController, accessToken: string) {
  const requestConfig: AxiosRequestConfig = {
    headers: { Authorization: `Bearer ${accessToken}` },
    signal: abortController.signal,
  };

  return axios.get(`${baseUrl}/sets`, requestConfig);
}
