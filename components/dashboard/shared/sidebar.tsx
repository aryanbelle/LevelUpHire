"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  HomeIcon, 
  BriefcaseIcon, 
  BadgeCheckIcon,
  FileIcon,
  ShareIcon,
  ChartIcon,
  UserIcon,
  SettingsIcon,
} from "@/components/icons";

// Define route configurations for different user roles
const routeConfigs = {
  student: [
    {
      label: "Overview",
      icon: HomeIcon,
      href: "/dashboard/student",
      color: "text-gray-600"
    },
    {
      label: "Tasks",
      icon: BadgeCheckIcon,
      href: "/dashboard/student/tasks",
      color: "text-sky-600"
    },
    {
      label: "Jobs",
      icon: BriefcaseIcon,
      href: "/dashboard/student/jobs",
      color: "text-violet-600"
    },
    {
      label: "Referrals",
      icon: ShareIcon,
      href: "/dashboard/student/referrals",
      color: "text-green-600"
    },
    {
      label: "Leaderboard",
      icon: ChartIcon,
      href: "/dashboard/student/leaderboard",
      color: "text-amber-600"
    },
    {
      label: "Profile",
      icon: UserIcon,
      href: "/dashboard/student/profile",
      color: "text-pink-600"
    },
    {
      label: "Settings",
      icon: SettingsIcon,
      href: "/dashboard/student/settings",
      color: "text-gray-600"
    }
  ],
  recruiter: [
    {
      label: "Dashboard",
      icon: HomeIcon,
      href: "/dashboard/recruiter",
      color: "text-gray-600"
    },
    {
      label: "My Jobs",
      icon: BriefcaseIcon,
      href: "/dashboard/recruiter/jobs",
      color: "text-violet-600"
    },
    {
      label: "Post a Job",
      icon: FileIcon,
      href: "/dashboard/recruiter/post-job",
      color: "text-green-600"
    },
    {
      label: "Applicants",
      icon: UserIcon,
      href: "/dashboard/recruiter/applicants",
      color: "text-sky-600"
    },
    {
      label: "Settings",
      icon: SettingsIcon,
      href: "/dashboard/recruiter/settings",
      color: "text-gray-600"
    }
  ],
  admin: [
    {
      label: "Dashboard",
      icon: HomeIcon,
      href: "/dashboard/admin",
      color: "text-gray-600"
    },
    {
      label: "Tasks",
      icon: BadgeCheckIcon,
      href: "/dashboard/admin/tasks",
      color: "text-sky-600"
    },
    {
      label: "Users",
      icon: UserIcon,
      href: "/dashboard/admin/users",
      color: "text-pink-600"
    },
    {
      label: "Jobs",
      icon: BriefcaseIcon,
      href: "/dashboard/admin/jobs",
      color: "text-violet-600"
    },
    {
      label: "Settings",
      icon: SettingsIcon,
      href: "/dashboard/admin/settings",
      color: "text-gray-600"
    }
  ]
};

interface DashboardSidebarProps {
  role?: "student" | "recruiter" | "admin";
}

export function DashboardSidebar({ role = "student" }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  
  // Select the appropriate routes based on the role
  const routes = routeConfigs[role] || routeConfigs.student;

  return (
    <div className="border-r h-[calc(100vh-4rem)] py-4 bg-card/60 md:block w-72 overflow-y-auto">
      <div className="px-4 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <Avatar>
            <AvatarImage 
              src={user?.image || `https://i.pravatar.cc/150?u=${role}1`} 
              alt={user?.name || "User"} 
            />
            <AvatarFallback>{user?.name?.charAt(0) || role?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{user?.name || (role === "admin" ? "Admin User" : role === "recruiter" ? "Recruiter" : "Student")}</p>
            <p className="text-sm text-muted-foreground">{user?.email || `${role}@example.com`}</p>
          </div>
        </div>
        
        {role === "student" && (
          <div className="flex items-center gap-1 bg-primary/10 text-primary rounded-full py-1 px-3 max-w-fit mb-4">
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
      </div>
      
      <div className="space-y-1 px-3">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
              pathname === route.href ? "bg-accent" : "transparent"
            )}
          >
            <route.icon className={cn("h-5 w-5", route.color)} />
            {route.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
