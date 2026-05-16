import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { lazy, Suspense } from "react";

import { Config } from "@/client/helpers/config";

const TanStackRouterDevtools = !Config.IS_PROD
  ? lazy(() =>
      import("@tanstack/router-devtools").then(m => ({
        default: m.TanStackRouterDevtools,
      })),
    )
  : () => null;

export const DevTools = () => {
  return (
    <>
      <Suspense fallback={null}>
        <TanStackRouterDevtools />
      </Suspense>
      <ReactQueryDevtools />
    </>
  );
};
