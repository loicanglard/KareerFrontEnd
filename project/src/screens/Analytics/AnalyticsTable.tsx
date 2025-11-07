import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BellIcon,
  CalendarIcon,
  ChevronDownIcon,
  ClockIcon,
  DownloadIcon,
  ExternalLinkIcon,
  FilterIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SearchIcon,
  SlidersIcon,
  Trash2Icon,
  UserIcon,
  XIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";
import { Label } from "../../components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { studentProfiles } from "../../data/studentProfiles";

// Get unique students with proper data mapping
const getUniqueStudents = () => {
  return studentProfiles.map(profile => ({
    id: profile.id.toString(),
    name: profile.name,
    avatar: profile.initials || profile.name.split(" ").map(n => n[0]).join("").toUpperCase(),
    color: `bg-gradient-to-br ${profile.color}`,
    program: profile.program,
    profilePhoto: profile.profilePhoto
  }));
};

const uniqueStudents = getUniqueStudents();

// Job application data using real student profiles
const jobApplications = [
  {
    id: "app1",
    student: uniqueStudents[0],
    company: {
      name: "Google",
      logo: "https://logo.clearbit.com/google.com"
    },
    position: "Machine Learning Engineer",
    status: { label: "Entretien", color: "orange" },
    appliedDate: "2024-05-15",
    updatedDate: "2024-05-16",
    salary: "€65,000 - €80,000",
    nextAction: "Technical interview on May 22",
    nextActionDate: "2024-05-22",
    priority: "high",
    location: "Paris, France",
    type: "Temps plein",
    description: "Applied for machine learning engineer position focusing on AI and deep learning.",
    documents: {
      cv: "CV_Sophie_Google.pdf",
      coverLetter: "CL_Sophie_Google.pdf"
    }
  },
  {
    id: "app2",
    student: uniqueStudents[0],
    company: {
      name: "DeepMind",
      logo: "https://logo.clearbit.com/deepmind.com"
    },
    position: "AI Research Intern",
    status: { label: "Postulé", color: "blue" },
    appliedDate: "2024-05-12",
    updatedDate: "2024-05-12",
    salary: "€45,000 - €55,000",
    nextAction: "Follow up on May 26",
    nextActionDate: "2024-05-26",
    priority: "medium",
    location: "London, UK",
    type: "Stage",
    description: "Applied for AI research internship focusing on computer vision.",
    documents: {
      cv: "CV_Sophie_DeepMind.pdf",
      coverLetter: "CL_Sophie_DeepMind.pdf"
    }
  },
  {
    id: "app3",
    student: uniqueStudents[1],
    company: {
      name: "McKinsey",
      logo: "https://logo.clearbit.com/mckinsey.com"
    },
    position: "Business Analyst",
    status: { label: "Entretien", color: "orange" },
    appliedDate: "2024-05-10",
    updatedDate: "2024-05-17",
    salary: "€70,000 - €85,000",
    nextAction: "Case interview on May 20",
    nextActionDate: "2024-05-20",
    priority: "high",
    location: "Paris, France",
    type: "Temps plein",
    description: "Scheduled for second round case interview with consulting team.",
    documents: {
      cv: "CV_Lucas_McKinsey.pdf",
      coverLetter: "CL_Lucas_McKinsey.pdf"
    }
  },
  {
    id: "app4",
    student: uniqueStudents[1],
    company: {
      name: "Accenture",
      logo: "https://logo.clearbit.com/accenture.com"
    },
    position: "Data Analyst",
    status: { label: "Offre", color: "green" },
    appliedDate: "2024-04-28",
    updatedDate: "2024-05-15",
    salary: "€55,000 - €65,000",
    nextAction: "Respond to offer by May 25",
    nextActionDate: "2024-05-25",
    priority: "critical",
    location: "Paris, France",
    type: "Temps plein",
    description: "Received offer for data analyst position with competitive package.",
    documents: {
      cv: "CV_Lucas_Accenture.pdf",
      coverLetter: "CL_Lucas_Accenture.pdf"
    }
  },
  {
    id: "app5",
    student: uniqueStudents[2],
    company: {
      name: "L'Oréal",
      logo: "https://logo.clearbit.com/loreal.com"
    },
    position: "Marketing Coordinator",
    status: { label: "Postulé", color: "blue" },
    appliedDate: "2024-05-12",
    updatedDate: "2024-05-12",
    salary: "€40,000 - €50,000",
    nextAction: "Follow up on May 26",
    nextActionDate: "2024-05-26",
    priority: "medium",
    location: "Paris, France",
    type: "Temps plein",
    description: "Applied for marketing coordinator position in cosmetics division.",
    documents: {
      cv: "CV_Camille_Loreal.pdf",
      coverLetter: "CL_Camille_Loreal.pdf"
    }
  },
  {
    id: "app6",
    student: uniqueStudents[2],
    company: {
      name: "LVMH",
      logo: "https://logo.clearbit.com/lvmh.com"
    },
    position: "Brand Manager Assistant",
    status: { label: "Entretien", color: "orange" },
    appliedDate: "2024-05-05",
    updatedDate: "2024-05-14",
    salary: "€45,000 - €55,000",
    nextAction: "Final interview on May 21",
    nextActionDate: "2024-05-21",
    priority: "high",
    location: "Paris, France",
    type: "Temps plein",
    description: "Advanced to final interview round for luxury brand management role.",
    documents: {
      cv: "CV_Camille_LVMH.pdf",
      coverLetter: "CL_Camille_LVMH.pdf"
    }
  },
  {
    id: "app7",
    student: uniqueStudents[3],
    company: {
      name: "Amazon",
      logo: "https://logo.clearbit.com/amazon.com"
    },
    position: "Software Engineer",
    status: { label: "Entretien", color: "orange" },
    appliedDate: "2024-05-14",
    updatedDate: "2024-05-14",
    salary: "€65,000 - €80,000",
    nextAction: "Technical interview on May 28",
    nextActionDate: "2024-05-28",
    priority: "high",
    location: "Berlin, Germany",
    type: "Temps plein",
    description: "Scheduled for technical interview focusing on system design.",
    documents: {
      cv: "CV_Thomas_Amazon.pdf",
      coverLetter: "CL_Thomas_Amazon.pdf"
    }
  },
  {
    id: "app8",
    student: uniqueStudents[3],
    company: {
      name: "Microsoft",
      logo: "https://logo.clearbit.com/microsoft.com"
    },
    position: "Cloud Solutions Architect",
    status: { label: "Postulé", color: "blue" },
    appliedDate: "2024-05-08",
    updatedDate: "2024-05-08",
    salary: "€70,000 - €85,000",
    nextAction: "Follow up on May 22",
    nextActionDate: "2024-05-22",
    priority: "medium",
    location: "Amsterdam, Netherlands",
    type: "Temps plein",
    description: "Applied for cloud solutions architect role with Azure focus.",
    documents: {
      cv: "CV_Thomas_Microsoft.pdf",
      coverLetter: "CL_Thomas_Microsoft.pdf"
    }
  },
  {
    id: "app9",
    student: uniqueStudents[4],
    company: {
      name: "Goldman Sachs",
      logo: "https://logo.clearbit.com/goldmansachs.com"
    },
    position: "Investment Analyst",
    status: { label: "Offre", color: "green" },
    appliedDate: "2024-04-15",
    updatedDate: "2024-05-12",
    salary: "€75,000 - €90,000",
    nextAction: "Respond to offer by May 22",
    nextActionDate: "2024-05-22",
    priority: "critical",
    location: "London, UK",
    type: "Temps plein",
    description: "Received competitive offer for investment analyst position.",
    documents: {
      cv: "CV_Lea_Goldman.pdf",
      coverLetter: "CL_Lea_Goldman.pdf"
    }
  },
  {
    id: "app10",
    student: uniqueStudents[4],
    company: {
      name: "BNP Paribas",
      logo: "https://logo.clearbit.com/bnpparibas.com"
    },
    position: "Financial Analyst",
    status: { label: "Rejeté", color: "red" },
    appliedDate: "2024-04-10",
    updatedDate: "2024-05-05",
    salary: "€55,000 - €65,000",
    nextAction: "Request feedback",
    nextActionDate: "2024-05-19",
    priority: "low",
    location: "Paris, France",
    type: "Temps plein",
    description: "Application not selected after initial screening.",
    documents: {
      cv: "CV_Lea_BNP.pdf",
      coverLetter: "CL_Lea_BNP.pdf"
    }
  },
  {
    id: "app11",
    student: uniqueStudents[5],
    company: {
      name: "Doctolib",
      logo: "https://logo.clearbit.com/doctolib.com"
    },
    position: "Product Manager",
    status: { label: "Entretien", color: "orange" },
    appliedDate: "2024-05-01",
    updatedDate: "2024-05-15",
    salary: "€60,000 - €75,000",
    nextAction: "Product interview on May 23",
    nextActionDate: "2024-05-23",
    priority: "high",
    location: "Paris, France",
    type: "Temps plein",
    description: "Advancing to product case interview round for healthtech platform.",
    documents: {
      cv: "CV_Antoine_Doctolib.pdf",
      coverLetter: "CL_Antoine_Doctolib.pdf"
    }
  },
  {
    id: "app12",
    student: uniqueStudents[5],
    company: {
      name: "Airbnb",
      logo: "https://logo.clearbit.com/airbnb.com"
    },
    position: "Growth Manager",
    status: { label: "Postulé", color: "blue" },
    appliedDate: "2024-05-10",
    updatedDate: "2024-05-10",
    salary: "€55,000 - €70,000",
    nextAction: "Follow up on May 24",
    nextActionDate: "2024-05-24",
    priority: "medium",
    location: "Remote",
    type: "Temps plein",
    description: "Applied for growth manager position in European expansion team.",
    documents: {
      cv: "CV_Antoine_Airbnb.pdf",
      coverLetter: "CL_Antoine_Airbnb.pdf"
    }
  },
  {
    id: "app13",
    student: uniqueStudents[6],
    company: {
      name: "Schneider Electric",
      logo: "https://logo.clearbit.com/se.com"
    },
    position: "Sustainability Consultant",
    status: { label: "Entretien", color: "orange" },
    appliedDate: "2024-05-07",
    updatedDate: "2024-05-16",
    salary: "€50,000 - €65,000",
    nextAction: "Final interview on May 21",
    nextActionDate: "2024-05-21",
    priority: "high",
    location: "Paris, France",
    type: "Temps plein",
    description: "Scheduled for final interview focusing on renewable energy projects.",
    documents: {
      cv: "CV_Marie_Schneider.pdf",
      coverLetter: "CL_Marie_Schneider.pdf"
    }
  },
  {
    id: "app14",
    student: uniqueStudents[6],
    company: {
      name: "Carrefour",
      logo: "https://logo.clearbit.com/carrefour.com"
    },
    position: "CSR Manager",
    status: { label: "Postulé", color: "blue" },
    appliedDate: "2024-05-13",
    updatedDate: "2024-05-13",
    salary: "€45,000 - €55,000",
    nextAction: "Follow up on May 27",
    nextActionDate: "2024-05-27",
    priority: "medium",
    location: "Paris, France",
    type: "Temps plein",
    description: "Applied for corporate social responsibility manager position.",
    documents: {
      cv: "CV_Marie_Carrefour.pdf",
      coverLetter: "CL_Marie_Carrefour.pdf"
    }
  },
  {
    id: "app15",
    student: uniqueStudents[7],
    company: {
      name: "Meta",
      logo: "https://logo.clearbit.com/meta.com"
    },
    position: "Data Scientist",
    status: { label: "Offre", color: "green" },
    appliedDate: "2024-04-20",
    updatedDate: "2024-05-10",
    salary: "€80,000 - €95,000",
    nextAction: "Respond to offer by May 24",
    nextActionDate: "2024-05-24",
    priority: "critical",
    location: "London, UK",
    type: "Temps plein",
    description: "Received competitive offer for data science role in ML team.",
    documents: {
      cv: "CV_Hugo_Meta.pdf",
      coverLetter: "CL_Hugo_Meta.pdf"
    }
  },
  {
    id: "app16",
    student: uniqueStudents[7],
    company: {
      name: "Spotify",
      logo: "https://logo.clearbit.com/spotify.com"
    },
    position: "Machine Learning Engineer",
    status: { label: "Rejeté", color: "red" },
    appliedDate: "2024-04-25",
    updatedDate: "2024-05-08",
    salary: "€70,000 - €85,000",
    nextAction: "Request feedback",
    nextActionDate: "2024-05-20",
    priority: "low",
    location: "Stockholm, Sweden",
    type: "Temps plein",
    description: "Application not selected after technical assessment.",
    documents: {
      cv: "CV_Hugo_Spotify.pdf",
      coverLetter: "CL_Hugo_Spotify.pdf"
    }
  },
  {
    id: "app17",
    student: uniqueStudents[8],
    company: {
      name: "Adobe",
      logo: "https://logo.clearbit.com/adobe.com"
    },
    position: "UX Designer",
    status: { label: "Entretien", color: "orange" },
    appliedDate: "2024-05-06",
    updatedDate: "2024-05-14",
    salary: "€45,000 - €60,000",
    nextAction: "Portfolio review on May 22",
    nextActionDate: "2024-05-22",
    priority: "high",
    location: "Paris, France",
    type: "Temps plein",
    description: "Scheduled for portfolio review with design team leadership.",
    documents: {
      cv: "CV_Chloe_Adobe.pdf",
      coverLetter: "CL_Chloe_Adobe.pdf"
    }
  },
  {
    id: "app18",
    student: uniqueStudents[8],
    company: {
      name: "Figma",
      logo: "https://logo.clearbit.com/figma.com"
    },
    position: "Product Designer",
    status: { label: "Postulé", color: "blue" },
    appliedDate: "2024-05-11",
    updatedDate: "2024-05-11",
    salary: "€50,000 - €65,000",
    nextAction: "Follow up on May 25",
    nextActionDate: "2024-05-25",
    priority: "medium",
    location: "Remote",
    type: "Temps plein",
    description: "Applied for product designer role focusing on collaborative tools.",
    documents: {
      cv: "CV_Chloe_Figma.pdf",
      coverLetter: "CL_Chloe_Figma.pdf"
    }
  },
  {
    id: "app19",
    student: uniqueStudents[9],
    company: {
      name: "Thales",
      logo: "https://logo.clearbit.com/thalesgroup.com"
    },
    position: "Security Engineer",
    status: { label: "Entretien", color: "orange" },
    appliedDate: "2024-05-03",
    updatedDate: "2024-05-13",
    salary: "€60,000 - €75,000",
    nextAction: "Technical interview on May 20",
    nextActionDate: "2024-05-20",
    priority: "high",
    location: "Paris, France",
    type: "Temps plein",
    description: "Advancing to technical interview for cybersecurity infrastructure role.",
    documents: {
      cv: "CV_Maxime_Thales.pdf",
      coverLetter: "CL_Maxime_Thales.pdf"
    }
  },
  {
    id: "app20",
    student: uniqueStudents[9],
    company: {
      name: "Orange Cyberdéfense",
      logo: "https://logo.clearbit.com/orange.com"
    },
    position: "Pentester",
    status: { label: "Offre", color: "green" },
    appliedDate: "2024-04-18",
    updatedDate: "2024-05-09",
    salary: "€55,000 - €70,000",
    nextAction: "Respond to offer by May 23",
    nextActionDate: "2024-05-23",
    priority: "critical",
    location: "Paris, France",
    type: "Temps plein",
    description: "Received offer for penetration testing role in cyber defense team.",
    documents: {
      cv: "CV_Maxime_Orange.pdf",
      coverLetter: "CL_Maxime_Orange.pdf"
    }
  },
  {
    id: "app21",
    student: uniqueStudents[10],
    company: {
      name: "Deloitte",
      logo: "https://logo.clearbit.com/deloitte.com"
    },
    position: "Management Consultant",
    status: { label: "Postulé", color: "blue" },
    appliedDate: "2024-05-09",
    updatedDate: "2024-05-09",
    salary: "€50,000 - €65,000",
    nextAction: "Follow up on May 23",
    nextActionDate: "2024-05-23",
    priority: "medium",
    location: "Paris, France",
    type: "Temps plein",
    description: "Applied for management consulting position in strategy practice.",
    documents: {
      cv: "CV_Alex_Deloitte.pdf",
      coverLetter: "CL_Alex_Deloitte.pdf"
    }
  },
  {
    id: "app22",
    student: uniqueStudents[10],
    company: {
      name: "Boston Consulting Group",
      logo: "https://logo.clearbit.com/bcg.com"
    },
    position: "Associate Consultant",
    status: { label: "Rejeté", color: "red" },
    appliedDate: "2024-04-22",
    updatedDate: "2024-05-06",
    salary: "€60,000 - €75,000",
    nextAction: "Request feedback",
    nextActionDate: "2024-05-18",
    priority: "low",
    location: "London, UK",
    type: "Temps plein",
    description: "Application not selected after case interview round.",
    documents: {
      cv: "CV_Alex_BCG.pdf",
      coverLetter: "CL_Alex_BCG.pdf"
    }
  }
];

// Status color mapping
const statusColors = {
  blue: "bg-blue-100 text-blue-700 border-blue-200",
  orange: "bg-orange-100 text-orange-700 border-orange-200",
  green: "bg-green-100 text-green-700 border-green-200",
  red: "bg-red-100 text-red-700 border-red-200"
};

// Priority color mapping
const priorityColors = {
  low: "bg-slate-100 text-slate-700 border-slate-200",
  medium: "bg-amber-100 text-amber-700 border-amber-200",
  high: "bg-orange-100 text-orange-700 border-orange-200",
  critical: "bg-red-100 text-red-700 border-red-200"
};

// Filter state type
interface FilterState {
  // Programme & Niveau
  programs: string[];
  levels: string[];

  // Performance Académique
  gpaMin: number | null;
  gpaMax: number | null;
  creditsMin: number | null;

  // Démographie & Origine
  countries: string[];
  cities: string[];
  originSchoolTypes: string[];

  // Statut d'Emploi
  employmentStatus: string[];
  jobSearchStatus: string[];

  // Rémunération
  salaryMin: number | null;
  salaryMax: number | null;

  // Localisation de l'Emploi
  jobCountries: string[];
  jobRegions: string[];
  workModes: string[];

  // Secteur et Fonction
  sectors: string[];
  functions: string[];

  // Entreprise
  company: string;

  // Statut de candidature
  applicationStatus: string[];
}

const initialFilterState: FilterState = {
  programs: [],
  levels: [],
  gpaMin: null,
  gpaMax: null,
  creditsMin: null,
  countries: [],
  cities: [],
  originSchoolTypes: [],
  employmentStatus: [],
  jobSearchStatus: [],
  salaryMin: null,
  salaryMax: null,
  jobCountries: [],
  jobRegions: [],
  workModes: [],
  sectors: [],
  functions: [],
  company: '',
  applicationStatus: []
};

export const AnalyticsTable = (): JSX.Element => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState(jobApplications);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredApplications, setFilteredApplications] = useState(applications);
  const [sortField, setSortField] = useState<string>("nextActionDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<any | null>(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isEditingCell, setIsEditingCell] = useState<{rowId: string, field: string} | null>(null);
  const [editValue, setEditValue] = useState("");
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  
  const tableRef = useRef<HTMLDivElement>(null);
  const detailPanelRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Apply filters to applications
  const applyFilters = (apps: typeof jobApplications) => {
    return apps.filter(app => {
      // Programme & Niveau
      if (filters.programs.length > 0 && !filters.programs.includes(app.student.program)) return false;

      // Statut d'Emploi (using existing status field)
      if (filters.employmentStatus.length > 0) {
        const statusMatch = filters.employmentStatus.some(status => {
          if (status === "Stage" || status === "Alternance") return app.type.includes(status);
          if (status === "CDI" || status === "CDD") return app.type.includes(status);
          return false;
        });
        if (!statusMatch) return false;
      }

      // Rémunération (parse salary range)
      if (filters.salaryMin !== null || filters.salaryMax !== null) {
        const salaryMatch = app.salary.match(/€([\d,]+)/);
        if (salaryMatch) {
          const minSalary = parseInt(salaryMatch[1].replace(/,/g, ''));
          if (filters.salaryMin !== null && minSalary < filters.salaryMin) return false;
          if (filters.salaryMax !== null && minSalary > filters.salaryMax) return false;
        }
      }

      // Localisation de l'Emploi
      if (filters.jobCountries.length > 0) {
        const hasCountryMatch = filters.jobCountries.some(country =>
          app.location.includes(country)
        );
        if (!hasCountryMatch) return false;
      }

      if (filters.workModes.length > 0) {
        const hasWorkModeMatch = filters.workModes.some(mode => {
          if (mode === "Remote" && app.location.includes("Remote")) return true;
          if (mode === "Hybride" && app.location.includes("Hybrid")) return true;
          if (mode === "Présentiel" && !app.location.includes("Remote") && !app.location.includes("Hybrid")) return true;
          return false;
        });
        if (!hasWorkModeMatch) return false;
      }

      // Secteur et Fonction (using position field)
      if (filters.functions.length > 0) {
        const hasFunctionMatch = filters.functions.some(func =>
          app.position.toLowerCase().includes(func.toLowerCase())
        );
        if (!hasFunctionMatch) return false;
      }

      // Entreprise (company name filter)
      if (filters.company.trim() !== '') {
        if (!app.company.name.toLowerCase().includes(filters.company.toLowerCase())) return false;
      }

      // Statut de candidature
      if (filters.applicationStatus.length > 0) {
        if (!filters.applicationStatus.includes(app.status.label)) return false;
      }

      return true;
    });
  };

  // Count active filters
  useEffect(() => {
    let count = 0;
    if (filters.programs.length > 0) count++;
    if (filters.levels.length > 0) count++;
    if (filters.gpaMin !== null || filters.gpaMax !== null) count++;
    if (filters.creditsMin !== null) count++;
    if (filters.countries.length > 0) count++;
    if (filters.cities.length > 0) count++;
    if (filters.originSchoolTypes.length > 0) count++;
    if (filters.employmentStatus.length > 0) count++;
    if (filters.jobSearchStatus.length > 0) count++;
    if (filters.salaryMin !== null || filters.salaryMax !== null) count++;
    if (filters.jobCountries.length > 0) count++;
    if (filters.jobRegions.length > 0) count++;
    if (filters.workModes.length > 0) count++;
    if (filters.sectors.length > 0) count++;
    if (filters.functions.length > 0) count++;
    if (filters.company.trim() !== '') count++;
    if (filters.applicationStatus.length > 0) count++;
    setActiveFiltersCount(count);
  }, [filters]);

  // Filter applications based on search query and filters
  useEffect(() => {
    let filtered = applications;

    // Apply advanced filters first
    filtered = applyFilters(filtered);

    // Then apply search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(app =>
        app.student.name.toLowerCase().includes(query) ||
        app.company.name.toLowerCase().includes(query) ||
        app.position.toLowerCase().includes(query) ||
        app.status.label.toLowerCase().includes(query) ||
        app.location.toLowerCase().includes(query)
      );
    }

    setFilteredApplications(filtered);

    // Generate search suggestions
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      const suggestions = [
        ...new Set([
          ...applications.map(app => app.student.name),
          ...applications.map(app => app.company.name),
          ...applications.map(app => app.position),
          ...applications.map(app => app.status.label),
          ...applications.map(app => app.location)
        ])
      ].filter(item =>
        item.toLowerCase().includes(query) &&
        item.toLowerCase() !== query
      ).slice(0, 5);

      setSearchSuggestions(suggestions);
    } else {
      setSearchSuggestions([]);
    }
  }, [searchQuery, applications, filters]);

  // Sort applications
  useEffect(() => {
    const sorted = [...filteredApplications].sort((a, b) => {
      let aValue, bValue;
      
      // Handle nested properties
      if (sortField === "student.name") {
        aValue = a.student.name;
        bValue = b.student.name;
      } else if (sortField === "company.name") {
        aValue = a.company.name;
        bValue = b.company.name;
      } else if (sortField === "status.label") {
        aValue = a.status.label;
        bValue = b.status.label;
      } else {
        aValue = a[sortField];
        bValue = b[sortField];
      }
      
      // Handle date fields
      if (sortField.includes("Date")) {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }
      
      // Compare values based on sort direction
      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    setFilteredApplications(sorted);
  }, [sortField, sortDirection]);

  // Handle click outside detail panel to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        detailPanelRef.current && 
        !detailPanelRef.current.contains(event.target as Node) &&
        event.target instanceof Node &&
        !tableRef.current?.contains(event.target)
      ) {
        setShowDetailPanel(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true);
  };

  // Handle search suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    
    // Focus back on search input
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Handle sort click
  const handleSortClick = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Handle row click to show details
  const handleRowClick = (application: any) => {
    setSelectedApplication(application);
    setShowDetailPanel(true);
  };

  // Handle double click to edit cell
  const handleCellDoubleClick = (application: any, field: string) => {
    // Only allow editing certain fields
    if (["nextAction", "priority"].includes(field)) {
      setIsEditingCell({ rowId: application.id, field });
      setEditValue(application[field]);
    }
  };

  // Handle edit value change
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  // Handle edit save
  const handleEditSave = () => {
    if (!isEditingCell) return;
    
    const { rowId, field } = isEditingCell;
    
    // Update application
    const updatedApplications = applications.map(app => {
      if (app.id === rowId) {
        return { ...app, [field]: editValue };
      }
      return app;
    });
    
    setApplications(updatedApplications);
    setIsEditingCell(null);
  };

  // Handle edit cancel
  const handleEditCancel = () => {
    setIsEditingCell(null);
  };

  // Handle edit key press
  const handleEditKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleEditSave();
    } else if (e.key === "Escape") {
      handleEditCancel();
    }
  };

  // Handle add new job
  const handleAddJob = () => {
    console.log("Add new job");
    // In a real app, this would open a modal to add a new job
  };

  // Handle export data
  const handleExportData = () => {
    console.log("Exporting data");
    // In a real app, this would trigger a data export process
  };

  // Handle filter toggle
  const handleFilterToggle = () => {
    setShowFilters(!showFilters);
  };

  // Handle filter change
  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Handle checkbox filter toggle
  const handleCheckboxToggle = (key: keyof FilterState, value: string) => {
    setFilters(prev => {
      const currentValues = prev[key] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, [key]: newValues };
    });
  };

  // Reset all filters
  const handleResetFilters = () => {
    setFilters(initialFilterState);
  };

  // Handle view student profile
  const handleViewStudentProfile = (studentId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/student-education/${studentId}`);
  };

  // Handle delete application
  const handleDeleteApplication = (applicationId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedApplications = applications.filter(app => app.id !== applicationId);
    setApplications(updatedApplications);
  };

  // Get status counts
  const statusCounts = {
    applied: applications.filter(app => app.status.label === "Postulé").length,
    interview: applications.filter(app => app.status.label === "Entretien").length,
    offer: applications.filter(app => app.status.label === "Offre").length,
    rejected: applications.filter(app => app.status.label === "Rejeté").length
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    }).format(date);
  };

  // Check if a date is upcoming (within 3 days)
  const isUpcoming = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 3;
  };

  // Get sort icon for column
  const getSortIcon = (field: string) => {
    if (sortField !== field) {
      return (
        <div className="w-4 h-4 opacity-30 flex flex-col items-center justify-center">
          <ArrowUpIcon className="w-3 h-3 -mb-1" />
          <ArrowDownIcon className="w-3 h-3 -mt-1" />
        </div>
      );
    }
    
    return sortDirection === "asc" 
      ? <ArrowUpIcon className="w-4 h-4 text-blue-500" /> 
      : <ArrowDownIcon className="w-4 h-4 text-blue-500" />;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header with KPIs and actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-slate-800">Applications</h1>
          
          {/* Compact KPIs */}
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium">Postulé : <span className="font-bold">{statusCounts.applied}</span></span>
            </div>
            <div className="w-px h-6 bg-slate-200"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm font-medium">Entretien : <span className="font-bold">{statusCounts.interview}</span></span>
            </div>
            <div className="w-px h-6 bg-slate-200"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">Offre : <span className="font-bold">{statusCounts.offer}</span></span>
            </div>
            <div className="w-px h-6 bg-slate-200"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm font-medium">Rejeté : <span className="font-bold">{statusCounts.rejected}</span></span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Search with suggestions */}
          <div className="relative">
            <div className="flex items-center h-10 w-64 bg-white rounded-lg border border-slate-200 px-3 focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500">
              <SearchIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Rechercher des candidatures..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="flex-1 border-0 bg-transparent px-2 py-1 text-sm focus:outline-none focus:ring-0"
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onFocus={() => searchQuery && setShowSuggestions(true)}
              />
              {searchQuery && (
                <button 
                  className="text-slate-400 hover:text-slate-600"
                  onClick={() => setSearchQuery("")}
                >
                  <XIcon className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {/* Search suggestions */}
            {showSuggestions && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-lg border border-slate-200 shadow-lg z-10">
                {searchSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 hover:bg-slate-50 cursor-pointer text-sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Filter button */}
          <Button
            variant="outline"
            size="sm"
            className="h-10 gap-2 relative"
            onClick={handleFilterToggle}
          >
            <FilterIcon className="w-4 h-4" />
            <span>Filtres</span>
            {activeFiltersCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-blue-600 text-white text-xs border-2 border-white">
                {activeFiltersCount}
              </Badge>
            )}
            <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
          </Button>
          
          {/* Export button */}
          <Button
            variant="outline"
            size="sm"
            className="h-10 gap-2"
            onClick={handleExportData}
          >
            <DownloadIcon className="w-4 h-4" />
            <span>Exporter</span>
          </Button>
          
          {/* Add job button */}
          <Button
            size="sm"
            className="h-10 gap-2 bg-blue-600 hover:bg-blue-700"
            onClick={handleAddJob}
          >
            <PlusIcon className="w-4 h-4" />
            <span>Ajouter un emploi</span>
          </Button>
        </div>
      </div>
      
      {/* Advanced Filter Panel */}
      {showFilters && (
        <Card className="p-6 mb-4 bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-sm font-semibold text-slate-800">Filtres Avancés</h3>
            {activeFiltersCount > 0 && (
              <Badge className="bg-blue-100 text-blue-700 text-xs">
                {activeFiltersCount} actif{activeFiltersCount > 1 ? 's' : ''}
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-3 sm:gap-y-4">
            <div className="space-y-3 sm:space-y-4">
              <Accordion type="single" collapsible>
                {/* 1. Entreprise */}
                <AccordionItem value="company" className="border border-slate-200 rounded-lg px-4">
                  <AccordionTrigger className="text-sm font-medium hover:no-underline py-3">
                    <div className="flex items-center gap-2">
                      <span>Entreprise</span>
                      {filters.company.trim() !== '' && (
                        <Badge className="bg-blue-100 text-blue-700 text-xs h-5">✓</Badge>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4">
                    <Label className="text-xs font-medium text-slate-600 mb-2 block">Nom de l'entreprise</Label>
                    <Input
                      type="text"
                      placeholder="Ex: Google, Microsoft..."
                      value={filters.company}
                      onChange={(e) => handleFilterChange('company', e.target.value)}
                      className="h-9 text-sm"
                    />
                    <div className="text-xs text-slate-500 mt-2">
                      Rechercher par nom d'entreprise
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* 2. Programme & Niveau */}
                <AccordionItem value="program-level" className="border border-slate-200 rounded-lg px-4">
              <AccordionTrigger className="text-sm font-medium hover:no-underline py-3">
                <div className="flex items-center gap-2">
                  <span>Programme & Niveau</span>
                  {(filters.programs.length > 0 || filters.levels.length > 0) && (
                    <Badge className="bg-blue-100 text-blue-700 text-xs h-5">
                      {filters.programs.length + filters.levels.length}
                    </Badge>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4 space-y-4">
                <div>
                  <Label className="text-xs font-medium text-slate-600 mb-2 block">Programme</Label>
                  <div className="space-y-2">
                    {['Informatique', 'Administration des affaires', 'Science des données', 'Ingénierie', 'Marketing'].map(program => (
                      <label key={program} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.programs.includes(program)}
                          onChange={() => handleCheckboxToggle('programs', program)}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                        />
                        <span className="text-sm text-slate-700">{program}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-xs font-medium text-slate-600 mb-2 block">Niveau / Année</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {['L1', 'L2', 'L3', 'M1', 'M2'].map(level => (
                      <label key={level} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.levels.includes(level)}
                          onChange={() => handleCheckboxToggle('levels', level)}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                        />
                        <span className="text-sm text-slate-700">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* 3. Performance Académique */}
            <AccordionItem value="academic" className="border border-slate-200 rounded-lg px-4">
              <AccordionTrigger className="text-sm font-medium hover:no-underline py-3">
                <div className="flex items-center gap-2">
                  <span>Performance Académique</span>
                  {(filters.gpaMin !== null || filters.gpaMax !== null || filters.creditsMin !== null) && (
                    <Badge className="bg-blue-100 text-blue-700 text-xs h-5">✓</Badge>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4 space-y-4">
                <div>
                  <Label className="text-xs font-medium text-slate-600 mb-2 block">Moyenne / GPA</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      type="number"
                      placeholder="Min (ex: 12)"
                      value={filters.gpaMin ?? ''}
                      onChange={(e) => handleFilterChange('gpaMin', e.target.value ? parseFloat(e.target.value) : null)}
                      className="h-9 text-sm"
                      min="0"
                      max="20"
                      step="0.1"
                    />
                    <Input
                      type="number"
                      placeholder="Max (ex: 18)"
                      value={filters.gpaMax ?? ''}
                      onChange={(e) => handleFilterChange('gpaMax', e.target.value ? parseFloat(e.target.value) : null)}
                      className="h-9 text-sm"
                      min="0"
                      max="20"
                      step="0.1"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs font-medium text-slate-600 mb-2 block">Crédits ECTS validés (min)</Label>
                  <Input
                    type="number"
                    placeholder="Ex: 120"
                    value={filters.creditsMin ?? ''}
                    onChange={(e) => handleFilterChange('creditsMin', e.target.value ? parseInt(e.target.value) : null)}
                    className="h-9 text-sm"
                    min="0"
                    step="30"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* 4. Démographie & Origine */}
            <AccordionItem value="demographics" className="border border-slate-200 rounded-lg px-4">
              <AccordionTrigger className="text-sm font-medium hover:no-underline py-3">
                <div className="flex items-center gap-2">
                  <span>Démographie & Origine</span>
                  {(filters.countries.length > 0 || filters.cities.length > 0 || filters.originSchoolTypes.length > 0) && (
                    <Badge className="bg-blue-100 text-blue-700 text-xs h-5">
                      {filters.countries.length + filters.cities.length + filters.originSchoolTypes.length}
                    </Badge>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4 space-y-4">
                <div>
                  <Label className="text-xs font-medium text-slate-600 mb-2 block">Pays d'origine</Label>
                  <div className="space-y-2">
                    {['France', 'Belgique', 'Suisse', 'Canada', 'Autres'].map(country => (
                      <label key={country} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.countries.includes(country)}
                          onChange={() => handleCheckboxToggle('countries', country)}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                        />
                        <span className="text-sm text-slate-700">{country}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-xs font-medium text-slate-600 mb-2 block">Type d'établissement d'origine</Label>
                  <div className="space-y-2">
                    {['École de Commerce', 'École d\'Ingénieurs', 'Université', 'IUT/BTS'].map(type => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.originSchoolTypes.includes(type)}
                          onChange={() => handleCheckboxToggle('originSchoolTypes', type)}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                        />
                        <span className="text-sm text-slate-700">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* 5. Rémunération */}
            <AccordionItem value="salary" className="border border-slate-200 rounded-lg px-4">
              <AccordionTrigger className="text-sm font-medium hover:no-underline py-3">
                <div className="flex items-center gap-2">
                  <span>Rémunération</span>
                  {(filters.salaryMin !== null || filters.salaryMax !== null) && (
                    <Badge className="bg-blue-100 text-blue-700 text-xs h-5">✓</Badge>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4 space-y-3">
                <Label className="text-xs font-medium text-slate-600 mb-2 block">Fourchette de salaire annuel (€)</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="number"
                    placeholder="Min (ex: 35000)"
                    value={filters.salaryMin ?? ''}
                    onChange={(e) => handleFilterChange('salaryMin', e.target.value ? parseInt(e.target.value) : null)}
                    className="h-9 text-sm"
                    min="0"
                    step="5000"
                  />
                  <Input
                    type="number"
                    placeholder="Max (ex: 80000)"
                    value={filters.salaryMax ?? ''}
                    onChange={(e) => handleFilterChange('salaryMax', e.target.value ? parseInt(e.target.value) : null)}
                    className="h-9 text-sm"
                    min="0"
                    step="5000"
                  />
                </div>
                <div className="text-xs text-slate-500 mt-2">
                  Filtrer par salaire minimum de la fourchette affichée
                </div>
              </AccordionContent>
            </AccordionItem>
              </Accordion>
            </div>

            {/* Colonne de droite */}
            <div className="space-y-3 sm:space-y-4">
              <Accordion type="single" collapsible>
            {/* 6. Statut d'Emploi */}
            <AccordionItem value="employment" className="border border-slate-200 rounded-lg px-4">
              <AccordionTrigger className="text-sm font-medium hover:no-underline py-3">
                <div className="flex items-center gap-2">
                  <span>Statut d'Emploi</span>
                  {(filters.employmentStatus.length > 0 || filters.jobSearchStatus.length > 0) && (
                    <Badge className="bg-blue-100 text-blue-700 text-xs h-5">
                      {filters.employmentStatus.length + filters.jobSearchStatus.length}
                    </Badge>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4 space-y-4">
                <div>
                  <Label className="text-xs font-medium text-slate-600 mb-2 block">Type de contrat</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Stage', 'Alternance', 'CDI', 'CDD'].map(status => (
                      <label key={status} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.employmentStatus.includes(status)}
                          onChange={() => handleCheckboxToggle('employmentStatus', status)}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                        />
                        <span className="text-sm text-slate-700">{status}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-xs font-medium text-slate-600 mb-2 block">Statut de recherche</Label>
                  <div className="space-y-2">
                    {['En recherche active', 'En poste', 'Ouvert aux opportunités'].map(status => (
                      <label key={status} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.jobSearchStatus.includes(status)}
                          onChange={() => handleCheckboxToggle('jobSearchStatus', status)}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                        />
                        <span className="text-sm text-slate-700">{status}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* 7. Localisation de l'Emploi */}
            <AccordionItem value="location" className="border border-slate-200 rounded-lg px-4">
              <AccordionTrigger className="text-sm font-medium hover:no-underline py-3">
                <div className="flex items-center gap-2">
                  <span>Localisation de l'Emploi</span>
                  {(filters.jobCountries.length > 0 || filters.jobRegions.length > 0 || filters.workModes.length > 0) && (
                    <Badge className="bg-blue-100 text-blue-700 text-xs h-5">
                      {filters.jobCountries.length + filters.jobRegions.length + filters.workModes.length}
                    </Badge>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4 space-y-4">
                <div>
                  <Label className="text-xs font-medium text-slate-600 mb-2 block">Pays</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {['France', 'UK', 'Germany', 'Ireland', 'Switzerland', 'Netherlands'].map(country => (
                      <label key={country} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.jobCountries.includes(country)}
                          onChange={() => handleCheckboxToggle('jobCountries', country)}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                        />
                        <span className="text-sm text-slate-700">{country}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-xs font-medium text-slate-600 mb-2 block">Mode de travail</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Remote', 'Hybride', 'Présentiel'].map(mode => (
                      <label key={mode} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.workModes.includes(mode)}
                          onChange={() => handleCheckboxToggle('workModes', mode)}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                        />
                        <span className="text-sm text-slate-700">{mode}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* 8. Secteur et Fonction */}
            <AccordionItem value="sector" className="border border-slate-200 rounded-lg px-4">
              <AccordionTrigger className="text-sm font-medium hover:no-underline py-3">
                <div className="flex items-center gap-2">
                  <span>Secteur et Fonction</span>
                  {(filters.sectors.length > 0 || filters.functions.length > 0) && (
                    <Badge className="bg-blue-100 text-blue-700 text-xs h-5">
                      {filters.sectors.length + filters.functions.length}
                    </Badge>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4 space-y-4">
                <div>
                  <Label className="text-xs font-medium text-slate-600 mb-2 block">Secteur d'activité</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Tech / IT', 'Finance', 'Conseil', 'Industrie', 'Santé', 'Retail'].map(sector => (
                      <label key={sector} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.sectors.includes(sector)}
                          onChange={() => handleCheckboxToggle('sectors', sector)}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                        />
                        <span className="text-sm text-slate-700">{sector}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-xs font-medium text-slate-600 mb-2 block">Fonction / Rôle</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Développeur', 'Manager', 'Analyste', 'Ingénieur', 'Marketing', 'Designer'].map(func => (
                      <label key={func} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.functions.includes(func)}
                          onChange={() => handleCheckboxToggle('functions', func)}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                        />
                        <span className="text-sm text-slate-700">{func}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* 9. Statut de candidature */}
            <AccordionItem value="application-status" className="border border-slate-200 rounded-lg px-4">
              <AccordionTrigger className="text-sm font-medium hover:no-underline py-3">
                <div className="flex items-center gap-2">
                  <span>Statut</span>
                  {filters.applicationStatus.length > 0 && (
                    <Badge className="bg-blue-100 text-blue-700 text-xs h-5">
                      {filters.applicationStatus.length}
                    </Badge>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4">
                <Label className="text-xs font-medium text-slate-600 mb-2 block">Statut de la candidature</Label>
                <div className="space-y-2">
                  {['Entretien', 'Offre', 'Rejeté', 'Postulé'].map(status => (
                    <label key={status} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.applicationStatus.includes(status)}
                        onChange={() => handleCheckboxToggle('applicationStatus', status)}
                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                      />
                      <span className="text-sm text-slate-700">{status}</span>
                    </label>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
              </Accordion>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-200">
            <div className="text-sm text-slate-600">
              <span className="font-medium">{filteredApplications.length}</span> résultat{filteredApplications.length > 1 ? 's' : ''}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetFilters}
              >
                Réinitialiser filtres
              </Button>
            </div>
          </div>
        </Card>
      )}
      
      {/* Main table */}
      <div className="flex-1 overflow-hidden flex">
        <div 
          ref={tableRef}
          className="flex-1 overflow-auto rounded-lg border border-slate-200 bg-white"
        >
          <Table>
            <TableHeader className="bg-slate-50 sticky top-0 z-10">
              <TableRow className="hover:bg-slate-50">
                <TableHead className="w-[250px] font-semibold text-xs">
                  <button 
                    className="flex items-center gap-1 hover:text-blue-600"
                    onClick={() => handleSortClick("student.name")}
                  >
                    Étudiant {getSortIcon("student.name")}
                  </button>
                </TableHead>
                <TableHead className="w-[180px] font-semibold text-xs">
                  <button 
                    className="flex items-center gap-1 hover:text-blue-600"
                    onClick={() => handleSortClick("company.name")}
                  >
                    Entreprise {getSortIcon("company.name")}
                  </button>
                </TableHead>
                <TableHead className="w-[180px] font-semibold text-xs">
                  <button 
                    className="flex items-center gap-1 hover:text-blue-600"
                    onClick={() => handleSortClick("position")}
                  >
                    Poste {getSortIcon("position")}
                  </button>
                </TableHead>
                <TableHead className="w-[120px] font-semibold text-xs">
                  <button 
                    className="flex items-center gap-1 hover:text-blue-600"
                    onClick={() => handleSortClick("status.label")}
                  >
                    Statut {getSortIcon("status.label")}
                  </button>
                </TableHead>
                <TableHead className="w-[120px] font-semibold text-xs">
                  <button
                    className="flex items-center gap-1 hover:text-blue-600"
                    onClick={() => handleSortClick("appliedDate")}
                  >
                    Postulé {getSortIcon("appliedDate")}
                  </button>
                </TableHead>
                <TableHead className="w-[200px] font-semibold text-xs">
                  <button 
                    className="flex items-center gap-1 hover:text-blue-600"
                    onClick={() => handleSortClick("nextActionDate")}
                  >
                    Prochaine action {getSortIcon("nextActionDate")}
                  </button>
                </TableHead>
                <TableHead className="w-[100px] font-semibold text-xs">
                  <button 
                    className="flex items-center gap-1 hover:text-blue-600"
                    onClick={() => handleSortClick("priority")}
                  >
                    Priorité {getSortIcon("priority")}
                  </button>
                </TableHead>
                <TableHead className="w-[80px] font-semibold text-xs text-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((application) => (
                <TableRow 
                  key={application.id}
                  className="hover:bg-slate-50 cursor-pointer"
                  onClick={() => handleRowClick(application)}
                >
                  {/* Student */}
                  <TableCell className="py-2">
                    <div className="flex items-center gap-3">
                      <Avatar
                        className={`w-8 h-8 rounded-md ${application.student.color}`}
                      >
                        {application.student.profilePhoto && (
                          <AvatarImage src={application.student.profilePhoto} alt={application.student.name} className="object-cover" />
                        )}
                        <AvatarFallback className="text-white text-xs font-medium">
                          {application.student.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm text-slate-800">
                          {application.student.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {application.student.program}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ml-auto"
                        onClick={(e) => handleViewStudentProfile(application.student.id, e)}
                      >
                        <ExternalLinkIcon className="h-3 w-3 text-slate-400" />
                      </Button>
                    </div>
                  </TableCell>
                  
                  {/* Company */}
                  <TableCell className="py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-slate-100 rounded-md flex items-center justify-center overflow-hidden">
                        <img 
                          src={application.company.logo} 
                          alt={application.company.name}
                          className="w-4 h-4 object-contain"
                          onError={(e) => {
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${application.company.name}&background=3b82f6&color=fff&size=16`;
                          }}
                        />
                      </div>
                      <span className="font-medium text-sm">{application.company.name}</span>
                    </div>
                  </TableCell>
                  
                  {/* Position */}
                  <TableCell className="py-2">
                    <div className="text-sm font-medium">{application.position}</div>
                    <div className="text-xs text-slate-500">{application.location}</div>
                  </TableCell>
                  
                  {/* Status */}
                  <TableCell className="py-2">
                    <Badge 
                      className={`px-2 py-1 text-xs font-medium ${statusColors[application.status.color]}`}
                    >
                      {application.status.label}
                    </Badge>
                  </TableCell>
                  
                  {/* Applied Date */}
                  <TableCell className="py-2">
                    <div className="text-sm">{formatDate(application.appliedDate)}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                      <ClockIcon className="w-3 h-3" />
                      Mise à jour {formatDate(application.updatedDate)}
                    </div>
                  </TableCell>

                  {/* Next Action */}
                  <TableCell className="py-2">
                    {isEditingCell?.rowId === application.id && isEditingCell?.field === "nextAction" ? (
                      <Input
                        value={editValue}
                        onChange={handleEditChange}
                        onBlur={handleEditSave}
                        onKeyDown={handleEditKeyPress}
                        className="h-7 text-xs"
                        autoFocus
                      />
                    ) : (
                      <div 
                        className={`text-sm ${isUpcoming(application.nextActionDate) ? 'font-medium text-blue-600' : ''}`}
                        onDoubleClick={() => handleCellDoubleClick(application, "nextAction")}
                      >
                        {application.nextAction}
                        <div className="text-xs text-slate-500 flex items-center gap-1">
                          <CalendarIcon className="w-3 h-3" />
                          {formatDate(application.nextActionDate)}
                        </div>
                      </div>
                    )}
                  </TableCell>
                  
                  {/* Priority */}
                  <TableCell className="py-2">
                    {isEditingCell?.rowId === application.id && isEditingCell?.field === "priority" ? (
                      <select
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleEditSave}
                        className="h-7 text-xs border border-slate-200 rounded-md"
                        autoFocus
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="critical">Critical</option>
                      </select>
                    ) : (
                      <Badge 
                        className={`px-2 py-1 text-xs font-medium ${priorityColors[application.priority as keyof typeof priorityColors]}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCellDoubleClick(application, "priority");
                        }}
                      >
                        {application.priority.charAt(0).toUpperCase() + application.priority.slice(1)}
                      </Badge>
                    )}
                  </TableCell>
                  
                  {/* Actions */}
                  <TableCell className="py-2 text-center">
                    <div className="flex justify-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 rounded-full hover:bg-red-50 hover:text-red-600"
                        onClick={(e) => handleDeleteApplication(application.id, e)}
                      >
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredApplications.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="h-32 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <SearchIcon className="h-8 w-8 text-slate-300 mb-2" />
                      <p className="text-slate-500 font-medium">No applications found</p>
                      <p className="text-slate-400 text-sm">Try adjusting your search or filters</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Detail panel (slide-in from right) */}
        {showDetailPanel && selectedApplication && (
          <div 
            ref={detailPanelRef}
            className="w-96 border-l border-slate-200 bg-white overflow-auto animate-slide-in"
          >
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-semibold text-slate-800">Application Details</h3>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 rounded-full"
                onClick={() => setShowDetailPanel(false)}
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="p-4">
              {/* Student info */}
              <div className="mb-6">
                <div className="text-xs font-medium text-slate-500 mb-2">STUDENT</div>
                <div className="flex items-center gap-3">
                  <Avatar
                    className={`w-10 h-10 rounded-lg ${selectedApplication.student.color}`}
                  >
                    {selectedApplication.student.profilePhoto && (
                      <AvatarImage src={selectedApplication.student.profilePhoto} alt={selectedApplication.student.name} className="object-cover" />
                    )}
                    <AvatarFallback className="text-white text-sm font-medium">
                      {selectedApplication.student.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-slate-800">
                      {selectedApplication.student.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {selectedApplication.student.program}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto h-8 text-xs"
                    onClick={() => handleViewStudentProfile(selectedApplication.student.id, new MouseEvent('click') as any)}
                  >
                    <UserIcon className="h-3 w-3 mr-1" />
                    View Profile
                  </Button>
                </div>
              </div>
              
              {/* Application details */}
              <div className="space-y-4">
                {/* Company and position */}
                <div>
                  <div className="text-xs font-medium text-slate-500 mb-2">COMPANY & POSITION</div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center overflow-hidden shadow-sm">
                      <img 
                        src={selectedApplication.company.logo} 
                        alt={selectedApplication.company.name}
                        className="w-6 h-6 object-contain"
                        onError={(e) => {
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${selectedApplication.company.name}&background=3b82f6&color=fff&size=24`;
                        }}
                      />
                    </div>
                    <div>
                      <div className="font-medium text-slate-800">
                        {selectedApplication.position}
                      </div>
                      <div className="text-xs text-slate-500">
                        {selectedApplication.company.name} • {selectedApplication.location}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Status and dates */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs font-medium text-slate-500 mb-2">STATUS</div>
                    <Badge 
                      className={`px-2 py-1 text-xs font-medium ${statusColors[selectedApplication.status.color]}`}
                    >
                      {selectedApplication.status.label}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-500 mb-2">APPLIED ON</div>
                    <div className="text-sm">{formatDate(selectedApplication.appliedDate)}</div>
                  </div>
                </div>
                
                {/* Salary and type */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs font-medium text-slate-500 mb-2">SALARY</div>
                    <div className="text-sm font-medium text-emerald-600">{selectedApplication.salary}</div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-500 mb-2">TYPE</div>
                    <div className="text-sm">{selectedApplication.type}</div>
                  </div>
                </div>
                
                {/* Description */}
                <div>
                  <div className="text-xs font-medium text-slate-500 mb-2">DESCRIPTION</div>
                  <div className="text-sm text-slate-700 p-3 bg-slate-50 rounded-lg">
                    {selectedApplication.description}
                  </div>
                </div>
                
                {/* Next action */}
                <div>
                  <div className="text-xs font-medium text-slate-500 mb-2">NEXT ACTION</div>
                  <div className={`text-sm p-3 rounded-lg ${
                    isUpcoming(selectedApplication.nextActionDate) 
                      ? 'bg-blue-50 text-blue-700 font-medium' 
                      : 'bg-slate-50 text-slate-700'
                  }`}>
                    {selectedApplication.nextAction}
                    <div className="text-xs mt-1 flex items-center gap-1">
                      <CalendarIcon className="w-3 h-3" />
                      {formatDate(selectedApplication.nextActionDate)}
                    </div>
                  </div>
                </div>
                
                {/* Documents */}
                <div>
                  <div className="text-xs font-medium text-slate-500 mb-2">DOCUMENTS</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                          <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <span className="text-sm">{selectedApplication.documents.cv}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <DownloadIcon className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
                          <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <span className="text-sm">{selectedApplication.documents.coverLetter}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <DownloadIcon className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="pt-4 flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                  >
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    Update Status
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};