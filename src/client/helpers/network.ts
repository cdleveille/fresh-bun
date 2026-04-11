import { QueryClient } from "@tanstack/react-query";
import { hc } from "hono/client";

import { Config } from "@/client/helpers/config";
import type { TApi } from "@/shared/types";

const httpBase = `${location.origin}/api`;

const wsBase = Config.IS_PROD ? httpBase : `http://localhost:${import.meta.env.PORT}/api`;

export const apiClient = { http: hc<TApi>(httpBase), ws: hc<TApi>(wsBase).ws };

export const queryClient = new QueryClient();

export const sendWsRequest = <TResponse>(
  createWs: () => WebSocket,
  message: unknown,
): Promise<TResponse> =>
  new Promise((resolve, reject) => {
    const ws = createWs();
    ws.onopen = () => ws.send(JSON.stringify(message));
    ws.onmessage = event => {
      resolve(JSON.parse(event.data) as TResponse);
      ws.close();
    };
    ws.onerror = reject;
  });
