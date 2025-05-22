"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

// Mock user data
const mockStudents = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "student",
    points: 350,
    level: 2,
    university: "Stanford University",
    joinedAt: "2 months ago",
    lastActive: "2 days ago",
    avatar: "https://i.pravatar.cc/150?u=john1",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "student",
    points: 780,
    level: 4,
    university: "MIT",
    joinedAt: "3 months ago",
    lastActive: "1 day ago",
    avatar: "https://i.pravatar.cc/150?u=sarah2",
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael@example.com",
    role: "student",
    points: 620,
    level: 3,
    university: "UC Berkeley",
    joinedAt: "1 month ago",
    lastActive: "3 days ago",
    avatar: "https://i.pravatar.cc/150?u=michael3",
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    email: "emily@example.com",
    role: "student",
    points: 920,
    level: 5,
    university: "Harvard University",
    joinedAt: "5 months ago",
    lastActive: "5 days ago",
    avatar: "https://i.pravatar.cc/150?u=emily4",
  },
  {
    id: "5",
    name: "David Kim",
    email: "david@example.com",
    role: "student",
    points: 350,
    level: 2,
    university: "UCLA",
    joinedAt: "2 months ago",
    lastActive: "1 week ago",
    avatar: "https://i.pravatar.cc/150?u=david5",
  },
];

const mockRecruiters = [
  {
    id: "6",
    name: "Alex Thompson",
    email: "alex@techcorp.com",
    role: "recruiter",
    company: "TechCorp",
    jobsPosted: 5,
    joinedAt: "4 months ago",
    lastActive: "1 day ago",
    avatar: "https://i.pravatar.cc/150?u=alex6",
  },
  {
    id: "7",
    name: "Jessica Lee",
    email: "jessica@designstudio.com",
    role: "recruiter",
    company: "Design Studio",
    jobsPosted: 3,
    joinedAt: "2 months ago",
    lastActive: "3 days ago",
    avatar: "https://i.pravatar.cc/150?u=jessica7",
  },
  {
    id: "8",
    name: "Robert Wilson",
    email: "robert@datasystems.com",
    role: "recruiter",
    company: "DataSystems",
    jobsPosted: 7,
    joinedAt: "6 months ago",
    lastActive: "1 week ago",
    avatar: "https://i.pravatar.cc/150?u=robert8",
  },
];

export default function UsersPage() {
  const { toast } = useToast();
  const [students, setStudents] = useState(mockStudents);
  const [recruiters, setRecruiters] = useState(mockRecruiters);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter users based on search query
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.university.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredRecruiters = recruiters.filter(recruiter => 
    recruiter.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    recruiter.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recruiter.company.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const deleteUser = (userId: string, userType: "student" | "recruiter") => {
    if (userType === "student") {
      const user = students.find(s => s.id === userId);
      setStudents(students.filter(s => s.id !== userId));
      
      toast({
        title: "Student Account Deleted",
        description: `${user?.name}'s account has been deleted.`,
      });
    } else {
      const user = recruiters.find(r => r.id === userId);
      setRecruiters(recruiters.filter(r => r.id !== userId));
      
      toast({
        title: "Recruiter Account Deleted",
        description: `${user?.name}'s account has been deleted.`,
      });
    }
  };
  
  const renderStudentCard = (student: typeof mockStudents[0]) => (
    <Card key={student.id} className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={student.avatar} alt={student.name} />
            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="font-semibold">{student.name}</h3>
                <p className="text-sm text-muted-foreground">{student.email}</p>
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
                  <span className="text-sm font-medium">{student.points} pts</span>
                </div>
                <Badge variant="outline">Level {student.level}</Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
              <div>
                <p className="text-muted-foreground">University</p>
                <p>{student.university}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Joined</p>
                <p>{student.joinedAt}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Last Active</p>
                <p>{student.lastActive}</p>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
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
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem>Edit User</DropdownMenuItem>
                  <DropdownMenuItem>Reset Password</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => deleteUser(student.id, "student")}
                    className="text-destructive focus:text-destructive"
                  >
                    Delete User
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
  
  const renderRecruiterCard = (recruiter: typeof mockRecruiters[0]) => (
    <Card key={recruiter.id} className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={recruiter.avatar} alt={recruiter.name} />
            <AvatarFallback>{recruiter.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="font-semibold">{recruiter.name}</h3>
                <p className="text-sm text-muted-foreground">{recruiter.email}</p>
              </div>
              <Badge variant="secondary">{recruiter.company}</Badge>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
              <div>
                <p className="text-muted-foreground">Jobs Posted</p>
                <p>{recruiter.jobsPosted}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Joined</p>
                <p>{recruiter.joinedAt}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Last Active</p>
                <p>{recruiter.lastActive}</p>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
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
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem>Edit User</DropdownMenuItem>
                  <DropdownMenuItem>View Job Postings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => deleteUser(recruiter.id, "recruiter")}
                    className="text-destructive focus:text-destructive"
                  >
                    Delete User
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
  
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 animate-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
        <p className="text-muted-foreground">
          View and manage student and recruiter accounts
        </p>
      </div>
      
      <div className="mb-6">
        <Input
          placeholder="Search users by name, email, university, or company..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>
      
      <Tabs defaultValue="students">
        <TabsList className="mb-4">
          <TabsTrigger value="students">Students ({filteredStudents.length})</TabsTrigger>
          <TabsTrigger value="recruiters">Recruiters ({filteredRecruiters.length})</TabsTrigger>
          <TabsTrigger value="admins">Admins (1)</TabsTrigger>
        </TabsList>
        
        <TabsContent value="students" className="mt-0 space-y-4">
          {filteredStudents.length > 0 ? (
            filteredStudents.map(renderStudentCard)
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
                <h3 className="text-xl font-medium mb-2">No Students Found</h3>
                <p className="text-muted-foreground text-center">
                  No student accounts match your search criteria.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="recruiters" className="mt-0 space-y-4">
          {filteredRecruiters.length > 0 ? (
            filteredRecruiters.map(renderRecruiterCard)
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <h3 className="text-xl font-medium mb-2">No Recruiters Found</h3>
                <p className="text-muted-foreground text-center">
                  No recruiter accounts match your search criteria.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="admins" className="mt-0 space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="https://i.pravatar.cc/150?u=admin1" alt="Admin User" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h3 className="font-semibold">Admin User</h3>
                      <p className="text-sm text-muted-foreground">admin@example.com</p>
                    </div>
                    <Badge variant="default" className="bg-blue-600">Admin</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Joined</p>
                      <p>1 year ago</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Last Active</p>
                      <p>Just now</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
