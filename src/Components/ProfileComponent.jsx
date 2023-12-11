import React, { useContext, useEffect, useState } from 'react'
import { UseFirebaseAuth } from './UseFirebaseAuth'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { app, auth, db } from '../Firebase/firebase';
import { MyContext } from './ContextProvider';
import { doc, getDoc } from 'firebase/firestore';
import Loading from './Loading';
import UserProfile from './UserProfile';
import DoctorProfile from './DoctorProfile';

export default function ProfileComponent() {
    // const userObj = props.userData;
    // let [userObj, setuserObj] = useState();
    const { signOutUser } = UseFirebaseAuth();
    const { userObj, setUserObj } = useContext(MyContext);
    const { UserDBData, setUserDBData } = useContext(MyContext);
    const [loading, setLoading] = useState(true);



    const fetchData = async (userId) => {
        try {
            const documentRef = doc(db, 'Users', userId);
            const docSnapshot = await getDoc(documentRef);
            if (!docSnapshot.exists()) {
                // Snapshot is empty, wait five seconds and log
                toast.warn("you dont have an account. Signing you in!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                  setTimeout(() => {
                    window.location.reload();
                  }, 5000); // Delay of 5 seconds (5000 milliseconds)
            } else {
                console.log('Snapshot is not empty');
                // Handle the case when the snapshot is not empty
                const userData = docSnapshot.data();
                console.log(userData);
                console.log("fetch update");
                setUserDBData(userData);
                setLoading(false);
            }

        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        console.log("Profile component Updated");
        console.log(userObj.uid);

        fetchData(userObj.uid)
        console.log(UserDBData);
        // const fetchDataAfterDelay = () => {
        //     console.log("fetcher");
        //     setTimeout(() => {
        //         if (UserDBData === null) {         
        //             console.log("timer");           
        //             fetchData(userObj.uid);
        //         }
        //     }, 5000);
        // };

        // fetchDataAfterDelay();

        // return () => {
        //     // Clear any pending timeouts when the component unmounts (optional)
        //     clearTimeout(fetchDataAfterDelay);
        // };
    }, []);

    if (loading) {
        return <Loading />; // Render loading state while data is being fetched
    }
    if (UserDBData) {
        if (UserDBData.isDoctor) {
            return (
                <div style={{ border: "#fff" }} className="card w-100 p-3 my-5">
                    <div className='container'>
                        <div className="row">
                            <DoctorProfile />
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div style={{ border: "#fff" }} className="card w-100 p-3 my-5">
                    <div className='container'>
                        <div className="row">
                            <UserProfile />
                        </div>
                    </div>
                </div>
            )

        }
    } else {
        return (
            <div style={{ border: "#fff" }} className="card w-100 p-3 my-5">
                <div className='container'>
                    <div className="row">
                        <Loading />
                        {/* <button onClick={() => console.log(UserDBData)}>click for update</button> */}
                    </div>
                </div>
            </div>

        )
    }
    // return (
    //     <div style={{ border: "#fff" }} className="card w-100 p-3 my-5">
    //         <div className='container'>
    //             <div className="row">
    //                 {UserDBData ? (
    //                     UserDBData.isDoctor ? (
    //                         <DoctorProfile />
    //                     ) : (
    //                         <UserProfile />
    //                     )
    //                 ) : (
    //                     <>
    //                         <Loading />
    //                     </>
    //                 )}

    //             </div>
    //         </div>
    //     </div>

    // )
}
