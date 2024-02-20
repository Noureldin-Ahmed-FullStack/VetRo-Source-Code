import React, { useContext } from 'react'
import '../MyCss/MyCustomStylesheet.css'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MyContext } from './ContextProvider'
import * as fa from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import '../MyCss/Navbar.css'
import VetRoBot from './VetRoBot'


export default function NavbarComponent() {
  const { currentDevice, setCurrentDevice } = useContext(MyContext);
  const { UserDBData, setUserDBData } = useContext(MyContext);
  if (currentDevice != 'Other') {
    return (<nav className="navbar bold-text tealBG navbar-expand-lg navbar-dark py-2 fixed-bottom">
      <div className="container d-flex navbar-nav justify-content-around flex-row px-0">
        {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
<span className="navbar-toggler-icon" />
</button>
<div className="collapse navbar-collapse" id="navbarNavAltMarkup"> */}

        <NavLink className="nav-link" to=""><FontAwesomeIcon className='BigIcon navIcon px-2' icon={fa.faHouse} /></NavLink>
        <NavLink className="nav-link" to="speciesidentifier"><FontAwesomeIcon className='BigIcon navIcon px-2' icon={fa.faMapLocationDot} /></NavLink>

        <div className='px-3'> <VetRoBot /> </div>
        <NavLink className="nav-link" to="room" ><FontAwesomeIcon className='BigIcon navIcon px-2' icon={fa.faComments} /></NavLink>
        <Link className="nav-link" data-bs-toggle="offcanvas" data-bs-target="#demo1"><FontAwesomeIcon className='BigIcon navIcon px-2' icon={fa.faBars} /></Link>
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
    </nav>)

  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="navbar-brand ps-2 ms-5 d-flex align-items-center" >

        <img src="/logo192.png" className='Nav-Image' alt="" />
        <NavLink className="nav-link" to=""><h3>VetRo</h3></NavLink>
      </div>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse justify-content-evenly " id="navbarNavAltMarkup">{/*bg-primary*/}
        <div></div>
        <ul className="navbar-nav ">
          <li className="nav-item active">
            <NavLink className="nav-link" to="">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="speciesidentifier">speciesidentifier</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="room">Chat</NavLink>
          </li>
          <li className="nav-item">
            <Link className="nav-link" data-bs-toggle="offcanvas" data-bs-target="#demo1"><FontAwesomeIcon className='BigIcon navIcon px-2' icon={fa.faBars} /></Link>
          </li>
        </ul>
        <div className='d-flex justify-content-center'>
          <ul className="navbar-nav d-flex align-items-center">
            <li className='text-center'>
              <div className="position-relative">
                {/* <FontAwesomeIcon className='cartIcon' icon={fa.faCartShopping} /> */}
                <img src={UserDBData?.userPFP} className='Nav-PFP' alt="" />
                {/* <span className="position-absolute top-0 start-80 translate-middle badge rounded-pill bg-danger">
                  {cart?.numOfCartItems? (<>{cart?.numOfCartItems}</>):(<>0</>)}
                                    <span className="visually-hidden">unread messages</span>
                </span> */}
              </div>
            </li>
            {/* {userObj ? (
                            <li className='text-center mt-2 ms-4'>
                                <button onClick={logOut} className="btn">log out</button>
                            </li>

                        ) : (
                            <>
                                <li className='text-center mt-2 ms-4'>
                                    <NavLink className="nav-link" to="logIn">Log In</NavLink>
                                </li>
                                <li className='text-center mt-2 ms-4'>
                                    <NavLink className="nav-link" to="Register">Register</NavLink>
                                </li>
                            </>
                        )} */}
          </ul>
        </div>
      </div>
    </nav>

  )
}
