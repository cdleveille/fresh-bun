import { QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { createRoot } from "react-dom/client";

import { AppProvider } from "@/client/components/AppProvider";
import { assertGetElementById, registerServiceWorker } from "@/client/helpers/browser";
import { queryClient } from "@/client/helpers/network";
import { routeTree } from "@/client/routes/routeTree.gen";

window.addEventListener("load", () => {
  registerServiceWorker().catch(error => {
    console.error("Service worker registration failed:", error);
  });
});

const router = createRouter({
  routeTree,
  context: { queryClient },
});

const root = assertGetElementById("root");
createRoot(root).render(
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </QueryClientProvider>,
);

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
