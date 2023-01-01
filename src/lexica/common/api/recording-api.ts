import { sendGetRequestWithToken } from "app/api/services/send-request-with-token";
import { AxiosError, AxiosResponse } from "axios";

const baseUrl = process.env.REACT_APP_LEXICA_API_URL ?? "";

export function getRecording(
  abortController: AbortController,
  word: string,
  ignore404Response = true
): Promise<AxiosResponse<Blob> | void> {
  const urlPath = "/recordings/:word";
  const urlPathParameters = { word };

  return sendGetRequestWithToken<Blob>(abortController, baseUrl, urlPath, urlPathParameters, {}, "blob").catch(
    (error: AxiosError) => {
      if (ignore404Response && error.response?.status === 404) {
        return;
      }

      throw error;
    }
  );
}
