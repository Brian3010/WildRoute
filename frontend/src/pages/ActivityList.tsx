import { Box, Grid } from '@mui/material';

import ActivityItem from '../components/ActivityItem';
import AppPagination from '../components/Pagination';

type ActyDataList = {
  id: number;
  title: string;
  description: string;
  location: string;
  image: string; // list the first image in the array
}[];

const sampleData: ActyDataList = [
  {
    id: 1,
    title: 'Whitehaven Beach Swimming',
    description:
      'Excepturi esse minus illum, totam doloribus reiciendis at quis aliquam? Quae labore fugit, quia maxime minima sunt.',
    location: 'Sanctuary Point New South Wales',
    image:
      'https://images.unsplash.com/photo-1532978328943-bb1c17fc599b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0Njc1MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTAyNjQ1MDV8&ixlib=rb-4.0.3&q=80&w=1080',
  },
  {
    id: 2,
    title: 'Whitehaven Beach Swimming',
    description:
      'Excepturi esse minus illum, totam doloribus reiciendis at quis aliquam? Quae labore fugit, quia maxime minima sunt.',
    location: 'Sanctuary Point New South Wales',
    image:
      'https://images.unsplash.com/photo-1532978328943-bb1c17fc599b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0Njc1MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTAyNjQ1MDV8&ixlib=rb-4.0.3&q=80&w=1080',
  },
  {
    id: 3,
    title: 'Whitehaven Beach Swimming',
    description:
      'Excepturi esse minus illum, totam doloribus reiciendis at quis aliquam? Quae labore fugit, quia maxime minima sunt.',
    location: 'Sanctuary Point New South Wales',
    image:
      'https://images.unsplash.com/photo-1532978328943-bb1c17fc599b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0Njc1MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTAyNjQ1MDV8&ixlib=rb-4.0.3&q=80&w=1080',
  },
  {
    id: 4,
    title: 'Whitehaven Beach Swimming',
    description:
      'Excepturi esse minus illum, totam doloribus reiciendis at quis aliquam? Quae labore fugit, quia maxime minima sunt.',
    location: 'Sanctuary Point New South Wales',
    image:
      'https://images.unsplash.com/photo-1532978328943-bb1c17fc599b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0Njc1MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTAyNjQ1MDV8&ixlib=rb-4.0.3&q=80&w=1080',
  },
  {
    id: 5,
    title: 'Whitehaven Beach Swimming',
    description:
      'Excepturi esse minus illum, totam doloribus reiciendis at quis aliquam? Quae labore fugit, quia maxime minima sunt.',
    location: 'Sanctuary Point New South Wales',
    image:
      'https://images.unsplash.com/photo-1532978328943-bb1c17fc599b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0Njc1MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTAyNjQ1MDV8&ixlib=rb-4.0.3&q=80&w=1080',
  },
  {
    id: 6,
    title: 'Whitehaven Beach Swimming',
    description:
      'Excepturi esse minus illum, totam doloribus reiciendis at quis aliquam? Quae labore fugit, quia maxime minima sunt.',
    location: 'Sanctuary Point New South Wales',
    image:
      'https://images.unsplash.com/photo-1532978328943-bb1c17fc599b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0Njc1MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTAyNjQ1MDV8&ixlib=rb-4.0.3&q=80&w=1080',
  },
  {
    id: 7,
    title: 'Whitehaven Beach Swimming',
    description:
      'Excepturi esse minus illum, totam doloribus reiciendis at quis aliquam? Quae labore fugit, quia maxime minima sunt.',
    location: 'Sanctuary Point New South Wales',
    image:
      'https://images.unsplash.com/photo-1532978328943-bb1c17fc599b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0Njc1MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTAyNjQ1MDV8&ixlib=rb-4.0.3&q=80&w=1080',
  },
];

function ActivityList() {
  return (
    <>
      <h1>Acitivity List Page</h1>

      <Grid container spacing={2}>
        {sampleData.map((el, i) => (
          <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
            <ActivityItem data={el} />
          </Grid>
        ))}
      </Grid>

      <Box display={'flex'} justifyContent={'center'} marginTop={2} marginBottom={2}>
        <AppPagination />
      </Box>
    </>
  );
}

export default ActivityList;
