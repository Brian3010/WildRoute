import { Autocomplete, AutocompleteRenderInputParams, Grid, TextField } from '@mui/material';
import mapboxgl from 'mapbox-gl';
import { ChangeEvent, ReactNode, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface LocationInputFieldProps {
  register: UseFormRegisterReturn<'updatedLocationTest'>;
}

const mapBoxLocationSearch = (value: string) => {
  const locations = [
    'Footscray',
    'Avondale Heights',
    'Hawthorn',
    'Blackburn',
    'Seddon',
    '129 Hyde St',
    'Hawthorn East',
    '129 Hyde St, Mexico',
  ];

  const returnLoc = locations.filter(loc => loc.toLowerCase().includes(value.toLowerCase()));
  // console.log({ returnLoc });

  return new Promise<string[]>(resolve => {
    setTimeout(() => {
      console.log('requesting location suggestion');
      return resolve(returnLoc);
    }, 3000);
  });
};

function LocationInputField({ register }: LocationInputFieldProps) {
  // const [open, setOpen] = useState<boolean>(false);
  const [locationList, setLocationList] = useState<string[]>([]);
  const [locationName, setLocationName] = useState<string>('');
  const [isFetching, setIsFetching] = useState<boolean>(false);

  // console.log({ locationList });

  // useEffect set list empty for the first renders and num of chars  < minCharacterLength
  // it only runs when chars > minCharacterLength
  useEffect(() => {
    async function fetchLocations() {
      try {
        const res = await mapBoxLocationSearch(locationName);

        setLocationList(res);
      } catch (error) {
        console.error(error);
      }
    }

    const minCharacterLength = 5;
    const debounceTime = 300;

    // only trigger the fetch if the locationName reach the min char requirement
    if (locationName.length > minCharacterLength) {
      setIsFetching(true);
      const timeId = setTimeout(() => {
        fetchLocations();
      }, debounceTime);

      // clear time-out if the user keep typing
      // useEffect will run again an trigger this.
      return () => {
        setIsFetching(false);
        return clearTimeout(timeId);
      };
    } else {
      // set empty list if not reach the requirement
      setLocationList([]);
    }
  }, [locationName]);

  const handleLocationChange = async (_event: SyntheticEvent, value: string) => {
    setLocationName(value);
  };

  //TODO: get the search to work with Mapbox
  // //TODO: implement function getMapBoxSuggestion() to call to MapBoxAPI
  //TODO: register input with react hook form using 'register'
  //TODO: make sure the register('updatedLocation') updated in the <NewForm/>
  //TODO: make data correctly submitted to the backend
  //TODO: do the same for edit page

  return (
    <Grid item xs={12}>
      <Autocomplete
        freeSolo
        renderInput={function (params: AutocompleteRenderInputParams): ReactNode {
          return <TextField {...params} label="LocationV2" variant="standard" />;
        }}
        onInputChange={handleLocationChange}
        options={locationList}
        loading={isFetching}
        loadingText={'Searching...'}

        // onFocus={handleFocus}
      />
    </Grid>
  );
}

export default LocationInputField;
