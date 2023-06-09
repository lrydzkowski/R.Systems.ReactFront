export async function playRecordings(recordings: Blob[], abortController: AbortController) {
  for (const recording of recordings) {
    await playRecording(recording, abortController);
  }
}

function playRecording(recording: Blob, abortController: AbortController) {
  return new Promise((res) => {
    const blobUrl = window.URL.createObjectURL(recording);
    const audio = new Audio(blobUrl);
    audio.play();
    audio.onended = res;
    if (abortController.signal) {
      abortController.signal.onabort = () => {
        audio.pause();
      };
    }
  });
}
