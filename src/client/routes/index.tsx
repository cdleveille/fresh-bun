import { createFileRoute } from "@tanstack/react-router";

import { Home } from "@/client/components/Home";
import { queryClient } from "@/client/helpers/network";
import { getHello } from "@/client/hooks/useApi";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => queryClient.ensureQueryData(getHello),
});
