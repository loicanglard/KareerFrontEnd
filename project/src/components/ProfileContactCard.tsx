import React, { useState } from 'react';
import { 
  MailIcon, 
  PhoneIcon, 
  LinkedinIcon, 
  GlobeIcon, 
  BookOpenIcon, 
  CalendarIcon,
  MapPinIcon
} from 'lucide-react';
import { InlineEditableField } from './InlineEditableField';

interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;
  university: string;
  graduation: string;
}

interface ProfileContactCardProps {
  contactInfo: ContactInfo;
  isEditing: boolean;
  onFieldSave: (field: keyof ContactInfo, value: string) => Promise<void>;
}

export const ProfileContactCard: React.FC<ProfileContactCardProps> = ({
  contactInfo,
  isEditing,
  onFieldSave
}) => {
  // Field validation patterns
  const validations = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
    linkedin: /^https?:\/\/([a-z]{2,3}\.)?linkedin\.com\/.*$/,
    portfolio: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/
  };

  // Handle field save
  const handleSave = (field: keyof ContactInfo) => async (value: string) => {
    await onFieldSave(field, value);
  };

  // Contact card items configuration
  const contactItems = [
    {
      id: 'email',
      icon: <MailIcon className="w-5 h-5 text-white" />,
      label: 'EMAIL',
      value: contactInfo.email,
      type: 'email' as const,
      validation: validations.email,
      errorMessage: 'Veuillez entrer une adresse email valide'
    },
    {
      id: 'phone',
      icon: <PhoneIcon className="w-5 h-5 text-white" />,
      label: 'TÉLÉPHONE',
      value: contactInfo.phone,
      type: 'tel' as const,
      validation: validations.phone,
      errorMessage: 'Veuillez entrer un numéro de téléphone valide'
    },
    {
      id: 'location',
      icon: <MapPinIcon className="w-5 h-5 text-white" />,
      label: 'LOCALISATION',
      value: contactInfo.location,
      type: 'text' as const
    },
    {
      id: 'linkedin',
      icon: <LinkedinIcon className="w-5 h-5 text-white" />,
      label: 'LINKEDIN',
      value: contactInfo.linkedin,
      type: 'url' as const,
      validation: validations.linkedin,
      errorMessage: 'Veuillez entrer une URL LinkedIn valide',
      isLink: true
    },
    {
      id: 'portfolio',
      icon: <GlobeIcon className="w-5 h-5 text-white" />,
      label: 'PORTFOLIO',
      value: contactInfo.portfolio,
      type: 'url' as const,
      validation: validations.portfolio,
      errorMessage: 'Veuillez entrer une URL valide',
      isLink: true
    },
    {
      id: 'university',
      icon: <BookOpenIcon className="w-5 h-5 text-white" />,
      label: 'UNIVERSITÉ',
      value: contactInfo.university,
      type: 'text' as const,
      disabled: true
    },
    {
      id: 'graduation',
      icon: <CalendarIcon className="w-5 h-5 text-white" />,
      label: 'DIPLÔME',
      value: contactInfo.graduation,
      type: 'text' as const,
      disabled: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {contactItems.map((item) => (
        <div 
          key={item.id}
          className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            {item.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">
              {item.label}
            </div>
            
            {isEditing ? (
              <InlineEditableField
                value={item.value}
                onSave={handleSave(item.id as keyof ContactInfo)}
                type={item.type}
                validation={item.validation}
                errorMessage={item.errorMessage}
                disabled={item.disabled}
                className="text-sm font-medium"
              />
            ) : (
              item.isLink ? (
                <a 
                  href={item.value} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Voir le profil
                </a>
              ) : (
                <div className="text-sm font-medium text-slate-800 truncate">
                  {item.value}
                </div>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
};