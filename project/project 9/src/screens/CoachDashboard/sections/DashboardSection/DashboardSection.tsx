import {
  BellIcon,
  DownloadIcon,
  FilterIcon,
  MoreVerticalIcon,
  SearchIcon,
} from "lucide-react";
import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";

// Data for the dashboard
const contactData = {
  name: "Alex Smith",
  id: "10105518",
  phone: "07551 541758",
  birthdate: "05/06/2005",
  linkedin: "https://www.linkedin.com/in/alexsmith2005",
  portfolio: "https://Alex.portfolio.com",
};

const projectsData = [
  {
    name: "Chess",
    organization: "2015-2025",
  },
  {
    name: "Badminton",
    organization: "Spotify",
  },
];

const educationData = [
  {
    institution: "ESSEC Business School",
    degree: "Bachelor Bsc Management",
    period: "Sep 2023-Jun 2026",
  },
  {
    institution: "Saint Nicolas Paris",
    degree: "Bac Général",
    period: "Sep 2020-Jun 2023",
  },
];

const extraCoursesData = [
  {
    course: "Data Scientist",
    provider: "AWS",
    date: "09/08/25",
  },
  {
    course: "UX Designer",
    provider: "LinkedIn",
    date: "10/08/25",
  },
];

const workExperienceData = [
  {
    position: "Software Engineer",
    company: "Facebook",
    status: "Interview on May 15",
  },
  {
    position: "Product Manager",
    company: "Slack",
    status: "Interview on May 18",
  },
  {
    position: "Frontend Developer",
    company: "Twitter",
    status: "Interview on May 20",
  },
];

export const DashboardSection = (): JSX.Element => {
  return (
    <div className="flex flex-col h-full items-start gap-8 p-8 relative flex-1 grow">
      <header className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto] bg-transparent">
        <h1 className="font-bold text-slate-800 text-2xl tracking-[0] leading-[28.8px]">
          Coach Dashboard
        </h1>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-0 bg-white rounded-[22px] border border-solid border-slate-200 h-11">
            <SearchIcon className="w-5 h-5 text-slate-500" />
            <Input
              className="border-0 h-full p-0 text-sm text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0"
              defaultValue="10105518"
            />
          </div>

          <Button
            variant="outline"
            size="icon"
            className="w-11 h-11 rounded-[22px] border border-solid border-slate-200"
          >
            <BellIcon className="w-5 h-5" />
          </Button>

          <Button
            variant="outline"
            className="h-11 gap-2 px-4 py-0 rounded-[22px] border border-solid border-slate-200"
          >
            <DownloadIcon className="w-5 h-5" />
            <span className="font-medium text-slate-800 text-sm">Export</span>
          </Button>
        </div>

        <Button
          variant="outline"
          className="h-11 gap-2 px-4 py-0 rounded-[22px] border border-solid border-slate-200"
        >
          <FilterIcon className="w-5 h-5" />
          <span className="font-medium text-slate-800 text-sm">FilterIcon</span>
        </Button>
      </header>

      <div className="flex items-start gap-4 relative flex-1 grow bg-slate-50 w-full">
        {/* Contacts and Projects Column */}
        <div className="flex flex-col items-start gap-4 relative self-stretch flex-1">
          <div className="flex items-center justify-between relative self-stretch w-full">
            <div className="flex items-center gap-2">
              <h2 className="font-normal text-slate-800 text-base">Contacts</h2>
            </div>
          </div>

          <Card className="w-full shadow-[0px_2px_8px_#0000000a]">
            <CardContent className="p-4 text-center text-sm">
              <div className="font-normal text-slate-800">
                {contactData.name}
                <br />
                {contactData.id}
                <br />
                <br />
                ☎: {contactData.phone}
                <br />
                🎂: {contactData.birthdate}
                <br />
                <span className="text-blue-500 text-xs">
                  🔗: {contactData.linkedin}
                  <br />
                  🗂: {contactData.portfolio}
                </span>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between relative self-stretch w-full">
            <div className="flex items-center gap-2">
              <h2 className="font-normal text-slate-800 text-base">
                Projects-outside experiences
              </h2>
            </div>
            <Badge
              variant="outline"
              className="font-normal text-slate-500 text-base bg-transparent"
            >
              {projectsData.length}
            </Badge>
          </div>

          {projectsData.map((project, index) => (
            <Card key={index} className="w-full shadow-[0px_2px_8px_#0000000a]">
              <CardContent className="p-4">
                <h3 className="font-normal text-slate-800 text-sm">
                  {project.name}
                </h3>
                <p className="font-medium text-slate-500 text-xs mt-3">
                  {project.organization}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Education and Extra Courses Column */}
        <div className="flex flex-col items-start gap-4 relative self-stretch flex-1">
          <div className="flex items-center justify-between relative self-stretch w-full">
            <div className="flex items-center gap-2">
              <h2 className="font-normal text-slate-800 text-base">
                Education
              </h2>
            </div>
            <Badge
              variant="outline"
              className="font-normal text-slate-500 text-base bg-transparent"
            >
              {educationData.length}
            </Badge>
          </div>

          {educationData.map((education, index) => (
            <Card key={index} className="w-full shadow-[0px_2px_8px_#0000000a]">
              <CardContent className="p-4">
                <h3
                  className={
                    index === 0
                      ? "font-medium text-slate-900 text-base"
                      : "font-normal text-slate-800 text-sm"
                  }
                >
                  {education.institution}
                </h3>
                <p className="font-medium text-slate-500 text-xs mt-3">
                  {education.degree}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-normal text-slate-500 text-xs">
                    {education.period}
                  </span>
                  {index === 1 && <MoreVerticalIcon className="w-4 h-4" />}
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex items-center justify-between relative self-stretch w-full">
            <div className="flex items-center gap-2">
              <h2 className="font-normal text-slate-800 text-base">
                Extra courses
              </h2>
            </div>
            <Badge
              variant="outline"
              className="font-normal text-slate-500 text-base bg-transparent"
            >
              {extraCoursesData.length}
            </Badge>
          </div>

          {extraCoursesData.map((course, index) => (
            <Card key={index} className="w-full shadow-[0px_2px_8px_#0000000a]">
              <CardContent className="p-4">
                <h3 className="font-normal text-slate-800 text-sm">
                  {course.course}
                </h3>
                <p className="font-medium text-slate-500 text-xs mt-3">
                  {course.provider}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-normal text-slate-500 text-xs">
                    {course.date}
                  </span>
                  {index === 1 && <MoreVerticalIcon className="w-4 h-4" />}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Work Experience Column */}
        <div className="flex flex-col items-start gap-4 relative self-stretch flex-1">
          <div className="flex items-center justify-between relative self-stretch w-full">
            <div className="flex items-center gap-2">
              <h2 className="font-normal text-slate-800 text-base">
                Work Experience
              </h2>
            </div>
            <Badge
              variant="outline"
              className="font-normal text-slate-500 text-base bg-transparent"
            >
              {workExperienceData.length}
            </Badge>
          </div>

          {workExperienceData.map((work, index) => (
            <Card key={index} className="w-full shadow-[0px_2px_8px_#0000000a]">
              <CardContent className="p-4">
                <h3 className="font-normal text-slate-800 text-sm">
                  {work.position}
                </h3>
                <p className="font-medium text-slate-500 text-xs mt-3">
                  {work.company}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-normal text-slate-500 text-xs">
                    {work.status}
                  </span>
                  <MoreVerticalIcon className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
