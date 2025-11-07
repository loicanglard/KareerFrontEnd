import React from "react";
import { Button } from "../../components/ui/button";
import { DownloadIcon } from "lucide-react";

// Document preview content types
interface DocumentPreviewProps {
  type: "cv" | "coverLetter";
  data: {
    name: string;
    position: string;
    company: string;
    date?: string;
  };
  onDownload: () => void;
}

export const DocumentView = ({ type, data, onDownload }: DocumentPreviewProps) => {
  if (type === "cv") {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-slate-800">Aperçu du CV</h2>
          <Button
            className="flex items-center gap-2"
            onClick={onDownload}
          >
            <DownloadIcon className="h-4 w-4" />
            Télécharger le CV
          </Button>
        </div>

        <div className="bg-white p-8 rounded-lg shadow border">
          {/* CV Header */}
          <div className="border-b pb-4 mb-4">
            <h1 className="text-2xl font-bold uppercase mb-1">{data.name || "Votre Nom"}</h1>
            <div className="text-sm text-slate-600">
              <p>Adresse : Paris, France</p>
              <p><a href="mailto:contact@email.com" className="text-blue-600">contact@email.com</a> • +33 6 12 34 56 78</p>
            </div>
          </div>

          {/* Professional Objective */}
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b pb-1 mb-3">OBJECTIF PROFESSIONNEL</h2>
            <p className="text-slate-700">
              Professionnel motivé et dynamique recherchant un poste de {data.position} chez {data.company}.
              Fort d'une expérience significative et d'une formation solide, je souhaite contribuer au succès
              de l'entreprise en apportant mes compétences techniques et mon expertise dans le domaine.
            </p>
          </div>

          {/* Education Section */}
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b pb-1 mb-3">FORMATION</h2>
            <div className="mb-4">
              <div className="flex">
                <div className="w-32 font-semibold text-slate-600">2022-2024</div>
                <div className="flex-1">
                  <p className="font-semibold">Master en Management et Stratégie d'Entreprise</p>
                  <p className="italic text-slate-600">École de Commerce, Paris</p>
                  <p className="text-sm text-slate-700 mt-1">
                    Spécialisation en stratégie d'entreprise, gestion de projet et innovation.
                    Formation approfondie en analyse financière, marketing stratégique et ressources humaines.
                  </p>
                  <p className="text-sm text-slate-600 mt-1">Mention Très Bien</p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex">
                <div className="w-32 font-semibold text-slate-600">2019-2022</div>
                <div className="flex-1">
                  <p className="font-semibold">Licence en Économie et Gestion</p>
                  <p className="italic text-slate-600">Université Paris-Dauphine</p>
                  <p className="text-sm text-slate-700 mt-1">
                    Formation généraliste couvrant la microéconomie, la macroéconomie, la comptabilité,
                    la finance et le management.
                  </p>
                  <p className="text-sm text-slate-600 mt-1">Major de promotion</p>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Experience Section */}
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b pb-1 mb-3">EXPÉRIENCE PROFESSIONNELLE</h2>
            <div className="mb-4">
              <div className="flex">
                <div className="w-32 font-semibold text-slate-600">Juin 2023 - Août 2023</div>
                <div className="flex-1">
                  <p className="font-semibold">Stage en Stratégie et Développement</p>
                  <p className="italic text-slate-600">Grande Entreprise Internationale, Paris</p>
                  <ul className="list-disc pl-5 mt-2 text-sm text-slate-700 space-y-1">
                    <li>Analyse des opportunités de croissance et des tendances du marché pour orienter la stratégie commerciale</li>
                    <li>Participation à l'élaboration de présentations stratégiques pour la direction générale</li>
                    <li>Collaboration avec les équipes marketing et finance pour optimiser les processus internes</li>
                    <li>Rédaction de rapports d'analyse concurrentielle et de recommandations stratégiques</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex">
                <div className="w-32 font-semibold text-slate-600">Sept 2022 - Déc 2022</div>
                <div className="flex-1">
                  <p className="font-semibold">Assistant Chef de Projet</p>
                  <p className="italic text-slate-600">PME en Expansion, Lyon</p>
                  <ul className="list-disc pl-5 mt-2 text-sm text-slate-700 space-y-1">
                    <li>Coordination de projets transversaux impliquant plusieurs départements</li>
                    <li>Suivi des indicateurs de performance et reporting régulier auprès de la direction</li>
                    <li>Animation de réunions d'équipe et facilitation de la communication inter-services</li>
                    <li>Contribution à l'amélioration continue des processus organisationnels</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b pb-1 mb-3">COMPÉTENCES</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-slate-700 mb-2">Compétences Techniques</p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Pack Office (Excel, PowerPoint, Word)</li>
                  <li>• Analyse de données et reporting</li>
                  <li>• Gestion de projet (méthodes agiles)</li>
                  <li>• Outils de CRM et ERP</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-700 mb-2">Compétences Transversales</p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Leadership et gestion d'équipe</li>
                  <li>• Communication interpersonnelle</li>
                  <li>• Résolution de problèmes complexes</li>
                  <li>• Adaptabilité et rigueur</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div>
            <h2 className="text-lg font-bold uppercase border-b pb-1 mb-3">LANGUES</h2>
            <div className="flex gap-8 text-sm">
              <p className="text-slate-700"><span className="font-semibold">Français :</span> Langue maternelle</p>
              <p className="text-slate-700"><span className="font-semibold">Anglais :</span> Courant (C1)</p>
              <p className="text-slate-700"><span className="font-semibold">Espagnol :</span> Intermédiaire (B1)</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Cover Letter view
  const today = new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-slate-800">Aperçu de la Lettre de Motivation</h2>
        <Button
          className="flex items-center gap-2"
          onClick={onDownload}
        >
          <DownloadIcon className="h-4 w-4" />
          Télécharger la Lettre
        </Button>
      </div>

      <div className="bg-white p-8 rounded-lg shadow border font-serif">
        {/* Header with contact info */}
        <div className="mb-8">
          <p className="font-bold">{data.name || "Votre Nom"}</p>
          <p>Adresse : Paris, France</p>
          <p><a href="mailto:contact@email.com" className="text-blue-600">contact@email.com</a> • +33 6 12 34 56 78</p>
          <p className="mt-2">{today}</p>
        </div>

        {/* Recipient */}
        <div className="mb-8">
          <p className="font-semibold">Service Recrutement</p>
          <p className="font-semibold">{data.company}</p>
          <p>Adresse de l'entreprise</p>
        </div>

        {/* Subject */}
        <p className="font-bold mb-6">Objet : Candidature au poste de {data.position}</p>

        {/* Salutation */}
        <p className="mb-4">Madame, Monsieur,</p>

        {/* Body paragraphs */}
        <div className="space-y-4 text-justify leading-relaxed">
          <p>
            C'est avec un vif intérêt que je vous adresse ma candidature pour le poste de {data.position} au sein de {data.company}.
            Attiré(e) par votre entreprise reconnue pour son excellence et son innovation, je suis convaincu(e) que mon profil
            et mes compétences correspondent parfaitement aux exigences de ce poste.
          </p>

          <p>
            Fort(e) d'une formation solide en management et stratégie d'entreprise, complétée par plusieurs expériences
            professionnelles significatives, j'ai développé une expertise approfondie dans la gestion de projets complexes
            et le pilotage d'équipes. Mon parcours m'a permis d'acquérir des compétences essentielles en analyse stratégique,
            coordination d'activités transversales et optimisation des processus organisationnels.
          </p>

          <p>
            Au cours de mes précédentes expériences, j'ai notamment eu l'opportunité de contribuer à des projets stratégiques
            d'envergure, impliquant une forte collaboration avec différents départements et la direction générale. J'ai ainsi
            pu démontrer ma capacité à analyser des situations complexes, à proposer des solutions innovantes et à les mettre
            en œuvre avec rigueur et efficacité. Ma maîtrise des outils d'analyse et de gestion de projet, combinée à mon sens
            aigu de la communication, m'a permis de mener à bien des missions variées et exigeantes.
          </p>

          <p>
            Ce qui m'attire particulièrement chez {data.company}, c'est votre engagement pour l'innovation, votre culture
            d'entreprise dynamique et votre vision stratégique à long terme. Je suis persuadé(e) que mes compétences en
            analyse, ma capacité d'adaptation et mon esprit d'équipe me permettront de contribuer efficacement aux objectifs
            de votre organisation et de m'intégrer rapidement au sein de vos équipes.
          </p>

          <p>
            Motivé(e), rigoureux(se) et doté(e) d'un excellent relationnel, je suis prêt(e) à m'investir pleinement pour
            relever les défis qui caractérisent ce poste et participer activement au développement de {data.company}.
            Ma volonté d'apprentissage continu et mon désir de progresser dans un environnement stimulant font de moi
            un candidat idéal pour rejoindre votre équipe.
          </p>

          <p>
            Je reste à votre disposition pour un entretien au cours duquel je pourrai vous présenter plus en détail mon
            parcours et ma motivation à rejoindre {data.company}. Je vous remercie par avance de l'attention que vous
            porterez à ma candidature et vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.
          </p>
        </div>

        {/* Closing */}
        <div className="mt-8">
          <p>Cordialement,</p>
          <p className="font-bold mt-2">{data.name || "Votre Nom"}</p>
        </div>
      </div>
    </div>
  );
};