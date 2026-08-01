import { Hono } from "hono";

import { api } from "@/server/api";
import { Config } from "@/server/config";
import { serveStatic } from "@/server/middleware";
import { ws } from "@/server/socket";
import type { TAppEnv } from "@/shared/types";

const { PORT, IS_PROD, MODE } = Config;

const app = new Hono<TAppEnv>();

app.route("/api", api);

app.all("/socket.io/*", c => ws.handleRequest(c.req.raw, c.env));

if (IS_PROD) serveStatic(app);

Bun.serve({
  port: PORT,
  development: !IS_PROD,
  ...ws.handler(),
  fetch: app.fetch,
});

console.log(`Server listening on http://localhost:${PORT} in ${MODE} mode`);

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));
