import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { safeJsonParse, safeJsonStringify } from './json-utils';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'coach' | 'admin';
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

// Default context value
const defaultAuthContext: AuthContextType = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
  checkAuth: async () => false
};

// Create context
export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Mock user data for demonstration
const MOCK_USERS = [
  {
    id: '1',
    email: 'student@university.edu',
    password: 'password123',
    name: 'John Smith',
    role: 'student' as const,
    avatarUrl: ''
  },
  {
    id: '2',
    email: 'coach@university.edu',
    password: 'password123',
    name: 'Sarah Johnson',
    role: 'coach' as const,
    avatarUrl: ''
  }
];

// Auth provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if user is authenticated on mount
  useEffect(() => {
    const initAuth = async () => {
      await checkAuth();
      setIsLoading(false);
    };
    
    initAuth();
  }, []);
  
  // Check authentication status
  const checkAuth = async (): Promise<boolean> => {
    try {
      // In a real app, this would verify the token with the backend
      const token = localStorage.getItem('auth_token');
      const userData = localStorage.getItem('user_data');

      if (token && userData) {
        const parsedUser = safeJsonParse<User>(userData);
        if (parsedUser) {
          setUser(parsedUser);
          return true;
        } else {
          // Clear corrupted data
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user_data');
          return false;
        }
      }

      return false;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  };
  
  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      
      // In a real app, this would be an API call
      const mockUser = MOCK_USERS.find(u => u.email === email && u.password === password);
      
      if (!mockUser) {
        throw new Error('Invalid credentials');
      }
      
      // Create user object without password
      const { password: _, ...userWithoutPassword } = mockUser;
      
      // Generate mock token
      const token = `mock_token_${Date.now()}`;
      
      // Store in localStorage
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_data', safeJsonStringify(userWithoutPassword));
      localStorage.setItem('auth_timestamp', Date.now().toString());
      
      // Update state
      setUser(userWithoutPassword);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Logout function
  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      
      // Clear all auth-related data from localStorage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      localStorage.removeItem('auth_timestamp');
      
      // Clear session storage items that might contain sensitive data
      sessionStorage.clear();
      
      // Clear user state
      setUser(null);
      
      // In a real app with a backend, you would also invalidate the token server-side
      // await fetch('/api/auth/logout', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      //   }
      // });
      
      // Redirect to login page will be handled by the component
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Context value
  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    checkAuth
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};