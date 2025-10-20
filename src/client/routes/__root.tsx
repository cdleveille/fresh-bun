import { createRootRoute } from "@tanstack/react-router";

import { ErrorBoundary, NotFound } from "@/client/components/Error";
import { Root } from "@/client/components/Root";

export const Route = createRootRoute({
  component: Root,
  errorComponent: ErrorBoundary,
  notFoundComponent: NotFound,
});
