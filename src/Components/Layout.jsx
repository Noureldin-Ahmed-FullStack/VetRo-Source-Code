import React, { Component, useContext, useEffect, useState } from 'react'
import NavbarComponent from './NavbarComponent'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { MyContext } from './ContextProvider'


export default function Layout() {
  let {profilePhotoURL, setprofilePhotoURL} = useContext(MyContext)

  useEffect(() => {
    console.log(profilePhotoURL);
    const UserData = localStorage.getItem('UserData')
    const UserDataParsed = JSON.parse(UserData);
    setprofilePhotoURL(UserDataParsed.pPhotoUrl)
    console.log(profilePhotoURL);

  })

  return (
    <>
      <div className='tall GreenishBG'>
        <Outlet />
      </div>
      <NavbarComponent />
      {/* <Footer /> */}

    </>
  )
}
