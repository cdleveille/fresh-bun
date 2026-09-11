import { QueryClient } from "@tanstack/react-query";
import { hc } from "hono/client";
import { io, type Socket } from "socket.io-client";

import { Config } from "@/client/helpers/config";
import type { TClientToServerEvents, TServerToClientEvents } from "@/shared/schema";
import type { TApi } from "@/shared/types";

export const queryClient = new QueryClient();

export const apiClient = { http: hc<TApi>(`${location.origin}/api`) };

export const socket: Socket<TServerToClientEvents, TClientToServerEvents> = io(
  Config.IS_PROD ? location.origin : `http://localhost:${Config.PORT}`,
);

socket.on("connect_error", error => console.error("WS connect_error", error));
