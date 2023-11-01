import React, {  createContext, useContext, useState } from 'react'
import '../MyCss/MyCustomStylesheet.css'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {MyContext} from './ContextProvider'
import VetRoBot from './VetRoBot'
import * as fa from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'


export default function NavbarComponent() {
    let {profilePhotoURL} = useContext(MyContext)
    


  return (
   

    <nav className="navbar bold-text tealBG navbar-expand-lg navbar-dark py-2 fixed-bottom">
    <div className="container d-flex navbar-nav justify-content-around flex-row px-0">
        {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
            </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup"> */}

            <Link className="nav-link" to=""><FontAwesomeIcon className='BigIcon px-2' icon={fa.faHouse} /></Link>
            <NavLink className="nav-link" to="about"><FontAwesomeIcon className='BigIcon px-2' icon={fa.faMapLocationDot} /></NavLink>
            <div className='px-3'> </div>
            <NavLink className="nav-link" to="contact" ><FontAwesomeIcon className='BigIcon px-2' icon={fa.faComments} /></NavLink>
           <NavLink className="" to="SignIn" >
            {/* <FontAwesomeIcon className='BigIcon px-2' icon={fa.faBars} /> */}
            <img className='circle-round' src={profilePhotoURL} alt="" />
            
            </NavLink>
            
            
            


            {/* </div> */}
    </div>
</nav>

  )
}
