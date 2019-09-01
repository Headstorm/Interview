import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/GlobalStyle';
import defaultTheme from '../styles/defaultTheme';
import Form from './form/Form';

const S = {};

S.AppContainer = styled.div`
  background-color: ${props => props.theme.bgColor1};
`;

S.BodyContainer = styled.div`
  grid-area: mainBody;

  @media ${props => props.theme.device.phone} {
    padding: ${(props) => props.theme.p(0)};
  }

  @media ${props => props.theme.device.tabletSM} {
    padding: ${(props) => props.theme.p(1)};
  }
`;

const App = () => (
  <ThemeProvider theme={defaultTheme}>
      <S.AppContainer id='primary-container'>
        <GlobalStyle />
        <S.BodyContainer>
          <Form />
        </S.BodyContainer>
      </S.AppContainer>
  </ThemeProvider>
);

export default App;
