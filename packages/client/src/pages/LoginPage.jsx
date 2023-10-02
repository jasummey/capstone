// Login.js
import "./loginpage.css"
import React from 'react';
import {useProvideAuth} from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const initialState = {
  username: "",
  password: "",
 
}

const Login = () => {
  const { signin } = useProvideAuth();
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    signin (formData.username, formData.password)
   .then(() => navigate ("/dashboard"))
   .catch ((err) => console.log (err))

  }

  return (
    <div className='login'>
      <h2> Please Login </h2>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setFormData({ ...formData,password: e.target.value })}
      />
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
};

export default Login ;