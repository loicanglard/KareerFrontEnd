import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NavigationSection } from "../CoachDashboard/sections/NavigationSection/NavigationSection";
import { studentProfiles } from "../../data/studentProfiles";
import { ProfileDetailView } from "../Network/ProfileDetailView";

export const StudentEducation = (): JSX.Element => {
  const { studentId } = useParams();
  const navigate = useNavigate();

  // Find student data
  const numericId = parseInt(studentId || "");
  const student = studentProfiles.find(s => s.id === numericId);

  if (!student) {
    return (
      <main className="min-h-screen bg-slate-50">
        <NavigationSection />
        <div className="ml-60 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-slate-700 mb-4">Étudiant non trouvé</h2>
              <p className="text-slate-500 mb-6">L'étudiant que vous recherchez n'existe pas.</p>
              <button
                onClick={() => navigate("/coach-students")}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Retour à la liste
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <NavigationSection />
      <div className="ml-60">
        <ProfileDetailView
          profile={student}
          onBack={() => navigate("/coach-students")}
        />
      </div>
    </main>
  );
};
