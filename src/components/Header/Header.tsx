import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';

import { StyledDiv } from './Header-styles';
import ThemeSelector from '../ThemeSelector';

const Header = (): JSX.Element => {
  return (
    <StyledDiv>
      <AppBar position="relative" color="transparent" elevation={0}>
        <Container maxWidth="xl">
          <Toolbar>
            <img src="./atom-logo.png" alt="ATOM Logo" width={120} />
            <Typography variant="h6" noWrap component="a">
              FICA Dashboard
            </Typography>
            <Box sx={{ flexGrow: 0 }}>
              <ThemeSelector />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </StyledDiv>
  );
};

export default Header;
