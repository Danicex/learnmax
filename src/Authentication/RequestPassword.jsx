import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';



export default function RequestPassword() {
    const [email, setEmail] = useState('');
    const { api_endpoint} = useContext(AuthContext);
    
     const [message, setMessage] = useState('A recovery link will be sent to this email');
     const navigate = useNavigate()

     const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await fetch(`${api_endpoint}/users/password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: { email } })
          });
          if (response.ok) {
            setMessage('Password reset email sent. Please check your inbox.');
            navigate('/password/reset/:resetToken')
          } else {
            setMessage('Error sending password reset email.');
          }
        } catch (error) {
          setMessage('An error occurred. Please try again.');
        }
      };
 
  return (
    <form onSubmit={handleSubmit}
    className='flex gap-3  flex-1 flex-col justify-center w-2/5 max-md:w-3/5 m-auto rounded-lg mt-20 py-2 max-sm:w-4/5 px-3' id='trans-bg'>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder='example@gmail.com'
        className='ring-1 ring-gray-400 hover:ring-2 outline-none'
      />
      <button type="submit">Send Password Reset</button>
    {message && <p className='text-center mt-5  text-gray-400'>{message}</p>}
    <p className='mt-5 text-center'>
    <Link to={'/login'} >← login</Link>
    </p>
    </form>
  )
}
