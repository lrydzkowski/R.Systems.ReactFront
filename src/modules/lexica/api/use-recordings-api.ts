import { AxiosError, AxiosResponse } from "axios";
import useApiRequests from "@app/api/hooks/use-api-requests";
import IWordInfo from "@lexica/models/word-info";

const baseUrl = import.meta.env.VITE_APP_LEXICA_API_URL ?? "";

export default function useRecordingsApi(): {
  getRecordingAsync(
    abortController: AbortController,
    wordInfo: IWordInfo,
    ignore404Response?: boolean
  ): Promise<AxiosResponse<Blob> | void>;
  getRecordingsAsync(words: IWordInfo[]): Promise<Blob[]>;
} {
  const { sendGetRequestWithAccessTokenAsync } = useApiRequests();

  function getRecordingAsync(
    abortController: AbortController,
    wordInfo: IWordInfo,
    ignore404Response?: boolean
  ): Promise<AxiosResponse<Blob> | void> {
    ignore404Response ??= true;

    const urlPath = "/recordings/:word";
    const urlPathParameters = { word: wordInfo.word };
    const requestParameters = { wordType: wordInfo.wordType };

    return sendGetRequestWithAccessTokenAsync<Blob>({
      abortController,
      baseUrl,
      urlPath,
      urlPathParameters,
      urlParameters: requestParameters,
      responseType: "blob",
    }).catch((error: AxiosError) => {
      if (ignore404Response && error.response?.status === 404) {
        return;
      }

      throw error;
    });
  }

  async function getRecordingsAsync(words: IWordInfo[]): Promise<Blob[]> {
    const abortController = new AbortController();
    const responses: PromiseSettledResult<AxiosResponse<Blob> | void>[] = await Promise.allSettled(
      words.map((word) => getRecordingAsync(abortController, word))
    );

    const recordings: Blob[] = responses
      .filter((response) => response.status === "fulfilled" && response.value !== undefined)
      .map((response) => (response as PromiseFulfilledResult<AxiosResponse<Blob>>).value.data);

    if (responses.length !== recordings.length) {
      return [];
    }

    return recordings;
  }

  return { getRecordingAsync, getRecordingsAsync };
}
