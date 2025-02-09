import React, { useState, useContext } from 'react'
import { AuthContext } from './AuthContext';


export default function ResetPasswordForm() {
    const { resetToken } = useParams();
    const { api_endpoint} = useContext(AuthContext);

    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [message, setMessage] = useState('');

   
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await fetch(`${api_endpoint}/admins/password`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              user: {
                reset_password_token: resetToken,
                password,
                password_confirmation: passwordConfirmation
              }
            })
          });
          if (response.ok) {
            setMessage('Password has been reset. You can now log in with your new password.');
          } else {
            setMessage('Error resetting password.');
          }
        } catch (error) {
          setMessage('An error occurred. Please try again.');
        }
      };
  return (
    <div>
    <form onSubmit={handleSubmit}>
      <label>New Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <label>Confirm New Password:</label>
      <input
        type="password"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        required
      />
      <button type="submit">Reset Password</button>
    </form>
    {message && <p>{message}</p>}
  </div>

  )
}
