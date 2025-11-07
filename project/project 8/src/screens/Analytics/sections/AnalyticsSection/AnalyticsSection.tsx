import { DownloadIcon, FilterIcon, MoreVerticalIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

// Data for job applications by status
const applicationData = [
  {
    status: "Applied",
    count: 8509,
    color: "bg-amber-500",
    bgColor: "bg-[#f59e0b10]",
    jobs: [
      {
        title: "Software Engineer",
        company: "Google",
        details: "Added 2 days ago",
        cv: "Link",
        cl: "Link",
      },
      {
        title: "Frontend Developer",
        company: "Airbnb",
        details: "Added 3 days ago",
        cv: "Link",
        cl: "Link",
      },
      {
        title: "Mobile Developer",
        company: "Spotify",
        details: "Added 5 days ago",
        cv: "Link",
        cl: "Link",
      },
      {
        title: "Mobile Developer",
        company: "Spotify",
        details: "Added 5 days ago",
        cv: "Link",
        cl: "Link",
      },
      {
        title: "UX Designer",
        company: "Apple",
        details: "Interview on June 15",
        cv: "Link",
        cl: "Link",
      },
    ],
  },
  {
    status: "Interviewing",
    count: 4987,
    color: "bg-blue-500",
    bgColor: "bg-[#3b82f620]",
    jobs: [
      {
        title: "Full Stack Developer",
        company: "Microsoft",
        details: "Interview on June 15",
        cv: "Link",
        cl: "Link",
      },
      {
        title: "Backend Engineer",
        company: "Amazon",
        details: "Interview on June 15",
        cv: "Link",
        cl: "Link",
      },
      {
        title: "Data Scientist",
        company: "Netflix",
        details: "Interview on June 15",
        cv: "Link",
        cl: "Link",
      },
      {
        title: "UX Designer",
        company: "Apple",
        details: "Interview on June 15",
        cv: "Link",
        cl: "Link",
      },
    ],
  },
  {
    status: "Rejected",
    count: 5874,
    color: "bg-red-500",
    bgColor: "bg-[#f65c5e20]",
    jobs: [
      {
        title: "Data Scientist",
        company: "Netflix",
        details: "Interview on June 15",
        cv: "Link",
        cl: "Link",
      },
      {
        title: "Full Stack Developer",
        company: "Microsoft",
        details: "Interview on June 15",
        cv: "Link",
        cl: "Link",
      },
      {
        title: "UX Designer",
        company: "Apple",
        details: "Interview on June 15",
        cv: "Link",
        cl: "Link",
      },
    ],
  },
  {
    status: "Offer",
    count: 2879,
    color: "bg-emerald-500",
    bgColor: "bg-[#10b98110]",
    jobs: [
      {
        title: "Backend Engineer",
        company: "Amazon",
        details: "Interview on June 15\nStart on September 2",
        cv: "Link",
        cl: "Link",
      },
      {
        title: "Full Stack Developer",
        company: "Microsoft",
        details: "Interview on June 15\nStart on September 5",
        cv: "Link",
        cl: "Link",
      },
    ],
  },
];

export const AnalyticsSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full items-start gap-6 p-8">
      <header className="flex items-center justify-between relative w-full">
        <h1 className="font-bold text-slate-800 text-2xl">Coach Analyics</h1>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="h-11 gap-2 rounded-[22px] border-slate-200"
          >
            <FilterIcon className="w-5 h-5" />
            <span className="font-medium text-slate-800 text-sm">
              FilterIcon
            </span>
          </Button>

          <Button
            variant="outline"
            className="h-11 gap-2 rounded-[22px] border-slate-200"
          >
            <DownloadIcon className="w-5 h-5" />
            <span className="font-medium text-slate-800 text-sm">Export</span>
          </Button>
        </div>
      </header>

      <div className="flex w-full items-start gap-4 bg-slate-50">
        {applicationData.map((column, index) => (
          <div
            key={index}
            className={`flex flex-col w-full items-start gap-4 ${column.bgColor}`}
          >
            <div className="flex items-center justify-between w-full">
              <div className="inline-flex items-center gap-2">
                <div className={`w-3 h-3 ${column.color} rounded-md`} />
                <span className="font-normal text-slate-800 text-base">
                  {column.status}
                </span>
              </div>
              <span className="font-normal text-slate-500 text-base">
                {column.count}
              </span>
            </div>

            {column.jobs.map((job, jobIndex) => (
              <Card
                key={jobIndex}
                className="w-full shadow-[0px_2px_8px_#0000000a] rounded-lg"
              >
                <CardContent className="p-4">
                  <div className="font-normal text-slate-800 text-sm">
                    {job.title}
                  </div>
                  <div className="font-medium text-slate-500 text-xs">
                    {job.company}
                  </div>
                  <div className="flex items-center justify-between w-full mt-1">
                    <div className="font-normal text-xs">
                      <span className="text-slate-500">
                        {job.details &&
                          job.details.split("\n").map((line, i) => (
                            <React.Fragment key={i}>
                              {i > 0 && <br />}
                              {line}
                            </React.Fragment>
                          ))}
                        <br />
                        CV: <span className="text-blue-500">{job.cv}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;CL:{" "}
                        <span className="text-blue-500">{job.cl}</span>
                      </span>
                    </div>
                    <MoreVerticalIcon className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};
