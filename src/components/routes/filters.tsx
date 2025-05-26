import React from 'react';

interface FiltersProps {
  originCity: string;
  destinationCity: string;
  searchTerm: string;
  onOriginCityChange: (val: string) => void;
  onDestinationCityChange: (val: string) => void;
  onSearchTermChange: (val: string) => void;
  onReset: () => void;
  cities: string[];
}

export function Filters({
  originCity,
  destinationCity,
  searchTerm,
  onOriginCityChange,
  onDestinationCityChange,
  onSearchTermChange,
  onReset,
  cities,
}: FiltersProps) {
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4 flex flex-wrap gap-4 items-center">
      <button
        className="bg-blue-700 text-white px-4 py-2 rounded"
        onClick={onReset}
      >
        Ver todas
      </button>

      <select
        className="border border-gray-300 rounded p-2"
        value={originCity}
        onChange={(e) => onOriginCityChange(e.target.value)}
      >
        <option value="">Origen</option>
        {cities.map((city) => (
          <option key={'origin-' + city} value={city}>
            {city}
          </option>
        ))}
      </select>

      <select
        className="border border-gray-300 rounded p-2"
        value={destinationCity}
        onChange={(e) => onDestinationCityChange(e.target.value)}
      >
        <option value="">Destino</option>
        {cities.map((city) => (
          <option key={'dest-' + city} value={city}>
            {city}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Buscar ruta"
        className="border border-gray-300 rounded p-2 flex-grow min-w-[250px]"
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
      />
    </div>
  );
}
