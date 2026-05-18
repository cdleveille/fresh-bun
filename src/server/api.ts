import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { upgradeWebSocket } from "hono/bun";

import { docs } from "@/server/middleware";
import { messageOptionalSchema, messageSchema, parseSchema } from "@/server/schema";

export const api = new OpenAPIHono()
  .openapi(
    createRoute({
      method: "get",
      path: "/hello",
      request: {
        query: messageOptionalSchema,
      },
      responses: {
        200: {
          content: { "application/json": { schema: messageSchema } },
          description: "Sends a hello message.",
        },
      },
    }),
    c => {
      const { message } = c.req.valid("query");
      console.log(`GET /api/hello${message ? ` "${message}"` : ""}`);
      return c.json({ message: "hello from bun!" });
    },
  )
  .openapi(
    createRoute({
      method: "post",
      path: "/hello",
      request: {
        body: { content: { "application/json": { schema: messageSchema } }, required: true },
      },
      responses: {
        200: {
          content: { "application/json": { schema: messageSchema } },
          description: "Sends a hello message.",
        },
      },
    }),
    c => {
      const { message } = c.req.valid("json");
      console.log(`POST /api/hello "${message}"`);
      return c.json({ message: "hello from bun!" });
    },
  )
  .route(
    "/ws",
    new OpenAPIHono().get(
      "/hello",
      upgradeWebSocket(() => ({
        onMessage(event, ws) {
          const { message } = parseSchema(messageSchema, event.data);
          console.log(`WS /ws/hello "${message}"`);
          ws.send(JSON.stringify({ message: "hello from bun!" }));
        },
      })),
    ),
  )
  .route("/", docs);
