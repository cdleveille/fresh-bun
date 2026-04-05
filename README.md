# <img src="https://raw.githubusercontent.com/cdleveille/fresh-bun/refs/heads/main/src/client/assets/bun.svg" alt="Bun" width="30"> fresh-bun

Single-page web app project template curated for performance, developer experience, and type safety.

## 🔧 Stack

- [Bun](https://bun.com) - server runtime, package manager
- [Hono](https://hono.dev) - web app framework
- [React](https://react.dev) - user interface
- [TanStack Router](https://tanstack.com/router) - client-side routing
- [TanStack Query](https://tanstack.com/query), [Zustand](https://zustand-demo.pmnd.rs) - state management
- [TypeScript](https://www.typescriptlang.org), [Biome](https://biomejs.dev), [Lefthook](https://lefthook.dev) - code quality/style
- [Vite](https://vite.dev) - dev server, bundler

## ✨ Features

- **100% Type-Safe API**: Full static type safety between the server and client. See [api.ts](https://github.com/cdleveille/fresh-bun/blob/main/src/server/api.ts) and [useApi.ts](https://github.com/cdleveille/fresh-bun/blob/main/src/client/hooks/useApi.ts) for simple HTTP and WebSocket examples.

- **Progressive Web App Capable**: Meets PWA requirements for an installable, native app-like experience. Scores a near-perfect [PageSpeed Insights](https://pagespeed.web.dev/analysis?url=https%3A%2F%2Ffresh-bun.fly.dev&form_factor=desktop) report out of the box.

- **Offline Support**: A [service worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) caches static assets and API responses, enabling offline functionality and faster subsequent loads with fewer requests to the server.

- **Production Ready**: Includes a multi-stage `Dockerfile` that compiles the app into a standalone binary and runs it in a minimal distroless image. Pre-configured GitHub workflows for continuous integration and deploying to [fly.io](https://fly.io) on pushes to the `main` branch.

## 🚀 Getting Started

### Setup

1. Install [Bun](https://bun.com/docs/installation)

2. Install dependencies:

```bash
bun install
```

### Development

Run server and client concurrently with hot reloading on file-save:

```bash
bun dev
```

### Production

**Option 1:** Build client and start server:

```bash
bun build:client
bun start
```

**Option 2:** Build app and run standalone binary:

```bash
bun build:app
./dist/main
```

**Option 3:** Build Docker image and run in container:

```bash
docker build -t fresh-bun .
docker run -p 3000:3000 fresh-bun
```
