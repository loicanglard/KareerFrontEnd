import React from "react";
import { HeroBannerSection } from "./sections/HeroBannerSection";
import { NavigationSection } from "./sections/NavigationSection";

export const HomePageComplete = (): JSX.Element => {
  return (
    <main className="flex flex-col w-full min-h-screen">
      <NavigationSection />
      <HeroBannerSection />
    </main>
  );
};
