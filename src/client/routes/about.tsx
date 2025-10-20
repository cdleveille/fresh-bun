import { createFileRoute } from "@tanstack/react-router";

import { About } from "@/client/components/About";

export const Route = createFileRoute("/about")({
  component: About,
});
