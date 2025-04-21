import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { setEnvironment } from '../store/search/reducerSlice';

const useEnvironement = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, object, Action<string>>>();

  useEffect(() => {
    const environment: string | null = localStorage.getItem('APP_ENVIRONMENT');
    if (environment) {
      dispatch(setEnvironment({ environment }));
    }
  }, [dispatch]);
};

export default useEnvironement;
