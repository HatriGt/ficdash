import { CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import { THEME_MODES } from '../../utils/commons';

export const StyledDiv = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: theme.spacing(2.5),
  paddingRight: theme.spacing(2.5),
  [`& .MuiTypography-root`]: {
    textAlign: 'left',
  },
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  paddingLeft: theme.spacing(2.5),
  paddingRight: theme.spacing(2.5),
}));

export const StyledSubSection = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  border: `2px dashed ${theme.palette.mode === THEME_MODES.DARK_MODE ? '#333' : '#b0c9e2'}`,
  height: 100,
  borderRadius: 20,
  marginTop: 20,
}));
