import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { DashboardSection } from "./sections/DashboardSection";
import { NavigationSection } from "./sections/NavigationSection/NavigationSection";
import { StudentsActivitySection } from "./sections/StudentsActivitySection/StudentsActivitySection";
import { studentProfiles } from "../../data/studentProfiles";

export const CoachDashboard = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isViewingProfile, setIsViewingProfile] = useState<boolean>(false);
  const location = useLocation();

  React.useEffect(() => {
    if (location.state?.studentId) {
      setSearchQuery(location.state.studentId);
      setIsViewingProfile(true);
    }
  }, [location.state]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsViewingProfile(true);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <NavigationSection />
      <div className="ml-60">
        {isViewingProfile ? (
          <DashboardSection 
            studentId={searchQuery} 
            onBack={() => setIsViewingProfile(false)}
            onStudentSearch={handleSearch}
          />
        ) : (
          <StudentsActivitySection onStudentSearch={handleSearch} />
        )}
      </div>
    </main>
  );
};