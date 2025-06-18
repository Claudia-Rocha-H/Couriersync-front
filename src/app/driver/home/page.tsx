'use client'

import { Card, CardContent } from '@/components/cards/card'
import AssignmentTable from '@/components/tables/assignmentTable'

const mockAssignments = [
  { id: 1, orderNumber: 'ORD-001', city: 'Bogotá', date: '2025-05-25', status: 'Pendiente' },
  { id: 2, orderNumber: 'ORD-002', city: 'Medellín', date: '2025-05-24', status: 'Entregado' },
  { id: 3, orderNumber: 'ORD-003', city: 'Cali', date: '2025-05-23', status: 'En camino' },
  { id: 4, orderNumber: 'ORD-004', city: 'Barranquilla', date: '2025-05-22', status: 'Pendiente' },
  { id: 5, orderNumber: 'ORD-005', city: 'Cartagena', date: '2025-05-21', status: 'Entregado' },
  { id: 6, orderNumber: 'ORD-006', city: 'Pereira', date: '2025-05-20', status: 'En camino' },
]

export default function DriverHome() {
  return (
    <main className="pt-20 px-4 space-y-6">
 
      <div className="bg-green-100 border border-green-300 rounded-md p-4">
        <p className="font-semibold text-green-800">Entrega en curso</p>
        <p className="text-sm text-gray-700">13:21:50</p>
        <p className="text-sm text-gray-700">Medellín - Bogotá</p>
        <button className="mt-2 bg-green-600 text-white px-4 py-1 text-sm rounded hover:bg-green-700">
          Ver detalles ↗
        </button>
      </div>


      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-200 p-4 rounded-md text-center">
          <p className="text-sm text-gray-600">Entregas Asignadas</p>
          <p className="text-2xl font-bold">4</p>
        </div>
        <div className="bg-gray-200 p-4 rounded-md text-center">
          <p className="text-sm text-gray-600">Entregas Completadas</p>
          <p className="text-2xl font-bold">2</p>
        </div>
      </div>

 
      <Card>
        <CardContent className="p-4">
          <h2 className="font-semibold mb-1">Asignaciones</h2>
          <p className="text-sm text-gray-500 mb-4">Resumen de asignaciones</p>
          <AssignmentTable assignments={mockAssignments} />
        </CardContent>
      </Card>
    </main>
  )
}
