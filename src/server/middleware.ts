import type { OpenAPIHono } from "@hono/zod-openapi";

import { staticAssets } from "@/scripts/assets.generated";

export const serveStatic = (app: OpenAPIHono) => {
  app.get("/*", async c => {
    const path = c.req.path === "/" ? "/index.html" : c.req.path;
    const filePath = staticAssets[path] ?? staticAssets["/index.html"];
    if (!filePath) return c.notFound();
    return new Response(Bun.file(filePath));
  });
};
