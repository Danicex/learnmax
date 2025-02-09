import { useState } from 'react'
import './App.css'
import { AuthProvider } from './Context/AuthContext'
import { Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage'
import TextInputProcessor from './Learnmax/TextProcessor';
import ProtectedRoute from './Protected';

function App() {
 
  return (
    <AuthProvider>
       <Routes>
       <Route path='/' element={<LandingPage />}/>
       <Route path='/home' element={<TextInputProcessor />}/>
       </Routes>
    </AuthProvider>
  )
}

export default App
