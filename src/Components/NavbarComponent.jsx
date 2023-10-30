import React, { Component } from 'react'
import '../MyCss/MyCustomStylesheet.css'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import VetRoBot from './VetRoBot'
import * as fa from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'


export default class NavbarComponent extends Component {





    render() {
        return (



            <nav className="navbar bold-text tealBG navbar-expand-lg navbar-dark py-3 fixed-bottom">
                <div className="container d-flex navbar-nav justify-content-around flex-row px-0">
                    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                        </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup"> */}
            
                        <Link className="nav-link" to=""><FontAwesomeIcon className='BigIcon px-2' icon={fa.faHouse} /></Link>
                        <NavLink className="nav-link" to="about"><FontAwesomeIcon className='BigIcon px-2' icon={fa.faMapLocationDot} /></NavLink>
                        <div className='px-3'> </div>
                        <NavLink className="nav-link" to="contact" ><FontAwesomeIcon className='BigIcon px-2' icon={fa.faComments} /></NavLink>
                       <NavLink className="nav-link" to="SignIn" ><FontAwesomeIcon className='BigIcon px-2' icon={fa.faBars} /></NavLink>
                        
                        
                        


                        {/* </div> */}
                </div>
            </nav>






        )
    }
}
