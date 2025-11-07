import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { XIcon, EyeIcon, EyeOffIcon, LoaderIcon } from "lucide-react";

export const SignupCoach = (): JSX.Element => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    password: "",
    confirmPassword: "",
    etablissement: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.prenom.trim()) {
      newErrors.prenom = "Le prénom est requis";
    }

    if (!formData.nom.trim()) {
      newErrors.nom = "Le nom est requis";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email professionnel est requis";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 8) {
      newErrors.password = "Le mot de passe doit contenir au moins 8 caractères";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Veuillez confirmer le mot de passe";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);

      const userData = {
        prenom: formData.prenom,
        nom: formData.nom,
        email: formData.email,
        etablissement: formData.etablissement || null,
        role: "coach",
      };

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("isAuthenticated", "true");

      setTimeout(() => {
        navigate("/coach");
      }, 500);
    } catch (error) {
      console.error("Signup error:", error);
      setErrors({ general: "Une erreur s'est produite. Veuillez réessayer." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center relative bg-slate-50 w-full p-4">
      <Card className="max-w-4xl h-auto min-h-[600px] flex-col md:flex-row flex relative rounded-3xl shadow-[0px_20px_80px_#0000000f,0px_4px_16px_#00000014] overflow-hidden">
        <Link
          to="/login"
          className="absolute top-6 right-6 z-10 p-2 rounded-full hover:bg-slate-100/50 transition-colors"
        >
          <XIcon className="w-6 h-6 text-slate-400 hover:text-slate-600" />
        </Link>

        <div className="flex flex-col w-full md:w-[400px] items-center justify-center gap-6 p-10 relative self-stretch rounded-t-3xl md:rounded-[24px_0px_0px_24px] bg-gradient-to-br from-violet-500 to-violet-600">
          <div className="relative w-fit font-['Montserrat',Helvetica] font-bold text-white text-2xl tracking-[0] leading-[28.8px] whitespace-nowrap">
            Kareer
          </div>

          <div className="relative w-80 h-80 hidden sm:block">
            <div className="w-[120px] h-40 top-[100px] left-[100px] rounded-[60px_60px_20px_20px] absolute bg-white" />
            <div className="w-[70px] h-[70px] top-[50px] left-[125px] rounded-[35px] absolute bg-white" />

            <div className="left-10 absolute w-[100px] h-[140px] top-[120px] bg-white rounded-lg shadow-[0px_4px_12px_#00000040]">
              <div className="w-20 top-[20px] left-[10px] absolute h-1 bg-slate-200 rounded-sm" />
              <div className="w-[60px] top-[40px] left-[10px] absolute h-1 bg-slate-200 rounded-sm" />
              <div className="w-[70px] top-[60px] left-[10px] absolute h-1 bg-slate-200 rounded-sm" />
            </div>

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

        <div className="flex-col w-full md:w-[500px] items-center justify-center gap-8 px-6 sm:px-10 py-8 sm:py-[60px] self-stretch flex relative">
          <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
            <h1 className="relative self-stretch font-['Montserrat',Helvetica] font-bold text-slate-800 text-[28px] tracking-[0] leading-[33.6px]">
              Créer un compte
            </h1>
            <p className="relative self-stretch font-['Inter',Helvetica] font-normal text-slate-500 text-base tracking-[0] leading-[19.2px]">
              Inscrivez-vous en tant que coach carrière
            </p>
          </div>

          <Card className="gap-6 p-6 bg-slate-50 rounded-2xl shadow-[0px_4px_20px_#0000000a] w-full">
            <CardContent className="p-0 flex flex-col gap-6">
              <div className="relative self-stretch font-['Inter',Helvetica] font-normal text-slate-800 text-lg text-center tracking-[0] leading-[21.6px]">
                Coach Carrière
              </div>

              <form onSubmit={handleSignup}>
                <div className="flex gap-4 mb-4">
                  <div className="gap-1.5 flex-1 flex flex-col items-start relative">
                    <Label className="font-['Inter',Helvetica] font-medium text-slate-500 text-sm tracking-[0] leading-[16.8px]">
                      Prénom
                    </Label>
                    <Input
                      type="text"
                      name="prenom"
                      placeholder="Marie"
                      value={formData.prenom}
                      onChange={handleInputChange}
                      className={`h-11 bg-white rounded-lg border border-solid ${
                        errors.prenom ? "border-red-300" : "border-slate-200"
                      } font-['Inter',Helvetica] font-normal text-slate-700 text-sm`}
                    />
                    {errors.prenom && (
                      <span className="text-red-600 text-xs mt-1">{errors.prenom}</span>
                    )}
                  </div>

                  <div className="gap-1.5 flex-1 flex flex-col items-start relative">
                    <Label className="font-['Inter',Helvetica] font-medium text-slate-500 text-sm tracking-[0] leading-[16.8px]">
                      Nom
                    </Label>
                    <Input
                      type="text"
                      name="nom"
                      placeholder="Martin"
                      value={formData.nom}
                      onChange={handleInputChange}
                      className={`h-11 bg-white rounded-lg border border-solid ${
                        errors.nom ? "border-red-300" : "border-slate-200"
                      } font-['Inter',Helvetica] font-normal text-slate-700 text-sm`}
                    />
                    {errors.nom && (
                      <span className="text-red-600 text-xs mt-1">{errors.nom}</span>
                    )}
                  </div>
                </div>

                <div className="gap-1.5 self-stretch w-full flex-[0_0_auto] flex flex-col items-start relative mb-4">
                  <Label className="font-['Inter',Helvetica] font-medium text-slate-500 text-sm tracking-[0] leading-[16.8px]">
                    Email professionnel
                  </Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="marie.martin@ecole.fr"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`h-11 bg-white rounded-lg border border-solid ${
                      errors.email ? "border-red-300" : "border-slate-200"
                    } font-['Inter',Helvetica] font-normal text-slate-700 text-sm`}
                  />
                  {errors.email && (
                    <span className="text-red-600 text-xs mt-1">{errors.email}</span>
                  )}
                </div>

                <div className="gap-1.5 self-stretch w-full flex-[0_0_auto] flex flex-col items-start relative mb-4">
                  <Label className="font-['Inter',Helvetica] font-medium text-slate-500 text-sm tracking-[0] leading-[16.8px]">
                    Établissement / Organisation <span className="text-slate-400">(optionnel)</span>
                  </Label>
                  <Input
                    type="text"
                    name="etablissement"
                    placeholder="École Polytechnique"
                    value={formData.etablissement}
                    onChange={handleInputChange}
                    className="h-11 bg-white rounded-lg border border-solid border-slate-200 font-['Inter',Helvetica] font-normal text-slate-700 text-sm"
                  />
                </div>

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
                      className={`h-11 bg-white rounded-lg border border-solid ${
                        errors.password ? "border-red-300" : "border-slate-200"
                      } font-['Inter',Helvetica] font-normal text-slate-700 text-sm pr-10`}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOffIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <span className="text-red-600 text-xs mt-1">{errors.password}</span>
                  )}
                </div>

                <div className="gap-1.5 self-stretch w-full flex-[0_0_auto] flex flex-col items-start relative mb-4">
                  <Label className="font-['Inter',Helvetica] font-medium text-slate-500 text-sm tracking-[0] leading-[16.8px]">
                    Confirmer le mot de passe
                  </Label>
                  <div className="relative w-full">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`h-11 bg-white rounded-lg border border-solid ${
                        errors.confirmPassword ? "border-red-300" : "border-slate-200"
                      } font-['Inter',Helvetica] font-normal text-slate-700 text-sm pr-10`}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? (
                        <EyeOffIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <span className="text-red-600 text-xs mt-1">{errors.confirmPassword}</span>
                  )}
                </div>

                {errors.general && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {errors.general}
                  </div>
                )}

                <Button
                  type="submit"
                  className="h-11 w-full bg-gradient-to-b from-violet-500 to-violet-600 rounded-lg font-['Inter',Helvetica] font-normal text-white text-sm disabled:opacity-70"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <LoaderIcon className="w-4 h-4 mr-2 animate-spin" />
                      Création du compte...
                    </>
                  ) : (
                    "Créer mon compte"
                  )}
                </Button>
              </form>

              <Button
                variant="outline"
                className="h-10 w-full bg-white rounded-lg border border-solid border-slate-200 font-['Inter',Helvetica] font-medium text-slate-800 text-sm flex items-center justify-center gap-2"
                onClick={() => console.log("SSO signup")}
              >
                <img
                  className="w-5 h-5"
                  alt="SSO"
                  src="/Frame (1).png"
                />
                SSO École
              </Button>
            </CardContent>
          </Card>

          <div className="flex flex-col items-center justify-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
            <div className="inline-flex items-center justify-center gap-1 relative flex-[0_0_auto]">
              <span className="font-['Inter',Helvetica] font-normal text-slate-500 text-sm tracking-[0] leading-[16.8px] whitespace-nowrap">
                Vous avez déjà un compte ?
              </span>
              <Link to="/login" className="font-['Inter',Helvetica] font-medium text-blue-500 text-sm tracking-[0] leading-[16.8px] whitespace-nowrap hover:text-blue-700 transition-colors">
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
