import { arrayUnion, doc, getDoc, runTransaction, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { db } from "../Firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as faReg from "@fortawesome/free-regular-svg-icons";
import axios from 'axios'

import '../MyCss/MyCustomStylesheet.css'
import '../MyCss/profile.css'
import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import * as fa from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "./ContextProvider";
import { toast } from "react-toastify";

export default function Profile(props) {
  const location = useLocation();
  const [ProfileData, setProfileData] = useState();
  const [PetsData, setPetsData] = useState([]);
  const [clinicData, setClinicData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(0);
  const [selectedSubItem, setSelectedSubItem] = useState(0);
  const { userObj, setUserObj } = useContext(MyContext);
  const { UserDBData, setUserDBData } = useContext(MyContext);

  const BookingRef = collection(db, "Booking")

  const today = new Date();
  const currentDate = today.toISOString().slice(0, 16);

  let token = localStorage.getItem('token');
  const headers = {
    'token': token,
  };
  const handleBooking = async (event) => {
    event.preventDefault()
    if (!userObj) {
      toast.error("Login First!", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return
    }
    let body = {
      createdBy: userObj.uid,
      clinic: clinicData[selectedItem]._id,
      doctor: ProfileData._id,
      phoneNumber: event.target[0].value,
      bookedTime: event.target[1].value,
      issue: event.target[2].value,
      pet: UserDBData.pets[selectedSubItem]._id
    }
    console.log(body);
    try {
      let res = await axios.post('http://localhost:3000/appointment', body, { headers: headers }).catch((err)=> console.log(err))

      if (res) {
        console.log(res);
        toast.success("Appointment Booked successfully!", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      for (let i = 0; i < event.target.length; i++) {
        event.target[i].value = null

      }
    } catch (error) {
      toast.error("Something went wrong!", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    }

  }
  const chatFunc = () => {
    if (!userObj) {
      toast.error("you need to log in to use this feature", {
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
    if (ProfileData?.isDoctor) {
      RID = userObj.uid + " " + ProfileData?.uid;
    } else {
      RID = ProfileData?.uid + " " + userObj.uid;
    }
    console.log(RID);
    goToRoom(RID);
  };
  let navigate = useNavigate();
  const goToRoom = async (RID) => {

    const userChatsRef = collection(db, "UserChats");
    // updateDoc(userChatDoc, {
    //   ChatRooms: arrayUnion({
    //     ChatRoomID: RID,
    //     OtherPersonName: ProfileData?.userName,
    //     otherPersonPic: ProfileData?.userPFP
    //   })
    // })
    try {
      await runTransaction(db, async (transaction) => {
        const userChatDoc = await doc(userChatsRef, userObj.uid);
        const OtherUserChatDoc = await doc(userChatsRef, ProfileData?.uid);
        const userChatDocSnap = await transaction.get(userChatDoc);
        const OtherUserChatDocSnap = await transaction.get(OtherUserChatDoc);

        if (userChatDocSnap.exists()) {
          transaction.update(userChatDoc, {
            ChatRooms: arrayUnion({
              ChatRoomID: RID,
              OtherPersonName: ProfileData?.userName,
              otherPersonPic: ProfileData?.userPFP
            })
          });
        } else {
          transaction.set(userChatDoc, {
            ChatRooms: [{
              ChatRoomID: RID,
              OtherPersonName: ProfileData?.userName,
              otherPersonPic: ProfileData?.userPFP
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
    navigate("/room", { state: { RID: RID, reciverPFP: ProfileData?.userPFP, reciverName: ProfileData?.userName } });
  };

  const fetchProfileData = async () => {
    try {
      // const documentRef = doc(db, "Users", location.state.id);
      // const docSnapshot = await getDoc(documentRef);
      // const userData = docSnapshot.data();
      // console.log(docSnapshot.data());
      try {
        var res = await axios.get(`https://vetro-server.onrender.com/getSingleUser/${location.state.id}`)
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

      setProfileData(res.data.message);
      setPetsData(res.data.message.pets)
      setClinicData(res.data.message.clinics)
      console.log(ProfileData);
    } catch (error) {
      console.error("Error fetching Profile data:", error);
    }
  };
  // const fetchClinicData = async () => {
  //   try {
  //     const response = collection(db, "Clinics");
  //     const q = query(response, where("DoctorId", "==", location.state.id)); // Assuming userId property in Clinics collection
  //     const data = await getDocs(q);
  //     const clinicDataArray = data.docs.map((doc) => {
  //       const clinicData = doc.data();
  //       return {
  //         ...clinicData,
  //         id: doc.id  // Append the document ID to each clinic data object
  //       };
  //     });
  //     setClinicData(clinicDataArray);
  //     console.log(clinicDataArray);
  //   } catch (error) {
  //     console.error("Error fetching clinic data:", error);
  //   }
  // };
  // const fetchPetsData = async () => {
  //   try {
  //     const response = collection(db, "Pets");
  //     const q = query(response, where("userID", "==", location.state.id)); // Assuming userId property in Pets collection
  //     const data = await getDocs(q);
  //     console.log("pet data " + data);
  //     const PetsDataArray = data.docs.map((doc) => {
  //       const petData = doc.data();
  //       petData.PetID = doc.id;
  //       return petData;
  //     });
  //     setPetsData(PetsDataArray);
  //   } catch (error) {
  //     console.error("Error fetching PETS data:", error);
  //   }
  // };

  useEffect(() => {
    console.log("Profile Updated");
    fetchProfileData();
  }, [location.state.id]);
  if (ProfileData?.isDoctor) {
    return (
      <>

        <div>

          <div className="modal" id="myModal" >
            <div className="modal-dialog ">
              <div className="modal-content">
                {/* Modal Header */}
                <div className="modal-header ">
                  <h4 className="modal-title " style={{ color: '#71aef3' }}>Book appointment</h4>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" />
                </div>
                {/* Modal body */}
                <div className="modal-body">
                  <div className='d-flex w-100 justify-content-center'>
                    <label htmlFor="imgUpload">
                    </label>
                    <input accept="image/*" id='imgUpload' className='d-none' type="file" />
                  </div>
                  <form onSubmit={handleBooking}>
                    <div className="" style={{ fontSize: '1.25rem', fontStyle: 'italic', fontFamily: 'arial', color: '#71aef3' }}>
                      <p>This clinic is available from: {clinicData[selectedItem].schedule} , {clinicData[selectedItem].availability}</p>
                      <p style={{ fontSize: '0.9rem' }}>Make sure you pick an appointment date and time that fit this criteria</p>
                      <div className="row ">
                        <h3 className="text-center">Select your pet</h3>
                        <div className="w-100  ">
                          <div className="row">
                            {
                              UserDBData.pets?.map((pets, index) => (
                                <div key={index} className="col-sm-3 col-4 g-3 ">
                                  {
                                    pets.image ? (
                                      <img src={pets.image} onClick={()=> setSelectedSubItem(index)} className={`${selectedSubItem == index? 'petActive':''} secondPetAdd outlineOnHover pointer`}/>
                                    ) : (
                                      <img onClick={()=> setSelectedSubItem(index)} src='https://t4.ftcdn.net/jpg/01/18/91/73/360_F_118917333_uEdOfPd69Hiqi3q69KUWnU6YCpUgG1v1.jpg' className="profile-pic pointer" />
                                    )
                                  }
                                </div>

                              ))
                            }
                            <div className="col-sm-3 col-4 g-3 pointer">
                              <div className="d-flex rounded-circle secondPetAdd myBorder w-100 justify-content-center align-items-center h-100">

                                <FontAwesomeIcon className="big" icon={fa.faPlus} />
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                      <div className="row py-2 align-items-center">
                        <div className="col-sm-4"><label htmlFor="name">Pet Name:</label></div>
                        {/* <div className="col-sm-8"><input className="form-control" placeholder="Max" type="text" /></div> */}
                        <div className="col-sm-8"><h6>{UserDBData.pets[selectedSubItem]?.petName}</h6></div>
                      </div>
                      <div className="row py-2 align-items-center">
                        <div className="col-sm-4"><label htmlFor="Breed">Pet Breed:</label></div>
                        {/* <div className="col-sm-8"><input className="form-control" placeholder="Dog, German Shepard" type="text" /></div> */}
                        <div className="col-sm-8"><h6>{UserDBData.pets[selectedSubItem]?.type} / {UserDBData.pets[selectedSubItem]?.breed}</h6></div>
                      </div>
                      <div className="row py-2 align-items-center">
                        <div className="col-sm-4"><label htmlFor="phone">your phone:</label></div>
                        <div className="col-sm-8"><input className="form-control" placeholder="Phone number" type="tel" /></div>
                        {/* <div className="col-sm-8"><h6>{UserDBData?.phoneNumber}</h6></div> */}
                      </div>
                      <div className="row py-2 align-items-center">
                        <div className="col-sm-4"><label htmlFor="Date">Appointment Date:</label></div>
                        <div className="col-sm-8"><input className="form-control" type="datetime-local" min={currentDate} /></div>
                      </div>
                      <div className="row py-2 align-items-center">
                        <div className="col-sm-4"><label htmlFor="Date">Issue:</label></div>
                        <div className="col-sm-8"><textarea className='form-control' placeholder="Explain what your appointment is for; Ex: Max needs his monthly check up" style={{ resize: 'none' }} rows='2' /></div>
                      </div>
                      <div className='d-flex justify-content-center'>
                        <button type='submit' className="btn btn-primary w-50 " data-bs-dismiss="modal">submit</button>
                      </div>
                    </div>
                  </form>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="card w-100 p-3 mt-2 myBottomMargin">
          <div className="container">
            <div className="row">
              <div className="position-relative">
                <div className="display row">
                  <div className="card text-center align-items-center w-100 bg-white py-4 rounded shadow">
                    <div className="row">
                      <div className="">
                        <img
                          src={ProfileData?.userPFP}
                          className="avatar circle-round"
                        />
                        <h4>Dr.{ProfileData?.name}</h4>
                        <div className="about-info d-flex justify-content-center">
                          {/* <div className="py-1 " ><a className='mail' href={`mailto: ${userObj.email}`}>{userObj.email}</a></div> */}
                          <div className="text-warning pe-2">
                            <FontAwesomeIcon className="" icon={faReg.faStar} />
                            <FontAwesomeIcon className="" icon={faReg.faStar} />
                            <FontAwesomeIcon className="" icon={faReg.faStar} />
                            <FontAwesomeIcon className="" icon={faReg.faStar} />
                            <FontAwesomeIcon className="" icon={faReg.faStar} />
                          </div>

                          <p className="text-secondary">4.5 (1500 reviews)</p>
                        </div>
                        <div
                          id="about"
                          className="w-100 text-center d-flex justify-content-center"
                        >
                          <p className="w-50 text-secondary">
                            {ProfileData?.About}
                          </p>
                        </div>
                        <div className=" py-1"></div>
                        <hr className="w-100" />
                        <div>
                          <h4>Dr.{ProfileData?.name}'s Clinics</h4>
                        </div>
                      </div>
                      {/**chat  */}
                      <div>
                        <button className="btn btn-dark" onClick={chatFunc}>
                          chat
                        </button>
                      </div>
                      <div className="row justify-content-center">
                        {clinicData.map((clinic, index) => (
                          <div
                            key={index}
                            onClick={() => setSelectedItem(index)}
                            className="col-4 col-sm-4 col-md-4 col-lg-4 "
                          >
                            {clinic.image ? (
                              <img
                                src={clinic.image}
                                className="profile-pic pointer"
                              />
                            ) : (
                              <img
                                src="/clinicPlaceHolder.jpg"
                                className="profile-pic pointer"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="card w-100 bg-white rounded shadow pt-3 mt-3">
                    <div className="text-center">
                      <h3>Clinic Profile</h3>
                    </div>
                    <div className="d-flex justify-content-center">
                      {clinicData.length != 0 ? (
                        <div className="w-100 rounded-4 p-4 my-2 mb-4 row justify-content-center">
                          <div className="col-md-5 align-items-center d-flex">
                            <div className="">
                              {clinicData[selectedItem]?.image ? (
                                <img
                                  src={clinicData[selectedItem]?.image}
                                  className="pet-pic2"
                                />
                              ) : (
                                <img
                                  src="/clinicPlaceHolder.jpg"
                                  className="pet-pic2"
                                />
                              )}
                            </div>
                            <div className=" ps-3">
                              {clinicData ? (
                                <>
                                  <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">Book an appointment</button>
                                  <p className="m-0">
                                    Booking price: {clinicData[selectedItem]?.appointmentPrice} L.E
                                  </p>
                                  <p className="m-0">
                                    Clinic phone number: {clinicData[selectedItem]?.phoneNumber}
                                  </p>
                                </>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                          <div className="col-md-7 ">
                            <div className="w-100 MyLeftBorder">
                              <div className="d-flex align-items-center justify-content-between">
                                <h6 className="mb-0 text-secondary">Clinic Name</h6>
                                <span className="me-5 title">
                                  {clinicData[selectedItem]?.clinicName}
                                </span>
                              </div>
                              <hr className="my-2" />
                              <div className="d-flex align-items-center justify-content-between">
                                <h6 className="mb-0 text-secondary">
                                  Clinic phone number
                                </h6>
                                <span className="me-5 title">
                                  {clinicData[selectedItem]?.phoneNumber}
                                </span>
                              </div>
                              <hr className="my-2" />
                              <div className="d-flex align-items-center justify-content-between">
                                <h6 className="mb-0 text-secondary">
                                  Booking price
                                </h6>
                                <span className="me-5 title">
                                  {clinicData[selectedItem]?.appointmentPrice}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                      ) : (
                        <>This doctor has no clinics</>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className=" rounded-0 w-100 p-3 myBottomMargin">
        <div className="container">
          <div className="row">
            <div className="position-relative">
              <div className="display row">
                <div className="card text-center align-items-center w-100 py-4 rounded shadow">
                  <div className="row">
                    <div className="">
                      <img
                        src={ProfileData?.userPFP}
                        className="avatar circle-round"
                      />
                      <div className="about-info my-2">
                        <h4 >{ProfileData?.name}</h4>
                        <div className="py-1 ">
                          <a
                            className="mail"
                            href={`mailto: ${ProfileData?.email}`}
                          >
                            {ProfileData?.email}
                          </a>
                        </div>
                      </div>
                      <hr className="w-100" />
                      <div>
                        <h4>{ProfileData?.name}'s Pets</h4>
                      </div>
                    </div>
                    {/**chat  */}
                    <div>
                      <button className="btn btn-dark" onClick={chatFunc}>
                        chat
                      </button>
                    </div>
                    <div className="row justify-content-center">
                      {PetsData.map((Pet, index) => (
                        <div
                          key={Pet.PetID}
                          onClick={() => console.log(Pet)}
                          className="col-4 col-sm-4 col-md-4 col-lg-4 "
                        >
                          {Pet.image ? (
                            <img
                              src={Pet.image}
                              className="profile-pic pointer"
                            />
                          ) : (
                            <img
                              src="/PetPlaceHolder.jpg"
                              className="profile-pic pointer"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="card w-100 bg-white rounded shadow pt-3 mt-3">
                    <div className="text-center">
                      <h3>Pet Profile</h3>
                    </div>
                    <div className="d-flex justify-content-center">
                      {PetsData.length != 0 ? (
                        <div className="w-100 rounded-4 p-4 my-2 mb-4 row justify-content-center">
                          <div className="col-md-5 align-items-center d-flex">
                            <div className="">
                              <img
                                src={PetsData[0]?.image}
                                className="pet-pic2"
                              />
                            </div>
                            <div className=" ps-3">
                              <div className=" align-items-center d-flex">
                                <p className="mb-0 me-3">{PetsData[0]?.Name}</p>
                              </div>
                              {PetsData ? (
                                <p>
                                  {PetsData[0]?.Type}: {PetsData[0]?.Breed}
                                </p>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                          <div className="col-md-7 ">
                            <div className="w-100 MyLeftBorder">
                              <div className="d-flex align-items-center justify-content-between">
                                <h6 className="mb-0 text-secondary">gender</h6>
                                <span className="me-5 title">
                                  {PetsData[0]?.Gender}
                                </span>
                              </div>
                              <hr className="my-2" />
                              <div className="d-flex align-items-center justify-content-between">
                                <h6 className="mb-0 text-secondary">age</h6>
                                <span className="me-5 title">
                                  {PetsData[0]?.Age}
                                </span>
                              </div>
                              <hr className="my-2" />
                              <div className="d-flex align-items-center justify-content-between">
                                <h6 className="mb-0 text-secondary">breed</h6>
                                <span className="me-5 title">
                                  {PetsData[0]?.Breed}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>This user has no pets</>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
