import React from 'react';
import { RoutesPage } from '@/components/routes/routesPage';

export default function Routes() {
  return (
    <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Rutas</h2>
        <RoutesPage />
    </section>);
}