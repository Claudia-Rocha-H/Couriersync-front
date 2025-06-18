'use client';

import Dialog from '@/components/ui/dialog';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('@/components/routes/map'), { ssr: false });

const cityCoords: Record<string, [number, number]> = {
  Bogotá: [4.6097, -74.0817],
  Medellín: [6.2442, -75.5812],
  Cali: [3.4516, -76.5320],
  Barranquilla: [10.9685, -74.7813],
  Cartagena: [10.3997, -75.5144],
};

const allCities = Object.keys(cityCoords);

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (origin: string, destination: string) => void;
}

export default function CreateRouteModal({ isOpen, onClose, onCreate }: Props) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [startCoords, setStartCoords] = useState<[number, number] | null>(null);
  const [endCoords, setEndCoords] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (origin && destination && cityCoords[origin] && cityCoords[destination]) {
      setStartCoords(cityCoords[origin]);
      setEndCoords(cityCoords[destination]);
    } else {
      setStartCoords(null);
      setEndCoords(null);
    }
  }, [origin, destination]);

  function handleConfirm() {
    if (!origin || !destination) {
      alert('Por favor, seleccione origen y destino.');
      return;
    }
    onCreate(origin, destination);
    onClose();
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Crear nueva ruta"
      sizeClass="max-w-4xl"
      heightClass="h-[90vh]" 
      footer={
        <>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Confirmar
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-4 h-[70vh]">
        <label>
          Ciudad de origen:
          <select
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          >
            <option value="">Seleccione una ciudad</option>
            {allCities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </label>

        <label>
          Ciudad de destino:
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          >
            <option value="">Seleccione una ciudad</option>
            {allCities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </label>

        <div className="h-full w-full border rounded overflow-hidden">
          {startCoords && endCoords ? (
            <MapComponent startCoords={startCoords} endCoords={endCoords} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Seleccione origen y destino para ver la ruta
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
}
