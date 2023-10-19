import React, { Component } from 'react'
import '../MyCss/MyCustomStylesheet.css'
import avatarImg from '../images/avatars.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'
import * as fab from '@fortawesome/free-brands-svg-icons';

export default class Portfolio extends Component {
    render() {
        return (
            <div className='portfolioComponent text-center my-4'>
                <h1>PORTFOLIO COMPONENT</h1>
                <div className="starArea d-flex justify-content-center my-3 align-items-center ">
                    <div className="DarkLine"></div>
                    <FontAwesomeIcon className='px-3' icon={fa.faStar} />
                    <div className="DarkLine"></div>
                </div>
                <div className="container">
                    <div className="row gy-4">
                        <div className="col-md-4 d-flex justify-content-center imgDiv rounded-4">
                            <img className='w-100 PortImg rounded-4' src={require('../images/port1.png')} />
                            <div className="PortOverlay d-flex justify-content-center align-items-center rounded-4">
                                <FontAwesomeIcon className='bigga-5 text-light' icon={fa.faPlus} />
                            </div>
                        </div>
                        <div className="col-md-4 d-flex justify-content-center imgDiv rounded-4">
                            <img className='w-100 PortImg rounded-4' src={require('../images/port2.png')} />
                            <div className="PortOverlay d-flex justify-content-center align-items-center rounded-4">
                                <FontAwesomeIcon className='bigga-5 text-light' icon={fa.faPlus} />
                            </div>
                        </div>
                        <div className="col-md-4 d-flex justify-content-center imgDiv rounded-4">
                            <img className='w-100 PortImg rounded-4' src={require('../images/port3.png')} />
                            <div className="PortOverlay d-flex justify-content-center align-items-center rounded-4">
                                <FontAwesomeIcon className='bigga-5 text-light' icon={fa.faPlus} />
                            </div>
                        </div>

                        <div className="col-md-4 d-flex justify-content-center imgDiv rounded-4">
                            <img className='w-100 PortImg rounded-4' src={require('../images/port1.png')} />
                            <div className="PortOverlay d-flex justify-content-center align-items-center rounded-4">
                                <FontAwesomeIcon className='bigga-5 text-light' icon={fa.faPlus} />
                            </div>
                        </div>
                        <div className="col-md-4 d-flex justify-content-center imgDiv rounded-4">
                            <img className='w-100 PortImg rounded-4' src={require('../images/port2.png')} />
                            <div className="PortOverlay d-flex justify-content-center align-items-center rounded-4">
                                <FontAwesomeIcon className='bigga-5 text-light' icon={fa.faPlus} />
                            </div>
                        </div>
                        <div className="col-md-4 d-flex justify-content-center imgDiv rounded-4">
                            <div className="PortOverlay d-flex justify-content-center align-items-center rounded-4">
                                <FontAwesomeIcon className='bigga-5 text-light' icon={fa.faPlus} />
                            </div>
                            <img className='w-100 PortImg rounded-4' src={require('../images/port3.png')} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
