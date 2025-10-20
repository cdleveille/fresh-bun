import { Link } from "@tanstack/react-router";

import { AppInfo } from "@/shared/constants";

const { url, name } = AppInfo.author;

export const About = () => {
  return (
    <main>
      <h1>fresh-bun</h1>
      <p>
        Single-page web app project template curated for performance, developer experience, and type
        safety. Bun & Elysia backend, React & TanStack Router/Query frontend.
      </p>
      <p>
        Created by <Link to={url}>{name}</Link>
      </p>
    </main>
  );
};
