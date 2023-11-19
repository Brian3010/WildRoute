import { AxiosResponse } from 'axios';
import { axiosSearchMbx } from './axios';

type GetMapBoxSuggestionT = (searchValue: string) => Promise<AxiosResponse<string[]>>;

const getMapBoxSuggestion: GetMapBoxSuggestionT = async searchValue => {
  const language = 'en';
  const country = 'au';
  const types = 'address,street,place,city,postcode';
  const SESSION_TOKEN = '0ff5c245-8884-4821-88bd-bf549cd0a93d'; //! put this in .env
  //https://api.mapbox.com/search/searchbox/v1/suggest?q=Camberwell+vic&language=en&country=au&types=address,street,place,city,postcode&session_token=0ff5c245-8884-4821-88bd-bf549cd0a93d&access_token=pk.eyJ1IjoiYnJpYW5uZzMwMTAiLCJhIjoiY2xwMjhvbXg5MHBlaTJsb2lscmV0Ync1ciJ9.iOwKaOlcFAIs89w1f_sblA

  //TODO: convert searchValue to a query

  //TODO: research if this is a good practice

  const query = searchValue;

  const APIRequest = `/suggest?q=${query}&language=${language}&country=${country}&types=${types}&session_token=${SESSION_TOKEN}&access_token=${
    import.meta.env.VITE_MAPBOXSEARCHTOKEN
  }`;

  try {
    const res = await axiosSearchMbx.get(APIRequest);
    return res;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export default getMapBoxSuggestion;
