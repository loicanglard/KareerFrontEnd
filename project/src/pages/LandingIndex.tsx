import { LandingHeader } from "@/components/LandingHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Frown, User, FileText, BarChart2, Users, Send, MessageCircle } from "lucide-react";

const features = [
  {
    icon: <User className="w-6 h-6" />,
    title: "Entretien de Profil",
    desc: "Révélez vos atouts avec l'IA.",
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Générateur CV & Lettre de Motivation",
    desc: "Candidatures personnalisées en 1 clic.",
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "Entretien de Motivation IA",
    desc: "Préparez vos entretiens avec l'IA.",
  },
  {
    icon: <Send className="w-6 h-6" />,
    title: "Suivi des Candidatures",
    desc: "Job Tracker simple et efficace.",
  },
  {
    icon: <BarChart2 className="w-6 h-6" />,
    title: "Tableau de Bord École",
    desc: "Analytiques & suivi en temps réel.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Analytiques École",
    desc: "Mesurez l'impact et l'employabilité.",
  },
];

const animationStyles = `
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(32px);}
  to { opacity: 1; transform: translateY(0);}
}
.animate-fade-in-up {
  animation: fade-in-up 0.8s cubic-bezier(.4,0,.2,1) both;
}
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
.animate-float {
  animation: float 3s ease-in-out infinite;
}
@keyframes scale-in {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}
.animate-scale-in {
  animation: scale-in 0.6s cubic-bezier(.4,0,.2,1) both;
}
`;

export default function LandingIndex() {
  return (
    <div className="bg-gradient-to-b from-white via-gray-50 to-blue-50 min-h-screen">
      <style>{animationStyles}</style>
      <LandingHeader />
      <section
        className="relative w-full pt-16 pb-24 px-4 md:px-0 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1D2A41 0%, #2a3f5f 50%, #62C2FF 100%)",
          borderBottomLeftRadius: 48,
          borderBottomRightRadius: 48,
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-300 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-left">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up leading-tight"
              style={{
                color: "#fff",
                fontFamily: "'Montserrat', sans-serif",
                letterSpacing: "-0.03em",
                animationDelay: "0ms",
              }}
            >
              L'IA qui transforme la recherche de stage et d'emploi.
            </h1>
            <p
              className="text-lg md:text-xl mb-8 animate-fade-in-up leading-relaxed text-blue-50"
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: 400,
                animationDelay: "120ms",
              }}
            >
              Kareer aide les étudiants à décrocher des opportunités et permet aux écoles de mieux les comprendre et suivre leurs résultats en temps réel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-6 animate-fade-in-up"
              style={{ animationDelay: "240ms" }}>
              <Button
                asChild
                className="bg-white hover:bg-gray-50 text-[#1D2A41] font-semibold px-10 py-6 rounded-full font-montserrat shadow-xl border-0 transition-all duration-300 hover:scale-105 hover:shadow-2xl text-lg"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                }}
              >
                <Link to="/contact" className="flex items-center gap-2">
                  Demander une Démo
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 flex justify-center items-center animate-scale-in animate-float"
            style={{ animationDelay: "360ms" }}>
            <div className="relative w-[320px] h-[220px] md:w-[450px] md:h-[280px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
              <video
                className="w-full h-full object-cover rounded-2xl"
                src=""
                poster="/placeholder.svg"
                controls
                style={{ borderRadius: 24 }}
              >
              </video>
              <span className="absolute bottom-2 right-2 text-xs text-gray-400 bg-white/80 px-2 py-0.5 rounded-lg shadow">
                Vidéo de présentation (30s)
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-0 my-20 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl">
        <div className="bg-white flex flex-col items-center justify-center p-10 md:p-12 min-h-[240px] rounded-none md:rounded-l-3xl transition-all duration-300 hover:bg-gray-50">
          <Frown className="w-14 h-14 text-gray-400 mb-4 transition-all duration-300 hover:scale-110" />
          <p className="text-lg text-[#1D2A41] font-bold mb-2 font-montserrat text-center">
            Trop de candidatures, peu de réponses, aucun suivi.
          </p>
          <p className="text-base text-gray-500 font-opensans text-center">
            Difficile de mesurer l'employabilité et d'accompagner chaque étudiant.
          </p>
        </div>
        <div className="bg-gradient-to-br from-[#62C2FF] via-[#1D8FFF] to-[#1D2A41] flex flex-col items-center justify-center p-10 md:p-12 min-h-[240px] rounded-none md:rounded-r-3xl transition-all duration-300 hover:from-[#4bb2f0] hover:via-[#1D7FEF] hover:to-[#162030]">
          <CheckCircle className="w-14 h-14 text-white mb-4 transition-all duration-300 hover:scale-110" />
          <p className="text-lg text-white font-bold mb-2 font-montserrat text-center drop-shadow">
            Kareer centralise tout : candidatures de qualité, suivi clair, analytiques pour les écoles.
          </p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto py-20 px-4">
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-14"
          style={{
            color: "#1D2A41",
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          Fonctionnalités Clés
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="group flex flex-col items-center bg-white rounded-2xl shadow-md hover:shadow-xl p-8 gap-4 border border-gray-100 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <div className="bg-gradient-to-br from-[#62C2FF] via-[#1D8FFF] to-[#1D2A41] text-white rounded-full p-4 mb-2 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                {f.icon}
              </div>
              <div
                className="font-bold text-lg text-[#1D2A41] font-montserrat"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {f.title}
              </div>
              <div
                className="text-gray-600 text-center font-opensans leading-relaxed"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                {f.desc}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="w-full bg-gradient-to-b from-gray-50 via-blue-50 to-cyan-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h3
            className="text-2xl md:text-3xl font-bold text-center mb-12"
            style={{
              color: "#1D2A41",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Ils Nous Font Confiance
          </h3>
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl p-8 max-w-md mx-auto border border-gray-100 transition-all duration-300 hover:-translate-y-1">
              <p className="text-gray-700 italic mb-4 text-lg leading-relaxed">
                "Grâce à Kareer, j'ai décroché mon stage en 2 semaines !"
              </p>
              <div className="text-sm text-gray-500 font-semibold">— Clara, étudiante</div>
            </div>
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl p-8 max-w-md mx-auto border border-gray-100 transition-all duration-300 hover:-translate-y-1">
              <p className="text-gray-700 italic mb-4 text-lg leading-relaxed">
                "Le suivi des candidatures est un vrai plus pour nos étudiants."
              </p>
              <div className="text-sm text-gray-500 font-semibold">— M. Dupont, responsable carrières</div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="relative w-full py-20 flex flex-col items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1D2A41 0%, #2a3f5f 50%, #62C2FF 100%)",
          borderTopLeftRadius: 48,
          borderTopRightRadius: 48,
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-80 h-80 bg-cyan-300 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-8 text-center px-4"
            style={{
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Essayez Kareer Aujourd'hui
          </h2>
          <div className="flex justify-center">
            <Button
              asChild
              className="bg-white hover:bg-gray-50 text-[#1D2A41] font-semibold px-10 py-6 rounded-full font-montserrat shadow-xl border-0 transition-all duration-300 hover:scale-105 hover:shadow-2xl text-lg"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}
            >
              <Link to="/contact" className="flex items-center gap-2">
                Demander une Démo
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
