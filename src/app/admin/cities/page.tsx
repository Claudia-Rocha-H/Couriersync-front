'use client';
import LoadingPage from '@/components/ui/loading_page';
import { useCities } from '@/features/cities/hooks/useCities';
import CityTable from '@/components/tables/cityTable';
import ProtectedRoute from '@/components/security/protectedRoute';
import { useSession } from '@/features/auth/hooks/useSession';


export default function AdminCitiesPage() {
  const { session, loading } = useSession(['administrator']); 
  const { cities, error } = useCities();
  if (loading) return <LoadingPage message="Cargando ..." />;
  if (!session) return null;

  return (
    <ProtectedRoute allowedRoles={['administrator']}>
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Ciudades</h2>

        {loading && <p>Cargando ciudades...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && <CityTable cities={cities ?? []} />}
      </section>
    </ProtectedRoute>
  );
}
