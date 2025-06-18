'use client';

import AccountPage from '@/components/account/accountPage';
import ProtectedRoute from '@/components/security/protectedRoute';
import { useSession } from '@/features/auth/hooks/useSession';
import LoadingPage from '@/components/ui/loading_page';

export default function AdminAccountPage() {
    const { session, loading } = useSession(['administrator']);
    if (loading) return <LoadingPage message="Cargando ..." />;
    if (!session) return null;

    const user = {
        name: session.name || '',
        role: 'Administrador',
        email: 'daniel.herrera@example.com', 
    };

    return (
        <ProtectedRoute allowedRoles={['administrator']}>
        <AccountPage user={user} />
        </ProtectedRoute>
    );
}
