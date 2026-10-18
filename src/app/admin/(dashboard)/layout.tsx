import React from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <div className="flex flex-col gap-6 lg:flex-row">
        <AdminSidebar />
        <div className="flex-1 min-w-0 space-y-6">{children}</div>
      </div>
    </div>
  );
}
