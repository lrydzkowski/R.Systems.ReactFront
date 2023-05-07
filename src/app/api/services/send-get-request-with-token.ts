import { AxiosResponse, ResponseType } from "axios";
import { getAccessToken } from "./get-access-token";
import { sendGetRequest } from "./send-get-request";

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
