"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface TaskCardProps {
  title: string;
  description: string;
  points: number;
  action: string;
  completed?: boolean;
  icon?: React.ReactNode;
}

export function TaskCard({ title, description, points, action, completed = false, icon }: TaskCardProps) {
  const { toast } = useToast();
  const [isCompleted, setIsCompleted] = useState(completed);
  const [isLoading, setIsLoading] = useState(false);

  const handleCompleteTask = () => {
    if (isCompleted) return;
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsCompleted(true);
      setIsLoading(false);
      
      // Show success toast with points earned
      toast({
        title: "Task Completed!",
        description: `You've earned ${points} points for completing "${title}"`,
        variant: "default",
      });
    }, 1000);
  };
  
  return (
    <Card className="overflow-hidden transition-all hover:border-primary/50 hover:shadow-md">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-full bg-primary/10">
              {icon}
            </div>
            <div className="font-semibold">{title}</div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 bg-primary/10 text-primary rounded-full py-1 px-2.5">
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
                <circle cx="12" cy="8" r="7" />
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
              </svg>
              <span className="text-sm font-medium">{points} pts</span>
            </div>
            <Button 
              variant={isCompleted ? "outline" : "default"} 
              size="sm"
              onClick={handleCompleteTask}
              disabled={isLoading || isCompleted}
            >
              {isLoading ? (
                <>
                  <svg 
                    className="animate-spin -ml-1 mr-2 h-4 w-4" 
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
                  Loading...
                </>
              ) : isCompleted ? (
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
                  Completed
                </>
              ) : action}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}