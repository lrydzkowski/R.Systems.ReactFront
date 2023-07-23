import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import useRecordingsApi from "@lexica/api/use-recordings-api";
import IWordInfo from "@lexica/models/word-info";

export default function useRecordings(words: IWordInfo[]): Blob[] {
  const { getRecordingAsync } = useRecordingsApi();
  const [recordings, setRecordings] = useState<Blob[]>([]);

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      const responses: PromiseSettledResult<AxiosResponse<Blob> | void>[] = await Promise.allSettled(
        words.map((word) => getRecordingAsync(abortController, word))
      );

      const data: Blob[] = responses
        .filter((response) => response.status === "fulfilled" && response.value !== undefined)
        .map((response) => (response as PromiseFulfilledResult<AxiosResponse<Blob>>).value.data);

      if (responses.length !== data.length) {
        setRecordings([]);
      }

      setRecordings(data);

      return () => abortController.abort();
    })();
  }, [words]);

  return recordings;
}
