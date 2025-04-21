import { FormLabel } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledFormLabel = styled(FormLabel)(() => ({
  fontWeight: 'bold',
}));

export const StyledPatentDiv = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'fixed',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '90vh',
  width: '15%',
  maxWidth: '100% !important',
  [theme.breakpoints.down('lg')]: {
    position: 'static',
    width: '100%',
  },
  [theme.breakpoints.down('md')]: {
    justifyContent: 'flex-start',
  },
  [theme.breakpoints.down('md')]: {
    height: 'unset',
  },
}));

export const StyledDiv = styled('div')(({ theme }) => ({
  display: 'flex',
  paddingTop: theme.spacing(12.2),
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '100vh',
  width: '100%',
  paddingRight: 30,
  [theme.breakpoints.down('lg')]: {
    position: 'static',
    width: '100%',
  },
  [theme.breakpoints.down('md')]: {
    justifyContent: 'flex-start',
  },
  [theme.breakpoints.down('md')]: {
    height: 'unset',
  },
  maxWidth: '100% !important',
}));
