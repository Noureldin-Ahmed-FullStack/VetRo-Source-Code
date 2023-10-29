import React from 'react'
import '../MyCss/MyCustomStylesheet.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'
import $ from 'jquery';
import VetRoBot from './VetRoBot';



export default function Contact() {
    let un, a, E, p = ""
    const handleUserChange = (event) => {
        un = event.target.value
        $("#userNameLbl").fadeIn(500);
        if (un === "") {
            $("#userNameLbl").fadeOut(500);
        }
    };
    const handleAgeChange = (event) => {
        a = event.target.value
        $("#userAgeLbl").fadeIn(500);
        if (a === "") {
            $("#userAgeLbl").fadeOut(500);
        }
    };
    const handleEmailChange = (event) => {
        E = event.target.value
        $("#userEmailLbl").fadeIn(500);
        if (E === "") {
            $("#userEmailLbl").fadeOut(500);
        }
    };
    const handlePassChange = (event) => {
        p = event.target.value
        $("#userPasswordLbl").fadeIn(500);
        if (p === "") {
            $("#userPasswordLbl").fadeOut(500);
        }
    };

    return (

        <div>
            <h2 className='text-center pt-5 mb-1'>CONTACT SECTION</h2>
            <div className="starArea d-flex justify-content-center my-3 align-items-center ">
                <div className="DarkLine"></div>
                <FontAwesomeIcon className='px-3' icon={fa.faStar} />
                <div className="DarkLine"></div>
            </div>
            <div className='d-flex justify-content-center py-4'>

                <form className='w-50 myForm'>
                    <div className="py-1">
                        <div className="block">
                            <label htmlFor="username" id='userNameLbl'>userName:</label>
                        </div>
                        <input type="text" name='userName' id='userName' onChange={handleUserChange} className='form-control border-bottom' placeholder='Username' />
                    </div>
                    <div className="py-1">
                        <div className="block">
                            <label htmlFor="userage" id='userAgeLbl'>userAge:</label>
                        </div>
                        <input type="text" name='userage' id='userName' onChange={handleAgeChange} className='form-control border-bottom' placeholder='userAge' />
                    </div>
                    <div className="py-1">
                        <div className="block">
                            <label htmlFor="userEmail" id='userEmailLbl'>userEmail:</label>
                        </div>
                        <input type="text" name='userEmail' id='userName' onChange={handleEmailChange} className='form-control border-bottom' placeholder='userEmail' />
                    </div>
                    <div className="py-1">
                        <div className="block">
                            <label htmlFor="userPassword" id='userPasswordLbl'>userPassword:</label>
                        </div>
                        <input type="text" name='userPassword' id='userName' onChange={handlePassChange} className='form-control border-bottom' placeholder='userPassword' />
                    </div>
                </form>
            </div>

        </div>
    )
}
