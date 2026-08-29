import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "react-hot-toast";

import { Header } from "@/client/components/Header";

export const Root = () => {
  return (
    <>
      <Header />
      <Outlet />
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
      <Toaster
        toastOptions={{
          position: "bottom-center",
          style: {
            background: "var(--bg-raised)",
            color: "var(--text)",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-md)",
          },
        }}
      />
    </>
  );
};
