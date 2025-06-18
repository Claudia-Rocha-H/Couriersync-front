'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

type Props = {
  startCoords: [number, number];
  endCoords: [number, number];
};

export default function MapComponent({ startCoords, endCoords }: Props) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const routeRef = useRef<L.Polyline | null>(null);
  const routeCache = useRef<Record<string, [number, number][]>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (mapRef.current && !leafletMapRef.current) {
      const map = L.map(mapRef.current).setView([5, -74], 6); 
      leafletMapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    }

    return () => {
      leafletMapRef.current?.remove();
      leafletMapRef.current = null;
    };
  }, []);

  useEffect(() => {
    async function fetchRoute() {
      if (!leafletMapRef.current) return;

      const map = leafletMapRef.current;
      const cacheKey = `${startCoords}-${endCoords}`;

      setIsLoading(true);

      if (routeRef.current) {
        map.removeLayer(routeRef.current);
        routeRef.current = null;
      }

      markersRef.current.forEach(marker => map.removeLayer(marker));
      markersRef.current = [];

      if (routeCache.current[cacheKey]) {
        const latLngs = routeCache.current[cacheKey];
        drawRoute(latLngs);
        setIsLoading(false);
        return;
      }

      try {
        const apiKey = '5b3ce3597851110001cf624875908b0d3d0c44b7bbd1a9ecc2d26511';
        const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startCoords[1]},${startCoords[0]}&end=${endCoords[1]},${endCoords[0]}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error('Error al cargar la ruta');

        const data = await res.json();
        const coords = data.features[0].geometry.coordinates;
        const latLngs = coords.map(([lon, lat]: [number, number]) => [lat, lon] as [number, number]);

        routeCache.current[cacheKey] = latLngs;
        drawRoute(latLngs);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    function drawRoute(latLngs: [number, number][]) {
      if (!leafletMapRef.current) return;

      const map = leafletMapRef.current;

      const startMarker = L.marker(startCoords).bindPopup('Origen').openPopup();
      const endMarker = L.marker(endCoords).bindPopup('Destino');
      startMarker.addTo(map);
      endMarker.addTo(map);
      markersRef.current.push(startMarker, endMarker);

      const routeLine = L.polyline(latLngs, { color: 'blue' }).addTo(map);
      routeRef.current = routeLine;

      map.fitBounds(routeLine.getBounds());
    }

    fetchRoute();
  }, [startCoords, endCoords]);

  return (
    <div className="relative h-full w-full">
      <div ref={mapRef} className="h-full w-full z-0" />
      {isLoading && (
        <div className="absolute inset-0 z-10 bg-white bg-opacity-60 flex items-center justify-center">
          <span className="text-gray-700 animate-pulse">Cargando ruta...</span>
        </div>
      )}
    </div>
  );
}
