import { AxiosResponse } from "axios";
import { sendGetRequestWithToken } from "@app/api/services/send-get-request-with-token";
import { UrlParameters } from "@app/models/get-data";
import { ListInfo } from "@app/models/list-info";
import { formatDate } from "@app/services/data-formatter";
import { Set } from "../models/set";

const baseUrl = import.meta.env.VITE_APP_LEXICA_API_URL ?? "";

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
  ).then((response) => {
    if (response === undefined) {
      return response;
    }

    response.data.data.forEach((set) => {
      set.createdAt = formatDate(set.createdAt);
    });

    return response;
  });
}

export function getSet(
  abortController: AbortController,
  urlPathParameters: UrlParameters,
  requestParameters: object = {}
): Promise<AxiosResponse<Set> | void> {
  const urlPath = "/sets/:setId";

  return sendGetRequestWithToken<Set>(abortController, baseUrl, urlPath, urlPathParameters, requestParameters);
}
