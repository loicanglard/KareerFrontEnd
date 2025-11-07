import { Header } from "@/components/Header";

const founders = [
  {
    name: "Nom Prénom",
    role: "Fondateur·rice",
    img: "/placeholder.svg",
  },
  {
    name: "Nom Prénom",
    role: "Fondateur·rice",
    img: "/placeholder.svg",
  },
  {
    name: "Nom Prénom",
    role: "Fondateur·rice",
    img: "/placeholder.svg",
  },
  {
    name: "Nom Prénom",
    role: "Fondateur·rice",
    img: "/placeholder.svg",
  },
];

export default function APropos() {
  return (
    <div className="bg-gradient-to-b from-white via-[#F5F6F8] to-[#eaf6ff] min-h-screen">
      <Header />
      <section className="max-w-3xl mx-auto py-24 px-4">
        <h1
          className="text-3xl md:text-4xl font-bold mb-8 text-center"
          style={{
            color: "#1D2A41",
            fontFamily: "'Montserrat', sans-serif",
            letterSpacing: "-0.03em",
          }}
        >
          À propos de Kareer
        </h1>
        <div className="mb-12 bg-gradient-to-br from-white via-[#e3f0ff] to-[#cbe7ff] rounded-2xl shadow-lg p-8 border border-[#e3f0ff]">
          <h2
            className="text-xl font-bold mb-2 font-montserrat"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Notre mission
          </h2>
          <p
            className="mb-4 text-gray-700 font-opensans"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            Démocratiser l’accès à l’emploi grâce à l’IA.
          </p>
          <h2
            className="text-xl font-bold mb-2 font-montserrat"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Notre vision
          </h2>
          <p
            className="mb-0 text-gray-700 font-opensans"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            Devenir la solution standard des career centers.
          </p>
        </div>
        <div>
          <h2
            className="text-xl md:text-2xl font-bold mb-6 text-center font-montserrat"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            L’équipe fondatrice
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {founders.map((f, i) => (
              <div
                key={i}
                className="flex flex-col items-center bg-gradient-to-br from-white via-[#e3f0ff] to-[#cbe7ff] rounded-2xl shadow-lg p-6 border border-[#e3f0ff] transition-transform duration-200 hover:scale-105"
              >
                <img
                  src={f.img}
                  alt={`Photo de ${f.name}`}
                  className="w-24 h-24 rounded-full mb-3 bg-[#F5F6F8] border-4 border-white shadow"
                />
                <div
                  className="font-bold text-[#1D2A41] text-lg font-montserrat"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {f.name}
                </div>
                <div
                  className="text-sm text-gray-500 font-opensans"
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