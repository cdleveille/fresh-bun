import { treaty } from "@elysiajs/eden";

import { Config } from "@/client/helpers/config";
import type { TApi, TInfer200 } from "@/shared/types";

const { origin, protocol, hostname } = window.location;

export const apiClient = {
  http: treaty<TApi>(origin).api,
  ws: treaty<TApi>(`${protocol}//${hostname}:${Config.PORT}`).api,
};

export const infer200 = <T>(data: T) => data as TInfer200<T>;

export const httpClient = {
  get: async (url: string, init: RequestInit) => request(url, { ...init, method: "GET" }),
  post: async (url: string, init: RequestInit) => request(url, { ...init, method: "POST" }),
  patch: async (url: string, init: RequestInit) => request(url, { ...init, method: "PATCH" }),
  put: async (url: string, init: RequestInit) => request(url, { ...init, method: "PUT" }),
  delete: async (url: string, init: RequestInit) => request(url, { ...init, method: "DELETE" }),
};

const request = async (url: string, { headers, body, ...init }: RequestInit) => {
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    ...init,
  });
};
