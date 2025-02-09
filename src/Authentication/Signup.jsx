import React, { useContext, useState } from 'react'
import {Link} from 'react-router-dom'
import { AuthContext } from './AuthContext'





export default function Signup() {
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [userComPassword, setUserComPassword] = useState('')
    const {signup} = useContext(AuthContext)

const handleSubmit = (e)=>{
  e.preventDefault()
  if(userPassword !== userComPassword){
    <div style={{padding:'20px 10px',  background:'red', color:'white', width:'30%', margin:'auto'}}> password don't macth </div>
  }
  signup(userEmail, userPassword)
}

  return (
      <div className="flex  flex-1 flex-col justify-center w-2/4 max-md:w-3/5 max-sm:w-4/5 m-auto rounded-lg mt-8 py-2 px-3" id="trans-bg">

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
            Sign up for an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 ">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  value={userEmail}
                  onChange={(e)=>setUserEmail(e.target.value)}
                  type="email"
                  placeholder='example@gmail.com'
                  required
                  autoComplete="email"
                  className="auth-input-r block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={userPassword}
                  onChange={(e)=>setUserPassword(e.target.value)}
                  required
                  placeholder='password'
                  autoComplete="current-password"
                  className="auth-input-r block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6">
                  Comfirm password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={userComPassword}
                  onChange={(e)=>setUserComPassword(e.target.value)}
                  required
                  placeholder='comfirm password'
                  autoComplete="current-password"
                  className="auth-input-r block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
              onClick={handleSubmit}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
          or  {' '}
            <Link to={'/login'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Login
            </Link>
          </p>
        </div>
      </div>
  )
}
