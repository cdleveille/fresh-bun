import { Outlet } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";

import { Header } from "@/client/components/Header";

export const Root = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Toaster />
    </>
  );
};
