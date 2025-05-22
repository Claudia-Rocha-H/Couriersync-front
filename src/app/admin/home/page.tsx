'use client'

export default function AdminHomePage() {
  return (
    <section className="p-6">
      {/* Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center">
          <h3 className="text-lg font-bold text-gray-700">Total de Usuarios</h3>
          <span className="text-4xl font-bold text-blue-700">78</span>
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

      {/* Últimas alertas */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-2">Últimas Alertas</h2>
        <p className="text-gray-600 mb-4">
          Notificaciones recientes sobre el estado de rutas, entregas y operaciones.
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
              <tr className="text-gray-700">
                <td className="py-2 px-4 border-b">Ruta editada</td>
                <td className="py-2 px-4 border-b">Cali - Cúcuta</td>
                <td className="py-2 px-4 border-b">Felipe Correa</td>
                <td className="py-2 px-4 border-b text-yellow-500">Media</td>
                <td className="py-2 px-4 border-b">
                  <a href="#" className="text-blue-500">Ver</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
