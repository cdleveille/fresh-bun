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

const server = Bun.serve({
  port: PORT,
  development: !IS_PROD,
  ...ws.handler(),
  fetch: app.fetch,
  error(error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  },
});

console.log(`Server listening on ${server.url} in ${MODE} mode`);

const shutdown = () => server.stop().then(() => process.exit(0));
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
