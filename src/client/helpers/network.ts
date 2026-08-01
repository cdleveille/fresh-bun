import { QueryClient } from "@tanstack/react-query";
import { hc } from "hono/client";
import { io, type Socket } from "socket.io-client";

import { Config } from "@/client/helpers/config";
import type { TClientToServerEvents, TServerToClientEvents } from "@/shared/schema";
import type { TApi } from "@/shared/types";

const httpBase = `${location.origin}/api`;

const socketBase = Config.IS_PROD ? location.origin : `http://localhost:${Config.PORT}`;

export const apiClient = { http: hc<TApi>(httpBase) };

export const socket: Socket<TServerToClientEvents, TClientToServerEvents> = io(socketBase);

export const queryClient = new QueryClient();
