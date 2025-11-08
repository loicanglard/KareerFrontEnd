import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, Link } from "react-router-dom";

import { HomePageComplete } from "./screens/HomePageComplete";
import { LoginPage } from "./screens/LoginPage";
import { SignupEtudiant } from "./screens/SignupEtudiant";
import { SignupCoach } from "./screens/SignupCoach";
import { Dashboard } from "./screens/Dashboard/Dashboard";
import { AIInterview } from "./screens/AIInterview";
import { Generator } from "./screens/Generator";
import { Profile } from "./screens/Profile";
import { Network } from "./screens/Network";
import { JobTracker } from "./screens/JobTracker";
import { CoachDashboard } from "./screens/CoachDashboard/CoachDashboard";
import { AnalyticsOptimized } from "./screens/Analytics/AnalyticsOptimized";
import { CoachJobTracker } from "./screens/CoachJobTracker";
import { CoachSettings } from "./screens/CoachSettings/CoachSettings";
import { CoachStudents } from "./screens/CoachStudents";
import { StudentEducation } from "./screens/StudentEducation";
import { EditableDivDemo } from "./screens/EditableDivDemo";
import { ProfileEditorDemo } from "./screens/Profile/ProfileEditorDemo";
import { ProfileImageDemo } from "./screens/Profile/ProfileImageDemo";

import { AuthProvider, useAuth } from "./lib/auth";
import LandingIndex from "./pages/LandingIndex";
import LandingEtudiants from "./pages/LandingEtudiants";
import LandingEcoles from "./pages/LandingEcoles";
import LandingAPropos from "./pages/LandingAPropos";
import LandingContact from "./pages/LandingContact";

const BYPASS = import.meta.env.VITE_BYPASS_AUTH === "true";

// -------- Intercepteur global pour les <a href="/..."> --------
function GlobalAnchorInterceptor() {
  const navigate = useNavigate();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // Cherche le <a> le plus proche de la cible cliquée
      const el = (e.target as HTMLElement).closest("a");
      if (!el) return;

      const href = el.getAttribute("href") || "";
      const target = el.getAttribute("target");

      // On n’intercepte que les liens internes absolus ("/..."), sans target _blank
      const isInternal = href.startsWith("/") && !href.startsWith("//");
      const isModifiedClick =
        e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;

      if (isInternal && !isModifiedClick && target !== "_blank") {
        e.preventDefault();
        navigate(href);
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [navigate]);

  return null;
}

// -------- ProtectedRoute --------
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  if (!isAuthenticated && !BYPASS) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// (Optionnel) petite barre de nav dev pour tester vite
const DevNav = () => (
  BYPASS ? (
    <nav className="p-3 border-b flex gap-3 text-sm">
      <Link to="/" className="underline">Accueil</Link>
      <Link to="/dashboard" className="underline">Etudiant /dashboard</Link>
      <Link to="/coach" className="underline">Coach /coach</Link>
      <Link to="/login" className="underline">Login</Link>
    </nav>
  ) : null
);

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <>
      <DevNav />
      <Routes>
        {/* Landing */}
        <Route path="/" element={<LandingIndex />} />
        <Route path="/etudiants" element={<LandingEtudiants />} />
        <Route path="/ecoles" element={<LandingEcoles />} />
        <Route path="/a-propos" element={<LandingAPropos />} />
        <Route path="/contact" element={<LandingContact />} />

        {/* Public */}
        <Route path="/home" element={<HomePageComplete />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/inscription-etudiant" element={<SignupEtudiant />} />
        <Route path="/inscription-coach" element={<SignupCoach />} />
        <Route path="/editable-div-demo" element={<EditableDivDemo />} />
        <Route path="/profile-editor-demo" element={<ProfileEditorDemo />} />
        <Route path="/profile-image-demo" element={<ProfileImageDemo />} />

        {/* Student */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/ai-interview" element={<ProtectedRoute><AIInterview /></ProtectedRoute>} />
        <Route path="/generator" element={<ProtectedRoute><Generator /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/network" element={<ProtectedRoute><Network /></ProtectedRoute>} />
        <Route path="/job-tracker" element={<ProtectedRoute><JobTracker /></ProtectedRoute>} />

        {/* Coach */}
        <Route path="/coach" element={<ProtectedRoute><CoachDashboard /></ProtectedRoute>} />
        <Route path="/analytics-optimized" element={<ProtectedRoute><AnalyticsOptimized /></ProtectedRoute>} />
        <Route path="/coach-job-tracker" element={<ProtectedRoute><CoachJobTracker /></ProtectedRoute>} />
        <Route path="/coach-settings" element={<ProtectedRoute><CoachSettings /></ProtectedRoute>} />
        <Route path="/coach-students" element={<ProtectedRoute><CoachStudents /></ProtectedRoute>} />
        <Route path="/student-education/:studentId" element={<ProtectedRoute><StudentEducation /></ProtectedRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to={user?.role === "coach" ? "/coach" : "/"} replace />} />
      </Routes>
    </>
  );
};

export const App = () => {
  return (
    <AuthProvider>
      <Router basename="/">
        {/* Rend fonctionnels tous les <a href="/..."> sans toucher tes composants */}
        <GlobalAnchorInterceptor />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};
