import { AxiosResponse } from "axios";
import { sendDeleteRequestWithToken } from "@app/api/services/send-delete-request-with-token";
import { sendGetRequestWithToken } from "@app/api/services/send-get-request-with-token";
import { sendPostRequestWithToken } from "@app/api/services/send-post-request-with-token";
import { UrlParameters } from "@app/models/get-data";
import { ListInfo } from "@app/models/list-info";
import { formatDate } from "@app/services/data-formatter";
import { ICreateSetRequest, ICreateSetResponse } from "@lexica/models/create-set-request";
import { Set } from "../models/set";

const baseUrl = import.meta.env.VITE_APP_LEXICA_API_URL ?? "";

export function getSetsAsync(
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

export function getSetAsync(
  abortController: AbortController,
  urlPathParameters: UrlParameters,
  requestParameters: object = {}
): Promise<AxiosResponse<Set> | void> {
  const urlPath = "/sets/:setId";

  return sendGetRequestWithToken<Set>(abortController, baseUrl, urlPath, urlPathParameters, requestParameters);
}

export function getSetNamesAsync(abortController: AbortController, setIdsSerialized: string): Promise<string> {
  const requests: Promise<AxiosResponse<Set> | void>[] = [];
  setIdsSerialized
    .split(",")
    .map((setId) => setId.trim())
    .forEach((setId) => requests.push(getSetAsync(abortController, { setId }, {})));

  return Promise.all(requests).then((responses) => {
    const names: string[] = [];
    responses.forEach((response) => names.push(response?.data?.name ?? ""));
    const name = names
      .filter((name) => name.length > 0)
      .sort()
      .join(", ");

    return name;
  });
}

export async function createSetAsync(
  abortController: AbortController,
  request: ICreateSetRequest
): Promise<ICreateSetResponse | null> {
  const urlPath = "/sets";

  const response = await sendPostRequestWithToken<ICreateSetRequest, ICreateSetResponse>(
    abortController,
    request,
    baseUrl,
    urlPath
  );

  return response?.data ?? null;
}

export async function deleteSetsAsync(abortController: AbortController, setIds: number[]): Promise<void> {
  const promises: Promise<AxiosResponse<void> | void>[] = [];
  setIds.forEach((setId) => {
    const urlPath = "/sets/:setId";
    promises.push(sendDeleteRequestWithToken<void>(abortController, baseUrl, urlPath, { setId: setId.toString() }));
  });

  await Promise.all(promises);
}
