import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from './ContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faCat } from '@fortawesome/free-solid-svg-icons';
import { faHippo } from '@fortawesome/free-solid-svg-icons';
import { faPaw } from '@fortawesome/free-solid-svg-icons';

import { db } from '../Firebase/firebase';
import { Timestamp, addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import '../MyCss/userHome.css'

export default function UserHome() {
  const { UserDBData, setUserDBData } = useContext(MyContext);
  const { currentDevice, setCurrentDevice } = useContext(MyContext);
  const [isOpen, setIsOpen] = useState(false)
  const [doctorData, setDoctorData] = useState(false)
  const [PostText, setPostText] = useState("")
  const PostsRef = collection(db, "Posts")

  const [postType, setPostType] = useState('regular');

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

      sessionStorage.setItem('storedDoctorsData', JSON.stringify(DoctorDataArray));
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

  let navigate = useNavigate()
  const goToProfile = (Docid) => {
    navigate('/profile', { state: { id: Docid } });
  }





  const handlePostSubmit = async (e) => {
    e.preventDefault();
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
      senderName: UserDBData.userName,
      senderId: UserDBData.uid,
      SenderPFP: UserDBData.userPFP,
      photos: "",
    });


    setPostText("")
    setIsOpen(false)
  };
  /****************************************FRONT***********************************************/









  return (
    <>

      {/*********************************************************************************************** */}

      <div className='w-100 p1 '>
        <div className=''>
          <div className=''>
            <h3 className='container text-light pt-5'>Welcome Back, <span style={{ fontSize: '35px' }}> {UserDBData?.userName} </span></h3>
            <div className='pt-4 container pb-2'>
              <input className='form-control p4 py-2' placeholder="search here" />
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
      <div className='d-flex mt-4 justify-content-center'>
        <form className=' w-75 bg-light MyShadow rounded-5'>
          <div className="form-group p-3  ">
            <h5 className='text-center'>Create Post</h5>
            <input type="email" onClick={() => setIsOpen(true)} className="form-control inpo" placeholder='write here' />
          </div>
        </form>
      </div>


      {/*********************************************************************************************** */}

      {isOpen ? (
        <div className='myOverlay w-100  d-flex justify-content-center align-items-center '>
          <div className='container'>
            <div className='container bg-light rounded-5 w-100 '>
              <div className="row text-center  ">
                <div className="col-12 d-flex justify-content-between  y2">
                  <p></p>
                  <h2 className='py-3' style={{ color: '#74b4ff' }}>Create  post</h2>
                  <div className='d-flex justify-content-end align-items-center'>
                    <FontAwesomeIcon onClick={() => setIsOpen(false)} className='myClose' icon={fa.faCircleXmark} />
                  </div>
                </div>

              </div>
              <form onSubmit={handlePostSubmit}>
                <div className="post-box container y1">
                  <div className="user-profile row">
                    <div className='d-flex align-items-center py-2'>
                      <img className='circle-round' src={UserDBData?.userPFP} alt="Profile Picture" />
                      <h2 className='usrText pot1'>{UserDBData?.userName}</h2>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label >Post Type </label>
                    <select onChange={(e) => setPostType(e.target.value)} className="form-control">
                      <option value="regular"> Regular Post</option>
                      <option value="urgent">Urgent Post</option>
                    </select>
                  </div>

                  <div className='input-area '>
                    <textarea onChange={(e) => setPostText(e.target.value)} className='form-control  bg-light' rows="6" placeholder="What's on your mind?"></textarea>
                  </div>
                  <div className="action-buttons" style={{ margin: '10px' }}>
                    <button type='button' className="btn buttonAddImage"> < label style={{ fontSize: '30px', color: '#1268cc' }}>+</label>Add Image</button>
                    <button type='submit' className="btn buttonSubmit" >submit</button>
                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>

      ) : (
        <> </>

      )

      }
      {/************************************************************************************************************ */}
      <div className='container mt-3'>
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
                          <h4 className="card-title">Dr.{doctors.userName}</h4>
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
                            <div className=''>
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

      {/************************************************************************************ */}

      <div className='d-flex justify-content-center align-items-center MainSection text-center'>

        <div className='w-100 justify-content-center d-flex'>
          <div className='w-50 text-black'>

            {/**  <h1 className='bigga my-2 mb-3'>Welcome to VetRo</h1>
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

*/}



            <div className="starArea d-flex justify-content-center my-5 align-items-center ">
              <div className="whiteLine"></div>
              <div className="whiteLine"></div>
              <div className="whiteLine"></div>
              <div className="whiteLine"></div>
              <div className="whiteLine"></div>
            </div>
            {/*** <p className='text-black'>Your Expert Veterinary assitant</p> */}

          </div>
        </div>

      </div>
    </>
  )
}
