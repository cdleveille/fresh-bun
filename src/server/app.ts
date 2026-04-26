import { OpenAPIHono } from "@hono/zod-openapi";
import { websocket } from "hono/bun";

import { staticAssets } from "@/scripts/assets.generated";
import { api } from "@/server/api";
import { Config } from "@/server/config";

const { PORT, IS_PROD, MODE } = Config;

const app = new OpenAPIHono();

app.route("/api", api);

if (IS_PROD) {
  app.get("/*", async c => {
    const path = c.req.path === "/" ? "/index.html" : c.req.path;
    const filePath = staticAssets[path] ?? staticAssets["/index.html"];
    if (!filePath) return c.notFound();
    return new Response(Bun.file(filePath));
  });
}

Bun.serve({
  port: PORT,
  fetch: app.fetch,
  development: !IS_PROD,
  websocket,
});

console.log(`Server listening on http://localhost:${PORT} in ${MODE} mode`);
