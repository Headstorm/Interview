import React from 'react';
import styled from 'styled-components';

const S = {};

S.FormTitle = styled.h1`
  color: ${props => props.theme.fgColor1};
  font-size: ${props => props.theme.formTitleFontSize};
`;

S.FormInstructions = styled.div`
  color: ${props => props.theme.fgColor2};
  margin-bottom: ${props => props.theme.m(2)};
`;

S.TextBlockContainer = styled.div`
  margin-top: ${props => props.theme.m(2)};
`;

const FormTextBlock = () => (
  <S.TextBlockContainer>
    <S.FormTitle>Contact Us</S.FormTitle>
    <S.FormInstructions>
      <p>
        Please use the form below to submit any questions you may have, or
        to let us know how we are doing. Sometimes it can get busy around
        here, but most of the time we are able to respond to customer inquiries
        within one business day.
      </p>
      Thank you.
    </S.FormInstructions>
  </S.TextBlockContainer>
);

export default FormTextBlock;
