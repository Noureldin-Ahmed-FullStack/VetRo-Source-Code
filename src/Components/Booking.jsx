import React from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../Firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'
/** */
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


export default function Booking() {
    const responsive = {
        0: {
            items:  1,
        },
        600: {
          items:  2, // Adjust this value based on your preference for tablet screens
        },
        1000: {
          items:  2, // Adjust this value based on your preference for larger screens
        },
      };
    
  return (
    <>
    <div className='pp4'>incomming Pet Owner Reservations</div>
    <div className='text-black justify-content-center align-items-center MainSection text-center container px-5 mt-5'>

    <div className='container'>
        <OwlCarousel className='owl-theme' responsive={responsive}  nav>
            <div className='container'>
            <div className=''>
                <div className=''>
                <div className="card cardsize">
                    <div className="card-body">
                    <div className='starRatepp7 align-items-center'>
                    <img src={require("../images/port2.png")} alt="nnn" className="circle-round-profile"/>
                        <div className="ms-2 w-100">
                        <div className="h4 m-0" style={{color:'#39434F'}}>sara</div>
                        <div className="m-0 COLorli">sara@gmail</div>
                        <div className="m-0 COLorli">0123456789</div>
                        </div>
                        <div className=''><FontAwesomeIcon className='mess' icon={fa.faCommentDots} /></div>
                    </div>
                    <hr/>
                    <div className='starRated COLorP'>
                        <p>Route check-up</p>
                        <p> Monday-2/5/2024</p>
                    </div>
                    <hr/>
                    <div className='w-100 d-flex justify-content-evenly mt-2'>
                        <button className=" buttonDetails1">
                        <FontAwesomeIcon className='pe-2' icon={fa.faCheck} style={{ fontSize:'20px' }} />
                        Accept
                        </button>
                        <button className=" d-flex align-items-center buttonDetails2">
                        <FontAwesomeIcon className='pe-2' icon={fa.faXmark} style={{ fontSize:'20px' }} />
                        Delete
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        
        </OwlCarousel>
        </div>
        </div>
    </>
  )
}
