import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  PlusIcon,
  SearchIcon,
  FilterIcon,
  MoreVerticalIcon,
  CalendarIcon,
  BuildingIcon,
  ExternalLinkIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertCircleIcon,
  TrendingUpIcon,
  MapPinIcon,
  BellIcon,
  DownloadIcon,
  GripVerticalIcon,
  FileTextIcon,
  UserIcon
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { NavigationSection } from "../CoachDashboard/sections/NavigationSection/NavigationSection";

// Initial job applications data
const initialJobData = [
  {
    id: "applied",
    title: "Applied",
    count: 3,
    color: "bg-blue-500",
    bgColor: "bg-blue-50/80",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
    headerBg: "bg-gradient-to-r from-blue-50 to-blue-100",
    icon: <ClockIcon className="w-5 h-5" />,
    jobs: [
      {
        id: "1",
        title: "Frontend Developer",
        company: "Google",
        location: "Paris, France",
        salary: "€65,000 - €80,000",
        appliedDate: "2 days ago",
        type: "Full-time",
        logo: "https://logo.clearbit.com/google.com",
        description: "Join our team to build the next generation of web applications...",
        requirements: ["React", "TypeScript", "Node.js"],
        status: "Under Review",
        student: {
          name: "Alex Smith",
          id: "10105518",
          avatar: "AS",
          color: "bg-gradient-to-br from-blue-500 to-blue-700"
        }
      },
      {
        id: "2",
        title: "UX Designer",
        company: "Airbnb",
        location: "Remote",
        salary: "€55,000 - €70,000",
        appliedDate: "5 days ago",
        type: "Full-time",
        logo: "https://logo.clearbit.com/airbnb.com",
        description: "Design beautiful and intuitive user experiences...",
        requirements: ["Figma", "User Research", "Prototyping"],
        status: "Application Sent",
        student: {
          name: "Emma Johnson",
          id: "10105519",
          avatar: "EJ",
          color: "bg-gradient-to-br from-purple-500 to-purple-700"
        }
      },
      {
        id: "3",
        title: "Product Manager",
        company: "Spotify",
        location: "Stockholm, Sweden",
        salary: "€70,000 - €90,000",
        appliedDate: "1 week ago",
        type: "Full-time",
        logo: "https://logo.clearbit.com/spotify.com",
        description: "Lead product strategy and development...",
        requirements: ["Product Strategy", "Analytics", "Leadership"],
        status: "Application Sent",
        student: {
          name: "Michael Chen",
          id: "10105520",
          avatar: "MC",
          color: "bg-gradient-to-br from-red-500 to-red-700"
        }
      }
    ]
  },
  {
    id: "interview",
    title: "Interview",
    count: 2,
    color: "bg-orange-500",
    bgColor: "bg-orange-50/80",
    borderColor: "border-orange-200",
    textColor: "text-orange-700",
    headerBg: "bg-gradient-to-r from-orange-50 to-orange-100",
    icon: <TrendingUpIcon className="w-5 h-5" />,
    jobs: [
      {
        id: "4",
        title: "Full Stack Developer",
        company: "Microsoft",
        location: "Paris, France",
        salary: "€75,000 - €95,000",
        appliedDate: "2 weeks ago",
        type: "Full-time",
        logo: "https://logo.clearbit.com/microsoft.com",
        description: "Build scalable web applications using modern technologies...",
        requirements: ["React", "C#", ".NET", "Azure"],
        status: "Technical Interview",
        interviewDate: "Tomorrow at 2:00 PM",
        student: {
          name: "Alex Smith",
          id: "10105518",
          avatar: "AS",
          color: "bg-gradient-to-br from-blue-500 to-blue-700"
        }
      },
      {
        id: "5",
        title: "Data Scientist",
        company: "Netflix",
        location: "Amsterdam, Netherlands",
        salary: "€80,000 - €100,000",
        appliedDate: "3 weeks ago",
        type: "Full-time",
        logo: "https://logo.clearbit.com/netflix.com",
        description: "Analyze data to drive business decisions...",
        requirements: ["Python", "Machine Learning", "SQL"],
        status: "Final Interview",
        interviewDate: "Friday at 10:00 AM",
        student: {
          name: "Michael Chen",
          id: "10105520",
          avatar: "MC",
          color: "bg-gradient-to-br from-red-500 to-red-700"
        }
      }
    ]
  },
  {
    id: "offer",
    title: "Offer",
    count: 1,
    color: "bg-green-500",
    bgColor: "bg-green-50/80",
    borderColor: "border-green-200",
    textColor: "text-green-700",
    headerBg: "bg-gradient-to-r from-green-50 to-green-100",
    icon: <CheckCircleIcon className="w-5 h-5" />,
    jobs: [
      {
        id: "6",
        title: "Software Engineer",
        company: "Apple",
        location: "London, UK",
        salary: "€85,000 - €110,000",
        appliedDate: "1 month ago",
        type: "Full-time",
        logo: "https://logo.clearbit.com/apple.com",
        description: "Develop innovative software solutions...",
        requirements: ["Swift", "iOS", "Objective-C"],
        status: "Offer Received",
        offerDeadline: "Respond by Dec 15, 2024",
        student: {
          name: "Emma Johnson",
          id: "10105519",
          avatar: "EJ",
          color: "bg-gradient-to-br from-purple-500 to-purple-700"
        }
      }
    ]
  },
  {
    id: "rejected",
    title: "Rejected",
    count: 1,
    color: "bg-red-500",
    bgColor: "bg-red-50/80",
    borderColor: "border-red-200",
    textColor: "text-red-700",
    headerBg: "bg-gradient-to-r from-red-50 to-red-100",
    icon: <XCircleIcon className="w-5 h-5" />,
    jobs: [
      {
        id: "7",
        title: "Backend Developer",
        company: "Amazon",
        location: "Berlin, Germany",
        salary: "€70,000 - €85,000",
        appliedDate: "1 month ago",
        type: "Full-time",
        logo: "https://logo.clearbit.com/amazon.com",
        description: "Build robust backend systems...",
        requirements: ["Java", "AWS", "Microservices"],
        status: "Position Filled",
        rejectionReason: "Position filled with another candidate",
        student: {
          name: "Michael Chen",
          id: "10105520",
          avatar: "MC",
          color: "bg-gradient-to-br from-red-500 to-red-700"
        }
      }
    ]
  }
];

export const CoachJobTracker = (): JSX.Element => {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState(initialJobData);
  const [draggedItem, setDraggedItem] = useState<any>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [showJobModal, setShowJobModal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Refs for drag and drop
  const ghostElementRef = useRef<HTMLElement | null>(null);
  const lastScrollY = useRef<number>(0);
  const isScrollingRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Track mouse position for tooltip
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (draggedItem) {
        setTooltipPosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [draggedItem]);

  // Hide tooltip when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Mark as scrolling
      isScrollingRef.current = true;
      
      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Hide tooltip while scrolling
      if (showTooltip) {
        setShowTooltip(false);
      }
      
      // Set a timeout to reset scrolling state
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
        
        // Only show tooltip again if still dragging
        if (draggedItem && !showTooltip) {
          setShowTooltip(true);
        }
      }, 150); // Short delay to prevent flickering
      
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [draggedItem, showTooltip]);
  
  // Handle drag start
  const handleDragStart = (e: React.DragEvent, job: any, columnId: string) => {
    setDraggedItem({ job, fromColumn: columnId });
    setIsDragging(true);
    setShowTooltip(true);
    
    // Set data for drag operation
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", job.id);
    
    // Create custom drag ghost image with proper cleanup
    if (e.target instanceof HTMLElement) {
      const rect = e.target.getBoundingClientRect();
      const ghostElement = e.target.cloneNode(true) as HTMLElement;
      
      // Apply styles to make it look identical to the original
      ghostElement.style.position = 'absolute';
      ghostElement.style.top = '-1000px'; // Position off-screen
      ghostElement.style.left = '-1000px';
      ghostElement.style.width = `${rect.width}px`;
      ghostElement.style.height = `${rect.height}px`;
      ghostElement.style.opacity = '1';
      ghostElement.style.pointerEvents = 'none';
      
      // Store reference for cleanup
      ghostElementRef.current = ghostElement;
      
      // Add to DOM and use as drag image
      document.body.appendChild(ghostElement);
      e.dataTransfer.setDragImage(ghostElement, e.clientX - rect.left, e.clientY - rect.top);
    }
  };

  // Handle drag end
  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverColumn(null);
    setIsDragging(false);
    setShowTooltip(false);
    
    // Clean up ghost element using ref
    if (ghostElementRef.current && document.body.contains(ghostElementRef.current)) {
      document.body.removeChild(ghostElementRef.current);
      ghostElementRef.current = null;
    }
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    if (draggedItem && draggedItem.fromColumn !== columnId) {
      setDragOverColumn(columnId);
    }
  };

  // Handle drag leave
  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent, toColumnId: string) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem.fromColumn === toColumnId) {
      setDragOverColumn(null);
      setDraggedItem(null);
      setIsDragging(false);
      setShowTooltip(false);
      return;
    }

    const newJobData = [...jobData];
    
    // Find source and target columns
    const fromColumnIndex = newJobData.findIndex(col => col.id === draggedItem.fromColumn);
    const toColumnIndex = newJobData.findIndex(col => col.id === toColumnId);
    
    if (fromColumnIndex === -1 || toColumnIndex === -1) return;
    
    // Find the job in the source column
    const jobIndex = newJobData[fromColumnIndex].jobs.findIndex(job => job.id === draggedItem.job.id);
    
    if (jobIndex === -1) return;
    
    // Remove job from source column
    const [movedJob] = newJobData[fromColumnIndex].jobs.splice(jobIndex, 1);
    
    // Add job to target column
    newJobData[toColumnIndex].jobs.unshift(movedJob);
    
    // Update counts
    newJobData[fromColumnIndex].count = newJobData[fromColumnIndex].jobs.length;
    newJobData[toColumnIndex].count = newJobData[toColumnIndex].jobs.length;
    
    setJobData(newJobData);
    setDragOverColumn(null);
    setDraggedItem(null);
    setIsDragging(false);
    setShowTooltip(false);
  };

  // Handle add new job
  const handleAddJob = () => {
    console.log("Add new job");
    // In a real app, this would open a modal to add a new job
  };

  // Handle job click
  const handleJobClick = (job: any) => {
    setSelectedJob(job);
    setShowJobModal(true);
  };

  // Handle job actions
  const handleJobAction = (action: string, job: any, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`${action} job:`, job.title);
    
    switch(action) {
      case 'edit':
        // Open edit modal
        break;
      case 'delete':
        // Delete job
        break;
      case 'view':
        handleJobClick(job);
        break;
    }
  };

  // Filter jobs based on search
  const filteredJobData = jobData.map(column => ({
    ...column,
    jobs: column.jobs.filter(job => 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.student.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }));

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/20">
      <aside className="h-full w-60 fixed left-0 top-0">
        <NavigationSection />
      </aside>
      
      <div className="flex-1 p-8 ml-60">
        {/* Persistent drag and drop instruction message */}
        {isDragging && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg z-50 flex items-center gap-3 animate-fadeIn">
          <GripVerticalIcon className="w-5 h-5" />
          <p className="font-medium">💡 Drag and drop cards to update their status</p>
        </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
              <TrendingUpIcon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">Job Tracker</h1>
              <p className="text-slate-600">Monitor student job applications across all stages</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                placeholder="Search jobs, companies, or students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 w-80 bg-white/80 backdrop-blur-sm border-0 ring-1 ring-slate-200/60 rounded-2xl placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-200"
              />
            </div>
            
            {/* Notifications */}
            <Button
              variant="outline"
              size="icon"
              className="w-12 h-12 rounded-2xl border-0 bg-white/80 backdrop-blur-sm shadow-sm ring-1 ring-slate-200/60 hover:bg-white hover:ring-blue-500/20 transition-all duration-200"
            >
              <BellIcon className="w-5 h-5 text-slate-600" />
            </Button>
            
            {/* Export */}
            <Button
              variant="outline"
              className="h-12 gap-2 px-6 py-0 rounded-2xl border-0 bg-white/80 backdrop-blur-sm shadow-sm ring-1 ring-slate-200/60 hover:bg-white hover:ring-blue-500/20 transition-all duration-200"
            >
              <DownloadIcon className="w-5 h-5 text-slate-600" />
              <span className="font-semibold text-slate-700 text-sm">Export</span>
            </Button>
            
            {/* Filter */}
            <Button
              variant="outline"
              className="h-12 gap-2 px-6 py-0 rounded-2xl border-0 bg-white/80 backdrop-blur-sm shadow-sm ring-1 ring-slate-200/60 hover:bg-white hover:ring-blue-500/20 transition-all duration-200"
            >
              <FilterIcon className="w-5 h-5 text-slate-600" />
              <span className="font-semibold text-slate-700 text-sm">Filter</span>
            </Button>
            
            {/* Add Job */}
            <Button 
              onClick={handleAddJob} 
              className="h-12 gap-2 px-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-2xl text-white font-semibold shadow-sm hover:shadow-md transition-all duration-200"
            >
              <PlusIcon className="w-5 h-5" />
              Add Job
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {jobData.map((column) => (
            <Card 
              key={column.id} 
              className="p-6 border-0 ring-1 ring-slate-200/60 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 bg-white/80 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${column.color}`}></div>
                    <p className={`text-base font-semibold ${column.textColor}`}>{column.title}</p>
                  </div>
                  <p className={`text-3xl font-bold ${column.textColor}`}>{column.count.toLocaleString()}</p>
                </div>
                <div className={`w-14 h-14 rounded-2xl ${column.bgColor} flex items-center justify-center shadow-sm`}>
                  {column.icon}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-4 gap-6 h-[calc(100vh-280px)]">
          {filteredJobData.map((column) => (
            <div
              key={column.id}
              className={`flex flex-col rounded-3xl border-2 transition-all duration-300 ${
                dragOverColumn === column.id 
                  ? `${column.borderColor} ${column.bgColor} shadow-xl scale-[1.02] ring-4 ring-blue-300/50` 
                  : 'border-white/60 bg-white/40 backdrop-blur-sm shadow-lg hover:shadow-xl'
              }`}
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              {/* Column Header */}
              <div className={`p-6 rounded-t-3xl ${column.headerBg} border-b border-white/30`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm ${column.textColor}`}>
                      {column.icon}
                    </div>
                    <div>
                      <h3 className={`font-bold text-lg tracking-tight ${column.textColor}`}>
                        {column.title}
                      </h3>
                      <p className="text-xs font-medium text-slate-600 mt-1">
                        {column.jobs.length} applications
                      </p>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm ${column.textColor}`}>
                    <span className="font-bold text-2xl">{column.count.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Jobs List */}
              <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                {column.jobs.map((job) => (
                  <Card
                    key={job.id}
                    className={`group cursor-move transition-all duration-300 border-0 shadow-md hover:shadow-xl ${
                      draggedItem?.job.id === job.id ? 'opacity-100 z-50' : ''
                    }`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, job, column.id)}
                    onDragEnd={handleDragEnd}
                    onClick={() => handleJobClick(job)}
                    style={{
                      opacity: 1, // Force opacity to always be 1 (100%)
                      zIndex: draggedItem?.job.id === job.id ? 9999 : 'auto'
                    }}
                  >
                    <CardContent className="p-6 bg-gradient-to-br from-white to-slate-50/50 rounded-2xl">
                      {/* Card Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center overflow-hidden shadow-sm">
                            <img 
                              src={job.logo} 
                              alt={job.company}
                              className="w-8 h-8 object-contain"
                              onError={(e) => {
                                e.currentTarget.src = `https://ui-avatars.com/api/?name=${job.company}&background=3b82f6&color=fff&size=32`;
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-slate-800 text-base leading-tight mb-1 truncate">
                              {job.title}
                            </h4>
                            <p className="text-slate-600 font-semibold text-sm mb-1 truncate">
                              {job.company}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-slate-500 truncate">
                              <MapPinIcon className="w-3 h-3" />
                              <span className="truncate">{job.location}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <GripVerticalIcon className="w-4 h-4 text-slate-400" />
                          </div>
                        </div>
                      </div>

                      {/* Student Info */}
                      <div className="flex items-center gap-3 mb-4 overflow-hidden">
                        <div className={`w-8 h-8 rounded-xl ${job.student.color} flex items-center justify-center shadow-sm`}>
                          <span className="text-white text-xs font-semibold">{job.student.avatar}</span>
                        </div>
                        <div className="min-w-0 overflow-hidden">
                          <p className="text-xs font-medium text-slate-700 truncate">{job.student.name}</p>
                          <p className="text-xs text-slate-500 truncate">{job.student.id}</p>
                        </div>
                      </div>

                      {/* Job Details */}
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600 overflow-hidden">
                          <ClockIcon className="w-4 h-4 flex-shrink-0" />
                          <span className="whitespace-nowrap overflow-hidden text-ellipsis">Applied {job.appliedDate}</span>
                        </div>
                        
                        {job.salary && (
                          <div className="text-sm font-semibold text-emerald-600 whitespace-nowrap overflow-hidden text-ellipsis">
                            {job.salary}
                          </div>
                        )}
                        
                        {job.interviewDate && (
                          <div className="p-3 bg-orange-50 rounded-xl border border-orange-200">
                            <div className="flex items-center gap-2 text-orange-700 w-full">
                              <CalendarIcon className="w-4 h-4 flex-shrink-0" />
                              <span className="text-sm font-semibold whitespace-nowrap overflow-hidden text-ellipsis">{job.interviewDate}</span>
                            </div>
                          </div>
                        )}
                        
                        {job.offerDeadline && (
                          <div className="p-3 bg-green-50 rounded-xl border border-green-200">
                            <div className="text-green-700 text-sm font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                              {job.offerDeadline}
                            </div>
                          </div>
                        )}
                        
                        {job.rejectionReason && (
                          <div className="p-3 bg-red-50 rounded-xl border border-red-200">
                            <div className="text-red-700 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                              {job.rejectionReason}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Status and Skills */}
                      <div className="flex items-center justify-between overflow-hidden">
                        <Badge 
                          variant="outline" 
                          className={`text-xs font-medium px-2 py-1 ${
                            column.id === 'applied' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                            column.id === 'interview' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                            column.id === 'offer' ? 'bg-green-50 text-green-700 border-green-200' :
                            'bg-red-50 text-red-700 border-red-200'
                          }`}
                        >
                          {job.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Empty State */}
                {column.jobs.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className={`w-16 h-16 rounded-2xl ${column.bgColor} flex items-center justify-center mb-4 shadow-sm`}>
                      {column.icon}
                    </div>
                    <p className="text-slate-500 font-medium">No applications in {column.title.toLowerCase()}</p>
                    <p className="text-slate-400 text-sm mt-1">Drag applications here to update status</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Floating Tooltip */}
        {showTooltip && draggedItem && !isScrollingRef.current && (
          <div 
            className="fixed z-50 pointer-events-none bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg opacity-100"
            style={{ 
              left: tooltipPosition.x + 15, 
              top: tooltipPosition.y - 10,
              transform: 'translateY(-100%)'
            }}
          >
            You can move this to another column
          </div>
        )}

        {/* Job Detail Modal */}
        {selectedJob && showJobModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn overflow-auto">
            <div className="w-full max-w-4xl max-h-[90vh] overflow-auto rounded-3xl border-0 shadow-2xl bg-white animate-slideIn relative">
              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowJobModal(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-red-50 hover:text-red-500 transition-all duration-200"
              >
                <XCircleIcon className="w-5 h-5" />
              </Button>
              
              {/* Company Banner */}
              <div className="h-40 w-full bg-gradient-to-r from-blue-500 to-indigo-600 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/90 to-indigo-600/90 backdrop-blur-sm"></div>
                <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
              
                {/* Company Logo */}
                <div className="absolute -bottom-10 left-8 w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg border-4 border-white">
                  <img 
                    src={selectedJob.logo} 
                    alt={selectedJob.company}
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${selectedJob.company}&background=3b82f6&color=fff&size=48`;
                    }}
                  />
                </div>
              </div>
              
              {/* Content Container */}
              <div className="flex flex-col relative">
                {/* Job Header */}
                <div className="px-8 pb-6 pt-14">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800">{selectedJob.title}</h2>
                      <p className="text-lg font-semibold text-blue-600 mb-2">{selectedJob.company}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                        <div className="flex items-center gap-1">
                          <MapPinIcon className="w-4 h-4" />
                          <span>{selectedJob.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ClockIcon className="w-4 h-4" />
                          <span>Applied {selectedJob.appliedDate}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Badge 
                        className={`px-4 py-2 text-sm font-medium ${
                          selectedJob.status.includes("Interview") ? 'bg-orange-100 text-orange-700 border-orange-200' :
                          selectedJob.status.includes("Offer") ? 'bg-green-100 text-green-700 border-green-200' :
                          selectedJob.status.includes("Rejected") || selectedJob.status.includes("Position Filled") ? 'bg-red-100 text-red-700 border-red-200' :
                          'bg-blue-100 text-blue-700 border-blue-200'
                        }`}
                      >
                        {selectedJob.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                {/* Main Content */}
                <div className="flex flex-col md:flex-row gap-8 px-8 pb-8">
                  {/* Left Column */}
                  <div className="flex-1 space-y-8">
                    {/* Job Description */}
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <FileTextIcon className="w-5 h-5 text-blue-600" />
                        Job Description
                      </h3>
                      <p className="text-slate-600 leading-relaxed">{selectedJob.description}</p>
                    </div>
                    
                    {/* Requirements */}
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <CheckCircleIcon className="w-5 h-5 text-blue-600" />
                        Requirements
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedJob.requirements.map((req: string, index: number) => (
                          <Badge key={index} className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => navigate(`/student-education/${selectedJob.student.id}`)}
                      >
                        View Student Profile
                      </Button>
                      <Button variant="outline">
                        Contact Student
                      </Button>
                    </div>
                  </div>
                  
                  {/* Right Column */}
                  <div className="md:w-80 space-y-6">
                    {/* Student Info */}
                    <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 p-6 rounded-2xl border border-blue-100/50 relative">
                      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <UserIcon className="w-5 h-5 text-blue-600" />
                        Student
                      </h3>
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-14 h-14 rounded-2xl ${selectedJob.student.color} flex items-center justify-center shadow-md`}>
                          <span className="text-white text-lg font-bold">{selectedJob.student.avatar}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800 text-base">{selectedJob.student.name}</p>
                          <p className="text-sm text-slate-500">{selectedJob.student.id}</p>
                        </div>
                      </div>
                    </div>

                    {/* Job Details */}
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 p-6 rounded-2xl border border-slate-200/60">
                      <h3 className="text-lg font-semibold text-slate-800 mb-4">Job Details</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-500">Salary</span>
                          <span className="font-semibold text-emerald-600">{selectedJob.salary}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-500">Type</span>
                          <span className="font-semibold text-slate-800">{selectedJob.type}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-500">Applied</span>
                          <span className="font-semibold text-slate-800">{selectedJob.appliedDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Special Info */}
                    {selectedJob.interviewDate && (
                      <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 p-6 rounded-2xl border border-orange-200">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                            <CalendarIcon className="w-5 h-5 text-orange-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-orange-800">Interview Scheduled</h3>
                        </div>
                        <p className="text-orange-700 ml-13">{selectedJob.interviewDate}</p>
                      </div>
                    )}

                    {selectedJob.offerDeadline && (
                      <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-6 rounded-2xl border border-green-200">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                            <CheckCircleIcon className="w-5 h-5 text-green-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-green-800">Offer Received</h3>
                        </div>
                        <p className="text-green-700">{selectedJob.offerDeadline}</p>
                      </div>
                    )}

                    {selectedJob.rejectionReason && (
                      <div className="bg-gradient-to-br from-red-50 to-red-100/50 p-6 rounded-2xl border border-red-200">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                            <XCircleIcon className="w-5 h-5 text-red-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-red-800">Application Status</h3>
                        </div>
                        <p className="text-red-700">{selectedJob.rejectionReason}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};