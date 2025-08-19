import React from 'react'
import AdminSideBar from '../pages/Dashboard/AdminSideBar'
import AdminHeader from './AdminHeader'
import '../pages/Dashboard/dashboard.css'

export const MenuContext = React.createContext()
function AdminLayout() {
  const [show, setShow] = React.useState(true)

  function showDashboard(){
    setShow(prev => !prev)
  }
  return (
    <MenuContext.Provider value={{ show, showDashboard }}>
      <AdminHeader />
      <AdminSideBar />
    </MenuContext.Provider>
  )
}

export default AdminLayout
