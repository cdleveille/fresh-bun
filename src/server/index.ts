import index from "@/client/index.html";
import { api } from "@/server/api";
import { Config } from "@/server/config";

const server = Bun.serve({
  port: Config.PORT,
  routes: {
    "/*": index,
    "/api/*": api.fetch,
    "/manifest.json": Bun.file("src/client/manifest.json"),
    "/robots.txt": Bun.file("src/client/robots.txt"),
    "/sw.js": Bun.file("src/client/sw.js"),
  },
  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
  },
});

console.log(`Server listening on ${server.url}`);
