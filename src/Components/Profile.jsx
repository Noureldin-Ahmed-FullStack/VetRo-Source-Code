import { arrayUnion, doc, getDoc, runTransaction, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { db } from "../Firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as faReg from "@fortawesome/free-regular-svg-icons";
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
  const [selectedClinicData, setSelectedClinicData] = useState([]);
  const { userObj, setUserObj } = useContext(MyContext);
  const { UserDBData, setUserDBData } = useContext(MyContext);

  const BookingRef = collection(db, "Booking")

  const today = new Date();
  const currentDate = today.toISOString().slice(0, 16);

  const handleBooking = async(event) => {
    event.preventDefault()
    let BookingData = {
      userID: userObj.uid,
      Doctor: ProfileData.uid,
      DoctorData: ProfileData,
      ClinicID: selectedClinicData.id,
      ClinicData: selectedClinicData,
      UserData: UserDBData,
      PetName: event.target[0].value,
      PetBreed: event.target[1].value,
      phoneNumber: event.target[2].value,
      Appointment: event.target[3].value,
      Issue: event.target[4].value,
      PostDate: serverTimestamp(),
      Status: "no response yet"
    }
    console.log(BookingData);
    try {
      await addDoc(BookingRef,BookingData)
      for (let i = 0; i < event.target.length; i++) {
        event.target[i].value = null
        
      }
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
      const documentRef = doc(db, "Users", location.state.id);
      const docSnapshot = await getDoc(documentRef);
      const userData = docSnapshot.data();
      console.log(docSnapshot.data());
      setProfileData(userData);
      if (userData?.isDoctor) {
        fetchClinicData();
      } else {
        fetchPetsData();
      }
      console.log(ProfileData);
    } catch (error) {
      console.error("Error fetching Profile data:", error);
    }
  };
  const fetchClinicData = async () => {
    try {
      const response = collection(db, "Clinics");
      const q = query(response, where("DoctorId", "==", location.state.id)); // Assuming userId property in Clinics collection
      const data = await getDocs(q);
      const clinicDataArray = data.docs.map((doc) => {
        const clinicData = doc.data();
        return {
          ...clinicData,
          id: doc.id  // Append the document ID to each clinic data object
        };
      });
      setClinicData(clinicDataArray);
      console.log(clinicDataArray);
    } catch (error) {
      console.error("Error fetching clinic data:", error);
    }
  };
  const fetchPetsData = async () => {
    try {
      const response = collection(db, "Pets");
      const q = query(response, where("userID", "==", location.state.id)); // Assuming userId property in Pets collection
      const data = await getDocs(q);
      console.log("pet data " + data);
      const PetsDataArray = data.docs.map((doc) => {
        const petData = doc.data();
        petData.PetID = doc.id;
        return petData;
      });
      setPetsData(PetsDataArray);
    } catch (error) {
      console.error("Error fetching PETS data:", error);
    }
  };

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
                      <p>This clinic is available from: {selectedClinicData.availableFrom} to: {selectedClinicData.availableTo}</p>
                      <p style={{ fontSize: '0.9rem' }}>Make sure you pick an appointment date and time that fit this criteria</p>

                      <div className="row py-2 align-items-center">
                        <div className="col-sm-4"><label htmlFor="name">Pet Name:</label></div>
                        <div className="col-sm-8"><input className="form-control" placeholder="Max" type="text" /></div>
                      </div>
                      <div className="row py-2 align-items-center">
                        <div className="col-sm-4"><label htmlFor="Breed">Pet Breed:</label></div>
                        <div className="col-sm-8"><input className="form-control" placeholder="Dog, German Shepard" type="text" /></div>
                      </div>
                      <div className="row py-2 align-items-center">
                        <div className="col-sm-4"><label htmlFor="phone">your phone:</label></div>
                        <div className="col-sm-8"><input className="form-control" placeholder="Phone number" type="tel" /></div>
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
                        <button type='submit' className="btn btn-primary" data-bs-dismiss="modal">submit</button>
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
                        <h4>Dr.{ProfileData?.userName}</h4>
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
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Consectetur deleniti est, animi vero dolores
                            temporibus sint cumque et quae alias.
                          </p>
                        </div>
                        <div className=" py-1"></div>
                        <hr className="w-100" />
                        <div>
                          <h4>Dr.{ProfileData?.userName}'s Clinics</h4>
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
                            onClick={() => console.log(clinic)}
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
                              {clinicData[0]?.image ? (
                                <img
                                  src={clinicData[0]?.image}
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
                                  <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal" onClick={() => setSelectedClinicData(clinicData[0])}>Book an appointment</button>
                                  <p className="m-0">
                                    Booking price: {clinicData[0]?.price} L.E
                                  </p>
                                  <p className="m-0">
                                    Clinic phone number: {clinicData[0]?.phone}
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
                                  {clinicData[0]?.name}
                                </span>
                              </div>
                              <hr className="my-2" />
                              <div className="d-flex align-items-center justify-content-between">
                                <h6 className="mb-0 text-secondary">
                                  Clinic phone number
                                </h6>
                                <span className="me-5 title">
                                  {clinicData[0]?.phone}
                                </span>
                              </div>
                              <hr className="my-2" />
                              <div className="d-flex align-items-center justify-content-between">
                                <h6 className="mb-0 text-secondary">
                                  Booking price
                                </h6>
                                <span className="me-5 title">
                                  {clinicData[0]?.price}
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
                        <h4 >{ProfileData?.userName}</h4>
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
                        <h4>{ProfileData?.userName}'s Pets</h4>
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
