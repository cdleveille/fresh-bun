import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api")({
  component: () => (
    <iframe
      src="/api/docs"
      title="Swagger UI"
      style={{
        width: "100%",
        height: "calc(100vh - 3.25rem)",
        border: "none",
        display: "block",
      }}
    />
  ),
});
