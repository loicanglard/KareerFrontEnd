import React, { useState } from 'react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { ImageUploader } from '../ImageUploader/ImageUploader';
import { EditIcon, CameraIcon } from 'lucide-react';

interface ProfileImageUploadProps {
  name: string;
  initials: string;
  currentImage?: string;
  onImageUpload: (file: File) => Promise<string>;
}

export const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  name,
  initials,
  currentImage,
  onImageUpload
}) => {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Avatar 
        className="w-32 h-32 border-4 border-white shadow-lg bg-gradient-to-br from-blue-500 to-blue-700 transition-all duration-300 group-hover:ring-4 group-hover:ring-blue-300/50"
      >
        {currentImage ? (
          <img 
            src={currentImage} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <AvatarFallback className="text-3xl font-bold text-white">
            {initials}
          </AvatarFallback>
        )}
      </Avatar>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <ImageUploader
          type="profile"
          currentImage={currentImage}
          onImageUpload={onImageUpload}
          maxSizeMB={2}
          aspectRatio={1}
          minWidth={200}
          minHeight={200}
        />
      </div>
      
      {isHovering && (
        <div className="absolute -bottom-2 right-0 bg-blue-600 rounded-full p-1.5 shadow-lg">
          <CameraIcon className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );
};