import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import ActivityItem from '../../components/ActivityItem';
import AppPagination from '../../components/Pagination';
import getActies from '../../services/getActies';
import catchError from '../../utils/catchError';

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
  console.log('component render');
  // activities per page
  const [actiesPerPage] = useState(4);
  // current page
  const [currentPage, setCurrentPage] = useState(1);

  const [error, setError] = useState<Error>();

  // todo: refactor the code with the fetched data to display on the web
  // todo: add error handler like trycatch for fetching data

  // https://github.com/bradtraversy/simple_react_pagination/blob/master/src/App.js

  // fetch data from backend
  useEffect(() => {
    console.log('useEffect run');
    catchError(async () => {
      const res = await getActies();
      console.log('file: index.tsx:96 ~ res:', res);
    })((error: Error) => setError(error));
  }, []);

  // get current activities
  const indexOfLastActy = currentPage * actiesPerPage; // 1 * 3 = [3] // 2 * 3 = [6]
  const indexOfFirstActy = indexOfLastActy - actiesPerPage; // 3 - 3 = [0] // 6 - 3 = [3]
  const currentActies = sampleData.slice(indexOfFirstActy, indexOfLastActy);

  // change page
  const paginationOnChange: (pageNum: number) => void = pageNum => setCurrentPage(pageNum);

  return (
    <>
      {error && <div>{error.message}</div>}
      <h1>Acitivity List Page</h1>

      <Grid container spacing={2}>
        {currentActies.map((el, i) => (
          <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
            <ActivityItem data={el} />
          </Grid>
        ))}
      </Grid>

      <Box display={'flex'} justifyContent={'center'} marginTop={2} marginBottom={2}>
        <AppPagination
          actiesPerPage={actiesPerPage}
          totalActies={sampleData.length}
          pageOnchange={paginationOnChange}
        />
      </Box>
    </>
  );
}

export default ActivityList;
