import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { upgradeWebSocket } from "hono/bun";

import { messageOptionalSchema, messageSchema, parseSchema } from "@/server/schema";

const wsApi = new Hono().get(
  "/hello",
  upgradeWebSocket(() => ({
    onMessage(event, ws) {
      const { message } = parseSchema(messageSchema, event.data);
      console.log(`WS /ws/hello "${message}"`);
      ws.send(JSON.stringify({ message: "hello from bun!" }));
    },
  })),
);

export const api = new Hono()
  .route("/ws", wsApi)
  .get("/hello", zValidator("query", messageOptionalSchema), c => {
    const { message } = c.req.valid("query");
    console.log(`GET /api/hello${message ? ` "${message}"` : ""}`);
    return c.json({ message: "hello from bun!" });
  })
  .post("/hello", zValidator("json", messageSchema), c => {
    const { message } = c.req.valid("json");
    console.log(`POST /api/hello "${message}"`);
    return c.json({ message: "hello from bun!" });
  });
