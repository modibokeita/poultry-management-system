import React from 'react'
import { NavLink, Outlet} from 'react-router-dom'
import { MdDashboard, MdOutlineInventory, MdOutlineReceiptLong } from "react-icons/md";
import { GrMoney } from "react-icons/gr";
import { FaEgg,  FaSkullCrossbones } from "react-icons/fa";
import { BsGraphDown } from "react-icons/bs";
import { GiGrain } from "react-icons/gi";
import { GiChicken } from "react-icons/gi";
import { MenuContext } from '../../components/AdminLayout';

function AdminSideBar() {
  const {show}  = React.useContext(MenuContext)
  let showMenu = show ? 'show' : ''

  return (
    <>
    <div className={`admin-side-bar  ${showMenu}`}>
            <NavLink to='.' className='dashboard-icons'><MdDashboard />Dashboard</NavLink>
            <NavLink to='income'className='dashboard-icons'><GrMoney /> Income</NavLink>
            <NavLink to='feeds'className='dashboard-icons'><GiGrain /> Feeds</NavLink>
            <NavLink to='eggs'className='dashboard-icons'><FaEgg /> Eggs</NavLink>
            <NavLink to='finance'className='dashboard-icons'><BsGraphDown /> Finance</NavLink>
            <NavLink to='inventory'className='dashboard-icons'><MdOutlineInventory /> Inventory</NavLink>
            <NavLink to='records'className='dashboard-icons'><MdOutlineReceiptLong /> Records</NavLink>
            <NavLink to='mortality'className='dashboard-icons'><FaSkullCrossbones /> Mortality</NavLink>
            <NavLink to='animals'className='dashboard-icons'><GiChicken /> Poulets</NavLink>
    </div>
    <Outlet />
    </>
  )
}

export default AdminSideBar
