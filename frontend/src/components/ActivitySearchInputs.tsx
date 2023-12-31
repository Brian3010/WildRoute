import SearchIcon from '@mui/icons-material/Search';
import { Box, Checkbox, FormControlLabel, FormGroup, InputAdornment, TextField, Typography } from '@mui/material';
import { ChangeEvent } from 'react';
import { TTags } from '../services/getActyById';

interface ActivitySearchProps {
  searchChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  checkBoxChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export default function ActivitySearchInputs({ searchChange, checkBoxChange }: ActivitySearchProps) {
  const searchBarOnChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    searchChange(event);
  };
  const tags: TTags[] = ['Adventure', 'Camping', 'Climbing', 'Nature', 'Water Sport'];

  const handleCheckBoxChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    checkBoxChange(event, checked);
  };

  return (
    <Box
      sx={{
        margin: '30px 0 20px 0',
        display: 'flex',
        // justifyContent: 'space-between',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <TextField
        // sx={{ margin: '15px 0 15px 0' }}
        label="Search activity"
        id="activity-search-bar"
        variant="outlined"
        size="small"
        onChange={searchBarOnChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />
      <Box display={'flex'} alignItems={'center'} gap={3} flexWrap={'wrap'}>
        <Typography fontWeight={700} variant="body1">
          Categories:{' '}
        </Typography>
        <FormGroup sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          {tags.map((t, key) => (
            <Box key={key}>
              <FormControlLabel
                // sx={{ margin: '15px 0 15px 0' }}

                control={<Checkbox id={t} size="small" onChange={handleCheckBoxChange} value={t} />}
                label={t}
              />
            </Box>
          ))}
        </FormGroup>
      </Box>
    </Box>
  );
}
