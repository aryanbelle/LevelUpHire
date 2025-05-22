"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import { DashboardSidebar } from "./sidebar";
import { DashboardHeader } from "./header";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: "student" | "recruiter" | "admin";
}

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Authentication check bypassed for development
  useEffect(() => {
    // Authentication checks are temporarily disabled
    // Original code:
    // if (!isLoading && !isAuthenticated) {
    //   router.push("/auth/login");
    // } else if (!isLoading && user?.role !== role) {
    //   router.push("/dashboard/" + user?.role);
    // }
  }, [isLoading, isAuthenticated, user, router, role]);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader role={role} />
      <div className="flex flex-col md:flex-row">
        <DashboardSidebar role={role} />
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
