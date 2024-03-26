import React, { useContext, useEffect, useState } from 'react'
import { collection, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../Firebase/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'
/** */
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { MyContext } from './ContextProvider';
import { useNavigate } from 'react-router-dom';


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
    let navigate = useNavigate()
    const goToProfile = (Docid) => {
        navigate('/profile', { state: { id: Docid } });
    }
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
    function convertTimeToAMPM(timeString) {
        // Split the time string into hours and minutes
        var splitTime = timeString.split(':');
        var hours = parseInt(splitTime[0]);
        var minutes = parseInt(splitTime[1]);
    
        // Determine AM or PM based on hours
        var period = hours >= 12 ? 'PM' : 'AM';
    
        // Convert hours from 24-hour format to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // Handle midnight (0 hours) as 12 AM
    
        // Add leading zero to minutes if necessary
        minutes = minutes < 10 ? '0' + minutes : minutes;
    
        // Return the formatted time
        return hours + ':' + minutes + ' ' + period;
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
    const updateBooking = async (condition, id, index) => {
        const temporaryBooking = bookings
        temporaryBooking[index].Status = condition
        const documentRef = doc(db, 'Booking', id);
        try {
            await updateDoc(documentRef, {
                Status: condition
            })

            sessionStorage.setItem('UserBookingData', JSON.stringify(temporaryBooking));

            const storedUserBookingData = sessionStorage.getItem('UserBookingData');
            setBooking(JSON.parse(storedUserBookingData));
        } catch (error) {
            console.error(error)
        }
    }
    const GetTime = (timestamp) => {
        const date = new Date(timestamp);

        const formattedDate = date.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' });
        const formattedTime = date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
        const time = convertTimeToAMPM(formattedTime)
        const Format = {
            Date: formattedDate,
            Time: time
        }
        return Format
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
            <div className='pp4'>Incoming Pet Owner Reservations</div>
            <div className='text-black justify-content-center align-items-center MainSection text-center container mt-5'>

                <div className='row'>
                    {/* <OwlCarousel className='owl-theme' responsive={responsive} nav> */}
                    {bookings?.map((Appointment, index) => (
                        <div className='col-md-6 mb-2 d-flex justify-content-center' key={Appointment.id}>
                            <div className='row justify-content-center w-100'>
                                <div className="card cardsize ">
                                    <div className="card-body">
                                        <div className=' d-flex flex-column flex-sm-row'>
                                            <div>
                                                <img onClick={() => goToProfile(Appointment.UserData?.uid)} src={Appointment.UserData?.userPFP} alt="nnn" className="mb-2 mb-sm-0 ProfImg" style={{ maxWidth: '100%', height: 'auto', maxHeight: '120px' }} />
                                            </div>
                                            <div>
                                                <div className='row'>
                                                    <div className="h4 mb-1 text-start ProfTitle" onClick={() => goToProfile(Appointment.UserData?.uid)}>{Appointment.UserData?.userName}</div>
                                                </div>
                                                <div className='row '>
                                                    <div className="mb-1 COLorli text-start ProfTitle" onClick={() => goToProfile(Appointment.UserData?.uid)}>{Appointment.UserData?.email}</div>
                                                </div>
                                                <div className='row'>
                                                    <div className="mb-1 COLorli text-start">{Appointment?.phoneNumber}</div>
                                                </div>
                                            </div>
                                            <div className='ms-auto mt-2 mt-sm-0'><FontAwesomeIcon className='mess' icon={fa.faCommentDots} /></div>
                                        </div>
                                        <hr />
                                        <div className='d-flex justify-content-between COLorP'>
                                            <p>Pet name: </p>
                                            <h6>{Appointment?.PetName}</h6>
                                        </div>
                                        <div className='d-flex justify-content-between COLorP'>
                                            <p>breed: </p>
                                            <h6>{Appointment?.PetBreed}</h6>
                                        </div>
                                        <div className='d-flex justify-content-between COLorP'>
                                            <p>{Appointment?.Issue}</p>
                                            <p >
                                                <FontAwesomeIcon className='pe-2 fs-5 fs-sm-5' icon={fa.faCalendarAlt} />{GetTime(Appointment?.Appointment).Date} <FontAwesomeIcon className='pe-1 ps-2 fs-5 ' icon={fa.faClock} />{GetTime(Appointment?.Appointment).Time}</p>
                                        </div>
                                        <hr />
                                        {Appointment?.Status == 'no response yet' ? (
                                            <div className='justify-content-around row mt-2'>
                                                <button className='btn btn-outline-success col-5 py-3 px-1' onClick={() => updateBooking(true, Appointment.id, index)}>
                                                    <FontAwesomeIcon className='pe-2 fs-5 fs-sm-5' icon={fa.faCheck} />
                                                    <span>Accept Appointment</span>
                                                </button>
                                                <button className='btn btn-outline-danger col-5 py-3' onClick={() => updateBooking(false, Appointment.id, index)}>
                                                    <FontAwesomeIcon className='pe-2 fs-5 fs-sm-5' icon={fa.faXmark} />
                                                    <span>Delete</span>
                                                </button>
                                            </div>
                                        ) : (
                                            Appointment?.Status == true ? (
                                                <div className='d-flex flex-column bg-success-subtle justify-content-center align-items-center p-2 rounded-4 text-success-emphasis'>
                                                    <h6>Appointment accepted</h6>
                                                    <p>would you like to <span className='cancelSpan' onClick={() => updateBooking(false, Appointment.id, index)}>cancel</span>?</p>
                                                </div>

                                            ) : (
                                                <div className='d-flex flex-column bg-danger-subtle justify-content-center align-items-center p-2 rounded-4 text-danger-emphasis'>
                                                    <h6>Appointment Rejected</h6>
                                                </div>
                                            )
                                        )}
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
                                            <FontAwesomeIcon className='pe-2' icon={fa.faCheck}/>
                                            Accept
                                        </button>
                                        <button className=" d-flex align-items-center buttonDetails2">
                                            <FontAwesomeIcon className='pe-2' icon={fa.faXmark}/>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                    {/* </OwlCarousel> */}
                </div>
            </div>
        </>
    )
}
