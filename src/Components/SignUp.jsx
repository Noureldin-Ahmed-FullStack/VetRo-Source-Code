import React from 'react'
import Logo from '../images/Blue Logo.svg'
import Facebook from '../images/Facebook_logo.png'
import Google from '../images/googlelogo.png'
import '../MyCss/SignIn.css'
import { UseFirebaseAuth } from './UseFirebaseAuth'
import { Link } from 'react-router-dom';

export default function SignUp() {
    const { signInWithGoogle } = UseFirebaseAuth();
    return (

        <div className="container  justify-content-center align-items-center">
            <div className='row featured-image mx-auto ' style={{ width: "10rem" }}>
                <img src={Logo} className="img-fluid mt-2" alt="" />
            </div>
            <h1 className="my-4 text-center">Sign Up</h1>
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

                        <div className='input-group '>
                            <button className='btn btn-lg btn-primary w-100 fs-6'>
                                Continue With Email
                            </button>
                        </div>
                        <div id="emailHelp" className="form-text text-center m-0 py-3">
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
                        <div id="emailHelp" className="form-text text-center ">
                            Already have an account ?
                            <small className='ps-1'>
                                <Link to="/login"> Sign in</Link>
                            </small>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
