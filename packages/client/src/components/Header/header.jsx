
import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Navigation from '../Navigation/Navigation';
import { Link } from 'react-router-dom';
import "./header.css"

 function AppHeader ({username})
{
    return ( 
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as ={Link} to="/">
            <img src= "logo.png" width="100" height="100" 
            className='d-inline-block align-left mr-1' alt="Logo"/> 
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
;

export default AppHeader;