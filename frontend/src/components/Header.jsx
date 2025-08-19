import React from 'react'
import { Link} from 'react-router-dom'
import { IoMenu } from "react-icons/io5";
function Header() {
  return (
    <header className='header-container'>
         <Link to='/'><IoMenu className='menu'/> Keita volaille Kati</Link>
    </header>
  )
}

export default Header
