"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
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

const routes = [
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
    label: "Resume",
    icon: FileIcon,
    href: "/dashboard/student/resume",
    color: "text-amber-600"
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
    color: "text-red-600"
  },
  {
    label: "Profile",
    icon: UserIcon,
    href: "/dashboard/student/profile",
    color: "text-indigo-600"
  },
  {
    label: "Settings",
    icon: SettingsIcon,
    href: "/dashboard/student/settings",
    color: "text-gray-600"
  }
];

export function StudentDashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="border-r h-[calc(100vh-4rem)] py-4 bg-card/60 md:block w-72 overflow-y-auto">
      <div className="md:hidden px-4 mb-4 flex items-center gap-1 bg-primary/10 text-primary rounded-full py-1 max-w-fit">
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
          350 Points
        </span>
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