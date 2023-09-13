
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


export default function AppHeader ()
{
    return ( 
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <img src= "./packages/client/src/logo.png" width="125" height="125"
            className='d-inline-block align-center' alt="Logo"/> 
            <span className="d-inline-block mr-2"> Menu Maker</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="navigation">
            <Nav.Link href="#home">Home  </Nav.Link>
              <Nav.Link href="#link">Add Your Recipe</Nav.Link> 
              <NavDropdown title="Search" id="basic-nav-dropdown">
                <NavDropdown.Item href="#ingredient">By Ingredient</NavDropdown.Item>
                <NavDropdown.Item href="#meal">
                 By Meal Type
                </NavDropdown.Item>
                <NavDropdown.Item href="#calories"> By Calories</NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
              <Nav.Link href="#login"> {" "}<img  src="person.png" width= "25 " height="25" className = "person-image" alt="person"></img></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        
        </Container>
      </Navbar>
    )
}