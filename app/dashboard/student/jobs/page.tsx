"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JobCard } from "@/components/dashboard/student/job-card";
import { SearchIcon } from "@/components/icons";

// Mock jobs data
const mockJobs = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    salary: "$120k - $150k",
    type: "Full-time",
    logo: "https://i.pravatar.cc/48?u=tech1",
    posted: "2 days ago",
  },
  {
    id: "2",
    title: "UX Designer",
    company: "Design Studio",
    location: "Remote",
    salary: "$90k - $110k",
    type: "Contract",
    logo: "https://i.pravatar.cc/48?u=design2",
    posted: "5 days ago",
  },
  {
    id: "3",
    title: "Backend Engineer",
    company: "DataSystems",
    location: "New York, NY",
    salary: "$130k - $160k",
    type: "Full-time",
    logo: "https://i.pravatar.cc/48?u=data3",
    posted: "1 week ago",
  },
  {
    id: "4",
    title: "Product Manager",
    company: "Innovate Inc",
    location: "Boston, MA",
    salary: "$140k - $170k",
    type: "Full-time",
    logo: "https://i.pravatar.cc/48?u=pm4",
    posted: "3 days ago",
  },
  {
    id: "5",
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Remote",
    salary: "$115k - $145k",
    type: "Full-time",
    logo: "https://i.pravatar.cc/48?u=devops5",
    posted: "Just now",
  },
  {
    id: "6",
    title: "Mobile Developer",
    company: "AppWorks",
    location: "Seattle, WA",
    salary: "$110k - $140k",
    type: "Full-time",
    logo: "https://i.pravatar.cc/48?u=mobile6",
    posted: "4 days ago",
  },
  {
    id: "7",
    title: "Data Scientist",
    company: "AnalyticsPro",
    location: "Chicago, IL",
    salary: "$125k - $155k",
    type: "Full-time",
    logo: "https://i.pravatar.cc/48?u=data7",
    posted: "1 week ago",
  },
  {
    id: "8",
    title: "Technical Writer",
    company: "DocuTech",
    location: "Remote",
    salary: "$80k - $100k",
    type: "Contract",
    logo: "https://i.pravatar.cc/48?u=writer8",
    posted: "3 days ago",
  },
];

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  
  // Filter jobs based on search query and filters
  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           job.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = locationFilter ? job.location.includes(locationFilter) : true;
    const matchesType = typeFilter ? job.type === typeFilter : true;
    
    return matchesSearch && matchesLocation && matchesType;
  });
  
  return (
    <div className="space-y-8 animate-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Find Jobs</h2>
        <p className="text-muted-foreground">
          Discover opportunities and earn points with each application.
        </p>
      </div>
      
      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-2">
              <Label htmlFor="search">Search Jobs</Label>
              <div className="relative mt-1">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search job title or company..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger id="location" className="mt-1">
                  <SelectValue placeholder="Any location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any location</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="San Francisco">San Francisco</SelectItem>
                  <SelectItem value="New York">New York</SelectItem>
                  <SelectItem value="Boston">Boston</SelectItem>
                  <SelectItem value="Seattle">Seattle</SelectItem>
                  <SelectItem value="Chicago">Chicago</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="type">Job Type</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger id="type" className="mt-1">
                  <SelectValue placeholder="Any type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any type</SelectItem>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Job Listings */}
      <Tabs defaultValue="recommended">
        <TabsList>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="recent">Recently Posted</TabsTrigger>
          <TabsTrigger value="applied">Applied ({2})</TabsTrigger>
          <TabsTrigger value="saved">Saved ({0})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recommended" className="mt-6">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {filteredJobs.slice(0, 6).map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          
          {filteredJobs.length > 6 && (
            <div className="mt-8 text-center">
              <Button variant="outline">
                Load More Jobs
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="recent" className="mt-6">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {filteredJobs
              .sort((a, b) => a.posted === "Just now" ? -1 : b.posted === "Just now" ? 1 : 0)
              .slice(0, 6)
              .map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
          </div>
          
          {filteredJobs.length > 6 && (
            <div className="mt-8 text-center">
              <Button variant="outline">
                Load More Jobs
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="applied" className="mt-6">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {filteredJobs.slice(0, 2).map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="saved" className="mt-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-3 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-1">No saved jobs yet</h3>
            <p className="text-muted-foreground max-w-sm mb-4">
              Click the bookmark icon on any job to save it for later.
            </p>
            <Button variant="outline" size="sm">
              Browse Jobs
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}