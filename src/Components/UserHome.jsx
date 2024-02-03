import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from './ContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'
import { db } from '../Firebase/firebase';
import { Timestamp, addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

export default function UserHome() {
  const { UserDBData, setUserDBData } = useContext(MyContext);
  const [isOpen, setIsOpen] = useState(false)
  const [doctorData, setDoctorData] = useState(false)
  const [PostText, setPostText] = useState("")
  const PostsRef = collection(db, "Posts")

  const fetchDoctorData = async () => {
    try {
      const response = collection(db, 'Users');
      const q = query(response, where("isDoctor", "==", true));
      // const q = query(response, where("email", "!=", null));
      const data = await getDocs(q);
      const DoctorDataArray = data.docs.map(doc => {
        const DoctorData = doc.data();
        DoctorData.DoctorID = doc.id;
        return DoctorData
      });
      setDoctorData(DoctorDataArray);
      console.log(DoctorDataArray);
    } catch (error) {
      console.error("Error fetching Doctor data:", error);
    }
  };
  useEffect(() => {
    console.log("home component updated");
    fetchDoctorData();
  }, []);
  
  let navigate = useNavigate()
  const goToProfile = (Docid)=>{
    navigate('/profile',{state:{id:Docid}});
  }






  const handlePostSubmit = async (e) => {
    e.preventDefault()
    if (PostText === "") return
    console.log(PostText);
    const dateTimeVar = new Date().toString()
    await addDoc(PostsRef, {
      text: PostText,
      createdAt: dateTimeVar.slice(0, 21),
      senderName: UserDBData.userName,
      senderId: UserDBData.uid,
      SenderPFP: UserDBData.userPFP,
      photos: "",
    })

    setPostText("")
    setIsOpen(false)
  };

  // const docRef = await addDoc(collection(db, "Clinics"), clinicData);
  return (
    <>
      {isOpen ? (
        <div className='myOverlay d-flex justify-content-center align-items-center'>
          <div className='container bg-light rounded-5 w-100'>
            <div className="row text-center">
              <div className="col-12 d-flex justify-content-between">
                <p></p>
                <h2 className='py-3'>Create a post</h2>
                <div className='d-flex justify-content-end align-items-center'>
                  <FontAwesomeIcon onClick={() => setIsOpen(false)} className='myClose' icon={fa.faCircleXmark} />
                </div>
              </div>
              <hr />
            </div>
            <form onSubmit={handlePostSubmit}>
              <div className="post-box container">
                <div className="user-profile row">
                  <div className='d-flex align-items-center py-2'>
                    <img className='circle-round' src={UserDBData.userPFP} alt="Profile Picture" />
                    <h3 className='usrText'>{UserDBData.userName}</h3>
                  </div>
                </div>
                <div className='input-area '>
                  <textarea onChange={(e) => setPostText(e.target.value)} className='form-control  bg-light' rows="6" placeholder="What's on your mind?"></textarea>
                </div>
                <div className="action-buttons">
                  <button type='button' className="btn btn-danger">Add Photo</button>
                  <button type='submit' className="btn btn-danger m-3">submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>

      ) : (
        <></>
      )

      }
      <div className='container mt-3'>
        {doctorData ? (
          <div className='w-100 '>
            <div className='row g-3'>
              {
                doctorData.map((doctors, index) => (
                  <div key={doctors.DoctorID} className='col-lg-6'>
                    <div className="bg-light myCard p-3 rounded-3 w-100 row" >
                      <div className='col-4'>
                        <img className="circle-round-profile" src={doctors.userPFP} alt="Card image" />
                      </div>
                      <div className='sm-left-padd col-8'>
                        <div className="card-body">
                          <h4 className="card-title">{doctors.userName}</h4>
                          <p className="card-text">{doctors.userName}</p>
                          <button onClick={()=> goToProfile(doctors.DoctorID)} className="btn btn-primary">See Profile</button>
                          {/* <Link className="btn btn-primary" to={{ pathname: '/profile', state: { id: doctors.DoctorID } }}>See Profile</Link> */}
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
      <div className='d-flex justify-content-center align-items-center MainSection text-center'>

        <div className='w-100 justify-content-center d-flex'>
          <div className='w-50 '>
            {/* <img id='imageDisplay' className='AvatarMainPic my-3' src={dataFromChild} alt='avatar' /> */}
            <h1 className='bigga my-2 mb-3'>Welcome to VetRo</h1>
            <h2>User</h2>
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
            <button onClick={() => setIsOpen(true)} className='btn btn-danger'>Post</button>

            <div className="starArea d-flex justify-content-center my-3 align-items-center ">
              <div className="whiteLine"></div>
              <div className="whiteLine"></div>
            </div>
            <p>Your Expert Veterinary assitant</p>

          </div>
        </div>

      </div>
    </>
  )
}
