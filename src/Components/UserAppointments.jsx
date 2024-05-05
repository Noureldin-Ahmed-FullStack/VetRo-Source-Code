import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { MyContext } from './ContextProvider';
import Booking from './Booking';

export default function UserAppointments() {
    // const { userObj, setUserObj } = useContext(MyContext);

    // let userID = userObj.uid
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const res = await axios.get(`http://localhost:3000/userAppointment/${userID}`);
    //             console.log(res.data); // Assuming you want to access the response data
    //         } catch (err) {
    //             console.error(err);
    //             // Handle error here (e.g., show a toast notification)
    //         }

    //     }
    //     fetchData();
    // }, [userID]);
    return (
        <div>
            <Booking />
        </div>
    )
}
