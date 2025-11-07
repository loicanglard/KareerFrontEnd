import React, { useState } from 'react';
import { NavigationSection } from '../Dashboard/sections/NavigationSection';
import { ProfileEditor } from '../../components/ProfileEditor/ProfileEditor';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

export const ProfileEditorDemo: React.FC = () => {
  const [profileData, setProfileData] = useState({
    name: 'Alex Smith',
    email: 'alex.smith@essec.edu',
    phone: '07551 541758',
    location: 'Paris, France',
    linkedin: 'https://www.linkedin.com/in/alexsmith2005',
    portfolio: 'https://Alex.portfolio.com',
  });

  const handleSave = async (data: typeof profileData) => {
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setProfileData(data);
  };

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <aside className="h-screen w-60 fixed">
        <NavigationSection />
      </aside>
      
      <div className="flex-1 ml-60 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Éditeur de Profil</h1>
          <p className="text-slate-600 mb-8">
            Démonstration du composant d'édition de profil utilisateur avec validation et retours visuels.
          </p>
          
          <Card className="border-0 ring-1 ring-slate-200/60 rounded-3xl shadow-sm">
            <CardHeader>
              <CardTitle>Informations de Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <ProfileEditor 
                initialData={profileData}
                onSave={handleSave}
              />
            </CardContent>
          </Card>
          
          <div className="mt-12 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Caractéristiques du composant</h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Mode lecture et mode édition distincts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Validation des champs avec retours visuels</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Confirmation avant d'annuler les modifications</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Notification de succès après sauvegarde</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Accessibilité optimisée (focus trap, aria-labels, etc.)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Prévention de perte de données lors de la navigation</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};