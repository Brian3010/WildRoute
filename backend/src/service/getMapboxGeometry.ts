require('dotenv').config();
import axios from 'axios';

interface MapboxGeoResponse {
  type: 'FeatureCollection';
  query: string[];
  features: {
    id: string;
    type: string;
    place_type: string[];
    relevance: number;
    properties: {
      accuracy: string;
      mapbox_id: string;
    };
    text_en: string;
    place_name_en: string;
    text: string;
    place_name: string;
    center: number[];
    geometry: {
      type: 'Point';
      coordinates: [number, number];
      interpolated?: boolean;
    };
    address: string;
    context: {
      id: string;
      mapbox_id: string;
      wikidata?: string;
      short_code?: string;
      text_en: string;
      language_en?: string;
      text: string;
      language?: string;
    }[];
  }[];
  attribution: string;
}
//https://api.mapbox.com/geocoding/v5/mapbox.places/129+Hyde+Street%2C+Footscray+Victoria+3011%2C+Australia.json?country=au&limit=1&types=address%2Cpostcode&language=en&access_token=pk.eyJ1IjoiYnJpYW5uZzMwMTAiLCJhIjoiY2xoYThkajA5MGVwczNrbzF1N3o4bXN5MCJ9.Zns-8YAQOSsvHWxz-uiFaA
const getMapboxGeometry = async (queryParam: string): Promise<MapboxGeoResponse['features'][number]['geometry']> => {
  const language = 'en';
  const country = 'au';
  const types = 'address%2Cpostcode';
  const limit = 1;
  // const access_token = 'pk.eyJ1IjoiYnJpYW5uZzMwMTAiLCJhIjoiY2xwOGZyNGg0MGU1OTJsdGR1cnpmbWtrMiJ9.dCAa4VLNULL7c1ZIa5RJvg'; //! put this in .env
  // TODO: call API to Mapbox geocoding
  const res = await axios.get<MapboxGeoResponse>(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${queryParam}?country=${country}&limit=${limit}&types=${types}&language=${language}&access_token=${process.env.MAPBOXGEOTOKEN}`
  );

  return res.data.features[0].geometry;
};

export default getMapboxGeometry;
