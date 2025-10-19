import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/client/main.css";
import { Home } from "@/client/components/Home";
import { assertGetElementById } from "@/client/helpers/browser";

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
