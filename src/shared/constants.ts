import { author, description, license, name, version } from "package.json";

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

export enum Env {
  Production = "production",
  Development = "development",
}

export enum Path {
  Public = "dist/public",
  Client = "src/client",
}

export enum ErrorMessage {
  _500 = "Internal Server Error",
}

export const WS_TIMEOUT = 600; // 10 minutes
