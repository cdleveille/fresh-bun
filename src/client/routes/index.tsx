import { createFileRoute } from "@tanstack/react-router";

import { Home } from "@/client/components/Home";
import { helloQueryOptions } from "@/client/hooks/useApi";

export const Route = createFileRoute("/")({
  component: Home,
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(helloQueryOptions),
});
