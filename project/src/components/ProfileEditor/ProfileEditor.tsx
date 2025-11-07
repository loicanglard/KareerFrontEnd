import React, { useState, useRef, useEffect } from 'react';
import { 
  EditIcon, 
  SaveIcon, 
  XIcon, 
  Loader2Icon, 
  CheckIcon,
  MailIcon,
  PhoneIcon,
  GlobeIcon,
  LinkedinIcon,
  MapPinIcon
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';

interface ProfileField {
  id: string;
  label: string;
  value: string;
  type: 'text' | 'email' | 'tel' | 'url';
  icon: React.ReactNode;
  validation?: RegExp;
  errorMessage?: string;
}

interface ProfileEditorProps {
  initialData: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    portfolio: string;
  };
  onSave: (data: any) => Promise<void>;
}

export const ProfileEditor: React.FC<ProfileEditorProps> = ({ initialData, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [formData, setFormData] = useState({ ...initialData });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [originalData] = useState({ ...initialData });
  
  const editorRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Define fields with validation
  const fields: ProfileField[] = [
    {
      id: 'email',
      label: 'EMAIL',
      value: formData.email,
      type: 'email',
      icon: <MailIcon className="w-5 h-5 text-white" />,
      validation: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      errorMessage: 'Veuillez entrer une adresse email valide'
    },
    {
      id: 'phone',
      label: 'TÉLÉPHONE',
      value: formData.phone,
      type: 'tel',
      icon: <PhoneIcon className="w-5 h-5 text-white" />,
      validation: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
      errorMessage: 'Veuillez entrer un numéro de téléphone valide'
    },
    {
      id: 'location',
      label: 'LOCALISATION',
      value: formData.location,
      type: 'text',
      icon: <MapPinIcon className="w-5 h-5 text-white" />
    },
    {
      id: 'linkedin',
      label: 'LINKEDIN',
      value: formData.linkedin,
      type: 'url',
      icon: <LinkedinIcon className="w-5 h-5 text-white" />,
      validation: /^https?:\/\/([a-z]{2,3}\.)?linkedin\.com\/.*$/,
      errorMessage: 'Veuillez entrer une URL LinkedIn valide'
    },
    {
      id: 'portfolio',
      label: 'PORTFOLIO',
      value: formData.portfolio,
      type: 'url',
      icon: <GlobeIcon className="w-5 h-5 text-white" />,
      validation: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
      errorMessage: 'Veuillez entrer une URL valide'
    }
  ];

  // Focus trap for accessibility
  useEffect(() => {
    if (isEditing && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [isEditing]);

  // Detect changes
  useEffect(() => {
    const hasAnyChanges = Object.keys(formData).some(
      key => formData[key as keyof typeof formData] !== originalData[key as keyof typeof originalData]
    );
    setHasChanges(hasAnyChanges);
  }, [formData, originalData]);

  // Prevent navigation if there are unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isEditing && hasChanges) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isEditing, hasChanges]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate field
    validateField(name, value);
  };

  // Validate a single field
  const validateField = (name: string, value: string) => {
    const field = fields.find(f => f.id === name);
    
    if (field?.validation) {
      const isValid = field.validation.test(value);
      if (!isValid && value) {
        setErrors(prev => ({ ...prev, [name]: field.errorMessage || 'Champ invalide' }));
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
  };

  // Validate all fields
  const validateAllFields = () => {
    const newErrors: Record<string, string> = {};
    
    fields.forEach(field => {
      if (field.validation) {
        const value = formData[field.id as keyof typeof formData];
        const isValid = field.validation.test(value as string);
        if (!isValid && value) {
          newErrors[field.id] = field.errorMessage || 'Champ invalide';
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle save
  const handleSave = async () => {
    if (!validateAllFields()) {
      return;
    }
    
    setIsSaving(true);
    
    try {
      await onSave(formData);
      setIsEditing(false);
      setShowToast(true);
      
      // Hide toast after 3 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      console.error('Error saving profile:', error);
      // Handle error (could show an error toast)
    } finally {
      setIsSaving(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    if (hasChanges) {
      setShowConfirmModal(true);
    } else {
      resetForm();
    }
  };

  // Reset form to original data
  const resetForm = () => {
    setFormData({ ...originalData });
    setIsEditing(false);
    setErrors({});
  };

  // Confirm discard changes
  const confirmDiscard = () => {
    resetForm();
    setShowConfirmModal(false);
  };

  // Cancel discard
  const cancelDiscard = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className="relative" ref={editorRef}>
      {/* Success Toast */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg shadow-md flex items-center gap-2 z-50 animate-fade-in">
          <CheckIcon className="w-5 h-5" />
          <span>Profil mis à jour avec succès</span>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <Card className="w-full max-w-md p-6 bg-white rounded-xl shadow-xl">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Annuler les modifications ?</h3>
            <p className="text-slate-600 mb-6">
              Vous avez des modifications non enregistrées. Êtes-vous sûr de vouloir annuler ?
            </p>
            <div className="flex justify-end gap-3">
              <Button 
                variant="outline" 
                onClick={cancelDiscard}
                className="border-slate-200"
              >
                Continuer l'édition
              </Button>
              <Button 
                variant="destructive" 
                onClick={confirmDiscard}
              >
                Annuler les modifications
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Edit/Save Button */}
      <div className="flex justify-end mb-6">
        {isEditing ? (
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isSaving}
              className="border-slate-200"
            >
              <XIcon className="w-4 h-4 mr-2" />
              Annuler
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving || Object.keys(errors).length > 0}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSaving ? (
                <>
                  <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <SaveIcon className="w-4 h-4 mr-2" />
                  Enregistrer
                </>
              )}
            </Button>
          </div>
        ) : (
          <Button
            className="gap-2 bg-blue-600 hover:bg-blue-700"
            onClick={() => setIsEditing(true)}
          >
            <EditIcon className="w-4 h-4" />
            Modifier le profil
          </Button>
        )}
      </div>

      {/* Contact Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {fields.map((field, index) => (
          <div 
            key={field.id}
            className={`
              flex items-center gap-3 p-4 rounded-xl border transition-all duration-200
              ${isEditing 
                ? 'bg-slate-50 border-slate-200 shadow-sm' 
                : 'bg-blue-50 border-blue-100'}
            `}
          >
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              {field.icon}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="text-xs text-blue-600 font-medium uppercase tracking-wide mb-1">
                {field.label}
              </div>
              
              {isEditing ? (
                <div className="relative">
                  <Input
                    ref={index === 0 ? firstInputRef : undefined}
                    type={field.type}
                    name={field.id}
                    value={formData[field.id as keyof typeof formData] as string}
                    onChange={handleChange}
                    className={`
                      h-10 bg-white border text-sm font-medium
                      ${errors[field.id] ? 'border-red-300 focus:ring-red-500' : 'border-slate-300 focus:ring-blue-500'}
                    `}
                    aria-invalid={errors[field.id] ? 'true' : 'false'}
                    aria-describedby={errors[field.id] ? `${field.id}-error` : undefined}
                  />
                  {errors[field.id] && (
                    <p 
                      id={`${field.id}-error`} 
                      className="text-xs text-red-500 mt-1 absolute"
                    >
                      {errors[field.id]}
                    </p>
                  )}
                </div>
              ) : (
                field.id === 'linkedin' || field.id === 'portfolio' ? (
                  <a 
                    href={formData[field.id] as string} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm font-medium text-blue-600 hover:underline truncate block"
                  >
                    Voir le profil
                  </a>
                ) : (
                  <div className="text-sm font-medium text-slate-800 truncate">
                    {formData[field.id as keyof typeof formData] as string}
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};