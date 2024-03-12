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
    return (
      <nav className="navbar bold-text tealBG navbar-expand-lg navbar-dark py-2 fixed-bottom">
        <div className="container d-flex navbar-nav justify-content-around flex-row px-0">

          <NavLink className="nav-link" to=""><FontAwesomeIcon className='BigIcon navIcon px-2' icon={fa.faHouse} /></NavLink>
          <NavLink className="nav-link" to="speciesidentifier"><FontAwesomeIcon className='BigIcon navIcon px-2' icon={fa.faMapLocationDot} /></NavLink>

          <div className='px-3'> <VetRoBot /> </div>
          <NavLink className="nav-link" to="contacts" ><FontAwesomeIcon className='BigIcon navIcon px-2' icon={fa.faComments} /></NavLink>
          <Link className="nav-link" data-bs-toggle="offcanvas" data-bs-target="#demo1"><FontAwesomeIcon className='BigIcon navIcon px-2' icon={fa.faBars} /></Link>

        </div>
      </nav>)

  }
  return (
    <>
      <VetRoBot />
      <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">

        <div className="navbar-brand ps-2 ms-5 d-flex align-items-center" >

          <img src="/logo192.png" className='Nav-Image' alt="" />
          <NavLink className="nav-link" to=""><h3 className=' my-0'>VetRo</h3></NavLink>
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse justify-content-around " id="navbarNavAltMarkup">{/*bg-primary*/}
          <div></div>
          <ul className="navbar-nav ">
            <li className="nav-item active">
              <NavLink className="nav-link" to="">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="speciesidentifier">speciesidentifier</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="Contacts">Chat</NavLink>
            </li>
          </ul>
          <div className='d-flex justify-content-center'>
            <ul className="navbar-nav d-flex align-items-center">
              <li className='text-center'>
                <div className="position-relative">
                  {/* <FontAwesomeIcon className='cartIcon' icon={fa.faCartShopping} /> */}
                  <Link className="nav-link" data-bs-toggle="offcanvas" data-bs-target="#demo1"><img src={UserDBData?.userPFP || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmRLRMXynnc7D6-xfdpeaoEUeon2FaU0XtPg&usqp=CAU"} className='Nav-PFP' alt="" /></Link>
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
    </>
  )
}
