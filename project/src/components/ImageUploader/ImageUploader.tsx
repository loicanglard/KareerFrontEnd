import React, { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
  ImageIcon, 
  UploadIcon, 
  XIcon, 
  Loader2Icon, 
  CheckIcon,
  AlertCircleIcon
} from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Progress } from '../ui/progress';

export interface ImageUploaderProps {
  type: 'profile' | 'banner';
  currentImage?: string;
  onImageUpload: (file: File) => Promise<string>;
  maxSizeMB?: number;
  aspectRatio?: number;
  minWidth?: number;
  minHeight?: number;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  type,
  currentImage,
  onImageUpload,
  maxSizeMB = 5,
  aspectRatio,
  minWidth = 200,
  minHeight = 200
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  
  // Simulate upload progress
  const simulateProgress = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress > 95) {
        clearInterval(interval);
        progress = 95;
      }
      setUploadProgress(Math.min(progress, 95));
    }, 300);
    
    return () => clearInterval(interval);
  };
  
  // Handle file drop
  const onDrop = (acceptedFiles: File[]) => {
    setError(null);
    setSuccess(false);
    
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    
    // Check file size
    if (file.size > maxSizeBytes) {
      setError(`L'image est trop volumineuse. Taille maximale: ${maxSizeMB}MB`);
      return;
    }
    
    // Check image dimensions and aspect ratio
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    
    img.onload = () => {
      // Check minimum dimensions
      if (img.width < minWidth || img.height < minHeight) {
        setError(`L'image doit avoir une taille minimale de ${minWidth}x${minHeight} pixels`);
        URL.revokeObjectURL(objectUrl);
        return;
      }
      
      // Check aspect ratio if specified
      if (aspectRatio) {
        const imageRatio = img.width / img.height;
        const tolerance = 0.1; // Allow some tolerance in aspect ratio
        
        if (Math.abs(imageRatio - aspectRatio) > tolerance) {
          setError(`L'image doit avoir un ratio d'aspect proche de ${aspectRatio.toFixed(2)}`);
          URL.revokeObjectURL(objectUrl);
          return;
        }
      }
      
      setSelectedFile(file);
      setPreview(objectUrl);
    };
    
    img.onerror = () => {
      setError("Le fichier sélectionné n'est pas une image valide");
      URL.revokeObjectURL(objectUrl);
    };
    
    img.src = objectUrl;
  };
  
  // Dropzone configuration
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/gif': []
    },
    maxFiles: 1
  });
  
  // Handle upload button click
  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    setError(null);
    setSuccess(false);
    
    // Start progress simulation
    const stopProgress = simulateProgress();
    
    try {
      // Upload the image
      const imageUrl = await onImageUpload(selectedFile);
      
      // Complete progress
      setUploadProgress(100);
      setSuccess(true);
      
      // Close dialog after a delay
      setTimeout(() => {
        setIsOpen(false);
        setSelectedFile(null);
        setPreview(null);
        setUploadProgress(0);
        setSuccess(false);
      }, 1500);
      
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('Une erreur est survenue lors du téléchargement de l\'image');
    } finally {
      stopProgress();
      setIsUploading(false);
    }
  };
  
  // Trigger file input click
  const handleButtonClick = () => {
    setIsOpen(true);
  };
  
  // Reset state when dialog closes
  const handleDialogClose = () => {
    if (!isUploading) {
      setSelectedFile(null);
      setPreview(null);
      setError(null);
      setSuccess(false);
      setUploadProgress(0);
    }
  };
  
  return (
    <>
      <Button
        type="button"
        variant="ghost"
        onClick={handleButtonClick}
        className="absolute inset-0 w-full h-full opacity-0 hover:opacity-100 bg-black/30 flex items-center justify-center transition-opacity duration-300 rounded-full"
      >
        <div className="bg-white rounded-full p-3 shadow-lg">
          <UploadIcon className="w-6 h-6 text-blue-600" />
        </div>
      </Button>
      
      <Dialog open={isOpen} onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) handleDialogClose();
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {type === 'profile' ? 'Modifier votre photo de profil' : 'Modifier votre bannière'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Current image preview */}
            {!preview && currentImage && (
              <div className="mb-4">
                <p className="text-sm text-slate-500 mb-2">Image actuelle :</p>
                <div className={`relative mx-auto overflow-hidden ${type === 'profile' ? 'w-32 h-32 rounded-full' : 'w-full h-32 rounded-lg'}`}>
                  <img 
                    src={currentImage} 
                    alt={type === 'profile' ? 'Photo de profil' : 'Bannière'} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
            
            {/* Dropzone */}
            {!isUploading && !success && (
              <div
                {...getRootProps()}
                className={`
                  border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors duration-200
                  ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'}
                  ${error ? 'border-red-300 bg-red-50' : ''}
                `}
              >
                <input {...getInputProps()} />
                
                {preview ? (
                  <div className="space-y-4">
                    <div className={`relative mx-auto overflow-hidden ${type === 'profile' ? 'w-32 h-32 rounded-full' : 'w-full h-32 rounded-lg'}`}>
                      <img 
                        src={preview} 
                        alt="Aperçu" 
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreview(null);
                          setSelectedFile(null);
                        }}
                        className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md"
                      >
                        <XIcon className="w-4 h-4 text-slate-600" />
                      </button>
                    </div>
                    <p className="text-sm text-slate-600">
                      {selectedFile?.name} ({(selectedFile?.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        {isDragActive ? 'Déposez l\'image ici' : 'Glissez-déposez une image ou cliquez pour parcourir'}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        PNG, JPG ou GIF (max. {maxSizeMB}MB)
                        {minWidth && minHeight && ` • Min. ${minWidth}x${minHeight}px`}
                        {aspectRatio && ` • Ratio ${aspectRatio.toFixed(2)}`}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Error message */}
            {error && (
              <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                <AlertCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
            
            {/* Upload progress */}
            {isUploading && (
              <div className="space-y-4 py-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">Téléchargement en cours...</span>
                  <span className="text-sm font-medium text-slate-700">{Math.round(uploadProgress)}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
            
            {/* Success message */}
            {success && (
              <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-md text-green-700">
                <CheckIcon className="w-5 h-5" />
                <span>Image téléchargée avec succès!</span>
              </div>
            )}
          </div>
          
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isUploading}
            >
              Annuler
            </Button>
            
            <Button
              type="button"
              onClick={handleUpload}
              disabled={!selectedFile || isUploading || success}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isUploading ? (
                <>
                  <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                  Téléchargement...
                </>
              ) : (
                'Télécharger'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};