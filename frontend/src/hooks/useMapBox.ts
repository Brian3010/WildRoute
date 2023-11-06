import mapboxgl from 'mapbox-gl';
import { RefObject, useEffect, useRef } from 'react';
import { initMap } from '../utils/initMap';

const useMapBox = (mapContainer: RefObject<HTMLDivElement>, lng: number, lat: number, zoom: number) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (mapContainer.current) {
      mapRef.current = initMap(mapContainer.current, lng, lat, zoom);
    }
  }, [lat, lng, mapContainer, zoom]);

  return mapRef;
};

export default useMapBox;
