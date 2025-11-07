import React, { useState, useEffect, useRef } from "react";
import { NavigationSection } from "../Dashboard/sections/NavigationSection";
import { Button } from "../../components/ui/button";
import { 
  SendIcon, 
  RefreshCw,
  AlertCircleIcon
} from "lucide-react";
import { Input } from "../../components/ui/input";
import { Link, useNavigate } from "react-router-dom";

// Initial message from the career agent
const initialMessages = [
  {
    sender: "ai",
    content: "Bonjour ! Je suis votre agent de carrière IA, et je suis là pour vous aider à construire un profil professionnel complet. Je vous poserai une série de questions pour comprendre votre parcours, vos compétences et vos aspirations professionnelles. Commençons par votre nom - comment dois-je vous appeler ?"
  }
];

export const AIInterview = (): JSX.Element => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [interviewProgress, setInterviewProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Calculate dynamic progress based on conversation depth and quality
  const calculateProgress = (conversationLength: number, isCompleted: boolean) => {
    if (isCompleted) return 100;
    
    // Base progress calculation
    // We expect around 8-12 meaningful exchanges for a complete profile
    const expectedExchanges = 10;
    const baseProgress = Math.min((conversationLength / expectedExchanges) * 85, 85);
    
    // Add bonus progress for longer, more detailed responses
    const userMessages = messages.filter(msg => msg.sender === "user");
    const avgResponseLength = userMessages.reduce((acc, msg) => acc + msg.content.length, 0) / Math.max(userMessages.length, 1);
    
    // Bonus for detailed responses (50+ characters average)
    const detailBonus = avgResponseLength > 50 ? Math.min((avgResponseLength - 50) / 20, 10) : 0;
    
    return Math.min(Math.round(baseProgress + detailBonus), 90);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isComplete) return;
    
    // Clear any previous errors
    setError(null);
    
    // Add user message
    const newUserMessage = { sender: "user", content: inputText };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInputText("");
    
    // Calculate and update progress immediately
    const newProgress = calculateProgress(updatedMessages.filter(msg => msg.sender === "user").length, false);
    setInterviewProgress(newProgress);
    
    // Show typing indicator
    setIsTyping(true);
    
    try {
      // Prepare conversation history for API
      const conversationHistory = updatedMessages.map(msg => ({
        role: msg.sender === "ai" ? "assistant" : "user",
        content: msg.content
      }));

      // System message to define the AI's role and behavior
      const systemMessage = {
        role: "system",
        content: `Vous êtes un agent de carrière professionnel conçu pour aider les utilisateurs à créer des profils professionnels complets. Votre objectif est de poser des questions concises, en une seule phrase, qui recueillent des informations clés sur leurs aspirations professionnelles, leur parcours éducatif, leurs compétences, leur expérience professionnelle, leurs réalisations et leurs préférences.

Directives :
- Posez seulement UNE question par réponse
- Gardez les questions concises (1 phrase maximum)
- Concentrez-vous sur la collecte d'informations spécifiques et exploitables
- Posez des questions sur : les objectifs de carrière, la formation, les compétences, l'expérience professionnelle, les réalisations, les préférences sectorielles, les points forts, les domaines de développement, les certifications et les préférences d'environnement de travail
- Ne fournissez pas d'explications ou de discours inutile
- Soyez professionnel mais amical
- Chaque question doit contribuer à construire un profil professionnel complet
- Lorsque vous pensez avoir recueilli suffisamment d'informations pour créer un profil professionnel complet (généralement après 8 à 12 échanges significatifs), concluez votre réponse en déclarant : 'Entretien de profil terminé. Vous pouvez maintenant procéder à la génération de vos documents.' Ne posez plus de questions après cette déclaration.`
      };

      // Simulate API call with a timeout
      setTimeout(() => {
        // Simulate AI response
        const aiResponses = [
          "Quelles compétences spécifiques ou compétences techniques possédez-vous qui sont pertinentes pour votre parcours professionnel souhaité ?",
          "Pourriez-vous me parler de votre parcours éducatif, y compris les diplômes, les établissements et les années d'obtention ?",
          "Quelle expérience professionnelle avez-vous, y compris les stages ou les postes à temps partiel ?",
          "Quels sont vos objectifs de carrière à court et à long terme ?",
          "Pouvez-vous décrire une réalisation professionnelle importante dont vous êtes fier ?",
          "Quels secteurs d'activité vous intéressent le plus ?",
          "Quels sont vos principaux atouts qui vous distinguent des autres candidats ?",
          "Avez-vous des certifications ou formations spécialisées pertinentes pour votre domaine ?",
          "Quel type d'environnement de travail vous convient le mieux ?",
          "Entretien de profil terminé. Vous pouvez maintenant procéder à la génération de vos documents."
        ];
        
        // Get next response based on conversation length
        const responseIndex = Math.min(updatedMessages.filter(msg => msg.sender === "user").length - 1, aiResponses.length - 1);
        const aiResponseContent = aiResponses[responseIndex];
        
        // Check if the AI has completed the interview
        const isInterviewComplete = aiResponseContent.includes("Entretien de profil terminé. Vous pouvez maintenant procéder à la génération de vos documents.");

        let displayContent = aiResponseContent;
        if (isInterviewComplete) {
          // Remove the completion phrase from the displayed message
          displayContent = aiResponseContent.replace("Entretien de profil terminé. Vous pouvez maintenant procéder à la génération de vos documents.", "").trim();
          setIsComplete(true);
          setInterviewProgress(100);
        } else {
          // Recalculate progress with the new AI response
          const finalProgress = calculateProgress(updatedMessages.filter(msg => msg.sender === "user").length, false);
          setInterviewProgress(finalProgress);
        }

        // Add AI response (with cleaned content if interview is complete)
        const newAiMessage = { sender: "ai", content: displayContent };
        setMessages(prev => [...prev, newAiMessage]);
        
        // If interview is complete, add a completion message after a delay
        if (isInterviewComplete) {
          setTimeout(() => {
            setMessages(prev => [...prev, {
              sender: "ai",
              content: "Merci d'avoir complété l'entretien de profil ! J'ai recueilli des informations complètes sur votre parcours professionnel et vos objectifs de carrière. Vous pouvez maintenant procéder à la génération de vos documents personnalisés."
            }]);
          }, 1000);
        }
        
        setIsTyping(false);
      }, 1500);

    } catch (error) {
      console.error("Error in interview process:", error);
      setError("J'ai des difficultés de connexion en ce moment. Veuillez réessayer.");
      setMessages(prev => [...prev, {
        sender: "ai",
        content: "Je suis désolé, j'ai des difficultés de connexion en ce moment. Veuillez réessayer plus tard."
      }]);
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages(initialMessages);
    setIsComplete(false);
    setInterviewProgress(0);
    setError(null);
    setShowResetModal(false);
  };

  const handleResetClick = () => {
    setShowResetModal(true);
  };

  const handleCancelReset = () => {
    setShowResetModal(false);
  };
  
  return (
    <main className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 overflow-hidden">
      <aside className="h-full w-60 flex-shrink-0">
        <NavigationSection />
      </aside>
      
      <div className="flex-1 flex flex-col h-full">
        {/* Enhanced Header with Full Width */}
        <div className="flex-shrink-0 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm">
          <div className="w-full px-8 py-8">
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-700 bg-clip-text text-transparent tracking-tight">
                  Entretien de Carrière IA
                </h1>
                <p className="text-slate-600 font-medium">
                  Laissez notre agent de carrière IA vous aider à créer un profil professionnel complet
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetClick}
                className="gap-2 bg-white/60 backdrop-blur-sm border-white/30 hover:bg-white/80 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <RefreshCw className="w-4 h-4" />
                Réinitialiser
              </Button>
            </div>

            {/* Enhanced Error Display - Full Width */}
            {error && (
              <div className="mt-6 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200/60 rounded-2xl flex items-center gap-3 shadow-sm animate-slideIn">
                <AlertCircleIcon className="w-5 h-5 text-red-500" />
                <span className="text-red-700 font-medium">{error}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setError(null)}
                  className="ml-auto bg-white/60 border-red-200 text-red-600 hover:bg-red-50"
                >
                  Fermer
                </Button>
              </div>
            )}
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
                      <p className="leading-relaxed text-base font-medium">{message.content}</p>
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
              {isComplete ? (
                <div className="bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50 border border-emerald-200/60 p-8 rounded-3xl shadow-lg backdrop-blur-sm w-full">
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ring-2 ring-emerald-100">
                      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-emerald-800 text-xl mb-3 tracking-tight">Entretien Terminé !</h3>
                      <p className="text-emerald-700 font-medium leading-relaxed">
                        Vous avez terminé avec succès l'entretien de profil. Vos informations de profil complètes ont été recueillies et sont prêtes pour la génération de documents.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
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
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Custom Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 max-w-md mx-4 shadow-2xl border border-white/40 animate-slideIn">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center shadow-sm">
                <AlertCircleIcon className="w-7 h-7 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 tracking-tight">Réinitialiser l'Entretien</h3>
                <p className="text-slate-600 text-sm font-medium">Cette action ne peut pas être annulée</p>
              </div>
            </div>
            
            <p className="text-slate-700 mb-8 leading-relaxed font-medium">
              Êtes-vous sûr de vouloir réinitialiser l'entretien ? Tous vos progrès et réponses seront perdus.
            </p>
            
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={handleCancelReset}
                className="px-8 h-12 rounded-2xl bg-white/60 border-slate-200 hover:bg-slate-50 font-semibold transition-all duration-300"
              >
                Annuler
              </Button>
              <Button
                onClick={handleClearChat}
                className="px-8 h-12 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Réinitialiser l'Entretien
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};