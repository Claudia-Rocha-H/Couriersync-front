'use client'

import ProtectedRoute from '@/components/security/protectedRoute';
import { useSession } from '@/features/auth/hooks/useSession';
import LoadingPage from '@/components/ui/loading_page';

export default function OperatorHomePage() {
  const { session, loading } = useSession(['operator']);

  if (loading) return <LoadingPage message="Cargando..." />;
  if (!session) return null; 
  return (
    <ProtectedRoute allowedRoles={['operator']}>
      <section className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center">
            <h3 className="text-lg font-bold text-gray-700">Total de Conductores</h3>
            <span className="text-4xl font-bold text-blue-700">36</span>
          </div>
          <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center">
            <h3 className="text-lg font-bold text-gray-700">Entregas Pendientes</h3>
            <span className="text-4xl font-bold text-yellow-500">5</span>
          </div>
          <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center">
            <h3 className="text-lg font-bold text-gray-700">Entregas Completadas</h3>
            <span className="text-4xl font-bold text-green-600">26</span>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-2">Alertas de Entrega</h2>
          <p className="text-gray-600 mb-4">
            Notificaciones recientes sobre el estado de las entregas.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-left">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="py-2 px-4 border-b">Tipo</th>
                  <th className="py-2 px-4 border-b">Ruta</th>
                  <th className="py-2 px-4 border-b">Usuario</th>
                  <th className="py-2 px-4 border-b">Prioridad</th>
                  <th className="py-2 px-4 border-b">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-gray-700">
                  <td className="py-2 px-4 border-b">Entrega atrasada</td>
                  <td className="py-2 px-4 border-b">Medellín - Bogotá</td>
                  <td className="py-2 px-4 border-b">Carlos Rodríguez</td>
                  <td className="py-2 px-4 border-b text-red-500">Alta</td>
                  <td className="py-2 px-4 border-b">
                    <a href="#" className="text-blue-500">Ver</a>
                  </td>
                </tr>
                <tr className="text-gray-700">
                  <td className="py-2 px-4 border-b">Entrega atrasada</td>
                  <td className="py-2 px-4 border-b">Cali - Bogotá</td>
                  <td className="py-2 px-4 border-b">Héctor Posada</td>
                  <td className="py-2 px-4 border-b text-red-600">Alta</td>
                  <td className="py-2 px-4 border-b">
                    <a href="#" className="text-blue-500">Ver</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </ProtectedRoute>
  )
}
