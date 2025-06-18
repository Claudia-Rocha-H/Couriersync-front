'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from '@/features/auth/hooks/useSession';
import LoadingPage from '@/components/ui/loading_page';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

const maliciousPatterns = [
  /<script.*?>.*?<\/script>/i,
  /javascript:/i,
  /onerror=/i,
  /('|")\s*or\s*('|")?1('|")?\s*=\s*('|")?1/i,
  /--/i,
  /union\s+select/i,
  /drop\s+table/i,
];

function detectMaliciousActivity(value: string) {
  const decoded = decodeURIComponent(value);
  return maliciousPatterns.some((pattern) => pattern.test(decoded));
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    for (const value of searchParams.values()) {
      if (detectMaliciousActivity(value)) {
        router.replace('/unauthorized?code=998');
        return;
      }
    }
  }, [searchParams, router]);

  const { loading, session } = useSession(allowedRoles);

  if (loading) return <LoadingPage message="Cargando ..." />;
  if (!session) return null;

  return <>{children}</>;
}
