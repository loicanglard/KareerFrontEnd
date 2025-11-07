import React, { useState } from "react";
import { Avatar, AvatarFallback } from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Separator } from "../../../../components/ui/separator";
import { BellIcon, ChevronRightIcon, GlobeIcon, KeyIcon, LogOutIcon, MailIcon, PaintbrushIcon as PaintBrushIcon, ShieldIcon, UserIcon } from "lucide-react";

export const SettingsSection = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("account");
  const [formData, setFormData] = useState({
    fullName: "Sarah Johnson",
    displayName: "Sarah",
    email: "sarah.johnson@genkreer.com",
    bio: "Career coach with 5 years of experience helping students find their dream jobs. Specialized in tech and business placements.",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    browser: false,
    student_updates: true,
    weekly_summary: true,
    analytics_report: false,
  });

  const [activeTheme, setActiveTheme] = useState("light");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationToggle = (setting: string) => {
    setNotificationSettings(prev => ({ 
      ...prev, 
      [setting]: !prev[setting as keyof typeof prev] 
    }));
    console.log(`Toggled ${setting} notification setting`);
  };

  const handleThemeChange = (theme: string) => {
    console.log(`Changed theme to: ${theme}`);
    setActiveTheme(theme);
    // In a real app, this would update the application theme
  };

  const handleSaveChanges = () => {
    console.log("Saving account changes:", formData);
    alert("Account information updated successfully!");
  };

  const handleSavePreferences = () => {
    console.log("Saving notification preferences:", notificationSettings);
    alert("Notification preferences saved successfully!");
  };

  const handleUpdatePassword = () => {
    console.log("Password update requested");
    alert("Password updated successfully!");
  };

  const handleEnable2FA = () => {
    console.log("Enabling 2FA");
    alert("Two-factor authentication setup initiated. Please check your email for further instructions.");
  };

  const handleSignOutAll = () => {
    if (window.confirm("Are you sure you want to sign out from all devices?")) {
      console.log("Signing out from all devices");
      alert("You have been signed out from all devices.");
    }
  };

  const handleConnectIntegration = (integration: string) => {
    console.log(`Connecting to ${integration}`);
    alert(`${integration} integration initiated. You will be redirected to authorize access.`);
  };

  const handleDisconnectIntegration = (integration: string) => {
    if (window.confirm(`Are you sure you want to disconnect ${integration}?`)) {
      console.log(`Disconnecting from ${integration}`);
      alert(`${integration} has been disconnected.`);
    }
  };

  const handleExportData = (dataType: string) => {
    console.log(`Exporting ${dataType} data`);
    alert(`Your ${dataType} data export has started. You will receive a download link by email.`);
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      console.log("Account deletion requested");
      alert("Account deletion process initiated. You will receive confirmation by email.");
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      console.log("User logged out");
      window.location.href = "/login";
    }
  };

  const handleAvatarChange = () => {
    console.log("Avatar change requested");
    alert("Avatar upload feature initiated. Please select an image file.");
    // In a real app, this would open a file picker
  };

  // Settings navigation items
  const settingsTabs = [
    { id: "account", label: "Compte", icon: <UserIcon className="w-5 h-5" /> },
    { id: "security", label: "Sécurité", icon: <KeyIcon className="w-5 h-5" /> },
    { id: "notifications", label: "Notifications", icon: <BellIcon className="w-5 h-5" /> },
    { id: "appearance", label: "Apparence", icon: <PaintBrushIcon className="w-5 h-5" /> },
    { id: "integrations", label: "Intégrations", icon: <GlobeIcon className="w-5 h-5" /> },
    { id: "privacy", label: "Confidentialité", icon: <ShieldIcon className="w-5 h-5" /> },
  ];

  // Notification settings
  const notificationSettingsList = [
    {
      id: "email",
      title: "Notifications par e-mail",
      description: "Recevez des e-mails concernant l'activité des étudiants, les mises à jour et les alertes système",
      enabled: notificationSettings.email,
    },
    {
      id: "browser",
      title: "Notifications du navigateur",
      description: "Recevez des notifications dans votre navigateur lorsque les étudiants terminent des tâches",
      enabled: notificationSettings.browser,
    },
    {
      id: "student_updates",
      title: "Mises à jour des étudiants",
      description: "Soyez notifié lorsque les étudiants mettent à jour leur profil ou génèrent de nouveaux documents",
      enabled: notificationSettings.student_updates,
    },
    {
      id: "weekly_summary",
      title: "Résumé hebdomadaire",
      description: "Recevez un résumé hebdomadaire de l'activité et des progrès des étudiants",
      enabled: notificationSettings.weekly_summary,
    },
    {
      id: "analytics_report",
      title: "Rapports d'analyse",
      description: "Recevez des rapports d'analyse mensuels sur les progrès et les métriques des étudiants",
      enabled: notificationSettings.analytics_report,
    },
  ];

  // Integrations
  const integrations = [
    {
      name: "LinkedIn",
      status: "Connecté",
      lastSync: "15 mai 2025",
      icon: "/linkedin-icon.png",
    },
    {
      name: "Google Calendar",
      status: "Connecté",
      lastSync: "20 mai 2025",
      icon: "/google-calendar-icon.png",
    },
    {
      name: "Microsoft Teams",
      status: "Non connecté",
      icon: "/microsoft-teams-icon.png",
    },
    {
      name: "Slack",
      status: "Non connecté",
      icon: "/slack-icon.png",
    },
  ];

  // Theme options
  const themeOptions = [
    {
      name: "Clair",
      value: "light",
      description: "Apparence claire et lumineuse",
      selected: activeTheme === "light",
    },
    {
      name: "Sombre",
      value: "dark",
      description: "Plus doux pour les yeux en faible lumière",
      selected: activeTheme === "dark",
    },
    {
      name: "Système",
      value: "system",
      description: "Suivre les préférences de votre système",
      selected: activeTheme === "system",
    },
  ];

  return (
    <div className="flex flex-1 p-8">
      <div className="flex flex-col w-full max-w-6xl mx-auto gap-8">
        <header>
          <h1 className="text-2xl font-bold text-slate-800">Paramètres</h1>
          <p className="text-slate-500 mt-1">
            Gérez vos paramètres de compte et vos préférences
          </p>
        </header>

        <div className="flex gap-8">
          {/* Settings Navigation */}
          <nav className="w-64 flex-shrink-0">
            <Card className="w-full">
              <CardContent className="p-4">
                <div className="flex flex-col gap-1">
                  {settingsTabs.map((tab) => (
                    <Button
                      key={tab.id}
                      variant="ghost"
                      className={`justify-start h-11 px-3 rounded-lg ${
                        activeTab === tab.id
                          ? "bg-[#3b82f610] text-blue-500"
                          : "text-slate-800"
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.icon}
                      <span className="ml-3 font-medium">{tab.label}</span>
                    </Button>
                  ))}

                  <Separator className="my-2" />

                  <Button
                    variant="ghost"
                    className="justify-start text-red-500 h-11 px-3 rounded-lg"
                    onClick={handleLogout}
                  >
                    <LogOutIcon className="w-5 h-5" />
                    <span className="ml-3 font-medium">Se déconnecter</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </nav>

          {/* Settings Content */}
          <div className="flex-1">
            <Card className="w-full">
              <CardContent className="p-6">
                {activeTab === "account" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-800 mb-6">
                        Paramètres du compte
                      </h2>
                      <div className="flex items-center gap-4 mb-8">
                        <Avatar className="w-24 h-24 bg-gradient-to-br from-[rgba(139,92,246,1)] to-[rgba(124,58,237,1)]">
                          <AvatarFallback className="text-white text-2xl">SJ</AvatarFallback>
                        </Avatar>
                        <div>
                          <Button 
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={handleAvatarChange}
                          >
                            Changer l'avatar
                          </Button>
                          <p className="text-sm text-slate-500 mt-1">
                            JPG, GIF ou PNG. Taille max 2 Mo.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="fullName"
                          className="text-sm font-medium text-slate-700"
                        >
                          Nom complet
                        </label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="displayName"
                          className="text-sm font-medium text-slate-700"
                        >
                          Nom d'affichage
                        </label>
                        <Input
                          id="displayName"
                          name="displayName"
                          value={formData.displayName}
                          onChange={handleInputChange}
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium text-slate-700"
                        >
                          E-mail
                        </label>
                        <Input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="role"
                          className="text-sm font-medium text-slate-700"
                        >
                          Rôle
                        </label>
                        <Input
                          id="role"
                          defaultValue="Coach Carrière"
                          className="h-12"
                          disabled
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="bio"
                        className="text-sm font-medium text-slate-700"
                      >
                        Biographie
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        className="w-full h-24 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="pt-4">
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={handleSaveChanges}
                      >
                        Enregistrer les modifications
                      </Button>
                    </div>
                  </div>
                )}

                {activeTab === "notifications" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-800 mb-1">
                        Préférences de notification
                      </h2>
                      <p className="text-slate-500 mb-6">
                        Gérez la manière dont vous recevez les notifications de Kareer Coach
                      </p>
                    </div>

                    <div className="space-y-6">
                      {notificationSettingsList.map((setting) => (
                        <div
                          key={setting.id}
                          className="flex items-center justify-between"
                        >
                          <div className="space-y-1">
                            <h3 className="font-medium text-slate-800">
                              {setting.title}
                            </h3>
                            <p className="text-sm text-slate-500">
                              {setting.description}
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={setting.enabled}
                              onChange={() => handleNotificationToggle(setting.id)}
                            />
                            <div className="w-11 h-6 bg-slate-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4">
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={handleSavePreferences}
                      >
                        Enregistrer les préférences
                      </Button>
                    </div>
                  </div>
                )}

                {activeTab === "security" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-800 mb-1">
                        Paramètres de sécurité
                      </h2>
                      <p className="text-slate-500 mb-6">
                        Gérez votre mot de passe et la sécurité de votre compte
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="font-medium text-slate-800">Changer le mot de passe</h3>
                        <div className="grid grid-cols-1 gap-4">
                          <div className="space-y-1">
                            <label
                              htmlFor="currentPassword"
                              className="text-sm font-medium text-slate-700"
                            >
                              Mot de passe actuel
                            </label>
                            <Input
                              id="currentPassword"
                              type="password"
                              className="h-12"
                            />
                          </div>
                          <div className="space-y-1">
                            <label
                              htmlFor="newPassword"
                              className="text-sm font-medium text-slate-700"
                            >
                              Nouveau mot de passe
                            </label>
                            <Input
                              id="newPassword"
                              type="password"
                              className="h-12"
                            />
                          </div>
                          <div className="space-y-1">
                            <label
                              htmlFor="confirmPassword"
                              className="text-sm font-medium text-slate-700"
                            >
                              Confirmer le nouveau mot de passe
                            </label>
                            <Input
                              id="confirmPassword"
                              type="password"
                              className="h-12"
                            />
                          </div>
                        </div>
                        <Button 
                          className="mt-4 bg-blue-600 hover:bg-blue-700"
                          onClick={handleUpdatePassword}
                        >
                          Mettre à jour le mot de passe
                        </Button>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <h3 className="font-medium text-slate-800">Authentification à deux facteurs</h3>
                        <p className="text-sm text-slate-500">
                          Ajoutez une couche de sécurité supplémentaire à votre compte en activant l'authentification à deux facteurs.
                        </p>
                        <Button 
                          variant="outline" 
                          className="mt-2"
                          onClick={handleEnable2FA}
                        >
                          Activer 2FA
                        </Button>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <h3 className="font-medium text-slate-800">Sessions de connexion</h3>
                        <p className="text-sm text-slate-500">
                          Gérez vos sessions actives et déconnectez-vous des autres appareils.
                        </p>
                        <Button 
                          variant="outline" 
                          className="mt-2 text-red-500 border-red-300 hover:bg-red-50"
                          onClick={handleSignOutAll}
                        >
                          Se déconnecter de tous les appareils
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "appearance" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-800 mb-1">
                        Paramètres d'apparence
                      </h2>
                      <p className="text-slate-500 mb-6">
                        Personnalisez l'apparence de Kareer Coach
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-slate-800 mb-4">Thème</h3>
                        <div className="grid grid-cols-3 gap-4">
                          {themeOptions.map((theme) => (
                            <div
                              key={theme.value}
                              className={`border rounded-lg p-4 cursor-pointer ${
                                theme.selected
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-slate-200 hover:border-blue-300"
                              }`}
                              onClick={() => handleThemeChange(theme.value)}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium text-slate-800">
                                  {theme.name}
                                </span>
                                {theme.selected && (
                                  <div className="h-4 w-4 bg-blue-500 rounded-full"></div>
                                )}
                              </div>
                              <p className="text-sm text-slate-500">
                                {theme.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium text-slate-800 mb-2">Disposition du tableau de bord</h3>
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="compact"
                              name="layout"
                              defaultChecked
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              onChange={() => console.log("Changed to compact view")}
                            />
                            <label
                              htmlFor="compact"
                              className="ml-2 block text-slate-800"
                            >
                              Vue compacte
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="comfortable"
                              name="layout"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              onChange={() => console.log("Changed to comfortable view")}
                            />
                            <label
                              htmlFor="comfortable"
                              className="ml-2 block text-slate-800"
                            >
                              Vue confortable
                            </label>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium text-slate-800 mb-2">Densité d'affichage</h3>
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="density-compact"
                              name="density"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              onChange={() => console.log("Changed to compact density")}
                            />
                            <label
                              htmlFor="density-compact"
                              className="ml-2 block text-slate-800"
                            >
                              Compacte
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="density-default"
                              name="density"
                              defaultChecked
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              onChange={() => console.log("Changed to default density")}
                            />
                            <label
                              htmlFor="density-default"
                              className="ml-2 block text-slate-800"
                            >
                              Par défaut
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="density-comfortable"
                              name="density"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              onChange={() => console.log("Changed to comfortable density")}
                            />
                            <label
                              htmlFor="density-comfortable"
                              className="ml-2 block text-slate-800"
                            >
                              Confortable
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button 
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={handleSavePreferences}
                        >
                          Enregistrer les préférences
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "integrations" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-800 mb-1">
                        Intégrations
                      </h2>
                      <p className="text-slate-500 mb-6">
                        Connectez votre compte Kareer Coach avec d'autres services
                      </p>
                    </div>

                    <div className="space-y-4">
                      {integrations.map((integration, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between border border-slate-200 rounded-lg p-4"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center">
                              <img
                                src={integration.icon}
                                alt={integration.name}
                                className="h-6 w-6"
                                onError={(e) => {
                                  e.currentTarget.src = "https://placehold.co/24x24/gray/white?text=I";
                                }}
                              />
                            </div>
                            <div>
                              <h3 className="font-medium text-slate-800">
                                {integration.name}
                              </h3>
                              <p className="text-sm text-slate-500">
                                {integration.status}{" "}
                                {integration.lastSync && `• Last sync: ${integration.lastSync}`}
                              </p>
                            </div>
                          </div>

                          <Button
                            variant={
                              integration.status === "Connected"
                                ? "outline"
                                : "default"
                            }
                            className={
                              integration.status === "Connected"
                                ? "text-red-500 border-red-300 hover:bg-red-50"
                                : "bg-blue-600 hover:bg-blue-700"
                            }
                            onClick={() => 
                              integration.status === "Connected" 
                                ? handleDisconnectIntegration(integration.name) 
                                : handleConnectIntegration(integration.name)
                            }
                          >
                            {integration.status === "Connected"
                              ? "Déconnecter"
                              : "Connecter"}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "privacy" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-800 mb-1">
                        Paramètres de confidentialité
                      </h2>
                      <p className="text-slate-500 mb-6">
                        Gérez vos données et préférences de confidentialité
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h3 className="font-medium text-slate-800">
                            Visibilité du profil
                          </h3>
                          <p className="text-sm text-slate-500">
                            Contrôlez qui peut voir les informations de votre profil
                          </p>
                        </div>
                        <Button 
                          variant="outline" 
                          className="flex items-center gap-2"
                          onClick={() => console.log("Opening profile visibility settings")}
                        >
                          Public <ChevronRightIcon className="h-4 w-4" />
                        </Button>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h3 className="font-medium text-slate-800">
                            Utilisation des données
                          </h3>
                          <p className="text-sm text-slate-500">
                            Gérez la manière dont vos données sont utilisées pour améliorer nos services
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            defaultChecked
                            onChange={() => console.log("Toggled data usage consent")}
                          />
                          <div className="w-11 h-6 bg-slate-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium text-slate-800 mb-3">
                          Vos données
                        </h3>
                        <div className="space-y-4">
                          <Button
                            variant="outline"
                            className="w-full justify-between"
                            onClick={() => handleExportData("email")}
                          >
                            <div className="flex items-center gap-2">
                              <MailIcon className="h-5 w-5" />
                              <span>Exporter l'historique des e-mails</span>
                            </div>
                            <ChevronRightIcon className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="outline"
                            className="w-full justify-between"
                            onClick={() => handleExportData("profile")}
                          >
                            <div className="flex items-center gap-2">
                              <UserIcon className="h-5 w-5" />
                              <span>Exporter les données du profil</span>
                            </div>
                            <ChevronRightIcon className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="outline"
                            className="w-full justify-between text-red-500 border-red-300 hover:bg-red-50"
                            onClick={handleDeleteAccount}
                          >
                            <div className="flex items-center gap-2">
                              <ShieldIcon className="h-5 w-5" />
                              <span>Supprimer le compte</span>
                            </div>
                            <ChevronRightIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};