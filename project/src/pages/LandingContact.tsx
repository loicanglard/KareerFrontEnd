import { LandingHeader } from "@/components/LandingHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

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

export default function LandingContact() {
  const [form, setForm] = useState({ name: "", email: "", type: "", comment: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="bg-gradient-to-b from-white via-gray-50 to-blue-50 min-h-screen">
      <style>{animationStyles}</style>
      <LandingHeader />
      <div className="max-w-2xl mx-auto py-24 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center animate-fade-in-up" style={{ color: "#1D2A41", fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.03em", animationDelay: "0ms" }}>
          Nous Contacter
        </h1>
        <form className="bg-white rounded-3xl shadow-md hover:shadow-xl p-8 md:p-10 mb-8 border border-gray-100 transition-all duration-300 animate-scale-in" onSubmit={handleSubmit} style={{ animationDelay: "120ms" }}>
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-[#1D2A41]" htmlFor="name" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Nom
            </label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="bg-gray-50 border-gray-200 focus:border-[#62C2FF] focus:ring-[#62C2FF] transition-all duration-300 py-3"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-[#1D2A41]" htmlFor="email" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="bg-gray-50 border-gray-200 focus:border-[#62C2FF] focus:ring-[#62C2FF] transition-all duration-300 py-3"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-[#1D2A41]" htmlFor="type" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Type
            </label>
            <select
              id="type"
              name="type"
              value={form.type}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:border-[#62C2FF] focus:ring-[#62C2FF] transition-all duration-300"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              <option value="">Sélectionner</option>
              <option value="student">Étudiant</option>
              <option value="school">École</option>
            </select>
          </div>
          <div className="mb-8">
            <label className="block mb-2 font-semibold text-[#1D2A41]" htmlFor="comment" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Commentaire
            </label>
            <Textarea
              id="comment"
              name="comment"
              value={form.comment}
              onChange={handleChange}
              required
              className="bg-gray-50 border-gray-200 focus:border-[#62C2FF] focus:ring-[#62C2FF] transition-all duration-300 min-h-[150px]"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            />
          </div>
          <Button
            type="submit"
            className="bg-gradient-to-r from-[#62C2FF] to-[#1D8FFF] hover:from-[#4bb2f0] hover:to-[#1D7FEF] text-white font-semibold px-8 py-4 rounded-full font-montserrat w-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
            }}
          >
            Envoyer
          </Button>
          {sent && (
            <div className="mt-6 text-green-600 font-semibold text-center text-lg bg-green-50 py-3 rounded-lg border border-green-200 animate-scale-in">
              Merci, nous avons bien reçu votre demande !
            </div>
          )}
        </form>
        <div className="text-center text-gray-600 mt-8 text-lg animate-fade-in-up" style={{ animationDelay: "240ms" }}>
          Ou écrivez-nous :{" "}
          <a href="mailto:contact@genkareer.com" className="underline text-[#1D2A41] hover:text-[#62C2FF] transition-colors duration-300 font-semibold">
            contact@genkareer.com
          </a>
        </div>
      </div>
    </div>
  );
}
