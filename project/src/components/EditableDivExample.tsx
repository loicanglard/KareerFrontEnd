import React, { useState } from 'react';
import { EditableDiv } from './EditableDiv';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export const EditableDivExample: React.FC = () => {
  const [savedContent, setSavedContent] = useState('Ceci est un exemple de contenu éditable. Cliquez pour modifier!');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const handleSave = (content: string) => {
    // Simulate an API call with a delay
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setSavedContent(content);
        setLastSaved(new Date());
        resolve();
      }, 500);
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Exemple de div éditable</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <EditableDiv
          initialContent={savedContent}
          onSave={handleSave}
          className="min-h-[100px] border border-slate-200"
          placeholder="Cliquez ici pour ajouter du contenu..."
        />
        
        {lastSaved && (
          <div className="text-sm text-slate-500">
            Dernière modification: {lastSaved.toLocaleString()}
          </div>
        )}
        
        <div className="bg-slate-50 p-4 rounded-md">
          <h3 className="text-sm font-medium text-slate-700 mb-2">Instructions:</h3>
          <ul className="text-sm text-slate-600 space-y-1 list-disc pl-5">
            <li>Cliquez sur le texte pour commencer à éditer</li>
            <li>Appuyez sur <kbd className="px-2 py-1 bg-slate-200 rounded text-xs">Entrée</kbd> pour sauvegarder</li>
            <li>Appuyez sur <kbd className="px-2 py-1 bg-slate-200 rounded text-xs">Échap</kbd> pour annuler</li>
            <li>Cliquez en dehors de la zone pour sauvegarder</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};