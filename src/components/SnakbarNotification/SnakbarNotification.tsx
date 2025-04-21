import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Snackbar } from '@mui/material';

import { RootState } from '../../store/store';
import { hideErrorAlert } from '../../store/search/reducerSlice';

const SnakbarNotification = (): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<RootState, object, Action<string>>>();
  const error: string | unknown = useSelector((state: RootState) => state.search.error);
  const showError: boolean = useSelector((state: RootState) => state.search.showError);

  const hideAlertHandler = (): void => {
    dispatch(hideErrorAlert());
  };

  return (
    <Snackbar
      open={showError}
      autoHideDuration={4000}
      message={error as string}
      onClose={hideAlertHandler}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}>
      <Alert severity="error" onClose={hideAlertHandler}>
        {error as string}
      </Alert>
    </Snackbar>
  );
};

export default SnakbarNotification;
