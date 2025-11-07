import React from 'react';

interface ProfileBannerUploadProps {
  currentImage?: string;
  onImageUpload: (file: File) => Promise<string>;
}

export const ProfileBannerUpload: React.FC<ProfileBannerUploadProps> = ({
  currentImage,
  onImageUpload
}) => {
  return (
    <div className="relative h-32 w-full bg-gradient-to-r from-blue-500 to-blue-600">
    </div>
  );
};