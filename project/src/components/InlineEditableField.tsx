import React, { useState, useRef, useEffect } from 'react';
import { CheckIcon, XIcon, Loader2Icon } from 'lucide-react';

interface InlineEditableFieldProps {
  value: string;
  onSave: (value: string) => Promise<void>;
  type?: 'text' | 'email' | 'tel' | 'url';
  className?: string;
  placeholder?: string;
  validation?: RegExp;
  errorMessage?: string;
  disabled?: boolean;
}

export const InlineEditableField: React.FC<InlineEditableFieldProps> = ({
  value,
  onSave,
  type = 'text',
  className = '',
  placeholder = 'Cliquez pour modifier...',
  validation,
  errorMessage = 'Valeur invalide',
  disabled = false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const originalValue = useRef(value);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    setInputValue(value);
    originalValue.current = value;
  }, [value]);

  const handleClick = () => {
    if (!disabled && !isEditing) {
      setIsEditing(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    
    // Clear error when user types
    if (error) {
      setError(null);
    }
  };

  const validate = (): boolean => {
    if (validation && inputValue) {
      const isValid = validation.test(inputValue);
      if (!isValid) {
        setError(errorMessage);
        return false;
      }
    }
    setError(null);
    return true;
  };

  const handleSave = async () => {
    if (!validate()) {
      return;
    }
    
    if (inputValue !== originalValue.current) {
      setIsSaving(true);
      try {
        await onSave(inputValue);
        originalValue.current = inputValue;
      } catch (err) {
        console.error('Error saving value:', err);
        setError('Erreur lors de la sauvegarde');
      } finally {
        setIsSaving(false);
      }
    }
    
    setIsEditing(false);
  };

  const handleCancel = () => {
    setInputValue(originalValue.current);
    setError(null);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleBlur = () => {
    // Don't save on blur to avoid accidental saves
    // Just validate to show errors
    validate();
  };

  return (
    <div className={`relative ${className}`}>
      {isEditing ? (
        <div className="flex items-center gap-1">
          <input
            ref={inputRef}
            type={type}
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className={`
              w-full px-2 py-1 text-sm font-medium text-slate-800 
              bg-white border rounded-md transition-all duration-200
              focus:outline-none focus:ring-1 focus:ring-blue-500
              ${error ? 'border-red-300' : 'border-slate-300'}
            `}
            placeholder={placeholder}
            disabled={isSaving}
            aria-invalid={error ? 'true' : 'false'}
          />
          
          <div className="flex items-center gap-1">
            {isSaving ? (
              <Loader2Icon className="w-5 h-5 text-blue-500 animate-spin" />
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="p-1 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors duration-200"
                  disabled={!!error}
                  aria-label="Sauvegarder"
                >
                  <CheckIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCancel}
                  className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors duration-200"
                  aria-label="Annuler"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <div 
          onClick={handleClick}
          className={`
            px-2 py-1 rounded-md cursor-pointer transition-all duration-200
            ${disabled ? 'cursor-default' : 'hover:bg-slate-50'}
          `}
        >
          {value || <span className="text-slate-400">{placeholder}</span>}
        </div>
      )}
      
      {error && (
        <div className="text-xs text-red-500 mt-1">{error}</div>
      )}
    </div>
  );
};