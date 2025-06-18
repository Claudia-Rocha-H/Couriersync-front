'use client';

import AccountPage from '@/components/account/accountPage';
import ProtectedRoute from '@/components/security/protectedRoute';
import { useSession } from '@/features/auth/hooks/useSession';
import LoadingPage from '@/components/ui/loading_page';

export default function OperatorAccountPage() {
    const { session, loading } = useSession(['operator']);
    if (loading) return <LoadingPage message="Cargando ..." />;
    if (!session) return null;

    const user = {
        name: session.name || '',
        role: 'operator',
        email: 'daniel.herrera@example.com', 
    };

    return (
        <ProtectedRoute allowedRoles={['operator']}>
        <AccountPage user={user} />
        </ProtectedRoute>
    );
}