import mapboxgl, { Map } from 'mapbox-gl';
import 'mapbox-gl/src/css/mapbox-gl.css'; // fix Mapbox CSS missing warning
import { useEffect, useRef, useState } from 'react';
import useMapBox from '../hooks/useMapBox';
import { initMap } from '../utils/initMap';

function MapBox() {
  // return <div></div>;
  const mapContainnerRef = useRef<HTMLDivElement>(null);
  let controlMapRef = useRef<mapboxgl.Map | null>();

  controlMapRef = useMapBox(mapContainnerRef, 145, -37, 5);

  useEffect(() => {
    if (controlMapRef.current) {
      new mapboxgl.Marker().setLngLat([145, -37]).addTo(controlMapRef.current);
    }
  }, []);

  return (
    <div>
      <div id="mapBox" ref={mapContainnerRef} style={{ height: '500px' }} />
    </div>
  );
}

export default MapBox;
