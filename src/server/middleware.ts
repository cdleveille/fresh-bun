import { zValidator } from "@hono/zod-validator";
import type { Hono, ValidationTargets } from "hono";
import { HTTPException } from "hono/http-exception";
import type { z } from "zod";

import { staticAssets } from "@/scripts/assets.generated";
import type { TAppEnv } from "@/shared/types";

export const serveStatic = (app: Hono<TAppEnv>) => {
  app.get("/*", async c => {
    const path = c.req.path === "/" ? "/index.html" : c.req.path;
    const filePath = staticAssets[path] ?? staticAssets["/index.html"];
    if (!filePath) return c.notFound();
    return new Response(Bun.file(filePath));
  });
};

export const validate = <T extends keyof ValidationTargets, K extends z.ZodType>(
  target: T,
  schema: K,
) =>
  zValidator(target, schema, (result: { success: boolean }) => {
    if (!result.success) throw new HTTPException(400);
  });
