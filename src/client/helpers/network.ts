import { treaty } from "@elysiajs/eden";
import { QueryClient } from "@tanstack/react-query";

import { Config } from "@/client/helpers/config";
import type { TApi } from "@/shared/types";

const { origin, protocol, hostname } = window.location;

export const apiClient = {
  http: treaty<TApi>(origin).api,
  ws: treaty<TApi>(`${protocol}//${hostname}:${Config.PORT}`).api,
};

export const queryClient = new QueryClient();
