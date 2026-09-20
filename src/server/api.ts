import { Hono } from "hono";

import { corsMiddleware, validate } from "@/server/middleware";
import { io } from "@/server/socket";
import { messageOptionalSchema, messageSchema } from "@/shared/schema";

export const api = new Hono()
  .use(corsMiddleware)
  .get("/hello", validate("query", messageOptionalSchema), c => {
    const { message } = c.req.valid("query");
    console.log(`GET /api/hello${message ? ` "${message}"` : ""}`);
    return c.json({ message: "hello from bun!" });
  })
  .post("/hello", validate("json", messageSchema), c => {
    const { message } = c.req.valid("json");
    console.log(`POST /api/hello "${message}"`);
    return c.json({ message: "hello from bun!" });
  })
  .all("*", c => c.json({ error: "Not Found" }, 404));

io.on("connection", socket => {
  socket.on("hello", (data, callback) => {
    const { message } = data;
    console.log(`WS /socket.io "hello" "${message}"`);
    callback({ message: "hello from bun!" });
  });
});
