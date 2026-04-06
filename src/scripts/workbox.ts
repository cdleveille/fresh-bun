import { injectManifest } from "workbox-build";

import { Path } from "@/shared/constants";

const outDir = Path.Public;

console.log("workbox: injecting build manifest into sw.js...");

const { count } = await injectManifest({
  globDirectory: outDir,
  globPatterns: ["**/*.*"],
  swSrc: `${outDir}/sw.js`,
  swDest: `${outDir}/sw.js`,
  maximumFileSizeToCacheInBytes: 5000000,
});

console.log(`workbox: ${count} URLs were injected into service worker for precaching ✅`);
