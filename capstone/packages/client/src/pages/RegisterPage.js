// Register.js

import React, { useState } from 'react';
import { useAuth } from './Auth';

const Register = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleRegister = () => {
    // Send a registration request to the server
    // Upon successful registration, call 'login(userData)' to set the user data in the context
  };

  return (
    <div>
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
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
