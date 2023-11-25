import { Box, CircularProgress, Grid } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import '../../assets/ActivityListPage.css';
import MapBox from '../../components/MapBox';
import getActies, { TActies } from '../../services/getActies';
import ActivityItem from './ActivityItem';
import AppPagination from './Pagination';

// type convertToGeoJsonFuncT = (data: any) => {
//   type: 'Feature';
//   geometry: { type: 'Point'; coordinates: [number, number] };
//   properties: { id: string; title: string; location: string };
// };

// const convertToGeoJSON: convertToGeoJsonFuncT = data => {

//   r
// };

// geometry, location, title, id
export type TMarkerDetail = { geometry: TActies['geometry']; title: string; location: string; id: TActies['_id'] };

function ActivityList() {
  // console.log('ActivityList component render');
  const { showBoundary } = useErrorBoundary();
  const [actyData, setActyData] = useState<TActies[]>([]);
  // activities per page
  const [actiesPerPage] = useState(15);
  // current page
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // const geometryRef = useRef<TActies['geometry'][]>([]);

  const markerDetailRef = useRef<TMarkerDetail[]>([]);

  // fetch data from backend
  useEffect(() => {
    setLoading(true);
    // console.log('useEffect run');
    (async () => {
      try {
        const res = await getActies();

        // if (geometryRef.current.length === 0) {
        //   res.forEach(acty => {
        //     geometryRef.current.push(acty.geometry);
        //   });
        // }

        if (markerDetailRef.current.length === 0) {
          res.forEach(acty => {
            return markerDetailRef.current.push({
              geometry: acty.geometry,
              id: acty._id,
              location: acty.location,
              title: acty.activity_title,
            });
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

  // console.log({ markerDetailRef });

  if (actyData.length > 0) {
    return (
      <>
        <h1>Acitivity List Page</h1>
        <MapBox markerDetail={markerDetailRef.current} style={{ height: '500px' }} />

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
