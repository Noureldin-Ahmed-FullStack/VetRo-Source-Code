import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../Firebase/Firebase";
import { MyContext } from './ContextProvider'
import React, { useState, useEffect, useContext } from 'react'


export default function SignIn() {
    const { profilePhotoURL, setprofilePhotoURL } = useContext(MyContext);

    const HandleSubmit = (e) => {
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
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [profilePhoto, setprofilePhoto] = useState('');
    const HandlesignInWithPopup = () => {
        signInWithPopup(auth, provider).then((data) => {
            const userCarton = {
                uName: data.user.displayName,
                uEmail: data.user.email,
                pPhotoUrl: data.user.photoURL,
            }
            setUserName(userCarton.uName);
            setEmail(userCarton.uEmail);
            setprofilePhoto(userCarton.pPhotoUrl);
            console.log(userCarton);
            console.log(userName, email, profilePhoto);
            localStorage.setItem("UserData", JSON.stringify(userCarton));
            console.log();
            // localStorage.setItem("userName", userName)
            // localStorage.setItem("email", email)
            // localStorage.setItem("profilePhoto", profilePhoto)
        })
    }
    useEffect(() => {
        const UserData = localStorage.getItem('UserData')
        const UserDataParsed = JSON.parse(UserData);
        
        setUserName(UserDataParsed.uName)
        setEmail(UserDataParsed.uEmail)
        setprofilePhoto(UserDataParsed.pPhotoUrl)
        // setPfp(profilePhoto)
        // console.log(UserData.uName);
        // console.log(userName , email , profilePhoto);
        // console.log(profilePhotoURL);
        setprofilePhotoURL(profilePhoto)
        console.log(profilePhotoURL);
    })
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
                                <div className='container'>
                                    <button type="submit" className="btn btn-primary w-100 mt-4">Sign In</button>
                                    <button onClick={HandlesignInWithPopup} className="w-100 mt-3 mb-2 MySignIN ">
                                        <span className='p-2 MyLogo'><img src="https://ssniper.sirv.com/Images/google.svg" alt="" />
                                        </span>
                                        Sign In with Google</button>
                                    <p className='text-center'>Already have an account? <a href="">Log in</a></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
