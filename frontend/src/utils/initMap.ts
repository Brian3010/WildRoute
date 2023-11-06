import mapboxgl from 'mapbox-gl';

export const initMap = (mapContainer: HTMLDivElement, lng: number, lat: number, zoom: number) => {
  return new mapboxgl.Map({
    container: mapContainer,
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [lng, lat],
    zoom,
    accessToken: import.meta.env.VITE_MAPBOXTOKEN,
  });
};
