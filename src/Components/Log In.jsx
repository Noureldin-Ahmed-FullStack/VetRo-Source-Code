// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 // import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
 // import { auth, provider, app, db } from '../Firebase/firebase';
 import { MyContext } from './ContextProvider'
 import { UseFirebaseAuth } from './UseFirebaseAuth'
 // import React, { useState, useEffect, useContext } from 'react'
import React, { useContext } from 'react'
import ProfileComponent from './ProfileComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'
import '../MyCss/SignIn.css'
import VetImg from '../images/vet.jpg'
import UserImg from '../images/User.jpg'
import logo from '../images/Blue Logo.png'
import { useNavigate } from 'react-router-dom';
import Logo from '../images/Blue Logo.png'
import Facebook from '../images/Facebook_logo.png'
import Google from '../images/googlelogo.png'
import SignInPage from './Log In';
export default function SignUpPage() {
  const { userObj, setUserObj } = useContext(MyContext);
  const { signInWithGoogle } = UseFirebaseAuth();
  const navigate = useNavigate();

  return (
    <div className="container justify-content-center align-items-center min-vh-100">
        <div className='row featured-image mx-auto ' style={{width: "150px" }}>
                <img src={Logo} className="img-fluid "  alt="" />

            </div>
      <h1 className="my-4 text-center">Log In</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
            
          <form>
          <div className="input-group mb-3">
              
              <input
                type="email"
                className="form-control form-control-lg bg-light fs-6"
                placeholder='Your email'
                id="email"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="input-group mb-3">
              
              <input
                type="password"
                className="form-control form-control-lg bg-light fs-6"
                placeholder='password'
                id="password"
                aria-describedby="passwordHelp"
              />
            </div>

            <div className='input-group mb-3'>
                <button className='btn btn-lg btn-primary w-100 fs-6'>
                    Continue With Email
                </button>
            </div> 
            <div className='input-group mb5 d-flex justify-content-between'>
                <div className='form-check'>
                    <input 
                    type="checkbox"
                    className="form-check-input"
                    id="formCheck"
                    aria-describedby="passwordHelp"
                    />
                    <label for="formCheck" className='form-check-label text-secondary'><small>Keep me Singed in</small></label>

                </div>
                <div>
                    <small>
                        <a href='#'>Forgot Password</a>
                    </small>
                </div>
            </div>
            <div id="emailHelp" className="form-text text-center">
                Or use one of these options.
              </div>
              <div className='input-group mb-3'>
                <div onClick={() => signInWithGoogle()} className="btn btn-lg btn-light w-100 fs-6 ">
                    <img src={Google}  className='me-2' style={{width: '20px'}}/>
                    <small>Continue With Gmail</small>
                </div>
            </div>
            <div className='input-group mb-3'>
                <button className='btn btn-lg btn-primary w-100 fs-6'>
                <img src={Facebook}  className='me-2' style={{width: '20px'}}/>
                    Continue With Facebook
                </button>
            </div>
            <div id="emailHelp" className="form-text text-center">
                Already have an account 
                <small>
                    <a href='#'>Register</a>
                </small>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
};