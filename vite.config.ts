import { resolve } from "node:path";
import reactCompiler from "@acusti/vite-plugin-react-compiler";
import svgReact from "@acusti/vite-plugin-svg-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

import { Config } from "./src/server/config.ts";
import { AppInfo, Path } from "./src/shared/constants.ts";

const root = Path.Client;
const outDir = Path.Public;

const toCopy = ["icons/", "favicon.ico", "robots.txt", "llms.txt"];

export default defineConfig(({ mode }) => ({
  root: resolve(root),
  resolve: { tsconfigPaths: true },
  define: {
    "import.meta.env.PORT": JSON.stringify(Config.PORT),
  },
  server: {
    open: true,
    proxy: {
      "^/api/": {
        target: `http://localhost:${Config.PORT}`,
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: resolve(outDir),
    emptyOutDir: true,
    modulePreload: false,
    rolldownOptions: {
      input: {
        main: resolve(root, "index.html"),
        sw: resolve(root, "sw.ts"),
      },
      output: {
        manualChunks: path => {
          if (!path.includes("node_modules")) return null;
          // Handle scoped packages (@scope/name) so each package gets its own chunk.
          const afterNodeModules = path.split("node_modules/").pop() ?? "";
          const [scopeOrName = "", maybeName] = afterNodeModules.split("/");
          const pkgName = scopeOrName.startsWith("@") ? `${scopeOrName}/${maybeName}` : scopeOrName;
          return `vendor/${pkgName}`;
        },
        chunkFileNames: "assets/[name]~[hash].js",
        entryFileNames: entry => {
          if (entry.name === "sw") return "sw.js";
          return "assets/[name]~[hash].js";
        },
        assetFileNames: asset => {
          if (asset.names.includes("manifest.json")) return "manifest.json";
          return "assets/[name]~[hash][extname]";
        },
      },
    },
  },
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: false,
      routesDirectory: resolve(root, "routes"),
      generatedRouteTree: resolve(root, "routes", "routeTree.gen.ts"),
      routeFileIgnorePattern: "routeTree.gen.ts",
    }),
    viteReact(),
    reactCompiler(),
    svgReact(),
    {
      name: "html-transform",
      transformIndexHtml(html) {
        return html
          .replace(/__title__/g, AppInfo.title)
          .replace(/__url__/g, AppInfo.url)
          .replace(/__description__/g, AppInfo.description)
          .replace(/__author.name__/g, AppInfo.author.name)
          .replace(/__author.url__/g, AppInfo.author.url)
          .replace(/__theme.dark__/g, AppInfo.theme.dark)
          .replace(/__theme.light__/g, AppInfo.theme.light);
      },
    },
    mode === "production" &&
      viteStaticCopy({
        targets: toCopy.map(path => ({
          src: path,
          dest: "./",
        })),
      }),
  ],
}));
