"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

// Mock applicant data
const mockApplicants = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://i.pravatar.cc/150?u=john1",
    points: 450,
    level: 3,
    skills: ["React", "TypeScript", "Node.js"],
    university: "Stanford University",
    appliedAt: "2 days ago",
    status: "new",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar: "https://i.pravatar.cc/150?u=sarah2",
    points: 780,
    level: 4,
    skills: ["UI/UX", "Figma", "Adobe XD"],
    university: "MIT",
    appliedAt: "1 day ago",
    status: "new",
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael@example.com",
    avatar: "https://i.pravatar.cc/150?u=michael3",
    points: 620,
    level: 3,
    skills: ["React", "JavaScript", "CSS"],
    university: "UC Berkeley",
    appliedAt: "3 days ago",
    status: "reviewing",
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    email: "emily@example.com",
    avatar: "https://i.pravatar.cc/150?u=emily4",
    points: 920,
    level: 5,
    skills: ["TypeScript", "React", "Redux", "Node.js"],
    university: "Harvard University",
    appliedAt: "5 days ago",
    status: "shortlisted",
  },
  {
    id: "5",
    name: "David Kim",
    email: "david@example.com",
    avatar: "https://i.pravatar.cc/150?u=david5",
    points: 350,
    level: 2,
    skills: ["HTML", "CSS", "JavaScript"],
    university: "UCLA",
    appliedAt: "1 week ago",
    status: "rejected",
  },
  {
    id: "6",
    name: "Lisa Wang",
    email: "lisa@example.com",
    avatar: "https://i.pravatar.cc/150?u=lisa6",
    points: 880,
    level: 4,
    skills: ["React", "TypeScript", "GraphQL", "Next.js"],
    university: "Stanford University",
    appliedAt: "4 days ago",
    status: "shortlisted",
  },
  {
    id: "7",
    name: "James Wilson",
    email: "james@example.com",
    avatar: "https://i.pravatar.cc/150?u=james7",
    points: 520,
    level: 3,
    skills: ["JavaScript", "React", "CSS"],
    university: "UC Berkeley",
    appliedAt: "6 days ago",
    status: "reviewing",
  },
];

// Mock job data
const mockJob = {
  id: "1",
  title: "Frontend Developer",
  company: "TechCorp",
  location: "San Francisco, CA",
  type: "Full-time",
  applicants: mockApplicants.length,
};

export default function ApplicantsPage({ params }: { params: { jobId: string } }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [pointsRange, setPointsRange] = useState([0, 1000]);
  
  // Get all unique skills from applicants
  const allSkills = Array.from(
    new Set(mockApplicants.flatMap(applicant => applicant.skills))
  ).sort();
  
  // Filter applicants based on search query, selected skill, and points range
  const filteredApplicants = mockApplicants.filter(applicant => {
    const matchesSearch = 
      applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicant.university.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSkill = selectedSkill 
      ? applicant.skills.includes(selectedSkill) 
      : true;
    
    const matchesPoints = 
      applicant.points >= pointsRange[0] && 
      applicant.points <= pointsRange[1];
    
    return matchesSearch && matchesSkill && matchesPoints;
  });
  
  const newApplicants = filteredApplicants.filter(a => a.status === "new");
  const reviewingApplicants = filteredApplicants.filter(a => a.status === "reviewing");
  const shortlistedApplicants = filteredApplicants.filter(a => a.status === "shortlisted");
  const rejectedApplicants = filteredApplicants.filter(a => a.status === "rejected");
  
  const renderApplicantCard = (applicant: typeof mockApplicants[0]) => (
    <Card key={applicant.id} className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={applicant.avatar} alt={applicant.name} />
            <AvatarFallback>{applicant.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="font-semibold">{applicant.name}</h3>
                <p className="text-sm text-muted-foreground">{applicant.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-primary/10 text-primary rounded-full py-1 px-2.5">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 mr-1" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="8" r="7" />
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                  </svg>
                  <span className="text-sm font-medium">{applicant.points} pts</span>
                </div>
                <Badge variant="outline">Level {applicant.level}</Badge>
              </div>
            </div>
            
            <div className="mt-3">
              <p className="text-sm text-muted-foreground mb-1">Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {applicant.skills.map(skill => (
                  <Badge key={skill} variant="secondary" className="font-normal">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
              <div>
                <p className="text-muted-foreground">University</p>
                <p>{applicant.university}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Applied</p>
                <p>{applicant.appliedAt}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              <Button size="sm" variant="outline">View Profile</Button>
              <Button size="sm" variant="outline">View Resume</Button>
              
              {applicant.status === "new" && (
                <>
                  <Button size="sm">Review</Button>
                  <Button size="sm" variant="destructive">Reject</Button>
                </>
              )}
              
              {applicant.status === "reviewing" && (
                <>
                  <Button size="sm">Shortlist</Button>
                  <Button size="sm" variant="destructive">Reject</Button>
                </>
              )}
              
              {applicant.status === "shortlisted" && (
                <Button size="sm">Contact</Button>
              )}
              
              {applicant.status === "rejected" && (
                <Button size="sm" variant="outline">Reconsider</Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
  
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 animate-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-2" 
            onClick={() => router.push(`/dashboard/recruiter/jobs`)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 mr-1" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Jobs
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">{mockJob.title}</h2>
          <p className="text-muted-foreground">
            {mockJob.company} • {mockJob.location} • {mockJob.type}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="text-lg py-1.5 px-3">
            {mockJob.applicants} Applicants
          </Badge>
        </div>
      </div>
      
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle>Filter Applicants</CardTitle>
          <CardDescription>
            Narrow down candidates based on skills, points, and more
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Search</label>
              <Input
                placeholder="Search by name, email, university..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Filter by Skill</label>
              <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                <SelectTrigger>
                  <SelectValue placeholder="Select skill" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Skills</SelectItem>
                  {allSkills.map(skill => (
                    <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="sm:col-span-2">
              <label className="text-sm font-medium mb-2 block">
                Points Range: {pointsRange[0]} - {pointsRange[1]}
              </label>
              <Slider
                defaultValue={[0, 1000]}
                min={0}
                max={1000}
                step={50}
                value={pointsRange}
                onValueChange={setPointsRange}
                className="py-4"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All ({filteredApplicants.length})</TabsTrigger>
          <TabsTrigger value="new">New ({newApplicants.length})</TabsTrigger>
          <TabsTrigger value="reviewing">Reviewing ({reviewingApplicants.length})</TabsTrigger>
          <TabsTrigger value="shortlisted">Shortlisted ({shortlistedApplicants.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedApplicants.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0 space-y-4">
          {filteredApplicants.length > 0 ? (
            filteredApplicants.map(renderApplicantCard)
          ) : (
            <Card>
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
                    <circle cx="12" cy="7" r="4" />
                    <path d="M5 22v-4a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v4" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">No Applicants Found</h3>
                <p className="text-muted-foreground text-center">
                  No applicants match your current filter criteria.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="new" className="mt-0 space-y-4">
          {newApplicants.length > 0 ? (
            newApplicants.map(renderApplicantCard)
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <h3 className="text-xl font-medium mb-2">No New Applicants</h3>
                <p className="text-muted-foreground text-center">
                  There are no new applicants matching your filter criteria.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="reviewing" className="mt-0 space-y-4">
          {reviewingApplicants.length > 0 ? (
            reviewingApplicants.map(renderApplicantCard)
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <h3 className="text-xl font-medium mb-2">No Applicants Under Review</h3>
                <p className="text-muted-foreground text-center">
                  There are no applicants currently under review.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="shortlisted" className="mt-0 space-y-4">
          {shortlistedApplicants.length > 0 ? (
            shortlistedApplicants.map(renderApplicantCard)
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <h3 className="text-xl font-medium mb-2">No Shortlisted Applicants</h3>
                <p className="text-muted-foreground text-center">
                  You haven't shortlisted any applicants yet.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="rejected" className="mt-0 space-y-4">
          {rejectedApplicants.length > 0 ? (
            rejectedApplicants.map(renderApplicantCard)
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <h3 className="text-xl font-medium mb-2">No Rejected Applicants</h3>
                <p className="text-muted-foreground text-center">
                  You haven't rejected any applicants yet.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
