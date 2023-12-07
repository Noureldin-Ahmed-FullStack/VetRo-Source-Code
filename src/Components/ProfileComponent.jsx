import React, { useContext, useEffect, useState } from 'react'
import { UseFirebaseAuth } from './UseFirebaseAuth'
import { Link } from 'react-router-dom'

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
            const userData = docSnapshot.data();
            console.log(userData);
            setUserDBData(userData);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchDataPeriodically = () => {
            fetchData(userObj.uid);
            setTimeout(fetchDataPeriodically, 5000); // Fetch data every 5 seconds (adjust the interval as needed)
        };

        fetchDataPeriodically();

        return () => {
            clearTimeout(fetchDataPeriodically);
        };
    }, [userObj.uid]);

    if (loading) {
        return <Loading />; // Render loading state while data is being fetched
    }

    return (
        <div style={{ border: "#fff" }} className="card w-100 p-3 my-5">
        <div className='container'>
            <div className="row">
                {UserDBData ? (
                    UserDBData.isDoctor ? (
                        <DoctorProfile />
                    ) : (
                        <UserProfile />
                    )
                ) : (
                    <>                    
                        <Loading />
                    </>
                )}

            </div>
        </div>
        </div>

    )
}
