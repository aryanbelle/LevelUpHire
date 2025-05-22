"use client";

import { useState } from "react";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BadgeCheckIcon, BriefcaseIcon, FileIcon, ShareIcon, RocketIcon, UserIcon } from "@/components/icons";
import { TaskCard } from "@/components/dashboard/student/task-card";

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState("all");
  
  // Mock data for tasks
  const allTasks = [
    {
      id: "1",
      title: "Daily Check-in",
      description: "Sign in to earn 10 points each day",
      points: 10,
      action: "Check in",
      completed: true,
      category: "daily",
      icon: <RocketIcon className="h-5 w-5 text-primary" />,
    },
    {
      id: "2",
      title: "Upload Resume",
      description: "Add your latest resume to earn points",
      points: 20,
      action: "Upload",
      completed: false,
      category: "profile",
      icon: <FileIcon className="h-5 w-5 text-amber-600" />,
    },
    {
      id: "3",
      title: "Complete Profile",
      description: "Fill out all profile fields",
      points: 50,
      action: "Complete",
      completed: false,
      category: "profile",
      icon: <UserIcon className="h-5 w-5 text-indigo-600" />,
    },
    {
      id: "4",
      title: "Refer a Friend",
      description: "Invite peers to earn 200 points per sign-up",
      points: 200,
      action: "Refer",
      completed: false,
      category: "referral",
      icon: <ShareIcon className="h-5 w-5 text-green-600" />,
    },
    {
      id: "5",
      title: "Apply for a Job",
      description: "Click 'Apply' on a job listing via portal",
      points: 5,
      action: "Browse Jobs",
      completed: true,
      category: "job",
      icon: <BriefcaseIcon className="h-5 w-5 text-violet-600" />,
    },
    {
      id: "6",
      title: "Add Skills to Profile",
      description: "Add at least 5 relevant skills to your profile",
      points: 15,
      action: "Add Skills",
      completed: false,
      category: "profile",
      icon: <BadgeCheckIcon className="h-5 w-5 text-sky-600" />,
    },
  ];
  
  const filteredTasks = activeTab === "all" 
    ? allTasks 
    : allTasks.filter(task => task.category === activeTab);
  
  const completedTasks = allTasks.filter(task => task.completed).length;
  const completionPercentage = (completedTasks / allTasks.length) * 100;
  
  return (
    <div className="space-y-8 animate-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Tasks</h2>
        <p className="text-muted-foreground">
          Complete tasks to earn points and unlock achievements.
        </p>
      </div>
      
      {/* Progress Overview */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Task Completion</CardTitle>
          <CardDescription>
            You've completed {completedTasks} out of {allTasks.length} tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{completionPercentage.toFixed(0)}% complete</span>
              <span>{completedTasks}/{allTasks.length} tasks</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>
      
      {/* Task Tabs and List */}
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="all">All Tasks</TabsTrigger>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="job">Job</TabsTrigger>
            <TabsTrigger value="referral">Referral</TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm">
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
              <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
              <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
              <path d="M12 3v6" />
            </svg>
            Claim All
          </Button>
        </div>
        
        <TabsContent value={activeTab} className="mt-0">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                title={task.title}
                description={task.description}
                points={task.points}
                action={task.action}
                completed={task.completed}
                icon={task.icon}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Milestones */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Point Milestones</h3>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <Card className={`overflow-hidden card-hover border-2 ${completedTasks >= 5 ? 'border-primary' : 'border-transparent'}`}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <BadgeCheckIcon className="h-5 w-5 text-primary" />
                <div className="bg-primary/10 text-primary text-xs py-1 px-2 rounded-full font-medium">
                  Level 1
                </div>
              </div>
              <CardTitle className="text-lg mt-2">Bronze Achiever</CardTitle>
              <CardDescription>Complete 5 tasks to unlock</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="mt-2">
                <Progress 
                  value={Math.min((completedTasks / 5) * 100, 100)} 
                  className="h-2" 
                />
                <div className="text-xs text-right mt-1 text-muted-foreground">
                  {completedTasks}/5 tasks
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden card-hover border-2 border-transparent">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <BadgeCheckIcon className="h-5 w-5 text-primary" />
                <div className="bg-primary/10 text-primary text-xs py-1 px-2 rounded-full font-medium">
                  Level 2
                </div>
              </div>
              <CardTitle className="text-lg mt-2">Silver Networker</CardTitle>
              <CardDescription>Refer 3 friends to unlock</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="mt-2">
                <Progress 
                  value={0} 
                  className="h-2" 
                />
                <div className="text-xs text-right mt-1 text-muted-foreground">
                  0/3 referrals
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden card-hover border-2 border-transparent">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <BadgeCheckIcon className="h-5 w-5 text-primary" />
                <div className="bg-primary/10 text-primary text-xs py-1 px-2 rounded-full font-medium">
                  Level 3
                </div>
              </div>
              <CardTitle className="text-lg mt-2">Gold Applicant</CardTitle>
              <CardDescription>Apply to 10 jobs to unlock</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="mt-2">
                <Progress 
                  value={10} 
                  className="h-2" 
                />
                <div className="text-xs text-right mt-1 text-muted-foreground">
                  1/10 applications
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}