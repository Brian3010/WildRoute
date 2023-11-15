import { FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import { useRef, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface LocationInputFieldProps {
  register: UseFormRegisterReturn<'updatedLocationTest'>;
}

const mapBoxLocationSearch = () => {
  return new Promise<string[]>((resolve, reject) => {
    setTimeout(() => {
      console.log('requesting location suggestion');
      return resolve(['Footscray', 'Avondale Heights', 'Hawthorn', 'Blackburn', 'Seddon']);
    }, 5000);
  });
};

function LocationInputField({ register }: LocationInputFieldProps) {
  const [locationName, setLocationName] = useState<string>();
  const locationList = useRef<string[]>([]);

  const handleLocationChange = async (event: SelectChangeEvent<typeof locationName>) => {
    const {
      target: { value },
    } = event;
    setLocationName(value);
    //! the solution below using select menu might not work
    //* consider using autocomplte https://mui.com/material-ui/react-autocomplete/
    //? implement autocomplete for this
    const res = await mapBoxLocationSearch();
    locationList.current = res;
  };

  return (
    <Grid item xs={12}>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="updatedLocation-label">Location</InputLabel>
        <Select
          labelId="updatedLocation-label"
          id="updatedLocationTest"
          value={locationName}
          onChange={handleLocationChange}
          input={<OutlinedInput label="Name" />}
          // MenuProps={MenuProps}
        >
          {locationList.current.length > 0 &&
            locationList.current.map(locName => (
              <MenuItem key={locName} value={locName}>
                {locName}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Grid>
  );
}

export default LocationInputField;
