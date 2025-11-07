import {
  BellIcon,
  DownloadIcon,
  FilterIcon,
  SearchIcon,
  TrendingUpIcon,
} from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback } from "../../../../components/ui/avatar";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";

// Data for stats cards
const statsCards = [
  {
    title: "Total Students",
    value: "9978",
    trend: "+12 this month",
    trendIcon: <TrendingUpIcon className="w-4 h-4" />,
    trendColor: "text-emerald-500",
  },
  {
    title: "Active Users",
    value: "7587",
    trend: "76% of total",
    trendColor: "text-slate-500",
  },
  {
    title: "CVs Generated",
    value: "14654",
    trend: "+28% vs last month",
    trendIcon: <TrendingUpIcon className="w-4 h-4" />,
    trendColor: "text-emerald-500",
  },
];

// Data for student table
const students = [
  {
    id: 1,
    name: "John Smith",
    initials: "JS",
    program: "Computer Science",
    status: { label: "Complete", color: "emerald" },
    cvsGenerated: 5,
    applications: 12,
    lastActive: "Today",
    avatarGradient: "bg-gradient-to-br from-blue-500 to-blue-700",
  },
  {
    id: 2,
    name: "Emma Johnson",
    initials: "EJ",
    program: "Business",
    status: { label: "In Progress", color: "blue" },
    cvsGenerated: 3,
    applications: 8,
    lastActive: "Yesterday",
    avatarGradient: "bg-gradient-to-br from-violet-500 to-violet-700",
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    initials: "MR",
    program: "Engineering",
    status: { label: "Complete", color: "emerald" },
    cvsGenerated: 7,
    applications: 15,
    lastActive: "2 days ago",
    avatarGradient: "bg-gradient-to-br from-red-500 to-red-700",
  },
  {
    id: 4,
    name: "Sophia Lee",
    initials: "SL",
    program: "Marketing",
    status: { label: "Just Started", color: "amber" },
    cvsGenerated: 1,
    applications: 2,
    lastActive: "3 days ago",
    avatarGradient: "bg-gradient-to-br from-amber-500 to-amber-700",
  },
  {
    id: 5,
    name: "David Wilson",
    initials: "DW",
    program: "Finance",
    status: { label: "In Progress", color: "blue" },
    cvsGenerated: 4,
    applications: 6,
    lastActive: "5 days ago",
    avatarGradient: "bg-gradient-to-br from-emerald-500 to-emerald-700",
  },
];

// Status badge colors
const statusColors = {
  emerald: "bg-[#10b98110] text-emerald-500",
  blue: "bg-[#3b82f610] text-blue-500",
  amber: "bg-[#f59e0b10] text-amber-500",
};

export const DashboardSection = (): JSX.Element => {
  return (
    <section className="flex flex-col gap-8 p-8 w-full">
      <header className="flex items-center justify-between w-full">
        <h1 className="font-bold text-slate-800 text-2xl">Coach Dashboard</h1>

        <div className="flex items-center gap-3">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
            <Input
              className="w-60 h-11 pl-10 pr-4 py-0 bg-white rounded-[22px] border border-slate-200"
              placeholder="SearchIcon students..."
            />
          </div>

          <Button
            variant="outline"
            size="icon"
            className="w-11 h-11 rounded-[22px] border border-slate-200"
          >
            <BellIcon className="w-5 h-5" />
          </Button>

          <Button
            variant="outline"
            className="h-11 gap-2 px-4 py-0 rounded-[22px] border border-slate-200"
          >
            <DownloadIcon className="w-5 h-5" />
            <span className="font-medium text-slate-800 text-sm">Export</span>
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="h-11 gap-2 px-4 py-0 rounded-[22px] border border-slate-200"
          >
            <FilterIcon className="w-5 h-5" />
            <span className="font-medium text-slate-800 text-sm">
              FilterIcon
            </span>
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-6 w-full">
        {statsCards.map((card, index) => (
          <Card
            key={index}
            className="rounded-2xl shadow-[0px_4px_20px_#0000000a]"
          >
            <CardContent className="flex flex-col h-[120px] justify-center p-6">
              <p className="font-medium text-slate-500 text-sm">{card.title}</p>
              <p className="font-bold text-slate-800 text-[28px]">
                {card.value}
              </p>
              <div className="flex items-center gap-1">
                {card.trendIcon && (
                  <span className={card.trendColor}>{card.trendIcon}</span>
                )}
                <p className={`font-medium text-sm ${card.trendColor}`}>
                  {card.trend}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="h-[360px] rounded-2xl shadow-[0px_4px_20px_#0000000a]">
        <CardContent className="p-6 flex flex-col gap-4 h-full">
          <div className="flex items-center justify-between">
            <h2 className="font-normal text-slate-800 text-lg">
              Student Activity
            </h2>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                className="h-9 px-4 py-0 rounded-[18px] bg-slate-50"
              >
                <span className="font-medium text-slate-800 text-sm">
                  Last 30 Days
                </span>
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="w-9 h-9 rounded-[18px] bg-slate-50"
              >
                <DownloadIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="relative flex-1 bg-slate-50 rounded-lg">
            <div className="absolute top-5 left-10 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-sm" />
                <span className="font-normal text-slate-500 text-xs">
                  Job Application
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-violet-500 rounded-sm" />
                <span className="font-normal text-slate-500 text-xs">
                  Job Offers
                </span>
              </div>
            </div>

            {/* Chart lines and dots */}
            <div className="absolute w-[600px] h-0.5 top-[120px] left-10 bg-blue-500">
              <div className="absolute w-2 h-2 top-[-3px] left-0 bg-blue-500 rounded-full" />
            </div>
            <div className="absolute w-2 h-2 top-[100px] left-[140px] bg-blue-500 rounded-full" />
            <div className="absolute w-2 h-2 top-[140px] left-60 bg-blue-500 rounded-full" />
            <div className="absolute w-2 h-2 top-20 left-[340px] bg-blue-500 rounded-full" />
            <div className="absolute w-2 h-2 top-[60px] left-[440px] bg-blue-500 rounded-full" />
            <div className="absolute w-2 h-2 top-[90px] left-[540px] bg-blue-500 rounded-full" />
            <div className="absolute w-2 h-2 top-[120px] left-[640px] bg-blue-500 rounded-full" />

            <div className="absolute w-[600px] h-0.5 top-[180px] left-10 bg-violet-500">
              <div className="absolute w-2 h-2 top-[-3px] left-0 bg-violet-500 rounded-full" />
            </div>
            <div className="absolute w-2 h-2 top-40 left-[140px] bg-violet-500 rounded-full" />
            <div className="absolute w-2 h-2 top-[200px] left-60 bg-violet-500 rounded-full" />
            <div className="absolute w-2 h-2 top-[150px] left-[340px] bg-violet-500 rounded-full" />
            <div className="absolute w-2 h-2 top-[130px] left-[440px] bg-violet-500 rounded-full" />
            <div className="absolute w-2 h-2 top-[140px] left-[540px] bg-violet-500 rounded-full" />
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4 w-full">
        <div className="flex items-center justify-between">
          <h2 className="font-normal text-slate-800 text-lg">
            Recent Students
          </h2>
          <Button
            variant="link"
            className="font-medium text-blue-500 text-sm p-0"
          >
            View All
          </Button>
        </div>

        <Card className="rounded-2xl shadow-[0px_4px_20px_#0000000a]">
          <Table>
            <TableHeader className="bg-slate-50 rounded-t-2xl">
              <TableRow className="h-12">
                <TableHead className="w-[200px] font-medium text-slate-500 text-sm">
                  Student
                </TableHead>
                <TableHead className="w-[120px] font-medium text-slate-500 text-sm">
                  Program
                </TableHead>
                <TableHead className="w-[120px] font-medium text-slate-500 text-sm">
                  Profile Status
                </TableHead>
                <TableHead className="w-[120px] font-medium text-slate-500 text-sm">
                  CVs Generated
                </TableHead>
                <TableHead className="w-[120px] font-medium text-slate-500 text-sm">
                  Applications
                </TableHead>
                <TableHead className="w-[120px] font-medium text-slate-500 text-sm">
                  Last Active
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow
                  key={student.id}
                  className="h-16 border-b border-slate-50"
                >
                  <TableCell className="py-0">
                    <div className="flex items-center gap-3">
                      <Avatar
                        className={`w-8 h-8 rounded-2xl ${student.avatarGradient}`}
                      >
                        <AvatarFallback className="text-white text-xs">
                          {student.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-slate-800 text-sm">
                        {student.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-normal text-slate-500 text-sm py-0">
                    {student.program}
                  </TableCell>
                  <TableCell className="py-0">
                    <Badge
                      className={`px-2 py-0.5 rounded-xl font-medium text-xs ${statusColors[student.status.color]}`}
                    >
                      {student.status.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-normal text-slate-800 text-sm py-0">
                    {student.cvsGenerated}
                  </TableCell>
                  <TableCell className="font-normal text-slate-800 text-sm py-0">
                    {student.applications}
                  </TableCell>
                  <TableCell className="font-normal text-slate-500 text-sm py-0">
                    {student.lastActive}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </section>
  );
};
