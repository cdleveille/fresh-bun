import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { upgradeWebSocket } from "hono/bun";
import { z } from "zod";

const wsMessageSchema = z.object({ message: z.string() });

const wsApi = new Hono().get(
  "/hello",
  upgradeWebSocket(() => ({
    onMessage(event, ws) {
      const { message } = wsMessageSchema.parse(JSON.parse(event.data as string));
      console.log(`WS /ws/hello "${message}"`);
      ws.send(JSON.stringify({ message: "hello from bun!" }));
    },
  })),
);

export const api = new Hono()
  .route("/ws", wsApi)
  .get(
    "/hello",
    zValidator(
      "query",
      z.object({
        message: z.string().optional(),
      }),
    ),
    c => {
      const { message } = c.req.valid("query");
      console.log(`GET /api/hello${message ? ` "${message}"` : ""}`);
      return c.json({ message: "hello from bun!" });
    },
  )
  .post(
    "/hello",
    zValidator(
      "json",
      z.object({
        message: z.string(),
      }),
    ),
    c => {
      const { message } = c.req.valid("json");
      console.log(`POST /api/hello "${message}"`);
      return c.json({ message: "hello from bun!" });
    },
  );
