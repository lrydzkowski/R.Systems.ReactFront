import { AxiosResponse } from "axios";
import useApiRequests from "@app/api/hooks/use-api-requests";
import { UrlParameters } from "@app/models/get-data";
import { ListInfo } from "@app/models/list-info";
import { formatDate } from "@app/services/data-formatter";
import { ICreateSetRequest, ICreateSetResponse } from "@lexica/models/create-set-request";
import { IUpdateSetRequest } from "@lexica/models/update-set-request";
import { Set } from "../models/set";

const baseUrl = import.meta.env.VITE_APP_LEXICA_API_URL ?? "";

export default function useSetsApi(): {
  getSetsAsync: (
    abortController: AbortController,
    urlPathParameters: UrlParameters,
    requestParameters?: object
  ) => Promise<AxiosResponse<ListInfo<Set>> | void>;
  getSetAsync: (
    abortController: AbortController,
    urlPathParameters: UrlParameters,
    requestParameters?: object
  ) => Promise<AxiosResponse<Set> | void>;
  getSetNamesAsync: (abortController: AbortController, setIdsSerialized: string) => Promise<string>;
  createSetAsync: (abortController: AbortController, request: ICreateSetRequest) => Promise<ICreateSetResponse | null>;
  updateSetAsync: (abortController: AbortController, request: IUpdateSetRequest) => Promise<void>;
  deleteSetsAsync: (abortController: AbortController, setIds: number[]) => Promise<void>;
} {
  const {
    sendGetRequestWithAccessTokenAsync,
    sendDeleteRequestWithAccessTokenAsync,
    sendPostRequestWithAccessTokenAsync,
    sendPutRequestWithAccessTokenAsync,
  } = useApiRequests();

  function getSetsAsync(
    abortController: AbortController,
    urlPathParameters: UrlParameters,
    requestParameters?: object
  ): Promise<AxiosResponse<ListInfo<Set>> | void> {
    requestParameters ??= {};
    const urlPath = "/sets";

    return sendGetRequestWithAccessTokenAsync<ListInfo<Set>>({
      abortController,
      baseUrl,
      urlPath,
      urlPathParameters,
      urlParameters: requestParameters,
    }).then((response) => {
      if (response === undefined) {
        return response;
      }

      response.data.data.forEach((set) => {
        set.createdAt = formatDate(set.createdAt);
      });

      return response;
    });
  }

  function getSetAsync(
    abortController: AbortController,
    urlPathParameters: UrlParameters,
    requestParameters: object = {}
  ): Promise<AxiosResponse<Set> | void> {
    requestParameters ??= {};
    const urlPath = "/sets/:setId";

    return sendGetRequestWithAccessTokenAsync<Set>({
      abortController,
      baseUrl,
      urlPath,
      urlPathParameters,
      urlParameters: requestParameters,
    });
  }

  function getSetNamesAsync(abortController: AbortController, setIdsSerialized: string): Promise<string> {
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

  async function createSetAsync(
    abortController: AbortController,
    request: ICreateSetRequest
  ): Promise<ICreateSetResponse | null> {
    const urlPath = "/sets";

    const response = await sendPostRequestWithAccessTokenAsync<ICreateSetRequest, ICreateSetResponse>({
      abortController,
      request,
      baseUrl,
      urlPath,
    });

    return response?.data ?? null;
  }

  async function updateSetAsync(abortController: AbortController, request: IUpdateSetRequest): Promise<void> {
    const urlPath = "/sets";

    await sendPutRequestWithAccessTokenAsync<IUpdateSetRequest, void>({ abortController, request, baseUrl, urlPath });
  }

  async function deleteSetsAsync(abortController: AbortController, setIds: number[]): Promise<void> {
    const promises: Promise<AxiosResponse<void> | void>[] = [];
    setIds.forEach((setId) => {
      const urlPath = "/sets/:setId";
      promises.push(
        sendDeleteRequestWithAccessTokenAsync<void>({
          abortController,
          baseUrl,
          urlPath,
          urlPathParameters: { setId: setId.toString() },
        })
      );
    });

    await Promise.all(promises);
  }

  return {
    getSetsAsync,
    getSetAsync,
    getSetNamesAsync,
    createSetAsync,
    updateSetAsync,
    deleteSetsAsync,
  };
}
