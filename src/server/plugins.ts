import { existsSync } from "node:fs";
import { openapi } from "@elysiajs/openapi";
import { staticPlugin } from "@elysiajs/static";
import { Elysia } from "elysia";
import { helmet } from "elysia-helmet";

import { Config } from "@/server/config";
import { AppInfo, Path } from "@/shared/constants";

export const plugins = new Elysia()
  .use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          baseUri: ["'self'"],
          childSrc: ["'self'"],
          connectSrc: [
            "'self'",
            "https://cdn.jsdelivr.net/",
            "https://fonts.scalar.com/",
            `wss://${AppInfo.url.replace(/^https?:\/\//, "")}:${Config.PORT}/`,
          ],
          defaultSrc: ["'self'"],
          fontSrc: ["'self'", "https:", "data:"],
          formAction: ["'self'"],
          frameAncestors: ["'self'"],
          imgSrc: ["'self'", "data:"],
          manifestSrc: ["'self'"],
          mediaSrc: ["'self'"],
          objectSrc: ["'none'"],
          scriptSrc: ["'self'"],
          scriptSrcAttr: ["'none'"],
          scriptSrcElem: [
            "'self'",
            "'sha256-TcUB1mzXiQO4GxpTRZ0EMpOXKMU3u+n/q1WrgVIcs1I='",
            "https://cdn.jsdelivr.net/npm/@scalar/",
          ],
          styleSrc: ["'self'"],
          styleSrcAttr: ["'self'", "'unsafe-inline'"],
          styleSrcElem: ["'self'", "'unsafe-inline'"],
          upgradeInsecureRequests: [],
          workerSrc: ["'self'"],
        },
      },
    }),
  )
  .use(
    openapi({
      path: "/api",
      exclude: { tags: ["no-doc"] },
      documentation: {
        info: {
          title: AppInfo.title,
          version: AppInfo.version,
          description: AppInfo.description,
          contact: AppInfo.author,
          license: { name: AppInfo.license },
        },
      },
    }),
  );

if (existsSync(Path.Public)) {
  const serveStatic = new Elysia({ tags: ["no-doc"] })
    .use(
      staticPlugin({
        prefix: "/",
        assets: Path.Public,
        noCache: true,
        indexHTML: true,
        alwaysStatic: true,
      }),
    )
    // SPA index.html fallback to enable client-side routing
    .get("*", ({ path, status }) => {
      const url = path.split("/").pop();
      if (url && !url.includes(".")) return Bun.file(`${Path.Public}/index.html`);
      return status(404);
    });
  plugins.use(serveStatic);
}
