import { author, description, license, name, version } from "../../package.json";

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
  themeColor: "#14151a",
};

export enum Path {
  Public = "dist/public",
  Client = "src/client",
  Assets = "src/scripts/assets.generated.ts",
}
