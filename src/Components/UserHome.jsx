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
/****************************************FRONT**************************************************************** */









  return (
    <>

{/*********************************************************************************************** */}
<div className='container'>
    <div className='row'>
      <div className='bg'>
      <div className='text-center item1' >
        <h3 className='item2'>Welcome Back, <span style={{fontSize:'30px'}}> {UserDBData.userName} 
      </span><FontAwesomeIcon icon={faCat} style={{fontSize:'40px' , color:'black'}} /> </h3>
      </div>
      </div>
    </div>

</div>




<div className='d-grid container srch2'>
    <form>
      <div className="form-group">
        <h5 className='item6'>Create Post</h5>
        <input type="email" onClick={() => setIsOpen(true)} className="form-control" placeholder='write here' style={{borderRadius:'10px'}}/>
      </div>
    </form> 
    </div>

{/*********************************************************************************************** */}

      {isOpen ? (
        <div className='myOverlay d-flex justify-content-center align-items-center '>
          <div className='container bg-light rounded-5 w-100 '>
            <div className="row text-center  ">
              <div className="col-12 d-flex justify-content-between  y2">
                <p></p>
                <h2 className='py-3' style={{color:'#74b4ff'}}>Create  post</h2>
                <div className='d-flex justify-content-end align-items-center'>
                  <FontAwesomeIcon onClick={() => setIsOpen(false)} className='myClose' icon={fa.faCircleXmark} />
                </div>
              </div>
              
            </div>
            <form onSubmit={handlePostSubmit}>
              <div className="post-box container y1">
                <div className="user-profile row">
                  <div className='d-flex align-items-center py-2'>
                    <img className='circle-round' src={UserDBData.userPFP} alt="Profile Picture" />
                    <h2 className='usrText'style={{color:'black', fontSize:'35px'}}>{UserDBData.userName}</h2>
                  </div>
                </div>
                <div className='input-area '>
                  <textarea onChange={(e) => setPostText(e.target.value)} className='form-control  bg-light' rows="6" placeholder="What's on your mind?"></textarea>
                </div>
                <div className="action-buttons" style={{margin:'10px'}}>
                <button type='button' className="btn buttonAddImage"> < label style={{fontSize:'30px', color:'#1268cc'}}>+</label>Add Image</button>                          
                  <button type='submit' className="btn buttonSubmit" >submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>

      ) : (
        <> </>
        
      )

      }
      {/************************************************************************************************************ */}
      <div className=' container mt-3 test1'>
        {doctorData ? (
          <div className='w-100 test2 '>
            <div className='row g-3 '>
            <h2 style={{color:'#178fff' ,fontSize:'30px', marginTop:'20px'}}>Veterinarian in Your Area:</h2>
              {
                doctorData.map((doctors, index) => (
                      <div class="card mb-3 test3   col-lg-6" style={{maxWidth:'540px'}}>
                        
                        <div class="row no-gutters ">
                          <div class="col-md-4 ">
                          <img className=" M1" src={doctors.userPFP} alt="Card image" />
                          </div>
                          <div class="col-md-8">
                            <div class="card-body smallltext">
                            <h2 className="card-title">Dr.{doctors.userName}</h2>
                            <p className="card-text " style={{color:'#0c4180'}}>you may have a certain speciality and expertise.</p>
                            <div className='starRate1'>
                            <h2>
                            <FontAwesomeIcon icon={faStar} style={{fontSize:'20px' , color:'gold'}} />
                            <FontAwesomeIcon icon={faStar} style={{fontSize:'20px' ,color:'gold'}}/>
                            <FontAwesomeIcon icon={faStar} style={{fontSize:'20px' ,color:'gold'}}/>
                            <FontAwesomeIcon icon={faStar} style={{fontSize:'20px' ,color:''}}/>
                            </h2>
                            <h3>4.5</h3>
                            </div>
                            <div className='col-3 mt-2 pb-2 starRate' >
                              <button onClick={()=> goToProfile(doctors.DoctorID)} className="btn buttonDetails" >Details</button>
                              <p className='chatIcon' >
                              <FontAwesomeIcon icon={faMessage} style={{color:'#1782ff' , fontSize:'25px' , margin:'12px'}}/>
                              </p>
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
