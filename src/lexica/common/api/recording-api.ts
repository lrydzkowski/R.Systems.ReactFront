import { sendGetRequestWithToken } from "app/api/services/send-request-with-token";
import { AxiosResponse } from "axios";

const baseUrl = process.env.REACT_APP_LEXICA_API_URL ?? "";

export function getRecording(abortController: AbortController, word: string): Promise<AxiosResponse<Blob> | void> {
  const urlPath = "/recordings/:word";
  const urlPathParameters = { word };

  return sendGetRequestWithToken<Blob>(abortController, baseUrl, urlPath, urlPathParameters, {}, "blob");
}
