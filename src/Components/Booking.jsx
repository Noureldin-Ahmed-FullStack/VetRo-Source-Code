import React, { useContext, useEffect, useState } from 'react'
import { arrayUnion, collection, doc, getDocs, orderBy, query, runTransaction, updateDoc, where } from 'firebase/firestore';
import { db } from '../Firebase/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
/** */
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { MyContext } from './ContextProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Tooltip } from 'react-tooltip'

export default function Booking() {
    const { userObj, setUserObj } = useContext(MyContext);
    const { UserDBData, setUserDBData } = useContext(MyContext);
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
    var token = localStorage.getItem('token');
    const headers = {
        'token': token,
    };
    let navigate = useNavigate()
    const goToProfile = (userID) => {
        navigate('/profile', { state: { id: userID } });
    }
    const fetchCollection = async () => {
        // try {
        //     const querywithTime = query(BookingRef, orderBy('PostDate', 'desc'), where('Doctor', "==", userObj._id))
        //     const querySnapshot = await getDocs(querywithTime);
        //     const fetchedItems = querySnapshot.docs.map((doc) => ({
        //         id: doc.id,
        //         ...doc.data(),
        //     }));
        //     sessionStorage.setItem('UserBookingData', JSON.stringify(fetchedItems));
        //     setBooking(fetchedItems);
        //     console.log(fetchedItems);
        // } catch (error) {
        //     console.error('Error fetching collection:', error);
        // }

        try {
            var res = await axios.get(`https://vetro-server.onrender.com/doctorAppointment`, { headers: headers })
        } catch (err) {
            toast.error(err.response.data.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return; // Throw the error to stop further execution

        }
        if (res) {
            for (let i = res.data.length - 1; i >= 0; i--) {
                if (res.data[i].createdBy === null || res.data[i].Status == 'rejected') {
                    res.data.splice(i, 1); // Remove item at index i
                }
            }
            console.log(res.data);
        }
        sessionStorage.setItem('UserBookingData', JSON.stringify(res.data));
        setBooking(res.data);

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
        // const temporaryBooking = bookings
        // temporaryBooking[index].Status = condition
        // const documentRef = doc(db, 'Booking', id);
        // try {
        //     await updateDoc(documentRef, {
        //         Status: condition
        //     })

        //     sessionStorage.setItem('UserBookingData', JSON.stringify(temporaryBooking));

        //     const storedUserBookingData = sessionStorage.getItem('UserBookingData');
        //     setBooking(JSON.parse(storedUserBookingData));
        // } catch (error) {
        //     console.error(error)
        // }
        const body= {
            Status: condition
        }
        try {
            var res = await axios.put(`https://vetro-server.onrender.com/appointment/${id}`, body)
        } catch (err) {
            console.log(err.response);
            toast.error(err.response.data.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return; // Throw the error to stop further execution

        }
        if (res) {
            console.log(res);
        }
    }

    const chatFunc = (createdBy) => {
        let RID
        if (createdBy?.isDoctor) {
            RID = userObj._id + " " + createdBy?._id;
        } else {
            RID = createdBy?._id + " " + userObj._id;
        }
        console.log(RID);
        goToRoom(RID, createdBy);
    };
    const goToRoom = async (RID, createdBy) => {

        // const userChatsRef = collection(db, "UserChats");

        // try {
        //   await runTransaction(db, async (transaction) => {
        //     const userChatDoc = await doc(userChatsRef, userObj._id);
        //     const OtherUserChatDoc = await doc(userChatsRef, userData?._id);
        //     const userChatDocSnap = await transaction.get(userChatDoc);
        //     const OtherUserChatDocSnap = await transaction.get(OtherUserChatDoc);

        //     if (userChatDocSnap.exists()) {
        //       transaction.update(userChatDoc, {
        //         ChatRooms: arrayUnion({
        //           ChatRoomID: RID,
        //           OtherPersonName: userData?.userName,
        //           otherPersonPic: userData?.userPFP
        //         })
        //       });
        //     } else {
        //       transaction.set(userChatDoc, {
        //         ChatRooms: [{
        //           ChatRoomID: RID,
        //           OtherPersonName: userData?.userName,
        //           otherPersonPic: userData?.userPFP
        //         }]
        //       });
        //     }

        //     if (OtherUserChatDocSnap.exists()) {
        //       transaction.update(OtherUserChatDoc, {
        //         ChatRooms: arrayUnion({
        //           ChatRoomID: RID,
        //           OtherPersonName: UserDBData.userName,
        //           otherPersonPic: UserDBData.userPFP
        //         })
        //       });
        //     } else {
        //       transaction.set(OtherUserChatDoc, {
        //         ChatRooms: [{
        //           ChatRoomID: RID,
        //           OtherPersonName: UserDBData.userName,
        //           otherPersonPic: UserDBData.userPFP
        //         }]
        //       });
        //     }
        //   });
        // } catch (error) {
        //   console.error("Error updating document: ", error);
        // }
        // navigate("/room", { state: { RID: RID, reciverPFP: userData?.userPFP, reciverName: userData?.userName } });
    };

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
                        <div className='col-md-6 mb-2 d-flex justify-content-center' key={Appointment._id}>
                            <div className='row justify-content-center w-100'>
                                <div className="card cardsize ">
                                    <div className="card-body">
                                        <div className='row align-items-center d-flex'>
                                            <div className=' col-md-3 col-sm-3 col-12'>
                                                <img onClick={() => goToProfile(Appointment.createdBy?._id)} src={Appointment.createdBy?.userPFP} alt="nnn" className=" ProfImg" style={{ maxWidth: '100%', height: 'auto', maxHeight: '120px' }} />
                                            </div>
                                            <div className=' col-md-6 col-sm-6 col-10'>
                                                <div className='row'>
                                                    <div className="mb-1 text-start  ProfTitle" onClick={() => goToProfile(Appointment.createdBy?._id)}>{Appointment.createdBy?.name}</div>
                                                </div>
                                                <div className='row '>
                                                    <div className="mb-1 COLorli text-start pointer" onClick={() => goToProfile(Appointment.createdBy?._id)}>{Appointment.createdBy?.email}</div>
                                                </div>
                                                <div className='row'>
                                                    <div className="mb-1 COLorli text-start">{Appointment?.phoneNumber}</div>
                                                </div>
                                            </div>
                                            <div onClick={() => chatFunc(Appointment?.createdBy)} className=' col-md-3 col-sm-3 col-2'><FontAwesomeIcon className='mess' icon={fa.faCommentDots} /></div>
                                        </div>
                                        <hr />
                                        <div className='row'>
                                            <div data-tooltip-id="my-tooltip" data-tooltip-variant="error" className="col-4">
                                                <img src={Appointment?.pet.image} className='w-100' alt="" />
                                                <Tooltip id="my-tooltip" >
                                                    <div className='d-flex justify-content-between tooltip_width'>
                                                        <span className=''>pet name:</span>
                                                        <span>{Appointment?.pet.petName}</span>
                                                    </div>
                                                    <div className='d-flex justify-content-between tooltip_width'>
                                                        <span className=''>age:</span>
                                                        <span>{Appointment?.pet.age}</span>
                                                    </div>
                                                    <div className='d-flex justify-content-between tooltip_width'>
                                                        <span className=''>breed:</span>
                                                        <span>{Appointment?.pet.type + " || " + Appointment?.pet.breed + " || " + Appointment?.pet.gender}</span>
                                                    </div>
                                                </Tooltip>
                                            </div>
                                            <div className="col-8">
                                                <div className="w-100">
                                                    <div className='d-flex justify-content-between COLorP'>
                                                        <p>Pet name: </p>
                                                        <h6>{Appointment?.pet.petName}</h6>
                                                    </div>
                                                    <div className='d-flex justify-content-between COLorP'>
                                                        <p>breed: </p>
                                                        <h6>{Appointment?.pet.breed}</h6>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-between COLorP'>
                                            <p>{Appointment?.issue}</p>
                                            <p >
                                                <FontAwesomeIcon className='pe-2 fs-5 fs-sm-5' icon={fa.faCalendarAlt} />{GetTime(Appointment?.Appointment).Date} <FontAwesomeIcon className='pe-1 ps-2 fs-5 ' icon={fa.faClock} />{GetTime(Appointment?.Appointment).Time}</p>
                                        </div>
                                        <hr />
                                        {Appointment?.Status == 'rejected' ? (
                                            <div className='d-flex flex-column bg-danger-subtle justify-content-center align-items-center p-2 rounded-4 text-danger-emphasis'>
                                                <h6>Appointment Rejected</h6>
                                            </div>
                                        ) : (
                                            Appointment?.Status == "accepted" ? (
                                                <div className='d-flex flex-column bg-success-subtle justify-content-center align-items-center p-2 rounded-4 text-success-emphasis'>
                                                    <h6>Appointment accepted</h6>
                                                    <p>would you like to <span className='cancelSpan' onClick={() => updateBooking('rejected', Appointment._id, index)}>cancel</span>?</p>
                                                </div>

                                            ) : (

                                                <div className='justify-content-around row mt-2'>
                                                    <button className='btn btn-outline-success col-5 py-3 px-1' onClick={() => updateBooking('accepted', Appointment._id, index)}>
                                                        <FontAwesomeIcon className='pe-2 fs-5 fs-sm-5' icon={fa.faCheck} />
                                                        <span>Accept Appointment</span>
                                                    </button>
                                                    <button className='btn btn-outline-danger col-5 py-3' onClick={() => updateBooking('rejected', Appointment._id, index)}>
                                                        <FontAwesomeIcon className='pe-2 fs-5 fs-sm-5' icon={fa.faXmark} />
                                                        <span>Delete</span>
                                                    </button>
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
