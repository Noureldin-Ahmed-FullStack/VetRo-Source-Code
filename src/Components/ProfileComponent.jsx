import React, { useContext, useEffect } from 'react'
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const documentRef = doc(db, 'Users', userObj.uid);
                const docSnapshot = await getDoc(documentRef);
                console.log(docSnapshot.data());
                setUserDBData(docSnapshot.data());
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [userObj.uid]);


    return (
        <div className='container'>
            <div className="row">
                {UserDBData ? (
                    UserDBData.isDoctor ? (
                        <DoctorProfile />
                    ) : (
                        <UserProfile />
                    )
                ) : (
                    <Loading />
                )}

            </div>
        </div>

    )
}
