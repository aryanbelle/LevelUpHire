"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BookmarkIcon } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  type: string;
  logo?: string;
  posted: string;
}

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Job removed from saved list" : "Job saved successfully",
      description: isSaved 
        ? "The job has been removed from your saved list"
        : "The job has been added to your saved jobs list",
    });
  };

  const handleApply = () => {
    if (hasApplied) return;
    
    setIsApplying(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setHasApplied(true);
      setIsApplying(false);
      
      toast({
        title: "Application Submitted!",
        description: `You earned 5 points for applying to "${job.title}"`,
      });
    }, 1000);
  };

  return (
    <Card className="card-hover overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div className="flex gap-3">
            {job.logo ? (
              <div className="h-12 w-12 rounded-md overflow-hidden">
                <img 
                  src={job.logo} 
                  alt={job.company} 
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-semibold">
                  {job.company.substring(0, 2).toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <CardTitle className="text-lg">{job.title}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                {job.company}
                <span className="inline-block h-1 w-1 rounded-full bg-gray-300 mx-1"></span>
                {job.location}
              </CardDescription>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className={isSaved ? "text-primary" : ""}
            onClick={handleSave}
          >
            <BookmarkIcon className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex flex-wrap gap-2 mt-2">
          {job.salary && (
            <span className="px-2.5 py-0.5 text-xs bg-primary/10 text-primary rounded-full whitespace-nowrap">
              {job.salary}
            </span>
          )}
          <span className="px-2.5 py-0.5 text-xs bg-secondary text-secondary-foreground rounded-full whitespace-nowrap">
            {job.type}
          </span>
          <span className="px-2.5 py-0.5 text-xs bg-secondary text-secondary-foreground rounded-full whitespace-nowrap">
            {job.posted}
          </span>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="pt-3">
        <div className="flex gap-3 w-full">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
          >
            View Details
          </Button>
          <Button
            size="sm"
            className="flex-1"
            onClick={handleApply}
            disabled={isApplying || hasApplied}
          >
            {isApplying ? (
              <>
                <svg 
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Applying...
              </>
            ) : hasApplied ? (
              <>
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
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Applied
              </>
            ) : (
              "Apply Now"
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}