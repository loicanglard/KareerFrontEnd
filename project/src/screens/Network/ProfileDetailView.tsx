import React, { useState } from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import {
  ArrowLeftIcon,
  DownloadIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  CalendarIcon,
  LinkedinIcon,
  GlobeIcon,
  BookOpenIcon,
  BriefcaseIcon,
  AwardIcon,
  FolderIcon,
  StarIcon,
  TrendingUpIcon,
  ChevronRightIcon,
  GraduationCapIcon,
  UserIcon
} from "lucide-react";
import { StudentProfile as NetworkProfile } from "../../data/studentProfiles";

interface ProfileDetailViewProps {
  profile: NetworkProfile;
  onBack: () => void;
}

const tabs = [
  {
    id: "education",
    label: "Formation",
    icon: <GraduationCapIcon className="w-4 h-4" />
  },
  {
    id: "experience",
    label: "Expérience",
    icon: <BriefcaseIcon className="w-4 h-4" />
  },
  {
    id: "projects",
    label: "Projets",
    icon: <FolderIcon className="w-4 h-4" />
  },
  {
    id: "sports",
    label: "Sports & Compétences",
    icon: <StarIcon className="w-4 h-4" />
  }
];

export const ProfileDetailView = ({ profile, onBack }: ProfileDetailViewProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState("education");
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<any | null>(null);
  const [selectedEducation, setSelectedEducation] = useState<any | null>(null);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [selectedSport, setSelectedSport] = useState<any | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(1);

  const handleExport = () => {
    console.log("Exporting profile");
  };

  const handleModuleClick = (module: string, education: any, year?: number) => {
    console.log(`Selected module: ${module}`);
    setSelectedModule(module);
    setSelectedEducation(education);
    if (year) setSelectedYear(year);
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  const handleExperienceClick = (experience: any) => {
    console.log(`Selected experience: ${experience.position}`);
    setSelectedExperience(experience);
  };

  const handleProjectClick = (project: any) => {
    console.log(`Selected project: ${project.name}`);
    setSelectedProject(project);
  };

  const handleSportClick = (sport: any) => {
    console.log(`Selected sport: ${sport.name}`);
    setSelectedSport(sport);
  };

  const handleBackToProfile = () => {
    setSelectedModule(null);
    setSelectedExperience(null);
    setSelectedEducation(null);
    setSelectedProject(null);
    setSelectedSport(null);
    setSelectedYear(1);
  };

  const contactInfo = {
    email: profile.email,
    phone: profile.phone || "Non renseigné",
    location: "Paris, France",
    linkedin: profile.linkedin,
    portfolio: profile.portfolio,
    university: profile.university,
    graduation: `Class of ${profile.graduationYear}`
  };

  if (selectedModule && selectedEducation) {
    return (
      <main className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="flex-1 p-8">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBackToProfile}
              className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm ring-1 ring-slate-200/60 hover:bg-white hover:ring-blue-500/20 transition-all duration-200"
            >
              <ChevronRightIcon className="w-5 h-5 text-slate-600 rotate-180" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">{selectedModule}</h1>
              <p className="text-slate-600">{selectedEducation.institution} • {selectedEducation.degree}</p>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h4 className="font-medium text-slate-800 text-base mb-4">Description du Module</h4>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200/60">
                <p className="text-sm text-slate-700 leading-relaxed">
                  Ce module fait partie du programme de formation à {selectedEducation.institution}.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    );
  }

  if (selectedExperience) {
    return (
      <main className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="flex-1 p-8">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBackToProfile}
              className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm ring-1 ring-slate-200/60 hover:bg-white hover:ring-blue-500/20 transition-all duration-200"
            >
              <ChevronRightIcon className="w-5 h-5 text-slate-600 rotate-180" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">{selectedExperience.position}</h1>
              <p className="text-slate-600">{selectedExperience.company} • {selectedExperience.location}</p>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                  <BriefcaseIcon className="w-8 h-8 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{selectedExperience.position}</h3>
                  <p className="text-slate-600 mb-2">{selectedExperience.company}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    <span>{selectedExperience.period}</span>
                    <span>•</span>
                    <span>{selectedExperience.location}</span>
                  </div>
                  <Badge variant="outline" className={selectedExperience.status === "ongoing" ? "bg-orange-50 text-orange-700 border-orange-200" : "bg-green-50 text-green-700 border-green-200"}>
                    {selectedExperience.status === "ongoing" ? "En cours" : "Terminé"}
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate-800 mb-2">Description du Poste</h4>
                  <p className="text-slate-700 leading-relaxed">
                    {selectedExperience.description.split('**').map((part: string, idx: number) =>
                      idx % 2 === 1 ? <strong key={idx} className="text-slate-900 font-semibold">{part}</strong> : part
                    )}
                  </p>
                </div>
              </div>
            </Card>

            {selectedExperience.achievements && selectedExperience.achievements.length > 0 && (
              <Card className="p-6">
                <h4 className="font-medium text-slate-800 text-base mb-4">Réalisations Clés & Impact</h4>
                <div className="space-y-3">
                  {selectedExperience.achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200/60">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-medium text-sm">
                        ✓
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">{achievement}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    );
  }

  if (selectedProject) {
    return (
      <main className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="flex-1 p-8">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBackToProfile}
              className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm ring-1 ring-slate-200/60 hover:bg-white hover:ring-blue-500/20 transition-all duration-200"
            >
              <ChevronRightIcon className="w-5 h-5 text-slate-600 rotate-180" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">{selectedProject.name}</h1>
              <p className="text-slate-600">{selectedProject.organization} • {selectedProject.period}</p>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <FolderIcon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{selectedProject.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{selectedProject.organization}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    <span>{selectedProject.period}</span>
                  </div>
                  <Badge variant="outline" className={selectedProject.status === "En cours" ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-green-50 text-green-700 border-green-200"}>
                    {selectedProject.status}
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate-800 mb-2">Description du Projet</h4>
                  <p className="text-slate-700 leading-relaxed">
                    {selectedProject.description.split('**').map((part: string, idx: number) =>
                      idx % 2 === 1 ? <strong key={idx} className="text-slate-900 font-semibold">{part}</strong> : part
                    )}
                  </p>
                </div>
              </div>
            </Card>

            {selectedProject.keyLearning && selectedProject.keyLearning.length > 0 && (
              <Card className="p-6">
                <h4 className="font-medium text-slate-800 text-base mb-4">Compétences Acquises & Expériences</h4>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200/60">
                  <ul className="space-y-3">
                    {selectedProject.keyLearning.map((learning: string, idx: number) => (
                      <li key={idx} className="text-sm text-slate-700 leading-relaxed flex items-start gap-3">
                        <span className="text-blue-600 font-bold mt-0.5">•</span>
                        <span>
                          {learning.split('**').map((part: string, partIdx: number) =>
                            partIdx % 2 === 1 ? <strong key={partIdx} className="text-slate-900 font-semibold">{part}</strong> : part
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            )}

            {selectedProject.skills && selectedProject.skills.length > 0 && (
              <Card className="p-6">
                <h4 className="font-medium text-slate-800 text-base mb-4">Compétences Utilisées</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.skills.map((skill: string, idx: number) => (
                    <Badge key={idx} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1.5">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    );
  }

  if (selectedSport) {
    return (
      <main className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="flex-1 p-8">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBackToProfile}
              className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm ring-1 ring-slate-200/60 hover:bg-white hover:ring-blue-500/20 transition-all duration-200"
            >
              <ChevronRightIcon className="w-5 h-5 text-slate-600 rotate-180" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">{selectedSport.name}</h1>
              <p className="text-slate-600">{selectedSport.club || selectedSport.organization} • {selectedSport.period}</p>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <TrendingUpIcon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{selectedSport.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{selectedSport.club || selectedSport.organization}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    <span>{selectedSport.period}</span>
                    {selectedSport.position && (
                      <>
                        <span>•</span>
                        <span>{selectedSport.position}</span>
                      </>
                    )}
                    {selectedSport.level && (
                      <>
                        <span>•</span>
                        <span>{selectedSport.level}</span>
                      </>
                    )}
                  </div>
                  <Badge variant="outline" className={selectedSport.status === "En cours" ? "bg-green-50 text-green-700 border-green-200" : "bg-blue-50 text-blue-700 border-blue-200"}>
                    {selectedSport.status}
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate-800 mb-2">Description</h4>
                  <p className="text-slate-700 leading-relaxed">
                    {selectedSport.description.split('**').map((part: string, idx: number) =>
                      idx % 2 === 1 ? <strong key={idx} className="text-slate-900 font-semibold">{part}</strong> : part
                    )}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h4 className="font-medium text-slate-800 text-base mb-4">Compétences Acquises & Expériences</h4>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200/60">
                <p className="text-sm text-slate-700 leading-relaxed">
                  {selectedSport.keyLearning.map((point: string, idx: number) => (
                    <span key={idx}>
                      {point.split('**').map((part: string, partIdx: number) =>
                        partIdx % 2 === 1 ? <strong key={partIdx} className="text-slate-900 font-semibold">{part}</strong> : part
                      )}
                      {idx < selectedSport.keyLearning.length - 1 && ' '}
                    </span>
                  ))}
                </p>
              </div>
            </Card>

            {selectedSport.achievements && selectedSport.achievements.length > 0 && (
              <Card className="p-6">
                <h4 className="font-medium text-slate-800 text-base mb-4">Réalisations & Résultats</h4>
                <div className="space-y-3">
                  {selectedSport.achievements.map((achievement: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200/60">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-medium text-sm">
                        ✓
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">{achievement}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
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
              <h1 className="text-3xl font-bold text-slate-800 mb-2">Profil de {profile.name.split(' ')[0]}</h1>
              <p className="text-slate-600">Consultez les informations professionnelles et les détails de carrière</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="gap-2"
              onClick={handleExport}
            >
              <DownloadIcon className="w-4 h-4" />
              Exporter le Profil
            </Button>
          </div>
        </div>

        <Card className="mb-8 overflow-hidden">
          <div className="h-32 relative bg-gradient-to-r from-blue-500 to-blue-600">
          </div>

          <CardContent className="relative pt-0 pb-6">
            <div className="flex items-start gap-6 -mt-12">
              <Avatar className={`w-32 h-32 border-4 border-white shadow-lg bg-gradient-to-br ${profile.color} flex-shrink-0`}>
                <AvatarImage
                  src={profile.profilePhoto}
                  alt={profile.name}
                  className="object-cover"
                />
                <AvatarFallback className="text-3xl font-bold text-white">
                  {profile.initials}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 mt-16">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">{profile.name}</h2>
                    <div className="flex items-center gap-2 mb-2">
                      <BriefcaseIcon className="w-5 h-5 text-slate-600" />
                      <span className="text-base text-slate-600">{profile.role}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <GraduationCapIcon className="w-5 h-5 text-slate-600" />
                      <span className="text-base text-slate-600">{profile.university}</span>
                    </div>
                    <Badge className="bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 px-4 py-1.5 text-sm font-semibold mb-6">
                      Class of {profile.graduationYear}
                    </Badge>

                    <p className="text-slate-700 max-w-3xl leading-relaxed text-base mb-6">{profile.bio}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <MailIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">EMAIL</div>
                      <div className="text-sm font-medium text-slate-800">{contactInfo.email}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <PhoneIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">PHONE</div>
                      <div className="text-sm font-medium text-slate-800">{contactInfo.phone}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <LinkedinIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">LINKEDIN</div>
                      <div className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">View Profile</div>
                    </div>
                  </div>

                  {contactInfo.portfolio && (
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                        <GlobeIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">PORTFOLIO</div>
                        <div className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">Visit Site</div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <BookOpenIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">UNIVERSITY</div>
                      <div className="text-sm font-medium text-slate-800">{contactInfo.university}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <CalendarIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">GRADUATION</div>
                      <div className="text-sm font-medium text-slate-800">{contactInfo.graduation}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-0 hover:shadow-md transition-all duration-200 cursor-pointer" onClick={() => setActiveTab("education")}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center shadow-sm">
                  <BookOpenIcon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-900 mb-1">{profile.education.length}</div>
                  <div className="text-sm font-medium text-blue-700">Education</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-0 hover:shadow-md transition-all duration-200 cursor-pointer" onClick={() => setActiveTab("experience")}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center shadow-sm">
                  <BriefcaseIcon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-900 mb-1">{profile.workExperience.length}</div>
                  <div className="text-sm font-medium text-green-700">Experience</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-0 hover:shadow-md transition-all duration-200 cursor-pointer" onClick={() => setActiveTab("projects")}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-purple-500 rounded-2xl flex items-center justify-center shadow-sm">
                  <FolderIcon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-900 mb-1">{profile.projects.length}</div>
                  <div className="text-sm font-medium text-purple-700">Projects</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100/50 border-0 hover:shadow-md transition-all duration-200 cursor-pointer" onClick={() => setActiveTab("sports")}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center shadow-sm">
                  <AwardIcon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-900 mb-1">{profile.certifications.length}</div>
                  <div className="text-sm font-medium text-orange-700">Certificates</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-1 mb-8 bg-white p-1 rounded-lg shadow-sm border">
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

        <div className="space-y-6">
          {activeTab === "education" && (
            <div className="space-y-6">
              {profile.education.map((education, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-md transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookOpenIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-semibold text-slate-800">{education.degree}</h3>
                          <Badge variant="outline" className={education.status === "En cours" ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-green-50 text-green-700 border-green-200"}>
                            {education.status || "Terminé"}
                          </Badge>
                        </div>
                        <p className="text-blue-600 font-medium mb-3">{education.institution}</p>

                        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 mb-4">
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="w-3.5 h-3.5" />
                            {education.period}
                          </span>
                        </div>

                        {(education.cycle || education.specialisation || education.mineure || education.studyMode || (education.specificPath && education.specificPath !== "N/A")) && (
                          <div className="flex flex-wrap items-center gap-2 text-sm pt-3 border-t border-slate-200">
                            {education.cycle && (
                              <>
                                <span className="text-slate-500">Cycle:</span>
                                <span className="font-medium text-slate-800">{education.cycle}</span>
                                <span className="text-slate-300">•</span>
                              </>
                            )}
                            {education.specialisation && (
                              <>
                                <span className="text-slate-500">Spécialisation:</span>
                                <span className="font-medium text-slate-800">{education.specialisation}</span>
                                <span className="text-slate-300">•</span>
                              </>
                            )}
                            {education.mineure && (
                              <>
                                <span className="text-slate-500">Mineure:</span>
                                <span className="font-medium text-slate-800">{education.mineure}</span>
                                <span className="text-slate-300">•</span>
                              </>
                            )}
                            {education.studyMode && (
                              <>
                                <span className="text-slate-500">Modalité:</span>
                                <span className="font-medium text-slate-800">{education.studyMode}</span>
                              </>
                            )}
                            {education.specificPath && education.specificPath !== "N/A" && (
                              <>
                                <span className="text-slate-300">•</span>
                                <span className="text-slate-500">Parcours:</span>
                                <span className="font-medium text-slate-800">{education.specificPath}</span>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {education.modules && education.modules.length > 0 && (
                      <div className="mt-6">
                        <h4 className="font-medium text-slate-800 mb-3">Key Modules</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {education.modules.map((module: string, idx: number) => (
                            <div
                              key={idx}
                              className="group relative overflow-hidden bg-white rounded-2xl border-2 border-slate-200/60 hover:border-blue-400/60 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                              onClick={() => handleModuleClick(module, education)}
                            >
                              <div className="relative p-6">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4 flex-1">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                                      <BookOpenIcon className="w-6 h-6 text-white" />
                                    </div>

                                    <h5 className="text-base font-bold text-slate-800 group-hover:text-blue-700 transition-colors duration-300 leading-tight">
                                      {module}
                                    </h5>
                                  </div>

                                  <div className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm group-hover:bg-blue-500 group-hover:shadow-md transition-all duration-300">
                                    <ChevronRightIcon className="w-4 h-4 text-slate-600 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab === "experience" && (
            <div className="space-y-6">
              {profile.workExperience.map((experience, index) => (
                <Card
                  key={index}
                  className="overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer"
                  onClick={() => handleExperienceClick(experience)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <BriefcaseIcon className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-slate-800 mb-1">{experience.position}</h3>
                          <p className="text-green-600 font-medium mb-2">{experience.company}</p>
                          <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                            <span>{experience.period}</span>
                            <span>•</span>
                            <span>{experience.location}</span>
                          </div>
                          <Badge variant="outline" className={experience.status === "ongoing" ? "bg-orange-50 text-orange-700 border-orange-200" : "bg-green-50 text-green-700 border-green-200"}>
                            {experience.status === "ongoing" ? "En cours" : "Terminé"}
                          </Badge>
                        </div>
                      </div>
                      <ChevronRightIcon className="w-5 h-5 text-slate-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab === "projects" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Projets</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.projects.map((project, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden bg-white rounded-2xl border-2 border-slate-200/60 hover:border-blue-400/60 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    onClick={() => handleProjectClick(project)}
                  >
                    <div className="relative p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                            <FolderIcon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h5 className="text-base font-bold text-slate-800 group-hover:text-blue-700 transition-colors duration-300 leading-tight mb-1">
                              {project.name}
                            </h5>
                            <p className="text-sm text-blue-600 font-medium">{project.organization}</p>
                          </div>
                        </div>
                        <div className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm group-hover:bg-blue-500 group-hover:shadow-md transition-all duration-300">
                          <ChevronRightIcon className="w-4 h-4 text-slate-600 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <CalendarIcon className="w-3.5 h-3.5" />
                          <span>{project.period}</span>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                          Terminé
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "sports" && (
            <div className="space-y-6">
              {/* Sports Activities Section */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Sports & Activités</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.sports.map((sport, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden bg-white rounded-2xl border-2 border-slate-200/60 hover:border-blue-400/60 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                      onClick={() => handleSportClick(sport)}
                    >
                      <div className="relative p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4 flex-1">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                              <TrendingUpIcon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h5 className="text-base font-bold text-slate-800 group-hover:text-blue-700 transition-colors duration-300 leading-tight mb-1">
                                {sport.name}
                              </h5>
                              <p className="text-sm text-blue-600 font-medium">{sport.club || sport.organization}</p>
                            </div>
                          </div>
                          <div className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm group-hover:bg-blue-500 group-hover:shadow-md transition-all duration-300">
                            <ChevronRightIcon className="w-4 h-4 text-slate-600 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <CalendarIcon className="w-3.5 h-3.5" />
                            <span>{sport.period}</span>
                          </div>
                          {sport.position && (
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <UserIcon className="w-3.5 h-3.5" />
                              <span>{sport.position}</span>
                            </div>
                          )}
                          {sport.level && (
                            <div className="text-xs text-slate-600 font-medium">
                              Niveau: {sport.level}
                            </div>
                          )}
                          <Badge variant="outline" className={sport.status === "En cours" ? "bg-green-50 text-green-700 border-green-200 text-xs" : "bg-blue-50 text-blue-700 border-blue-200 text-xs"}>
                            {sport.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certificates & Languages */}
              <Card>
                <CardHeader>
                  <CardTitle>Certificats & Langues</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Certifications Section */}
                  <div>
                    <h4 className="font-medium text-slate-800 text-sm mb-3 flex items-center gap-2">
                      <AwardIcon className="w-4 h-4" />
                      Certifications
                    </h4>
                    <div className="space-y-3">
                      {profile.certifications.map((cert, index) => (
                        <div key={index} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="font-medium text-slate-800 text-sm">{cert.name}</div>
                          <div className="text-xs text-slate-600">{cert.provider} • {cert.date}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Languages Section */}
                  <div>
                    <h4 className="font-medium text-slate-800 text-sm mb-3 flex items-center gap-2">
                      <GlobeIcon className="w-4 h-4" />
                      Langues
                    </h4>
                    <div className="space-y-3">
                      {profile.languages.map((language, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="font-medium text-slate-800">{language.name}</span>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {language.level}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
