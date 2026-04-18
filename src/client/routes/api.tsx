import { createFileRoute } from "@tanstack/react-router";

import { Api } from "@/client/components/Api";

export const Route = createFileRoute("/api")({
  component: Api,
});
