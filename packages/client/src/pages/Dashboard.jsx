import React, { useEffect } from 'react'
import { useProvideAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import api from '../utils/api.config';

function Dashboard() {
const {auth} = useProvideAuth();
  useEffect (()=> {
    api.get("/protected")
    .then(()=>
    console.log ("successfull"))
    .catch((err) =>
    console.log ("failed"))
  },[auth.isAuthenticated]) ;

  if (auth.isAuthenticated === false) {
  return <Navigate to = "/signin" />;
  }
 
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard