import { arrayUnion, doc, getDoc, runTransaction, setDoc, updateDoc } from "firebase/firestore";
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
  const { userObj, setUserObj } = useContext(MyContext);
  const { UserDBData, setUserDBData } = useContext(MyContext);
  {
    /*chat */
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
      const clinicDataArray = data.docs.map((doc) => doc.data());
      setClinicData(clinicDataArray);
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
