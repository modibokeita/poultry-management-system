import React from 'react'
import { Link } from 'react-router-dom';
import './signup.css';
function Signup() {
  return (
    <div className='form-container'>
      <form action="">
        <h1>Sign Up</h1>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required />
        </div>
         <div className="form-group email">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Sign up</button>
        <p className="message">Already have account? <Link to="/login">Login</Link></p>    
      </form>
    </div>
  )
}

export default Signup
