import React from 'react'
import { Link} from 'react-router-dom'
import { IoMenu } from "react-icons/io5";
import { MenuContext } from './AdminLayout';
function AdminHeader() {
  const {showDashboard}  = React.useContext(MenuContext)
  
  return (
    <header className='header-container'>
        <IoMenu onClick={showDashboard}  className='menu'/>
         <Link to='/'>Keita volaille Kati</Link>
    </header>
  )
}

export default AdminHeader
