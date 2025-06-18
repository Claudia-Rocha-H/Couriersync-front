import { ReactNode } from 'react';
import { useSession } from '@/features/auth/hooks/useSession';
import LoadingPage from '@/components/ui/loading_page';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { loading, session } = useSession(allowedRoles);

  if (loading) return <LoadingPage message="Cargando ..." />;
  if (!session) return null;

  return <>{children}</>;
}
