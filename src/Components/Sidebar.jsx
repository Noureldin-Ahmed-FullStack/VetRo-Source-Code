import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'
import { Link, NavLink } from "react-router-dom";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { MyContext } from './ContextProvider'


function Sidebar({ children }) {

    const { UserDBData, setUserDBData } = useContext(MyContext);

    return (

        <div className="offcanvas offcanvas-end bg-secondary" id="demo1">
            <div className="offcanvas-header">
                <h1 className="offcanvas-title text-white">VetRo</h1>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
            </div>
            <hr className="text-white mt-2" />
            <ul className="nav nav-pills flex-column px-0">

                <li className="nav-item py-1">

                    <NavLink to="" className="nav-link text-white">

                        <i className="bi bi-speedometer me-2 fs-5"> <FontAwesomeIcon className='BigIcon px-2' icon={fa.faHouse} /></i>
                        <span className="fs-5">Home</span>
                    </NavLink>

                </li>
                <li className="nav-item py-1">
                    <NavLink className="nav-link text-white" to="SignIn" >
                        {/* <FontAwesomeIcon className='BigIcon px-2' icon={fa.faBars} /> */}
                        <i className="bi bi-speedometer me-2 fs-5">
                        {UserDBData ? (
                            <img className='circle-round' src={UserDBData.userPFP} alt="" />
                        ) : (
                            <img className='circle-round' src={"https://ssniper.sirv.com/Images/3.png"} alt="" />
                        )}
                        </i>
                        <span className="fs-5">Profile</span>
                    </NavLink>
                    {/* <a href="SignIn" className="nav-link text-white">
                        <i className="bi bi-speedometer me-2 fs-5"> {UserDBData ? (
                            <img className='circle-round' src={UserDBData.userPFP} alt="" />) : (<img className='circle-round' src={"https://ssniper.sirv.com/Images/3.png"} alt="" />
                        )}
                        </i>
                        <span className="fs-5">Profile</span>
                    </a> */}

                </li>
                <li className="nav-item py-1">
                    <NavLink to="Speciesidentifier" className="nav-link text-white">
                        <i className="bi bi-speedometer me-2 fs-5"> <FontAwesomeIcon className='BigIcon px-2' icon={fa.faMapLocationDot} /></i>
                        <span className="fs-5">Speciesidentifier</span>
                    </NavLink>

                </li>
                <li className="nav-item py-1">
                    <NavLink to="Contacts" className="nav-link text-white">
                        <i className="bi bi-speedometer me-2 fs-5"> <FontAwesomeIcon className='BigIcon px-2' icon={fa.faComments} /></i>
                        <span className="fs-5">Chat</span>
                    </NavLink>

                </li>
                {/* <li className="nav-item py-1">
                    <a href="" className="nav-link text-white">
                        <i className="bi bi-speedometer me-2 fs-5"> <img className='circle-round' src={'https://ssniper.sirv.com/Images/1.png'} alt="" /></i>
                        <span className="fs-5">ChatBot</span>
                    </a>

                </li> */}



                <hr className="text-white mt-2" />
                <div>

                </div>

            </ul>
        </div>
    )
}

export default Sidebar