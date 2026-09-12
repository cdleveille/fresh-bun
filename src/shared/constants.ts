import pkg from "../../package.json" with { type: "json" };

export const AppInfo = {
  title: pkg.name,
  version: pkg.version,
  description: pkg.description,
  author: {
    name: pkg.author,
    url: "https://cdleveille.net",
  },
  license: pkg.license,
  url: "https://fresh-bun.fly.dev",
  theme: {
    dark: "#000212",
    light: "#f2e8d5",
  },
};

export enum Path {
  Public = "dist/public",
  Client = "src/client",
  Assets = "src/scripts/assets.gen.ts",
}
