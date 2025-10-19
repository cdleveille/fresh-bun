import { author, description, license, version } from "package.json";

export const AppInfo = {
  name: "hello from bun!",
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

export const HASH_REGEX = /-.{8}\.[a-zA-Z0-9]+$/;
