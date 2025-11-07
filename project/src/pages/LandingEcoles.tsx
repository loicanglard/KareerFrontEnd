import { LandingHeader } from "@/components/LandingHeader";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const stepImages = [
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
];

const steps = [
  {
    title: "Suivi en Temps Réel",
    desc: "Visualisez la progression de chaque étudiant à tout moment.",
    bullets: [
      "Tableau de bord clair et centralisé",
      "Mises à jour automatiques",
      "Données immédiatement exploitables",
    ],
    image: stepImages[0],
    imageAlt: "Suivi en temps réel",
  },
  {
    title: "Rapports d'Accréditation & Rankings",
    desc: "Valorisez votre établissement avec des données fiables.",
    bullets: [
      "Rapports prêts pour les accréditations",
      "Indicateurs de performance détaillés",
      "Données exportables en un clic",
    ],
    image: stepImages[1],
    imageAlt: "Rapports d'accréditation",
  },
  {
    title: "Profils Étudiants Complets",
    desc: "Accédez à des informations précises et à jour.",
    bullets: [
      "Parcours académiques détaillés",
      "Compétences et expériences visibles",
      "Données toujours actuelles",
    ],
    image: stepImages[2],
    imageAlt: "Profils étudiants complets",
  },
  {
    title: "Engagement des Alumni",
    desc: "Suivez l'impact long terme de vos diplômés.",
    bullets: [
      "Suivi des carrières des alumni",
      "Données d'employabilité consolidées",
      "Mise en valeur du réseau alumni",
    ],
    image: stepImages[3],
    imageAlt: "Engagement des alumni",
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

export default function LandingEcoles() {
  return (
    <div className="bg-gradient-to-b from-white via-gray-50 to-blue-50 min-h-screen">
      <style>{animationStyles}</style>
      <LandingHeader />
      <section
        className="relative w-full pt-20 pb-24 px-4 md:px-0 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1D2A41 0%, #2a3f5f 50%, #62C2FF 100%)",
          borderBottomLeftRadius: 48,
          borderBottomRightRadius: 48,
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-cyan-300 rounded-full blur-3xl"></div>
        </div>
        <svg
          className="absolute bottom-0 left-0 w-full h-24 pointer-events-none opacity-30"
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ zIndex: 1 }}
        >
          <path
            d="M0,60 C360,120 1080,0 1440,60 L1440,100 L0,100 Z"
            fill="#fff"
            fillOpacity="0.5"
          />
        </svg>
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up leading-tight"
            style={{
              color: "#fff",
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: "-0.03em",
              animationDelay: "0ms",
            }}
          >
            Améliorez l'Employabilité de Vos Étudiants.
          </h1>
          <p
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto font-opensans animate-fade-in-up leading-relaxed text-blue-50"
            style={{
              fontWeight: 400,
              animationDelay: "120ms",
            }}
          >
            Kareer vous offre un tableau de bord pour suivre chaque étape du parcours professionnel de vos étudiants.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white hover:bg-gray-50 text-[#1D2A41] font-semibold px-10 py-6 rounded-full font-montserrat shadow-xl border-0 transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in-up"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              fontSize: 20,
              animationDelay: "240ms",
            }}
          >
            <Link to="/contact">Demander une Démo</Link>
          </Button>
        </div>
      </section>
      <section className="max-w-3xl mx-auto -mt-16 mb-20 px-4">
        <div
          className="rounded-3xl shadow-2xl bg-white border border-gray-100 p-4 md:p-8 flex flex-col items-center animate-scale-in hover:shadow-3xl transition-all duration-300"
          style={{ animationDelay: "400ms" }}
        >
          <div className="w-full flex justify-center">
            <div className="relative w-full max-w-xl aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 via-blue-50 to-cyan-100 shadow-lg border-2 border-white">
              <video
                className="w-full h-full object-cover rounded-xl"
                src=""
                poster="/placeholder.svg"
                controls
                style={{ borderRadius: 16 }}
              />
              <span className="absolute bottom-2 right-2 text-xs text-gray-400 bg-white/80 px-2 py-0.5 rounded-lg shadow">
                Vidéo explicative (1 min)
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="relative w-full py-16 md:py-24 bg-gradient-to-br from-blue-50 via-gray-50 to-cyan-50 overflow-hidden">
        <svg
          className="absolute -top-10 left-0 w-full h-20 pointer-events-none opacity-30"
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ zIndex: 1 }}
        >
          <path
            d="M0,40 C360,100 1080,0 1440,40 L1440,100 L0,100 Z"
            fill="#fff"
            fillOpacity="0.8"
          />
        </svg>
        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-20"
            style={{
              color: "#1D2A41",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Comment Ça Marche ?
          </h2>
          <div className="flex flex-col gap-20">
            {steps.map((step, i) => {
              const isEven = i % 2 === 1;
              return (
                <div
                  key={step.title}
                  className={cn(
                    "flex flex-col md:flex-row items-center gap-10 md:gap-20 group animate-fade-in-up",
                    isEven ? "md:flex-row-reverse" : "",
                  )}
                  style={{
                    animationDelay: `${i * 120}ms`,
                    animationFillMode: "both",
                  }}
                >
                  <div className="flex-1 flex justify-center md:justify-end">
                    <div className="relative flex flex-col items-center">
                      <img
                        src={step.image}
                        alt={step.imageAlt}
                        className="w-36 h-36 md:w-44 md:h-44 object-cover rounded-2xl shadow-xl border-2 border-white bg-gray-50 transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl"
                      />
                    </div>
                  </div>
                  <div
                    className={cn(
                      "flex-1 flex flex-col items-start md:items-start",
                      isEven ? "md:items-end md:text-right" : "md:items-start md:text-left"
                    )}
                  >
                    <h3
                      className="text-xl md:text-2xl font-bold mb-3 font-montserrat"
                      style={{
                        color: "#1D2A41",
                        fontFamily: "'Montserrat', sans-serif",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-base md:text-lg mb-5 font-opensans"
                      style={{
                        color: "#1D2A41",
                        fontFamily: "'Open Sans', sans-serif",
                        fontWeight: 400,
                        maxWidth: 420,
                      }}
                    >
                      {step.desc}
                    </p>
                    <ul className="space-y-2">
                      {step.bullets.map((b, j) => (
                        <li
                          key={j}
                          className="flex items-center gap-3 text-[#1D2A41] font-opensans"
                        >
                          <span
                            className="inline-block w-3 h-3 rounded-full bg-gradient-to-br from-[#62C2FF] to-[#1D8FFF] shadow"
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <svg
          className="absolute bottom-0 left-0 w-full h-16 pointer-events-none opacity-30"
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ zIndex: 1 }}
        >
          <path
            d="M0,40 C360,0 1080,100 1440,40 L1440,80 L0,80 Z"
            fill="#fff"
            fillOpacity="0.8"
          />
        </svg>
      </section>
      <section className="relative w-full py-20 flex flex-col items-center justify-center bg-gradient-to-r from-[#1D2A41] to-[#62C2FF] mt-12 rounded-t-3xl shadow-2xl overflow-hidden">
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
            Prêt à Booster l'Employabilité de Vos Étudiants ?
          </h2>
          <div className="flex justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white hover:bg-gray-50 text-[#1D2A41] font-semibold px-10 py-6 rounded-full font-montserrat shadow-xl border-0 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                fontSize: 20,
              }}
            >
              <Link to="/contact">Demander une Démo</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
