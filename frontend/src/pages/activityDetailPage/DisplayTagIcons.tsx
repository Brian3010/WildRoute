import { Box, Typography } from '@mui/material';
import { TTags } from '../../services/getActyById';

interface DisplayTagIconProps {
  tags: {
    name: TTags;
    icon: string;
  };
}
export default function DipslayTagIcons(props: DisplayTagIconProps) {
  const actyTags = props.tags;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <img src={actyTags.icon} alt={actyTags.name} width={'40px'} height={'40px'} style={{alignSelf:'center'}} />
      <Typography sx={{fontSize:'smaller', textShadow:'0.5px 0 0'}}>{actyTags.name}</Typography>
    </Box>
  );
}
