import useProtectedDataWithCallback from "auth/hooks/use-protected-data-with-callback";
import { useState } from "react";
import { getRecording } from "../api/recording-api";

export interface RecordingsPlayerProps {
  word: string;
}

export default function RecordingsPlayer(props: RecordingsPlayerProps) {
  const [blobUrl, setBlobUrl] = useState<string>("");

  useProtectedDataWithCallback<Blob>(
    getRecording,
    props.word,
    (data) => {
      setBlobUrl(window.URL.createObjectURL(data));
      // const audio = new Audio();
      // audio.src = blobUrl;
      // audio.controls = true;
      // document.body.appendChild(audio);
      // audio.play();
    },
    (error) => {
      console.log(error);
    }
  );

  return <>{blobUrl !== "" && <audio src={blobUrl} autoPlay={true}></audio>}</>;
}
