"use client";

import { DashboardLayout } from "@/components/dashboard/shared/layout";

export default function RecruiterDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout role="recruiter">{children}</DashboardLayout>;
}
