import React from "react";
import { DashboardSection } from "./sections/DashboardSection";
import { NavigationSection } from "./sections/NavigationSection";

export const CoachDashboard = (): JSX.Element => {
  return (
    <main className="flex min-h-screen bg-slate-50">
      <NavigationSection />
      <DashboardSection />
    </main>
  );
};
