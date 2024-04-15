import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from './ContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'
import { db } from '../Firebase/firebase';
import { Timestamp, addDoc, arrayUnion, collection, doc, getDocs, query, runTransaction, where } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import '../MyCss/userHome.css'
import { toast } from 'react-toastify';
import axios from 'axios'

export default function VetsInYourArea() {
    const { userObj, setUserObj } = useContext(MyContext);
    const { UserDBData, setUserDBData } = useContext(MyContext);
    const [doctorData, setDoctorData] = useState(false)

    let navigate = useNavigate()
    const goToProfile = (Docid) => {
      navigate('/profile', { state: { id: Docid } });
    }
    const fetchDoctorData = async () => {
        try {
            // const response = collection(db, 'Users');
            // const q = query(response, where("isDoctor", "==", true));
            // // const q = query(response, where("email", "!=", null));
            // const data = await getDocs(q);
            // const DoctorDataArray = data.docs.map(doc => {
            //     const DoctorData = doc.data();
            //     DoctorData.DoctorID = doc.id;
            //     return DoctorData
            // });
            try {
                var res = await axios.get(`http://localhost:3000/doctors`)
                console.log(res);
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
              
            setDoctorData(res.data);
            sessionStorage.setItem('storedDoctorsData', JSON.stringify(res.data));
            // console.log(DoctorDataArray);
        } catch (error) {
            console.error("Error fetching Doctor data:", error);
        }
    };

    useEffect(() => {
        console.log("home component updated");
    
    
        const storedDoctorsData = sessionStorage.getItem('storedDoctorsData');
        if (storedDoctorsData) {
          console.log("no Fetch");
          // If user data is already stored, set it in the state
          setDoctorData(JSON.parse(storedDoctorsData));
        } else {
          console.log("Fetch");
    
          fetchDoctorData();
        }
      }, []);
    
    const chatFunc = (userData) => {
        if (!userObj) {
            toast.error(`You need to Login First!`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return
        }
        let RID
        if (userData?.isDoctor) {
            RID = userObj?.uid + " " + userData?.uid;
        } else {
            RID = userData?.uid + " " + userObj?.uid;
        }
        console.log(RID);
        goToRoom(RID, userData);
    };
    const goToRoom = async (RID, userData) => {

        const userChatsRef = collection(db, "UserChats");
        // updateDoc(userChatDoc, {
        //   ChatRooms: arrayUnion({
        //     ChatRoomID: RID,
        //     OtherPersonName: userData?.userName,
        //     otherPersonPic: userData?.userPFP
        //   })
        // })
        try {
            await runTransaction(db, async (transaction) => {
                const userChatDoc = await doc(userChatsRef, userObj.uid);
                const OtherUserChatDoc = await doc(userChatsRef, userData?.uid);
                const userChatDocSnap = await transaction.get(userChatDoc);
                const OtherUserChatDocSnap = await transaction.get(OtherUserChatDoc);

                if (userChatDocSnap.exists()) {
                    transaction.update(userChatDoc, {
                        ChatRooms: arrayUnion({
                            ChatRoomID: RID,
                            OtherPersonName: userData?.userName,
                            otherPersonPic: userData?.userPFP
                        })
                    });
                } else {
                    transaction.set(userChatDoc, {
                        ChatRooms: [{
                            ChatRoomID: RID,
                            OtherPersonName: userData?.userName,
                            otherPersonPic: userData?.userPFP
                        }]
                    });
                }

                if (OtherUserChatDocSnap.exists()) {
                    transaction.update(OtherUserChatDoc, {
                        ChatRooms: arrayUnion({
                            ChatRoomID: RID,
                            OtherPersonName: UserDBData.userName,
                            otherPersonPic: UserDBData.userPFP
                        })
                    });
                } else {
                    transaction.set(OtherUserChatDoc, {
                        ChatRooms: [{
                            ChatRoomID: RID,
                            OtherPersonName: UserDBData.userName,
                            otherPersonPic: UserDBData.userPFP
                        }]
                    });
                }
            });
        } catch (error) {
            console.error("Error updating document: ", error);
        }
        navigate("/room", { state: { RID: RID, reciverPFP: userData?.userPFP, reciverName: userData?.userName } });
    };
    return (
        <div className='container mt-3'>
            {doctorData ? (
                <div className='w-100 '>
                    <div className='pp4' >
                        Veterinarian in Your Area:
                    </div>
                    <div className='row gx-3 gy-1'>

                        {
                            doctorData.map((doctors, index) => (
                                <div key={doctors._id} className='col-lg-6 d-flex justify-content-center '>
                                    <div className="bg-light myCard p-3 rounded-3 w-100 row bordcard " >
                                        <div className='col-4 col-lg-3 col-md-3 '>
                                            <img className="circle-round-profile" src={doctors.userPFP} alt="Card image" />
                                        </div>
                                        <div className='sm-left-padd col-8'>
                                            <div className="card-body">
                                                <h4 className="card-title">Dr.{doctors.name}</h4>
                                                <div className='starRatepp8'>
                                                    <p>
                                                        <FontAwesomeIcon className='str' icon={fa.faStar} style={{ color: 'gold' }} />
                                                        <FontAwesomeIcon className='str' icon={fa.faStar} style={{ color: 'gold' }} />
                                                        <FontAwesomeIcon className='str' icon={fa.faStar} style={{ color: 'gold' }} />
                                                        <FontAwesomeIcon className='str' icon={fa.faStar} style={{ color: 'black' }} />
                                                    </p>
                                                    <p className='pp9'>4.5</p>
                                                </div>
                                                <div className='starRatepp7 justify-content-between align-items-center'>
                                                    <button onClick={() => goToProfile(doctors._id)} className="btn btn-primary pp5">Details</button>
                                                    <div className='' onClick={() => chatFunc(doctors)}>
                                                        <FontAwesomeIcon className='mess' icon={fa.faCommentDots} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            ))
                        }
                    </div>
                </div>
            ) : (<></>)}
        </div>
    )
}
