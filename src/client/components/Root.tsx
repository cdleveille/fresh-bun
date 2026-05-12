import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";

import { Header } from "@/client/components/Header";
import { Config } from "@/client/helpers/config";

const TanStackRouterDevtools = !Config.IS_PROD
  ? lazy(() =>
      import("@tanstack/router-devtools").then(m => ({
        default: m.TanStackRouterDevtools,
      })),
    )
  : () => null;

export const Root = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Suspense fallback={null}>
        <TanStackRouterDevtools />
      </Suspense>
      <ReactQueryDevtools />
      <Toaster
        toastOptions={{
          style: {
            background: "#13151d",
            color: "#e2ddd5",
            border: "1px solid rgba(255, 255, 255, 0.07)",
            borderRadius: "0.625rem",
            fontSize: "0.9375rem",
            fontFamily:
              'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          },
        }}
      />
    </>
  );
};
