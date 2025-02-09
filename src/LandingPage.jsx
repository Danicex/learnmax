import React, { useContext } from 'react'
import { AuthContext } from './Context/AuthContext'
import { FaToggleOn, FaToggleOff } from "react-icons/fa";

export default function LandingPage() {
    const {theme, setTheme} = useContext(AuthContext)

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };
    
  return (
    <div>
    {theme === 'light' ? (<FaToggleOff id='theme-icon' onClick={toggleTheme}/>) : (<FaToggleOn onClick={toggleTheme} id='theme-icon'/>)}

    <div  className="text-3xl font-bold m-auto">LandingPage</div>
    </div>
  )
}
