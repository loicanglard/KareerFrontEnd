import { CheckIcon } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

// Feature steps data
const featureSteps = [
  {
    number: "01",
    title: "Create Your Profile",
    description: "Set up your personalized profile with your academic and professional background",
    benefits: [
      "Easy-to-use interface",
      "Comprehensive profile sections",
      "Import from LinkedIn"
    ],
    illustration: (
      <img
        src="/step-illustration-1.png"
        alt="Create Profile"
        className="w-full h-auto rounded-lg object-cover"
      />
    )
  },
  {
    number: "02",
    title: "Generate Documents",
    description: "Create professional CVs and cover letters tailored to your target roles",
    benefits: [
      "AI-powered suggestions",
      "Industry-specific templates",
      "One-click formatting"
    ],
    illustration: (
      <img
        src="/step-illustration-2.png"
        alt="Generate Documents"
        className="w-full h-auto rounded-lg object-cover"
      />
    )
  },
  {
    number: "03",
    title: "Track Progress",
    description: "Monitor your application progress and get insights for improvement",
    benefits: [
      "Application dashboard",
      "Success metrics",
      "Improvement suggestions"
    ],
    illustration: (
      <img
        src="/step-illustration-3.png"
        alt="Track Progress"
        className="w-full h-auto rounded-lg object-cover"
      />
    )
  }
];

// Career coach benefits data
const coachBenefits = [
  {
    icon: "/Vector.png",
    title: "Tracking Dashboard",
    description:
      "Monitor student progress and engagement with comprehensive analytics",
  },
  {
    icon: "/Vector (1).png",
    title: "Improved Employability",
    description:
      "Boost your institution's employment rates with better prepared graduates",
  },
  {
    icon: "/Vector (2).png",
    title: "Time Efficiency",
    description:
      "Reduce manual review time while providing more personalized guidance",
  },
];

// Student benefits data
const studentBenefits = [
  {
    icon: "/Vector (3).png",
    title: "Save Time",
    description:
      "Create professional CVs and cover letters in minutes instead of hours",
  },
  {
    icon: "/Vector (4).png",
    title: "Personalization",
    description:
      "Get tailored documents that highlight your unique skills and experiences",
  },
  {
    icon: "/Vector (5).png",
    title: "Professional Results",
    description: "Stand out with polished, industry-standard documents",
  },
  {
    icon: "/Vector (6).png",
    title: "Continuous Improvement",
    description: "Get AI feedback to refine your applications over time",
  },
  {
    icon: "/Vector (7).png",
    title: "Career Tracking",
    description: "Monitor your application progress and success rates",
  },
  {
    icon: "/Vector (8).png",
    title: "Interview Preparation",
    description: "Practice with AI-powered interview simulations",
  },
];

export const FeaturesSection = (): JSX.Element => {
  return (
    <section id="how_it_works" className="w-full">
      {/* How It Works Section */}
      <div className="flex flex-col items-center justify-center gap-20 px-6 py-20 bg-slate-50 md:px-20">
        <div className="flex flex-col items-center justify-center gap-4 max-w-[600px]">
          <h2 className="font-bold text-4xl text-slate-800 text-center leading-[43.2px] font-['Montserrat',Helvetica]">
            How It Works
          </h2>
          <p className="font-normal text-lg text-slate-500 text-center leading-[28.8px] font-['Inter',Helvetica]">
            Simple steps to boost your career journey
          </p>
        </div>

        {/* Feature Steps */}
        {featureSteps.map((step, index) => (
          <div
            key={`step-${index}`}
            className="flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-[1000px] gap-8"
          >
            {/* For index 1 (the second item), put the illustration first on desktop */}
            {index === 1 ? (
              <>
                <div className="w-full md:w-[500px] order-2 md:order-1">{step.illustration}</div>
                
                {/* Step description */}
                <div className="flex flex-col w-full md:w-[400px] items-start justify-center gap-4 order-1 md:order-2">
                  <div className="flex w-10 h-10 items-center justify-center bg-[#3b82f610] rounded-[20px]">
                    <span className="font-bold text-blue-500 text-base leading-[19.2px]">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="font-bold text-[32px] text-slate-800 leading-[38.4px] font-['Montserrat',Helvetica]">
                    {step.title}
                  </h3>

                  <p className="font-normal text-base text-slate-500 leading-[25.6px] font-['Inter',Helvetica]">
                    {step.description}
                  </p>

                  <div className="flex flex-col items-start gap-3 w-full">
                    {step.benefits.map((benefit, i) => (
                      <div
                        key={`benefit-${index}-${i}`}
                        className="flex items-center gap-3 w-full"
                      >
                        <CheckIcon className="w-5 h-5 text-blue-500" />
                        <span className="font-medium text-sm text-slate-800 leading-[16.8px] font-['Inter',Helvetica]">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Step description - regular order for other items */}
                <div className="flex flex-col w-full md:w-[400px] items-start justify-center gap-4">
                  <div className="flex w-10 h-10 items-center justify-center bg-[#3b82f610] rounded-[20px]">
                    <span className="font-bold text-blue-500 text-base leading-[19.2px]">
                      {step.number}
                     </span>
                  </div>

                  <h3 className="font-bold text-[32px] text-slate-800 leading-[38.4px] font-['Montserrat',Helvetica]">
                    {step.title}
                  </h3>

                  <p className="font-normal text-base text-slate-500 leading-[25.6px] font-['Inter',Helvetica]">
                    {step.description}
                  </p>

                  <div className="flex flex-col items-start gap-3 w-full">
                    {step.benefits.map((benefit, i) => (
                      <div
                        key={`benefit-${index}-${i}`}
                        className="flex items-center gap-3 w-full"
                      >
                        <CheckIcon className="w-5 h-5 text-blue-500" />
                        <span className="font-medium text-sm text-slate-800 leading-[16.8px] font-['Inter',Helvetica]">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step illustration */}
                <div className="w-full md:w-[500px]">{step.illustration}</div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* For Career Coaches & Schools Section */}
      <div id="for-schools" className="flex flex-col items-center justify-center gap-5 px-6 py-20 bg-white md:px-20">
        <h2 className="font-bold text-4xl text-slate-800 text-center leading-[43.2px] font-['Montserrat',Helvetica]">
          For Career Coaches &amp; Schools
        </h2>

        <div className="flex flex-col items-center justify-center gap-4 max-w-[600px]">
          <p className="font-normal text-lg text-slate-500 text-center leading-[28.8px] font-['Inter',Helvetica]">
            Empower your institution with data-driven career services
          </p>
        </div>

        {/* Coach Benefits Cards */}
        <div className="flex flex-wrap justify-center gap-6 max-w-[1000px] mt-4">
          {coachBenefits.map((benefit, index) => (
            <Card
              key={`coach-benefit-${index}`}
              className="w-full sm:w-[300px] h-[220px] shadow-[0px_4px_20px_#0000000a] rounded-2xl"
            >
              <CardContent className="flex flex-col items-start gap-4 p-6">
                <img
                  className="w-10 h-10 rounded-lg object-cover"
                  alt={benefit.title}
                  src={benefit.icon}
                />
                <h3 className="font-normal text-lg text-slate-800 leading-[21.6px] font-['Inter',Helvetica]">
                  {benefit.title}
                </h3>
                <p className="font-normal text-sm text-slate-500 leading-[21px] font-['Inter',Helvetica]">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Student Benefits Section */}
        <div className="flex flex-col items-center justify-center gap-4 max-w-[600px] mt-8">
          <h2 className="font-bold text-4xl text-slate-800 text-center leading-[43.2px] font-['Montserrat',Helvetica]">
            Student Benefits
          </h2>
          <p className="font-normal text-lg text-slate-500 text-center leading-[28.8px] font-['Inter',Helvetica]">
            How Kareer helps you succeed
          </p>
        </div>

        {/* Student Benefits Cards */}
        <div className="flex flex-wrap justify-center gap-6 max-w-[1000px] mt-4">
          {studentBenefits.map((benefit, index) => (
            <Card
              key={`student-benefit-${index}`}
              className="w-full sm:w-[300px] h-[200px] bg-slate-50 shadow-[0px_4px_20px_#0000000a] rounded-2xl"
            >
              <CardContent className="flex flex-col items-start gap-4 p-6">
                <img
                  className="w-10 h-10 rounded-lg object-cover"
                  alt={benefit.title}
                  src={benefit.icon}
                />
                <h3 className="font-normal text-lg text-slate-800 leading-[21.6px] font-['Inter',Helvetica]">
                  {benefit.title}
                </h3>
                <p className="font-normal text-sm text-slate-500 leading-[21px] font-['Inter',Helvetica]">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};