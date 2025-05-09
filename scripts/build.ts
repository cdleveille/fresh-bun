import { $ } from "bun";
import { copyPlugin } from "bun-copy-plugin";

import { Env, Path } from "@constants";
import { Config, log, now, parseArg } from "@helpers";

const start = now();

const isProd = Config.IS_PROD || parseArg("ENV") === Env.Production;

const src = Path.ClientSrc;
const outdir = Path.Public;

const toCopy = ["icons/", "favicon.ico", "manifest.json"];

await $`rm -rf ${outdir}`;

await Bun.build({
	entrypoints: [`${src}/index.html`, `${src}/sw.ts`],
	outdir,
	define: {
		"import.meta.env.VITE_ENV": `"${isProd}"`,
		"import.meta.env.VITE_PORT": `"${Config.PORT}"`
	},
	sourcemap: isProd ? "none" : "linked",
	naming: {
		entry: "[dir]/[name].[ext]",
		asset: "[dir]/[name]~[hash].[ext]",
		chunk: "[dir]/chunk~[hash].[ext]"
	},
	plugins: toCopy.map(path => copyPlugin(`${src}/${path}`, `${outdir}/${path}`)),
	minify: isProd
});

const buildMode = isProd ? Env.Production : Env.Development;
const buildTime = (now() - start).toFixed(2);

log.info(`Build completed in ${buildMode} mode in ${buildTime}ms`);

process.exit(0);
