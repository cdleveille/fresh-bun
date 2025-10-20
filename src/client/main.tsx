import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/client/main.css";
import { Home } from "@/client/components/Home";
import { assertGetElementById, registerServiceWorker } from "@/client/helpers/browser";
import { Config } from "@/client/helpers/config";

console.log("IS_PROD:", Config.IS_PROD);

window.addEventListener("load", () => {
  registerServiceWorker().catch(error => {
    console.error("Service worker registration failed:", error);
  });
});

const elem = assertGetElementById("root");
const app = (
  <StrictMode>
    <Home />
  </StrictMode>
);

if (import.meta.hot) {
  const root = import.meta.hot.data.root ?? createRoot(elem);
  root.render(app);
} else {
  createRoot(elem).render(app);
}
