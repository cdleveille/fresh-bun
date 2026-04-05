import { Outlet } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";

import { Header } from "@/client/components/Header";

export const Root = () => {
  return (
    <>
      <Header />
      <Outlet />
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
