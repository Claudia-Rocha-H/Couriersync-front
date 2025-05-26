
'use client'

import { useState } from 'react'
import { BaseTable } from '@/components/ui/table'  

export interface Route {
  id: string;
  origin: string;
  destination: string;
  distanceKm: number;
  estimatedDuration: string;
  edited: boolean;
  lastEditedBy: string;
  lastEditedDate: string;
}

interface RouteTableProps {
  routes: Route[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function RouteTable({ routes, onEdit, onDelete }: RouteTableProps) {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const filteredRoutes = routes.filter(route =>
    route.origin.toLowerCase().includes(search.toLowerCase()) ||
    route.destination.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filteredRoutes.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const currentRoutes = filteredRoutes.slice(startIndex, startIndex + rowsPerPage)

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'origin', label: 'Origen' },
    { key: 'destination', label: 'Destino' },
    { key: 'distanceKm', label: 'Distancia (km)' },
    { key: 'estimatedDuration', label: 'Duración estimada' },
    { key: 'edited', label: 'Editada', render: (route: Route) => (route.edited ? 'Sí' : 'No') },
    { key: 'lastEditedBy', label: 'Última edición' },
    { 
      key: 'lastEditedDate', 
      label: 'Fecha última edición',
      render: (route: Route) => new Date(route.lastEditedDate).toLocaleDateString()
    },
  ]

  const actions = [
    {
      label: 'Editar',
      onClick: (route: Route) => onEdit(route.id),
      className: 'text-blue-600',
    },
    {
      label: 'Borrar',
      onClick: (route: Route) => onDelete(route.id),
      className: 'text-red-600',
    },
  ]

  return (
    <div className="bg-white shadow rounded-lg p-6 overflow-x-auto">
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Buscar por origen o destino"
          value={search}
          onChange={e => {
            setSearch(e.target.value)
            setCurrentPage(1)
          }}
          className="border border-gray-300 rounded p-2 w-full max-w-sm"
        />
      </div>

      <BaseTable
        columns={columns}
        data={currentRoutes}
        actions={actions}
        noDataText="No se encontraron rutas."
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        onPageChange={(direction) => {
          if (direction === 'prev' && currentPage > 1) setCurrentPage(currentPage - 1)
          if (direction === 'next' && currentPage < totalPages) setCurrentPage(currentPage + 1)
        }}
        onRowsPerPageChange={(count) => {
          setRowsPerPage(count)
          setCurrentPage(1)
        }}
      />
    </div>
  )
}
