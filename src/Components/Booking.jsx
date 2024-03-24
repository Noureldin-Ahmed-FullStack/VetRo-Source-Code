import React, { useContext, useEffect, useState } from 'react'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../Firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'
/** */
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { MyContext } from './ContextProvider';


export default function Booking() {
    const { userObj, setUserObj } = useContext(MyContext);
    const getTimeSince = (time) => {
        // Create a new Date object with the desired date and time
        var customDate = new Date(time);

        // Get the current date
        var currentDate = new Date();

        // Get the time in milliseconds since January 1, 1970 for both dates
        var customTime = customDate.getTime();
        var currentTime = currentDate.getTime();

        // Calculate the time difference in milliseconds
        var timeDifference = currentTime - customTime;

        const seconds = Math.floor((timeDifference) / 1000);
        let interval = Math.floor(seconds / 31536000);

        if (interval >= 1) {
            return interval + " year" + (interval === 1 ? "" : "s") + " ago";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
            return interval + " month" + (interval === 1 ? "" : "s") + " ago";
        }
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
            return interval + " day" + (interval === 1 ? "" : "s") + " ago";
        }
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
            return interval + " hour" + (interval === 1 ? "" : "s") + " ago";
        }
        interval = Math.floor(seconds / 60);
        if (interval >= 1) {
            return interval + " minute" + (interval === 1 ? "" : "s") + " ago";
        }
        return Math.floor(seconds) + " second" + (seconds === 1 ? "" : "s") + " ago";


    }
    const BookingRef = collection(db, "Booking")
    const [bookings, setBooking] = useState([])
    const fetchCollection = async () => {
        try {
            const querywithTime = query(BookingRef, orderBy('PostDate', 'desc'), where('Doctor', "==", userObj.uid))
            const querySnapshot = await getDocs(querywithTime);
            const fetchedItems = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            sessionStorage.setItem('UserBookingData', JSON.stringify(fetchedItems));
            setBooking(fetchedItems);
            console.log(fetchedItems);
        } catch (error) {
            console.error('Error fetching collection:', error);
        }
    }

    useEffect(() => {
        const storedUserBookingData = sessionStorage.getItem('UserBookingData');
        if (storedUserBookingData) {
            console.log("no Fetch");
            // If user data is already stored, set it in the state
            setBooking(JSON.parse(storedUserBookingData));
        } else {
            console.log("Fetch");

            fetchCollection();
        }
    }, [])
    const GetTime = (timestamp) => {
        const date = new Date(timestamp);

        const formattedDate = date.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' });
        const formattedTime = date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
        return `${formattedDate} ${formattedTime}`
    }
    const responsive = {
        0: {
            items: 1,
        },
        600: {
            items: 2, // Adjust this value based on your preference for tablet screens
        },
        1000: {
            items: 2, // Adjust this value based on your preference for larger screens
        },
    };

    return (
        <>
            <div className='pp4'>incomming Pet Owner Reservations</div>
            <div className='text-black justify-content-center align-items-center MainSection text-center container px-5 mt-5'>

                <div className='container'>
                    <OwlCarousel className='owl-theme' responsive={responsive} nav>
                        {bookings?.map((Appointment, index) => (
                            <div className='container' key={index}>
                                <div className="card cardsize">
                                    <div className="card-body">
                                        <div className='starRatepp7 align-items-center'>
                                            <img src={Appointment.UserData?.userPFP} alt="nnn" className="circle-round-profile" />
                                            <div className="ms-2 w-100">
                                                <div className="h4 m-0" style={{ color: '#39434F' }}>{Appointment.UserData?.userName}</div>
                                                <div className="m-0 COLorli">{Appointment.UserData?.email}</div>
                                                <div className="m-0 COLorli">{Appointment?.phoneNumber}</div>
                                            </div>
                                            <div className=''><FontAwesomeIcon className='mess' icon={fa.faCommentDots} /></div>
                                        </div>
                                        <hr />
                                        <div className='starRated COLorP'>
                                            <p>{Appointment?.Issue}</p>
                                            <p>{GetTime(Appointment?.Appointment)}</p>
                                        </div>
                                        <hr />
                                        <div className='w-100 d-flex justify-content-evenly mt-2'>
                                            <button className=" buttonDetails1">
                                                <FontAwesomeIcon className='pe-2' icon={fa.faCheck} style={{ fontSize: '20px' }} />
                                                Accept
                                            </button>
                                            <button className=" d-flex align-items-center buttonDetails2">
                                                <FontAwesomeIcon className='pe-2' icon={fa.faXmark} style={{ fontSize: '20px' }} />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* <div className='container'>
                            <div className="card cardsize">
                                <div className="card-body">
                                    <div className='starRatepp7 align-items-center'>
                                        <img src={require("../images/port2.png")} alt="nnn" className="circle-round-profile" />
                                        <div className="ms-2 w-100">
                                            <div className="h4 m-0" style={{ color: '#39434F' }}>sara</div>
                                            <div className="m-0 COLorli">sara@gmail</div>
                                            <div className="m-0 COLorli">0123456789</div>
                                        </div>
                                        <div className=''><FontAwesomeIcon className='mess' icon={fa.faCommentDots} /></div>
                                    </div>
                                    <hr />
                                    <div className='starRated COLorP'>
                                        <p>Route check-up</p>
                                        <p> Monday-2/5/2024</p>
                                    </div>
                                    <hr />
                                    <div className='w-100 d-flex justify-content-evenly mt-2'>
                                        <button className=" buttonDetails1">
                                            <FontAwesomeIcon className='pe-2' icon={fa.faCheck} style={{ fontSize: '20px' }} />
                                            Accept
                                        </button>
                                        <button className=" d-flex align-items-center buttonDetails2">
                                            <FontAwesomeIcon className='pe-2' icon={fa.faXmark} style={{ fontSize: '20px' }} />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                    </OwlCarousel>
                </div>
            </div>
        </>
    )
}
