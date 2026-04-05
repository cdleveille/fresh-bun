import { createFileRoute } from "@tanstack/react-router";

import { Home } from "@/client/components/Home";
import { apiClient } from "@/client/helpers/network";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => {
    const res = await apiClient.http.hello.$get({ query: {} });
    const data = await res.json();
    return data;
  },
});
