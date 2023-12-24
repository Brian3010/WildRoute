import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOXTOKEN;
export const initMap = (mapContainer: HTMLDivElement, lng: number, lat: number, zoom: number) => {
  const container = typeof mapContainer === 'string' ? document.getElementById(mapContainer) : mapContainer;
  if (!container) {
    console.error('Map container element not found.');
    return null; // Handle the error or return an appropriate value
  }

  // Ensure the container is empty before initializing the map
  container.innerHTML = '';

  return new mapboxgl.Map({
    container: mapContainer || 'mapBox',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [lng, lat],
    zoom,
  });
};
