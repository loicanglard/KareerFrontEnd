import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { cn } from "../../../../lib/utils";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/etudiants", label: "Pour les étudiants" },
  { to: "/ecoles", label: "Pour les écoles" },
  { to: "/a-propos", label: "À propos" },
  { to: "/contact", label: "Contact" },
];

export const NavigationSection = (): JSX.Element => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur border-b border-[#F5F6F8] rounded-b-2xl shadow-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span
            className="text-2xl font-bold tracking-tight"
            style={{
              color: "#1D2A41",
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: "-0.04em",
            }}
          >
            Kareer
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "text-base transition-colors font-semibold rounded-lg px-2 py-1",
                location.pathname === link.to
                  ? "text-[#1D2A41] bg-gradient-to-r from-[#e3f0ff] to-[#cbe7ff]"
                  : "text-gray-500 hover:text-[#1D2A41] hover:bg-gradient-to-r hover:from-[#e3f0ff] hover:to-[#cbe7ff]",
                "font-montserrat"
              )}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                transition: "background 0.2s",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button
            asChild
            className="bg-gradient-to-r from-[#62C2FF] to-[#1D8FFF] hover:from-[#4bb2f0] hover:to-[#1D2A41] text-[#1D2A41] font-semibold px-5 py-2 rounded-full shadow-lg font-montserrat border-0"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              boxShadow: "0 4px 16px 0 rgba(98,194,255,0.10)",
            }}
          >
            <Link to="/contact">Demander une démo</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
};