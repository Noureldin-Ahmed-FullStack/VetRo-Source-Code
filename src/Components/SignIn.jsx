import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/Firebase";

import React from 'react'


export default function SignIn() {
    const HandleSubmit = (e) =>{
        e.preventDefault()
        const Username = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        console.log(Username, email, password);
    
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;

    console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}
    return (
        <div className="container GreenishBG">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div style={{ border: "#fff" }} className="card my-5">
                        <div style={{ backgroundColor: "#1abc9c73", fontWeight: "600" }} className="card-header">
                            Sign In
                        </div>
                        <div className="card-body">
                            <form onSubmit={HandleSubmit}>
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
                                <button type="submit" className="btn btn-primary w-100 mt-4">Sign In</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
