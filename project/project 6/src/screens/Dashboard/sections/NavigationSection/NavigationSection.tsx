import {
  BriefcaseIcon,
  HomeIcon,
  UserIcon,
  UsersIcon,
  WandSparklesIcon,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "../../../../components/ui/avatar";

// Navigation menu items data
const navigationItems = [
  {
    icon: <HomeIcon className="w-5 h-5" />,
    label: "Home",
    path: "/dashboard",
    active: true,
  },
  {
    icon: <img className="w-5 h-5" alt="AI Interview icon" src="/frame.svg" />,
    label: "AI Interview",
    path: "#",
    active: false,
  },
  {
    icon: <UserIcon className="w-5 h-5" />,
    label: "My Profile",
    path: "#",
    active: false,
  },
  {
    icon: <UsersIcon className="w-5 h-5" />,
    label: "Network",
    path: "#",
    active: false,
  },
  {
    icon: <WandSparklesIcon className="w-5 h-5" />,
    label: "Generator",
    path: "#",
    active: false,
  },
  {
    icon: <BriefcaseIcon className="w-5 h-5" />,
    label: "Job Tracker",
    path: "#",
    active: false,
  },
];

export const NavigationSection = (): JSX.Element => {
  return (
    <nav className="flex flex-col w-[195px] items-start gap-10 px-4 py-6 bg-white shadow-[4px_0px_16px_#0000000a]">
      {/* Logo and Brand Name */}
      <div className="flex items-center w-full">
        <img
          className="w-[59px] h-[59px] object-cover"
          alt="GenKreer Logo"
          src="/design-sans-titre--2--1.png"
        />
        <h1 className="font-['Montserrat',Helvetica] font-bold text-slate-800 text-lg leading-[21.6px]">
          Kareer
        </h1>
      </div>

      {/* Navigation Menu */}
      <div className="flex flex-col items-start gap-1 w-full">
        {navigationItems.map((item, index) => (
          <Link
            key={index}
            className={`flex h-11 items-center gap-3 px-3 py-0 w-full rounded-lg ${
              item.active ? "bg-[#3b82f610] text-blue-500" : "text-slate-800"
            }`}
            to={item.path}
          >
            {item.icon}
            <span className="font-['Inter',Helvetica] font-medium text-sm leading-[16.8px]">
              {item.label}
            </span>
          </Link>
        ))}
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-3 p-3 w-full bg-slate-50 rounded-lg">
        <Avatar className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700">
          <AvatarFallback className="font-normal text-white text-base">
            JS
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col items-start justify-center">
          <div className="font-['Inter',Helvetica] font-normal text-slate-800 text-sm leading-[16.8px]">
            John Smith
          </div>
          <div className="font-['Inter',Helvetica] font-normal text-slate-500 text-xs leading-[14.4px]">
            Computer Science
          </div>
        </div>
      </div>
    </nav>
  );
};
