"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

// Mock job data
const mockJobs = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $150k",
    applicants: 12,
    status: "active",
    posted: "2 days ago",
    expires: "28 days left",
  },
  {
    id: "2",
    title: "UX Designer",
    company: "Design Studio",
    location: "Remote",
    type: "Contract",
    salary: "$90k - $110k",
    applicants: 8,
    status: "active",
    posted: "5 days ago",
    expires: "25 days left",
  },
  {
    id: "3",
    title: "Backend Engineer",
    company: "DataSystems",
    location: "New York, NY",
    type: "Full-time",
    salary: "$130k - $160k",
    applicants: 5,
    status: "active",
    posted: "1 week ago",
    expires: "23 days left",
  },
  {
    id: "4",
    title: "Product Manager",
    company: "Innovate Inc",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$140k - $170k",
    applicants: 15,
    status: "active",
    posted: "3 days ago",
    expires: "27 days left",
  },
  {
    id: "5",
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Remote",
    type: "Full-time",
    salary: "$115k - $145k",
    applicants: 3,
    status: "draft",
    posted: "Not published",
    expires: "N/A",
  },
];

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  // Filter jobs based on search query
  const filteredJobs = mockJobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const activeJobs = filteredJobs.filter(job => job.status === "active");
  const draftJobs = filteredJobs.filter(job => job.status === "draft");
  
  const handleDeleteJob = (jobId: string) => {
    toast({
      title: "Job Deleted",
      description: "The job posting has been deleted successfully.",
    });
  };
  
  const handleCloseJob = (jobId: string) => {
    toast({
      title: "Job Closed",
      description: "The job posting has been closed and is no longer accepting applications.",
    });
  };
  
  const renderJobCard = (job: typeof mockJobs[0]) => (
    <Card key={job.id} className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p className="text-muted-foreground">{job.company} • {job.location}</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
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
                    className="h-4 w-4"
                  >
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Link href={`/dashboard/recruiter/jobs/${job.id}`} className="w-full">
                    View Details
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={`/dashboard/recruiter/jobs/${job.id}/edit`} className="w-full">
                    Edit Job
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleCloseJob(job.id)}>
                  Close Job
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleDeleteJob(job.id)}
                  className="text-destructive focus:text-destructive"
                >
                  Delete Job
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">{job.type}</Badge>
            <Badge variant="outline">{job.salary}</Badge>
            {job.status === "active" ? (
              <Badge variant="default" className="bg-green-600">Active</Badge>
            ) : (
              <Badge variant="outline">Draft</Badge>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Posted</p>
              <p className="font-medium">{job.posted}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Expires</p>
              <p className="font-medium">{job.expires}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Applicants</p>
              <p className="font-medium">{job.applicants}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-muted/40 p-4 flex justify-between items-center">
          <Link href={`/dashboard/recruiter/jobs/${job.id}/applicants`}>
            <Button variant="outline" size="sm">
              View Applicants
            </Button>
          </Link>
          
          {job.status === "draft" ? (
            <Button size="sm">Publish</Button>
          ) : (
            <Button variant="outline" size="sm">Boost Listing</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
  
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 animate-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Manage Jobs</h2>
          <p className="text-muted-foreground">
            View and manage your job listings
          </p>
        </div>
        <Link href="/dashboard/recruiter/post-job">
          <Button>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 mr-2" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Post New Job
          </Button>
        </Link>
      </div>
      
      <div className="mb-6">
        <Input
          placeholder="Search jobs by title, company, or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>
      
      <Tabs defaultValue="active">
        <TabsList className="mb-4">
          <TabsTrigger value="active">Active Jobs ({activeJobs.length})</TabsTrigger>
          <TabsTrigger value="draft">Drafts ({draftJobs.length})</TabsTrigger>
          <TabsTrigger value="closed">Closed (0)</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="mt-0">
          <div className="grid gap-4 md:grid-cols-2">
            {activeJobs.length > 0 ? (
              activeJobs.map(renderJobCard)
            ) : (
              <Card className="col-span-2">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="rounded-full bg-primary/10 p-3 mb-4">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-6 w-6 text-primary" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                      <line x1="16" x2="16" y1="2" y2="6" />
                      <line x1="8" x2="8" y1="2" y2="6" />
                      <line x1="3" x2="21" y1="10" y2="10" />
                      <path d="M8 14h.01" />
                      <path d="M12 14h.01" />
                      <path d="M16 14h.01" />
                      <path d="M8 18h.01" />
                      <path d="M12 18h.01" />
                      <path d="M16 18h.01" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">No Active Jobs Found</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    You don't have any active job listings matching your search.
                  </p>
                  <Link href="/dashboard/recruiter/post-job">
                    <Button>Post a New Job</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="draft" className="mt-0">
          <div className="grid gap-4 md:grid-cols-2">
            {draftJobs.length > 0 ? (
              draftJobs.map(renderJobCard)
            ) : (
              <Card className="col-span-2">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="rounded-full bg-primary/10 p-3 mb-4">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-6 w-6 text-primary" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">No Draft Jobs</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    You don't have any job drafts. Start creating a new job posting.
                  </p>
                  <Link href="/dashboard/recruiter/post-job">
                    <Button>Create Draft</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="closed" className="mt-0">
          <Card className="col-span-2">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 text-primary" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <line x1="9" x2="15" y1="15" y2="9" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">No Closed Jobs</h3>
              <p className="text-muted-foreground text-center">
                You don't have any closed job listings yet.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
