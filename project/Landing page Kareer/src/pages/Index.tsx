import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Frown, User, FileText, BarChart2, Users, Send, MessageCircle } from "lucide-react";

const features = [
  {
    icon: <User className="w-6 h-6" />,
    title: "Interview de profil",
    desc: "Révélez vos atouts grâce à l’IA.",
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Générateur de CV & lettres",
    desc: "Des candidatures personnalisées en 1 clic.",
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "Interview IA de motivation",
    desc: "Préparez vos entretiens avec l’IA.",
  },
  {
    icon: <Send className="w-6 h-6" />,
    title: "Suivi des candidatures",
    desc: "Job Tracker simple et efficace.",
  },
  {
    icon: <BarChart2 className="w-6 h-6" />,
    title: "Tableau de bord écoles",
    desc: "Analytics & suivi en temps réel.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Analytics pour écoles",
    desc: "Mesurez l’impact et l’employabilité.",
  },
];

// Animation CSS
const animationStyles = `
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(32px);}
  to { opacity: 1; transform: translateY(0);}
}
.animate-fade-in-up {
  animation: fade-in-up 0.8s cubic-bezier(.4,0,.2,1) both;
}
`;

export default function Index() {
  return (
    <div className="bg-gradient-to-b from-white via-[#F5F6F8] to-[#eaf6ff] min-h-screen">
      <style>{animationStyles}</style>
      <Header />
      {/* HERO */}
      <section
        className="w-full pt-12 pb-20 px-4 md:px-0"
        style={{
          background: "linear-gradient(90deg, #1D2A41 60%, #62C2FF 100%)",
          borderBottomLeftRadius: 48,
          borderBottomRightRadius: 48,
          boxShadow: "0 8px 32px 0 rgba(29,42,65,0.10)",
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex-1 text-left">
            <h1
              className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up"
              style={{
                color: "#fff",
                fontFamily: "'Montserrat', sans-serif",
                letterSpacing: "-0.03em",
                textShadow: "0 2px 16px rgba(29,42,65,0.10)",
                animationDelay: "0ms",
              }}
            >
              L’IA qui transforme la recherche de stage et d’emploi.
            </h1>
            <p
              className="text-lg md:text-xl mb-8 animate-fade-in-up"
              style={{
                color: "#fff",
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: 400,
                textShadow: "0 1px 8px rgba(29,42,65,0.10)",
                animationDelay: "120ms",
              }}
            >
              Kareer aide les étudiants à décrocher des opportunités et permet aux écoles de mieux les connaître et de suivre leurs résultats en temps réel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-6 animate-fade-in-up"
              style={{ animationDelay: "240ms" }}>
              {/* Bouton Demander une démo, dégradé bleu clair/blanc, sans emoji */}
              <Button
                asChild
                className="bg-gradient-to-r from-[#62C2FF] to-[#eaf6ff] hover:from-[#4bb2f0] hover:to-[#eaf6ff] text-[#1D2A41] font-semibold px-8 py-4 rounded-full font-montserrat shadow-2xl border-0 transition-all duration-200 hover:scale-105 text-lg"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700,
                  boxShadow: "0 6px 32px 0 rgba(98,194,255,0.18)",
                  letterSpacing: "-0.01em",
                }}
              >
                <Link to="/contact" className="flex items-center gap-2">
                  Demander une démo
                </Link>
              </Button>
            </div>
          </div>
          {/* Mockup vidéo */}
          <div className="flex-1 flex justify-center items-center animate-fade-in-up"
            style={{ animationDelay: "360ms" }}>
            <div className="relative w-[320px] h-[220px] md:w-[400px] md:h-[260px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#e3f0ff] via-[#cbe7ff] to-[#62C2FF] flex items-center justify-center border-4 border-white/60">
              <video
                className="w-full h-full object-cover rounded-2xl"
                src=""
                poster="/placeholder.svg"
                controls
                style={{ borderRadius: 24 }}
              >
                {/* Placeholder Kareer video */}
              </video>
              <span className="absolute bottom-2 right-2 text-xs text-gray-400 bg-white/80 px-2 py-0.5 rounded-lg shadow">
                Vidéo de présentation (30s)
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* PROBLÈME / SOLUTION */}
      <section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-0 my-16 rounded-3xl overflow-hidden shadow-lg">
        <div className="bg-white flex flex-col items-center justify-center p-10 min-h-[220px] rounded-none md:rounded-l-3xl">
          <Frown className="w-12 h-12 text-[#1D2A41] mb-4" />
          <p className="text-lg text-[#1D2A41] font-bold mb-2 font-montserrat text-center">
            Trop de candidatures, peu de réponses, aucun suivi.
          </p>
          <p className="text-base text-gray-500 font-opensans text-center">
            Difficile de mesurer l’employabilité et de soutenir chaque étudiant.
          </p>
        </div>
        <div className="bg-gradient-to-br from-[#62C2FF] via-[#1D8FFF] to-[#1D2A41] flex flex-col items-center justify-center p-10 min-h-[220px] rounded-none md:rounded-r-3xl">
          <CheckCircle className="w-12 h-12 text-white mb-4" />
          <p className="text-lg text-white font-bold mb-2 font-montserrat text-center drop-shadow">
            Kareer centralise tout : candidatures de qualité, suivi clair, analytics pour les écoles.
          </p>
        </div>
      </section>
      {/* FONCTIONNALITÉS CLÉS */}
      <section className="max-w-7xl mx-auto py-16 px-4">
        <h2
          className="text-2xl md:text-3xl font-bold text-center mb-10"
          style={{
            color: "#1D2A41",
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          Fonctionnalités clés
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex flex-col items-center bg-gradient-to-br from-white via-[#e3f0ff] to-[#cbe7ff] rounded-2xl shadow-lg p-8 gap-4 border border-[#e3f0ff]"
            >
              <div className="bg-gradient-to-br from-[#62C2FF] via-[#1D8FFF] to-[#1D2A41] text-white rounded-full p-4 mb-2 shadow-lg">
                {f.icon}
              </div>
              <div
                className="font-bold text-lg text-[#1D2A41] font-montserrat"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {f.title}
              </div>
              <div
                className="text-gray-500 text-center font-opensans"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                {f.desc}
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* PREUVES SOCIALES */}
      <section className="w-full bg-gradient-to-b from-[#F5F6F8] via-[#e3f0ff] to-[#cbe7ff] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h3
            className="text-xl md:text-2xl font-bold text-center mb-8"
            style={{
              color: "#1D2A41",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Ils nous font confiance
          </h3>
          {/* Section logos écoles supprimée */}
          {/* Témoignages */}
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <div className="bg-gradient-to-br from-white via-[#e3f0ff] to-[#cbe7ff] rounded-2xl shadow-lg p-6 max-w-md mx-auto border border-[#e3f0ff]">
              <p className="text-gray-700 italic mb-2">
                “Grâce à Kareer, j’ai décroché mon stage en 2 semaines !”
              </p>
              <div className="text-sm text-gray-500">— Clara, étudiante</div>
            </div>
            <div className="bg-gradient-to-br from-white via-[#e3f0ff] to-[#cbe7ff] rounded-2xl shadow-lg p-6 max-w-md mx-auto border border-[#e3f0ff]">
              <p className="text-gray-700 italic mb-2">
                “Le suivi des candidatures est un vrai plus pour nos étudiants.”
              </p>
              <div className="text-sm text-gray-500">— M. Dupont, staff carrière</div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA FINAL */}
      <section
        className="w-full py-16 flex flex-col items-center justify-center"
        style={{
          background: "linear-gradient(90deg, #1D2A41 60%, #62C2FF 100%)",
          borderTopLeftRadius: 48,
          borderTopRightRadius: 48,
        }}
      >
        <h2
          className="text-2xl md:text-3xl font-bold text-white mb-6 text-center"
          style={{
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          Essayez Kareer dès aujourd’hui
        </h2>
        <Button
          asChild
          className="bg-gradient-to-r from-[#62C2FF] to-[#eaf6ff] hover:from-[#4bb2f0] hover:to-[#eaf6ff] text-[#1D2A41] font-semibold px-8 py-4 rounded-full font-montserrat shadow-2xl border-0 transition-all duration-200 hover:scale-105 text-lg"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
            boxShadow: "0 6px 32px 0 rgba(98,194,255,0.18)",
            letterSpacing: "-0.01em",
          }}
        >
          <Link to="/contact" className="flex items-center gap-2">
            Demander une démo
          </Link>
        </Button>
      </section>
    </div>
  );
}