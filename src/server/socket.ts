import { Server as Engine } from "@socket.io/bun-engine";
import { Server } from "socket.io";

import { Config } from "@/server/config";
import type { TClientToServerEvents, TServerToClientEvents } from "@/shared/schema";

export const ws = new Engine({ cors: Config.IS_PROD ? undefined : { origin: true } });

ws.on("connection_error", ({ code, message, context }) => {
  console.error(`WS connection_error [${code}] ${message}`, context);
});

export const io = new Server<TClientToServerEvents, TServerToClientEvents>().bind(ws);
