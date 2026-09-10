import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { zValidator } from "@hono/zod-validator";
import type { Hono, ValidationTargets } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { secureHeaders } from "hono/secure-headers";
import type { z } from "zod";

import { staticAssets } from "@/scripts/assets.gen";
import { Config } from "@/server/config";
import { AppInfo } from "@/shared/constants";
import type { TAppEnv } from "@/shared/types";

// Hashes let CSP allow the built index.html's inline <script> tags without 'unsafe-inline'.
// Computed from the actual built file so edits to those scripts never go stale or need updating here.
const getInlineScriptHashes = () => {
  const indexHtmlPath = staticAssets["/index.html"];
  if (!indexHtmlPath) return [];
  const html = readFileSync(indexHtmlPath, "utf8");
  const hashes: string[] = [];
  for (const [, script] of html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)) {
    hashes.push(
      `'sha256-${createHash("sha256")
        .update(script ?? "")
        .digest("base64")}'`,
    );
  }
  return hashes;
};

const inlineScriptHashes = Config.IS_PROD ? getInlineScriptHashes() : [];

// Only applied to static assets, so it never touches /api or /socket.io responses.
const secureHeadersMiddleware = secureHeaders({
  contentSecurityPolicy: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", ...inlineScriptHashes],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:"],
    fontSrc: ["'self'"],
    connectSrc: ["'self'"],
    workerSrc: ["'self'"],
    manifestSrc: ["'self'"],
    objectSrc: ["'none'"],
    baseUri: ["'self'"],
    formAction: ["'self'"],
    frameAncestors: ["'self'"],
  },
});

// Only applied to /api routes, so it never touches /socket.io (which has its own cors config).
export const corsMiddleware = cors({ origin: AppInfo.url });

export const serveStatic = (app: Hono<TAppEnv>) => {
  app.get("/*", secureHeadersMiddleware, async c => {
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
