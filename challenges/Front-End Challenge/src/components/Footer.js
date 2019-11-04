import React from 'react';
import styled from 'styled-components';

const FooterDiv = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 25vh;
    background-color: #262b2e;
    color: white;
`;



export default function Footer() {
    return(
        <FooterDiv>
            <ul>
                <li><h1>Let's Get Work Done.</h1></li>
                <li><p style={{fontWeight: '200'}}>I am always happy to discuss future opportunities with employers. Please reach out using one of the methods below!</p></li>
                <li><p style={{color: '#e85929'}}>(318)516 - 8898</p></li>
                <li><p style={{color: '#e85929'}}>ZachPooleWork@Gmail.com</p></li>
            </ul>
        </FooterDiv>
    );
}