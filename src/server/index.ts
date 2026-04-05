import { Hono } from "hono";
import { serveStatic, websocket } from "hono/bun";

import { api } from "@/server/api";
import { Config } from "@/server/config";
import { Path } from "@/shared/constants";

const app = new Hono();

app.route("/api", api);

app.get("/*", serveStatic({ root: Path.Public }));

Bun.serve({
  port: Config.PORT,
  fetch: app.fetch,
  websocket,
});

console.log(`Server listening on http://localhost:${Config.PORT}`);
