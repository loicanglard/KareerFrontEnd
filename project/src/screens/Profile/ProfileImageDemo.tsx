import React, { useState } from 'react';
import { NavigationSection } from '../Dashboard/sections/NavigationSection';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { ProfileImageUpload } from '../../components/ProfileImageUpload/ProfileImageUpload';
import { ProfileBannerUpload } from '../../components/ProfileBannerUpload/ProfileBannerUpload';
import { Button } from '../../components/ui/button';
import { RefreshCwIcon } from 'lucide-react';

export const ProfileImageDemo: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
  const [bannerImage, setBannerImage] = useState<string | undefined>(undefined);
  
  // Simulate profile image upload
  const handleProfileImageUpload = async (file: File): Promise<string> => {
    // In a real app, this would upload to a server
    return new Promise((resolve) => {
      setTimeout(() => {
        const imageUrl = URL.createObjectURL(file);
        setProfileImage(imageUrl);
        resolve(imageUrl);
      }, 1500);
    });
  };
  
  // Simulate banner image upload
  const handleBannerImageUpload = async (file: File): Promise<string> => {
    // In a real app, this would upload to a server
    return new Promise((resolve) => {
      setTimeout(() => {
        const imageUrl = URL.createObjectURL(file);
        setBannerImage(imageUrl);
        resolve(imageUrl);
      }, 1500);
    });
  };
  
  // Reset images
  const handleReset = () => {
    setProfileImage(undefined);
    setBannerImage(undefined);
  };
  
  return (
    <main className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <aside className="h-screen w-60 fixed">
        <NavigationSection />
      </aside>
      
      <div className="flex-1 ml-60 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Téléchargement d'Images</h1>
          <p className="text-slate-600 mb-8">
            Démonstration des composants de téléchargement d'images de profil et de bannière.
          </p>
          
          <Card className="mb-8 overflow-hidden border-0 ring-1 ring-slate-200/60 rounded-3xl shadow-sm">
            <div className="relative h-32 bg-gradient-to-r from-blue-500 to-blue-600">
            </div>
            
            <CardContent className="relative pt-0 pb-6">
              <div className="flex items-start gap-6 -mt-12">
                <ProfileImageUpload 
                  name="Alex Smith"
                  initials="AS"
                  currentImage={profileImage}
                  onImageUpload={handleProfileImageUpload}
                />
                
                <div className="flex-1 mt-16">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-slate-800 mb-2">Alex Smith</h2>
                      <p className="text-slate-600 text-sm">
                        Cliquez sur la photo de profil ou la bannière pour télécharger une nouvelle image.
                      </p>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      onClick={handleReset}
                      className="gap-2"
                    >
                      <RefreshCwIcon className="w-4 h-4" />
                      Réinitialiser
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-0 ring-1 ring-slate-200/60 rounded-xl shadow-sm">
              <CardHeader>
                <CardTitle>Photo de Profil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>Format carré (ratio 1:1) pour un affichage optimal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>Taille minimale recommandée: 200x200 pixels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>Taille maximale du fichier: 2MB</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>Formats acceptés: JPG, PNG, GIF</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-0 ring-1 ring-slate-200/60 rounded-xl shadow-sm">
              <CardHeader>
                <CardTitle>Image de Bannière</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>Format rectangulaire (ratio 3.5:1) pour un affichage optimal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>Taille minimale recommandée: 800x200 pixels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>Taille maximale du fichier: 5MB</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>Formats acceptés: JPG, PNG, GIF</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};