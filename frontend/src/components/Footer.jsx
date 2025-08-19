import { NavLink, Outlet} from 'react-router-dom'
import { RiAdminFill } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";

function Footer() {
  return (
      <>
    <div className='footer-bar'>
        <NavLink to='login' className='icons'><RiAdminFill size={40}/></NavLink>
        <NavLink to='about'className='icons'><FaShoppingCart size={40}/></NavLink>
        <NavLink to='marketplace'className='icons'> <AiOutlineInfoCircle size={40} /></NavLink>
    </div>
    <main className='footer-bar-container'>
    <Outlet />
    </main>
    </>
  )
}

export default Footer
