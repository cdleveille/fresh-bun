import { treaty } from "@elysiajs/eden";
import { QueryClient } from "@tanstack/react-query";

import { Config } from "@/client/helpers/config";
import type { TApi, TInfer200 } from "@/shared/types";

const { origin, protocol, hostname } = window.location;

export const apiClient = {
  http: treaty<TApi>(origin).api,
  ws: treaty<TApi>(`${protocol}//${hostname}:${Config.PORT}`).api,
};

export const queryClient = new QueryClient();

export const infer200 = <T>(data: T) => data as TInfer200<T>;
