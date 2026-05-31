import type { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import { staticAssets } from "@/scripts/assets.generated";

export const serveStatic = (app: Hono) => {
  app.get("/*", async c => {
    const path = c.req.path === "/" ? "/index.html" : c.req.path;
    const filePath = staticAssets[path] ?? staticAssets["/index.html"];
    if (!filePath) return c.notFound();
    return new Response(Bun.file(filePath));
  });
};

export const onInvalid = (result: { success: boolean }) => {
  if (!result.success) throw new HTTPException(400);
};
