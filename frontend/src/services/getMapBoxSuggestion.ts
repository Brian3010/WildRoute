import { axiosSearchMbx } from './axios';

type GetMapBoxSuggestionT = (searchValue: {
  q: string;
}) => Promise<{ full_address: string; mapbox_id: string; place_formated: string }[]>;

interface MapBoxSuggestResponseT {
  suggestions: {
    name: string;
    mapbox_id: string;
    feature_type: string;
    address: string;
    full_address: string;
    place_formatted: string;
    context: {
      country: {
        id: string;
        name: string;
        country_code: string;
        country_code_alpha_3: string;
      };
      region: {
        id: string;
        name: string;
        region_code: string;
        region_code_full: string;
      };
      postcode: {
        id: string;
        name: string;
      };
      place: {
        id: string;
        name: string;
      };
      locality: {
        id: string;
        name: string;
      };
      street: {
        id: string;
        name: string;
      };
    };
    language: string;
    maki: string;
    external_ids: object;
    metadata: object;
  }[];
  attribution: string;
}

const getMapBoxSuggestion: GetMapBoxSuggestionT = async searchValue => {
  const language = 'en';
  const country = 'au';
  const types = 'address,street,place,city,postcode';

  const query = new URLSearchParams(searchValue).toString();

  const APIUrl = `/suggest?${query}&language=${language}&country=${country}&types=${types}&session_token=${
    import.meta.env.VITE_MAPBOXSESSIONTOKEN
  }&access_token=${import.meta.env.VITE_MAPBOXSEARCHTOKEN}`;

  const res = await axiosSearchMbx.get<MapBoxSuggestResponseT>(APIUrl);
  const names = res.data.suggestions.map(i => ({
    full_address: i.full_address,
    mapbox_id: i.mapbox_id,
    place_formated: i.place_formatted,
  }));
  return names;
};

export default getMapBoxSuggestion;
