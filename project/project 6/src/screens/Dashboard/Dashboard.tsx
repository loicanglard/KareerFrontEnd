import React from "react";
import { DashboardSection } from "./sections/DashboardSection/DashboardSection";
import { NavigationSection } from "./sections/NavigationSection";

export const Dashboard = (): JSX.Element => {
  return (
    <main className="flex min-h-screen bg-background">
      <aside className="h-full w-1/6">
        <NavigationSection />
      </aside>
      <div className="flex-1 w-5/6">
        <DashboardSection />
      </div>
    </main>
  );
};
