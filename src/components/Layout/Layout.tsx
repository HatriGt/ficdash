import React from 'react';
import { StyledChildContainer, StyledContainer } from './Layout-styles';
import Footer from '../Footer';

const Layout = (props: { children: React.ReactElement }): JSX.Element => {
  return (
    <StyledContainer>
      <StyledChildContainer>{props.children}</StyledChildContainer>
      <Footer />
    </StyledContainer>
  );
};

export default Layout;
