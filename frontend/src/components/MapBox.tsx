import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // fix Mapbox CSS missing warning

import { CSSProperties, useEffect, useRef, useState } from 'react';
import useMapBox from '../hooks/useMapBox';
// import { TActies } from '../services/getActies';
import { TMarkerDetail } from '../pages/activityListPage';

interface MapBoxProps {
  markerDetail: TMarkerDetail[];
  style: CSSProperties;
}

function MapBox({ markerDetail, style }: MapBoxProps) {
  // console.log(geometry);
  // return <div></div>;
  const mapContainnerRef = useRef<HTMLDivElement>(null);
  let controlMapRef = useRef<mapboxgl.Map | null>();

  // useMapBox() return instance of mapboxgl.Map
  controlMapRef = useMapBox(mapContainnerRef, 137, -32, 4);

  useEffect(() => {
    if (controlMapRef.current) {
      // new mapboxgl.Marker().setLngLat([145, -37]).addTo(controlMapRef.current);
      markerDetail.map(m => {
        return (
          controlMapRef.current &&
          new mapboxgl.Marker()
            .setLngLat([m.geometry.coordinates[0], m.geometry.coordinates[1]])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }).setHTML(
                `<h3><a style="color:#333" href="activities/${m.id}">${m.title}</a></h3><p>${m.location}</p>`
              )
            )
            .addTo(controlMapRef.current)
        );
      });
      //TODO: display clusters, and dipslay map in detail's page
      controlMapRef.current.addControl(new mapboxgl.NavigationControl());
    }
  }, [markerDetail]);

  useEffect(() => {
    if (controlMapRef.current) {
      // controlMapRef.current.
    }
  });

  return (
    <div>
      <div id="mapBox" ref={mapContainnerRef} style={style} />
    </div>
  );
}

export default MapBox;
