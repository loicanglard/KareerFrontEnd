import React from "react";
import { NavigationSection } from "../CoachDashboard/sections/NavigationSection/NavigationSection";
import { SettingsSection } from "./sections/SettingsSection/SettingsSection";

export const CoachSettings = (): JSX.Element => {
  return (
    <main className="min-h-screen bg-slate-50">
      <NavigationSection />
      <div className="ml-60">
        <SettingsSection />
      </div>
    </main>
  );
};