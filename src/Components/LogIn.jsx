
import { MyContext } from './ContextProvider'
import { UseFirebaseAuth } from './UseFirebaseAuth'
import React, { useContext } from 'react'
import ProfileComponent from './ProfileComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'
import '../MyCss/SignIn.css'
import VetImg from '../images/vet.jpg'
import UserImg from '../images/User.jpg'
import logo from '../images/Blue Logo.png'
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../images/Blue Logo.svg'
import Facebook from '../images/Facebook_logo.png'
import Google from '../images/googlelogo.png'
export default function Login() {
  const { userObj, setUserObj } = useContext(MyContext);
  const { signInWithGoogle } = UseFirebaseAuth();
  const navigate = useNavigate();

  return (
    <div className='w-100 d-flex justify-content-center Log-vh-100'>
      <div className="container justify-content-center align-items-center">
        <div className='row featured-image mt-2 mx-auto ' style={{ width: "150px" }}>
          <img src={Logo} className="img-fluid " alt="" />

        </div>
        <h1 className="my-4 text-center">Log In</h1>
        <div className="row justify-content-center">
          <div className="col-md-6 ">

            <form className=''>
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
                  <label htmlFor="formCheck" className="form-check-label text-secondary"><small>Keep me Singed in</small></label>


                </div>
                <div>
                  <small>
                    <a href='#'>Forgot Password</a>
                  </small>
                </div>
              </div>
              <div id="emailHelp" className="form-text text-center mb-3">
                Or use one of these options.
              </div>
              <div className='input-group mb-3'>
                <div onClick={() => signInWithGoogle()} className="btn btn-lg btn-light w-100 fs-6 ">
                  <img src={Google} className='me-2' style={{ width: '20px' }} />
                  <small>Continue With Gmail</small>
                </div>
              </div>
              <div className='input-group mb-3'>
                <button className='btn btn-lg btn-primary w-100 fs-6'>
                  <img src={Facebook} className='me-2' style={{ width: '20px' }} />
                  Continue With Facebook
                </button>
              </div>
              <div id="emailHelp" className="form-text text-center">
                don't have an account?
                <small className='ms-2 pb-4'>
                  <Link to="/SignIn"> Sign Up</Link>
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};