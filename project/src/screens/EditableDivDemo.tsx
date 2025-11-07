import React from 'react';
import { NavigationSection } from './Dashboard/sections/NavigationSection';
import { EditableDivExample } from '../components/EditableDivExample';

export const EditableDivDemo: React.FC = () => {
  return (
    <main className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <aside className="h-screen w-60 fixed">
        <NavigationSection />
      </aside>
      
      <div className="flex-1 ml-60 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Composant Div Éditable</h1>
          <p className="text-slate-600 mb-8">
            Ce composant permet aux utilisateurs de modifier du contenu directement en cliquant dessus,
            comme dans un éditeur de texte en ligne.
          </p>
          
          <EditableDivExample />
          
          <div className="mt-12 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Caractéristiques du composant</h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Édition directe en cliquant sur le contenu</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Sauvegarde automatique lors de la perte de focus</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Retour visuel pendant l'édition et la sauvegarde</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Gestion des raccourcis clavier (Entrée pour sauvegarder, Échap pour annuler)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Limitation de la longueur du texte avec compteur de caractères</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Texte d'aide (placeholder) lorsque le contenu est vide</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};