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
  Public = "public",
  Client = "src/client",
}

export enum ErrorMessage {
  _500 = "Internal Server Error",
}

export const HASH_PREFIX = "~";

export const HASH_REGEX = new RegExp(`${HASH_PREFIX}.{8}\\.[a-zA-Z0-9]+$`);

export const WS_TIMEOUT = 600; // 10 minutes
