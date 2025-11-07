import React, { useState } from "react";
import { NavigationSection } from "../Dashboard/sections/NavigationSection";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Card } from "../../components/ui/card";
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon, FilterIcon, UsersIcon, MapPinIcon, GraduationCapIcon, BriefcaseIcon } from "lucide-react";
import { studentProfiles as networkProfiles, StudentProfile as NetworkProfile } from "../../data/studentProfiles";
import { ProfileDetailView } from "./ProfileDetailView";

export const Network = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("Relevance");
  const [filteredProfiles, setFilteredProfiles] = useState(networkProfiles);
  const [selectedProfile, setSelectedProfile] = useState<NetworkProfile | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    
    // Simple client-side filtering
    if (searchQuery.trim() === "") {
      setFilteredProfiles(networkProfiles);
    } else {
      const filtered = networkProfiles.filter(profile =>
        profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.skills.some(skill => skill.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredProfiles(filtered);
    }
    
    // Reset to first page on new search
    setCurrentPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.value;
    console.log("Sorting by:", option);
    setSortOption(option);
    
    // Simple client-side sorting
    let sorted = [...filteredProfiles];
    
    if (option === "Recent") {
      // Sort by id descending (assuming newer profiles have higher ids)
      sorted = sorted.sort((a, b) => b.id - a.id);
    } else if (option === "Name") {
      // Sort by name alphabetically
      sorted = sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (option === "University") {
      // Sort by university
      sorted = sorted.sort((a, b) => a.university.localeCompare(b.university));
    } else {
      // Default to original order (relevance)
      sorted = [...networkProfiles].filter(profile =>
        searchQuery.trim() === "" ||
        profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.skills.some(skill => skill.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    setFilteredProfiles(sorted);
  };

  const handleViewProfile = (profile: NetworkProfile) => {
    console.log("Viewing profile:", profile.id);
    setSelectedProfile(profile);
  };

  const handleBackToList = () => {
    setSelectedProfile(null);
  };

  // Logic for pagination
  const profilesPerPage = 8;
  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = filteredProfiles.slice(indexOfFirstProfile, indexOfLastProfile);
  const totalPages = Math.ceil(filteredProfiles.length / profilesPerPage);

  // If a profile is selected, show the detail view
  if (selectedProfile) {
    return (
      <main className="flex min-h-screen bg-gradient-to-br from-slate-50 to-white">
        <aside className="h-full w-60">
          <NavigationSection />
        </aside>
        <div className="flex-1">
          <ProfileDetailView 
            profile={selectedProfile} 
            onBack={handleBackToList}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <aside className="h-full w-60">
        <NavigationSection />
      </aside>
      <div className="flex-1 p-8">
        <section className="flex flex-col gap-8 max-w-[1400px] mx-auto">
          {/* Header Section */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
                <UsersIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Réseau</h1>
                <p className="text-slate-600 text-lg font-medium">
                  Découvrez et connectez-vous avec des étudiants talentueux
                </p>
              </div>
            </div>
          </div>

          {/* Search Section */}
          <Card className="p-8 rounded-3xl bg-white/80 backdrop-blur-sm shadow-sm border-0 ring-1 ring-slate-200/60">
            <form onSubmit={handleSearch} className="flex gap-6">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <Input 
                  className="pl-12 h-14 text-base bg-slate-50/50 border-0 ring-1 ring-slate-200/60 rounded-2xl placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-200"
                  placeholder="Rechercher par nom, compétences, rôle, université..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <Button 
                type="submit" 
                className="h-14 px-8 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-2xl text-white font-semibold shadow-sm hover:shadow-md transition-all duration-200"
              >
                Rechercher
              </Button>
            </form>
          </Card>

          {/* Results Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-slate-700">
                {filteredProfiles.length} profils trouvés
              </h2>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-slate-500 font-medium">Trier par :</span>
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={handleSortChange}
                  className="appearance-none bg-white/80 backdrop-blur-sm border-0 ring-1 ring-slate-200/60 rounded-2xl px-4 py-3 pr-10 text-slate-700 font-medium focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                >
                  <option value="Relevance">Pertinence</option>
                  <option value="Recent">Récent</option>
                  <option value="Name">Nom</option>
                  <option value="University">Université</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentProfiles.map((profile) => (
              <Card 
                key={profile.id} 
                className="relative p-6 flex flex-col items-center gap-5 bg-white/80 backdrop-blur-sm border-0 ring-1 ring-slate-200/60 rounded-3xl cursor-pointer group overflow-hidden transition-all duration-300 hover:shadow-lg hover:ring-blue-500/20 hover:bg-white hover:-translate-y-1"
                onClick={() => handleViewProfile(profile)}
              >
                {/* Profile content */}
                <div className="relative z-10 flex flex-col items-center gap-5 w-full">
                  <Avatar className="w-20 h-20 shadow-sm transition-all duration-300">
                    <AvatarImage 
                      src={profile.profilePhoto} 
                      alt={profile.name}
                      className="object-cover"
                    />
                    <AvatarFallback className={`text-xl font-semibold text-white bg-gradient-to-br ${profile.color}`}>
                      {profile.initials}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex flex-col items-center gap-2 text-center">
                    <h3 className="text-lg font-semibold tracking-tight text-slate-800 group-hover:text-blue-700 transition-colors duration-200">
                      {profile.name}
                    </h3>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <BriefcaseIcon className="w-3 h-3 text-slate-500" />
                        <p className="text-slate-600 text-sm font-medium">{profile.role}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <GraduationCapIcon className="w-3 h-3 text-slate-500" />
                        <p className="text-slate-500 text-xs font-medium">{profile.university}</p>
                      </div>

                      <div className="flex items-center gap-2 text-xs">
                        <span className="px-2 py-1 rounded-full font-medium bg-blue-50 text-blue-700">
                          Class of {profile.graduationYear}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>         
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-8">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-12 w-12 rounded-2xl border-0 ring-1 ring-slate-200/60 hover:ring-blue-500/20 hover:bg-blue-50 transition-all duration-200"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </Button>
              
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                // Show pages 1 to 5, or centered around current page for more than 5 pages
                let pageNum = i + 1;
                if (totalPages > 5 && currentPage > 3) {
                  pageNum = Math.min(currentPage - 2 + i, totalPages - (4 - i));
                }
                
                return (
                  <Button 
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"} 
                    className={`h-12 w-12 rounded-2xl font-semibold transition-all duration-200 ${
                      currentPage === pageNum 
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm" 
                        : "border-0 ring-1 ring-slate-200/60 hover:ring-blue-500/20 hover:bg-blue-50"
                    }`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
              
              <Button 
                variant="outline" 
                size="icon" 
                className="h-12 w-12 rounded-2xl border-0 ring-1 ring-slate-200/60 hover:ring-blue-500/20 hover:bg-blue-50 transition-all duration-200"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRightIcon className="h-5 w-5" />
              </Button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};