// Navigation.js

import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./Navigation.css"

function Navigation() {
  return (
    <Nav className="navigation">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#add-recipe">Add Your Recipe</Nav.Link>
      <NavDropdown title="Search" id="basic-nav-dropdown">
        <NavDropdown.Item href="#by-ingredient">By Ingredient</NavDropdown.Item>
        <NavDropdown.Item href="#by-meal">By Meal Type</NavDropdown.Item>
        <NavDropdown.Item href="#by-calories">By Calories</NavDropdown.Item>
        <NavDropdown.Divider />
      </NavDropdown>
      <Nav.Link href="#login">
        <img src="person.png" width="30" height="30" className="person-image" alt="person" />
      </Nav.Link>
    </Nav>
  );
}

export default Navigation;
