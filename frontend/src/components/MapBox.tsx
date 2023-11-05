import mapboxgl, { MapboxEvent, MapboxOptions } from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOXTOKEN;

function MapBox() {
  const mapContainner = useRef<MapboxOptions>(null);
  const map = useRef(null);
  const [lng, setLng] = useState();
  const [lat, setLat] = useState();
  const [zoom, setZoom] = useState();
  //TODO: setup Mapbox https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/#set-up-the-react-app-structure
  //! cannot find the type of mapbox

  useEffect(() => {
    if (map.current) return; // intialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainner.current,
    });
  });

  return;
}

export default MapBox;
