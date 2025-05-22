"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock job data
const mockJobs = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechCorp",
    companyLogo: "https://i.pravatar.cc/150?u=techcorp",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$90,000 - $120,000",
    skills: ["React", "TypeScript", "CSS"],
    postedBy: {
      id: "6",
      name: "Alex Thompson",
      email: "alex@techcorp.com",
    },
    postedAt: "2 days ago",
    applicants: 12,
    status: "approved",
  },
  {
    id: "2",
    title: "UX Designer",
    company: "Design Studio",
    companyLogo: "https://i.pravatar.cc/150?u=designstudio",
    location: "Remote",
    type: "Contract",
    salary: "$70 - $90 per hour",
    skills: ["Figma", "User Research", "Prototyping"],
    postedBy: {
      id: "7",
      name: "Jessica Lee",
      email: "jessica@designstudio.com",
    },
    postedAt: "1 week ago",
    applicants: 8,
    status: "approved",
  },
  {
    id: "3",
    title: "Data Scientist",
    company: "DataSystems",
    companyLogo: "https://i.pravatar.cc/150?u=datasystems",
    location: "New York, NY",
    type: "Full-time",
    salary: "$110,000 - $150,000",
    skills: ["Python", "Machine Learning", "SQL"],
    postedBy: {
      id: "8",
      name: "Robert Wilson",
      email: "robert@datasystems.com",
    },
    postedAt: "3 days ago",
    applicants: 5,
    status: "pending",
  },
  {
    id: "4",
    title: "Backend Engineer",
    company: "TechCorp",
    companyLogo: "https://i.pravatar.cc/150?u=techcorp",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$100,000 - $130,000",
    skills: ["Node.js", "MongoDB", "AWS"],
    postedBy: {
      id: "6",
      name: "Alex Thompson",
      email: "alex@techcorp.com",
    },
    postedAt: "1 day ago",
    applicants: 3,
    status: "pending",
  },
  {
    id: "5",
    title: "Product Manager",
    company: "DataSystems",
    companyLogo: "https://i.pravatar.cc/150?u=datasystems",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    skills: ["Product Strategy", "Agile", "User Stories"],
    postedBy: {
      id: "8",
      name: "Robert Wilson",
      email: "robert@datasystems.com",
    },
    postedAt: "5 days ago",
    applicants: 7,
    status: "rejected",
  },
];

export default function AdminJobsPage() {
  const { toast } = useToast();
  const [jobs, setJobs] = useState(mockJobs);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<typeof mockJobs[0] | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  
  // Filter jobs based on search query and status
  const filteredJobs = (status: "approved" | "pending" | "rejected") => {
    return jobs
      .filter(job => job.status === status)
      .filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
  };
  
  const approvedJobs = filteredJobs("approved");
  const pendingJobs = filteredJobs("pending");
  const rejectedJobs = filteredJobs("rejected");
  
  const handleViewJob = (job: typeof mockJobs[0]) => {
    setSelectedJob(job);
    setIsViewDialogOpen(true);
  };
  
  const handleApproveJob = (jobId: string) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, status: "approved" } : job
    ));
    
    const job = jobs.find(j => j.id === jobId);
    
    toast({
      title: "Job Approved",
      description: `"${job?.title}" has been approved and is now visible to students.`,
    });
    
    setIsViewDialogOpen(false);
  };
  
  const handleRejectJob = (jobId: string) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, status: "rejected" } : job
    ));
    
    const job = jobs.find(j => j.id === jobId);
    
    toast({
      title: "Job Rejected",
      description: `"${job?.title}" has been rejected.`,
    });
    
    setIsViewDialogOpen(false);
  };
  
  const handleDeleteJob = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    
    setJobs(jobs.filter(job => job.id !== jobId));
    
    toast({
      title: "Job Deleted",
      description: `"${job?.title}" has been permanently deleted.`,
    });
    
    setIsViewDialogOpen(false);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-600">Approved</Badge>;
      case "pending":
        return <Badge variant="outline" className="text-amber-600 border-amber-600">Pending Review</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 animate-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Job Management</h2>
        <p className="text-muted-foreground">
          Review, approve, and manage job postings from recruiters
        </p>
      </div>
      
      <div className="mb-6">
        <Input
          placeholder="Search jobs by title, company, or skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>
      
      <Tabs defaultValue="pending">
        <TabsList className="mb-4">
          <TabsTrigger value="pending">Pending Review ({pendingJobs.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({approvedJobs.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedJobs.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="mt-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Pending Job Postings</CardTitle>
              <CardDescription>
                Review and approve job postings submitted by recruiters
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pendingJobs.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Posted By</TableHead>
                      <TableHead>Posted</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingJobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.title}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={job.companyLogo} alt={job.company} />
                              <AvatarFallback>{job.company.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {job.company}
                          </div>
                        </TableCell>
                        <TableCell>{job.postedBy.name}</TableCell>
                        <TableCell>{job.postedAt}</TableCell>
                        <TableCell>{getStatusBadge(job.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewJob(job)}
                            >
                              View
                            </Button>
                            <Button 
                              variant="default" 
                              size="sm"
                              onClick={() => handleApproveJob(job.id)}
                            >
                              Approve
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleRejectJob(job.id)}
                            >
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
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
                      <path d="m9 16 2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">No Pending Jobs</h3>
                  <p className="text-muted-foreground text-center">
                    There are no job postings waiting for review.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="approved" className="mt-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Approved Job Postings</CardTitle>
              <CardDescription>
                Jobs that have been approved and are visible to students
              </CardDescription>
            </CardHeader>
            <CardContent>
              {approvedJobs.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Posted By</TableHead>
                      <TableHead>Posted</TableHead>
                      <TableHead>Applicants</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {approvedJobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.title}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={job.companyLogo} alt={job.company} />
                              <AvatarFallback>{job.company.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {job.company}
                          </div>
                        </TableCell>
                        <TableCell>{job.postedBy.name}</TableCell>
                        <TableCell>{job.postedAt}</TableCell>
                        <TableCell>{job.applicants}</TableCell>
                        <TableCell className="text-right">
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
                              <DropdownMenuItem onClick={() => handleViewJob(job)}>
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleRejectJob(job.id)}>
                                Reject Job
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => handleDeleteJob(job.id)}
                                className="text-destructive focus:text-destructive"
                              >
                                Delete Job
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <h3 className="text-xl font-medium mb-2">No Approved Jobs</h3>
                  <p className="text-muted-foreground text-center">
                    There are no approved job postings.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rejected" className="mt-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Rejected Job Postings</CardTitle>
              <CardDescription>
                Jobs that have been rejected and are not visible to students
              </CardDescription>
            </CardHeader>
            <CardContent>
              {rejectedJobs.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Posted By</TableHead>
                      <TableHead>Posted</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rejectedJobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.title}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={job.companyLogo} alt={job.company} />
                              <AvatarFallback>{job.company.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {job.company}
                          </div>
                        </TableCell>
                        <TableCell>{job.postedBy.name}</TableCell>
                        <TableCell>{job.postedAt}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewJob(job)}
                            >
                              View
                            </Button>
                            <Button 
                              variant="default" 
                              size="sm"
                              onClick={() => handleApproveJob(job.id)}
                            >
                              Approve
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleDeleteJob(job.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <h3 className="text-xl font-medium mb-2">No Rejected Jobs</h3>
                  <p className="text-muted-foreground text-center">
                    There are no rejected job postings.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Job Details Dialog */}
      {selectedJob && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Job Details</DialogTitle>
              <DialogDescription>
                Review the complete job posting details
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedJob.companyLogo} alt={selectedJob.company} />
                  <AvatarFallback>{selectedJob.company.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{selectedJob.title}</h3>
                  <p className="text-muted-foreground">{selectedJob.company}</p>
                </div>
                {getStatusBadge(selectedJob.status)}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Location</h4>
                  <p>{selectedJob.location}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Job Type</h4>
                  <p>{selectedJob.type}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Salary Range</h4>
                  <p>{selectedJob.salary}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Posted</h4>
                  <p>{selectedJob.postedAt} by {selectedJob.postedBy.name}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Job Description</h4>
                <p className="text-sm">
                  This is a sample job description for the {selectedJob.title} position at {selectedJob.company}. 
                  The ideal candidate will have experience with {selectedJob.skills.join(", ")}.
                  This position offers competitive benefits and the opportunity to work on exciting projects.
                </p>
              </div>
            </div>
            
            <DialogFooter className="flex justify-between sm:justify-between">
              {selectedJob.status === "pending" && (
                <>
                  <Button 
                    variant="destructive" 
                    onClick={() => handleRejectJob(selectedJob.id)}
                  >
                    Reject
                  </Button>
                  <Button 
                    onClick={() => handleApproveJob(selectedJob.id)}
                  >
                    Approve
                  </Button>
                </>
              )}
              
              {selectedJob.status === "approved" && (
                <>
                  <Button 
                    variant="destructive" 
                    onClick={() => handleRejectJob(selectedJob.id)}
                  >
                    Reject
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setIsViewDialogOpen(false)}
                  >
                    Close
                  </Button>
                </>
              )}
              
              {selectedJob.status === "rejected" && (
                <>
                  <Button 
                    variant="destructive" 
                    onClick={() => handleDeleteJob(selectedJob.id)}
                  >
                    Delete
                  </Button>
                  <Button 
                    onClick={() => handleApproveJob(selectedJob.id)}
                  >
                    Approve
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
