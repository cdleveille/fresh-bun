import { existsSync } from "node:fs";
import { staticPlugin } from "@elysiajs/static";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { helmet } from "elysia-helmet";

import { AppInfo, Path } from "@/shared/constants";

export const plugins = new Elysia()
  .use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          baseUri: ["'self'"],
          childSrc: ["'self'"],
          connectSrc: ["'self'", "https://cdn.jsdelivr.net/"],
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
    swagger({
      path: "/api/reference",
      documentation: {
        info: {
          title: AppInfo.name,
          version: AppInfo.version,
          description: AppInfo.description,
          contact: AppInfo.author,
          license: { name: AppInfo.license },
        },
      },
    }),
  );

if (existsSync(Path.Public)) {
  const serveStatic = new Elysia()
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
    .get("*", ({ path }) => {
      const url = path.split("/").pop();
      if (url && !url.includes(".")) return Bun.file(`${Path.Public}/index.html`);
    });
  plugins.use(serveStatic);
}
