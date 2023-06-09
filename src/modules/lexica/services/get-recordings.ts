import { AxiosResponse } from "axios";
import { getRecording } from "@lexica/api/recording-api";
import IWordInfo from "@lexica/models/word-info";

export default async function getRecordings(words: IWordInfo[]): Promise<Blob[]> {
  const abortController = new AbortController();
  const responses: PromiseSettledResult<AxiosResponse<Blob> | void>[] = await Promise.allSettled(
    words.map((word) => getRecording(abortController, word))
  );

  const recordings: Blob[] = responses
    .filter((response) => response.status === "fulfilled" && response.value !== undefined)
    .map((response) => (response as PromiseFulfilledResult<AxiosResponse<Blob>>).value.data);

  if (responses.length !== recordings.length) {
    return [];
  }

  return recordings;
}
