import { existsSync } from "node:fs";
import { openapi } from "@elysiajs/openapi";
import { staticPlugin } from "@elysiajs/static";
import { Elysia } from "elysia";

import { AppInfo, Path } from "@/shared/constants";

export const plugins = new Elysia().use(
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
