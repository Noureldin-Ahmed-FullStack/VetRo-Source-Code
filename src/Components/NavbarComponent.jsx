import React, {useContext} from 'react'
import '../MyCss/MyCustomStylesheet.css'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MyContext } from './ContextProvider'
import * as fa from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import VetRoBot from './VetRoBot'


export default function NavbarComponent() {
  const { userObj, setUserObj } = useContext(MyContext);
  const { UserDBData, setUserDBData } = useContext(MyContext);




  return (


    <nav className="navbar bold-text tealBG navbar-expand-lg navbar-dark py-2 fixed-bottom">
      <div className="container d-flex navbar-nav justify-content-around flex-row px-0">
        {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
            </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup"> */}

        <NavLink  className="nav-link" to=""><FontAwesomeIcon className='BigIcon navIcon px-2' icon={fa.faHouse} /></NavLink>
        <NavLink  className="nav-link" to="speciesidentifier"><FontAwesomeIcon className='BigIcon navIcon px-2' icon={fa.faMapLocationDot} /></NavLink>
       
        <div className='px-3'> <VetRoBot /> </div>
        <NavLink  className="nav-link" to="room" ><FontAwesomeIcon className='BigIcon navIcon px-2' icon={fa.faComments} /></NavLink>
        <Link  className="nav-link"  data-bs-toggle="offcanvas" data-bs-target="#demo1"><FontAwesomeIcon className='BigIcon navIcon px-2' icon={fa.faBars} /></Link>
        {/* <NavLink className="" to="SignIn" >
           <FontAwesomeIcon className='BigIcon navIcon px-2' icon={fa.faBars} /> 
          {UserDBData ? (
          <img className='circle-round' src={UserDBData.userPFP} alt="" />
          ) : (
          <img className='circle-round' src={"https://ssniper.sirv.com/Images/3.png"} alt="" />
          )}
        </NavLink> */}





        {/* </div> */}
      </div>
    </nav>

  )
}
