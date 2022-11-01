import { IAppInfo } from "app/models/app-info";
import { getAppInfo } from "app/api/app-info-api";
import { useEffect, useState } from "react";

export default function Test2() {
  const [appInfo, setAppInfo] = useState<IAppInfo | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    getAppInfo(abortController)
      .then((response) => {
        setAppInfo(response.data);
      })
      .catch((error) => console.log(error));

    return () => abortController.abort();
  }, []);

  return (
    <>
      <p>Test2</p>
      {appInfo && <p>{appInfo.appName}</p>}
      {appInfo && <p>{appInfo.appVersion}</p>}
    </>
  );
}
