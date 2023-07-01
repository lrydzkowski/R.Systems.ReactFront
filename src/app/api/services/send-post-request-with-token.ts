import { AxiosResponse, ResponseType } from "axios";
import { getAccessToken } from "./get-access-token";
import { sendPostRequest } from "./send-post-request";

export function sendPostRequestWithToken<TRequestData, TResponseData>(
  abortController: AbortController,
  request: TRequestData,
  baseUrl: string,
  urlPath: string,
  urlPathParameters: { [key: string]: string } = {},
  requestParameters: object = {},
  responseType: ResponseType = "json"
): Promise<AxiosResponse<TResponseData> | void> {
  return getAccessToken().then((accessToken) =>
    sendPostRequest(
      abortController,
      request,
      baseUrl,
      urlPath,
      urlPathParameters,
      requestParameters,
      responseType,
      accessToken
    )
  );
}
