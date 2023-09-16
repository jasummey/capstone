
import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Navigation from './Navigation'


export default function AppHeader ()
{
    return ( 
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <img src= "./packages/client/src/logo.png" width="125" height="125"
            className='d-inline-block align-left mr-2' alt="Logo"/> 
            <span className="d-inline-block mr-2"> Menu Maker</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Navigation />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}