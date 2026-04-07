import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { upgradeWebSocket } from "hono/bun";

import { messageOptionalSchema, messageSchema, parseSchema } from "@/server/schema";

const responseSchema = z.object({ message: z.string() });

const wsApi = new OpenAPIHono().get(
  "/hello",
  upgradeWebSocket(() => ({
    onMessage(event, ws) {
      const { message } = parseSchema(messageSchema, event.data);
      console.log(`WS /ws/hello "${message}"`);
      ws.send(JSON.stringify({ message: "hello from bun!" }));
    },
  })),
);

const getHelloRoute = createRoute({
  method: "get",
  path: "/hello",
  request: {
    query: messageOptionalSchema,
  },
  responses: {
    200: {
      content: { "application/json": { schema: responseSchema } },
      description: "Returns a hello message",
    },
  },
});

const postHelloRoute = createRoute({
  method: "post",
  path: "/hello",
  request: {
    body: { content: { "application/json": { schema: messageSchema } }, required: true },
  },
  responses: {
    200: {
      content: { "application/json": { schema: responseSchema } },
      description: "Echoes back a hello message",
    },
  },
});

export const api = new OpenAPIHono()
  .route("/ws", wsApi)
  .openapi(getHelloRoute, c => {
    const { message } = c.req.valid("query");
    console.log(`GET /api/hello${message ? ` "${message}"` : ""}`);
    return c.json({ message: "hello from bun!" });
  })
  .openapi(postHelloRoute, c => {
    const { message } = c.req.valid("json");
    console.log(`POST /api/hello "${message}"`);
    return c.json({ message: "hello from bun!" });
  });

api.doc("/openapi.json", {
  openapi: "3.0.0",
  info: { title: "fresh-bun API", version: "1.0.0" },
});
