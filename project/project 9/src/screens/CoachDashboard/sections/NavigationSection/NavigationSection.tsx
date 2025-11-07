import { BarChart2Icon, HomeIcon, SettingsIcon } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback } from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";

// Navigation items data
const navigationItems = [
  {
    icon: <HomeIcon className="w-5 h-5" />,
    label: "Home",
    isActive: true,
  },
  {
    icon: <BarChart2Icon className="w-5 h-5" />,
    label: "Analytics",
    isActive: false,
  },
  {
    icon: <SettingsIcon className="w-5 h-5" />,
    label: "Settings",
    isActive: false,
  },
];

export const NavigationSection = (): JSX.Element => {
  return (
    <nav className="flex flex-col h-full w-60 gap-10 px-4 py-6 bg-white shadow-[4px_0px_16px_#0000000a]">
      {/* Logo and Brand */}
      <div className="flex items-center gap-3">
        <img
          className="w-[50px] h-[50px] object-cover"
          alt="GenKreer Logo"
          src="/design-sans-titre--2--1.png"
        />
        <h1 className="font-bold text-lg text-slate-800 font-['Montserrat',Helvetica]">
          Kareer Coach
        </h1>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col items-start gap-1 w-full">
        {navigationItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className={`flex justify-start items-center gap-3 w-full h-11 px-3 rounded-lg ${
              item.isActive
                ? "bg-[#3b82f610] text-blue-500 font-normal"
                : "text-slate-800 font-medium"
            }`}
          >
            {item.icon}
            <span className="text-sm font-['Inter',Helvetica]">
              {item.label}
            </span>
          </Button>
        ))}
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-3 p-3 self-stretch bg-slate-50 rounded-lg">
        <Avatar className="w-10 h-10 bg-gradient-to-br from-[rgba(139,92,246,1)] to-[rgba(124,58,237,1)]">
          <AvatarFallback className="text-white font-normal">SJ</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start justify-center">
          <p className="text-sm text-slate-800 font-normal font-['Inter',Helvetica]">
            Sarah Johnson
          </p>
          <p className="text-xs text-slate-500 font-normal font-['Inter',Helvetica]">
            Career Coach
          </p>
        </div>
      </div>
    </nav>
  );
};
