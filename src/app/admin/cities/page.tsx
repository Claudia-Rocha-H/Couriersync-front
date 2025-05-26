'use client';

import { useCities } from '@/features/cities/hooks/useCities';
import CityTable from '@/components/tables/cityTable';

export default function AdminCitiesPage() {
  const { cities, loading, error } = useCities();

  if (loading) return <p className="p-6">Cargando ciudades...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <section className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Ciudades</h2>
      <CityTable cities={cities ?? []} />
    </section>
  );
}
