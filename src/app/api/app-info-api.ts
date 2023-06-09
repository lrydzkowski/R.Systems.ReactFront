import { AxiosResponse } from "axios";
import { sendGetRequest } from "@app/api/services/send-get-request";

const baseUrl = import.meta.env.VITE_LEXICA_API_URL ?? "";

export function getAppInfo(abortController: AbortController): Promise<AxiosResponse<IAppInfo> | void> {
  const urlPath = "/";

  return sendGetRequest<IAppInfo>(abortController, baseUrl, urlPath, {}, {});
}

export interface IAppInfo {
  appName: string;
  appVersion: string;
}
