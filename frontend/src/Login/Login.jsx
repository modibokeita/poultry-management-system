import React from 'react'
import './login.css';
import { Link } from 'react-router-dom';
function Login() {
  return (
  
    <div className='form-container'>
      <form action="">
        <h1>Login</h1>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Login</button>
        <p className="message">Not registered? <Link to="/signup">Create an account</Link></p>    
      </form>
    </div>
  )
}

export default Login
