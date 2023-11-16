import { Autocomplete, AutocompleteRenderInputParams, Grid, TextField } from '@mui/material';
import { ChangeEvent, ReactNode, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface LocationInputFieldProps {
  register: UseFormRegisterReturn<'updatedLocationTest'>;
}

const mapBoxLocationSearch = () => {
  return new Promise<string[]>((resolve, reject) => {
    setTimeout(() => {
      console.log('requesting location suggestion');
      return resolve(['Footscray', 'Avondale Heights', 'Hawthorn', 'Blackburn', 'Seddon', '129 Hyde St']);
    }, 3000);
  });
};

function LocationInputField({ register }: LocationInputFieldProps) {
  // const [open, setOpen] = useState<boolean>(false);
  const [locationList, setLocationList] = useState<string[]>([]);

  console.log({ locationList });

  const handleLocationChange = async (event: SyntheticEvent, value: string, reason: string) => {
    console.log(value);
    // const {
    //   currentTarget: { value },
    // } = event;
    // // console.log({ value });

    // decide dropdown menu close or open by the result from mapBox
    console.log({ locationList });
    if (value.length <= 5) setLocationList([]);
    if (value.length > 5) {
      const res = await mapBoxLocationSearch();
      // locationList.current = res;
      setLocationList(res);
    }

    // //* consider using autocomplte https://mui.com/material-ui/react-autocomplete/

    // ! error the dropdown open again when there is values in the textfield
  };

  // prevent when user click again the drop down menu will not be triggered
  const handleFocus = () => {
    setLocationList([]);
  };

  return (
    <Grid item xs={12}>
      <Autocomplete
        freeSolo
        renderInput={function (params: AutocompleteRenderInputParams): ReactNode {
          return <TextField {...params} label="Search input" variant="standard" />;
        }}
        onInputChange={handleLocationChange}
        options={locationList}
        onFocus={handleFocus}
      />
    </Grid>
  );
}

export default LocationInputField;
