import React from "react";
import { DashboardSection } from "./sections/DashboardSection/DashboardSection";
import { NavigationSection } from "./sections/NavigationSection";

export const Dashboard = (): JSX.Element => {
  return (
    <main className="flex h-screen overflow-hidden bg-background">
      <aside className="h-full w-60 flex-shrink-0">
        <NavigationSection />
      </aside>
      <div className="flex-1 overflow-hidden">
        <DashboardSection />
      </div>
    </main>
  );
};