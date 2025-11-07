import React from "react";
import { NavigationSection } from "../CoachDashboard/sections/NavigationSection/NavigationSection";
import { AnalyticsTable } from "./AnalyticsTable";

export const AnalyticsOptimized = (): JSX.Element => {
  return (
    <main className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/20">
      <aside className="h-full w-60 fixed left-0 top-0">
        <NavigationSection />
      </aside>
      
      <div className="flex-1 p-6 ml-60">
        <AnalyticsTable />
      </div>
    </main>
  );
};