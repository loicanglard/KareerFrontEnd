import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "./screens/Analytics/Analytics";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Analytics />
  </StrictMode>,
);
