// Navigation.js
import { useState } from 'react';
import React from 'react';
import Modal from 'react-modal';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./Navigation.css"
import Register from '../Register/register';



function Navigation() {
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);
  const openSignupModal = () => {
    setSignupModalOpen(true);
  };

  const closeSignupModal = () => {
    setSignupModalOpen(false);
  };

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };
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
      <img src="person.png" onClick = {openSignupModal} width="30" height="30" className="person-image" alt="person" />
      {/* <button onClick={openLoginModal}>Login</button> */}
     <div className='modal-register'>
      <Modal
        isOpen={isSignupModalOpen}
        onRequestClose={closeSignupModal}
        contentLabel="Signup Modal"
        style = {{overlay: { background: " #f1dfd1" } }}
      >
        <button onClick={closeSignupModal}>Close</button> 
        <Register />
      </Modal>
      </div>
      </Nav.Link>
    </Nav>
  );
}

export default Navigation;
