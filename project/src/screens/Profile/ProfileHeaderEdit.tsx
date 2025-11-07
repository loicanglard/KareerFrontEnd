import React, { useState } from 'react';
import { EditableProfileHeader } from '../../components/EditableProfileHeader';
import { Card, CardContent } from '../../components/ui/card';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { EditIcon, BriefcaseIcon } from 'lucide-react';

interface ProfileHeaderEditProps {
  name: string;
  initials: string;
  role: string;
  bio: string;
  onEditClick: () => void;
}

export const ProfileHeaderEdit: React.FC<ProfileHeaderEditProps> = ({
  name,
  initials,
  role,
  bio,
  onEditClick
}) => {
  return (
    <Card className="mb-8 overflow-hidden relative">
      <div className="h-32 mb-4 relative">
        <img
          src="/image-copy-2.png"
          alt="ESSEC Banner"
          className="w-full h-full object-cover"
        />
        
        {/* Edit overlay for the entire header */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer flex items-center justify-center"
          onClick={onEditClick}
        >
          <div className="bg-white/90 rounded-full p-3 shadow-lg transform translate-y-8">
            <EditIcon className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>
      
      <CardContent className="relative pt-0 pb-6">
        <div className="flex items-start gap-6 -mt-12">
          <EditableProfileHeader 
            name={name}
            initials={initials}
            onEditClick={onEditClick}
          />
          
          <div className="flex-1 mt-16">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1 group cursor-pointer" onClick={onEditClick}>
                <div className="flex items-center gap-2 mb-4">
                  <BriefcaseIcon className="w-5 h-5 text-blue-600" />
                  <span className="text-lg text-blue-600 font-medium">{role}</span>
                </div>
                
                <p className="text-slate-700 max-w-3xl leading-relaxed text-base mb-6 group-hover:bg-slate-50/50 group-hover:rounded-md group-hover:p-2 transition-all duration-200">
                  {bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};