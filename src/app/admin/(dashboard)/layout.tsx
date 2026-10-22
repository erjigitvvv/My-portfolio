import React from "react";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { getAdminSession } from "@/lib/auth";

// Never cache anything rendered behind the admin session.
export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Second line of defence (middleware is the first): verify the signed session
  // on the server before rendering ANY admin page or touching the database.
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <div className="flex flex-col gap-6 lg:flex-row">
        <AdminSidebar />
        <div className="flex-1 min-w-0 space-y-6">{children}</div>
      </div>
    </div>
  );
}
