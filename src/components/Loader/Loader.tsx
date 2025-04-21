import { CircularProgress, Typography } from '@mui/material';

import { LoaderDiv } from './Loader-styles';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

export const LazyProgress = (): JSX.Element => {
  const totalDocuments: number = useSelector((state: RootState) => state.search.totalDocuments);
  const fetchedDocuments: number = useSelector((state: RootState) => state.search.fetchedDocuments);

  return (
    <LoaderDiv>
      <CircularProgress />
      <Typography variant="body2" color="textSecondary">
        Loading {totalDocuments !== 0 ? `${fetchedDocuments}/${totalDocuments} docs ` : ''}..
      </Typography>
    </LoaderDiv>
  );
};

export default LazyProgress;
