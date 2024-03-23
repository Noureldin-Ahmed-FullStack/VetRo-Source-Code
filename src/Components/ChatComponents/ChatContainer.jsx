import { collection, doc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../Firebase/firebase'
import { MyContext } from '../ContextProvider';
import Contacts from './Contacts';
import Chat from '../Chat';
import SignIn from '../SignIn';
import { toast } from 'react-toastify';

export default function ChatContainer() {

  const [ViewContacts, setViewContacts] = useState(true)
  const { SelectedContactData, setSelectedContactData } = useContext(MyContext);
  const { userObj, setUserObj } = useContext(MyContext);

  const { currentDevice, setCurrentDevice } = useContext(MyContext);
  if (!userObj) {
    toast.error(`You need to LogIn first`, {
      position: "top-center",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return(<SignIn/>)
  }
  if (currentDevice == "Other") {
    return (
      <div className='p-3 vh100 '>
        <div className='row max1'>
          <div className='col-4 max1 bg-light-subtle'>
            
            <Contacts />

          </div>
          <div className='col-8  text-secondary-emphasis'>
            {SelectedContactData ? (
              <Chat room={SelectedContactData.ChatRoomID} reciverName={SelectedContactData.OtherPersonName} reciverPFP={SelectedContactData.otherPersonPic} />
            ) : (
              <div className='h-100 w-100 d-flex justify-content-center align-items-center'>
                <h2>VetRo Chat</h2>

              </div>
            )}
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        {SelectedContactData ? (
          <Chat room={SelectedContactData.ChatRoomID} reciverName={SelectedContactData.OtherPersonName} reciverPFP={SelectedContactData.otherPersonPic} />
        ) : (
          <Contacts />
        )}
      </div>
    )
  }
}
