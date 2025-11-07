import React, { useState } from "react";
import { DownloadIcon, FilterIcon, MoreVerticalIcon, GripVerticalIcon, CalendarIcon, LinkIcon, MapPinIcon, ClockIcon, CheckCircleIcon, XCircleIcon, AlertCircleIcon, TrendingUpIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

// États de simulation du drag-and-drop
export const DragDropStates = () => {
  const [currentState, setCurrentState] = useState("rest"); // rest, drag-start, drag-over, drop-completed

  // Données identiques à la page actuelle
  const applicationData = [
    {
      status: "Applied",
      count: 8509,
      color: "from-slate-100 to-slate-200",
      borderColor: "border-slate-300",
      textColor: "text-slate-700",
      bgColor: "bg-gradient-to-br from-slate-50/80 to-slate-100/60",
      headerBg: "bg-gradient-to-r from-slate-100 to-slate-200",
      icon: <ClockIcon className="w-4 h-4" />,
      jobs: [
        {
          id: 1,
          title: "Software Engineer",
          company: "Google",
          location: "Paris, France",
          details: "Added 2 days ago",
          cv: "CV_Google_SoftwareEng.pdf",
          cl: "CL_Google_SoftwareEng.pdf",
          priority: "high",
          companyLogo: "https://logo.clearbit.com/google.com"
        },
        {
          id: 2,
          title: "Frontend Developer",
          company: "Airbnb",
          location: "Remote",
          details: "Added 3 days ago",
          cv: "CV_Airbnb_Frontend.pdf",
          cl: "CL_Airbnb_Frontend.pdf",
          priority: "medium",
          companyLogo: "https://logo.clearbit.com/airbnb.com"
        },
      ],
    },
    {
      status: "Interviewing",
      count: 4987,
      color: "from-blue-100 to-blue-200",
      borderColor: "border-blue-300",
      textColor: "text-blue-700",
      bgColor: "bg-gradient-to-br from-blue-50/80 to-blue-100/60",
      headerBg: "bg-gradient-to-r from-blue-100 to-blue-200",
      icon: <TrendingUpIcon className="w-4 h-4" />,
      jobs: [
        {
          id: 5,
          title: "Full Stack Developer",
          company: "Microsoft",
          location: "Seattle, WA",
          details: "Technical Interview",
          interviewDate: "Tomorrow at 2:00 PM",
          cv: "CV_Microsoft_FullStack.pdf",
          cl: "CL_Microsoft_FullStack.pdf",
          priority: "high",
          companyLogo: "https://logo.clearbit.com/microsoft.com"
        },
      ],
    },
    {
      status: "Rejected",
      count: 5874,
      color: "from-rose-100 to-rose-200",
      borderColor: "border-rose-300",
      textColor: "text-rose-700",
      bgColor: "bg-gradient-to-br from-rose-50/80 to-rose-100/60",
      headerBg: "bg-gradient-to-r from-rose-100 to-rose-200",
      icon: <XCircleIcon className="w-4 h-4" />,
      jobs: [
        {
          id: 8,
          title: "Backend Engineer",
          company: "Amazon",
          location: "Berlin, Germany",
          details: "Position filled",
          rejectionDate: "2 weeks ago",
          cv: "CV_Amazon_Backend.pdf",
          cl: "CL_Amazon_Backend.pdf",
          priority: "low",
          companyLogo: "https://logo.clearbit.com/amazon.com"
        },
      ],
    },
    {
      status: "Offer",
      count: 2879,
      color: "from-emerald-100 to-emerald-200",
      borderColor: "border-emerald-300",
      textColor: "text-emerald-700",
      bgColor: "bg-gradient-to-br from-emerald-50/80 to-emerald-100/60",
      headerBg: "bg-gradient-to-r from-emerald-100 to-emerald-200",
      icon: <CheckCircleIcon className="w-4 h-4" />,
      jobs: [
        {
          id: 10,
          title: "Senior Developer",
          company: "Stripe",
          location: "San Francisco, CA",
          details: "Offer received",
          offerDetails: "€95,000 - Start Jan 15",
          deadline: "Respond by Dec 20",
          cv: "CV_Stripe_Senior.pdf",
          cl: "CL_Stripe_Senior.pdf",
          priority: "high",
          companyLogo: "https://logo.clearbit.com/stripe.com"
        },
      ],
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const renderJobCard = (job, columnIndex, isGhost = false, isDragged = false) => (
    <Card
      key={job.id}
      className={`group transition-all duration-300 border-0 shadow-md ${
        isGhost 
          ? 'opacity-30 bg-slate-100 border-2 border-dashed border-slate-300' 
          : isDragged 
            ? 'shadow-2xl scale-105 rotate-2 z-50 cursor-grabbing' 
            : 'hover:shadow-xl cursor-grab'
      }`}
      style={isDragged ? { 
        transform: 'scale(1.05) rotate(2deg)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        zIndex: 9999
      } : {}}
    >
      <CardContent className="p-6 bg-gradient-to-br from-white to-slate-50/50 rounded-2xl">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center overflow-hidden shadow-sm">
              <img 
                src={job.companyLogo} 
                alt={job.company}
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${job.company}&background=3b82f6&color=fff&size=32`;
                }}
              />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-800 text-base leading-tight mb-1">
                {job.title}
              </h4>
              <p className="text-slate-600 font-semibold text-sm mb-1">
                {job.company}
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <MapPinIcon className="w-3 h-3" />
                <span>{job.location}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge className={`text-xs font-medium px-2 py-1 ${getPriorityColor(job.priority)}`}>
              {job.priority}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200"
            >
              <MoreVerticalIcon className="w-4 h-4 text-slate-600" />
            </Button>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <ClockIcon className="w-4 h-4" />
            <span>{job.details}</span>
          </div>
          
          {job.interviewDate && (
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center gap-2 text-blue-700">
                <CalendarIcon className="w-4 h-4" />
                <span className="text-sm font-semibold">{job.interviewDate}</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-200">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors duration-200 group">
              <LinkIcon className="w-3 h-3 text-blue-600" />
              <span className="text-xs font-semibold text-blue-700 group-hover:text-blue-800">CV</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-violet-50 hover:bg-violet-100 rounded-xl transition-colors duration-200 group">
              <LinkIcon className="w-3 h-3 text-violet-600" />
              <span className="text-xs font-semibold text-violet-700 group-hover:text-violet-800">CL</span>
            </button>
          </div>
          
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <GripVerticalIcon className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderState = () => {
    const draggedJob = applicationData[0].jobs[0]; // Software Engineer - Google
    
    switch (currentState) {
      case "rest":
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">État 1: Au Repos (Initial)</h2>
              <p className="text-slate-600">La page Coach Analytics dans son état normal, sans interaction de drag-and-drop</p>
            </div>
            {renderNormalState()}
          </div>
        );
        
      case "drag-start":
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">État 2: Début du Drag (Clic Maintenu)</h2>
              <p className="text-slate-600">La carte "Software Engineer - Google" est saisie et soulevée, un placeholder apparaît à sa position d'origine</p>
            </div>
            {renderDragStartState()}
          </div>
        );
        
      case "drag-over":
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">État 3: Survol de Zone Cible (Drag Over)</h2>
              <p className="text-slate-600">La carte survole la colonne "Interviewing" qui s'illumine pour indiquer qu'elle peut recevoir la carte</p>
            </div>
            {renderDragOverState()}
          </div>
        );
        
      case "drop-completed":
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">État 4: Dépôt Effectué (Drop Completed)</h2>
              <p className="text-slate-600">La carte a été déposée dans "Interviewing", les compteurs sont mis à jour</p>
            </div>
            {renderDropCompletedState()}
          </div>
        );
        
      default:
        return renderNormalState();
    }
  };

  const renderNormalState = () => (
    <div className="grid grid-cols-4 gap-8 w-full">
      {applicationData.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className="flex flex-col min-h-[600px] rounded-3xl border-2 border-white/60 bg-white/40 backdrop-blur-sm shadow-lg"
        >
          <div className={`p-6 rounded-t-3xl bg-gradient-to-r ${column.headerBg} border-b border-white/30`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm ${column.textColor}`}>
                  {column.icon}
                </div>
                <div>
                  <h3 className={`font-bold text-lg tracking-tight ${column.textColor}`}>
                    {column.status}
                  </h3>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm ${column.textColor}`}>
                <span className="font-bold text-2xl">{column.count.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 p-6 space-y-4">
            {column.jobs.map((job) => renderJobCard(job, columnIndex))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderDragStartState = () => {
    const draggedJob = applicationData[0].jobs[0];
    
    return (
      <div className="relative">
        <div className="grid grid-cols-4 gap-8 w-full">
          {applicationData.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className="flex flex-col min-h-[600px] rounded-3xl border-2 border-white/60 bg-white/40 backdrop-blur-sm shadow-lg"
            >
              <div className={`p-6 rounded-t-3xl bg-gradient-to-r ${column.headerBg} border-b border-white/30`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm ${column.textColor}`}>
                      {column.icon}
                    </div>
                    <div>
                      <h3 className={`font-bold text-lg tracking-tight ${column.textColor}`}>
                        {column.status}
                      </h3>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm ${column.textColor}`}>
                    <span className="font-bold text-2xl">{column.count.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 p-6 space-y-4">
                {column.jobs.map((job, jobIndex) => {
                  if (columnIndex === 0 && jobIndex === 0) {
                    // Placeholder fantôme pour la première carte de la première colonne
                    return renderJobCard(job, columnIndex, true);
                  }
                  return renderJobCard(job, columnIndex);
                })}
              </div>
            </div>
          ))}
        </div>
        
        {/* Carte en cours de glissement */}
        <div className="absolute top-32 left-32 pointer-events-none">
          {renderJobCard(draggedJob, 0, false, true)}
        </div>
        
        {/* Indicateur de glissement */}
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl shadow-2xl z-50">
          <div className="flex items-center gap-3">
            <GripVerticalIcon className="w-5 h-5" />
            <p className="font-semibold">Carte saisie • Déplacez vers une autre colonne</p>
          </div>
        </div>
      </div>
    );
  };

  const renderDragOverState = () => {
    const draggedJob = applicationData[0].jobs[0];
    
    return (
      <div className="relative">
        <div className="grid grid-cols-4 gap-8 w-full">
          {applicationData.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className={`flex flex-col min-h-[600px] rounded-3xl border-2 transition-all duration-300 ${
                columnIndex === 1 
                  ? `${column.borderColor} bg-gradient-to-br ${column.color} shadow-xl scale-[1.02] ring-4 ring-blue-300/50` 
                  : 'border-white/60 bg-white/40 backdrop-blur-sm shadow-lg'
              }`}
            >
              <div className={`p-6 rounded-t-3xl bg-gradient-to-r ${column.headerBg} border-b border-white/30`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm ${column.textColor}`}>
                      {column.icon}
                    </div>
                    <div>
                      <h3 className={`font-bold text-lg tracking-tight ${column.textColor}`}>
                        {column.status}
                      </h3>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm ${column.textColor}`}>
                    <span className="font-bold text-2xl">{column.count.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 p-6 space-y-4">
                {columnIndex === 1 && (
                  <div className="h-1 bg-blue-500 rounded-full shadow-lg animate-pulse mb-4"></div>
                )}
                {column.jobs.map((job, jobIndex) => {
                  if (columnIndex === 0 && jobIndex === 0) {
                    return renderJobCard(job, columnIndex, true);
                  }
                  return renderJobCard(job, columnIndex);
                })}
              </div>
            </div>
          ))}
        </div>
        
        {/* Carte en cours de glissement au-dessus de la colonne Interviewing */}
        <div className="absolute top-32 left-[420px] pointer-events-none">
          {renderJobCard(draggedJob, 0, false, true)}
        </div>
        
        {/* Indicateur de zone de dépôt */}
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl shadow-2xl z-50">
          <div className="flex items-center gap-3">
            <CheckCircleIcon className="w-5 h-5" />
            <p className="font-semibold">Zone de dépôt valide • Relâchez pour déposer</p>
          </div>
        </div>
      </div>
    );
  };

  const renderDropCompletedState = () => {
    // Données mises à jour après le drop
    const updatedData = [...applicationData];
    updatedData[0].count = 8508; // Applied -1
    updatedData[1].count = 4988; // Interviewing +1
    
    // Déplacer la carte de Applied vers Interviewing
    const movedJob = updatedData[0].jobs.shift();
    updatedData[1].jobs.unshift(movedJob);
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-8 w-full">
          {updatedData.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className="flex flex-col min-h-[600px] rounded-3xl border-2 border-white/60 bg-white/40 backdrop-blur-sm shadow-lg"
            >
              <div className={`p-6 rounded-t-3xl bg-gradient-to-r ${column.headerBg} border-b border-white/30`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm ${column.textColor}`}>
                      {column.icon}
                    </div>
                    <div>
                      <h3 className={`font-bold text-lg tracking-tight ${column.textColor}`}>
                        {column.status}
                      </h3>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm ${column.textColor} ${
                    columnIndex === 0 || columnIndex === 1 ? 'ring-2 ring-green-300 bg-green-50' : ''
                  }`}>
                    <span className="font-bold text-2xl">{column.count.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 p-6 space-y-4">
                {column.jobs.map((job, jobIndex) => {
                  const isNewlyMoved = columnIndex === 1 && jobIndex === 0;
                  return (
                    <div key={job.id} className={isNewlyMoved ? 'animate-pulse ring-2 ring-green-300 rounded-2xl' : ''}>
                      {renderJobCard(job, columnIndex)}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        {/* Indicateur de succès */}
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl shadow-2xl z-50">
          <div className="flex items-center gap-3">
            <CheckCircleIcon className="w-5 h-5" />
            <p className="font-semibold">Carte déplacée avec succès • Compteurs mis à jour</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 p-8">
      {/* Header avec navigation entre les états */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Simulation Drag-and-Drop - Coach Analytics</h1>
            <p className="text-slate-600">Visualisation des 4 états clés de l'interaction de glisser-déposer</p>
          </div>
        </div>
        
        {/* Navigation entre les états */}
        <div className="flex gap-4 mb-8">
          {[
            { id: "rest", label: "1. Au Repos" },
            { id: "drag-start", label: "2. Début Drag" },
            { id: "drag-over", label: "3. Survol Zone" },
            { id: "drop-completed", label: "4. Dépôt Effectué" }
          ].map((state) => (
            <Button
              key={state.id}
              onClick={() => setCurrentState(state.id)}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-200 ${
                currentState === state.id
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {state.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Rendu de l'état actuel */}
      {renderState()}
    </div>
  );
};

export default DragDropStates;