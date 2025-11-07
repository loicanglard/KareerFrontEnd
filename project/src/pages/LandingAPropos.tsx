import { LandingHeader } from "@/components/LandingHeader";

const founders = [
  {
    name: "Prénom Nom",
    role: "Fondateur",
    img: "/placeholder.svg",
  },
  {
    name: "Prénom Nom",
    role: "Fondateur",
    img: "/placeholder.svg",
  },
  {
    name: "Anglard Loïc",
    role: "Fondateur",
    img: "/Loic_couleur.png",
  },
  {
    name: "Calmon Tristan",
    role: "Fondateur",
    img: "/Tristan_couleur.png",
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
@keyframes scale-in {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}
.animate-scale-in {
  animation: scale-in 0.6s cubic-bezier(.4,0,.2,1) both;
}
`;

export default function LandingAPropos() {
  return (
    <div className="bg-gradient-to-b from-white via-gray-50 to-blue-50 min-h-screen">
      <style>{animationStyles}</style>
      <LandingHeader />
      <section className="max-w-4xl mx-auto py-24 px-4">
        <h1
          className="text-4xl md:text-5xl font-bold mb-12 text-center animate-fade-in-up"
          style={{
            color: "#1D2A41",
            fontFamily: "'Montserrat', sans-serif",
            letterSpacing: "-0.03em",
            animationDelay: "0ms",
          }}
        >
          À Propos de Kareer
        </h1>
        <div className="mb-16 bg-white rounded-3xl shadow-md hover:shadow-xl p-10 border border-gray-100 transition-all duration-300 animate-scale-in" style={{ animationDelay: "120ms" }}>
          <h2
            className="text-2xl font-bold mb-4 font-montserrat text-[#1D2A41]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Notre Mission
          </h2>
          <p
            className="mb-8 text-gray-600 font-opensans text-lg leading-relaxed"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            Démocratiser l'accès à l'emploi grâce à l'IA.
          </p>
          <h2
            className="text-2xl font-bold mb-4 font-montserrat text-[#1D2A41]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Notre Vision
          </h2>
          <p
            className="mb-0 text-gray-600 font-opensans text-lg leading-relaxed"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            Devenir la solution de référence pour les services carrières.
          </p>
        </div>
        <div className="animate-scale-in" style={{ animationDelay: "240ms" }}>
          <h2
            className="text-3xl md:text-4xl font-bold mb-12 text-center font-montserrat text-[#1D2A41]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            L'Équipe Fondatrice
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {founders.map((f, i) => (
              <div
                key={i}
                className="group flex flex-col items-center bg-white rounded-2xl shadow-md hover:shadow-xl p-8 border border-gray-100 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                <img
                  src={f.img}
                  alt={`Photo of ${f.name}`}
                  className="w-32 h-32 rounded-full mb-4 bg-gray-50 border-4 border-white shadow-lg transition-all duration-300 group-hover:scale-110"
                />
                <div
                  className="font-bold text-[#1D2A41] text-xl font-montserrat mb-1"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {f.name}
                </div>
                <div
                  className="text-base text-gray-500 font-opensans"
                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                  {f.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
