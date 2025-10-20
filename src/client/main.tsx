import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/client/main.css";
import { AppProvider } from "@/client/components/AppProvider";
import { assertGetElementById, registerServiceWorker } from "@/client/helpers/browser";
import { Config } from "@/client/helpers/config";

import { routeTree } from "@/client/routes/routeTree.gen";

console.log("IS_PROD:", Config.IS_PROD);

window.addEventListener("load", () => {
  registerServiceWorker().catch(error => {
    console.error("Service worker registration failed:", error);
  });
});

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: { queryClient },
});

const elem = assertGetElementById("root");
const app = (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </QueryClientProvider>
  </StrictMode>
);

if (import.meta.hot) {
  const root = import.meta.hot.data.root ?? createRoot(elem);
  root.render(app);
} else {
  createRoot(elem).render(app);
}

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
  interface RouterContext {
    queryClient: QueryClient;
  }
}
