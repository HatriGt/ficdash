import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { setErrorAlert } from '../../store/search/reducerSlice';

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const dispatch = useDispatch<ThunkDispatch<RootState, object, Action<string>>>();

  useEffect(() => {
    const handleOnError = (event: {
      message: any;
      filename: any;
      lineno: any;
      colno: any;
      error: any;
    }) => {
      const { message, filename, lineno, colno, error } = event;

      console.error('Error caught by ErrorBoundary:', message, filename, lineno, colno, error);
      dispatch(setErrorAlert({ error: 'Oops, something went wrong', showError: true }));
    };

    // Attach global error handler to catch unhandled errors
    window.addEventListener('error', handleOnError);

    return () => {
      // Cleanup: Remove global error handler when component unmounts
      window.removeEventListener('error', handleOnError);
    };
  }, [dispatch]);

  return <>{children}</>;
};

export default ErrorBoundary;
