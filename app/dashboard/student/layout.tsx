"use client";

import { DashboardLayout } from "@/components/dashboard/shared/layout";

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout role="student">{children}</DashboardLayout>;
}