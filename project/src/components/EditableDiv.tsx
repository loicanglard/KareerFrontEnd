import React, { useState, useRef, useEffect } from 'react';

interface EditableDivProps {
  initialContent: string;
  placeholder?: string;
  className?: string;
  onSave?: (content: string) => void;
  maxLength?: number;
}

export const EditableDiv: React.FC<EditableDivProps> = ({
  initialContent,
  placeholder = 'Cliquez pour éditer...',
  className = '',
  onSave,
  maxLength = 500
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(!initialContent);
  const divRef = useRef<HTMLDivElement>(null);

  // Focus the div when editing starts
  useEffect(() => {
    if (isEditing && divRef.current) {
      divRef.current.focus();
      
      // Place cursor at the end of the content
      const selection = window.getSelection();
      const range = document.createRange();
      
      if (selection && divRef.current.childNodes.length > 0) {
        range.selectNodeContents(divRef.current);
        range.collapse(false); // collapse to end
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }, [isEditing]);

  // Handle click to start editing
  const handleClick = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  // Handle blur to save content
  const handleBlur = () => {
    if (isEditing) {
      saveContent();
    }
  };

  // Handle key press events
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      saveContent();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsEditing(false);
      setContent(initialContent); // Revert to original content
    }
  };

  // Save content
  const saveContent = async () => {
    if (divRef.current) {
      const newContent = divRef.current.innerText.trim();
      
      if (newContent !== initialContent) {
        setIsSaving(true);
        
        try {
          // Call the onSave callback if provided
          if (onSave) {
            await onSave(newContent);
          }
          
          setContent(newContent);
          setShowPlaceholder(!newContent);
        } catch (error) {
          console.error('Error saving content:', error);
          // Optionally handle error (e.g., show error message)
        } finally {
          setIsSaving(false);
        }
      }
      
      setIsEditing(false);
    }
  };

  // Update content as user types
  const handleInput = () => {
    if (divRef.current) {
      const text = divRef.current.innerText;
      
      // Enforce maxLength if specified
      if (maxLength && text.length > maxLength) {
        divRef.current.innerText = text.substring(0, maxLength);
        
        // Move cursor to end after truncating
        const selection = window.getSelection();
        const range = document.createRange();
        
        if (selection && divRef.current.childNodes.length > 0) {
          range.selectNodeContents(divRef.current);
          range.collapse(false);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
      
      setShowPlaceholder(!divRef.current.innerText);
    }
  };

  return (
    <div className="relative">
      <div
        ref={divRef}
        contentEditable={isEditing}
        suppressContentEditableWarning={true}
        onClick={handleClick}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        className={`
          min-h-[24px] p-2 rounded-md transition-all duration-200
          ${isEditing ? 'bg-white ring-2 ring-blue-500 shadow-sm' : 'hover:bg-slate-50 cursor-pointer'}
          ${showPlaceholder ? 'text-slate-400' : 'text-slate-800'}
          ${isSaving ? 'opacity-70' : 'opacity-100'}
          ${className}
        `}
        aria-label={placeholder}
        role="textbox"
        aria-multiline="true"
        tabIndex={0}
      >
        {showPlaceholder && !isEditing ? placeholder : content}
      </div>
      
      {isEditing && (
        <div className="absolute bottom-0 right-0 transform translate-y-full mt-1 text-xs text-slate-500 flex items-center gap-2">
          {maxLength && (
            <span>
              {divRef.current?.innerText.length || 0}/{maxLength}
            </span>
          )}
          {isSaving ? (
            <span className="text-blue-500">Enregistrement...</span>
          ) : (
            <span className="text-slate-400">Appuyez sur Entrée pour enregistrer, Échap pour annuler</span>
          )}
        </div>
      )}
    </div>
  );
};