import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, User } from "lucide-react";
import { NavigationSection } from "../CoachDashboard/sections/NavigationSection/NavigationSection";
import { Input } from "../../components/ui/input";
import { Card } from "../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { studentProfiles, StudentProfile } from "../../data/studentProfiles";

interface Student {
  id: string;
  name: string;
  phone?: string;
  program?: string;
  profilePhoto?: string;
  email?: string;
}

export const CoachStudents = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredStudents(students);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = students.filter((student) => {
        const name = student.name.toLowerCase();
        const id = student.id.toLowerCase();
        const program = student.program?.toLowerCase() || "";

        return name.includes(query) || id.includes(query) || program.includes(query);
      });
      setFilteredStudents(filtered);
    }
  }, [searchQuery, students]);

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const studentProfilesData: Student[] = studentProfiles.map(profile => ({
        id: profile.id.toString(),
        name: profile.name,
        phone: profile.phone,
        program: profile.program,
        profilePhoto: profile.profilePhoto,
        email: profile.email
      }));

      setStudents(studentProfilesData);
      setFilteredStudents(studentProfilesData);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = (name: string) => {
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <NavigationSection />
      <div className="ml-60 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Étudiants</h1>
            <p className="text-slate-600">Rechercher et consulter tous les profils étudiants</p>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Rechercher par nom, programme ou ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-white border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-slate-500">Chargement des étudiants...</div>
            </div>
          ) : filteredStudents.length === 0 ? (
            <Card className="p-12 text-center">
              <User className="w-12 h-12 mx-auto mb-4 text-slate-300" />
              <h3 className="text-lg font-semibold text-slate-700 mb-2">Aucun étudiant trouvé</h3>
              <p className="text-slate-500">
                {searchQuery ? "Essayez d'ajuster vos critères de recherche" : "Aucun étudiant n'est actuellement inscrit"}
              </p>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredStudents.map((student) => (
                <Link
                  key={student.id}
                  to={`/student-education/${student.id}`}
                  className="block"
                >
                  <Card className="p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-300 cursor-pointer">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 shadow-sm">
                        {student.profilePhoto && (
                          <AvatarImage src={student.profilePhoto} alt={student.name} className="object-cover" />
                        )}
                        <AvatarFallback className="font-semibold text-white text-base">
                          {getInitials(student.name)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-slate-800 mb-1">
                          {student.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                          {student.program && (
                            <span className="flex items-center gap-1">
                              <span className="font-medium">Programme :</span> {student.program}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <span className="font-medium">ID:</span> {student.id}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
