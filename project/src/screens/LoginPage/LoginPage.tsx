import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { XIcon, EyeIcon, EyeOffIcon, LoaderIcon } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { useAuth } from "../../lib/auth";

export const LoginPage = (): JSX.Element => {
  const navigate = useNavigate();
  const { login, isAuthenticated, user } = useAuth();
  
  // Data for the login forms
  const loginOptions = [
    {
      id: "student",
      title: "Étudiant",
      email: "student@university.edu",
      password: "password123",
      buttonGradient: "bg-gradient-to-b from-blue-500 to-blue-600",
      backgroundGradient: "bg-gradient-to-br from-blue-500 to-blue-600",
      altLogin: {
        icon: "/Frame.png",
        text: "Continuer avec Google",
      },
      redirectPath: "/dashboard", // Student redirects to student dashboard
    },
    {
      id: "coach",
      title: "Coach Carrière",
      email: "coach@university.edu",
      password: "password123",
      buttonGradient: "bg-gradient-to-b from-violet-500 to-violet-600",
      backgroundGradient: "bg-gradient-to-br from-violet-500 to-violet-600",
      altLogin: {
        icon: "/Frame (1).png",
        text: "SSO École",
      },
      redirectPath: "/coach", // Coach redirects to coach dashboard
    },
  ];

  // State for form inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  // State for login process
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // State for active tab
  const [activeTab, setActiveTab] = useState("student");

  // Update form data when tab changes
  useEffect(() => {
    const currentOption = loginOptions.find(option => option.id === activeTab);
    if (currentOption) {
      setFormData({
        email: currentOption.email,
        password: currentOption.password,
      });
    }
  }, [activeTab]);

  // Initialize form data on mount
  useEffect(() => {
    const currentOption = loginOptions.find(option => option.id === activeTab);
    if (currentOption) {
      setFormData({
        email: currentOption.email,
        password: currentOption.password,
      });
    }
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const redirectPath = user?.role === 'coach' ? '/coach' : '/dashboard';
      navigate(redirectPath);
    }
  }, [isAuthenticated, navigate, user]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (error) setError(null);
  };

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Validate inputs
      if (!formData.email || !formData.password) {
        setError("Veuillez saisir l'email et le mot de passe");
        return;
      }
      
      // Call login function from auth context
      await login(formData.email, formData.password);
      
      // Get current option based on active tab
      const currentOption = loginOptions.find(option => option.id === activeTab) || loginOptions[0];
      
      // Navigate to appropriate dashboard
      navigate(currentOption.redirectPath);
    } catch (error) {
      console.error("Login error:", error);
      setError("Email ou mot de passe invalide. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle forgot password
  const handleForgotPassword = () => {
    alert("La fonctionnalité de réinitialisation du mot de passe n'est pas encore implémentée. Veuillez réessayer plus tard.");
  };

  // Handle alternative login methods
  const handleAltLogin = (method: string) => {
    console.log(`Login with ${method} attempted`);
    // In a real implementation, this would initiate OAuth flow or SSO
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Get current option based on active tab
  const currentOption = loginOptions.find(option => option.id === activeTab) || loginOptions[0];

  return (
    <div className="flex min-h-screen items-center justify-center relative bg-slate-50 w-full p-4">
      <Card className="max-w-4xl h-auto min-h-[600px] flex-col md:flex-row flex relative rounded-3xl shadow-[0px_20px_80px_#0000000f,0px_4px_16px_#00000014] overflow-hidden">
        {/* Close button */}
        <Link 
          to="/" 
          className="absolute top-6 right-6 z-10 p-2 rounded-full hover:bg-slate-100/50 transition-colors"
        >
          <XIcon className="w-6 h-6 text-slate-400 hover:text-slate-600" />
        </Link>

        {/* Left side - Dynamic gradient panel */}
        <div className={`flex flex-col w-full md:w-[400px] items-center justify-center gap-6 p-10 relative self-stretch rounded-t-3xl md:rounded-[24px_0px_0px_24px] ${currentOption.backgroundGradient}`}>
          <div className="relative w-fit font-['Montserrat',Helvetica] font-bold text-white text-2xl tracking-[0] leading-[28.8px] whitespace-nowrap">
            Kareer
          </div>

          {/* Illustration */}
          <div className="relative w-80 h-80 hidden sm:block">
            <div className="w-[120px] h-40 top-[100px] left-[100px] rounded-[60px_60px_20px_20px] absolute bg-white" />
            <div className="w-[70px] h-[70px] top-[50px] left-[125px] rounded-[35px] absolute bg-white" />

            {/* Left document */}
            <div className="left-10 absolute w-[100px] h-[140px] top-[120px] bg-white rounded-lg shadow-[0px_4px_12px_#00000040]">
              <div className="w-20 top-[20px] left-[10px] absolute h-1 bg-slate-200 rounded-sm" />
              <div className="w-[60px] top-[40px] left-[10px] absolute h-1 bg-slate-200 rounded-sm" />
              <div className="w-[70px] top-[60px] left-[10px] absolute h-1 bg-slate-200 rounded-sm" />
            </div>

            {/* Right document */}
            <div className="left-[200px] absolute w-[100px] h-[140px] top-[120px] bg-white rounded-lg shadow-[0px_4px_12px_#00000040]">
              <div className="w-20 top-[20px] left-[10px] absolute h-1 bg-slate-200 rounded-sm" />
              <div className="w-[60px] top-[40px] left-[10px] absolute h-1 bg-slate-200 rounded-sm" />
              <div className="w-[70px] top-[60px] left-[10px] absolute h-1 bg-slate-200 rounded-sm" />
            </div>
          </div>

          <div className="relative self-stretch font-['Inter',Helvetica] font-medium text-white text-base text-center tracking-[0] leading-[19.2px]">
            Votre Assistant de Carrière Alimenté par l'IA
          </div>
        </div>

        {/* Right side - Login forms */}
        <div className="flex-col w-full md:w-[500px] items-center justify-center gap-10 px-6 sm:px-10 py-8 sm:py-[60px] self-stretch flex relative">
          {/* Header */}
          <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
            <h1 className="relative self-stretch font-['Montserrat',Helvetica] font-bold text-slate-800 text-[28px] tracking-[0] leading-[33.6px]">
              Bienvenue
            </h1>
            <p className="relative self-stretch font-['Inter',Helvetica] font-normal text-slate-500 text-base tracking-[0] leading-[19.2px]">
              Connectez-vous à votre compte
            </p>
          </div>

          {/* Login options */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Toggle buttons to switch between student and coach */}
            <TabsList className="w-full mb-6 bg-slate-100 p-1 rounded-lg">
              {loginOptions.map((option) => (
                <TabsTrigger 
                  key={option.id} 
                  value={option.id}
                  className="flex-1 py-2 font-['Inter',Helvetica] font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  {option.title}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="items-start gap-5 self-stretch w-full flex-[0_0_auto] flex flex-col sm:flex-row relative">
              {loginOptions.map((option) => (
                <TabsContent
                  key={option.id}
                  value={option.id}
                  className="mt-0 flex-1 w-full"
                >
                  <Card className="gap-6 p-6 bg-slate-50 rounded-2xl shadow-[0px_4px_20px_#0000000a]">
                    <CardContent className="p-0 flex flex-col gap-6">
                      <div className="relative self-stretch font-['Inter',Helvetica] font-normal text-slate-800 text-lg text-center tracking-[0] leading-[21.6px]">
                        {option.title}
                      </div>

                      <form onSubmit={handleLogin}>
                        {/* Email field */}
                        <div className="gap-1.5 self-stretch w-full flex-[0_0_auto] flex flex-col items-start relative mb-4">
                          <Label className="font-['Inter',Helvetica] font-medium text-slate-500 text-sm tracking-[0] leading-[16.8px]">
                            Email
                          </Label>
                          <Input
                            type="email"
                            name="email"
                            placeholder={option.email}
                            value={formData.email}
                            onChange={handleInputChange}
                            className="h-11 bg-white rounded-lg border border-solid border-slate-200 font-['Inter',Helvetica] font-normal text-slate-700 text-sm"
                            required
                          />
                        </div>

                        {/* Password field */}
                        <div className="gap-1.5 self-stretch w-full flex-[0_0_auto] flex flex-col items-start relative mb-4">
                          <Label className="font-['Inter',Helvetica] font-medium text-slate-500 text-sm tracking-[0] leading-[16.8px]">
                            Mot de passe
                          </Label>
                          <div className="relative w-full">
                            <Input
                              type={showPassword ? "text" : "password"}
                              name="password"
                              placeholder="••••••••"
                              value={formData.password}
                              onChange={handleInputChange}
                              className="h-11 bg-white rounded-lg border border-solid border-slate-200 font-['Inter',Helvetica] font-normal text-slate-700 text-sm pr-10"
                              required
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                              onClick={togglePasswordVisibility}
                              tabIndex={-1}
                            >
                              {showPassword ? (
                                <EyeOffIcon className="w-5 h-5" />
                              ) : (
                                <EyeIcon className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Error message */}
                        {error && (
                          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                            {error}
                          </div>
                        )}

                        {/* Login button */}
                        <Button
                          type="submit"
                          className={`h-11 w-full ${option.buttonGradient} rounded-lg font-['Inter',Helvetica] font-normal text-white text-sm disabled:opacity-70`}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <LoaderIcon className="w-4 h-4 mr-2 animate-spin" />
                              Connexion...
                            </>
                          ) : (
                            "Se connecter"
                          )}
                        </Button>
                      </form>

                      {/* Alternative login */}
                      <Button
                        variant="outline"
                        className="h-10 w-full bg-white rounded-lg border border-solid border-slate-200 font-['Inter',Helvetica] font-medium text-slate-800 text-sm flex items-center justify-center gap-2"
                        onClick={() => handleAltLogin(option.altLogin.text)}
                      >
                        <img
                          className="w-5 h-5"
                          alt="Icon"
                          src={option.altLogin.icon}
                        />
                        {option.altLogin.text}
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </div>
          </Tabs>

          {/* Footer links */}
          <div className="flex flex-col items-center justify-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
            <button
              className="font-['Inter',Helvetica] font-normal text-slate-500 text-sm tracking-[0] leading-[16.8px] whitespace-nowrap hover:text-blue-600 transition-colors"
              onClick={handleForgotPassword}
            >
              Mot de passe oublié ?
            </button>

            <div className="inline-flex items-center justify-center gap-1 relative flex-[0_0_auto]">
              <span className="font-['Inter',Helvetica] font-normal text-slate-500 text-sm tracking-[0] leading-[16.8px] whitespace-nowrap">
                Pas encore de compte ?
              </span>
              <Link
                to={activeTab === "student" ? "/inscription-etudiant" : "/inscription-coach"}
                className="font-['Inter',Helvetica] font-medium text-blue-500 text-sm tracking-[0] leading-[16.8px] whitespace-nowrap hover:text-blue-700 transition-colors"
              >
                Créer un compte
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};