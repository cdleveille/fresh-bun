import { Server as Engine } from "@socket.io/bun-engine";
import { Server } from "socket.io";

import { Config } from "@/server/config";
import { messageSchema } from "@/server/schema";
import type { TMessageRes } from "@/shared/types";

export const io = new Server();

export const engine = new Engine({ cors: Config.IS_PROD ? undefined : { origin: true } });

io.bind(engine);

io.on("connection", socket => {
  socket.on("hello", (data: unknown, callback: (res: TMessageRes) => void) => {
    const { message } = messageSchema.parse(data);
    console.log(`WS /socket.io "hello" "${message}"`);
    callback({ message: "hello from bun!" });
  });
});
