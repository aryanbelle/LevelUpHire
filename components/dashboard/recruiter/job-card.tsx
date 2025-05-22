"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  postedAt: string;
  applicants: number;
  status: "pending" | "active" | "closed";
  skills: string[];
  onDelete?: (id: string) => void;
}

export function RecruiterJobCard({
  id,
  title,
  company,
  location,
  type,
  salary,
  postedAt,
  applicants,
  status,
  skills,
  onDelete
}: JobCardProps) {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleDelete = () => {
    setIsDeleting(true);
    
    // Simulate API call
    setTimeout(() => {
      if (onDelete) {
        onDelete(id);
      }
      
      toast({
        title: "Job Deleted",
        description: "The job posting has been removed.",
      });
      
      setIsDeleting(false);
    }, 500);
  };
  
  const getStatusBadge = () => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-600">Active</Badge>;
      case "pending":
        return <Badge variant="outline" className="text-amber-600 border-amber-600">Pending</Badge>;
      case "closed":
        return <Badge variant="secondary">Closed</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-sm text-muted-foreground">{company} • {location}</p>
            </div>
            <div className="flex items-center gap-2">
              {getStatusBadge()}
              <Badge variant="outline">{type}</Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Salary</p>
              <p>{salary}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Posted</p>
              <p>{postedAt}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Applicants</p>
              <p>{applicants}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-2">Required Skills</p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge key={index} variant="secondary">{skill}</Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-muted/50 px-6 py-3 flex justify-between">
        <Link href={`/dashboard/recruiter/jobs/${id}/applicants`}>
          <Button variant="outline" size="sm">
            View Applicants
          </Button>
        </Link>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/recruiter/jobs/${id}/edit`}>
                Edit Job
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-destructive focus:text-destructive"
            >
              {isDeleting ? "Deleting..." : "Delete Job"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}
