import { author, description, license, name, version } from "../../package.json" with {
  type: "json",
};

export const AppInfo = {
  title: name,
  version,
  description,
  author: {
    name: author,
    url: "https://cdleveille.net",
  },
  license,
  url: "https://fresh-bun.fly.dev",
  theme: {
    dark: "#000212",
    light: "#f2e8d5",
  },
};

export enum Path {
  Public = "dist/public",
  Client = "src/client",
  Assets = "src/scripts/assets.generated.ts",
}
