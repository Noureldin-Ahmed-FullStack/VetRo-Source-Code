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
import SignUp from './SignUp';


 export default function SignUpPage() {
    const { userObj, setUserObj } = useContext(MyContext);
    const { signInWithGoogle } = UseFirebaseAuth();
    const navigate = useNavigate();

if (userObj) {
  return <ProfileComponent /> 
}
return (<SignUp />
  // <div className=''>
  //                {userObj ? (
  //                  <ProfileComponent /> 
  //               ) : (

  // <SignUp />
  
  //  )}
  // </div>
  
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