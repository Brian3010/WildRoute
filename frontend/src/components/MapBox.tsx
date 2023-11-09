import mapboxgl, { GeoJSONSource } from 'mapbox-gl';
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

      // add markers on the map
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
      // add navigation icon on the map
      controlMapRef.current.addControl(new mapboxgl.NavigationControl());
    }
  }, [markerDetail]);

  useEffect(() => {
    //TODO: Display cluster https://docs.mapbox.com/mapbox-gl-js/example/cluster/
    //? might consider to convert data to geojson type
    if (controlMapRef.current) {
      controlMapRef.current.on('load', () => {
        controlMapRef.current?.addSource('activities', {
          type: 'geojson',
          data: markerDetail,
        });
      });
    }
  });

  return (
    <div>
      <div id="mapBox" ref={mapContainnerRef} style={style} />
    </div>
  );
}

export default MapBox;
