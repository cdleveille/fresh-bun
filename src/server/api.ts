import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import { onInvalid } from "@/server/middleware";
import { io } from "@/server/socket";
import { messageOptionalSchema, messageSchema } from "@/shared/schema";

export const api = new Hono()
  .get("/hello", zValidator("query", messageOptionalSchema, onInvalid), c => {
    const { message } = c.req.valid("query");
    console.log(`GET /api/hello${message ? ` "${message}"` : ""}`);
    return c.json({ message: "hello from bun!" });
  })
  .post("/hello", zValidator("json", messageSchema, onInvalid), c => {
    const { message } = c.req.valid("json");
    console.log(`POST /api/hello "${message}"`);
    return c.json({ message: "hello from bun!" });
  });

io.on("connection", socket => {
  socket.on("hello", (data, callback) => {
    const { message } = data;
    console.log(`WS /socket.io "hello" "${message}"`);
    callback({ message: "hello from bun!" });
  });
});
