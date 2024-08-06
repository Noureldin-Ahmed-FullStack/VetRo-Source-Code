import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'
import '../MyCss/SignIn.css'
import VetImg from '../images/vet.jpg'
import UserImg from '../images/User.jpg'
import logo from '../images/Blue Logo.svg'
import { MyContext } from './ContextProvider'
import { collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../Firebase/firebase'
import axios from 'axios'

export default function UserChoicePage() {
    const { userObj, setUserObj } = useContext(MyContext);
    const usersRef = collection(db, "Users");

    const token = localStorage.getItem('token');

    const headers = {
        'token': token,
    };

    // const SetDecided = async (Choice) => {
    //     const userDoc = doc(usersRef, userObj.uid);
    //     if (Choice) {
    //         await updateDoc(userDoc, {
    //             isDoctor: true,
    //             decided: true
    //         })
    //         setTimeout(() => {
    //             window.location.reload();
    //         }, 1000); // Delay of 5 seconds (1000 milliseconds)

    //     }else{            
    //         await updateDoc(userDoc, {
    //             isDoctor: false,
    //             decided: true
    //         })
    //         setTimeout(() => {
    //             window.location.reload();
    //         }, 1000); // Delay of 5 seconds (1000 milliseconds)
    //     }
    // }
    const SetDecided = async (Choice) => {
        const body ={
            isDoctor: Choice
        }
            await axios.post('https://vet-ro-server.vercel.app/userRole', body, { headers: headers })
            // setTimeout(() => {
                window.location.reload();
            // }, 1000); 
    }

    return (

        <div className="d-flex align-items-center justify-content-center p-4 container flex-column">
            <div className='d-flex justify-content-center'>

                <img className="w-100" alt="" src={logo} />
            </div>
            <div className="" >
                <div>
                    <h1 className="T1nd">  Are you a veterinarian or a pet owner?</h1>
                    <h1 className='T2nd'>Select your user type to continue</h1>
                </div>

                <div className="total justify-content-center" >
                    <div onClick={() => SetDecided(false)} className="Selections Selections1 w-100 pointer" >
                        <img className='circular-image ' src={UserImg} alt="" />
                        <h3 className="Selections-te">I’m a Pet owner</h3>
                    </div>

                    <div onClick={() => SetDecided(true)} className="Selections Selections2 w-100 pointer" >
                        <img className='circular-image' src={VetImg} alt="" />
                        <h3 className="Selections-te">I’m a Veterinarian</h3>

                    </div>
                </div>

            </div>
        </div>
    )
}
