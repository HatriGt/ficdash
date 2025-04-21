import { Grid } from '@mui/material';
import Filter from '../components/Filter';
import SnakbarNotification from '../components/SnakbarNotification';
import Deals from '../components/Deals';

const DealsPage = (): JSX.Element => {
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={2}>
          <Filter />
        </Grid>
        <Grid item xs={12} sm={12} md={10} sx={{ minHeight: '90vh' }}>
          <Deals />
        </Grid>
      </Grid>
      <SnakbarNotification />
    </>
  );
};

export default DealsPage;
