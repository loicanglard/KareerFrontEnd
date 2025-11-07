import { BarChart3Icon, HomeIcon, Settings2Icon } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback } from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";

// Navigation items data
const navigationItems = [
  { icon: <HomeIcon className="w-5 h-5" />, label: "Home", active: true },
  {
    icon: <BarChart3Icon className="w-5 h-5" />,
    label: "Analytics",
    active: false,
  },
  {
    icon: <Settings2Icon className="w-5 h-5" />,
    label: "Settings",
    active: false,
  },
];

export const NavigationSection = (): JSX.Element => {
  return (
    <nav className="flex flex-col h-full w-60 gap-10 px-4 py-6 bg-white shadow-[4px_0px_16px_#0000000a]">
      {/* Logo and Brand */}
      <div className="flex items-center gap-3 w-full">
        <img
          className="w-[59px] h-[59px] object-cover"
          alt="GenKreer Logo"
          src="/design-sans-titre--2--1.png"
        />
        <h1 className="font-['Montserrat',Helvetica] font-bold text-slate-800 text-lg leading-[21.6px]">
          Kareer Coach
        </h1>
      </div>

      {/* Navigation Menu */}
      <div className="flex flex-col items-start gap-1 w-full">
        {navigationItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className={`flex justify-start items-center gap-3 w-full h-11 px-3 rounded-lg ${
              item.active
                ? "bg-[#3b82f610] text-blue-500 font-normal"
                : "text-slate-800 font-medium"
            }`}
          >
            {item.icon}
            <span className="font-['Inter',Helvetica] text-sm leading-[16.8px]">
              {item.label}
            </span>
          </Button>
        ))}
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-3 p-3 w-full bg-slate-50 rounded-lg mt-auto">
        <Avatar className="w-10 h-10 bg-gradient-to-br from-[rgba(139,92,246,1)] to-[rgba(124,58,237,1)]">
          <AvatarFallback className="font-['Inter',Helvetica] text-white text-base">
            SJ
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start justify-center">
          <p className="font-['Inter',Helvetica] font-normal text-slate-800 text-sm leading-[16.8px]">
            Sarah Johnson
          </p>
          <p className="font-['Inter',Helvetica] font-normal text-slate-500 text-xs leading-[14.4px]">
            Career Coach
          </p>
        </div>
      </div>
    </nav>
  );
};
