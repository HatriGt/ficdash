import { ThemeProvider } from '@emotion/react';
import { FC } from 'react';
import useTheme from './hooks/useTheme';
import { CssBaseline } from '@mui/material';
import Layout from './components/Layout';
import DealsPage from './pages/Deals';
import ErrorBoundary from './components/ErrorBoundary';

const App: FC = (): JSX.Element => {
  const appTheme = useTheme();
  return (
    <ThemeProvider theme={appTheme}>
      <ErrorBoundary>
        <CssBaseline />
        <Layout>
          {/* 
          Use lazy loading if there are multiple pages for better performance
        */}
          <DealsPage />
        </Layout>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
