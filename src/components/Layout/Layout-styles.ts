import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledContainer = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  maxWidth: '100% !important',
  paddingLeft: '0 !important',
  paddingRight: '0 !important',
  borderTop: '4px solid',
  borderImage: 'linear-gradient(to right, #5A00B3 50%, #FF0092) 1 0 0 0',
}));

export const StyledChildContainer = styled(Container)(() => ({
  flexGrow: 1,
  display: 'flex',
  maxWidth: '100% !important',
  flexDirection: 'column',
}));
