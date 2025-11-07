import React from "react";
import { AnalyticsSection } from "./sections/AnalyticsSection";
import { NavigationSection } from "./sections/NavigationSection/NavigationSection";

export const Analytics = (): JSX.Element => {
  return (
    <main className="flex min-h-screen bg-background">
      <NavigationSection />
      <div className="flex-1 overflow-auto">
        <AnalyticsSection />
      </div>
    </main>
  );
};
