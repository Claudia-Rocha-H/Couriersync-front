import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';

interface Session {
  token: string | null;
  role: string | null;
  name: string | null;
}

export function useSession(allowedRolesInput: string[]) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const allowedRoles = useMemo(() => allowedRolesInput, [allowedRolesInput.join()]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const name = localStorage.getItem('name');

    if (!token || !role) {
      router.replace('/unauthorized?code=401');
    } else if (!allowedRoles.includes(role)) {
      router.replace('/unauthorized?code=403');
    } else {
      setSession({ token, role, name });
    }

    setLoading(false);
  }, [allowedRoles, router]);

  return { session, loading };
}

