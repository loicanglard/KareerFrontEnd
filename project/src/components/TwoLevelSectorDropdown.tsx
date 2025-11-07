import React, { useState, useEffect, useRef } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";

interface SectorData {
  [key: string]: string[];
}

const sectorData: SectorData = {
  "Finance et Assurance": [
    "Banque de détail",
    "Banque d'investissement (M&A, ECM/DCM)",
    "Gestion d'actifs",
    "Assurance",
    "FinTech",
    "Capital-risque (VC)",
    "Private Equity",
    "Analyse financière",
    "Trading"
  ],
  "Consulting & Conseil": [
    "Conseil en stratégie (MBB)",
    "Conseil en management",
    "Conseil IT/Transformation digitale",
    "Conseil durable",
    "Conseil en fusions & acquisitions"
  ],
  "Technologie & Numérique (IT)": [
    "Développement logiciel",
    "Cybersécurité",
    "Data Science & IA",
    "Cloud & Infrastructure",
    "DevOps",
    "Produit & Product Management",
    "UX/UI Design",
    "Blockchain & Web3"
  ],
  "Industrie & Production": [
    "Automobile",
    "Aéronautique & Défense",
    "Énergie (pétrole, gaz, renouvelable)",
    "Manufacturing & Supply Chain",
    "Chimie & Matériaux"
  ],
  "Biens de Consommation (FMCG)": [
    "Alimentaire & Boissons",
    "Cosmétiques & Hygiène",
    "Électronique grand public",
    "Distribution & Retail"
  ],
  "Luxe, Mode & Retail": [
    "Maroquinerie & Accessoires",
    "Haute couture & Prêt-à-porter",
    "Joaillerie & Horlogerie",
    "E-commerce"
  ],
  "Santé & Biotechnologie": [
    "Pharmaceutique",
    "Dispositifs médicaux",
    "Recherche clinique",
    "HealthTech & Télémédecine",
    "Biotech"
  ],
  "Médias, Art & Culture": [
    "Audiovisuel & Production",
    "Édition & Presse",
    "Publicité & Communication",
    "Jeux vidéo & Divertissement",
    "Musées & Patrimoine"
  ],
  "Services Publics & Administration": [
    "Fonction publique",
    "Collectivités territoriales",
    "Organisations internationales",
    "Politique publique"
  ],
  "Immobilier & Construction": [
    "Promotion immobilière",
    "Architecture & Ingénierie",
    "BTP & Travaux publics",
    "Property Management"
  ],
  "Éducation & Recherche": [
    "Enseignement supérieur",
    "EdTech",
    "Formation professionnelle",
    "Recherche universitaire"
  ],
  "Organisations à But Non Lucratif (ONG)": [
    "Développement international",
    "Environnement & Climat",
    "Droits humains",
    "Santé publique",
    "Éducation & Culture"
  ],
  "Transports & Logistique": [
    "Transport aérien",
    "Transport maritime",
    "Transport ferroviaire",
    "Logistique & Supply Chain",
    "Mobilité urbaine"
  ]
};

interface TwoLevelSectorDropdownProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export const TwoLevelSectorDropdown: React.FC<TwoLevelSectorDropdownProps> = ({
  value,
  onChange,
  required = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSector, setExpandedSector] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setExpandedSector(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSectorClick = (sector: string) => {
    if (expandedSector === sector) {
      setExpandedSector(null);
    } else {
      setExpandedSector(sector);
    }
  };

  const handleSubsectorClick = (sector: string, subsector: string) => {
    const fullValue = `${sector} → ${subsector}`;
    onChange(fullValue);
    setIsOpen(false);
    setExpandedSector(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setExpandedSector(null);
    }
  };

  const displayValue = value || "Sélectionnez un secteur";

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="flex w-full items-center justify-between h-12 bg-slate-50/50 border-0 ring-1 ring-slate-200/60 rounded-2xl px-4 text-slate-800 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-200"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        required={required}
      >
        <span className={value ? "text-slate-800" : "text-slate-400"}>
          {displayValue}
        </span>
        <ChevronDownIcon
          className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white/95 backdrop-blur-sm border-0 ring-1 ring-slate-200/60 rounded-2xl shadow-lg max-h-96 overflow-y-auto">
          <div className="py-2">
            {Object.entries(sectorData).map(([sector, subsectors]) => (
              <div key={sector}>
                <button
                  type="button"
                  onClick={() => handleSectorClick(sector)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-blue-50 transition-colors duration-150"
                >
                  <span className="text-slate-700 font-medium">{sector}</span>
                  <ChevronRightIcon
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      expandedSector === sector ? "rotate-90" : ""
                    }`}
                  />
                </button>

                {expandedSector === sector && (
                  <div className="bg-slate-50/50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {subsectors.map((subsector) => (
                      <button
                        key={subsector}
                        type="button"
                        onClick={() => handleSubsectorClick(sector, subsector)}
                        className="w-full text-left px-8 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150"
                      >
                        {subsector}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
