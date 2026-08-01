import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

import { onInvalid } from "@/server/middleware";

export const api = new Hono()
  .get(
    "/hello",
    zValidator("query", z.object({ message: z.string().optional() }), onInvalid),
    c => {
      const { message } = c.req.valid("query");
      console.log(`GET /api/hello${message ? ` "${message}"` : ""}`);
      return c.json({ message: "hello from bun!" });
    },
  )
  .post("/hello", zValidator("json", z.object({ message: z.string() }), onInvalid), c => {
    const { message } = c.req.valid("json");
    console.log(`POST /api/hello "${message}"`);
    return c.json({ message: "hello from bun!" });
  });
