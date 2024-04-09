import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from './ContextProvider';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../Firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'

import '../MyCss/doctorHome.css'
import Postt from './Postt';
import Booking from './Booking';
import UrgentPost from './UrgentPost';
export default function DoctorHome() {
  const { UserDBData, setUserDBData } = useContext(MyContext);

  ///


  const [Condition, setCondition] = useState(0)

  let navigate = useNavigate()
  const goToProfile = () => {
    console.log("lol")
    setCondition(0)
    navigate('/SignIn');
  }







  /**** */

  return (
    <>
      <div className='w-100 p1 '>
        <div className=''>
          <div className=''>
            <h3 className='container text-light pt-5'>Welcome Back, <span style={{ fontSize: '35px' }}> {UserDBData?.userName} </span></h3>
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

      {/* <div className='container py-5 text-center ' >
        <div className='row'>
          <div className='col-lg-3 col-3 col-md-3 '>
            <FontAwesomeIcon onClick={() => setCondition(1)} className='buttbar' icon={fa.faSignsPost} style={{ fontSize: '40px' }} />
          </div>
          <div className='col-lg-3 col-3 col-md-3'>
            <FontAwesomeIcon onClick={() => setCondition(2)} className='buttbar' icon={fa.faCalendarCheck} style={{ fontSize: '40px' }} />
          </div>
          <div className='col-lg-3 col-3 col-md-3'>
            <FontAwesomeIcon onClick={() => setCondition(3)} className='buttbar' icon={fa.faBell} style={{ fontSize: '40px' }} />
          </div>
          <div className='col-lg-3 col-3 col-md-3'>
            <FontAwesomeIcon onClick={() => setCondition(0)} className='close' icon={fa.faXmark} style={{ fontSize: '50px', marginTop: '16px', color: 'red' }} />
          </div>
        </div>
      </div> */}
      {Condition == 0 ? (

        <div className="container mt-3 text-center">
          <div className="row g-3">
            <div className="col-6" onClick={() => setCondition(1)}>
              <div className="p-4 py-5 MyDropshadow squareButtons DemoGradient pointer rounded-3 border bg-light d-flex flex-column">
                <FontAwesomeIcon className='sqIcon' icon={fa.faSignsPost} />
                Posts
              </div>
            </div>
            <div className="col-6" onClick={() => setCondition(2)}>
              <div className="p-4 py-5 MyDropshadow squareButtons DemoGradient pointer rounded-3 border bg-light d-flex flex-column">
                <FontAwesomeIcon className='sqIcon' icon={fa.faCalendarCheck} />
                Appointment
              </div>
            </div>
            <div className="col-6" onClick={() => setCondition(3)}>
              <div className="p-4 py-5 MyDropshadow squareButtons DemoGradient pointer rounded-3 border bg-light d-flex flex-column">
                <FontAwesomeIcon className='sqIcon' icon={fa.faBell} />
                Urgent posts
              </div>
            </div>
            <div className="col-6" onClick={goToProfile}>
              <div className="p-4 py-5 MyDropshadow squareButtons DemoGradient pointer rounded-3 border bg-light d-flex flex-column">
                <FontAwesomeIcon className='sqIcon' icon={fa.faUserDoctor} />
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
        {Condition === 1 && <Postt />}
        {Condition === 2 && <Booking />}
        {Condition === 3 && <UrgentPost />}
      </div>

      <div className='text-black justify-content-center align-items-center MainSection text-center container px-5 mt-5'>
        <div className='container'>
          <div className="starArea d-flex justify-content-center my-3 align-items-center ">
          </div>
          <p>Your Expert Veterinary assitant</p>
        </div>
      </div>

    </>

  )
}

