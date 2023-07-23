import { useAuth0 } from "@auth0/auth0-react";
import { AxiosResponse } from "axios";
import { getAuthorizationParams } from "@app/auth/auth0-configuration";
import { IRequestOptions, IRequestOptionsWithData } from "../models/request-options";
import { sendDeleteRequestAsync } from "../services/send-delete-request";
import { sendGetRequestAsync } from "../services/send-get-request";
import { sendPostRequestAsync } from "../services/send-post-request";
import { sendPutRequestAsync } from "../services/send-put-request";

export default function useApiRequests(): {
  sendGetRequestAsync: <TResponseData>(options: IRequestOptions) => Promise<AxiosResponse<TResponseData> | void>;
  sendGetRequestWithAccessTokenAsync: <TResponseData>(
    options: IRequestOptions
  ) => Promise<AxiosResponse<TResponseData> | void>;
  sendDeleteRequestAsync: <TResponseData>(options: IRequestOptions) => Promise<AxiosResponse<TResponseData> | void>;
  sendDeleteRequestWithAccessTokenAsync: <TResponseData>(
    options: IRequestOptions
  ) => Promise<AxiosResponse<TResponseData> | void>;
  sendPostRequestAsync: <TRequestData, TResponseData>(
    options: IRequestOptionsWithData<TRequestData>
  ) => Promise<AxiosResponse<TResponseData> | void>;
  sendPostRequestWithAccessTokenAsync: <TRequestData, TResponseData>(
    options: IRequestOptionsWithData<TRequestData>
  ) => Promise<AxiosResponse<TResponseData> | void>;
  sendPutRequestAsync: <TRequestData, TResponseData>(
    options: IRequestOptionsWithData<TRequestData>
  ) => Promise<AxiosResponse<TResponseData> | void>;
  sendPutRequestWithAccessTokenAsync: <TRequestData, TResponseData>(
    options: IRequestOptionsWithData<TRequestData>
  ) => Promise<AxiosResponse<TResponseData> | void>;
} {
  const { getAccessTokenSilently } = useAuth0();
  const authorizationParams = getAuthorizationParams();

  function sendGetRequestWithAccessTokenAsync<TData>(options: IRequestOptions): Promise<AxiosResponse<TData> | void> {
    return getAccessTokenSilently({ authorizationParams }).then((accessToken) =>
      sendGetRequestAsync<TData>({ ...options, accessToken })
    );
  }

  function sendDeleteRequestWithAccessTokenAsync<TResponseData>(
    options: IRequestOptions
  ): Promise<AxiosResponse<TResponseData> | void> {
    return getAccessTokenSilently({ authorizationParams }).then((accessToken) =>
      sendDeleteRequestAsync<TResponseData>({ ...options, accessToken })
    );
  }

  function sendPostRequestWithAccessTokenAsync<TRequestData, TResponseData>(
    options: IRequestOptionsWithData<TRequestData>
  ): Promise<AxiosResponse<TResponseData> | void> {
    return getAccessTokenSilently({ authorizationParams }).then((accessToken) =>
      sendPostRequestAsync({ ...options, accessToken })
    );
  }

  function sendPutRequestWithAccessTokenAsync<TRequestData, TResponseData>(
    options: IRequestOptionsWithData<TRequestData>
  ): Promise<AxiosResponse<TResponseData> | void> {
    return getAccessTokenSilently({ authorizationParams }).then((accessToken) =>
      sendPutRequestAsync({ ...options, accessToken })
    );
  }

  return {
    sendGetRequestAsync,
    sendGetRequestWithAccessTokenAsync,
    sendDeleteRequestAsync,
    sendDeleteRequestWithAccessTokenAsync,
    sendPostRequestAsync,
    sendPostRequestWithAccessTokenAsync,
    sendPutRequestAsync,
    sendPutRequestWithAccessTokenAsync,
  };
}
