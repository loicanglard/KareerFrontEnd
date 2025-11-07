import {
  BellIcon,
  DownloadIcon,
  FilterIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";
import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";

// Data for education modules
const modules = [
  "International Business",
  "Markets and consumption",
  "Interpreting Management",
  "Foundation in digital enterprise",
  "Quantitative Methods",
  "Accounting",
  "Management First",
  "Global Economy",
];

// Data for projects
const projects = [
  {
    name: "Chess",
    period: "2015-2025",
  },
  {
    name: "Badminton",
    organization: "Spotify",
  },
];

export const DashboardSection = (): JSX.Element => {
  return (
    <div className="flex flex-col h-full items-start gap-8 p-8 relative flex-1 grow">
      <header className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto] bg-transparent">
        <h1 className="font-bold text-slate-800 text-2xl tracking-[0] leading-[28.8px] whitespace-nowrap">
          Coach Dashboard
        </h1>

        <div className="inline-flex items-center gap-3 relative">
          <div className="flex h-11 items-center gap-2 px-4 py-0 relative bg-white rounded-[22px] border border-solid border-slate-200">
            <SearchIcon className="w-5 h-5 text-slate-500" />
            <Input
              className="border-0 p-0 h-auto shadow-none font-normal text-slate-500 text-sm"
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

        <div className="inline-flex items-center gap-3 relative">
          <Button
            variant="outline"
            className="h-11 gap-2 px-4 py-0 rounded-[22px] border border-solid border-slate-200"
          >
            <FilterIcon className="w-5 h-5" />
            <span className="font-medium text-slate-800 text-sm">
              FilterIcon
            </span>
          </Button>
        </div>
      </header>

      <div className="flex items-start gap-4 relative flex-1 grow bg-slate-50 w-full">
        <div className="flex flex-col w-[254px] items-start gap-4 relative self-stretch">
          {/* Contacts Section */}
          <div className="flex items-center justify-between relative self-stretch w-full">
            <div className="inline-flex items-center gap-2 relative">
              <div className="font-normal text-slate-800 text-base leading-[19.2px]">
                Contacts
              </div>
            </div>
            <div className="opacity-0 font-normal text-slate-500 text-base leading-[19.2px] whitespace-nowrap">
              3
            </div>
          </div>

          <Card className="w-full shadow-[0px_2px_8px_#0000000a]">
            <CardContent className="p-4">
              <div className="text-center font-normal text-sm">
                <span className="text-slate-800">
                  Alex Smith
                  <br />
                  101055148
                  <br />
                  <br />
                </span>
                <span className="text-slate-400">☎</span>
                <span className="text-slate-800">: 07551 541758</span>
                <span className="text-slate-400">
                  <br />
                </span>
                <span className="text-slate-800">🎂: 05/06/2005</span>
                <span className="text-blue-500 text-xs">
                  <br />
                  🔗: https://www.linkedin.com/in/alexsmith2005
                  <br />
                  🗂: https:Alex.portfolio.
                </span>
                <span className="text-slate-400">co</span>
                <span className="text-slate-800">m</span>
              </div>
            </CardContent>
          </Card>

          {/* Projects Section */}
          <div className="flex items-center justify-between relative self-stretch w-full">
            <div className="inline-flex items-center gap-2 relative">
              <div className="font-normal text-slate-800 text-base leading-[19.2px]">
                Projects-outside experiences
              </div>
            </div>
            <div className="font-normal text-slate-500 text-base leading-[19.2px] whitespace-nowrap">
              2
            </div>
          </div>

          {projects.map((project, index) => (
            <Card key={index} className="w-full shadow-[0px_2px_8px_#0000000a]">
              <CardContent className="p-4">
                <div className="font-normal text-slate-800 text-sm leading-[16.8px]">
                  {project.name}
                </div>
                <div className="font-medium text-slate-500 text-xs leading-[14.4px] mt-3">
                  {project.period || project.organization}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Education Section */}
        <Card className="flex-1 border border-solid border-slate-200 rounded-xl relative">
          <div className="absolute top-3.5 right-6">
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              <XIcon className="h-4 w-4" />
            </Button>
          </div>

          <div className="w-full pt-16 px-6">
            <h2 className="font-normal text-slate-900 text-lg leading-[21.6px]">
              Education
            </h2>
          </div>

          <div className="flex flex-col w-full px-6 mt-6 gap-4">
            <div className="flex items-start gap-4 relative self-stretch w-full">
              <div className="flex flex-col items-start gap-2 relative flex-1 grow">
                <div className="self-stretch text-slate-500 font-medium text-sm leading-[16.8px]">
                  Name
                </div>
                <div className="self-stretch font-medium text-slate-900 text-base leading-[19.2px]">
                  ESSEC Business School
                </div>
              </div>
              <div className="flex flex-col items-start gap-2 relative flex-1 grow">
                <div className="self-stretch font-medium text-slate-500 text-sm leading-[16.8px]">
                  Degree
                </div>
                <div className="self-stretch font-medium text-slate-900 text-base leading-[19.2px]">
                  BSc Management
                </div>
              </div>
              <div className="flex flex-col items-start gap-2 relative flex-1 grow">
                <div className="self-stretch text-slate-500 font-medium text-sm leading-[16.8px]">
                  Start
                </div>
                <div className="self-stretch font-medium text-slate-900 text-base leading-[19.2px]">
                  Sep 2023
                </div>
              </div>
              <div className="flex flex-col items-start gap-2 relative flex-1 grow">
                <div className="self-stretch font-medium text-slate-500 text-sm leading-[16.8px]">
                  End
                </div>
                <div className="self-stretch font-medium text-slate-900 text-base leading-[19.2px]">
                  Jun 2026
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full px-6 mt-6 gap-4">
            <div className="flex items-center justify-between relative self-stretch w-full">
              <div className="font-normal text-slate-900 text-base leading-[19.2px]">
                Modules
              </div>
              <Select defaultValue="year1">
                <SelectTrigger className="h-8 px-3 py-0 bg-slate-50 rounded-md border border-solid border-slate-300 w-auto">
                  <SelectValue placeholder="Year 1">Year 1</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="year1">Year 1</SelectItem>
                  <SelectItem value="year2">Year 2</SelectItem>
                  <SelectItem value="year3">Year 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-wrap items-start gap-[12px] relative self-stretch w-full">
              {modules.map((module, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="h-8 px-3 py-0 bg-white rounded-2xl border border-solid border-slate-300 font-normal text-slate-700"
                >
                  {module}
                </Badge>
              ))}
            </div>
          </div>

          <div className="w-[577px] h-[355px] mt-6 mx-6 mb-6 bg-slate-50 rounded-lg" />
        </Card>
      </div>
    </div>
  );
};
