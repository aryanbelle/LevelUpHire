"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/providers/auth-provider";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { BadgeCheckIcon, BriefcaseIcon, FileIcon, ShareIcon, TrophyIcon, StarIcon, RocketIcon } from "@/components/icons";
import { TaskCard } from "@/components/dashboard/student/task-card";
import { JobCard } from "@/components/dashboard/student/job-card";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [progress, setProgress] = useState(0);
  
  // Simulate progress calculation
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(70);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Mock data for the dashboard
  const recentJobs = [
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
  ];
  
  return (
    <div className="space-y-8 animate-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back, {user?.name}! Your career journey is tracking well.
        </p>
      </div>
      
      {/* Points & Level Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-xl">Level {user?.level || 1}</CardTitle>
              <CardDescription>
                {user?.points || 0} points earned
              </CardDescription>
            </div>
            <TrophyIcon className="h-8 w-8 text-primary opacity-80" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-1 mt-2 text-sm">
              <span>Level {user?.level || 1}</span>
              <span>Level {(user?.level || 1) + 1}</span>
            </div>
            <Progress value={progress} className="h-2 mb-4" />
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">{500 - (user?.points || 0)} more points</span> needed to reach Level {(user?.level || 1) + 1}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Ranking</CardTitle>
            <ChartIcon className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="py-2">
            <div className="text-3xl font-bold">56th</div>
            <p className="text-xs text-muted-foreground">
              Top 10% in your university
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Completed Tasks</CardTitle>
            <BadgeCheckIcon className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="py-2">
            <div className="text-3xl font-bold">7/15</div>
            <p className="text-xs text-muted-foreground">
              3 tasks completed this week
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Tasks Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Quick Tasks</h3>
          <Link href="/dashboard/student/tasks">
            <Button variant="ghost" size="sm">View All</Button>
          </Link>
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <TaskCard
            icon={<RocketIcon className="h-5 w-5 text-primary" />}
            title="Daily Check-in"
            description="Sign in to earn 10 points each day"
            points={10}
            action="Check in"
            completed={true}
          />
          <TaskCard
            icon={<FileIcon className="h-5 w-5 text-amber-600" />}
            title="Upload Resume"
            description="Add your latest resume to earn points"
            points={20}
            action="Upload"
            completed={false}
          />
          <TaskCard
            icon={<ShareIcon className="h-5 w-5 text-green-600" />}
            title="Refer a Friend"
            description="Invite peers to earn 200 points per sign-up"
            points={200}
            action="Refer"
            completed={false}
          />
        </div>
      </div>
      
      {/* Job Recommendations Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Recommended Jobs</h3>
          <Link href="/dashboard/student/jobs">
            <Button variant="ghost" size="sm">View All</Button>
          </Link>
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {recentJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
      
      {/* Achievements & Badges */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Recent Achievements</h3>
        <div className="bg-card rounded-lg p-4 border">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <StarIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">Early Starter Badge</h4>
              <p className="text-sm text-muted-foreground">Awarded for completing profile within 24 hours of signup</p>
            </div>
            <div className="ml-auto text-xs bg-primary/10 text-primary py-1 px-2 rounded-full">
              +50 points
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex items-center gap-4">
            <div className="bg-amber-500/10 p-3 rounded-full">
              <BadgeCheckIcon className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <h4 className="font-medium">First Application</h4>
              <p className="text-sm text-muted-foreground">Applied to your first job on the platform</p>
            </div>
            <div className="ml-auto text-xs bg-amber-500/10 text-amber-500 py-1 px-2 rounded-full">
              +5 points
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add this to your imports
function ChartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </svg>
  );
}