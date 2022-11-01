import axios from "axios";

const baseUrl = process.env.REACT_APP_LEXICA_API_URL;

export function getAppInfo(abortController: AbortController) {
  return axios.get(`${baseUrl}`, { signal: abortController.signal });
}
