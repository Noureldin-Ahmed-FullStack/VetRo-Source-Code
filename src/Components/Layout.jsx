import React, { Component } from 'react'
import NavbarComponent from './NavbarComponent'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'


export default function Layout() {
  


  return (
    <>
      <div className='GreenishBG'>
      <Outlet />
      </div>
      <NavbarComponent />
      {/* <Footer /> */}

    </>
  )
}
