"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

// Mock leaderboard data
const leaderboardData = [
  {
    id: "1",
    name: "Alex Johnson",
    points: 2450,
    level: 5,
    avatar: "https://i.pravatar.cc/150?u=alex1",
    university: "Stanford University",
    position: 1,
    skills: ["React", "TypeScript", "Node.js"],
    change: "up", // up, down, or same
  },
  {
    id: "2",
    name: "Jordan Smith",
    points: 2100,
    level: 4,
    avatar: "https://i.pravatar.cc/150?u=jordan2",
    university: "MIT",
    position: 2,
    skills: ["Python", "Data Science", "Machine Learning"],
    change: "same",
  },
  {
    id: "3",
    name: "Taylor Rodriguez",
    points: 1850,
    level: 4,
    avatar: "https://i.pravatar.cc/150?u=taylor3",
    university: "Harvard University",
    position: 3,
    skills: ["UI/UX", "Figma", "Design Systems"],
    change: "up",
  },
  {
    id: "4",
    name: "Morgan Chen",
    points: 1700,
    level: 3,
    avatar: "https://i.pravatar.cc/150?u=morgan4",
    university: "UC Berkeley",
    position: 4,
    skills: ["Java", "Spring Boot", "Microservices"],
    change: "down",
  },
  {
    id: "5",
    name: "Riley Patel",
    points: 1600,
    level: 3,
    avatar: "https://i.pravatar.cc/150?u=riley5",
    university: "Stanford University",
    position: 5,
    skills: ["DevOps", "AWS", "Kubernetes"],
    change: "up",
  },
  {
    id: "6",
    name: "Casey Williams",
    points: 1450,
    level: 3,
    avatar: "https://i.pravatar.cc/150?u=casey6",
    university: "UCLA",
    position: 6,
    skills: ["JavaScript", "React", "Vue"],
    change: "down",
  },
  {
    id: "7",
    name: "Quinn Martinez",
    points: 1350,
    level: 3,
    avatar: "https://i.pravatar.cc/150?u=quinn7",
    university: "UC Berkeley",
    position: 7,
    skills: ["Python", "Django", "Flask"],
    change: "same",
  },
  {
    id: "8",
    name: "Jamie Thompson",
    points: 1200,
    level: 2,
    avatar: "https://i.pravatar.cc/150?u=jamie8",
    university: "MIT",
    position: 8,
    skills: ["Mobile", "React Native", "Flutter"],
    change: "up",
  },
  {
    id: "9",
    name: "Avery Wilson",
    points: 1100,
    level: 2,
    avatar: "https://i.pravatar.cc/150?u=avery9",
    university: "Cornell University",
    position: 9,
    skills: ["C++", "Algorithms", "Data Structures"],
    change: "down",
  },
  {
    id: "10",
    name: "Sam Garcia",
    points: 1000,
    level: 2,
    avatar: "https://i.pravatar.cc/150?u=sam10",
    university: "Princeton University",
    position: 10,
    skills: ["Full Stack", "MERN", "GraphQL"],
    change: "same",
  },
];

export default function LeaderboardPage() {
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  
  // Filter leaderboard based on selected filters
  const filteredLeaderboard = leaderboardData.filter(student => {
    const matchesSkill = selectedSkill ? student.skills.includes(selectedSkill) : true;
    const matchesUniversity = selectedUniversity ? student.university === selectedUniversity : true;
    
    return matchesSkill && matchesUniversity;
  });
  
  // Get unique universities for filter
  const universities = Array.from(new Set(leaderboardData.map(student => student.university)));
  
  // Get unique skills for filter
  const skills = Array.from(new Set(leaderboardData.flatMap(student => student.skills)));
  
  return (
    <div className="space-y-8 animate-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Leaderboard</h2>
        <p className="text-muted-foreground">
          See how you rank compared to your peers.
        </p>
      </div>
      
      {/* Your Position */}
      <Card className="border-2 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle>Your Position</CardTitle>
          <CardDescription>
            You're currently ranked #56 out of 1,240 students
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold">56</div>
              <div className="flex items-center text-sm text-green-500">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 mr-0.5" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="19" x2="12" y2="5" />
                  <polyline points="5 12 12 5 19 12" />
                </svg>
                <span>+4 positions this week</span>
              </div>
            </div>
            <div className="flex-1">
              <Progress value={95.5} className="h-2 mb-1" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>350 points</span>
                <span>25 points to rank #55</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Filters & Leaderboard */}
      <Tabs defaultValue="global">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <TabsList>
            <TabsTrigger value="global">Global</TabsTrigger>
            <TabsTrigger value="university">University</TabsTrigger>
            <TabsTrigger value="friends">Friends</TabsTrigger>
          </TabsList>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={selectedSkill} onValueChange={setSelectedSkill}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Skills</SelectItem>
                {skills.map((skill) => (
                  <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by university" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Universities</SelectItem>
                {universities.map((university) => (
                  <SelectItem key={university} value={university}>{university}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <TabsContent value="global" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left py-3 px-4">Rank</th>
                      <th className="text-left py-3 px-4">Student</th>
                      <th className="text-left py-3 px-4 hidden md:table-cell">University</th>
                      <th className="text-left py-3 px-4 hidden md:table-cell">Skills</th>
                      <th className="text-left py-3 px-4">Level</th>
                      <th className="text-right py-3 px-4">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeaderboard.map((student) => (
                      <tr key={student.id} className="border-b last:border-b-0">
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <span className="font-bold mr-1">#{student.position}</span>
                            {student.change === "up" && (
                              <span className="text-green-500">
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  className="h-4 w-4" 
                                  viewBox="0 0 24 24" 
                                  fill="none" 
                                  stroke="currentColor" 
                                  strokeWidth="2" 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round"
                                >
                                  <polyline points="18 15 12 9 6 15" />
                                </svg>
                              </span>
                            )}
                            {student.change === "down" && (
                              <span className="text-red-500">
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  className="h-4 w-4" 
                                  viewBox="0 0 24 24" 
                                  fill="none" 
                                  stroke="currentColor" 
                                  strokeWidth="2" 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round"
                                >
                                  <polyline points="6 9 12 15 18 9" />
                                </svg>
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={student.avatar} alt={student.name} />
                              <AvatarFallback>{student.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{student.name}</div>
                              <div className="text-sm text-muted-foreground md:hidden">
                                {student.university}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 hidden md:table-cell">
                          {student.university}
                        </td>
                        <td className="py-4 px-4 hidden md:table-cell">
                          <div className="flex flex-wrap gap-1">
                            {student.skills.slice(0, 2).map((skill) => (
                              <Badge key={skill} variant="secondary" className="font-normal">
                                {skill}
                              </Badge>
                            ))}
                            {student.skills.length > 2 && (
                              <Badge variant="outline" className="font-normal">
                                +{student.skills.length - 2}
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1 bg-primary/10 text-primary rounded-full py-1 px-2 w-fit">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-4 w-4 mr-0.5" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                            >
                              <path d="M20 20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10c0-1.1.9-2 2-2h4l2-4h4l2 4h4a2 2 0 0 1 2 2z" />
                              <line x1="2" y1="10" x2="22" y2="10" />
                            </svg>
                            <span className="text-sm font-medium">
                              {student.level}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right font-semibold">
                          {student.points} pts
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-4 text-center">
            <Button variant="outline">
              View More
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="university" className="mt-0">
          {/* Similar table structure as global tab but with university-specific data */}
          <Card>
            <CardContent className="p-6 text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">University Leaderboard</h3>
              <p className="text-muted-foreground mb-4">
                Complete your profile to specify your university and see how you rank among your peers.
              </p>
              <Button>Update Profile</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="friends" className="mt-0">
          {/* Friends leaderboard tab content */}
          <Card>
            <CardContent className="p-6 text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Friends Leaderboard</h3>
              <p className="text-muted-foreground mb-4">
                Connect with friends to see how you rank in your personal network.
              </p>
              <Button>Find Friends</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}