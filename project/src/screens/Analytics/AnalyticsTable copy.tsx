import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BellIcon,
  CalendarIcon,
  ChevronDownIcon,
  ClockIcon,
  DownloadIcon,
  ExternalLinkIcon,
  FilterIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SearchIcon,
  SlidersIcon,
  UserIcon,
} from "lucide-react";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { studentProfiles } from "../../data/studentProfiles";

// Sample job application data
const jobApplications = [
  {
    id: "app1",
    student: {
      id: "10105518",
      name: "Alex Smith",
      avatar: "AS",
      color: "bg-gradient-to-br from-blue-500 to-blue-700",
      program: "Computer Science"
    },
    company: {
      name: "Google",
      logo: "https://logo.clearbit.com/google.com"
    },
    position: "Frontend Developer",
    status: { label: "Applied", color: "blue" },
    appliedDate: "2024-05-15",
    updatedDate: "2024-05-16",
    salary: "€65,000 - €80,000",
    nextAction: "Follow up on May 22",
    nextActionDate: "2024-05-22",
    priority: "high",
    location: "Paris, France",
    type: "Full-time",
    description: "Applied for frontend developer position focusing on React and TypeScript skills.",
    documents: {
      cv: "CV_Alex_Google.pdf",
      coverLetter: "CL_Alex_Google.pdf"
    }
  },
  {
    id: "app2",
    student: {
      id: "10105519",
      name: "Emma Johnson",
      avatar: "EJ",
      color: "bg-gradient-to-br from-purple-500 to-purple-700",
      program: "Business Administration"
    },
    company: {
      name: "Microsoft",
      logo: "https://logo.clearbit.com/microsoft.com"
    },
    position: "Product Manager",
    status: { label: "Interview", color: "orange" },
    appliedDate: "2024-05-10",
    updatedDate: "2024-05-17",
    salary: "€70,000 - €85,000",
    nextAction: "Technical interview on May 20",
    nextActionDate: "2024-05-20",
    priority: "high",
    location: "London, UK",
    type: "Full-time",
    description: "Scheduled for second round interview with the product team.",
    documents: {
      cv: "CV_Emma_Microsoft.pdf",
      coverLetter: "CL_Emma_Microsoft.pdf"
    }
  },
  {
    id: "app3",
    student: {
      id: "10105520",
      name: "Michael Chen",
      avatar: "MC",
      color: "bg-gradient-to-br from-red-500 to-red-700",
      program: "Data Science"
    },
    company: {
      name: "Apple",
      logo: "https://logo.clearbit.com/apple.com"
    },
    position: "Software Engineer",
    status: { label: "Offer", color: "green" },
    appliedDate: "2024-04-28",
    updatedDate: "2024-05-15",
    salary: "€85,000 - €95,000",
    nextAction: "Respond to offer by May 25",
    nextActionDate: "2024-05-25",
    priority: "critical",
    location: "Paris, France",
    type: "Full-time",
    description: "Received offer letter with competitive compensation package.",
    documents: {
      cv: "CV_Michael_Apple.pdf",
      coverLetter: "CL_Michael_Apple.pdf"
    }
  },
  {
    id: "app4",
    student: {
      id: "10105518",
      name: "Alex Smith",
      avatar: "AS",
      color: "bg-gradient-to-br from-blue-500 to-blue-700",
      program: "Computer Science"
    },
    company: {
      name: "Amazon",
      logo: "https://logo.clearbit.com/amazon.com"
    },
    position: "Backend Developer",
    status: { label: "Rejected", color: "red" },
    appliedDate: "2024-04-20",
    updatedDate: "2024-05-10",
    salary: "€70,000 - €85,000",
    nextAction: "Send follow-up for feedback",
    nextActionDate: "2024-05-20",
    priority: "low",
    location: "Berlin, Germany",
    type: "Full-time",
    description: "Application rejected after technical assessment.",
    documents: {
      cv: "CV_Alex_Amazon.pdf",
      coverLetter: "CL_Alex_Amazon.pdf"
    }
  },
  {
    id: "app5",
    student: {
      id: "10105519",
      name: "Emma Johnson",
      avatar: "EJ",
      color: "bg-gradient-to-br from-purple-500 to-purple-700",
      program: "Business Administration"
    },
    company: {
      name: "Netflix",
      logo: "https://logo.clearbit.com/netflix.com"
    },
    position: "Business Analyst",
    status: { label: "Applied", color: "blue" },
    appliedDate: "2024-05-12",
    updatedDate: "2024-05-12",
    salary: "€60,000 - €75,000",
    nextAction: "Follow up on May 26",
    nextActionDate: "2024-05-26",
    priority: "medium",
    location: "Amsterdam, Netherlands",
    type: "Full-time",
    description: "Applied with customized resume highlighting business analysis skills.",
    documents: {
      cv: "CV_Emma_Netflix.pdf",
      coverLetter: "CL_Emma_Netflix.pdf"
    }
  },
  {
    id: "app6",
    student: {
      id: "10105520",
      name: "Michael Chen",
      avatar: "MC",
      color: "bg-gradient-to-br from-red-500 to-red-700",
      program: "Data Science"
    },
    company: {
      name: "Facebook",
      logo: "https://logo.clearbit.com/facebook.com"
    },
    position: "Data Scientist",
    status: { label: "Interview", color: "orange" },
    appliedDate: "2024-05-05",
    updatedDate: "2024-05-14",
    salary: "€75,000 - €90,000",
    nextAction: "Final interview on May 21",
    nextActionDate: "2024-05-21",
    priority: "high",
    location: "Dublin, Ireland",
    type: "Full-time",
    description: "Passed initial screening and technical assessment, scheduled for final round.",
    documents: {
      cv: "CV_Michael_Facebook.pdf",
      coverLetter: "CL_Michael_Facebook.pdf"
    }
  },
  {
    id: "app7",
    student: {
      id: "10105518",
      name: "Alex Smith",
      avatar: "AS",
      color: "bg-gradient-to-br from-blue-500 to-blue-700",
      program: "Computer Science"
    },
    company: {
      name: "Spotify",
      logo: "https://logo.clearbit.com/spotify.com"
    },
    position: "Mobile Developer",
    status: { label: "Applied", color: "blue" },
    appliedDate: "2024-05-14",
    updatedDate: "2024-05-14",
    salary: "€60,000 - €75,000",
    nextAction: "Follow up on May 28",
    nextActionDate: "2024-05-28",
    priority: "medium",
    location: "Stockholm, Sweden",
    type: "Full-time",
    description: "Applied with portfolio showcasing mobile development projects.",
    documents: {
      cv: "CV_Alex_Spotify.pdf",
      coverLetter: "CL_Alex_Spotify.pdf"
    }
  },
  {
    id: "app8",
    student: {
      id: "10105519",
      name: "Emma Johnson",
      avatar: "EJ",
      color: "bg-gradient-to-br from-purple-500 to-purple-700",
      program: "Business Administration"
    },
    company: {
      name: "Apple",
      logo: "https://logo.clearbit.com/apple.com"
    },
    position: "Marketing Specialist",
    status: { label: "Offer", color: "green" },
    appliedDate: "2024-04-15",
    updatedDate: "2024-05-12",
    salary: "€65,000 - €80,000",
    nextAction: "Respond to offer by May 22",
    nextActionDate: "2024-05-22",
    priority: "critical",
    location: "London, UK",
    type: "Full-time",
    description: "Received offer after successful interview rounds.",
    documents: {
      cv: "CV_Emma_Apple.pdf",
      coverLetter: "CL_Emma_Apple.pdf"
    }
  },
  {
    id: "app9",
    student: {
      id: "10105520",
      name: "Michael Chen",
      avatar: "MC",
      color: "bg-gradient-to-br from-red-500 to-red-700",
      program: "Data Science"
    },
    company: {
      name: "IBM",
      logo: "https://logo.clearbit.com/ibm.com"
    },
    position: "Machine Learning Engineer",
    status: { label: "Rejected", color: "red" },
    appliedDate: "2024-04-10",
    updatedDate: "2024-05-05",
    salary: "€80,000 - €95,000",
    nextAction: "Request feedback",
    nextActionDate: "2024-05-19",
    priority: "low",
    location: "Zurich, Switzerland",
    type: "Full-time",
    description: "Application rejected after technical interview.",
    documents: {
      cv: "CV_Michael_IBM.pdf",
      coverLetter: "CL_Michael_IBM.pdf"
    }
  },
  {
    id: "app10",
    student: {
      id: "10105518",
      name: "Alex Smith",
      avatar: "AS",
      color: "bg-gradient-to-br from-blue-500 to-blue-700",
      program: "Computer Science"
    },
    company: {
      name: "Airbnb",
      logo: "https://logo.clearbit.com/airbnb.com"
    },
    position: "Full Stack Developer",
    status: { label: "Interview", color: "orange" },
    appliedDate: "2024-05-01",
    updatedDate: "2024-05-15",
    salary: "€70,000 - €85,000",
    nextAction: "Technical interview on May 23",
    nextActionDate: "2024-05-23",
    priority: "high",
    location: "Remote",
    type: "Full-time",
    description: "Passed initial screening, scheduled for technical interview.",
    documents: {
      cv: "CV_Alex_Airbnb.pdf",
      coverLetter: "CL_Alex_Airbnb.pdf"
    }
  }
];

// Status color mapping
const statusColors = {
  blue: "bg-blue-100 text-blue-700 border-blue-200",
  orange: "bg-orange-100 text-orange-700 border-orange-200",
  green: "bg-green-100 text-green-700 border-green-200",
  red: "bg-red-100 text-red-700 border-red-200"
};

// Priority color mapping
const priorityColors = {
  low: "bg-slate-100 text-slate-700 border-slate-200",
  medium: "bg-amber-100 text-amber-700 border-amber-200",
  high: "bg-orange-100 text-orange-700 border-orange-200",
  critical: "bg-red-100 text-red-700 border-red-200"
};

export const AnalyticsTable = (): JSX.Element => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState(jobApplications);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredApplications, setFilteredApplications] = useState(applications);
  const [sortField, setSortField] = useState<string>("nextActionDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<any | null>(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isEditingCell, setIsEditingCell] = useState<{rowId: string, field: string} | null>(null);
  const [editValue, setEditValue] = useState("");
  
  const tableRef = useRef<HTMLDivElement>(null);
  const detailPanelRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter applications based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredApplications(applications);
      setSearchSuggestions([]);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = applications.filter(app => 
      app.student.name.toLowerCase().includes(query) ||
      app.company.name.toLowerCase().includes(query) ||
      app.position.toLowerCase().includes(query) ||
      app.status.label.toLowerCase().includes(query) ||
      app.location.toLowerCase().includes(query)
    );
    
    setFilteredApplications(filtered);
    
    // Generate search suggestions
    const suggestions = [
      ...new Set([
        ...applications.map(app => app.student.name),
        ...applications.map(app => app.company.name),
        ...applications.map(app => app.position),
        ...applications.map(app => app.status.label),
        ...applications.map(app => app.location)
      ])
    ].filter(item => 
      item.toLowerCase().includes(query) && 
      item.toLowerCase() !== query
    ).slice(0, 5);
    
    setSearchSuggestions(suggestions);
  }, [searchQuery, applications]);

  // Sort applications
  useEffect(() => {
    const sorted = [...filteredApplications].sort((a, b) => {
      let aValue, bValue;
      
      // Handle nested properties
      if (sortField === "student.name") {
        aValue = a.student.name;
        bValue = b.student.name;
      } else if (sortField === "company.name") {
        aValue = a.company.name;
        bValue = b.company.name;
      } else if (sortField === "status.label") {
        aValue = a.status.label;
        bValue = b.status.label;
      } else {
        aValue = a[sortField];
        bValue = b[sortField];
      }
      
      // Handle date fields
      if (sortField.includes("Date")) {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }
      
      // Compare values based on sort direction
      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    setFilteredApplications(sorted);
  }, [sortField, sortDirection]);

  // Handle click outside detail panel to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        detailPanelRef.current && 
        !detailPanelRef.current.contains(event.target as Node) &&
        event.target instanceof Node &&
        !tableRef.current?.contains(event.target)
      ) {
        setShowDetailPanel(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true);
  };

  // Handle search suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    
    // Focus back on search input
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Handle sort click
  const handleSortClick = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Handle row click to show details
  const handleRowClick = (application: any) => {
    setSelectedApplication(application);
    setShowDetailPanel(true);
  };

  // Handle double click to edit cell
  const handleCellDoubleClick = (application: any, field: string) => {
    // Only allow editing certain fields
    if (["nextAction", "salary", "priority"].includes(field)) {
      setIsEditingCell({ rowId: application.id, field });
      setEditValue(application[field]);
    }
  };

  // Handle edit value change
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  // Handle edit save
  const handleEditSave = () => {
    if (!isEditingCell) return;
    
    const { rowId, field } = isEditingCell;
    
    // Update application
    const updatedApplications = applications.map(app => {
      if (app.id === rowId) {
        return { ...app, [field]: editValue };
      }
      return app;
    });
    
    setApplications(updatedApplications);
    setIsEditingCell(null);
  };

  // Handle edit cancel
  const handleEditCancel = () => {
    setIsEditingCell(null);
  };

  // Handle edit key press
  const handleEditKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleEditSave();
    } else if (e.key === "Escape") {
      handleEditCancel();
    }
  };

  // Handle add new job
  const handleAddJob = () => {
    console.log("Add new job");
    // In a real app, this would open a modal to add a new job
  };

  // Handle export data
  const handleExportData = () => {
    console.log("Exporting data");
    // In a real app, this would trigger a data export process
  };

  // Handle filter toggle
  const handleFilterToggle = () => {
    setShowFilters(!showFilters);
  };

  // Handle view student profile
  const handleViewStudentProfile = (studentId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/student-education/${studentId}`);
  };

  // Get status counts
  const statusCounts = {
    applied: applications.filter(app => app.status.label === "Applied").length,
    interview: applications.filter(app => app.status.label === "Interview").length,
    offer: applications.filter(app => app.status.label === "Offer").length,
    rejected: applications.filter(app => app.status.label === "Rejected").length
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    }).format(date);
  };

  // Check if a date is upcoming (within 3 days)
  const isUpcoming = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 3;
  };

  // Get sort icon for column
  const getSortIcon = (field: string) => {
    if (sortField !== field) {
      return (
        <div className="w-4 h-4 opacity-30 flex flex-col items-center justify-center">
          <ArrowUpIcon className="w-3 h-3 -mb-1" />
          <ArrowDownIcon className="w-3 h-3 -mt-1" />
        </div>
      );
    }
    
    return sortDirection === "asc" 
      ? <ArrowUpIcon className="w-4 h-4 text-blue-500" /> 
      : <ArrowDownIcon className="w-4 h-4 text-blue-500" />;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header with KPIs and actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-slate-800">Applications</h1>
          
          {/* Compact KPIs */}
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium">Applied: <span className="font-bold">{statusCounts.applied}</span></span>
            </div>
            <div className="w-px h-6 bg-slate-200"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm font-medium">Interview: <span className="font-bold">{statusCounts.interview}</span></span>
            </div>
            <div className="w-px h-6 bg-slate-200"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">Offer: <span className="font-bold">{statusCounts.offer}</span></span>
            </div>
            <div className="w-px h-6 bg-slate-200"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm font-medium">Rejected: <span className="font-bold">{statusCounts.rejected}</span></span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Search with suggestions */}
          <div className="relative">
            <div className="flex items-center h-10 w-64 bg-white rounded-lg border border-slate-200 px-3 focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500">
              <SearchIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search applications..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="flex-1 border-0 bg-transparent px-2 py-1 text-sm focus:outline-none focus:ring-0"
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onFocus={() => searchQuery && setShowSuggestions(true)}
              />
              {searchQuery && (
                <button 
                  className="text-slate-400 hover:text-slate-600"
                  onClick={() => setSearchQuery("")}
                >
                  <XIcon className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {/* Search suggestions */}
            {showSuggestions && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-lg border border-slate-200 shadow-lg z-10">
                {searchSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 hover:bg-slate-50 cursor-pointer text-sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Filter button */}
          <Button
            variant="outline"
            size="sm"
            className="h-10 gap-2"
            onClick={handleFilterToggle}
          >
            <FilterIcon className="w-4 h-4" />
            <span>Filter</span>
            <ChevronDownIcon className="w-4 h-4" />
          </Button>
          
          {/* Export button */}
          <Button
            variant="outline"
            size="sm"
            className="h-10 gap-2"
            onClick={handleExportData}
          >
            <DownloadIcon className="w-4 h-4" />
            <span>Export</span>
          </Button>
          
          {/* Add job button */}
          <Button
            size="sm"
            className="h-10 gap-2 bg-blue-600 hover:bg-blue-700"
            onClick={handleAddJob}
          >
            <PlusIcon className="w-4 h-4" />
            <span>Add Job</span>
          </Button>
        </div>
      </div>
      
      {/* Filter panel (conditionally rendered) */}
      {showFilters && (
        <Card className="p-4 mb-4 grid grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-medium text-slate-500 mb-1 block">Status</label>
            <select className="w-full h-9 rounded-md border border-slate-200 bg-white px-3 py-1 text-sm">
              <option value="">All Statuses</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          
          <div>
            <label className="text-xs font-medium text-slate-500 mb-1 block">Student</label>
            <select className="w-full h-9 rounded-md border border-slate-200 bg-white px-3 py-1 text-sm">
              <option value="">All Students</option>
              <option value="Alex Smith">Alex Smith</option>
              <option value="Emma Johnson">Emma Johnson</option>
              <option value="Michael Chen">Michael Chen</option>
            </select>
          </div>
          
          <div>
            <label className="text-xs font-medium text-slate-500 mb-1 block">Priority</label>
            <select className="w-full h-9 rounded-md border border-slate-200 bg-white px-3 py-1 text-sm">
              <option value="">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
          
          <div>
            <label className="text-xs font-medium text-slate-500 mb-1 block">Date Range</label>
            <div className="flex gap-2">
              <Input 
                type="date" 
                className="h-9 text-sm" 
                placeholder="From"
              />
              <Input 
                type="date" 
                className="h-9 text-sm" 
                placeholder="To"
              />
            </div>
          </div>
          
          <div className="col-span-4 flex justify-end gap-2">
            <Button variant="outline" size="sm">Reset</Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Apply Filters</Button>
          </div>
        </Card>
      )}
      
      {/* Main table */}
      <div className="flex-1 overflow-hidden flex">
        <div 
          ref={tableRef}
          className="flex-1 overflow-auto rounded-lg border border-slate-200 bg-white"
        >
          <Table>
            <TableHeader className="bg-slate-50 sticky top-0 z-10">
              <TableRow className="hover:bg-slate-50">
                <TableHead className="w-[250px] font-semibold text-xs">
                  <button 
                    className="flex items-center gap-1 hover:text-blue-600"
                    onClick={() => handleSortClick("student.name")}
                  >
                    Student {getSortIcon("student.name")}
                  </button>
                </TableHead>
                <TableHead className="w-[180px] font-semibold text-xs">
                  <button 
                    className="flex items-center gap-1 hover:text-blue-600"
                    onClick={() => handleSortClick("company.name")}
                  >
                    Company {getSortIcon("company.name")}
                  </button>
                </TableHead>
                <TableHead className="w-[180px] font-semibold text-xs">
                  <button 
                    className="flex items-center gap-1 hover:text-blue-600"
                    onClick={() => handleSortClick("position")}
                  >
                    Position {getSortIcon("position")}
                  </button>
                </TableHead>
                <TableHead className="w-[120px] font-semibold text-xs">
                  <button 
                    className="flex items-center gap-1 hover:text-blue-600"
                    onClick={() => handleSortClick("status.label")}
                  >
                    Status {getSortIcon("status.label")}
                  </button>
                </TableHead>
                <TableHead className="w-[120px] font-semibold text-xs">
                  <button 
                    className="flex items-center gap-1 hover:text-blue-600"
                    onClick={() => handleSortClick("appliedDate")}
                  >
                    Applied {getSortIcon("appliedDate")}
                  </button>
                </TableHead>
                <TableHead className="w-[150px] font-semibold text-xs">
                  <button 
                    className="flex items-center gap-1 hover:text-blue-600"
                    onClick={() => handleSortClick("salary")}
                  >
                    Salary {getSortIcon("salary")}
                  </button>
                </TableHead>
                <TableHead className="w-[200px] font-semibold text-xs">
                  <button 
                    className="flex items-center gap-1 hover:text-blue-600"
                    onClick={() => handleSortClick("nextActionDate")}
                  >
                    Next Action {getSortIcon("nextActionDate")}
                  </button>
                </TableHead>
                <TableHead className="w-[100px] font-semibold text-xs">
                  <button 
                    className="flex items-center gap-1 hover:text-blue-600"
                    onClick={() => handleSortClick("priority")}
                  >
                    Priority {getSortIcon("priority")}
                  </button>
                </TableHead>
                <TableHead className="w-[80px] font-semibold text-xs text-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((application) => (
                <TableRow 
                  key={application.id}
                  className="hover:bg-slate-50 cursor-pointer"
                  onClick={() => handleRowClick(application)}
                >
                  {/* Student */}
                  <TableCell className="py-2">
                    <div className="flex items-center gap-3">
                      <Avatar
                        className={`w-8 h-8 rounded-md ${application.student.color}`}
                      >
                        <AvatarFallback className="text-white text-xs font-medium">
                          {application.student.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm text-slate-800">
                          {application.student.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {application.student.program}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ml-auto"
                        onClick={(e) => handleViewStudentProfile(application.student.id, e)}
                      >
                        <ExternalLinkIcon className="h-3 w-3 text-slate-400" />
                      </Button>
                    </div>
                  </TableCell>
                  
                  {/* Company */}
                  <TableCell className="py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-slate-100 rounded-md flex items-center justify-center overflow-hidden">
                        <img 
                          src={application.company.logo} 
                          alt={application.company.name}
                          className="w-4 h-4 object-contain"
                          onError={(e) => {
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${application.company.name}&background=3b82f6&color=fff&size=16`;
                          }}
                        />
                      </div>
                      <span className="font-medium text-sm">{application.company.name}</span>
                    </div>
                  </TableCell>
                  
                  {/* Position */}
                  <TableCell className="py-2">
                    <div className="text-sm font-medium">{application.position}</div>
                    <div className="text-xs text-slate-500">{application.location}</div>
                  </TableCell>
                  
                  {/* Status */}
                  <TableCell className="py-2">
                    <Badge 
                      className={`px-2 py-1 text-xs font-medium ${statusColors[application.status.color]}`}
                    >
                      {application.status.label}
                    </Badge>
                  </TableCell>
                  
                  {/* Applied Date */}
                  <TableCell className="py-2">
                    <div className="text-sm">{formatDate(application.appliedDate)}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                      <ClockIcon className="w-3 h-3" />
                      Updated {formatDate(application.updatedDate)}
                    </div>
                  </TableCell>
                  
                  {/* Salary */}
                  <TableCell className="py-2">
                    {isEditingCell?.rowId === application.id && isEditingCell?.field === "salary" ? (
                      <Input
                        value={editValue}
                        onChange={handleEditChange}
                        onBlur={handleEditSave}
                        onKeyDown={handleEditKeyPress}
                        className="h-7 text-xs"
                        autoFocus
                      />
                    ) : (
                      <div 
                        className="text-sm font-medium text-emerald-600"
                        onDoubleClick={() => handleCellDoubleClick(application, "salary")}
                      >
                        {application.salary}
                      </div>
                    )}
                  </TableCell>
                  
                  {/* Next Action */}
                  <TableCell className="py-2">
                    {isEditingCell?.rowId === application.id && isEditingCell?.field === "nextAction" ? (
                      <Input
                        value={editValue}
                        onChange={handleEditChange}
                        onBlur={handleEditSave}
                        onKeyDown={handleEditKeyPress}
                        className="h-7 text-xs"
                        autoFocus
                      />
                    ) : (
                      <div 
                        className={`text-sm ${isUpcoming(application.nextActionDate) ? 'font-medium text-blue-600' : ''}`}
                        onDoubleClick={() => handleCellDoubleClick(application, "nextAction")}
                      >
                        {application.nextAction}
                        <div className="text-xs text-slate-500 flex items-center gap-1">
                          <CalendarIcon className="w-3 h-3" />
                          {formatDate(application.nextActionDate)}
                        </div>
                      </div>
                    )}
                  </TableCell>
                  
                  {/* Priority */}
                  <TableCell className="py-2">
                    {isEditingCell?.rowId === application.id && isEditingCell?.field === "priority" ? (
                      <select
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleEditSave}
                        className="h-7 text-xs border border-slate-200 rounded-md"
                        autoFocus
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="critical">Critical</option>
                      </select>
                    ) : (
                      <Badge 
                        className={`px-2 py-1 text-xs font-medium ${priorityColors[application.priority as keyof typeof priorityColors]}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCellDoubleClick(application, "priority");
                        }}
                      >
                        {application.priority.charAt(0).toUpperCase() + application.priority.slice(1)}
                      </Badge>
                    )}
                  </TableCell>
                  
                  {/* Actions */}
                  <TableCell className="py-2 text-center">
                    <div className="flex justify-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Show dropdown menu
                        }}
                      >
                        <MoreHorizontalIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredApplications.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="h-32 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <SearchIcon className="h-8 w-8 text-slate-300 mb-2" />
                      <p className="text-slate-500 font-medium">No applications found</p>
                      <p className="text-slate-400 text-sm">Try adjusting your search or filters</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Detail panel (slide-in from right) */}
        {showDetailPanel && selectedApplication && (
          <div 
            ref={detailPanelRef}
            className="w-96 border-l border-slate-200 bg-white overflow-auto animate-slide-in"
          >
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-semibold text-slate-800">Application Details</h3>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 rounded-full"
                onClick={() => setShowDetailPanel(false)}
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="p-4">
              {/* Student info */}
              <div className="mb-6">
                <div className="text-xs font-medium text-slate-500 mb-2">STUDENT</div>
                <div className="flex items-center gap-3">
                  <Avatar
                    className={`w-10 h-10 rounded-lg ${selectedApplication.student.color}`}
                  >
                    <AvatarFallback className="text-white text-sm font-medium">
                      {selectedApplication.student.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-slate-800">
                      {selectedApplication.student.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {selectedApplication.student.program}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto h-8 text-xs"
                    onClick={() => handleViewStudentProfile(selectedApplication.student.id, new MouseEvent('click') as any)}
                  >
                    <UserIcon className="h-3 w-3 mr-1" />
                    View Profile
                  </Button>
                </div>
              </div>
              
              {/* Application details */}
              <div className="space-y-4">
                {/* Company and position */}
                <div>
                  <div className="text-xs font-medium text-slate-500 mb-2">COMPANY & POSITION</div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center overflow-hidden shadow-sm">
                      <img 
                        src={selectedApplication.company.logo} 
                        alt={selectedApplication.company.name}
                        className="w-6 h-6 object-contain"
                        onError={(e) => {
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${selectedApplication.company.name}&background=3b82f6&color=fff&size=24`;
                        }}
                      />
                    </div>
                    <div>
                      <div className="font-medium text-slate-800">
                        {selectedApplication.position}
                      </div>
                      <div className="text-xs text-slate-500">
                        {selectedApplication.company.name} • {selectedApplication.location}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Status and dates */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs font-medium text-slate-500 mb-2">STATUS</div>
                    <Badge 
                      className={`px-2 py-1 text-xs font-medium ${statusColors[selectedApplication.status.color]}`}
                    >
                      {selectedApplication.status.label}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-500 mb-2">APPLIED ON</div>
                    <div className="text-sm">{formatDate(selectedApplication.appliedDate)}</div>
                  </div>
                </div>
                
                {/* Salary and type */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs font-medium text-slate-500 mb-2">SALARY</div>
                    <div className="text-sm font-medium text-emerald-600">{selectedApplication.salary}</div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-500 mb-2">TYPE</div>
                    <div className="text-sm">{selectedApplication.type}</div>
                  </div>
                </div>
                
                {/* Description */}
                <div>
                  <div className="text-xs font-medium text-slate-500 mb-2">DESCRIPTION</div>
                  <div className="text-sm text-slate-700 p-3 bg-slate-50 rounded-lg">
                    {selectedApplication.description}
                  </div>
                </div>
                
                {/* Next action */}
                <div>
                  <div className="text-xs font-medium text-slate-500 mb-2">NEXT ACTION</div>
                  <div className={`text-sm p-3 rounded-lg ${
                    isUpcoming(selectedApplication.nextActionDate) 
                      ? 'bg-blue-50 text-blue-700 font-medium' 
                      : 'bg-slate-50 text-slate-700'
                  }`}>
                    {selectedApplication.nextAction}
                    <div className="text-xs mt-1 flex items-center gap-1">
                      <CalendarIcon className="w-3 h-3" />
                      {formatDate(selectedApplication.nextActionDate)}
                    </div>
                  </div>
                </div>
                
                {/* Documents */}
                <div>
                  <div className="text-xs font-medium text-slate-500 mb-2">DOCUMENTS</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                          <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <span className="text-sm">{selectedApplication.documents.cv}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <DownloadIcon className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
                          <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <span className="text-sm">{selectedApplication.documents.coverLetter}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <DownloadIcon className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="pt-4 flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                  >
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    Update Status
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};