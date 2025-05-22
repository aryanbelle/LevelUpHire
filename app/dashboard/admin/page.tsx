"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Mock analytics data
const dailyUsersData = [
  { name: 'Mon', users: 120 },
  { name: 'Tue', users: 140 },
  { name: 'Wed', users: 180 },
  { name: 'Thu', users: 250 },
  { name: 'Fri', users: 300 },
  { name: 'Sat', users: 200 },
  { name: 'Sun', users: 150 },
];

const tasksCompletedData = [
  { name: 'Mon', tasks: 45 },
  { name: 'Tue', tasks: 52 },
  { name: 'Wed', tasks: 68 },
  { name: 'Thu', tasks: 92 },
  { name: 'Fri', tasks: 102 },
  { name: 'Sat', tasks: 78 },
  { name: 'Sun', tasks: 63 },
];

const userTypeData = [
  { name: 'Students', value: 65 },
  { name: 'Recruiters', value: 30 },
  { name: 'Admins', value: 5 },
];

const COLORS = ['#111184', '#4f46e5', '#818cf8'];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* <header className="border-b bg-card/80 backdrop-blur-sm">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
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
              className="h-6 w-6 text-primary"
            >
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
              <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
              <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
            </svg>
            <span className="text-lg font-semibold">LevelUpHire</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full">
              <img
                src="https://i.pravatar.cc/150?u=admin1"
                alt="Avatar"
                className="rounded-full"
              />
            </Button>
          </div>
        </div>
      </header> */}
      
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full animate-in">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
          <p className="text-muted-foreground">
            Platform overview and analytics
          </p>
        </div>
        
        {/* Summary Cards */}
        <div className="mt-8 grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1,245</div>
              <p className="text-sm text-muted-foreground">
                <span className="text-green-500">+12%</span> from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Active Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">87</div>
              <p className="text-sm text-muted-foreground">
                <span className="text-green-500">+5%</span> from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Points Awarded</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">43,592</div>
              <p className="text-sm text-muted-foreground">
                <span className="text-green-500">+18%</span> from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Successful Referrals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">124</div>
              <p className="text-sm text-muted-foreground">
                <span className="text-green-500">+22%</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Analytics Tabs */}
        <div className="mt-8">
          <Tabs defaultValue="users">
            <TabsList>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="points">Points</TabsTrigger>
              <TabsTrigger value="jobs">Jobs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="users" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Daily Active Users</CardTitle>
                    <CardDescription>
                      User activity over the past week
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={dailyUsersData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="users"
                            stroke="#111184"
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>User Distribution</CardTitle>
                    <CardDescription>
                      Breakdown of users by type
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={userTypeData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => 
                              `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {userTypeData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="tasks" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tasks Completed</CardTitle>
                  <CardDescription>
                    Daily task completions over the past week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={tasksCompletedData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="tasks" fill="#111184" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="points" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Points Analytics</CardTitle>
                  <CardDescription>
                    Points earned vs tasks completed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center">
                    <p className="text-muted-foreground">Points analytics data will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="jobs" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Job Analytics</CardTitle>
                  <CardDescription>
                    Job postings and application statistics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center">
                    <p className="text-muted-foreground">Job analytics data will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Recent Activity */}
        <h3 className="text-xl font-semibold mt-12 mb-6">Recent Activity</h3>
        
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold">5 New Users Registered</h4>
                  <p className="text-sm text-muted-foreground">10 minutes ago</p>
                </div>
                <Button variant="outline" size="sm" className="ml-auto">
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold">New Job Post Requires Approval</h4>
                  <p className="text-sm text-muted-foreground">25 minutes ago</p>
                </div>
                <Button variant="outline" size="sm" className="ml-auto">
                  Review
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M12 2v4" />
                    <path d="M12 18v4" />
                    <path d="M4.93 4.93l2.83 2.83" />
                    <path d="M16.24 16.24l2.83 2.83" />
                    <path d="M2 12h4" />
                    <path d="M18 12h4" />
                    <path d="M4.93 19.07l2.83-2.83" />
                    <path d="M16.24 7.76l2.83-2.83" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold">System Update Scheduled</h4>
                  <p className="text-sm text-muted-foreground">1 hour ago</p>
                </div>
                <Button variant="outline" size="sm" className="ml-auto">
                  Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}