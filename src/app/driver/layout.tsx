'use client';

import ProtectedRoute from '@/components/security/protectedRoute';
import LayoutDriver from '@/components/layout/layout-driver';
import LoadingPage from '@/components/ui/loading_page';
import { useSession } from '@/features/auth/hooks/useSession';

export default function DriverHomePage({ children }: { children: React.ReactNode }) {
  const { session, loading } = useSession(['driver']);

  if (loading) return <LoadingPage message="Cargando..." />;
  if (!session) return null;
  const roleMap: Record<string, 'admin' | 'operator' | 'driver'> = {
  administrator: 'admin',
  operator: 'operator',
  driver: 'driver',
  };

  const dashboardRole = roleMap[session?.role ?? ''] || 'driver';
  return (
    <ProtectedRoute allowedRoles={['driver']}>
      <LayoutDriver 
      userName={session.name || 'driver'}
      role={dashboardRole}>
        {children}
      </LayoutDriver>
    </ProtectedRoute>
  );
}
