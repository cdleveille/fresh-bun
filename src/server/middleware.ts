import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";

import { staticAssets } from "@/scripts/assets.generated";

export const serveStatic = (app: OpenAPIHono) => {
  app.get("/*", async c => {
    const path = c.req.path === "/" ? "/index.html" : c.req.path;
    const filePath = staticAssets[path] ?? staticAssets["/index.html"];
    if (!filePath) return c.notFound();
    return new Response(Bun.file(filePath));
  });
};

export const docs = new OpenAPIHono()
  .doc("/openapi.json", {
    openapi: "3.0.0",
    info: { title: "fresh-bun", version: "0.1.0" },
    servers: [{ url: "/api" }],
  })
  .get(
    "/docs",
    Scalar({
      url: "/api/openapi.json",
      theme: "kepler",
      darkMode: true,
      customCss: "html,body{background:#000212}",
    }),
  );
