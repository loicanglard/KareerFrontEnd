import {
  ArrowLeftIcon,
  BellIcon,
  DownloadIcon,
  FilterIcon,
  SearchIcon,
  UserIcon,
  BookOpenIcon,
  BriefcaseIcon,
  FolderIcon,
  GraduationCapIcon,
  PhoneIcon,
  CalendarIcon,
  LinkedinIcon,
  GlobeIcon,
  StarIcon,
  AwardIcon,
  TrendingUpIcon,
  ChevronRightIcon,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { studentProfiles } from "../../../../data/studentProfiles";

interface DashboardSectionProps {
  studentId: string;
  onBack: () => void;
  onStudentSearch: (query: string) => void;
}

export const DashboardSection = ({ studentId, onBack, onStudentSearch }: DashboardSectionProps): JSX.Element => {
  // Find the student data based on the ID
  const student = studentProfiles.find(s => s.id === studentId);
  const [activeTab, setActiveTab] = useState("overview");
  
  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-slate-50 to-white">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mx-auto">
            <UserIcon className="w-10 h-10 text-slate-400" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-800">Étudiant non trouvé</h2>
            <p className="text-slate-600 max-w-md">Aucun étudiant trouvé avec l'ID : {studentId}</p>
          </div>
          <Button 
            onClick={onBack}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-2xl px-8"
          >
            Retour
          </Button>
        </div>
      </div>
    );
  }

  const [searchInput, setSearchInput] = useState(studentId);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredStudents, setFilteredStudents] = useState(studentProfiles);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  
  // Define tabs for navigation
  const tabs = [
    { id: "overview", label: "Aperçu", icon: <StarIcon className="w-4 h-4" /> },
    { id: "education", label: "Formation", icon: <BookOpenIcon className="w-4 h-4" /> },
    { id: "projects", label: "Projets", icon: <FolderIcon className="w-4 h-4" /> },
    { id: "experience", label: "Expérience", icon: <BriefcaseIcon className="w-4 h-4" /> },
    { id: "courses", label: "Cours Supplémentaires", icon: <AwardIcon className="w-4 h-4" /> }
  ];

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationsClick = () => {
    console.log("Opening notifications panel");
  };

  const handleExportClick = () => {
    console.log("Exporting student data");
  };

  const handleFilterClick = () => {
    console.log("Opening filter options");
  };

  const handleMoreOptionsClick = (itemType: string, itemName: string) => {
    console.log(`Opening more options for ${itemType}: ${itemName}`);
  };

  return (
    <div className="flex flex-col h-full items-start gap-8 p-8 relative flex-1 grow bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Enhanced Header */}
      <header className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto] bg-transparent">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onBack}
            className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm ring-1 ring-slate-200/60 hover:bg-white hover:ring-blue-500/20 transition-all duration-200"
          >
            <ArrowLeftIcon className="w-5 h-5 text-slate-600" />
          </Button>
          <div>
            <h1 className="font-bold text-slate-800 text-3xl tracking-tight">
              Profil Étudiant
            </h1>
            <p className="text-slate-600 text-base font-medium">
              Vue détaillée des informations académiques et professionnelles de {student.name.split(' ')[0]}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex items-center gap-2 px-4 py-0 bg-white/80 backdrop-blur-sm rounded-2xl border-0 ring-1 ring-slate-200/60 h-12">
            <SearchIcon className="w-5 h-5 text-slate-400" />
            <Input
              className="border-0 h-full p-0 text-sm text-slate-700 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent font-medium" 
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                const query = e.target.value.toLowerCase().trim();
                if (query !== '') {
                  const filtered = studentProfiles.filter(s => 
                    s.id.toLowerCase().includes(query) || 
                    s.name.toLowerCase().includes(query)
                  ).slice(0, 5);
                  setFilteredStudents(filtered);
                  setShowDropdown(true);
                } else {
                  setShowDropdown(false);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const query = searchInput.trim().toLowerCase();
                  const student = studentProfiles.find(student => 
                    student.id.toLowerCase() === query || 
                    student.name.toLowerCase().includes(query)
                  );
                  if (student) {
                    onBack();
                    onStudentSearch(student.id);
                  } else {
                    alert(`Aucun étudiant trouvé correspondant à "${searchInput.trim()}"`);
                  }
                }
              }}
              placeholder="Rechercher par ID ou nom..."
            />
            {showDropdown && filteredStudents.length > 0 && (
              <div 
                ref={dropdownRef}
                className="absolute z-10 w-[320px] mt-2 top-full left-0 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border-0 ring-1 ring-slate-200/60 max-h-[300px] overflow-y-auto"
              >
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center gap-3 p-4 hover:bg-blue-50/50 cursor-pointer transition-all duration-200 first:rounded-t-2xl last:rounded-b-2xl"
                    onClick={() => {
                      onBack();
                      onStudentSearch(student.id);
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
            className="w-12 h-12 rounded-2xl border-0 bg-white/80 backdrop-blur-sm shadow-sm ring-1 ring-slate-200/60 hover:bg-white hover:ring-blue-500/20 transition-all duration-200"
            onClick={handleNotificationsClick}
          >
            <BellIcon className="w-5 h-5 text-slate-600" />
          </Button>

          <Button
            variant="outline"
            className="h-12 gap-2 px-6 py-0 rounded-2xl border-0 bg-white/80 backdrop-blur-sm shadow-sm ring-1 ring-slate-200/60 hover:bg-white hover:ring-blue-500/20 transition-all duration-200"
            onClick={handleExportClick}
          >
            <DownloadIcon className="w-5 h-5 text-slate-600" />
            <span className="font-semibold text-slate-700 text-sm">Exporter</span>
          </Button>

          <Button
            variant="outline"
            className="h-12 gap-2 px-6 py-0 rounded-2xl border-0 bg-white/80 backdrop-blur-sm shadow-sm ring-1 ring-slate-200/60 hover:bg-white hover:ring-blue-500/20 transition-all duration-200"
            onClick={handleFilterClick}
          >
            <FilterIcon className="w-5 h-5 text-slate-600" />
            <span className="font-semibold text-slate-700 text-sm">Filtrer</span>
          </Button>
        </div>
      </header>

      {/* Profile Header Card - Matching Profile.tsx style */}
      <Card className="w-full mb-8 overflow-hidden border-0 ring-1 ring-slate-200/60 rounded-3xl shadow-sm">
        <div className="h-32 relative">
          <img
            src="/image-copy-2.png"
            alt="University Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
        </div>
        <CardContent className="relative pt-0 pb-6">
          <div className="flex items-start gap-6 -mt-12">
            <Avatar className={`w-32 h-32 border-4 border-white shadow-lg ${student.avatarGradient}`}>
              {student.profilePhoto && (
                <AvatarImage src={student.profilePhoto} alt={student.name} className="object-cover" />
              )}
              <AvatarFallback className="text-white text-3xl font-bold">
                {student.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 mt-16">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-slate-800 mb-2">{student.name}</h2>
                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCapIcon className="w-5 h-5 text-blue-600" />
                    <span className="text-lg text-blue-600 font-medium">{student.program}</span>
                  </div>
                  <p className="text-slate-700 max-w-3xl leading-relaxed text-base mb-4">
                    Student at {student.education[0].institution} with a focus on {student.program}. 
                    Currently pursuing {student.education[0].degree}.
                  </p>
                  
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-300"
                        style={{ width: `${student.status.label === "Complete" ? "100" : student.status.label === "In Progress" ? "75" : "50"}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-slate-800">
                      {student.status.label === "Complete" ? "100" : student.status.label === "In Progress" ? "75" : "50"}% Complete
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Contact Information Grid - Matching Profile.tsx style */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Phone */}
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <PhoneIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">TÉLÉPHONE</div>
                    <div className="text-sm font-medium text-slate-800">{student.phone}</div>
                  </div>
                </div>
                
                {/* Birthdate */}
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <CalendarIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">DATE DE NAISSANCE</div>
                    <div className="text-sm font-medium text-slate-800">{student.birthdate}</div>
                  </div>
                </div>
                
                {/* LinkedIn */}
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <LinkedinIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">LINKEDIN</div>
                    <a href={student.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm font-medium hover:underline">
                      Voir le profil
                    </a>
                  </div>
                </div>
                
                {/* Portfolio */}
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <GlobeIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">PORTFOLIO</div>
                    <a href={student.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm font-medium hover:underline">
                      Visiter le site
                    </a>
                  </div>
                </div>
                
                {/* University */}
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <BookOpenIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">UNIVERSITÉ</div>
                    <div className="text-sm font-medium text-slate-800">{student.education[0].institution}</div>
                  </div>
                </div>
                
                {/* Graduation */}
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <GraduationCapIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">DIPLÔMÉ</div>
                    <div className="text-sm font-medium text-slate-800">{student.education[0].period.split('-')[1]}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Tabs - Matching Profile.tsx style */}
      <div className="flex gap-1 mb-8 bg-white p-1 rounded-lg shadow-sm border-0 ring-1 ring-slate-200/60 w-full">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 rounded-md font-medium text-sm transition-all ${
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-6 w-full">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Stats */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-0 ring-1 ring-blue-200/60 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <BookOpenIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-800">{student.education.length}</div>
                    <div className="text-sm text-blue-600">Formation</div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-0 ring-1 ring-green-200/60 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <BriefcaseIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-800">{student.workExperience.length}</div>
                    <div className="text-sm text-green-600">Expérience</div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-0 ring-1 ring-purple-200/60 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                    <FolderIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-800">{student.projects.length}</div>
                    <div className="text-sm text-purple-600">Projets</div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-0 ring-1 ring-orange-200/60 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                    <AwardIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-800">{student.extraCourses.length}</div>
                    <div className="text-sm text-orange-600">Cours</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Skills & Applications */}
            <Card className="lg:col-span-2 border-0 ring-1 ring-slate-200/60 rounded-xl shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUpIcon className="w-5 h-5" />
                  Aperçu du profil
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-slate-800">Complétion du profil</span>
                    <span className="text-sm text-slate-600">
                      {student.status.label === "Complete" ? "100" : student.status.label === "In Progress" ? "75" : "50"}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all duration-500"
                      style={{ width: `${student.status.label === "Complete" ? "100" : student.status.label === "In Progress" ? "75" : "50"}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-slate-800">CV générés</span>
                    <span className="text-sm text-slate-600">{student.cvsGenerated}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${(student.cvsGenerated / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-slate-800">Candidatures</span>
                    <span className="text-sm text-slate-600">{student.applications}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-500"
                      style={{ width: `${(student.applications / 20) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Status */}
            <Card className="border-0 ring-1 ring-slate-200/60 rounded-xl shadow-sm">
              <CardHeader>
                <CardTitle>Statut d'activité</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-800">Dernière activité</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {student.lastActive}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-800">Statut du profil</span>
                  <Badge 
                    className={`px-3 py-1 rounded-2xl font-semibold text-xs border ${
                      student.status.color === "emerald" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                      student.status.color === "blue" ? "bg-blue-50 text-blue-700 border-blue-200" :
                      "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    {student.status.label}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-800">Programme</span>
                  <span className="text-sm text-slate-600">{student.program}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Education Tab */}
        {activeTab === "education" && (
          <div className="space-y-6">
            {student.education.map((education, index) => (
              <Link 
                key={index}
                to={`/student-education/${student.id}`}
                className="block group"
              >
                <Card className="overflow-hidden border-0 ring-1 ring-slate-200/60 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <BookOpenIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-slate-800 mb-1 group-hover:text-blue-700 transition-colors duration-200">
                            {education.institution}
                          </h3>
                          <p className="text-blue-600 font-medium mb-2">{education.degree}</p>
                          <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                            <span>{education.period}</span>
                          </div>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {index === 0 ? "En cours" : "Terminé"}
                          </Badge>
                        </div>
                      </div>
                      <ChevronRightIcon className="w-5 h-5 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            {student.projects.map((project, index) => (
              <Card key={index} className="overflow-hidden border-0 ring-1 ring-slate-200/60 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <FolderIcon className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-slate-800 mb-1">{project.name}</h3>
                        <p className="text-purple-600 font-medium mb-2">{project.organization}</p>
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                          Projet
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === "experience" && (
          <div className="space-y-6">
            {student.workExperience.map((work, index) => (
              <Card key={index} className="overflow-hidden border-0 ring-1 ring-slate-200/60 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <BriefcaseIcon className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-slate-800 mb-1">{work.position}</h3>
                        <p className="text-green-600 font-medium mb-2">{work.company}</p>
                        <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                          <span>{work.status}</span>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {work.status.includes("Interview") ? "Entretien" : "Candidature"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Extra Courses Tab */}
        {activeTab === "courses" && (
          <div className="space-y-6">
            {student.extraCourses.map((course, index) => (
              <Card key={index} className="overflow-hidden border-0 ring-1 ring-slate-200/60 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                        <AwardIcon className="w-6 h-6 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-slate-800 mb-1">{course.course}</h3>
                        <p className="text-amber-600 font-medium mb-2">{course.provider}</p>
                        <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                          <span>{course.date}</span>
                        </div>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          Cours
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};