import { Hono } from "hono";
import { websocket } from "hono/bun";

import { staticAssets } from "@/scripts/assets.generated";
import { api } from "@/server/api";
import { Config } from "@/server/config";
import { Env } from "@/shared/constants";

const app = new Hono();

app.route("/api", api);

if (process.env.NODE_ENV === Env.Production) {
  app.get("/*", async c => {
    const path = c.req.path === "/" ? "/index.html" : c.req.path;
    const filePath = staticAssets[path] ?? staticAssets["/index.html"];
    if (!filePath) return c.notFound();
    return new Response(Bun.file(filePath));
  });
}

Bun.serve({
  port: Config.PORT,
  fetch: app.fetch,
  websocket,
});

console.log(`Server listening on http://localhost:${Config.PORT}`);
