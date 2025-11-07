import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/etudiants", label: "Pour les Étudiants" },
  { to: "/ecoles", label: "Pour les Écoles" },
  { to: "/a-propos", label: "À Propos" },
  { to: "/contact", label: "Contact" },
];

export const LandingHeader = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-lg border-b border-gray-100 shadow-sm transition-all duration-300">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 group">
          <span
            className="text-2xl font-bold tracking-tight transition-all duration-300 group-hover:scale-105"
            style={{
              color: "#1D2A41",
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: "-0.04em",
            }}
          >
            Kareer
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-2">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "text-sm transition-all duration-300 font-semibold rounded-lg px-4 py-2 relative overflow-hidden",
                location.pathname === link.to
                  ? "text-[#1D2A41] bg-[#e3f0ff]/50"
                  : "text-gray-600 hover:text-[#1D2A41] hover:bg-[#f5f6f8]",
                "font-montserrat"
              )}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button
            asChild
            className="bg-gradient-to-r from-[#62C2FF] to-[#1D8FFF] hover:from-[#4bb2f0] hover:to-[#1D7FEF] text-white font-semibold px-6 py-2 rounded-full shadow-md font-montserrat border-0 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
            }}
          >
            <Link to="/login">Aller à l'App</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
};
