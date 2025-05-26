'use client'

import { useState } from 'react'
import { BaseTable } from '@/components/ui/table'
import EditCityModal from '@/components/modals/edit_city'
import DeleteCityModal from '@/components/modals/delete_city'
import CreateCityModal from '@/components/modals/add_city'

type City = {
  id: number
  name: string
  department: string
  latitude: number
  longitude: number
}

type Props = {
  cities: City[]
}

export default function CityTable({ cities }: Props) {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [regionFilter, setRegionFilter] = useState('todos')
  const [search, setSearch] = useState('')

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState<City | null>(null)

  const regions = [
    'Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bolívar', 'Boyacá',
    'Caldas', 'Caquetá', 'Casanare', 'Cauca', 'Cesar', 'Chocó', 'Córdoba',
    'Cundinamarca', 'Guainía', 'Guaviare', 'Huila', 'La Guajira', 'Magdalena',
    'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindío', 'Risaralda',
    'San Andrés y Providencia', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca',
    'Vaupés', 'Vichada',
  ]

  const filteredCities = cities.filter(city => {
    const matchesRegion = regionFilter === 'todos' || city.department === regionFilter
    const matchesSearch = city.name.toLowerCase().includes(search.toLowerCase())
    return matchesRegion && matchesSearch
  })

  const indexOfLast = currentPage * rowsPerPage
  const indexOfFirst = indexOfLast - rowsPerPage
  const currentCities = filteredCities.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(filteredCities.length / rowsPerPage)

  const columns = [
    { key: 'name', label: 'Nombre' },
    { key: 'department', label: 'Departamento' },
    { key: 'id', label: 'ID' },
    { key: 'latitude', label: 'Latitud' },
    { key: 'longitude', label: 'Longitud' },
  ]

  const actions = [
    {
      label: 'Editar',
      onClick: (city: City) => {
        setSelectedCity(city)
        setIsEditModalOpen(true)
      },
      className: 'text-blue-600',
    },
    {
      label: 'Eliminar',
      onClick: (city: City) => {
        setSelectedCity(city)
        setIsDeleteModalOpen(true)
      },
      className: 'text-red-600',
    },
  ]

  const filters = (
    <div className="flex flex-col md:flex-row justify-between gap-4">
      <select
        value={regionFilter}
        onChange={(e) => setRegionFilter(e.target.value)}
        className="border border-gray-300 rounded p-2"
      >
        <option value="todos">Ver todos</option>
        {regions.map(region => (
          <option key={region} value={region}>{region}</option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Buscar por nombre"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 rounded p-2 w-full md:w-1/2"
      />
    </div>
  )

  const handleChangePage = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentPage > 1) setCurrentPage(prev => prev - 1)
    if (direction === 'next' && currentPage < totalPages) setCurrentPage(prev => prev + 1)
  }

  const handleRowsPerPageChange = (value: number) => {
    setRowsPerPage(value)
    setCurrentPage(1)
  }

  const openCreateModal = () => {
    setSelectedCity(null)
    setIsCreateModalOpen(true)
  }

  return (
    <>
      <p className="text-gray-600 mb-4">Listado de ciudades en las que opera CourierSync</p>

      <BaseTable<City>
        columns={columns}
        data={currentCities}
        actions={actions}
        filters={filters}
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleRowsPerPageChange}
        onAdd={openCreateModal}
        addButtonLabel="Agregar ciudad"
        noDataText="No se encontraron ciudades."
      />

      {isEditModalOpen && selectedCity && (
        <EditCityModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onConfirm={(updatedData) => {
            console.log('Guardar cambios:', updatedData)
            setIsEditModalOpen(false)
          }}
          initialData={{
            name: selectedCity.name,
            department: selectedCity.department,
            latitude: selectedCity.latitude.toString(),
            longitude: selectedCity.longitude.toString(),
          }}
        />
      )}

      {isDeleteModalOpen && selectedCity && (
        <DeleteCityModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => {
            console.log('Eliminar ciudad ID:', selectedCity.id)
            setIsDeleteModalOpen(false)
          }}
        />
      )}

      {isCreateModalOpen && (
        <CreateCityModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onConfirm={(newCityData) => {
            console.log('Crear ciudad:', newCityData)
            setIsCreateModalOpen(false)
          }}
        />
      )}
    </>
  )
}
