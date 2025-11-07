import { Header } from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ nom: "", email: "", type: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <div className="max-w-xl mx-auto py-20 px-4">
        <h1 className="text-3xl font-bold mb-6" style={{ color: "#1D2A41", fontFamily: "'Montserrat', sans-serif" }}>
          Contactez-nous
        </h1>
        <form className="bg-[#F5F6F8] rounded-xl p-6 mb-8" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-semibold" htmlFor="nom" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Nom
            </label>
            <Input
              id="nom"
              name="nom"
              value={form.nom}
              onChange={handleChange}
              required
              className="bg-white"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold" htmlFor="email" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="bg-white"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 font-semibold" htmlFor="type" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Type
            </label>
            <select
              id="type"
              name="type"
              value={form.type}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded border border-gray-200 bg-white"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              <option value="">Sélectionnez</option>
              <option value="etudiant">Étudiant</option>
              <option value="ecole">École</option>
            </select>
          </div>
          <Button
            type="submit"
            className="bg-[#62C2FF] hover:bg-[#4bb2f0] text-[#1D2A41] font-semibold px-6 py-3 rounded-full font-montserrat w-full"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
            }}
          >
            Envoyer
          </Button>
          {sent && (
            <div className="mt-4 text-green-600 font-semibold text-center">
              Merci, nous avons bien reçu votre demande !
            </div>
          )}
        </form>
        <div className="mb-6">
          <div className="font-semibold mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Prendre rendez-vous :
          </div>
          <div className="w-full h-[500px] rounded-xl overflow-hidden bg-[#F5F6F8]">
            {/* Calendly embed */}
            <iframe
              src="https://calendly.com/"
              title="Calendly"
              width="100%"
              height="100%"
              frameBorder="0"
              allow="camera; microphone; fullscreen"
            />
          </div>
        </div>
        <div className="text-center text-gray-500 mt-4">
          Ou écrivez-nous :{" "}
          <a href="mailto:contact@genkareer.com" className="underline text-[#1D2A41]">
            contact@genkareer.com
          </a>
        </div>
      </div>
    </div>
  );
}