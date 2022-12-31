import { AxiosResponse } from "axios";
import { getRecording } from "../api/recording-api";

export default function playRecord(word: string): void {
  const abortController = new AbortController();
  getRecording(abortController, word).then((response: AxiosResponse<Blob> | void) => {
    if (response === undefined) {
      return;
    }

    const blobUrl = window.URL.createObjectURL(response.data);
    new Audio(blobUrl).play();
  });
}
