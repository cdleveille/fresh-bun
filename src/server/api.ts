import { Elysia } from "elysia";

import { apiSchema } from "@/shared/schema";

export const api = new Elysia({ prefix: "/api" })
  .get(
    "/hello",
    c => {
      const { message } = c.query;
      console.log(`GET /api/hello${message ? ` "${message}"` : ""}`);
      return { message: "hello from bun!" };
    },
    apiSchema.hello.get,
  )
  .post(
    "/hello",
    c => {
      const { message } = c.body;
      console.log(`POST /api/hello "${message}"`);
      return { message: "hello from bun!" };
    },
    apiSchema.hello.post,
  )
  .ws("/hello", {
    message(ws, { message }) {
      console.log(`WS /api/hello "${message}"`);
      ws.send({ message: "hello from bun!" });
    },
    idleTimeout: 600,
    ...apiSchema.hello.ws,
  });
