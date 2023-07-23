import { AxiosResponse } from "axios";
import useApiRequests from "./use-api-requests";

const baseUrl = import.meta.env.VITE_LEXICA_API_URL ?? "";

export default function useAppInfoApi(): {
  getAppInfo: (abortController: AbortController) => Promise<AxiosResponse<IAppInfo> | void>;
} {
  const { sendGetRequestAsync } = useApiRequests();

  function getAppInfo(abortController: AbortController): Promise<AxiosResponse<IAppInfo> | void> {
    const urlPath = "/";

    return sendGetRequestAsync<IAppInfo>({
      abortController,
      baseUrl,
      urlPath,
      urlPathParameters: {},
      urlParameters: {},
    });
  }

  return { getAppInfo };
}

export interface IAppInfo {
  appName: string;
  appVersion: string;
}
