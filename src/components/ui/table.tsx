import React from 'react'
import Pagination from "@/components/ui/pagination"
import Button from "@/components/ui/button"


type Column<T> = {
  key: keyof T | string
  label: string
  render?: (row: T) => React.ReactNode
  className?: string
}

type Action<T> = {
  label: string
  onClick: (row: T) => void
  className?: string
}

type BaseTableProps<T> = {
  columns: Column<T>[]
  data: T[]
  actions?: Action<T>[]
  noDataText?: string
  filters?: React.ReactNode
  currentPage: number
  totalPages: number
  rowsPerPage: number
  onPageChange: (direction: 'prev' | 'next') => void
  onRowsPerPageChange: (count: number) => void
  onAdd?: () => void
  addButtonLabel?: string
}


export function BaseTable<T>({
  columns,
  data,
  actions,
  noDataText = 'No se encontraron resultados.',
  filters,
  currentPage,
  totalPages,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onAdd,
  addButtonLabel = 'Agregar',
}: BaseTableProps<T>) {
  return (
    <div className="bg-white p-6 shadow rounded-lg">
      {filters && <div className="mb-4">{filters}</div>}

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border text-left">
          <thead>
            <tr className="bg-gray-200">
              {columns.map((col, index) => (
                <th key={index} className={`px-4 py-2 border ${col.className || ''}`}>
                  {col.label}
                </th>
              ))}
              {actions && <th className="px-4 py-2 border">Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="text-center py-4 text-gray-500">
                  {noDataText}
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  {columns.map((col, index) => (
                    <td key={index} className={`px-4 py-2 border ${col.className || ''}`}>
                      {col.render ? col.render(row) : (row as any)[col.key]}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-4 py-2 border">
                      {actions.map((action, i) => (
                        <button
                          key={i}
                          className={`mr-2 hover:underline ${action.className || 'text-blue-600'}`}
                          onClick={() => action.onClick(row)}
                        >
                          {action.label}
                        </button>
                      ))}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(value) => {
          onRowsPerPageChange(value)
          onPageChange('prev')
        }}
        onPageChange={onPageChange}
      />

      {onAdd && (
        <div className="mt-6 flex justify-center">
          <Button variant="primary" onClick={onAdd}>
            {addButtonLabel}
          </Button>
        </div>
      )}
    </div>
  )
}
