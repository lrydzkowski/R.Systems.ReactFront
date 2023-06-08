import { AxiosError, AxiosResponse } from "axios";
import { sendGetRequestWithToken } from "@app/api/services/send-get-request-with-token";
import IWordInfo from "@lexica/models/word-info";

const baseUrl = import.meta.env.VITE_APP_LEXICA_API_URL ?? "";

export function getRecording(
  abortController: AbortController,
  wordInfo: IWordInfo,
  ignore404Response = true
): Promise<AxiosResponse<Blob> | void> {
  const urlPath = "/recordings/:word";
  const urlPathParameters = { word: wordInfo.word };
  const requestParameters = { wordType: wordInfo.wordType };

  return sendGetRequestWithToken<Blob>(
    abortController,
    baseUrl,
    urlPath,
    urlPathParameters,
    requestParameters,
    "blob"
  ).catch((error: AxiosError) => {
    if (ignore404Response && error.response?.status === 404) {
      return;
    }

    throw error;
  });
}
