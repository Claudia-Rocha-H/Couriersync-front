'use client';

import { useEffect, useState } from "react";
import LayoutDashboard from "@/components/layout/layout-dashboard";
import { useSession } from "@/features/auth/hooks/useSession";
import LoadingPage from "@/components/ui/loading_page"; 

export default function OperatorLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState<boolean | null>(null);
  const { session, loading } = useSession(['operator']);

  const userEmail = session?.name ?? 'unknown-user';

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

  if (loading || collapsed === null) {
    return <LoadingPage message="Cargando panel de operador..." />;
  }

  if (!session) {
    return null; 
  }
  const roleMap: Record<string, 'admin' | 'operator' | 'driver'> = {
  administrator: 'admin',
  operator: 'operator',
  driver: 'driver',
  };

  const dashboardRole = roleMap[session?.role ?? ''] || 'operator';
  return (
    <LayoutDashboard
      userName={session.name || 'Operador'}
      role={dashboardRole}
      collapsed={collapsed}
      toggleSidebar={toggleSidebar}
    >
      {children}
    </LayoutDashboard>
  );
}