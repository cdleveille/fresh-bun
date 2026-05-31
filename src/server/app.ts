import { Hono } from "hono";
import { websocket } from "hono/bun";

import { api } from "@/server/api";
import { Config } from "@/server/config";
import { serveStatic } from "@/server/middleware";

const { PORT, IS_PROD, MODE } = Config;

const app = new Hono();

app.route("/api", api);

if (IS_PROD) serveStatic(app);

Bun.serve({
  port: PORT,
  fetch: app.fetch,
  development: !IS_PROD,
  websocket,
});

console.log(`Server listening on http://localhost:${PORT} in ${MODE} mode`);

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));
