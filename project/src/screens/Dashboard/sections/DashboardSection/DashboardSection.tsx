import {
  BellIcon,
  CheckSquareIcon,
  ChevronRightIcon,
  FileTextIcon,
  MessageSquareIcon,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const DashboardSection = (): JSX.Element => {
  // Handle bell icon click (notifications)
  const handleNotificationsClick = () => {
    console.log("Opening notifications panel");
  };

  // Handle quick action click
  const handleQuickAction = (actionTitle: string) => {
    console.log(`Starting ${actionTitle} action`);

    if (actionTitle === "AI Interview") {
      window.location.href = "/ai-interview";
    } else if (actionTitle === "Generate CV") {
      window.location.href = "/generator";
    } else if (actionTitle === "Track Applications") {
      window.location.href = "/job-tracker";
    }
  };

  // Data for applications card
  const applicationStats = [
    { value: "12", label: "Total", color: "text-slate-700", bgColor: "bg-slate-50" },
    { value: "4", label: "Entretiens", color: "text-blue-600", bgColor: "bg-blue-50" },
    { value: "3", label: "Refusées", color: "text-rose-500", bgColor: "bg-rose-50" },
    { value: "2", label: "Offres", color: "text-violet-600", bgColor: "bg-violet-50" },
  ];

  // Data for quick actions
  const quickActions = [
    {
      icon: <MessageSquareIcon className="w-7 h-7 text-blue-600" />,
      title: "Entretien IA",
      description:
        "Discutez avec notre IA pour améliorer votre profil et générer de meilleurs documents",
      buttonColor: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
      iconBg: "bg-gradient-to-br from-blue-50 to-blue-100",
      cardBg: "bg-gradient-to-br from-white to-blue-50/30",
    },
    {
      icon: <FileTextIcon className="w-7 h-7 text-violet-600" />,
      title: "Générer un CV",
      description:
        "Créez un CV professionnel adapté à vos postes cibles",
      buttonColor: "bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700",
      iconBg: "bg-gradient-to-br from-violet-50 to-violet-100",
      cardBg: "bg-gradient-to-br from-white to-violet-50/30",
    },
    {
      icon: <CheckSquareIcon className="w-7 h-7 text-amber-600" />,
      title: "Suivi des Candidatures",
      description: "Organisez votre recherche d'emploi et suivez l'état de vos candidatures",
      buttonColor: "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700",
      iconBg: "bg-gradient-to-br from-amber-50 to-amber-100",
      cardBg: "bg-gradient-to-br from-white to-amber-50/30",
    },
  ];

  return (
    <div className="flex flex-col items-start gap-6 p-6 relative flex-1 self-stretch h-screen overflow-hidden bg-gradient-to-br from-slate-50 to-white">
      <header className="flex items-center justify-between relative self-stretch w-full flex-shrink-0 bg-transparent">
        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-slate-800 text-2xl leading-tight tracking-tight">
            Tableau de Bord
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Chaque action sur Kareer est un pas de plus vers votre carrière de rêve. Qu'allons-nous faire aujourd'hui ?
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="w-10 h-10 rounded-2xl border-0 bg-white/80 backdrop-blur-sm shadow-sm ring-1 ring-slate-200/60 hover:bg-white hover:ring-blue-500/20 transition-all duration-200"
            onClick={handleNotificationsClick}
          >
            <BellIcon className="w-4 h-4 text-slate-600" />
          </Button>
        </div>
      </header>

      <section className="flex flex-col items-start gap-4 relative self-stretch w-full flex-shrink-0">
        <div className="flex items-center gap-3">
          <h2 className="text-slate-800 text-lg font-semibold tracking-tight">
            Votre Progression
          </h2>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        </div>

        <div className="flex items-start gap-8 relative self-stretch w-full">
          <Card className="flex-1 rounded-3xl shadow-sm bg-gradient-to-br from-white via-white to-violet-50/40 border-0 ring-1 ring-slate-200/60 hover:shadow-xl hover:ring-violet-500/30 transition-all duration-300 overflow-hidden group">
            <CardContent className="flex flex-col h-full gap-4 p-6 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-100/40 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>

              <div className="flex items-center justify-between w-full relative z-10">
                <div className="flex flex-col gap-0.5">
                  <h3 className="font-semibold text-slate-800 text-base tracking-tight">
                    Aperçu des Candidatures
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">Suivez la progression de vos candidatures</p>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <FileTextIcon className="w-5 h-5 text-white" />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 w-full relative z-10">
                {applicationStats.map((stat, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl ${stat.bgColor} hover:scale-105 hover:shadow-md transition-all duration-300 cursor-pointer border border-transparent hover:border-${stat.color.split('-')[1]}-200 group/stat`}
                  >
                    <div className="flex flex-col items-center gap-1 w-full">
                      <span className={`font-bold text-2xl ${stat.color} group-hover/stat:scale-110 transition-transform duration-200`}>
                        {stat.value}
                      </span>
                      <span className="text-slate-600 text-[10px] font-semibold uppercase tracking-wider">
                        {stat.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/job-tracker" className="relative z-10">
                <Button
                  variant="outline"
                  className="w-full h-9 rounded-xl border-violet-200 text-violet-600 hover:bg-violet-50 hover:border-violet-300 transition-all duration-200 font-medium text-sm group/btn"
                >
                  <span>Voir Toutes les Candidatures</span>
                  <ChevronRightIcon className="w-3 h-3 ml-1 group-hover/btn:translate-x-1 transition-transform duration-200" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="flex flex-col items-start gap-4 relative self-stretch w-full flex-1 min-h-0">
        <div className="flex items-center gap-3">
          <h2 className="text-slate-800 text-lg font-semibold tracking-tight">
            Actions Rapides
          </h2>
          <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse"></div>
        </div>

        <div className="flex items-start gap-6 relative self-stretch w-full flex-1 min-h-0">
          {quickActions.map((action, index) => (
            <Card
              key={index}
              className={`flex-1 rounded-3xl shadow-sm border-0 ring-1 ring-slate-200/60 hover:shadow-lg hover:ring-blue-500/20 transition-all duration-300 group cursor-pointer ${action.cardBg}`}
              onClick={() => handleQuickAction(action.title)}
            >
              <CardContent className="flex flex-col h-full pt-5 pb-5 px-6">
                <div className="flex flex-col h-full space-y-3">
                  <div
                    className={`w-11 h-11 flex items-center justify-center rounded-2xl ${action.iconBg} group-hover:scale-110 transition-transform duration-200`}
                  >
                    {React.cloneElement(action.icon, { className: 'w-5 h-5 ' + action.icon.props.className.split(' ').slice(2).join(' ') })}
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="text-slate-800 text-base font-semibold tracking-tight">
                      {action.title}
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {action.description}
                    </p>
                  </div>
                  <Button
                    className={`w-full mt-auto ${action.buttonColor} rounded-2xl text-white font-medium h-10 text-sm shadow-sm hover:shadow-md transition-all duration-200`}
                  >
                    Commencer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

    </div>
  );
};