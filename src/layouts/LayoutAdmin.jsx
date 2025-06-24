import React from 'react'
import { Outlet } from 'react-router'

const Layoutadmin = () => {
  return (
      <div>Layoutadmin
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default Layoutadmin