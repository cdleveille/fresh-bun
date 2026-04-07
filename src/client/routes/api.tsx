import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api")({
  component: () => (
    <div className="scalar-wrapper">
      <iframe
        src="/api/docs"
        title="Swagger UI"
        style={{ width: "100%", height: "100%", border: "none", display: "block" }}
      />
    </div>
  ),
});
