import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from './ContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'
import { db } from '../Firebase/firebase';
import { Timestamp, addDoc, arrayUnion, collection, doc, getDocs, query, runTransaction, where } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import '../MyCss/userHome.css'
import { toast } from 'react-toastify';
import MakeAPost from './MakeAPost';
import VetsInYourArea from './VetsInYourArea';
import Postt from './Postt';
import YourPosts from './YourPosts';

export default function UserHome() {
  const { userObj, setUserObj } = useContext(MyContext);
  const { UserDBData, setUserDBData } = useContext(MyContext);
  const [doctorData, setDoctorData] = useState(false)
  const [PostText, setPostText] = useState("")
  const PostsRef = collection(db, "Posts")

  const [isOpen, setIsOpen] = useState(false)
  const [postType, setPostType] = useState('regular');


  let navigate = useNavigate()
 
  const goToProfile = (Docid) => {
    if (Docid == userObj.uid) {
      navigate('/SignIn');      
    }else{
      navigate('/profile', { state: { id: Docid } });
    }
  }





  const handlePostSubmit = async (e) => {
    e.preventDefault();
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
    if (PostText === "") return;
    console.log(PostText);
    const dateTimeVar = new Date().toString();
    let collectionRef;
    if (postType === 'urgent') {
      collectionRef = collection(db, "UrgentPosts");
    } else {
      collectionRef = collection(db, "Posts");
    }


    await addDoc(collectionRef, {
      text: PostText,
      createdAt: dateTimeVar.slice(0, 21),
      senderName: UserDBData.name,
      senderId: UserDBData.uid,
      SenderPFP: UserDBData.userPFP,
      UserData: UserDBData,
      photos: "",
    });


    setPostText("")
    setIsOpen(false)
  };
  /****************************************FRONT***********************************************/

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
    if (userData?._id > userObj?.uid) {
      RID = userObj?.uid + " " + userData?._id;
    } else {
      RID = userData?._id + " " + userObj?.uid;
    }
    console.log(RID);
    goToRoom(RID, userData);
  };
  const goToRoom = async (RID, userData) => {

    const userChatsRef = collection(db, "UserChats");
    // updateDoc(userChatDoc, {
    //   ChatRooms: arrayUnion({
    //     ChatRoomID: RID,
    //     OtherPersonName: userData?.name,
    //     otherPersonPic: userData?.userPFP
    //   })
    // })
    try {
      await runTransaction(db, async (transaction) => {
        const userChatDoc = await doc(userChatsRef, userObj.uid);
        const OtherUserChatDoc = await doc(userChatsRef, userData?._id);
        const userChatDocSnap = await transaction.get(userChatDoc);
        const OtherUserChatDocSnap = await transaction.get(OtherUserChatDoc);

        if (userChatDocSnap.exists()) {
          transaction.update(userChatDoc, {
            ChatRooms: arrayUnion({
              ChatRoomID: RID,
              OtherPersonName: userData?.name,
              otherPersonPic: userData?.userPFP
            })
          });
        } else {
          transaction.set(userChatDoc, {
            ChatRooms: [{
              ChatRoomID: RID,
              OtherPersonName: userData?.name,
              otherPersonPic: userData?.userPFP
            }]
          });
        }

        if (OtherUserChatDocSnap.exists()) {
          transaction.update(OtherUserChatDoc, {
            ChatRooms: arrayUnion({
              ChatRoomID: RID,
              OtherPersonName: UserDBData.name,
              otherPersonPic: UserDBData.userPFP
            })
          });
        } else {
          transaction.set(OtherUserChatDoc, {
            ChatRooms: [{
              ChatRoomID: RID,
              OtherPersonName: UserDBData.name,
              otherPersonPic: UserDBData.userPFP
            }]
          });
        }
      });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
    navigate("/room", { state: { RID: RID, reciverPFP: userData?.userPFP, reciverName: userData?.name } });
  };

  const [Condition, setCondition] = useState(0)







  return (
    <div className='mb-3'>

      {/*********************************************************************************************** */}

      <div className='w-100 p1 '>
        <div className=''>
          <div className=''>
            <h3 className='container text-light pt-5'>Welcome Back, <span style={{ fontSize: '35px' }}> {UserDBData?.name} </span></h3>
            <div className='pt-4 container pb-2'>
              <input className='form-control mb-2' placeholder="search here" />
            </div>
          </div>
        </div>
      </div>

      <div className='L1 w-100 d-flex align-items-center justify-content-center'>
        <div className='noneInphone'>
          <div className=' text-center text-light'>
            <h1 className='container text-light'>Empowering Healthy Lives for Your Pets</h1>
            <div className='pt-4 container pb-2'>
              <h4>Experience Veterinary Excellence Crafted with Love and Expertise for the Furry Friends We Adore</h4>
            </div>
          </div>
        </div>
      </div>
      {/* <MakeAPost />
      <Postt />
      <VetsInYourArea /> */}


      {Condition == 0 ? (

        <div className="container mt-3 text-center">
          <div className="row g-3">
            <div className="col-6" onClick={() => setCondition(1)}>
              <div className="p-4 py-5 MyDropshadow squareButtons DemoGradient pointer rounded-3 border bg-light d-flex flex-column">
                <FontAwesomeIcon className='sqIcon' icon={fa.faUserDoctor} />
                Vets
              </div>
            </div>
            <div className="col-6" onClick={() => setCondition(2)}>
              <div className="p-4 py-5 MyDropshadow squareButtons DemoGradient pointer rounded-3 border bg-light d-flex flex-column">
                <FontAwesomeIcon className='sqIcon' icon={fa.faComment} />
                Posts
              </div>
            </div>
            <div className="col-6" onClick={() => setCondition(3)}>
              <div className="p-4 py-5 MyDropshadow squareButtons DemoGradient pointer rounded-3 border bg-light d-flex flex-column">
                <FontAwesomeIcon className='sqIcon' icon={fa.faBell} />
                Your posts
              </div>
            </div>
            <div className="col-6" onClick={() => navigate('/SignIn')}>
              <div className="p-4 py-5 MyDropshadow squareButtons DemoGradient pointer rounded-3 border bg-light d-flex flex-column">
                <FontAwesomeIcon className='sqIcon' icon={fa.faUser} />
                Profile
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='container'>
          <FontAwesomeIcon onClick={() => setCondition(0)} className='pointer arrowIcon' icon={fa.faArrowLeft} />
          <hr />
        </div>
      )}
      <div>
        {Condition === 1 && <VetsInYourArea />}
        {Condition === 2 && <Postt />}
        {Condition === 3 && <YourPosts />}
      </div>
      {/*********************************************************************************************** */}


      {/************************************************************************************************************ */}
      {/* <div className='container mt-3'>
        {doctorData ? (
          <div className='w-100 '>
            <div className='pp4' >
              Veterinarian in Your Area:
            </div>
            <div className='row gx-3 gy-1'>

              {
                doctorData.map((doctors, index) => (
                  <div key={doctors.DoctorID} className='col-lg-6 d-flex justify-content-center '>
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
                            <button onClick={() => goToProfile(doctors.DoctorID)} className="btn btn-primary pp5">Details</button>
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
      </div> */}

      {/************************************************************************************ */}

      {/* <div className='d-flex justify-content-center align-items-center MainSection text-center'>

        <div className='w-100 justify-content-center d-flex'>
          <div className='w-50 text-black'>

           <h1 className='bigga my-2 mb-3'>Welcome to VetRo</h1>
    <h2>User</h2>
    <h2>current Device: {currentDevice}</h2>
    {UserDBData ? (
      <div className='w-100 overflow-hidden'>
        <h2>{UserDBData.isDoctor.toString()}</h2>
        <h2>{UserDBData.email.toString()}</h2>
        <h2>{isOpen.toString()}</h2>
      </div>
    ) : (
      <h2>null</h2>
    )
    }





            <div className="starArea d-flex justify-content-center my-5 align-items-center ">
            </div>
           <p className='text-black'>Your Expert Veterinary assitant</p>

          </div>
        </div>

      </div> */}
    </div>
  )
}
