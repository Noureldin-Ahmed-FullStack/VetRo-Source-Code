import React, { Component, useContext, useEffect, useState } from 'react'
import NavbarComponent from './NavbarComponent'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { MyContext } from './ContextProvider'

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase/firebase';

export default function Layout() {
  let { profilePhotoURL, setprofilePhotoURL } = useContext(MyContext)
  const { userObj, setUserObj } = useContext(MyContext);
  let { myAuth ,setMyAuth } = useContext(MyContext)

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser != null) {
      setUserObj(currentUser)
      setMyAuth("Logged in")
      console.log(userObj);
      if (userObj !== null && userObj.photoURL) {
        setprofilePhotoURL(userObj.photoURL);
      }
      // setprofilePhotoURL(userObj.photoURL)
    }

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
