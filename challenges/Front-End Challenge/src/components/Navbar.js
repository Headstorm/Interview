import React, { useState } from 'react';
import styled from 'styled-components';

const NavbarDiv = styled.div`
    position: fixed;
    width: 100%;
    height: 10vh;
    background-color: #252d35;
    color: white;
    font-family: Verdana, Helvetica, Georgia, serif;
    font-weight: 900;
    letter-spacing: 0.1em;

    transition: opacity 500ms linear;
`;

const NavLink = styled.div`
    width: 100%;
    height: 100%;
    transition: color 250ms;

    &:hover {
        color: gray;
        cursor: pointer;
    }
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100%;
`;

const GridColItem = styled.div`
    grid-column: ${props => props.colStart} / ${props => props.colEnd};
    padding: 0% 4%;
    align-self: center;
    cursor: default;
    
`;

export default function Navbar() {

    return(
        <NavbarDiv>
            <Grid>
                <GridColItem style={{paddingLeft: '2%', fontSize: '1.5em'}}>Clarity Consulting</GridColItem>
                <GridColItem style={{justifySelf: 'right', fontSize: '1em'}}>
                    <NavLink>CONTACT</NavLink>
                </GridColItem>
            </Grid>
        </NavbarDiv>
    );
}