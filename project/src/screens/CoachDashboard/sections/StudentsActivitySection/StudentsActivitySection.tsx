import {
  BellIcon,
  DownloadIcon,
  SearchIcon,
  UsersIcon,
  FileTextIcon,
  BarChart3Icon,
  StarIcon,
  ArrowUpIcon,
  CalendarIcon,
  ChevronDownIcon,
  InfoIcon,
} from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { studentProfiles, StudentProfile } from "../../../../data/studentProfiles";

interface StudentsActivitySectionProps {
  onStudentSearch: (query: string) => void;
}

// Cartes de statistiques avec hiérarchie visuelle améliorée
const statsCards = [
  {
    title: "Total Étudiants",
    value: "9,978",
    trend: "+12 ce mois",
    trendIcon: <ArrowUpIcon className="w-4 h-4" />,
    trendColor: "text-emerald-600",
    bgGradient: "bg-gradient-to-br from-blue-50 to-blue-100/50",
    iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
    icon: <UsersIcon className="w-6 h-6 text-white" />,
    valueColor: "text-blue-800",
  },
  {
    title: "Utilisateurs Actifs",
    value: "7,587",
    trend: "76% du total",
    trendColor: "text-slate-600",
    bgGradient: "bg-gradient-to-br from-violet-50 to-violet-100/50",
    iconBg: "bg-gradient-to-br from-violet-500 to-violet-600",
    icon: <StarIcon className="w-6 h-6 text-white" />,
    valueColor: "text-violet-800",
  },
  {
    title: "CV Générés",
    value: "14,654",
    trend: "+28% vs mois dernier",
    trendIcon: <ArrowUpIcon className="w-4 h-4" />,
    trendColor: "text-emerald-600",
    bgGradient: "bg-gradient-to-br from-emerald-50 to-emerald-100/50",
    iconBg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    icon: <FileTextIcon className="w-6 h-6 text-white" />,
    valueColor: "text-emerald-800",
  },
];

// Données du graphique pour l'activité étudiante
const chartData = {
  jobApplications: [
    { date: "1 Avr", value: 12 },
    { date: "5 Avr", value: 18 },
    { date: "10 Avr", value: 15 },
    { date: "15 Avr", value: 25 },
    { date: "20 Avr", value: 20 },
    { date: "25 Avr", value: 22 },
    { date: "30 Avr", value: 18 },
  ],
  jobOffers: [
    { date: "1 Avr", value: 5 },
    { date: "5 Avr", value: 7 },
    { date: "10 Avr", value: 4 },
    { date: "15 Avr", value: 9 },
    { date: "20 Avr", value: 11 },
    { date: "25 Avr", value: 10 },
    { date: "30 Avr", value: 8 },
  ]
};

export const StudentsActivitySection = ({ onStudentSearch }: StudentsActivitySectionProps): JSX.Element => {
  const [searchInput, setSearchInput] = useState("");
  const [timeRange, setTimeRange] = useState<string>("30days");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredStudents, setFilteredStudents] = useState<StudentProfile[]>(studentProfiles);
  const [showTimeRangeDropdown, setShowTimeRangeDropdown] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<{series: string, index: number} | null>(null);
  
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const timeRangeDropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
      if (timeRangeDropdownRef.current && !timeRangeDropdownRef.current.contains(event.target as Node)) {
        setShowTimeRangeDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    const query = e.target.value.toLowerCase().trim();
    
    if (query === '') {
      setFilteredStudents([]);
      setShowDropdown(false);
    } else {
      const filtered = studentProfiles.filter(student =>
        student.id.toString().toLowerCase().includes(query) ||
        student.name.toLowerCase().includes(query) ||
        student.program.toLowerCase().includes(query)
      );
      setFilteredStudents(filtered);
      setShowDropdown(true);
    }
  };

  const handleStudentClick = (studentId: number) => {
    onStudentSearch(studentId.toString());
  };

  const handleNotificationsClick = () => {
    console.log("Opening notifications panel");
  };

  const handleExportClick = () => {
    console.log("Exporting student data");
  };

  const handleTimeRangeChange = (range: string) => {
    console.log("Changing time range to:", range);
    setTimeRange(range);
    setShowTimeRangeDropdown(false);
  };

  // Function to calculate chart point positions
  const calculateChartPosition = (value: number, maxValue: number, height: number, topPadding: number) => {
    const maxHeight = height - topPadding * 2;
    return topPadding + maxHeight - (value / maxValue) * maxHeight;
  };

  // Get max value for scaling
  const maxApplicationValue = Math.max(...chartData.jobApplications.map(d => d.value));
  const maxOfferValue = Math.max(...chartData.jobOffers.map(d => d.value));
  const maxValue = Math.max(maxApplicationValue, maxOfferValue);

  // Chart dimensions - compacted for single screen view
  const chartHeight = 200;
  const chartTopPadding = 30;
  const chartWidth = 600;
  const pointRadius = 3;

  // Calculate positions for the chart
  const applicationPoints = chartData.jobApplications.map((point, index) => {
    const x = (index / (chartData.jobApplications.length - 1)) * chartWidth;
    const y = calculateChartPosition(point.value, maxValue, chartHeight, chartTopPadding);
    return { x, y, ...point };
  });

  const offerPoints = chartData.jobOffers.map((point, index) => {
    const x = (index / (chartData.jobOffers.length - 1)) * chartWidth;
    const y = calculateChartPosition(point.value, maxValue, chartHeight, chartTopPadding);
    return { x, y, ...point };
  });

  // Generate SVG path for lines
  const generateLinePath = (points: { x: number, y: number }[]) => {
    return points.map((point, i) => 
      (i === 0 ? `M ${point.x},${point.y}` : `L ${point.x},${point.y}`)
    ).join(' ');
  };

  const applicationLinePath = generateLinePath(applicationPoints);
  const offerLinePath = generateLinePath(offerPoints);

  // Options de plage temporelle
  const timeRangeOptions = [
    { value: "7days", label: "7 Derniers Jours" },
    { value: "30days", label: "30 Derniers Jours" },
    { value: "90days", label: "90 Derniers Jours" },
    { value: "thisMonth", label: "Ce Mois" },
    { value: "lastMonth", label: "Mois Dernier" },
    { value: "custom", label: "Période Personnalisée" },
  ];

  return (
    <section className="flex flex-col gap-4 p-6 w-full bg-gradient-to-br from-slate-50 to-white h-screen overflow-hidden">
      {/* Enhanced Header */}
      <header className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
              <BarChart3Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-slate-800 text-2xl tracking-tight">Tableau de Bord Coach</h1>
              <p className="text-slate-600 text-sm font-medium">Suivez la progression et l'engagement des étudiants</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              className="w-72 h-10 pl-10 pr-3 py-0 bg-white/80 backdrop-blur-sm rounded-xl border-0 ring-1 ring-slate-200/60 placeholder:text-slate-400 text-sm focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-200"
              placeholder="Rechercher par ID, nom, ou programme..."
              value={searchInput}
              onChange={handleSearchChange}
            />
            {showDropdown && filteredStudents.length > 0 && (
              <div 
                ref={dropdownRef}
                className="absolute z-10 w-full mt-2 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border-0 ring-1 ring-slate-200/60 max-h-[300px] overflow-y-auto"
              >
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center gap-3 p-4 hover:bg-blue-50/50 cursor-pointer transition-all duration-200 first:rounded-t-2xl last:rounded-b-2xl"
                    onClick={() => {
                      handleStudentClick(student.id);
                      setShowDropdown(false);
                      setSearchInput("");
                    }}
                  >
                    <Avatar
                      className={`w-10 h-10 rounded-2xl ${student.avatarGradient} shadow-sm`}
                    >
                      {student.profilePhoto && (
                        <AvatarImage src={student.profilePhoto} alt={student.name} className="object-cover" />
                      )}
                      <AvatarFallback className="text-white text-sm font-semibold">
                        {student.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-800 text-sm tracking-tight">
                        {student.name}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {student.id} • {student.program}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="w-10 h-10 rounded-xl border-0 bg-white/80 backdrop-blur-sm shadow-sm ring-1 ring-slate-200/60 hover:bg-white hover:ring-blue-500/20 transition-all duration-200"
            onClick={handleNotificationsClick}
          >
            <BellIcon className="w-4 h-4 text-slate-600" />
          </Button>

          <Button
            variant="outline"
            className="h-10 gap-2 px-4 py-0 rounded-xl border-0 bg-white/80 backdrop-blur-sm shadow-sm ring-1 ring-slate-200/60 hover:bg-white hover:ring-blue-500/20 transition-all duration-200"
            onClick={handleExportClick}
          >
            <DownloadIcon className="w-4 h-4 text-slate-600" />
            <span className="font-semibold text-slate-700 text-sm">Exporter</span>
          </Button>
        </div>
      </header>

      {/* Enhanced KPI Cards */}
      <div className="grid grid-cols-3 gap-4 w-full">
        {statsCards.map((card, index) => (
          <Card
            key={index}
            className={`rounded-2xl shadow-sm border-0 ring-1 ring-slate-200/60 hover:shadow-md hover:ring-blue-500/20 transition-all duration-300 ${card.bgGradient}`}
          >
            <CardContent className="flex flex-col h-[100px] justify-between p-5">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="font-semibold text-slate-600 text-xs tracking-tight uppercase">{card.title}</p>
                  <p className={`font-bold text-2xl tracking-tight ${card.valueColor}`}>
                    {card.value}
                  </p>
                </div>
                <div className={`w-11 h-11 rounded-xl ${card.iconBg} flex items-center justify-center shadow-sm`}>
                  {React.cloneElement(card.icon, { className: "w-5 h-5 text-white" })}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Student Activity Chart */}
      <Card className="rounded-2xl shadow-sm border-0 ring-1 ring-slate-200/60 hover:shadow-md transition-all duration-300 bg-white/80 backdrop-blur-sm overflow-hidden">
        <CardHeader className="pb-2 pt-4 px-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-slate-800 text-lg font-semibold tracking-tight">
                Aperçu de l'Activité Étudiante
              </CardTitle>
              <div
                className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer hover:bg-slate-200 transition-colors duration-200"
                title="Affiche la tendance des candidatures et offres d'emploi au fil du temps"
              >
                <InfoIcon className="w-3 h-3 text-slate-500" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative" ref={timeRangeDropdownRef}>
                <Button
                  variant="secondary"
                  className="h-8 px-3 py-0 rounded-xl bg-white border-0 ring-1 ring-slate-200/60 hover:ring-blue-500/20 transition-all duration-200 flex items-center gap-2 text-xs"
                  onClick={() => setShowTimeRangeDropdown(!showTimeRangeDropdown)}
                >
                  <CalendarIcon className="w-3 h-3 text-blue-600" />
                  <span className="font-semibold text-slate-700">
                    {timeRangeOptions.find(option => option.value === timeRange)?.label || "30 Derniers Jours"}
                  </span>
                  <ChevronDownIcon className="w-3 h-3 text-slate-500" />
                </Button>
                
                {showTimeRangeDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border-0 ring-1 ring-slate-200/60 z-10">
                    {timeRangeOptions.map((option) => (
                      <div
                        key={option.value}
                        className={`px-4 py-3 cursor-pointer hover:bg-blue-50/50 transition-colors duration-200 ${
                          option.value === timeRange ? "bg-blue-50 text-blue-700 font-semibold" : "text-slate-700"
                        } ${option.value === timeRangeOptions[0].value ? "rounded-t-2xl" : ""} ${
                          option.value === timeRangeOptions[timeRangeOptions.length - 1].value ? "rounded-b-2xl" : ""
                        }`}
                        onClick={() => handleTimeRangeChange(option.value)}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button
                variant="secondary"
                size="icon"
                className="w-8 h-8 rounded-xl bg-white border-0 ring-1 ring-slate-200/60 hover:ring-blue-500/20 transition-all duration-200"
                onClick={handleExportClick}
              >
                <DownloadIcon className="w-3 h-3 text-blue-600" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pb-4 px-5">
          <div className="relative bg-gradient-to-br from-slate-50 to-white rounded-xl p-4 h-[400px] overflow-hidden">
            {/* Chart Grid */}
            <div className="absolute inset-0 p-4">
              {/* Horizontal grid lines */}
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="absolute w-full h-px bg-slate-200/60"
                  style={{ top: `${chartTopPadding + i * (chartHeight - chartTopPadding * 2) / 4}px` }}
                />
              ))}

              {/* Vertical grid lines */}
              {chartData.jobApplications.map((_, index) => (
                <div
                  key={index}
                  className="absolute h-full w-px bg-slate-200/60"
                  style={{
                    left: `${(index / (chartData.jobApplications.length - 1)) * chartWidth + 12}px`,
                    display: index === 0 || index === chartData.jobApplications.length - 1 ? 'none' : 'block'
                  }}
                />
              ))}

              {/* X-axis labels */}
              {chartData.jobApplications.map((point, index) => (
                <div
                  key={index}
                  className="absolute text-[10px] font-medium text-slate-500"
                  style={{
                    left: `${(index / (chartData.jobApplications.length - 1)) * chartWidth + 12}px`,
                    bottom: '0px',
                    transform: 'translateX(-50%)'
                  }}
                >
                  {point.date}
                </div>
              ))}

              {/* Y-axis labels */}
              {[0, maxValue / 4, maxValue / 2, (maxValue * 3) / 4, maxValue].map((value, i) => (
                <div
                  key={i}
                  className="absolute text-[10px] font-medium text-slate-500"
                  style={{
                    left: '0px',
                    top: `${chartTopPadding + i * (chartHeight - chartTopPadding * 2) / 4}px`,
                    transform: 'translateY(-50%)'
                  }}
                >
                  {Math.round(maxValue - value)}
                </div>
              ))}
            </div>

            {/* Enhanced Chart Legend */}
            <div className="absolute top-0 left-10 flex items-center gap-4 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-b-lg shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded shadow-sm" />
                <span className="font-semibold text-slate-700 text-xs">Candidatures</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-violet-500 to-violet-600 rounded shadow-sm" />
                <span className="font-semibold text-slate-700 text-xs">Offres d'Emploi</span>
              </div>
            </div>

            {/* SVG Chart */}
            <svg width={chartWidth + 24} height={chartHeight} className="relative z-10">
              {/* Application line */}
              <path
                d={applicationLinePath}
                fill="none"
                stroke="url(#blueGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-sm"
              />

              {/* Offer line */}
              <path
                d={offerLinePath}
                fill="none"
                stroke="url(#violetGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-sm"
              />
              
              {/* Application points */}
              {applicationPoints.map((point, index) => (
                <g key={`app-${index}`}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={pointRadius}
                    fill="white"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    className="drop-shadow-sm cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredPoint({ series: 'applications', index })}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                  {hoveredPoint && hoveredPoint.series === 'applications' && hoveredPoint.index === index && (
                    <g>
                      <rect
                        x={point.x - 35}
                        y={point.y - 35}
                        width="70"
                        height="25"
                        rx="4"
                        fill="white"
                        stroke="#e2e8f0"
                        strokeWidth="1"
                        className="drop-shadow-md"
                      />
                      <text
                        x={point.x}
                        y={point.y - 18}
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="600"
                        fill="#1e40af"
                      >
                        {point.value} cand.
                      </text>
                    </g>
                  )}
                </g>
              ))}
              
              {/* Offer points */}
              {offerPoints.map((point, index) => (
                <g key={`offer-${index}`}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={pointRadius}
                    fill="white"
                    stroke="#8b5cf6"
                    strokeWidth="2"
                    className="drop-shadow-sm cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredPoint({ series: 'offers', index })}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                  {hoveredPoint && hoveredPoint.series === 'offers' && hoveredPoint.index === index && (
                    <g>
                      <rect
                        x={point.x - 35}
                        y={point.y - 35}
                        width="70"
                        height="25"
                        rx="4"
                        fill="white"
                        stroke="#e2e8f0"
                        strokeWidth="1"
                        className="drop-shadow-md"
                      />
                      <text
                        x={point.x}
                        y={point.y - 18}
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="600"
                        fill="#7c3aed"
                      >
                        {point.value} offres
                      </text>
                    </g>
                  )}
                </g>
              ))}
              
              {/* Gradients */}
              <defs>
                <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
                <linearGradient id="violetGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};