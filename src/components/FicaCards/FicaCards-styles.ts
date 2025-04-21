import { FormLabel } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledFormLabel = styled(FormLabel)(() => ({
  fontWeight: 'bold',
  marginRight: 15,
}));

export const MiniGridItem = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  ['& .MuiDivider-root']: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
}));
