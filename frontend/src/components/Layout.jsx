import React from 'react'
import Header from './Header'
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
      <>
      <div className='layout-container'>
        <Header />
        <SideBar />
      </div>
    </>
  )
}

export default Layout
