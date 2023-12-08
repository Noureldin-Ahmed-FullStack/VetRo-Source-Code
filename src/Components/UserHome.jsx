import React, { useContext, useState } from 'react'
import { MyContext } from './ContextProvider';

export default function UserHome() {
  const { UserDBData, setUserDBData } = useContext(MyContext);
  // const { isOpen, setIsOpen } = useContext(MyContext);


  // const docRef = await addDoc(collection(db, "Clinics"), clinicData);
  return (
    <div className='d-flex justify-content-center align-items-center MainSection text-center'>

      <div className='w-100 justify-content-center d-flex'>
        <div className='w-50 '>
          {/* <img id='imageDisplay' className='AvatarMainPic my-3' src={dataFromChild} alt='avatar' /> */}
          <h1 className='bigga my-2 mb-3'>Welcome to VetRo</h1>
          <h2>User</h2>
          {UserDBData ? (
            <>
              <h2>{UserDBData.isDoctor.toString()}</h2>
              <h2>{UserDBData.email.toString()}</h2>
            </>
          ) : (
            <h2>null</h2>
          )
          }
          {/* <button onClick={() => setIsOpen(true)} className='btn btn-danger'>Post</button> */}
          <div className='py-3'>
            <div className='py-2'>
            </div>

          </div>
          <div className="starArea d-flex justify-content-center my-3 align-items-center ">
            <div className="whiteLine"></div>
            <div className="whiteLine"></div>
          </div>
          <p>Your Expert Veterinary assitant</p>

        </div>
      </div>

    </div>
  )
}
