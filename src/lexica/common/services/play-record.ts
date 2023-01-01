import { AxiosResponse } from "axios";
import { getRecording } from "../api/recording-api";

export default function playRecord(word: string): Promise<boolean> {
  const abortController = new AbortController();
  return getRecording(abortController, word).then((response: AxiosResponse<Blob> | void) => {
    if (response === undefined) {
      return false;
    }

    const blobUrl = window.URL.createObjectURL(response.data);
    new Audio(blobUrl).play();

    return true;
  });
}
