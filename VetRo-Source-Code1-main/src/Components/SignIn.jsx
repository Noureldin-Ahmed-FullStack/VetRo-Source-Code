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


export default function SignIn() {
    const { userObj, setUserObj } = useContext(MyContext);
    const { signInWithGoogle, signInWithGoogleAsDoctor } = UseFirebaseAuth();





    return (
        <div className="container GreenishBG">
            <div className="row justify-content-center">

                {userObj ? (
                    <div style={{ border: "#fff" }} className="card w-100 p-3 my-5">
                        <ProfileComponent />
                    </div>
                ) : (
                    <div className="col-md-6">
                        <div style={{ border: "#fff" }} className="card my-5">
                            <div style={{ backgroundColor: "#1abc9c73", fontWeight: "600" }} className="card-header">
                                Sign In
                            </div>
                            <div className="card-body">
                                <div className="row justify-content-between">
                                    <div className="col-6 hov">
                                        <div onClick={() =>signInWithGoogle(false)} className="box d-flex justify-content-center align-items-center">
                                            <div className='choice'>
                                                <FontAwesomeIcon className='BiggerIcon w-100' icon={fa.faUser} />
                                                <h3 className='w-100'>Normal User</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 hov">
                                        <div onClick={() =>signInWithGoogle(true)} className="box d-flex justify-content-center align-items-center">
                                            <div className='choice'>
                                                <FontAwesomeIcon className='BiggerIcon w-100' icon={fa.faUserDoctor} />
                                                <h3 className='w-100'>Doctor</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <form >
                                    <div className="form-group py-2">
                                        <label htmlFor="Username">Username</label>
                                        <div className='d-flex align-items-center'>

                                            <input
                                                type="text"
                                                className="form-control"
                                                id="Username"
                                                placeholder="Enter your Username"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group py-2">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>
                                    <div className="form-group py-2">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="Enter your password"
                                            required
                                        />
                                    </div>
                                    <div className='container'>
                                        <button type="submit" className="btn btn-primary w-100 mt-4">Sign In</button>
                                        <button onClick={signInWithGoogle} className="w-100 mt-3 mb-2 MySignIN ">
                                            {/* <button type='button' className="w-100 mt-3 mb-2 MySignIN "> */}
                                            <span className='p-2 MyLogo'><img src="https://ssniper.sirv.com/Images/google.svg" alt="" />
                                            </span>
                                            Sign In with Google</button>
                                        <p className='text-center'>Already have an account? <a href="">Log in</a></p>
                                    </div>
                                </form>
                            </div>
                        </div></div>
                )}
            </div>
        </div>

    )
}
