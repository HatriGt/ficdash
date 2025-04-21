import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Loader from '../Loader';
import NoData from '../NoData';

import { Grid } from '@mui/material';
import { StyledDataTableDiv } from '../InstallmentDataTable/InstallmentDataTable-styles';
import numeral from 'numeral';
import { StyledFormLabel } from './Deals-styles';
import { groupByPremiums, groupByClaims } from '../../utils/commons';
import { DealLayout } from '../../types/deal';
import FicaCards from '../FicaCards';
import ThemeSelector from '../ThemeSelector';

export const Deals = (): JSX.Element => {
  const routing: string = useSelector((state: RootState) => state.search.search.routing);
  const isLoading: boolean = useSelector((state: RootState) => state.search.isLoading);
  const results: DealLayout[] = useSelector((state: RootState) => state.search.results);
  const transformedResults =
    routing === 'policy' ? groupByPremiums(results) : groupByClaims(results);
  const totalCount = transformedResults.length;

  if (isLoading) {
    return (
      <StyledDataTableDiv>
        <Loader />
      </StyledDataTableDiv>
    );
  }

  if (totalCount > 0) {
    return (
      <Grid container sx={{ paddingTop: 3, width: '100%' }}>
        <Grid
          item
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}>
          <StyledFormLabel>
            Total {numeral(totalCount).format('0,0')} Result{totalCount > 1 ? 's' : null} Found
          </StyledFormLabel>
          <ThemeSelector />
        </Grid>
        <Grid item sm={12} sx={{ paddingTop: 0.8, width: '100%' }}>
          <FicaCards results={transformedResults} />
        </Grid>
      </Grid>
    );
  }

  return (
    <>
      <Grid
        item
        sx={{
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
          width: '100%',
          marginTop: 3,
        }}>
        <ThemeSelector />
      </Grid>
      <StyledDataTableDiv>
        <NoData />
      </StyledDataTableDiv>
    </>
  );
};

export default Deals;
