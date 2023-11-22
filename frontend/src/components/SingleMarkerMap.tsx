import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';
import useMapBox from '../hooks/useMapBox';
import { TActies } from '../services/getActies';

interface SingleMarkerMapProps {
  geometry: TActies['geometry'];
}

function SingleMarkerMap({ geometry }: SingleMarkerMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  let mapController = useRef<mapboxgl.Map | null>();

  mapController = useMapBox(mapContainerRef, geometry.coordinates[0], geometry.coordinates[1], 12);

  // new mapboxgl.Marker().setLngLat([geo.coordinates[0], geo.coordinates[1]]).addTo(controlMapRef.current)

  useEffect(() => {
    if (mapController.current) {
      // console.log('effect in singleMarkerMap');
      new mapboxgl.Marker().setLngLat([geometry.coordinates[0], geometry.coordinates[1]]).addTo(mapController.current);
    }
  }, [geometry.coordinates]);

  useEffect(() => {
    if (mapController.current) {
      mapController.current.addControl(new mapboxgl.NavigationControl());
    }
  }, []);

  return (
    <div>
      <div id="mapBox" ref={mapContainerRef} style={{ height: '400px' }}></div>
    </div>
  );
}

export default SingleMarkerMap;
