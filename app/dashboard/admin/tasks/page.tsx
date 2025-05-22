"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
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
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

// Mock task data
const mockTasks = [
  {
    id: "1",
    title: "Daily Sign-In",
    description: "Check in once per day",
    points: 10,
    category: "daily",
    active: true,
  },
  {
    id: "2",
    title: "Refer a Peer",
    description: "Unique referral link generates points on signup",
    points: 200,
    category: "referral",
    active: true,
  },
  {
    id: "3",
    title: "Apply for a Job",
    description: "Click \"Apply\" on a job listing via portal",
    points: 5,
    category: "job",
    active: true,
  },
  {
    id: "4",
    title: "Upload Resume",
    description: "Add or update resume PDF/profile document",
    points: 20,
    category: "profile",
    active: true,
  },
  {
    id: "5",
    title: "Complete Profile",
    description: "Fill out all profile fields (education, skills)",
    points: 50,
    category: "profile",
    active: true,
  },
  {
    id: "6",
    title: "Add Skills to Profile",
    description: "Add at least 5 relevant skills to your profile",
    points: 15,
    category: "profile",
    active: false,
  },
  {
    id: "7",
    title: "Connect Social Media",
    description: "Link your social media accounts to your profile",
    points: 25,
    category: "profile",
    active: false,
  },
];

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  points: z.coerce.number().min(1, { message: "Points must be at least 1" }).max(1000, { message: "Points cannot exceed 1000" }),
  category: z.string().min(1, { message: "Category is required" }),
  active: z.boolean().default(true),
});

export default function TasksPage() {
  const { toast } = useToast();
  const [tasks, setTasks] = useState(mockTasks);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<typeof mockTasks[0] | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      points: 10,
      category: "",
      active: true,
    },
  });
  
  const openNewTaskDialog = () => {
    form.reset({
      title: "",
      description: "",
      points: 10,
      category: "",
      active: true,
    });
    setEditingTask(null);
    setIsDialogOpen(true);
  };
  
  const openEditTaskDialog = (task: typeof mockTasks[0]) => {
    form.reset({
      title: task.title,
      description: task.description,
      points: task.points,
      category: task.category,
      active: task.active,
    });
    setEditingTask(task);
    setIsDialogOpen(true);
  };
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (editingTask) {
      // Update existing task
      setTasks(tasks.map(task => 
        task.id === editingTask.id ? { ...task, ...values } : task
      ));
      
      toast({
        title: "Task Updated",
        description: "The task has been updated successfully.",
      });
    } else {
      // Create new task
      const newTask = {
        id: (tasks.length + 1).toString(),
        ...values,
      };
      
      setTasks([...tasks, newTask]);
      
      toast({
        title: "Task Created",
        description: "The new task has been created successfully.",
      });
    }
    
    setIsDialogOpen(false);
  };
  
  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, active: !task.active } : task
    ));
    
    const task = tasks.find(t => t.id === taskId);
    
    toast({
      title: task?.active ? "Task Disabled" : "Task Enabled",
      description: `The task "${task?.title}" has been ${task?.active ? "disabled" : "enabled"}.`,
    });
  };
  
  const deleteTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    
    setTasks(tasks.filter(task => task.id !== taskId));
    
    toast({
      title: "Task Deleted",
      description: `The task "${task?.title}" has been deleted.`,
    });
  };
  
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 animate-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Task Configuration</h2>
          <p className="text-muted-foreground">
            Manage gamified tasks and their point values
          </p>
        </div>
        <Button onClick={openNewTaskDialog}>
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
          Create New Task
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Task Management</CardTitle>
          <CardDescription>
            Configure tasks, point values, and descriptions for the gamified experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Points</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell className="max-w-xs truncate">{task.description}</TableCell>
                  <TableCell>
                    <span className="capitalize">{task.category}</span>
                  </TableCell>
                  <TableCell className="text-right">{task.points}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Switch 
                        checked={task.active} 
                        onCheckedChange={() => toggleTaskStatus(task.id)}
                        className="mr-2"
                      />
                      <span className={task.active ? "text-green-600" : "text-muted-foreground"}>
                        {task.active ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </TableCell>
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
                        <DropdownMenuItem onClick={() => openEditTaskDialog(task)}>
                          Edit Task
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleTaskStatus(task.id)}>
                          {task.active ? "Disable Task" : "Enable Task"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => deleteTask(task.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          Delete Task
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>{editingTask ? "Edit Task" : "Create New Task"}</DialogTitle>
            <DialogDescription>
              {editingTask 
                ? "Update the task details and point value" 
                : "Add a new task for students to complete and earn points"
              }
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Daily Sign-In" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe what the student needs to do to complete this task" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="points"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Points</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min={1} 
                          max={1000} 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Points awarded for completion
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="profile">Profile</SelectItem>
                          <SelectItem value="job">Job</SelectItem>
                          <SelectItem value="referral">Referral</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Active Status</FormLabel>
                      <FormDescription>
                        Enable or disable this task for students
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingTask ? "Update Task" : "Create Task"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
