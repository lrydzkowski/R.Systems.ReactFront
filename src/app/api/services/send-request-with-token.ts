import { sendGetRequest } from "app/api/services/send-request";
import { AxiosResponse, ResponseType } from "axios";
import { getAccessToken } from "./get-access-token";

export function sendGetRequestWithToken<TData>(
  abortController: AbortController,
  baseUrl: string,
  urlPath: string,
  urlPathParameters: { [key: string]: string } = {},
  requestParameters: object = {},
  responseType: ResponseType = "json"
): Promise<AxiosResponse<TData> | void> {
  return getAccessToken().then((accessToken) =>
    sendGetRequest(abortController, baseUrl, urlPath, urlPathParameters, requestParameters, responseType, accessToken)
  );
}
