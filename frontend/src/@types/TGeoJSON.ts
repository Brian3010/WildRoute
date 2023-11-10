export type TGeoJSON = {
  type: 'FeatureCollection';
  features: {
    type: 'Feature';
    geometry: { type: 'Point'; coordinates: [number, number] };
    properties: { title: string; location: string };
  }[];
};
