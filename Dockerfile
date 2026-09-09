# syntax = docker/dockerfile:1

FROM oven/bun:1-slim AS build

WORKDIR /app

RUN apt-get update -qq && \
  apt-get install -y --no-install-recommends build-essential pkg-config python-is-python3 && \
  rm -rf /var/lib/apt/lists/*

COPY --link bun.lock package.json ./

RUN --mount=type=cache,target=/root/.bun/install/cache \
  bun install --ignore-scripts --frozen-lockfile

COPY --link . .

RUN bun build:app && \
  chmod +x ./dist/app

FROM gcr.io/distroless/base-debian12:nonroot

COPY --from=build --chown=nonroot:nonroot /app/dist /app/dist

WORKDIR /app

EXPOSE 3000
ENTRYPOINT ["./dist/app"]
