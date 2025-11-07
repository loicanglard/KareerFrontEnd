import React, { useState } from 'react';
import { EditIcon } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from './ui/tooltip';

interface EditableProfileHeaderProps {
  name: string;
  initials: string;
  onEditClick: () => void;
}

export const EditableProfileHeader: React.FC<EditableProfileHeaderProps> = ({
  name,
  initials,
  onEditClick
}) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <TooltipProvider>
      <div 
        className="relative cursor-pointer group"
        onClick={onEditClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        aria-label="Modifier le profil"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onEditClick();
          }
        }}
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="w-32 h-32 border-4 border-white shadow-lg bg-gradient-to-br from-blue-500 to-blue-700 transition-all duration-300 group-hover:ring-4 group-hover:ring-blue-300/50">
              <AvatarFallback className="text-3xl font-bold text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            
            {/* Edit overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-blue-600/80 rounded-full p-2">
                <EditIcon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors duration-200 flex items-center gap-2">
              {name}
              <EditIcon className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </h2>
            <p className="text-sm text-blue-600 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Cliquez pour modifier votre profil
            </p>
          </div>
        </div>
        
        <TooltipRoot open={isHovering}>
          <TooltipTrigger asChild>
            <span className="sr-only">Modifier le profil</span>
          </TooltipTrigger>
          <TooltipContent className="bg-slate-800 text-white border-slate-800">
            Cliquez pour modifier votre profil
          </TooltipContent>
        </TooltipRoot>
      </div>
    </TooltipProvider>
  );
};