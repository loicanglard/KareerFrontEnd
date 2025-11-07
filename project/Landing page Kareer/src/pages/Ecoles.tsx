import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import * as React from "react";

// Images pour chaque étape (remplace par tes propres images si besoin)
const stepImages = [
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
];

const steps = [
  {
    title: "Suivi en temps réel",
    desc: "Visualisez les progrès de chaque étudiant à tout moment.",
    bullets: [
      "Dashboard clair et centralisé",
      "Mise à jour automatique",
      "Données exploitables immédiatement",
    ],
    image: stepImages[0],
    imageAlt: "Suivi en temps réel",
  },
  {
    title: "Rapports accréditations & rankings",
    desc: "Valorisez votre établissement avec des données fiables.",
    bullets: [
      "Rapports prêts pour les accréditations",
      "Indicateurs de performance détaillés",
      "Données exportables en un clic",
    ],
    image: stepImages[1],
    imageAlt: "Rapports accréditations",
  },
  {
    title: "Profils étudiants complets",
    desc: "Accédez à des informations précises et actualisées.",
    bullets: [
      "Parcours académiques détaillés",
      "Compétences et expériences visibles",
      "Données toujours à jour",
    ],
    image: stepImages[2],
    imageAlt: "Profils étudiants complets",
  },
  {
    title: "Engagement alumni",
    desc: "Suivez l’impact de vos diplômés sur le long terme.",
    bullets: [
      "Suivi carrière des anciens",
      "Données d’employabilité consolidées",
      "Mise en valeur du réseau alumni",
    ],
    image: stepImages[3],
    imageAlt: "Engagement alumni",
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

export default function Ecoles() {
  return (
    <div className="bg-white min-h-screen">
      <style>{animationStyles}</style>
      <Header />
      {/* HERO SECTION */}
      <section
        className="relative w-full pt-20 pb-24 px-4 md:px-0 overflow-hidden"
        style={{
          background: "linear-gradient(90deg, #1D2A41 60%, #62C2FF 100%)",
          borderBottomLeftRadius: 48,
          borderBottomRightRadius: 48,
          boxShadow: "0 8px 32px 0 rgba(29,42,65,0.10)",
        }}
      >
        {/* Motif vague SVG */}
        <svg
          className="absolute bottom-0 left-0 w-full h-24 pointer-events-none"
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ zIndex: 1 }}
        >
          <path
            d="M0,60 C360,120 1080,0 1440,60 L1440,100 L0,100 Z"
            fill="#F5F6F8"
            fillOpacity="0.7"
          />
        </svg>
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
          <h1
            className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg animate-fade-in-up"
            style={{
              color: "#fff",
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: "-0.03em",
              textShadow: "0 2px 16px rgba(29,42,65,0.10)",
              animationDelay: "0ms",
            }}
          >
            Améliorez l’employabilité de vos étudiants.
          </h1>
          <p
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto font-opensans animate-fade-in-up"
            style={{
              color: "#eaf6ff",
              fontWeight: 400,
              textShadow: "0 1px 8px rgba(29,42,65,0.10)",
              animationDelay: "120ms",
            }}
          >
            Kareer vous offre un tableau de bord pour suivre chaque étape du parcours carrière de vos étudiants.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-[#62C2FF] to-[#1D8FFF] hover:from-[#4bb2f0] hover:to-[#1D2A41] text-[#1D2A41] font-semibold px-8 py-4 rounded-full font-montserrat shadow-xl border-0 transition-all duration-200 hover:scale-105 animate-fade-in-up"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              fontSize: 20,
              animationDelay: "240ms",
            }}
          >
            <a href="#contact">Demander une démo</a>
          </Button>
        </div>
      </section>
      {/* VIDÉO EXPLICATIVE */}
      <section className="max-w-3xl mx-auto -mt-16 mb-20 px-4">
        <div
          className="rounded-3xl shadow-2xl bg-white/90 border border-[#e3f0ff] p-4 md:p-8 flex flex-col items-center animate-fade-in-up"
          style={{ animationDelay: "400ms" }}
        >
          <div className="w-full flex justify-center">
            <div className="relative w-full max-w-xl aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-[#e3f0ff] via-[#cbe7ff] to-[#62C2FF] shadow-lg border-4 border-white/60">
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
      {/* COMMENT ÇA MARCHE */}
      <section className="relative w-full py-16 md:py-24 bg-gradient-to-br from-[#eaf6ff] via-[#F5F6F8] to-[#cbe7ff] overflow-hidden">
        {/* Motif vague haut */}
        <svg
          className="absolute -top-10 left-0 w-full h-20 pointer-events-none"
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ zIndex: 1 }}
        >
          <path
            d="M0,40 C360,100 1080,0 1440,40 L1440,100 L0,100 Z"
            fill="#fff"
            fillOpacity="0.7"
          />
        </svg>
        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <h2
            className="text-2xl md:text-3xl font-bold text-center mb-16"
            style={{
              color: "#1D2A41",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Comment ça marche&nbsp;?
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
                  {/* Image illustrant l'étape */}
                  <div className="flex-1 flex justify-center md:justify-end">
                    <div className="relative flex flex-col items-center">
                      <img
                        src={step.image}
                        alt={step.imageAlt}
                        className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-2xl shadow-xl border-4 border-white/80 bg-[#eaf6ff] transition-transform duration-300 group-hover:scale-105"
                        style={{
                          boxShadow: "0 8px 32px 0 rgba(98,194,255,0.18)",
                        }}
                      />
                    </div>
                  </div>
                  {/* Texte étape */}
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
        {/* Motif vague bas */}
        <svg
          className="absolute bottom-0 left-0 w-full h-16 pointer-events-none"
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ zIndex: 1 }}
        >
          <path
            d="M0,40 C360,0 1080,100 1440,40 L1440,80 L0,80 Z"
            fill="#fff"
            fillOpacity="0.7"
          />
        </svg>
      </section>
      {/* CTA FINAL */}
      <section className="w-full py-16 flex flex-col items-center justify-center bg-gradient-to-r from-[#1D2A41] to-[#62C2FF] mt-12 rounded-t-3xl shadow-2xl">
        <h2
          className="text-2xl md:text-3xl font-bold text-white mb-6 text-center"
          style={{
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          Prêt à booster l’employabilité de vos étudiants&nbsp;?
        </h2>
        <Button
          asChild
          size="lg"
          className="bg-gradient-to-r from-[#62C2FF] to-[#1D8FFF] hover:from-[#4bb2f0] hover:to-[#1D2A41] text-[#1D2A41] font-semibold px-8 py-4 rounded-full font-montserrat shadow-xl border-0 transition-all duration-200 hover:scale-105"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            fontSize: 20,
          }}
        >
          <a href="#contact">Demander une démo</a>
        </Button>
      </section>
    </div>
  );
}