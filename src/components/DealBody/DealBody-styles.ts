import { styled } from '@mui/material/styles';
import { THEME_MODES } from '../../utils/commons';

export const StyledDiv = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
  paddingLeft: theme.spacing(2.5),
  paddingRight: theme.spacing(2.5),
  paddingBottom: theme.spacing(2),
  gap: 10,
  [`& .MuiGrid-root`]: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  [`& .MuiDivider-root`]: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
}));

export const StyledCreditorNoDataSection = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  border: `2px dashed ${theme.palette.mode === THEME_MODES.DARK_MODE ? '#333' : '#b0c9e2'}`,
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
  minHeight: 70,
  marginTop: 10,
  marginBottom: 10,
}));
