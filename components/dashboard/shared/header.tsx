"use client";

import Link from "next/link";
import { useAuth } from "@/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RocketIcon } from "@/components/icons";

interface DashboardHeaderProps {
  role?: "student" | "recruiter" | "admin";
}

export function DashboardHeader({ role = "student" }: DashboardHeaderProps) {
  const { user, logout } = useAuth();

  const getInitials = (name: string) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header className="border-b bg-card/80 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <RocketIcon className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold">LevelUpHire</span>
        </Link>
        
        <div className="flex items-center gap-4">
          {role === "student" && (
            <div className="hidden md:flex items-center gap-1 bg-primary/10 text-primary rounded-full py-1 px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <path d="M12 6v12" />
                <path d="M17 11H7" />
              </svg>
              <span className="text-sm font-medium">
                {user?.points || 350} Points
              </span>
            </div>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full">
                <Avatar>
                  <AvatarImage 
                    src={user?.image || `https://i.pravatar.cc/150?u=${role}1`} 
                    alt={user?.name || "User"} 
                  />
                  <AvatarFallback>
                    {user?.name ? getInitials(user.name) : role?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-0.5">
                  <p className="text-sm font-medium">
                    {user?.name || (role === "admin" ? "Admin User" : role === "recruiter" ? "Recruiter" : "Student")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {user?.email || `${role}@example.com`}
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/${role}/profile`}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/${role}/settings`}>Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
