'use client'

import { useState } from 'react'
import { BaseTable } from '@/components/ui/table'

type Assignment = {
  id: number
  orderNumber: string
  city: string
  date: string
  status: string
}

type Props = {
  assignments: Assignment[]
}

export default function AssignmentTable({ assignments }: Props) {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [search, setSearch] = useState('')

  const filteredData = assignments.filter((a) =>
    a.orderNumber.toLowerCase().includes(search.toLowerCase())
  )

  const indexOfLast = currentPage * rowsPerPage
  const indexOfFirst = indexOfLast - rowsPerPage
  const currentAssignments = filteredData.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(filteredData.length / rowsPerPage)

  const columns = [
    { key: 'orderNumber', label: 'N° Pedido' },
    { key: 'city', label: 'Ciudad' },
    { key: 'date', label: 'Fecha' },
    { key: 'status', label: 'Estado' },
  ]

  const filters = (
    <input
      type="text"
      placeholder="Buscar por número de pedido"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border border-gray-300 rounded p-2 w-full md:w-1/2"
    />
  )

  const handleChangePage = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentPage > 1) setCurrentPage(prev => prev - 1)
    if (direction === 'next' && currentPage < totalPages) setCurrentPage(prev => prev + 1)
  }

  const handleRowsPerPageChange = (value: number) => {
    setRowsPerPage(value)
    setCurrentPage(1)
  }

  return (
    <BaseTable<Assignment>
      columns={columns}
      data={currentAssignments}
      currentPage={currentPage}
      totalPages={totalPages}
      rowsPerPage={rowsPerPage}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleRowsPerPageChange}
      filters={filters}
      noDataText="No hay asignaciones disponibles."
    />
  )
}
