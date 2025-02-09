import React, {  useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './Context/AuthContext';

export default function ProtectedRoute({children}) {
  
    const navigate = useNavigate()
    
    const {authenticated}  = useContext(AuthContext);
  return authenticated ? children : navigate('/');
}