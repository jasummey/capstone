// Login.js

import React, { useState } from 'react';
import { useAuth } from './Auth';

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleLogin = () => {
    // Send a login request to the server
    // Upon successful login, call 'login(userData)' to set the user data in the context
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
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
