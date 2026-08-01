import { QueryClient } from "@tanstack/react-query";
import { hc } from "hono/client";
import { io } from "socket.io-client";

import { Config } from "@/client/helpers/config";
import type { TApi } from "@/shared/types";

const httpBase = `${location.origin}/api`;

const socketBase = Config.IS_PROD ? location.origin : `http://localhost:${Config.PORT}`;

export const apiClient = { http: hc<TApi>(httpBase) };

export const socket = io(socketBase);

export const queryClient = new QueryClient();

export const sendSocketRequest = <TResponse>(event: string, message: unknown): Promise<TResponse> =>
  new Promise(resolve => socket.emit(event, message, (res: TResponse) => resolve(res)));
