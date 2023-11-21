import { Autocomplete, AutocompleteRenderInputParams, TextField } from '@mui/material';
import { ReactNode, SyntheticEvent, useEffect, useState } from 'react';
import { Control, Controller, UseFormRegisterReturn } from 'react-hook-form';
import { NewFormInputs } from '../pages/newPage/NewForm';
import getMapBoxSuggestion from '../services/getMapBoxSuggestion';

interface LocationInputFieldProps {
  register: UseFormRegisterReturn<'updatedLocation'>;
  control: Control<NewFormInputs>;
}

function LocationInputField({ register, control }: LocationInputFieldProps) {
  // const [open, setOpen] = useState<boolean>(false);
  const [locationList, setLocationList] = useState<
    { full_address: string; mapbox_id?: string; place_formated?: string }[]
  >([]);
  const [locationName, setLocationName] = useState<string>('');
  const [isFetching, setIsFetching] = useState<boolean>(false);

  // console.log({ locationList });

  // useEffect set list empty for the first renders and num of chars  < minCharacterLength
  // it only runs when chars > minCharacterLength
  useEffect(() => {
    console.log('useEffect run');
    async function fetchLocations() {
      try {
        // const res = await mapBoxLocationSearch(locationName);
        const res = await getMapBoxSuggestion({ q: locationName });
        setLocationList(res);
      } catch (error) {
        console.error(error);
      }
    }

    const minCharacterLength = 5;
    const debounceTime = 500;

    // only trigger the fetch if the locationName reach the min char requirement
    if (locationName.length > minCharacterLength) {
      setIsFetching(true);
      const timeId = setTimeout(() => {
        fetchLocations();
      }, debounceTime);

      // clear time-out if the user keep typing
      // useEffect will run again an trigger this.
      return () => {
        console.log('clean up');
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

  return (
    // use Controller to work with RHF
    <Controller
      name={register.name} // must be named accordingly to the one useForm() from React Hook Form
      control={control} // passed form useForm in RHF
      render={({ field, fieldState: { error } }) => {
        const { onChange, value } = field;
        // console.log({ value });
        return (
          <>
            <Autocomplete
              freeSolo
              id="updateLocation"
              value={value || null}
              getOptionLabel={locationList => locationList}
              onChange={(_e: unknown, newValue) => {
                onChange(newValue);
              }}
              onInputChange={handleLocationChange}
              options={locationList.map(i => i.full_address || i.place_formated || '')}
              // options={[footscraty]}

              renderInput={function (params: AutocompleteRenderInputParams): ReactNode {
                return (
                  <TextField
                    {...params}
                    label="Location"
                    variant="standard"
                    // inputRef={ref}
                    error={Boolean(error)}
                    helperText={error?.message}
                  />
                );
              }}
              loading={isFetching}
              loadingText={'Searching...'}
            />
          </>
        );
      }}
    />
  );
}

export default LocationInputField;
