import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // fix Mapbox CSS missing warning

import { CSSProperties, useEffect, useRef } from 'react';
import useMapBox from '../hooks/useMapBox';
// import { TActies } from '../services/getActies';
import { TGeoJSON } from '../@types/TGeoJSON';
import { TMarkerDetail } from '../pages/activityListPage';

interface MapBoxProps {
  markerDetail: TMarkerDetail[];
  style: CSSProperties;
}

type TConvertToGeoJSON = (data: TMarkerDetail[]) => TGeoJSON;

const convertToGeoJSON: TConvertToGeoJSON = data => {
  const features: TGeoJSON['features'] = data.map(e => {
    return {
      type: 'Feature',
      geometry: { ...e.geometry },
      properties: { id: e.id, location: e.location, title: e.title },
    };
  });

  return { type: 'FeatureCollection', features: [...features] };
};

function MapBox({ markerDetail, style }: MapBoxProps) {
  // console.log(geometry);
  // return <div></div>;
  const mapContainnerRef = useRef<HTMLDivElement>(null);
  let controlMapRef = useRef<mapboxgl.Map | null>();

  // useMapBox() return instance of mapboxgl.Map
  // setup initial look of the map
  controlMapRef = useMapBox(mapContainnerRef, 137, -32, 4);

  useEffect(() => {
    if (controlMapRef.current) {
      // add markers on the map
      // markerDetail.map(m => {
      //   return (
      //     controlMapRef.current &&
      //     new mapboxgl.Marker()
      //       .setLngLat([m.geometry.coordinates[0], m.geometry.coordinates[1]])
      //       .setPopup(
      //         new mapboxgl.Popup({ offset: 25 }).setHTML(
      //           `<h3><a style="color:#333" href="activities/${m.id}">${m.title}</a></h3><p>${m.location}</p>`
      //         )
      //       )
      //       .addTo(controlMapRef.current)
      //   );
      // });
      // add navigation icon on the map
      controlMapRef.current.addControl(new mapboxgl.NavigationControl());
    }
  }, [markerDetail]);

  useEffect(() => {
    console.log('useEffect render when adding cluster');

    //TODO: Display cluster https://docs.mapbox.com/mapbox-gl-js/example/cluster/
    console.log({ markerDetail });

    const activities = convertToGeoJSON(markerDetail);
    // const activities = sampleGeoJSONData;
    console.log({ activities: activities.features });

    if (controlMapRef.current) {
      controlMapRef.current.on('load', () => {
        if (controlMapRef.current) {
          controlMapRef.current.getSource('activities') ||
            controlMapRef.current.addSource('activities', {
              type: 'geojson',
              data: activities,
              cluster: true,
              clusterMaxZoom: 14,
              clusterRadius: 50,
            });

          controlMapRef.current.getLayer('clusters') ||
            controlMapRef.current.addLayer({
              id: 'clusters',
              type: 'circle',
              source: 'activities',
              filter: ['has', 'point_count'],
              paint: {
                // with three steps to implement three types of circles:
                //   * Blue, 20px circles when point count is less than 100
                //   * Yellow, 30px circles when point count is between 100 and 750
                //   * Pink, 40px circles when point count is greater than or equal to 750
                'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 100, '#f1f075', 750, '#f28cb1'],
                'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
              },
            });

          controlMapRef.current.getLayer('cluster-count') ||
            controlMapRef.current.addLayer({
              id: 'cluster-count',
              type: 'symbol',
              source: 'activities',
              filter: ['has', 'point_count'],
              layout: {
                'text-field': ['get', 'point_count_abbreviated'],
                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                'text-size': 12,
              },
            });

          // console.log(controlMapRef.current.getLayer('clusters'));
          controlMapRef.current.getLayer('unclustered-point') ||
            controlMapRef.current.addLayer({
              id: 'unclustered-point',
              type: 'circle',
              source: 'activities',
              filter: ['!', ['has', 'point_count']],
              paint: {
                'circle-color': '#11b4da',
                'circle-radius': 4,
                'circle-stroke-width': 1,
                'circle-stroke-color': '#fff',
              },
            });

          // inspect a cluster on click
          controlMapRef.current.on('click', 'clusters', e => {
            const features = controlMapRef.current?.queryRenderedFeatures(e.point, {
              layers: ['clusters'],
            });
            // console.log(e);

            const clusterId = features && features[0].properties?.cluster_id;
            // console.log({ clusterId });

            // solve: '(map.getSource('id').getClusterExpansionZoom(...)) method does not exist'
            const source: mapboxgl.GeoJSONSource = controlMapRef.current?.getSource(
              'activities'
            ) as mapboxgl.GeoJSONSource;
            source.getClusterExpansionZoom(clusterId, (err, zoom) => {
              if (err) return;

              // check to makesure the feature.geometry is a type of 'Point'
              const center =
                features && features[0].geometry.type === 'Point'
                  ? (features[0].geometry.coordinates as mapboxgl.LngLatLike)
                  : undefined;

              controlMapRef.current?.easeTo({
                center,
                zoom: zoom,
              });
            });
          });

          // When a click event occurs on a feature in
          // the unclustered-point layer, open a popup at
          // the location of the feature, with
          // description HTML from its properties.
          controlMapRef.current.on('click', 'unclustered-point', e => {
            const coordinates =
              e.features && e.features[0].geometry.type === 'Point' && e.features[0].geometry.coordinates.slice();
            const title = e.features && e.features[0].properties?.title;
            const location = e.features && e.features[0].properties?.location;
            const id = e.features && e.features[0].properties?.id;

            // Ensure that if the map is zoomed out such that
            // multiple copies of the feature are visible, the
            // popup appears over the copy being pointed to.
            if (Array.isArray(coordinates)) {
              while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
              }
            }
            if (controlMapRef.current) {
              new mapboxgl.Popup()
                .setLngLat(coordinates as mapboxgl.LngLatLike)
                .setHTML(
                  //TODO: add here the activity preview {title, location}
                  `<h3><a style="color:#333" href="activities/${id}">${title}</a></h3><p>${location}</p>`
                )
                .addTo(controlMapRef.current);
            }
          });
        }

        controlMapRef.current?.on('mouseenter', 'clusters', () => {
          if (controlMapRef.current) {
            const canvas = controlMapRef.current.getCanvas();
            if (canvas) {
              canvas.style.cursor = 'pointer';
            }
          }
        });
        controlMapRef.current?.on('mouseleave', 'clusters', () => {
          if (controlMapRef.current) {
            const canvas = controlMapRef.current.getCanvas();
            if (canvas) {
              canvas.style.cursor = '';
            }
          }
        });
      });
    }
  }, [markerDetail]);

  return (
    <div>
      <div id="mapBox" ref={mapContainnerRef} style={style} />
    </div>
  );
}

export default MapBox;
