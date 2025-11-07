import { BarChart2Icon, HomeIcon, SettingsIcon } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback } from "../../../../components/ui/avatar";

export const NavigationSection = (): JSX.Element => {
  // Navigation items data for mapping
  const navigationItems = [
    {
      icon: <HomeIcon className="w-5 h-5 text-slate-800" />,
      label: "Home",
      isActive: false,
    },
    {
      icon: <BarChart2Icon className="w-5 h-5 text-blue-500" />,
      label: "Analytics",
      isActive: true,
    },
    {
      icon: <SettingsIcon className="w-5 h-5 text-slate-800" />,
      label: "Settings",
      isActive: false,
    },
  ];

  return (
    <aside className="flex flex-col h-full w-[229px] gap-10 px-4 py-6 bg-white shadow-[4px_0px_16px_#0000000a]">
      {/* Logo and Brand Name */}
      <div className="flex items-center">
        <img
          className="w-[41px] h-[41px] object-cover"
          alt="GenKreer Coach Logo"
          src="/design-sans-titre--2--1.png"
        />
        <h1 className="ml-2 font-['Montserrat',Helvetica] font-bold text-slate-800 text-lg">
          Kareer Coach
        </h1>
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col items-start gap-1 w-full">
        {navigationItems.map((item, index) => (
          <div
            key={index}
            className={`flex h-11 items-center gap-3 px-3 py-0 w-full rounded-lg ${
              item.isActive ? "bg-[#3b82f610]" : "bg-white"
            }`}
          >
            {item.icon}
            <span
              className={`font-['Inter',Helvetica] text-sm leading-[16.8px] whitespace-nowrap ${
                item.isActive
                  ? "text-blue-500 font-medium"
                  : "text-slate-800 font-normal"
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </nav>

      {/* User Profile */}
      <div className="flex items-center gap-3 p-3 w-full bg-slate-50 rounded-lg">
        <Avatar className="w-10 h-10 bg-gradient-to-br from-[rgba(139,92,246,1)] to-[rgba(124,58,237,1)]">
          <AvatarFallback className="text-white">SJ</AvatarFallback>
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
    </aside>
  );
};
