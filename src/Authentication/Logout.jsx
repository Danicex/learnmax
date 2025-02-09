import React, { useContext } from 'react'
import { AuthContext } from './AuthContext'
import './Auth.css'

export default function Logout() {
    const {logout} = useContext(AuthContext)
  return (
    <div className='logout-layout'>
      <p className='mb-5'>Are you sure you want to end this session ?</p>
      <button onClick={logout} className='px-4 py-2 bg-red-600 hover:bg-red-800'>yes</button>

    </div>
  )
}
