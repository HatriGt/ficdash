import { CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledDiv = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2.5),
  [`& .MuiTypography-root`]: {
    textAlign: 'left',
  },
  paddingTop: theme.spacing(1),
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  paddingLeft: theme.spacing(2.5),
  paddingRight: theme.spacing(2.5),
}));
