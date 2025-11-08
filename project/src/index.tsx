import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";       // ← import nommé (corrigé)
import "./index.css";

let rootEl = document.getElementById("app");
if (!rootEl) {
  rootEl = document.createElement("div");
  rootEl.id = "app";
  document.body.appendChild(rootEl);
}

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>
);

window.addEventListener("error", (e) => {
  console.error("Runtime error:", e.error || e.message);
});
