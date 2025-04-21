import { Typography } from '@mui/material';
import { StyledDiv } from './Footer-styles';

const Footer = (): JSX.Element => {
  return (
    <StyledDiv>
      <Typography variant="caption">
        &copy; {new Date().getFullYear()} ATOM Technologies &mdash; All rights reserved
      </Typography>
    </StyledDiv>
  );
};

export default Footer;
