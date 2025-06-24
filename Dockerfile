# syntax = docker/dockerfile:1

FROM oven/bun:latest AS build

WORKDIR /app

RUN apt-get update -qq && \
  apt-get install -y build-essential pkg-config python-is-python3

COPY --link bun.lock package.json ./

RUN bun install --ignore-scripts --frozen-lockfile

COPY --link . .

RUN bun run biome ci . && \
  bun run tsc && \
  bun run build && \
  chmod +x ./main

FROM gcr.io/distroless/base

COPY --from=build /app/main /app/main
COPY --from=build /app/public /app/public

WORKDIR /app

EXPOSE 3000
ENTRYPOINT ["./main"]
