import { styled } from '@mui/material/styles';

export const LoaderDiv = styled('div')(({ theme }) => ({
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  ['& .MuiTypography-root']: {
    marginTop: theme.spacing(1),
  },
}));
