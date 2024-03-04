import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from './ContextProvider';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../Firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'

import '../MyCss/doctorHome.css'
import Postt from './Postt';
export default function DoctorHome() {
    const { UserDBData, setUserDBData } = useContext(MyContext);
    const [posts, setPosts] = useState([])
    const { currentDevice, setCurrentDevice } = useContext(MyContext);
  
///

const navigate = useNavigate();
/* post */
const handleClickPost = () => {
  navigate('/post');
};
/* UrgentPost  */
const handleClickUrgentPost = () => {
  navigate('/UrgentPost');
};

/**Book */
const handleClickBook = () => {
  navigate('/book');
};

    /**** */
  
    return (
<>
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

    



<div className='container py-5'>
<div className='row text-center'>

  <div className=' py-2 col-lg-4 col-7 col-md-4'>
  <button type="button" class="btn btn-info px-5 py-2" onClick={handleClickPost}>Posts</button>
  </div>

  <div className=' py-2 col-lg-4 col-2 col-md-4'>
  <button type="button" class="btn btn-danger px-5 py-2 " onClick={handleClickBook} >Book</button>
  </div>

  <div className=' py-2 col-lg-4 col-7 col-md-4'>
  <button type="button" class="btn btn-success px-4 py-2 " onClick={handleClickUrgentPost} >UrgentPost</button>
  </div>

</div>
</div>

<div className='text-black justify-content-center align-items-center MainSection text-center container px-5 mt-5'>
<div className='container'>
<div className="starArea d-flex justify-content-center my-3 align-items-center ">
        <div className="whiteLine"></div>
        <div className="whiteLine"></div>
    </div>
    <p>Your Expert Veterinary assitant</p>
</div>
</div>

</>
    )
}
