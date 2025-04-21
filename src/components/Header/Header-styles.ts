import { styled } from '@mui/material/styles';
import { THEME_MODES } from '../../utils/commons';

export const StyledDiv = styled('div')((theme) => ({
  display: 'flex',
  position: 'fixed',
  minHeight: '64px',
  zIndex: 1000,
  width: '100%',
  maxWidth: '100% !important',
  backgroundColor: theme.theme.palette.mode === THEME_MODES.DARK_MODE ? '#333' : '#b0c9e2',
  borderBottom: '2px solid #E5E5E5',
  [`& .MuiAppBar-root`]: {
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '100% !important',
  },
  [`& .MuiTypography-root`]: {
    fontWeight: 600,
    marginLeft: '15px',
    width: '100%',
    fontFamily: 'century-gothic, sans-serif',
    color: theme.theme.palette.mode === THEME_MODES.DARK_MODE ? '#ffffff' : '#000',
  },
  [`& .MuiContainer-root`]: {
    maxWidth: '100% !important',
  },
}));

export const StyledInnerDiv = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
}));
