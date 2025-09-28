import { Elysia } from "elysia";

import { WS_TIMEOUT } from "@/shared/constants";
import { schema } from "@/shared/schema";

export const api = new Elysia({ prefix: "/api" })
  .get(
    "/hello",
    c => {
      const { message } = c.query;
      console.log(`GET /api/hello${message ? ` "${message}"` : ""}`);
      return { message: "GET: hello from bun!" };
    },
    schema.api.hello.get,
  )
  .post(
    "/hello",
    c => {
      const { message } = c.body;
      console.log(`POST /api/hello "${message}"`);
      return { message: "POST: hello from bun!" };
    },
    schema.api.hello.post,
  )
  .ws("/hello", {
    message(ws, { message }) {
      console.log(`WS /api/hello "${message}"`);
      ws.send({ message: "WS: hello from bun!" });
    },
    idleTimeout: WS_TIMEOUT,
    ...schema.api.hello.ws,
  });
