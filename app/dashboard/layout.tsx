"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Authentication check bypassed for development
  useEffect(() => {
    // Authentication checks are temporarily disabled
    // Original code:
    // if (!isLoading && !isAuthenticated) {
    //   router.push("/auth/login");
    // }
  }, [isLoading, isAuthenticated, router]);

  return <>{children}</>;
}
