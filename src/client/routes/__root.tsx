import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";

import { ErrorBoundary, NotFound } from "@/client/components/Error";
import { Root } from "@/client/components/Root";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: Root,
  errorComponent: ErrorBoundary,
  notFoundComponent: NotFound,
});
