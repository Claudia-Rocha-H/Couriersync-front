'use client';

import { useEffect, useState } from "react";
import LayoutDashboard from "@/components/layout/layout-dashboard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState<boolean | null>(null);

  const userEmail = "daniel.herrera@example.com";

  useEffect(() => {
    const saved = localStorage.getItem(`sidebar-collapsed-${userEmail}`);
    if (saved !== null) {
      setCollapsed(saved === "true");
    } else {
      setCollapsed(false);
    }
  }, [userEmail]);

  useEffect(() => {
    if (collapsed !== null) {
      localStorage.setItem(`sidebar-collapsed-${userEmail}`, String(collapsed));
    }
  }, [collapsed, userEmail]);

  const toggleSidebar = () => setCollapsed(prev => !prev);

  if (collapsed === null) return null;

  return (
    <LayoutDashboard
      userName="Carlos Perez"
      role="admin"
      collapsed={collapsed}
      toggleSidebar={toggleSidebar}
    >
      {children}
    </LayoutDashboard>
  );
}
