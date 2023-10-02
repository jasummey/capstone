// Register.js
import './RegisterPage.css'
import React, { useState } from 'react';
import {useProvideAuth} from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const { signup, signin} = useProvideAuth();
  const [formData, setFormData] = useState ({ username: '', password: '', confirmPassword:''});
  const navigate = useNavigate()
  const handleRegister = (e) => {
    e.preventDefault();
    signup(formData.username, formData.password, formData.confirmPassword)
    .then(
      (response) => signin(formData.username, formData.password))
    .then(()=> navigate ("/dashboard"))
    
    .catch ((err) => console.log(err))
    // Send a registration request to the server
    // Upon successful registration, call 'login(userData)' to set the user data in the context
  };
  return (
    <div className ="signup">
       <h2>Sign up</h2>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
       <input
        type="password"
        placeholder="Confirm Password"
        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
      />
      {/* <input
        type="text"
        placeholder="Email"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      /> */}
      <button onClick={handleRegister}>Sign up</button>
    </div>
  );
};

export default Register;
