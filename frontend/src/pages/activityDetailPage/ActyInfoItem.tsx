import { Box, Card, CardContent, Rating, Typography } from '@mui/material';
import '../../assets/ActivityInfoItem.css';
import iconSrcs from '../../images';
import { TActyDetail } from '../../services/getActyById';
import DipslayTagIcons from './DisplayTagIcons';

interface ActyInfoItemProps {
  data: Omit<TActyDetail, 'image' | 'reviews'>;
  reviewTotal: number;
}

export default function ActyInfoItem(props: ActyInfoItemProps) {
  // console.log('ActyInfoItem rendered');
  const actyDetail = props.data;
  const reviewTotal = props.reviewTotal;

  // convert the tags to icons
  const convertToIcon = (tags: typeof actyDetail.tags) => {
    const iconTags = tags.map(t => {
      // create a dictionary to map the tags to the icons
      const iconDict: { name: typeof t; icon: string }[] = [
        { name: 'Adventure', icon: iconSrcs.adventureIcon }, 
        { name: 'Camping', icon: iconSrcs.campingIcon },
        { name: 'Climbing', icon: iconSrcs.climbingIcon },
        { name: 'Nature', icon: iconSrcs.natureIcon },
        { name: 'Water Sport', icon: iconSrcs.waterSportIcon },
      ];
      // find out the name
      const icons = iconDict.find(el => el.name === t);
      if (icons) return { name: icons.name, icon: icons.icon };
      // return only the icon

      return null;
    });
    //return a new array with icons
    return iconTags;
  };

  const actyTags = convertToIcon(actyDetail.tags);
  // console.log(actyTags);
  return (
    <Card sx={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 6px 0px', height: '100%' }}>
      <CardContent sx={{ padding: 2, height: '100%', position: 'relative' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignContent: 'center' }}>
          <Typography
            variant="h5"
            component="div"
            sx={{ textAlign: 'start', letterSpacing: '.05rem', fontWeight: 700 }}
          >
            {actyDetail.activity_title}
          </Typography>

          <Typography variant="caption" color="text.secondary">
            {actyDetail.location}
          </Typography>

          <Typography>
            <span style={{ fontWeight: 700 }}>${actyDetail.avg_price} AUD</span> total
          </Typography>
          <hr className="line-break" />

          <Typography sx={{ display: 'flex', marginBottom: 1 }}>
            <Rating size="small" name="read-only" value={actyDetail.rating || 0} readOnly />
            <span style={{ fontSize: 'smaller', alignSelf: 'end', paddingLeft: 5, color: 'rgba(0, 0, 0, 0.6)' }}>
              {reviewTotal > 1 ? `${reviewTotal} reviews` : `${reviewTotal} review`}
            </span>
          </Typography>

          <Typography maxHeight={'500px'} variant="body2" margin="10px 0 10px 0">
            {actyDetail.description}
          </Typography>

          <Box sx={{ display: 'flex', gap: '5%' }} paddingTop={{ lg: '10px' }}>
            {actyTags.map((tag, i) => tag && <DipslayTagIcons key={i} tags={tag} />)}
          </Box>

          <Typography variant="subtitle2" color="text.secondary" paddingTop={{ md: '10px', lg: '40px' }}>
            Submitted by {actyDetail.author.username}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
