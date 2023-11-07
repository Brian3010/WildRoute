import mapboxgl, { Map } from 'mapbox-gl';
import 'mapbox-gl/src/css/mapbox-gl.css'; // fix Mapbox CSS missing warning
import { useEffect, useRef, useState } from 'react';
import useMapBox from '../hooks/useMapBox';
import { TActies } from '../services/getActies';
import { initMap } from '../utils/initMap';

interface MapBoxProps {
  geometry: TActies['geometry'][];
}

function MapBox({ geometry }: MapBoxProps) {
  // console.log(geometry);
  // return <div></div>;
  const mapContainnerRef = useRef<HTMLDivElement>(null);
  let controlMapRef = useRef<mapboxgl.Map | null>();

  // useMapBox() return instance of mapboxgl.Map
  controlMapRef = useMapBox(mapContainnerRef, 137, -32, 4);

  useEffect(() => {
    if (controlMapRef.current) {
      // new mapboxgl.Marker().setLngLat([145, -37]).addTo(controlMapRef.current);
      geometry.map(geo => {
        return (
          controlMapRef.current &&
          new mapboxgl.Marker().setLngLat([geo.coordinates[0], geo.coordinates[1]]).addTo(controlMapRef.current)
        );
      });
      //TODO: display clusters, and dipslay map in detail's page
      //! icon in navigatinControl won't show up
      controlMapRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    }
  }, [geometry]);

  return (
    <div>
      <div id="mapBox" ref={mapContainnerRef} style={{ height: '500px' }} />
    </div>
  );
}

export default MapBox;
