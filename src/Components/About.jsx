import React, { Component } from 'react'
import '../MyCss/MyCustomStylesheet.css'
import avatarImg from '../images/avatars.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'
import * as fab from '@fortawesome/free-brands-svg-icons';

export default class About extends Component {
    render() {
        return (
            <div className='AboutSection'>
                <div className="container pt-5">
                    <h1 className='bigga text-center pt-5'>ABOUT COMPONENT</h1>
                    <div className="starArea d-flex justify-content-center p-3 align-items-center ">
                        <div className="whiteLine"></div>
                        <FontAwesomeIcon className='px-3' icon={fa.faStar} />
                        <div className="whiteLine"></div>
                    </div>
                    <div className="row w-75 m-auto myPadding">
                        <div className="col-md-6">
                            <p>Freelancer is a free bootstrap theme created by Route. The download includes the complete source files including HTML, CSS, and JavaScript as well as optional SASS stylesheets for easy customization.</p>
                        </div>
                        <div className="col-md-6">
                            <p>Freelancer is a free bootstrap theme created by Route. The download includes the complete source files including HTML, CSS, and JavaScript as well as optional SASS stylesheets for easy customization.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
