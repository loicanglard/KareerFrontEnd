import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CoachDashboard } from "./screens/CoachDashboard";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <CoachDashboard />
  </StrictMode>,
);
