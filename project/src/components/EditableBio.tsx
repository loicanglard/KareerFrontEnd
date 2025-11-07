import React, { useState, useRef, useEffect } from 'react';
import { CheckIcon, XIcon, Loader2Icon } from 'lucide-react';

interface EditableBioProps {
  content: string;
  onSave: (content: string) => Promise<void>;
  placeholder?: string;
  maxLength?: number;
  className?: string;
  isEditing: boolean;
}

export const EditableBio: React.FC<EditableBioProps> = ({
  content,
  onSave,
  placeholder = 'Cliquez pour ajouter une bio...',
  maxLength = 300,
  className = '',
  isEditing
}) => {
  const [editedContent, setEditedContent] = useState(content);
  const [isSaving, setIsSaving] = useState(false);
  const [charCount, setCharCount] = useState(content.length);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const originalContent = useRef(content);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      
      // Auto-resize textarea
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [isEditing]);

  useEffect(() => {
    setEditedContent(content);
    originalContent.current = content;
    setCharCount(content.length);
  }, [content]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    
    if (maxLength && newValue.length > maxLength) {
      return;
    }
    
    setEditedContent(newValue);
    setCharCount(newValue.length);
    
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSave = async () => {
    if (editedContent !== originalContent.current) {
      setIsSaving(true);
      try {
        await onSave(editedContent);
        originalContent.current = editedContent;
      } catch (error) {
        console.error('Error saving bio:', error);
        // Optionally show error message
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleCancel = () => {
    setEditedContent(originalContent.current);
    setCharCount(originalContent.current.length);
  };

  if (isEditing) {
    return (
      <div className={`relative ${className}`}>
        <textarea
          ref={textareaRef}
          value={editedContent}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full p-3 bg-white border border-slate-300 rounded-md text-slate-700 text-base leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[100px]"
          disabled={isSaving}
        />
        
        <div className="flex items-center justify-between mt-2">
          <div className="text-xs text-slate-500">
            {charCount}/{maxLength} caractères
          </div>
          
          <div className="flex items-center gap-2">
            {isSaving ? (
              <div className="flex items-center gap-2 text-blue-600 text-sm">
                <Loader2Icon className="w-4 h-4 animate-spin" />
                Enregistrement...
              </div>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  className="p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors duration-200"
                  aria-label="Annuler"
                >
                  <XIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={handleSave}
                  className="p-1.5 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors duration-200"
                  aria-label="Sauvegarder"
                >
                  <CheckIcon className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`${className} ${!content ? 'text-slate-400' : ''}`}>
      {content || placeholder}
    </div>
  );
};