import { styled } from '@mui/material/styles';

export const LoaderDiv = styled('div')(({ theme }) => ({
  textAlign: 'center',
  ['& .MuiTypography-root']: {
    marginTop: theme.spacing(2),
  },
}));
