import { Box, CircularProgress, Grid } from '@mui/material';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import '../../assets/ActivityListPage.css';
import ActivitySearchInputs from '../../components/ActivitySearchInputs';
import MapBox from '../../components/MapBox';
import getActies, { TActies } from '../../services/getActies';
import ActivityItem from './ActivityItem';
import AppPagination from './Pagination';

export type TMarkerDetail = { geometry: TActies['geometry']; title: string; location: string; id: TActies['_id'] };

function ActivityList() {
  // console.log('ActivityList component render');
  const { showBoundary } = useErrorBoundary();
  const [actyData, setActyData] = useState<TActies[]>([]);
  const [actiesPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [actiesDisplay, setActiesDisplay] = useState<TActies[]>([]);

  const actyListRef = useRef<TActies[]>([]);
  const markerDetailRef = useRef<TMarkerDetail[]>([]);

  // const geometryRef = useRef<TActies['geometry'][]>([]);

  // fetch data from backend
  useEffect(() => {
    setLoading(true);
    console.log('useEffect run');

    (async () => {
      try {
        const res = await getActies();

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
        actyListRef.current = res;
        setLoading(false);
      } catch (error) {
        showBoundary(error);
      }
    })();
  }, [showBoundary]);

  // useEffect to capture the change of search bar and set it to currentActies to display on the list
  useEffect(() => {
    console.log('Second useEffect');
    // compute number of acties to display on 1 page
    const computeActiesToDisplay = () => {
      const indexOfLastActy = currentPage * actiesPerPage; // 1 * 3 = [3] // 2 * 3 = [6]
      const indexOfFirstActy = indexOfLastActy - actiesPerPage; // 3 - 3 = [0] // 6 - 3 = [3]

      setActiesDisplay(actyData.slice(indexOfFirstActy, indexOfLastActy));
    };

    computeActiesToDisplay();
  }, [actiesPerPage, actyData, currentPage]);

  // change page
  const paginationOnChange: (pageNum: number) => void = pageNum => setCurrentPage(pageNum);

  const searchBarOnChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // event.preventDefault();
    const { value } = event.target;
    // console.log({ value, actyList: actyData, actiesDisplay, actyListRef: actyListRef.current });

    if (value.length > 3) {
      const actiesFiltered = actyData.filter(i => i.activity_title.toLowerCase().includes(value.toLowerCase()));
      setActyData(actiesFiltered);
    } else {
      setActyData(actyListRef.current);
    }
  };

  const checkBoxOnChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    console.log({ event, checked });
  };

  if (loading) return <CircularProgress className="loader" color="inherit" />;

  console.log({ actyData });
  return (
    <>
      <h1>Acitivity List Page</h1>
      <MapBox markerDetail={markerDetailRef.current} style={{ height: '500px' }} />

      <ActivitySearchInputs searchChange={searchBarOnChange} checkBoxChange={checkBoxOnChange} />

      <Grid container spacing={2}>
        {actiesDisplay.length > 0 ? (
          actiesDisplay.map((el, i) => (
            <Grid sx={{ height: '405px' }} key={i} item xs={12} sm={6} md={4} lg={3}>
              <ActivityItem data={el} />
            </Grid>
          ))
        ) : (
          <Grid item>
            <div>Activity Not Found</div>
          </Grid>
        )}
      </Grid>

      <Box display={'flex'} justifyContent={'center'} marginTop={2} marginBottom={2}>
        <AppPagination actiesPerPage={actiesPerPage} totalActies={actyData.length} pageOnchange={paginationOnChange} />
      </Box>
    </>
  );
}

export default ActivityList;
