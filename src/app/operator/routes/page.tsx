'use client';

import React from 'react';
import { RoutesPage } from '@/components/routes/routesPage';
import ProtectedRoute from '@/components/security/protectedRoute';
import { useSession } from '@/features/auth/hooks/useSession';
import LoadingPage from '@/components/ui/loading_page';


export default function AdminRoutesPage() {
  const { session, loading } = useSession(['operator']);
  if (loading) return <LoadingPage message="Cargando ..." />;
  if (!session) return null;

  return (
    <ProtectedRoute allowedRoles={['operator']}>
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Rutas</h2>
        <RoutesPage />
      </section>
    </ProtectedRoute>
  );
}