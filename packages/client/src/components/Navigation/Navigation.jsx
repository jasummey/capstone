// Navigation.js
import { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./Navigation.css"
import RegisterPage from "../../pages/RegisterPage"
import { useProvideAuth } from '../../contexts/AuthContext';




function Navigation({username}) {
const {auth,signout} = useProvideAuth ();

  
  return (
    <Nav className="navigation">
      <Nav.Link as={Link}to="/">Home</Nav.Link>
      <Nav.Item>
            <Nav.Link as={Link} to ="/dashboard">{`Hello, ${username}`}</Nav.Link>
          </Nav.Item>
      {/* <Nav.Link as={Link} to ="/addrecipe">New Recipe</Nav.Link> */}
      <NavDropdown id="new-account" title = {
      <div className ="pull-left"> <img className= "person-image" src="person.png" width="30" height="30"alt="person"/></div>}>
      {auth.isAuthenticated ? 
      <NavDropdown.Item onClick = {signout}>Sign Out </NavDropdown.Item> : <>
      <NavDropdown.Item as={Link} to="/signup"> Sign up</NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/signin">Login</NavDropdown.Item> </>}
        </NavDropdown>
    </Nav>
  );
}


export default Navigation;