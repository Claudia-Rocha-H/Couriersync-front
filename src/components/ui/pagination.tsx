'use client'

import React from 'react'

type Props = {
  currentPage: number
  totalPages: number
  rowsPerPage: number
  onRowsPerPageChange: (value: number) => void
  onPageChange: (direction: 'prev' | 'next') => void
}

const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  rowsPerPage,
  onRowsPerPageChange,
  onPageChange
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
      <div>
        <label htmlFor="rows" className="mr-2 text-sm text-gray-700">Filas por página:</label>
        <select
          id="rows"
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
          className="border border-gray-300 rounded p-1"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange('prev')}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded text-sm disabled:text-gray-400"
        >
          Anterior
        </button>
        <span className="text-sm text-gray-700">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => onPageChange('next')}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded text-sm disabled:text-gray-400"
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}

export default Pagination
