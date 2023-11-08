import { Box, CircularProgress, Grid } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import MapBox from '../../components/MapBox';
import getActies, { TActies } from '../../services/getActies';
import ActivityItem from './ActivityItem';
import AppPagination from './Pagination';

// type ActyDataList = {
//   id: TActies['_id'];
//   title: TActies['activity_title'];
//   description: TActies['description'];
//   location: TActies['location'];
//   image: TActies['image'][0]['url']; // the first image URL
// };

// const sampleData: ActyDataList = [
//   {
//     id: 1,
//     title: 'Whitehaven Beach Swimming',
//     description:
//       'Excepturi esse minus illum, totam doloribus reiciendis at quis aliquam? Quae labore fugit, quia maxime minima sunt.',
//     location: 'Sanctuary Point New South Wales',
//     image:
//       'https://images.unsplash.com/photo-1532978328943-bb1c17fc599b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0Njc1MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTAyNjQ1MDV8&ixlib=rb-4.0.3&q=80&w=1080',
//   },
//   {
//     id: 2,
//     title: 'Whitehaven Beach Swimming',
//     description:
//       'Excepturi esse minus illum, totam doloribus reiciendis at quis aliquam? Quae labore fugit, quia maxime minima sunt.',
//     location: 'Sanctuary Point New South Wales',
//     image:
//       'https://images.unsplash.com/photo-1532978328943-bb1c17fc599b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0Njc1MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTAyNjQ1MDV8&ixlib=rb-4.0.3&q=80&w=1080',
//   },
//   {
//     id: 3,
//     title: 'Whitehaven Beach Swimming',
//     description:
//       'Excepturi esse minus illum, totam doloribus reiciendis at quis aliquam? Quae labore fugit, quia maxime minima sunt.',
//     location: 'Sanctuary Point New South Wales',
//     image:
//       'https://images.unsplash.com/photo-1532978328943-bb1c17fc599b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0Njc1MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTAyNjQ1MDV8&ixlib=rb-4.0.3&q=80&w=1080',
//   },
//   {
//     id: 4,
//     title: 'Whitehaven Beach Swimming',
//     description:
//       'Excepturi esse minus illum, totam doloribus reiciendis at quis aliquam? Quae labore fugit, quia maxime minima sunt.',
//     location: 'Sanctuary Point New South Wales',
//     image:
//       'https://images.unsplash.com/photo-1532978328943-bb1c17fc599b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0Njc1MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTAyNjQ1MDV8&ixlib=rb-4.0.3&q=80&w=1080',
//   },
//   {
//     id: 5,
//     title: 'Whitehaven Beach Swimming',
//     description:
//       'Excepturi esse minus illum, totam doloribus reiciendis at quis aliquam? Quae labore fugit, quia maxime minima sunt.',
//     location: 'Sanctuary Point New South Wales',
//     image:
//       'https://images.unsplash.com/photo-1532978328943-bb1c17fc599b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0Njc1MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTAyNjQ1MDV8&ixlib=rb-4.0.3&q=80&w=1080',
//   },
//   {
//     id: 6,
//     title: 'Whitehaven Beach Swimming',
//     description:
//       'Excepturi esse minus illum, totam doloribus reiciendis at quis aliquam? Quae labore fugit, quia maxime minima sunt.',
//     location: 'Sanctuary Point New South Wales',
//     image:
//       'https://images.unsplash.com/photo-1532978328943-bb1c17fc599b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0Njc1MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTAyNjQ1MDV8&ixlib=rb-4.0.3&q=80&w=1080',
//   },
//   {
//     id: 7,
//     title: 'Whitehaven Beach Swimming',
//     description:
//       'Excepturi esse minus illum, totam doloribus reiciendis at quis aliquam? Quae labore fugit, quia maxime minima sunt.',
//     location: 'Sanctuary Point New South Wales',
//     image:
//       'https://images.unsplash.com/photo-1532978328943-bb1c17fc599b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0Njc1MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTAyNjQ1MDV8&ixlib=rb-4.0.3&q=80&w=1080',
//   },
// ];

function ActivityList() {
  // console.log('ActivityList component render');
  const { showBoundary } = useErrorBoundary();
  const [actyData, setActyData] = useState<TActies[]>([]);
  // activities per page
  const [actiesPerPage] = useState(15);
  // current page
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const geometryRef = useRef<TActies['geometry'][]>([]);

  // fetch data from backend
  useEffect(() => {
    setLoading(true);
    // console.log('useEffect run');
    (async () => {
      try {
        const res = await getActies();

        if (geometryRef.current.length === 0) {
          res.forEach(acty => {
            geometryRef.current.push(acty.geometry);
          });
        }

        // store the result in the state
        setActyData(res);
        setLoading(false);
      } catch (error) {
        showBoundary(error);
      }
    })();
  }, [showBoundary]);

  if (loading) return <CircularProgress className="loader" color="inherit" />;

  // get current activities
  const indexOfLastActy = currentPage * actiesPerPage; // 1 * 3 = [3] // 2 * 3 = [6]
  const indexOfFirstActy = indexOfLastActy - actiesPerPage; // 3 - 3 = [0] // 6 - 3 = [3]
  const currentActies = actyData.slice(indexOfFirstActy, indexOfLastActy);

  // change page
  const paginationOnChange: (pageNum: number) => void = pageNum => setCurrentPage(pageNum);

  if (actyData.length > 0) {
    return (
      <>
        <h1>Acitivity List Page</h1>
        <MapBox geometry={geometryRef.current} style={{ height: '500px' }} />

        <Grid container spacing={2}>
          {currentActies.map((el, i) => (
            <Grid sx={{ height: '405px' }} key={i} item xs={12} sm={6} md={4} lg={3}>
              <ActivityItem data={el} />
            </Grid>
          ))}
        </Grid>

        <Box display={'flex'} justifyContent={'center'} marginTop={2} marginBottom={2}>
          <AppPagination
            actiesPerPage={actiesPerPage}
            totalActies={actyData.length}
            pageOnchange={paginationOnChange}
          />
        </Box>
      </>
    );
  }
}

export default ActivityList;
