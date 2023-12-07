import React, { useContext, useState } from 'react'
import '../MyCss/MyCustomStylesheet.css'
import avatarImg from '../images/avatars.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'
// import * as fab from '@fortawesome/free-brands-svg-icons';
import CameraComponent from './CameraComponent'
import Shake from './Shake'
import VetRoBot from './VetRoBot'
import { MyContext } from './ContextProvider'
import Pets from './Pets'
import Loading from './Loading'
import DoctorHome from './DoctorHome'
import UserHome from './UserHome'

export default function Main() {
  let { myAuth } = useContext(MyContext)
  const { UserDBData, setUserDBData } = useContext(MyContext);
  const { userObj, setUserObj } = useContext(MyContext);

  const [dataFromChild, setDataFromChild] = useState(avatarImg);
  const handleDataFromChild = (data) => {
    // Update the state with data received from the child component
    setDataFromChild(data);
    console.log(dataFromChild);

  };
  if (userObj && UserDBData) {
    if (UserDBData.isDoctor) {
      return <DoctorHome />
    }else{
      return <UserHome />
    }
    return (
      <div className='d-flex justify-content-center align-items-center MainSection text-center'>
  
        <div className='w-100 justify-content-center d-flex'>
          <div className='w-50 '>
            <img id='imageDisplay' className='AvatarMainPic my-3' src={dataFromChild} alt='avatar' />
            <h1 className='bigga my-2 mb-3'>Welcome to VetRo</h1>
            <h2>{myAuth}</h2>
            <div className='py-3'>
              <div className='py-2'>              
                <h2>{UserDBData.isDoctor.toString()}</h2>
              </div>
  
            </div>
            <div className="starArea d-flex justify-content-center my-3 align-items-center ">
              <div className="whiteLine"></div>
              <FontAwesomeIcon className='px-3' icon={fa.faStar} />
              <div className="whiteLine"></div>
            </div>
            <p>Your Expert Veterinary assitant</p>
  
          </div>
        </div>
  
      </div>
    )
  }else if(userObj && !UserDBData){
    return <Loading />    
  }else{
    return <UserHome />
  }
  
}
