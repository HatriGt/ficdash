import { styled } from '@mui/material/styles';

export const StyledDiv = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  paddingLeft: theme.spacing(2.5),
  paddingRight: theme.spacing(2.5),
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
