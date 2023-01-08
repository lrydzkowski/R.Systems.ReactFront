import { UrlParameters } from "app/models/get-data";
import { ListInfo } from "app/models/list-info";
import { sendGetRequestWithToken } from "app/api/services/send-request-with-token";
import { AxiosResponse } from "axios";
import { Set } from "lexica/common/models/set";

const baseUrl = process.env.REACT_APP_LEXICA_API_URL ?? "";

export function getSets(
  abortController: AbortController,
  urlPathParameters: UrlParameters,
  requestParameters: object = {}
): Promise<AxiosResponse<ListInfo<Set>> | void> {
  const urlPath = "/sets";

  return sendGetRequestWithToken<ListInfo<Set>>(
    abortController,
    baseUrl,
    urlPath,
    urlPathParameters,
    requestParameters
  );
}

export function getSetsContent(
  abortController: AbortController,
  urlPathParameters: UrlParameters,
  requestParameters: object = {}
): Promise<AxiosResponse<Set[]> | void> {
  const urlPath = "/sets/:paths";

  return sendGetRequestWithToken<Set[]>(abortController, baseUrl, urlPath, urlPathParameters, requestParameters);
}
