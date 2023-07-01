import { AxiosResponse, ResponseType } from "axios";
import { getAccessToken } from "./get-access-token";
import { sendDeleteRequest } from "./send-delete-request";

export function sendDeleteRequestWithToken<TResponseData>(
  abortController: AbortController,
  baseUrl: string,
  urlPath: string,
  urlPathParameters: { [key: string]: string } = {},
  requestParameters: object = {},
  responseType: ResponseType = "json"
): Promise<AxiosResponse<TResponseData> | void> {
  return getAccessToken().then((accessToken) =>
    sendDeleteRequest(
      abortController,
      baseUrl,
      urlPath,
      urlPathParameters,
      requestParameters,
      responseType,
      accessToken
    )
  );
}
