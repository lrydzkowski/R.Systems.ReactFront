import { IAppInfo } from "app/models/app-info";
import { AxiosResponse } from "axios";
import { sendGetRequest } from "./services/send-get-request";

const baseUrl = process.env.REACT_APP_LEXICA_API_URL ?? "";

export function getAppInfo(abortController: AbortController): Promise<AxiosResponse<IAppInfo> | void> {
  const urlPath = "/";

  return sendGetRequest<IAppInfo>(abortController, baseUrl, urlPath, {}, {});
}
