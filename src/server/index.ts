import index from "@/client/index.html";
import { api } from "@/server/api";
import { Config } from "@/server/config";

const server = Bun.serve({
  port: Config.PORT,
  routes: {
    "/*": index,
    "/api/*": api.fetch,
  },
  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
