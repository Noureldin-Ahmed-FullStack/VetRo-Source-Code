
import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from './ContextProvider';
import { UseFirebaseAuth } from './UseFirebaseAuth'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../Firebase/firebase';


export default function DoctorProfile() {
  
    
    const { signOutUser } = UseFirebaseAuth(); 
    const { userObj, setUserObj } = useContext(MyContext);
    const { UserDBData, setUserDBData } = useContext(MyContext);




  /*For Clinic data */
  const [clinicData, setClinicData] = useState([]);
  const usersRef = doc(db, "Users", userObj.uid);
  const fetchClinicData = async () => {
  try {
    const response = collection(db, 'Clinics');
    const q = query(response, where("DoctorId", "==", usersRef.id)); // Assuming userId property in Clinics collection
    const data = await getDocs(q);
    const clinicDataArray = data.docs.map(doc => doc.data());
    setClinicData(clinicDataArray);
  } catch (error) {
    console.error("Error fetching clinic data:", error);
  }
  };
  useEffect(() => {
    fetchClinicData();
  }, [usersRef]);


  return (
    
    <div className="container">
    
                        <div className='rowt'>
                            <img id="img" src={UserDBData.userPFP} className="profile-picd" alt />
                        </div>
                    
        <div className="title">Dr. Ahmad Mahmoud</div>
        <div className="subtitle">Experienced vet with a passion for small animal care</div>
        <div className="rating">
        <FontAwesomeIcon className='iconss' style={{color:"yellow"}} icon={fa.faStar} />
        <FontAwesomeIcon className='iconss' style={{color:"yellow"}} icon={fa.faStar} />
        <FontAwesomeIcon className='iconss' style={{color:"yellow"}} icon={fa.faStar} />
        <FontAwesomeIcon className='iconss'  style={{color:"yellow"}} icon={fa.faStar} />
            4.5 (1200 Reviews)
        </div>
        <div className='flexx'>
        <div className="availability">
        <div className='title'>
                Availability
           
            </div>
        <div className="days">
            <div className="day"><div className='theday'>
            Monday
    </div> <div className='thetime'>08:00 AM - 09:00 PM</div>
    
    </div>
    <div className="book"><button id="cvBtn" className="btn btn-warning text-light MyOrangeBg w-10" style={{backgroundColor: "blue"}} >Book</button></div>
        </div>
        <div className="days">
        <div className="day"><div className='theday'>Tuesday</div>
         <div className='thetime'>09:00 AM - 09:00 PM</div>
         
         </div>
         <div className="book"><button id="cvBtn" className="btn btn-warning text-light MyOrangeBg w-10" style={{backgroundColor: "blue"}}>Book</button></div>
        </div>
        <div className="days">
        <div className="day"><div className='theday'>Turthday</div> <div className='thetime'>10:00 AM - 09:00 PM</div>
        </div>
        <div className="book"><button id="cvBtn" className="btn btn-warning text-light MyOrangeBg w-10" style={{backgroundColor: "blue"}}>Book</button></div>
        </div>
        </div>
       <div className='cols'>
        
       <div className="clinics">
        <div className="title"><FontAwesomeIcon className='iconss' icon={fa.faClinicMedical} /> Clinics</div>
            <div className="clinic">Al Noor Medical Hospital</div>
            <div className="clinic">Urgent Care Clinic</div>
        </div>
        <div className='price'>
            <div className='title'>
                price
            </div>
            <div className='pricest'>
                 320 L.E
            </div>

        </div>
       </div>
        

        </div>
        <div>
        <button onClick={signOutUser} className="btn btn-warning text-light MyOrangeBg w-100 mt-4">Sign Out</button>
        </div>
        
        
    </div>
  )
}


