import React, { useState, useEffect, useRef } from "react";
import { NavigationSection } from "../Dashboard/sections/NavigationSection";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { ArrowLeftIcon, ArrowRightIcon, FileIcon, FileTextIcon, SendIcon } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { DocumentView } from "./DocumentView";
import { Card, CardContent } from "../../components/ui/card";
import { TwoLevelSectorDropdown } from "../../components/TwoLevelSectorDropdown";

// Create arrays for dropdown options
const months = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

const years = Array.from({ length: 21 }, (_, i) => 2010 + i);

const experienceTypes = [
  "Temps plein", "Temps partiel", "Stage", "Indépendant",
  "Contrat", "Bénévolat", "Projet Étudiant"
];

const companySectors = [
  "Finance et Assurance",
  "Consulting & Conseil",
  "Technologie & Numérique (IT)",
  "Industrie & Production",
  "Biens de Consommation (FMCG)",
  "Luxe, Mode & Retail",
  "Santé & Biotechnologie",
  "Médias, Art & Culture",
  "Services Publics & Administration",
  "Immobilier & Construction",
  "Éducation & Recherche",
  "Organisations à But Non Lucratif (ONG)",
  "Transports & Logistique"
];

// Sample initial messages for the motivation interview
const initialMessages = [
  {
    sender: "ai",
    content: "Justifiez votre motivation pour ce rôle et cette entreprise"
  }
];

// Sample responses for the motivation interview
const aiResponses = [
  "C'est intéressant, maintenant veuillez justifier votre motivation pour le rôle",
  "Excellent ! Maintenant, parlez-moi d'une fois où vous avez démontré du leadership dans une situation difficile.",
  "Merci d'avoir partagé cela. Quelles compétences spécifiques avez-vous qui font de vous un bon candidat pour ce rôle ?",
  "Intéressant. Comment restez-vous à jour avec les tendances de l'industrie pertinentes pour ce poste ?",
  "C'est impressionnant. Comment géreriez-vous les désaccords avec les membres de l'équipe ?",
  "Vous pouvez continuer à justifier votre motivation ou cliquer ici pour continuer"
];

export const Generator = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Initialize state from localStorage to maintain state between page refreshes
  const [jobInfoSubmitted, setJobInfoSubmitted] = useState<boolean>(false);
  
  const [interviewCompleted, setInterviewCompleted] = useState<boolean>(false);

  // Step management
  const [currentStep, setCurrentStep] = useState<string>(() => {
    return "job-form";
  });

  // Form data for job information
  const [formData, setFormData] = useState({
    company: localStorage.getItem("jobCompany") || "",
    sector: localStorage.getItem("jobSector") || "",
    location: localStorage.getItem("jobLocation") || "",
    position: localStorage.getItem("jobPosition") || "",
    experienceType: localStorage.getItem("jobExperienceType") || "",
    startMonth: localStorage.getItem("jobStartMonth") || "",
    startYear: localStorage.getItem("jobStartYear") || "",
    description: localStorage.getItem("jobDescription") || ""
  });

  const [activeTab, setActiveTab] = useState<string>(jobInfoSubmitted && interviewCompleted ? "cv-generator" : "job-form");
  
  const [generatedFiles, setGeneratedFiles] = useState({
    cv: {
      name: `CV_${formData.position || "Candidat"}_${formData.company || "Entreprise"}.txt`.replace(/\s+/g, '_'),
      generated: false
    },
    coverLetter: {
      name: `Lettre_Motivation_${formData.position || "Candidat"}_${formData.company || "Entreprise"}.txt`.replace(/\s+/g, '_'),
      generated: false
    }
  });

  const [isGenerating, setIsGenerating] = useState({
    cv: false,
    coverLetter: false
  });

  // AI Interview state
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check if coming from interview with completion flag
  useEffect(() => {
    const interviewCompleted = location.state?.interviewCompleted;
    if (interviewCompleted) {
      // Save interview completion to localStorage
      localStorage.setItem("interviewCompleted", "true");
      setInterviewCompleted(true);
      setCurrentStep("document-generation");
    }
  }, [location.state]);
  
  // Auto-scroll to bottom when messages update in AI interview
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Job form handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Job information submitted:", formData);
    setJobInfoSubmitted(true);
    setCurrentStep("ai-interview");
  };

  const handleCancel = () => {
    if (window.confirm("Êtes-vous sûr de vouloir annuler ? Vos modifications ne seront pas enregistrées.")) {
      navigate("/dashboard");
    }
  };

  const resetProgress = () => {
    if (window.confirm("Êtes-vous sûr de vouloir recommencer ? Cela effacera toutes vos informations de poste et votre progression dans l'entretien.")) {
      // Reset state
      setJobInfoSubmitted(false);
      setInterviewCompleted(false);
      setFormData({
        company: "",
        sector: "",
        location: "",
        position: "",
        experienceType: "",
        startMonth: "",
        startYear: "",
        description: ""
      });
      setGeneratedFiles({
        cv: { name: "CV.docx", generated: false },
        coverLetter: { name: "CoverLetter.docx", generated: false }
      });
      setIsGenerating({
        cv: false,
        coverLetter: false
      });

      // Reset messages for AI interview
      setMessages(initialMessages);
      setInputText("");
      setIsTyping(false);
      setIsComplete(false);

      // Switch to job form step
      setCurrentStep("job-form");
      setActiveTab("job-form");
    }
  };

  // AI Interview handlers
  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, {
      sender: "user",
      content: inputText
    }]);
    setInputText("");
    
    // Simulate AI typing
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      setIsTyping(false);
      
      // Get the next response based on conversation progress
      const responseIndex = Math.min(messages.filter(m => m.sender === "user").length, aiResponses.length - 1);
      const response = aiResponses[responseIndex];
      
      setMessages(prev => [...prev, {
        sender: "ai",
        content: response
      }]);
      
      // Check if this is the last response to show the continue button
      if (responseIndex === aiResponses.length - 1) {
        setIsComplete(true);
      }
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleClearChat = () => {
    if (window.confirm("Êtes-vous sûr de vouloir effacer cette conversation et recommencer ?")) {
      setMessages(initialMessages);
      setIsComplete(false);
    }
  };
  
  const handleSaveTranscript = () => {
    // Create a text version of the chat
    const transcript = messages
      .map(msg => `${msg.sender === 'ai' ? 'AI' : 'You'}: ${msg.content}`)
      .join('\n\n');
    
    // Create a blob and download link
    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'motivation-interview-transcript.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const handleCompleteInterview = () => {
    setInterviewCompleted(true);
    setCurrentStep("document-generation");
  };

  // Document generation handlers
  const handleGenerate = (type: string) => {
    if (!jobInfoSubmitted || !interviewCompleted) {
      alert("Veuillez d'abord compléter le formulaire d'informations sur le poste et l'entretien de motivation.");
      return;
    }

    console.log(`Generating ${type}`);

    // Set loading state
    if (type === "cv") {
      setIsGenerating(prev => ({ ...prev, cv: true }));
    } else {
      setIsGenerating(prev => ({ ...prev, coverLetter: true }));
    }

    // Simulate API call with a delay
    setTimeout(() => {
      // In a real app, this would call an API to generate the document
      // For now, we'll just simulate a successful generation
      if (type === "cv") {
        setGeneratedFiles(prev => ({
          ...prev,
          cv: {
            name: `CV_${formData.position || "Candidat"}_${formData.company || "Entreprise"}.txt`.replace(/\s+/g, '_'),
            generated: true
          }
        }));
        setIsGenerating(prev => ({ ...prev, cv: false }));
        console.log("CV généré avec succès !");
      } else {
        setGeneratedFiles(prev => ({
          ...prev,
          coverLetter: {
            name: `Lettre_Motivation_${formData.position || "Candidat"}_${formData.company || "Entreprise"}.txt`.replace(/\s+/g, '_'),
            generated: true
          }
        }));
        setIsGenerating(prev => ({ ...prev, coverLetter: false }));
        console.log("Lettre de motivation générée avec succès !");
      }
    }, 1500);
  };

  const handleDownload = (type: string) => {
    console.log(`Downloading ${type} file`);

    const today = new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });

    let content = "";

    if (type === "cv") {
      content = `CURRICULUM VITAE

═══════════════════════════════════════════════════════════════════════════

PRÉNOM NOM
Adresse : Paris, France
Email : contact@email.com | Téléphone : +33 6 12 34 56 78

═══════════════════════════════════════════════════════════════════════════

OBJECTIF PROFESSIONNEL

Professionnel motivé et dynamique recherchant un poste de ${formData.position} chez ${formData.company}.
Fort d'une expérience significative et d'une formation solide, je souhaite contribuer au succès
de l'entreprise en apportant mes compétences techniques et mon expertise dans le domaine.

═══════════════════════════════════════════════════════════════════════════

FORMATION

2022-2024
Master en Management et Stratégie d'Entreprise
École de Commerce, Paris
• Spécialisation en stratégie d'entreprise, gestion de projet et innovation
• Formation approfondie en analyse financière, marketing stratégique et ressources humaines
• Mention Très Bien

2019-2022
Licence en Économie et Gestion
Université Paris-Dauphine
• Formation généraliste couvrant la microéconomie, la macroéconomie, la comptabilité,
  la finance et le management
• Major de promotion

═══════════════════════════════════════════════════════════════════════════

EXPÉRIENCE PROFESSIONNELLE

Juin 2023 - Août 2023
Stage en Stratégie et Développement
Grande Entreprise Internationale, Paris
• Analyse des opportunités de croissance et des tendances du marché pour orienter la stratégie commerciale
• Participation à l'élaboration de présentations stratégiques pour la direction générale
• Collaboration avec les équipes marketing et finance pour optimiser les processus internes
• Rédaction de rapports d'analyse concurrentielle et de recommandations stratégiques

Septembre 2022 - Décembre 2022
Assistant Chef de Projet
PME en Expansion, Lyon
• Coordination de projets transversaux impliquant plusieurs départements
• Suivi des indicateurs de performance et reporting régulier auprès de la direction
• Animation de réunions d'équipe et facilitation de la communication inter-services
• Contribution à l'amélioration continue des processus organisationnels

═══════════════════════════════════════════════════════════════════════════

COMPÉTENCES

Compétences Techniques :
• Pack Office (Excel, PowerPoint, Word) - Maîtrise avancée
• Analyse de données et reporting
• Gestion de projet (méthodes agiles)
• Outils de CRM et ERP

Compétences Transversales :
• Leadership et gestion d'équipe
• Communication interpersonnelle
• Résolution de problèmes complexes
• Adaptabilité et rigueur

═══════════════════════════════════════════════════════════════════════════

LANGUES

• Français : Langue maternelle
• Anglais : Courant (C1)
• Espagnol : Intermédiaire (B1)

═══════════════════════════════════════════════════════════════════════════
`;
    } else {
      content = `LETTRE DE MOTIVATION

═══════════════════════════════════════════════════════════════════════════

PRÉNOM NOM
Adresse : Paris, France
Email : contact@email.com | Téléphone : +33 6 12 34 56 78

${today}

Service Recrutement
${formData.company}
Adresse de l'entreprise

═══════════════════════════════════════════════════════════════════════════

Objet : Candidature au poste de ${formData.position}

═══════════════════════════════════════════════════════════════════════════

Madame, Monsieur,

C'est avec un vif intérêt que je vous adresse ma candidature pour le poste de ${formData.position}
au sein de ${formData.company}. Attiré(e) par votre entreprise reconnue pour son excellence et son
innovation, je suis convaincu(e) que mon profil et mes compétences correspondent parfaitement aux
exigences de ce poste.

Fort(e) d'une formation solide en management et stratégie d'entreprise, complétée par plusieurs
expériences professionnelles significatives, j'ai développé une expertise approfondie dans la
gestion de projets complexes et le pilotage d'équipes. Mon parcours m'a permis d'acquérir des
compétences essentielles en analyse stratégique, coordination d'activités transversales et
optimisation des processus organisationnels.

Au cours de mes précédentes expériences, j'ai notamment eu l'opportunité de contribuer à des
projets stratégiques d'envergure, impliquant une forte collaboration avec différents départements
et la direction générale. J'ai ainsi pu démontrer ma capacité à analyser des situations complexes,
à proposer des solutions innovantes et à les mettre en œuvre avec rigueur et efficacité. Ma
maîtrise des outils d'analyse et de gestion de projet, combinée à mon sens aigu de la
communication, m'a permis de mener à bien des missions variées et exigeantes.

Ce qui m'attire particulièrement chez ${formData.company}, c'est votre engagement pour
l'innovation, votre culture d'entreprise dynamique et votre vision stratégique à long terme.
Je suis persuadé(e) que mes compétences en analyse, ma capacité d'adaptation et mon esprit
d'équipe me permettront de contribuer efficacement aux objectifs de votre organisation et de
m'intégrer rapidement au sein de vos équipes.

Motivé(e), rigoureux(se) et doté(e) d'un excellent relationnel, je suis prêt(e) à m'investir
pleinement pour relever les défis qui caractérisent ce poste et participer activement au
développement de ${formData.company}. Ma volonté d'apprentissage continu et mon désir de
progresser dans un environnement stimulant font de moi un candidat idéal pour rejoindre votre
équipe.

Je reste à votre disposition pour un entretien au cours duquel je pourrai vous présenter plus
en détail mon parcours et ma motivation à rejoindre ${formData.company}. Je vous remercie par
avance de l'attention que vous porterez à ma candidature et vous prie d'agréer, Madame, Monsieur,
l'expression de mes salutations distinguées.

Cordialement,

PRÉNOM NOM

═══════════════════════════════════════════════════════════════════════════
`;
    }

    const blob = new Blob([content], {type: 'text/plain;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = type === "cv" ? generatedFiles.cv.name : generatedFiles.coverLetter.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Render the job information form
  const renderJobForm = () => {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0 ring-1 ring-slate-200/60 rounded-3xl overflow-hidden">
          <CardContent className="p-0">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-slate-50 to-white p-8 border-b border-slate-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
                  <FileTextIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Informations sur le Poste</h2>
                  <p className="text-slate-600 font-medium">Parlez-nous du poste pour lequel vous postulez</p>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Company & Sector Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label htmlFor="company" className="block text-slate-700 font-semibold text-sm tracking-tight">
                    Entreprise
                  </label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="ex: Google, Microsoft, Apple"
                    className="h-12 bg-slate-50/50 border-0 ring-1 ring-slate-200/60 rounded-2xl px-4 text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-200"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label htmlFor="sector" className="block text-slate-700 font-semibold text-sm tracking-tight">
                    Secteur d'Entreprise
                  </label>
                  <TwoLevelSectorDropdown
                    value={formData.sector}
                    onChange={(value) => handleSelectChange("sector", value)}
                    required
                  />
                </div>
              </div>

              {/* Location Row */}
              <div className="space-y-3">
                <label htmlFor="location" className="block text-slate-700 font-semibold text-sm tracking-tight">
                  Localisation
                </label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="ex: Paris, France"
                  className="h-12 bg-slate-50/50 border-0 ring-1 ring-slate-200/60 rounded-2xl px-4 text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-200"
                  required
                />
              </div>

              {/* Position & Experience Type Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label htmlFor="position" className="block text-slate-700 font-semibold text-sm tracking-tight">
                    Intitulé du Poste
                  </label>
                  <Input
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    placeholder="ex: Ingénieur Logiciel, Chef de Produit"
                    className="h-12 bg-slate-50/50 border-0 ring-1 ring-slate-200/60 rounded-2xl px-4 text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-200"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label htmlFor="experienceType" className="block text-slate-700 font-semibold text-sm tracking-tight">
                    Type d'Expérience
                  </label>
                  <Select
                    value={formData.experienceType}
                    onValueChange={(value) => handleSelectChange("experienceType", value)}
                    required
                  >
                    <SelectTrigger className="h-12 bg-slate-50/50 border-0 ring-1 ring-slate-200/60 rounded-2xl px-4 text-slate-800 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-200">
                      <SelectValue placeholder="Sélectionnez un type d'expérience" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-sm border-0 ring-1 ring-slate-200/60 rounded-2xl shadow-lg">
                      {experienceTypes.map((type) => (
                        <SelectItem 
                          key={type} 
                          value={type}
                          className="rounded-xl hover:bg-blue-50 focus:bg-blue-50 text-slate-700"
                        >
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Start Date Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label htmlFor="startMonth" className="block text-slate-700 font-semibold text-sm tracking-tight">
                    Mois de Début
                  </label>
                  <Select
                    value={formData.startMonth}
                    onValueChange={(value) => handleSelectChange("startMonth", value)}
                    required
                  >
                    <SelectTrigger className="h-12 bg-slate-50/50 border-0 ring-1 ring-slate-200/60 rounded-2xl px-4 text-slate-800 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-200">
                      <SelectValue placeholder="Sélectionnez un mois" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-sm border-0 ring-1 ring-slate-200/60 rounded-2xl shadow-lg">
                      {months.map((month) => (
                        <SelectItem 
                          key={month} 
                          value={month}
                          className="rounded-xl hover:bg-blue-50 focus:bg-blue-50 text-slate-700"
                        >
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <label htmlFor="startYear" className="block text-slate-700 font-semibold text-sm tracking-tight">
                    Année de Début
                  </label>
                  <Select
                    value={formData.startYear}
                    onValueChange={(value) => handleSelectChange("startYear", value)}
                    required
                  >
                    <SelectTrigger className="h-12 bg-slate-50/50 border-0 ring-1 ring-slate-200/60 rounded-2xl px-4 text-slate-800 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-200">
                      <SelectValue placeholder="Sélectionnez une année" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-sm border-0 ring-1 ring-slate-200/60 rounded-2xl shadow-lg">
                      {years.map((year) => (
                        <SelectItem 
                          key={year} 
                          value={year.toString()}
                          className="rounded-xl hover:bg-blue-50 focus:bg-blue-50 text-slate-700"
                        >
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Job Description */}
              <div className="space-y-3">
                <label htmlFor="description" className="block text-slate-700 font-semibold text-sm tracking-tight">
                  Description du Poste
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Collez la description complète du poste ici. Incluez les responsabilités, les exigences et toutes les compétences spécifiques mentionnées..."
                  className="w-full h-40 bg-slate-50/50 border-0 ring-1 ring-slate-200/60 rounded-2xl p-4 text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-200 resize-none"
                  required
                />
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full sm:w-40 h-12 rounded-2xl border-0 ring-1 ring-slate-200/60 text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-all duration-200"
                  onClick={handleCancel}
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  className="w-full sm:w-40 h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-2xl text-white font-semibold shadow-sm hover:shadow-md transition-all duration-200"
                >
                  Continuer
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        {/* AI Assistant Tip */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-blue-100/50 border-0 ring-1 ring-blue-200/60 rounded-3xl">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
                  <img 
                    src="/logo.png" 
                    alt="AI" 
                    className="w-6 h-6"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/24x24/white/blue?text=AI";
                    }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-blue-800 font-semibold tracking-tight">Conseil de l'Assistant IA</p>
                <p className="text-slate-700 text-sm leading-relaxed">
                  L'ajout de descriptions de poste détaillées m'aide à générer du contenu plus adapté à votre candidature. Incluez les responsabilités clés, les compétences requises et les détails sur la culture d'entreprise pour de meilleurs résultats.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Render the AI Interview
  const renderAIInterview = () => {
    return (
      <div className="flex-1 flex flex-col h-full">
        {/* Enhanced Header with Full Width */}
        <div className="flex-shrink-0 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm">
          <div className="w-full px-8 py-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-700 bg-clip-text text-transparent tracking-tight">
                Entretien de Motivation
              </h1>
              <p className="text-slate-600 font-medium">
                Discutons de votre motivation pour ce poste et comprenons pourquoi vous souhaitez rejoindre cette entreprise
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Chat Area - Full Width */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full w-full flex flex-col">
            {/* Messages Container with Full Width */}
            <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex animate-fadeIn ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {message.sender === 'ai' && (
                    <div className="flex-shrink-0 mr-4">
                      <img
                        src="/logo.png"
                        alt="AI"
                        className="w-12 h-12 rounded-full"
                        onError={(e) => {
                          e.currentTarget.src = "https://placehold.co/48x48/white/blue?text=AI";
                        }}
                      />
                    </div>
                  )}

                  <div className={`max-w-[75%] ${message.sender === 'user' ? 'order-1' : 'order-2'}`}>
                    <div className={`p-5 rounded-3xl shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 text-white rounded-tr-lg shadow-blue-200/50'
                        : 'bg-white/90 text-slate-800 rounded-tl-lg border border-white/40 shadow-slate-200/50'
                    }`}>
                      {message.sender === 'ai' && isComplete && message.content.includes("cliquer ici") ? (
                        <p className="leading-relaxed text-base font-medium">
                          Vous pouvez continuer à justifier votre motivation ou{' '}
                          <button
                            onClick={handleCompleteInterview}
                            className="text-blue-600 underline font-semibold hover:text-blue-700 transition-colors"
                          >
                            cliquer ici pour continuer
                          </button>
                        </p>
                      ) : (
                        <p className="leading-relaxed text-base font-medium">{message.content}</p>
                      )}
                    </div>
                    <div className={`text-xs text-slate-400 mt-2 font-medium ${
                      message.sender === 'user' ? 'text-right' : 'text-left'
                    }`}>
                      {message.sender === 'user' ? 'Vous' : 'Agent de Carrière IA'}
                    </div>
                  </div>

                  {message.sender === 'user' && (
                    <div className="flex-shrink-0 ml-4 order-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg ring-2 ring-slate-200">
                        U
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Enhanced Typing indicator */}
              {isTyping && (
                <div className="flex justify-start animate-fadeIn">
                  <div className="flex-shrink-0 mr-4">
                    <img
                      src="/logo.png"
                      alt="AI"
                      className="w-12 h-12 rounded-full"
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/48x48/white/blue?text=AI";
                      }}
                    />
                  </div>

                  <div className="p-5 bg-white/90 backdrop-blur-sm text-slate-800 rounded-3xl rounded-tl-lg border border-white/40 shadow-lg">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef}></div>
            </div>

            {/* Enhanced Input Area - Full Width */}
            <div className="flex-shrink-0 bg-white/80 backdrop-blur-xl border-t border-white/20 px-8 py-8">
              <div className="flex gap-4 w-full">
                <Input
                  className="flex-1 h-16 rounded-3xl bg-white/90 backdrop-blur-sm border-white/40 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 px-8 text-base placeholder:text-slate-400 shadow-lg font-medium transition-all duration-300"
                  placeholder="Tapez votre réponse ici..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isTyping}
                />
                <Button
                  className="h-16 w-16 rounded-3xl bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 ring-2 ring-blue-100 hover:ring-blue-200"
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                >
                  <SendIcon className="w-6 h-6 text-white" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render the document generator UI
  const renderDocumentGenerator = () => {
    // If job info isn't submitted yet, direct user to complete that step first
    if (!jobInfoSubmitted) {
      return (
        <div className="max-w-2xl mx-auto text-center p-8 bg-white rounded-xl shadow-sm">
          <FileTextIcon className="h-16 w-16 mx-auto text-blue-500 mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Informations sur le Poste Requises</h2>
          <p className="text-slate-600 mb-6">
            Veuillez fournir des informations sur le poste pour lequel vous postulez avant de générer les documents.
          </p>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setCurrentStep("job-form")}
          >
            Ajouter les Informations du Poste
          </Button>
        </div>
      );
    }
    
    // If interview isn't completed yet, prompt user to complete the interview
    if (!interviewCompleted) {
      return (
        <div className="max-w-2xl mx-auto text-center p-8 bg-white rounded-xl shadow-sm">
          <FileTextIcon className="h-16 w-16 mx-auto text-blue-500 mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Entretien de Motivation Requis</h2>
          <p className="text-slate-600 mb-6">
            Veuillez compléter l'entretien de motivation pour nous aider à personnaliser votre CV et lettre de motivation.
          </p>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setCurrentStep("ai-interview")}
          >
            Commencer l'Entretien
          </Button>
        </div>
      );
    }
    
    // If both steps are completed, show the document generator tabs
    return (
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Générateur</h1>
          
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              className="text-red-500 border-red-200"
              onClick={resetProgress}
            >
              Recommencer
            </Button>
          </div>
        </div>
        
        
        
        <Tabs defaultValue="cv-generator" className="w-full">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="cv-generator" className="flex-1">Générateur de CV</TabsTrigger>
            <TabsTrigger value="cl-generator" className="flex-1">Générateur de Lettre de Motivation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="cv-generator" className="mt-0">
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-blue-50 p-6 rounded-xl mr-6">
                    <FileIcon className="h-12 w-12 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">Générateur de CV</h2>
                    <p className="text-slate-600 mt-1">Générez un CV personnalisé pour {formData.company || "votre entreprise cible"}</p>

                    <Button
                      className="bg-blue-600 mt-4 px-8"
                      onClick={() => handleGenerate("cv")}
                      disabled={isGenerating.cv}
                    >
                      {isGenerating.cv ? "Génération..." : "Générer"}
                    </Button>
                  </div>
                </div>
                
                {generatedFiles.cv.generated && (
                  <div className="mt-6 p-4 border border-slate-200 rounded-lg flex justify-between items-center">
                    <span className="text-slate-700">{generatedFiles.cv.name}</span>
                    <Button 
                      variant="outline"
                      onClick={() => handleDownload("cv")}
                      className="text-blue-600"
                    >
                      Télécharger
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {generatedFiles.cv.generated && (
              <DocumentView
                type="cv"
                data={{
                  name: "Alex Smith",
                  position: formData.position || "Software Engineer",
                  company: formData.company || "Google"
                }}
                onDownload={() => handleDownload("cv")}
              />
            )}
          </TabsContent>
          
          <TabsContent value="cl-generator" className="mt-0">
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-blue-50 p-6 rounded-xl mr-6">
                    <FileTextIcon className="h-12 w-12 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">Générateur de Lettre de Motivation</h2>
                    <p className="text-slate-600 mt-1">Générez une lettre de motivation personnalisée pour {formData.company || "votre entreprise cible"}</p>

                    <Button
                      className="bg-blue-600 mt-4 px-8"
                      onClick={() => handleGenerate("coverLetter")}
                      disabled={isGenerating.coverLetter}
                    >
                      {isGenerating.coverLetter ? "Génération..." : "Générer"}
                    </Button>
                  </div>
                </div>
                
                {generatedFiles.coverLetter.generated && (
                  <div className="mt-6 p-4 border border-slate-200 rounded-lg flex justify-between items-center">
                    <span className="text-slate-700">{generatedFiles.coverLetter.name}</span>
                    <Button 
                      variant="outline"
                      onClick={() => handleDownload("coverLetter")}
                      className="text-blue-600"
                    >
                      Télécharger
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {generatedFiles.coverLetter.generated && (
              <DocumentView
                type="coverLetter"
                data={{
                  name: "Alex Smith",
                  position: formData.position || "Internal Communication Manager",
                  company: formData.company || "Google",
                  date: "07/03/2025"
                }}
                onDownload={() => handleDownload("coverLetter")}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  return (
    <main className={`flex ${currentStep === "ai-interview" ? "h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 overflow-hidden" : "min-h-screen bg-gradient-to-br from-slate-50 to-white"}`}>
      <aside className={`${currentStep === "ai-interview" ? "h-full" : "h-full"} w-60 flex-shrink-0`}>
        <NavigationSection />
      </aside>

      {currentStep === "ai-interview" ? (
        renderAIInterview()
      ) : (
        <div className="flex-1 p-8">
          {/* Header with back button for job form */}
          {currentStep === "job-form" && (
            <div className="flex items-center gap-4 mb-8">
              <Button
                variant="ghost"
                className="rounded-2xl p-3 h-12 w-12 hover:bg-slate-100 transition-all duration-200"
                onClick={() => navigate(-1)}
              >
                <ArrowLeftIcon className="h-5 w-5 text-slate-600" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Entrer les Informations sur le Poste</h1>
                <p className="text-slate-600 font-medium">Commençons par recueillir des détails sur le poste que vous visez</p>
              </div>
            </div>
          )}

          {/* Render the appropriate content based on the current step */}
          {currentStep === "job-form" && renderJobForm()}
          {currentStep === "document-generation" && renderDocumentGenerator()}
        </div>
      )}
    </main>
  );
};