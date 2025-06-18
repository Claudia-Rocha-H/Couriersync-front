'use client'

import React, { useState } from 'react';
import { Filters } from './filters';
import { RouteTable, Route } from '@/components/tables/routeTable';
import CreateRouteModal from '@/components/modals/create-route';

const dummyRoutes: Route[] = [
  {
    id: '1',
    origin: 'Bogotá',
    destination: 'Medellín',
    distanceKm: 415,
    estimatedDuration: '8h 30m',
    edited: true,
    lastEditedBy: 'Juan Rodriguez',
    lastEditedDate: '2025-05-20T10:00:00Z',
  },
  {
    id: '2',
    origin: 'Medellín',
    destination: 'Cali',
    distanceKm: 420,
    estimatedDuration: '9h 15m',
    edited: false,
    lastEditedBy: 'Carlos Perez',
    lastEditedDate: '2025-05-20T10:00:00Z',
  },
  {
    id: '3',
    origin: 'Cali',
    destination: 'Barranquilla',
    distanceKm: 1120,
    estimatedDuration: '20h 45m',
    edited: true,
    lastEditedBy: 'Laura Martínez',
    lastEditedDate: '2025-05-21T14:22:00Z',
  },
  {
    id: '4',
    origin: 'Cartagena',
    destination: 'Santa Marta',
    distanceKm: 230,
    estimatedDuration: '4h 10m',
    edited: false,
    lastEditedBy: 'Andrés Gómez',
    lastEditedDate: '2025-05-22T08:30:00Z',
  },
  {
    id: '5',
    origin: 'Bucaramanga',
    destination: 'Cúcuta',
    distanceKm: 200,
    estimatedDuration: '3h 50m',
    edited: true,
    lastEditedBy: 'Mariana López',
    lastEditedDate: '2025-05-23T17:45:00Z',
  },
  {
    id: '6',
    origin: 'Pereira',
    destination: 'Manizales',
    distanceKm: 55,
    estimatedDuration: '1h 20m',
    edited: false,
    lastEditedBy: 'Santiago Ramírez',
    lastEditedDate: '2025-05-23T10:10:00Z',
  },
  {
    id: '7',
    origin: 'Ibagué',
    destination: 'Neiva',
    distanceKm: 220,
    estimatedDuration: '4h 5m',
    edited: true,
    lastEditedBy: 'Natalia Ruiz',
    lastEditedDate: '2025-05-24T09:00:00Z',
  },
  {
    id: '8',
    origin: 'Popayán',
    destination: 'Pasto',
    distanceKm: 260,
    estimatedDuration: '5h 30m',
    edited: false,
    lastEditedBy: 'Jorge Herrera',
    lastEditedDate: '2025-05-24T13:20:00Z',
  },
  {
    id: '9',
    origin: 'Villavicencio',
    destination: 'Bogotá',
    distanceKm: 120,
    estimatedDuration: '2h 30m',
    edited: true,
    lastEditedBy: 'Ana Torres',
    lastEditedDate: '2025-05-25T07:45:00Z',
  },
  {
    id: '10',
    origin: 'Montería',
    destination: 'Sincelejo',
    distanceKm: 180,
    estimatedDuration: '3h 25m',
    edited: false,
    lastEditedBy: 'Pedro Salazar',
    lastEditedDate: '2025-05-25T12:15:00Z',
  },
];

export function RoutesPage() {
  const [routes, setRoutes] = useState<Route[]>(dummyRoutes);
  const [originCity, setOriginCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredRoutes = routes.filter((route) => {
    const matchOrigin =
      !originCity || route.origin.toLowerCase() === originCity.toLowerCase();
    const matchDestination =
      !destinationCity || route.destination.toLowerCase() === destinationCity.toLowerCase();
    const matchSearch =
      searchTerm === '' ||
      route.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchOrigin && matchDestination && matchSearch;
  });

  function handleEdit(id: string) {
    alert(`Editar ruta ${id}`);
  }

  function handleDelete(id: string) {
    const confirmed = confirm(`¿Seguro que quieres borrar la ruta ${id}?`);
    if (confirmed) {
      setRoutes((prev) => prev.filter((r) => r.id !== id));
    }
  }

  function resetFilters() {
    setOriginCity('');
    setDestinationCity('');
    setSearchTerm('');
  }

  function handleCreateRoute(origin: string, destination: string) {
    console.log('Nueva ruta creada:', origin, destination);
    const newRoute: Route = {
      id: `R-${Math.floor(Math.random() * 1000)}`,
      origin,
      destination,
      distanceKm: 100, 
      estimatedDuration: '2h',
      edited: false,
      lastEditedBy: 'Pedro Salazar',
      lastEditedDate: '2025-05-25T12:15:00Z',
    };
    setRoutes((prev) => [...prev, newRoute]);
  }

  return (
    <div>
      <p className="text-gray-600 mb-4">Listado de rutas activas en CourierSync</p>

      <Filters
        originCity={originCity}
        destinationCity={destinationCity}
        searchTerm={searchTerm}
        onOriginCityChange={setOriginCity}
        onDestinationCityChange={setDestinationCity}
        onSearchTermChange={setSearchTerm}
        onReset={resetFilters}
        cities={['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena']}
      />

      
      <RouteTable
        routes={filteredRoutes}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Crear ruta
        </button>
      </div>
      <CreateRouteModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateRoute}
      />
    </div>
  );
}