import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "react-hot-toast";

import { Header } from "@/client/components/Header";

export const Root = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Toaster />
      <TanStackRouterDevtools />
    </>
  );
};
