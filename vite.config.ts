import { resolve } from "node:path";
import babel from "@rolldown/plugin-babel";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import svgr from "vite-plugin-svgr";

import { Config } from "./src/server/config";
import { AppInfo, Env, Path } from "./src/shared/constants";

const root = Path.Client;
const outDir = Path.Public;

const toCopy = ["icons/", "favicon.ico", "robots.txt"];

export default defineConfig(({ mode }) => ({
  root: resolve(root),
  resolve: { tsconfigPaths: true },
  define: {
    "import.meta.env.MODE": JSON.stringify(mode),
    "import.meta.env.PORT": JSON.stringify(Config.PORT),
  },
  server: {
    open: true,
    hmr: true,
    strictPort: true,
    proxy: {
      "/api": {
        target: `http://localhost:${Config.PORT}`,
        changeOrigin: true,
        ws: true,
      },
    },
  },
  build: {
    outDir: resolve(outDir),
    emptyOutDir: true,
    sourcemap: false,
    minify: true,
    rolldownOptions: {
      input: {
        main: resolve(root, "index.html"),
        sw: resolve(root, "sw.ts"),
      },
      output: {
        manualChunks: path => {
          if (path.includes("node_modules")) return "vendor";
          return null;
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
      autoCodeSplitting: true,
      routesDirectory: resolve(root, "routes"),
      generatedRouteTree: resolve(root, "routes", "routeTree.gen.ts"),
      routeFileIgnorePattern: "routeTree.gen.ts",
    }),
    viteReact(),
    babel({ presets: [reactCompilerPreset()] }),
    svgr({
      svgrOptions: {
        exportType: "default",
        ref: true,
      },
      include: "**/*.svg",
    }),
    {
      name: "html-transform",
      transformIndexHtml(html) {
        return html
          .replace(/__title__/g, AppInfo.title)
          .replace(/__url__/g, AppInfo.url)
          .replace(/__description__/g, AppInfo.description)
          .replace(/__author.name__/g, AppInfo.author.name)
          .replace(/__author.url__/g, AppInfo.author.url)
          .replace(/__themeColor__/g, AppInfo.themeColor);
      },
    },
    ...[
      mode === Env.Production
        ? viteStaticCopy({
            targets: toCopy.map(path => ({
              src: path,
              dest: "./",
            })),
          })
        : [],
    ],
  ],
}));
