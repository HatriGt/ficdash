import { FormLabel } from '@mui/material';
import { styled } from '@mui/material/styles';

export const LoaderDiv = styled('div')(({ theme }) => ({
  textAlign: 'center',
  ['& .MuiTypography-root']: {
    marginTop: theme.spacing(2),
  },
}));

export const StyledFormLabel = styled(FormLabel)(() => ({
  fontWeight: 'bold',
  fontSize: '16px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
}));
