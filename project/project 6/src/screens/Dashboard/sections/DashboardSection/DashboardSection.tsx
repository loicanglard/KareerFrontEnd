import {
  BellIcon,
  CheckSquareIcon,
  ChevronRightIcon,
  FileTextIcon,
  MessageSquareIcon,
  SearchIcon,
  UserIcon,
} from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Progress } from "../../../../components/ui/progress";

export const DashboardSection = (): JSX.Element => {
  // Data for applications card
  const applicationStats = [
    { value: "12", label: "Total", color: "text-slate-800" },
    { value: "4", label: "Interviews", color: "text-blue-500" },
    { value: "3", label: "Rejected", color: "text-red-500" },
    { value: "2", label: "Offers", color: "text-emerald-500" },
  ];

  // Data for quick actions
  const quickActions = [
    {
      icon: <MessageSquareIcon className="w-6 h-6 text-blue-500" />,
      title: "AI Interview",
      description:
        "Chat with our AI to improve your profile and generate better documents",
      buttonColor: "bg-blue-500",
      iconBg: "bg-blue-50",
    },
    {
      icon: <FileTextIcon className="w-6 h-6 text-violet-600" />,
      title: "Generate CV",
      description:
        "Create a professional CV tailored to your target job positions",
      buttonColor: "bg-violet-600",
      iconBg: "bg-violet-50",
    },
    {
      icon: <CheckSquareIcon className="w-6 h-6 text-emerald-500" />,
      title: "Track Applications",
      description: "Organize your job search and monitor application status",
      buttonColor: "bg-[#18bd65b5]",
      iconBg: "bg-emerald-50",
    },
  ];

  // Data for recent activities
  const recentActivities = [
    {
      icon: <FileTextIcon className="w-5 h-5 text-blue-500" />,
      title: "Generated CV for Software Engineer position",
      time: "Today at 10:30 AM",
      iconBg: "bg-[#3b82f610]",
    },
    {
      icon: <MessageSquareIcon className="w-5 h-5 text-violet-600" />,
      title: "Completed AI Interview session",
      time: "Yesterday at 3:45 PM",
      iconBg: "bg-[#8b5cf610]",
    },
    {
      icon: <CheckSquareIcon className="w-5 h-5 text-emerald-500" />,
      title: "Added new application to Job Tracker",
      time: "2 days ago at 11:20 AM",
      iconBg: "bg-[#10b98110]",
    },
  ];

  return (
    <div className="flex flex-col items-start gap-8 p-8 relative flex-1 self-stretch grow">
      <header className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto] bg-transparent">
        <h1 className="font-bold text-slate-800 text-2xl leading-[28.8px]">
          Dashboard
        </h1>

        <div className="flex items-center gap-3">
          <div className="relative flex items-center">
            <SearchIcon className="absolute left-4 w-5 h-5 text-slate-500" />
            <Input
              className="w-60 h-11 pl-11 pr-4 bg-white rounded-[22px] border border-slate-200 text-sm"
              placeholder="SearchIcon..."
            />
          </div>

          <Button
            variant="outline"
            size="icon"
            className="w-11 h-11 rounded-[22px] border border-slate-200"
          >
            <BellIcon className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <section className="flex flex-col items-start gap-4 relative self-stretch w-full">
        <h2 className="text-slate-800 text-lg leading-[21.6px]">
          Your Progress
        </h2>

        <div className="flex items-start gap-6 relative self-stretch w-full">
          <Card className="flex-1 h-[140px] rounded-2xl shadow-[0px_4px_20px_#0000000a]">
            <CardContent className="flex flex-col h-full gap-4 p-6">
              <div className="flex items-center justify-between w-full">
                <h3 className="font-medium text-slate-800 text-base leading-[19.2px]">
                  Profile Completion
                </h3>
                <UserIcon className="w-6 h-6" />
              </div>

              <Progress value={75} className="h-2 bg-slate-200" />

              <div className="flex items-center justify-between w-full">
                <span className="font-bold text-slate-800 text-2xl leading-[28.8px]">
                  75%
                </span>
                <span className="text-slate-500 text-sm leading-[16.8px]">
                  Complete your profile
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="flex-1 h-[140px] rounded-2xl shadow-[0px_4px_20px_#0000000a]">
            <CardContent className="flex flex-col h-full gap-4 p-6">
              <div className="flex items-center justify-between w-full">
                <h3 className="font-medium text-slate-800 text-base leading-[19.2px]">
                  Applications
                </h3>
                <FileTextIcon className="w-6 h-6" />
              </div>

              <div className="flex items-center justify-between w-full">
                {applicationStats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-start justify-center"
                  >
                    <span
                      className={`font-bold text-2xl leading-[28.8px] ${stat.color}`}
                    >
                      {stat.value}
                    </span>
                    <span className="text-slate-500 text-sm leading-[16.8px]">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="flex flex-col items-start gap-4 relative self-stretch w-full">
        <h2 className="text-slate-800 text-lg leading-[21.6px]">
          Quick Actions
        </h2>

        <div className="flex items-start gap-6 relative self-stretch w-full">
          {quickActions.map((action, index) => (
            <Card
              key={index}
              className="flex-1 rounded-2xl shadow-[0px_4px_20px_#0000000a]"
            >
              <CardContent className="flex flex-col h-[180px] gap-[5px] pt-6 pb-0 px-6">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full ${action.iconBg}`}
                >
                  {action.icon}
                </div>
                <h3 className="text-slate-800 text-lg leading-[21.6px]">
                  {action.title}
                </h3>
                <p className="text-slate-500 text-sm leading-[16.8px]">
                  {action.description}
                </p>
                <Button
                  className={`w-[235px] mt-auto ${action.buttonColor} rounded-[20px] text-white`}
                >
                  Start
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-start gap-4 relative self-stretch w-full">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-slate-800 text-lg leading-[21.6px]">
            Recent Activity
          </h2>
          <Button
            variant="link"
            className="font-medium text-blue-500 text-sm p-0"
          >
            View All
          </Button>
        </div>

        <Card className="w-full rounded-2xl shadow-[0px_4px_20px_#0000000a]">
          <CardContent className="flex flex-col gap-4 p-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 w-full">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-[20px] ${activity.iconBg}`}
                >
                  {activity.icon}
                </div>
                <div className="flex flex-col items-start justify-center flex-1">
                  <h4 className="font-medium text-slate-800 text-sm leading-[16.8px]">
                    {activity.title}
                  </h4>
                  <span className="text-slate-500 text-xs leading-[14.4px]">
                    {activity.time}
                  </span>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-slate-400" />
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
};
