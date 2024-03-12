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
  <div className='w-100 d-flex justify-content-center'>
                 {userObj ? (
                   <ProfileComponent /> 
                ) : (

  
  
   <div className="container justify-content-center align-items-center min-vh-100">
      <div className='row featured-image mx-auto ' style={{width: "150px" }}>
              <img src={Logo} className="img-fluid "  alt="" />
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

          <div className='input-group mb-3'>
              <button className='btn btn-lg btn-primary w-100 fs-6'>
                  Continue With Email
              </button>
          </div>
          <div id="emailHelp" className="form-text text-center py-3">
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
          <div id="emailHelp" className="form-text text-center ">
              Already have an account ? 
              <small>
              <a href='#' className='px-2'>Sign in</a>
              </small>
            </div>
        </form>
      </div>
    </div>
  </div> )}
  </div>
  
);
};

// /*
//                     <div className="sign_up">
//                         <div className="logo-container11">
//                             <img className="" alt="" src={logo} />
//                         </div>
                        
//                         <div className="fatema" >
//                             <div>
//                                 <h1 className="T1nd">  Are you a veterinarian or a pet owner?</h1>
//                                 <h1 className='T2nd'>Select your user type to continue</h1>
//                             </div>

//                             <div className="total" >
//                                 <div onClick={() => navigate("/SingUp")} className="Selections Selections1 " >
//                                     <img className='circular-image ' src={UserImg} alt="" />
//                                      <h3 className="Selections-te">I’m a Pet owner</h3>
//                                 </div>

//                                 <div onClick={() => signInWithGoogle()} className="Selections Selections2 " >
//                                     <img className='circular-image' src={VetImg} alt="" />
//                                     <h3 className="Selections-te">I’m a Veterinarian</h3>

//                                 </div>
//                             </div>

//                         </div>
//                     </div>



//                                 <form >
//                 <div className="form-group py-2">
//                     <label htmlFor="Username">Username</label>
//                     <div className='d-flex align-items-center'>

//                         <input
//                             type="text"
//                             className="form-control"
//                             id="Username"
//                             placeholder="Enter your Username"
//                             required
//                         />
//                     </div>
//                 </div>
//                 <div className="form-group py-2">
//                     <label htmlFor="email">Email</label>
//                     <input
//                         type="email"
//                         className="form-control"
//                         id="email"
//                         placeholder="Enter your email"
//                         required
//                     />
//                 </div>
//                 <div className="form-group py-2">
//                     <label htmlFor="password">Password</label>
//                     <input
//                         type="password"
//                         className="form-control"
//                         id="password"
//                         placeholder="Enter your password"
//                         required
//                     />
//                 </div>
//                 <div className='container'>
//                     <button type="submit" className="btn btn-primary w-100 mt-4">Sign In</button>
//                     <button onClick={signInWithGoogle} className="w-100 mt-3 mb-2 MySignIN ">
//                         COMMENT    " {/* <button type='button' className="w-100 mt-3 mb-2 MySignIN ">" */


// {/* <span className='p-2 MyLogo'><img src="https://ssniper.sirv.com/Images/google.svg" alt="" />
//                                             </span>
//                                             Sign In with Google</button>
//                                         <p className='text-center'>Already have an account? <a href="">Log in</a></p>
//                                     </div>
// </form>*/}