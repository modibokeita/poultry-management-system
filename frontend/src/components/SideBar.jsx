import React from 'react'
import { NavLink, Outlet} from 'react-router-dom'
import { RiAdminFill } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";

function SideBar() {
  return (
    <>
    <div className='side-bar'>
            <NavLink to='login' className='icons'>Admin<RiAdminFill size={40}/></NavLink>
            <NavLink to='market'className='icons'> Market<FaShoppingCart size={40}/></NavLink>
            <NavLink to='about'className='icons'>About <AiOutlineInfoCircle size={40} /></NavLink>
    </div>
    <main className='side-bar-container'>

    <Outlet />
    </main>
    </>
  )
}

export default SideBar
