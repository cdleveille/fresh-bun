import { Server as Engine } from "@socket.io/bun-engine";
import { Server } from "socket.io";

import { Config } from "@/server/config";
import type { TClientToServerEvents, TServerToClientEvents } from "@/shared/schema";

export const io = new Server<TClientToServerEvents, TServerToClientEvents>();

export const ws = new Engine({ cors: Config.IS_PROD ? undefined : { origin: true } });

io.bind(ws);

io.on("connection", socket => {
  socket.on("hello", (data, callback) => {
    const { message } = data;
    console.log(`WS /socket.io "hello" "${message}"`);
    callback({ message: "hello from bun!" });
  });
});
