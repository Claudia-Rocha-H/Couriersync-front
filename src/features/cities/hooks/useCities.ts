import { useState, useEffect } from 'react';
import { ICity } from '@/types/cities';

const mockCities: ICity[] = [
  { id: 1, name: 'Medellín', department: 'Antioquia', latitude: 6.2442, longitude: -75.5812 },
  { id: 2, name: 'Bogotá', department: 'Cundinamarca', latitude: 4.711, longitude: -74.0721 },
  { id: 3, name: 'Cali', department: 'Valle del Cauca', latitude: 3.4516, longitude: -76.5319 },
  { id: 4, name: 'Barranquilla', department: 'Atlántico', latitude: 10.9639, longitude: -74.7964 },
  { id: 5, name: 'Cartagena', department: 'Bolívar', latitude: 10.391, longitude: -75.4794 },
  { id: 6, name: "Medellín", department: "Antioquia", latitude: 6.2442, longitude: -75.5812 },
  { id: 7, name: "Bogotá", department: "Cundinamarca", latitude: 4.711, longitude: -74.0721 },
  { id: 8, name: "Cali", department: "Valle del Cauca", latitude: 3.4516, longitude: -76.5319 },
  { id: 9, name: "Barranquilla", department: "Atlántico", latitude: 10.9639, longitude: -74.7964 },
  { id: 10, name: "Cartagena", department: "Bolívar", latitude: 10.391, longitude: -75.4794 },
  { id: 11, name: "Bucaramanga", department: "Santander", latitude: 7.1254, longitude: -73.1198 },
  { id: 12, name: "Pereira", department: "Risaralda", latitude: 4.8133, longitude: -75.6961 },
  { id: 13, name: "Santa Marta", department: "Magdalena", latitude: 11.2408, longitude: -74.199 },
  { id: 14, name: "Ibagué", department: "Tolima", latitude: 4.4389, longitude: -75.2322 },
  { id: 15, name: "Manizales", department: "Caldas", latitude: 5.0689, longitude: -75.5174 },
  { id: 16, name: "Neiva", department: "Huila", latitude: 2.9273, longitude: -75.2819 },
  { id: 17, name: "Cúcuta", department: "Norte de Santander", latitude: 7.8939, longitude: -72.5078 },
  { id: 18, name: "Villavicencio", department: "Meta", latitude: 4.1533, longitude: -73.635 },
  { id: 19, name: "Armenia", department: "Quindío", latitude: 4.5339, longitude: -75.6811 },
  { id: 20, name: "Valledupar", department: "Cesar", latitude: 10.4631, longitude: -73.2532 },
  { id: 21, name: "Sincelejo", department: "Sucre", latitude: 9.3047, longitude: -75.3978 },
  { id: 22, name: "Popayán", department: "Cauca", latitude: 2.4448, longitude: -76.6147 },
  { id: 23, name: "Tunja", department: "Boyacá", latitude: 5.5353, longitude: -73.3678 },
  { id: 24, name: "Floridablanca", department: "Santander", latitude: 7.0642, longitude: -73.0995 },
  { id: 25, name: "Palmira", department: "Valle del Cauca", latitude: 3.5394, longitude: -76.3036 }
];

export function useCities() {
  const [cities, setCities] = useState<ICity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500)); 
        setCities(mockCities);
      } catch (e) {
        setError('No se pudieron cargar las ciudades');
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  return { cities, loading, error };
}
