import { AxiosResponse, ResponseType } from "axios";
import { getAccessToken } from "./get-access-token";
import { sendPutRequest } from "./send-put-request";

export function sendPutRequestWithToken<TRequestData, TResponseData>(
  abortController: AbortController,
  request: TRequestData,
  baseUrl: string,
  urlPath: string,
  urlPathParameters: { [key: string]: string } = {},
  requestParameters: object = {},
  responseType: ResponseType = "json"
): Promise<AxiosResponse<TResponseData> | void> {
  return getAccessToken().then((accessToken) =>
    sendPutRequest(
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
