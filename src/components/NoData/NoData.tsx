import { Typography } from '@mui/material';
import { LoaderDiv } from './NoData-styles';

export const LazyProgress = (): JSX.Element => {
  return (
    <LoaderDiv>
      <img src="./no-data.svg" width={220} />
      <Typography variant="body2">No data available for FICA document search</Typography>
    </LoaderDiv>
  );
};

export default LazyProgress;
