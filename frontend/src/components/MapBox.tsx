import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // fix Mapbox CSS missing warning

import { CSSProperties, useEffect, useRef, useState } from 'react';
import useMapBox from '../hooks/useMapBox';
import { TActies } from '../services/getActies';

interface MapBoxProps {
  geometry: TActies['geometry'][];
  style: CSSProperties;
}

function MapBox({ geometry, style }: MapBoxProps) {
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
      controlMapRef.current.addControl(new mapboxgl.NavigationControl());
    }
  }, [geometry]);

  return (
    <div>
      <div id="mapBox" ref={mapContainnerRef} style={style} />
    </div>
  );
}

export default MapBox;
