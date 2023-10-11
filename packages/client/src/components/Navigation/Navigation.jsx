// Navigation.js
import { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./Navigation.css"
import RegisterPage from "../../pages/RegisterPage"
import { useProvideAuth } from '../../contexts/AuthContext';




function Navigation({ username }) {
  const { auth, signout } = useProvideAuth();


  return (
    <Nav className="navigation">
      <Nav.Link as={Link} to="/">Home</Nav.Link>
      <NavDropdown id="new-account" title={
        <div className="pull-left"> <img className="person-image" src="person.png" width="30" height="30" alt="person" /></div>}>
        {auth.isAuthenticated ?
         <><Nav.Link as={Link} to={`/user/${auth.user}`}>{`${auth.user}'s account`}</Nav.Link> 
          <NavDropdown.Item onClick={signout}>Sign Out </NavDropdown.Item></> : <>
            <NavDropdown.Item as={Link} to="/signup"> Sign up</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/signin">Login</NavDropdown.Item> </>}
      </NavDropdown>
    </Nav>
  );
}


export default Navigation;