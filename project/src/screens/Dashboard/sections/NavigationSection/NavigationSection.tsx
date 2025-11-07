import {
  BriefcaseIcon,
  HomeIcon,
  UserIcon,
  UsersIcon,
  WandSparklesIcon,
  MessageSquareIcon,
  LogOutIcon
} from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "../../../../components/ui/avatar";
import { LogoutButton } from "../../../../components/LogoutButton";
import { useAuth } from "../../../../lib/auth";

// Navigation menu items data
const navigationItems = [
  {
    icon: <HomeIcon className="w-5 h-5" />,
    label: "Accueil",
    path: "/dashboard"
  },
  {
    icon: <MessageSquareIcon className="w-5 h-5" />,
    label: "Entretien IA",
    path: "/ai-interview"
  },
  {
    icon: <UserIcon className="w-5 h-5" />,
    label: "Mon Profil",
    path: "/profile"
  },
  {
    icon: <WandSparklesIcon className="w-5 h-5" />,
    label: "Générateur",
    path: "/generator"
  },
  {
    icon: <BriefcaseIcon className="w-5 h-5" />,
    label: "Job Tracker",
    path: "/job-tracker"
  },
  {
    icon: <UsersIcon className="w-5 h-5" />,
    label: "Réseau",
    path: "/network"
  },
];

export const NavigationSection = (): JSX.Element => {
  const location = useLocation();
  const { user } = useAuth();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  return (
    <nav className="flex flex-col w-60 min-h-screen items-start gap-8 px-6 py-8 bg-white/95 backdrop-blur-sm shadow-sm border-r border-slate-200/60 fixed">
      {/* Logo and Brand Name */}
      <Link to="/" className="flex items-center w-full group">
        <img
          className="w-12 h-12 object-cover rounded-2xl shadow-sm group-hover:shadow-md transition-shadow duration-200"
          alt="GenKreer Logo"
          src="/logo.png"
        />
        <h1 className="ml-3 font-bold text-slate-800 text-xl tracking-tight">
          Kareer
        </h1>
      </Link>

      {/* Navigation Menu */}
      <div className="flex flex-col items-start gap-2 w-full">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              className={`flex h-12 items-center gap-3 px-4 py-0 w-full rounded-2xl transition-all duration-200 group ${
                isActive 
                  ? "bg-gradient-to-r from-blue-50 to-blue-100/50 text-blue-700 shadow-sm ring-1 ring-blue-200/60" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
              }`}
              to={item.path || "#"}
            >
              <div className={`transition-transform duration-200 ${isActive ? "" : "group-hover:scale-110"}`}>
                {item.icon}
              </div>
              <span className={`font-medium text-sm tracking-tight ${isActive ? "font-semibold" : ""}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Logout Button */}
      <LogoutButton
        variant="ghost"
        className="w-full justify-start px-4 h-12 rounded-2xl mt-auto"
        checkUnsavedChanges={true}
        hasUnsavedChanges={hasUnsavedChanges}
      />
    </nav>
  );
};