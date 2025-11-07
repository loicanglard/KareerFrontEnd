import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOutIcon, AlertTriangleIcon, LoaderIcon } from 'lucide-react';
import { Button } from './ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from './ui/dialog';
import { useAuth } from '../lib/auth';

interface LogoutButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showIcon?: boolean;
  className?: string;
  checkUnsavedChanges?: boolean;
  hasUnsavedChanges?: boolean;
  onConfirmLogout?: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  variant = 'ghost',
  size = 'default',
  showIcon = true,
  className = '',
  checkUnsavedChanges = false,
  hasUnsavedChanges = false,
  onConfirmLogout
}) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  // Function to check for unsaved changes
  const checkForUnsavedChanges = (): boolean => {
    if (!checkUnsavedChanges) return false;
    
    // If prop is provided, use that value
    if (hasUnsavedChanges !== undefined) return hasUnsavedChanges;
    
    // Otherwise check for form elements with the 'data-unsaved-changes' attribute
    const formsWithUnsavedChanges = document.querySelectorAll('form[data-unsaved-changes="true"]');
    return formsWithUnsavedChanges.length > 0;
  };

  const handleLogoutClick = () => {
    // Check if we need to show confirmation dialog
    if (checkForUnsavedChanges()) {
      setIsDialogOpen(true);
    } else {
      performLogout();
    }
  };

  const performLogout = async () => {
    try {
      setIsLoggingOut(true);
      setLogoutError(null);
      
      // Call the logout function from auth context
      await logout();
      
      // Call optional callback if provided
      if (onConfirmLogout) {
        onConfirmLogout();
      }
      
      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      setLogoutError('Failed to log out. Please try again.');
    } finally {
      setIsLoggingOut(false);
      setIsDialogOpen(false);
    }
  };

  const cancelLogout = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={handleLogoutClick}
        className={`text-red-500 hover:text-red-700 hover:bg-red-50 ${className}`}
        disabled={isLoggingOut}
        aria-label="Log out"
      >
        {isLoggingOut ? (
          <LoaderIcon className="h-4 w-4 animate-spin mr-2" />
        ) : (
          showIcon && <LogOutIcon className="h-4 w-4 mr-2" />
        )}
        <span className="font-medium">Se déconnecter</span>
      </Button>

      {/* Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Se déconnecter ?</DialogTitle>
            <DialogDescription className="text-slate-600 mt-2">
              Vous avez des modifications non enregistrées qui seront perdues si vous vous déconnectez maintenant.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200 my-4">
            <AlertTriangleIcon className="h-5 w-5 text-amber-500 flex-shrink-0" />
            <p className="text-sm text-amber-700">
              Tout travail non enregistré sera perdu définitivement.
            </p>
          </div>
          
          {logoutError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {logoutError}
            </div>
          )}
          
          <DialogFooter className="gap-3 sm:gap-0 mt-2">
            <Button
              variant="outline"
              onClick={cancelLogout}
              disabled={isLoggingOut}
              className="border-slate-200 hover:bg-slate-50"
            >
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={performLogout}
              disabled={isLoggingOut}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoggingOut ? (
                <>
                  <LoaderIcon className="h-4 w-4 mr-2 animate-spin" />
                  Déconnexion...
                </>
              ) : (
                'Se déconnecter quand même'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};