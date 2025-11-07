import React, { useState } from 'react';
import { UploadIcon, FileTextIcon, CheckCircleIcon } from 'lucide-react';
import { Button } from './ui/button';
import { uploadDocument } from '../lib/documentService';

interface DocumentUploaderProps {
  applicationId: string;
  documentType: 'cv' | 'cover_letter';
  currentUrl?: string;
  onUploadComplete: (url: string) => void;
  label?: string;
}

export const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  applicationId,
  documentType,
  currentUrl,
  onUploadComplete,
  label
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(!!currentUrl);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Seuls les fichiers PDF sont acceptés');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Le fichier ne doit pas dépasser 5 MB');
      return;
    }

    setUploading(true);
    try {
      const url = await uploadDocument(file, applicationId, documentType);
      if (url) {
        setUploaded(true);
        onUploadComplete(url);
      } else {
        alert('Erreur lors du téléchargement du document');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Erreur lors du téléchargement du document');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-700">
        {label || (documentType === 'cv' ? 'CV' : 'Lettre de motivation')}
      </label>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          disabled={uploading}
          onClick={() => document.getElementById(`file-${applicationId}-${documentType}`)?.click()}
        >
          {uploading ? (
            <>
              <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin mr-2" />
              Téléchargement...
            </>
          ) : uploaded ? (
            <>
              <CheckCircleIcon className="w-4 h-4 mr-2 text-green-600" />
              Téléchargé
            </>
          ) : (
            <>
              <UploadIcon className="w-4 h-4 mr-2" />
              Choisir un fichier
            </>
          )}
        </Button>
        {currentUrl && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(currentUrl, '_blank')}
          >
            <FileTextIcon className="w-4 h-4" />
          </Button>
        )}
      </div>
      <input
        id={`file-${applicationId}-${documentType}`}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={handleFileChange}
      />
      <p className="text-xs text-slate-500">PDF uniquement, max 5 MB</p>
    </div>
  );
};
