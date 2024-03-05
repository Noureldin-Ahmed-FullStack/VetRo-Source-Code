import { collection, doc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../Firebase/firebase'
import { MyContext } from '../ContextProvider';
import Contacts from './Contacts';
import Chat from '../Chat';

export default function ChatContainer() {

  const [ViewContacts, setViewContacts] = useState(true)
  const { SelectedContactData, setSelectedContactData } = useContext(MyContext);

  const { currentDevice, setCurrentDevice } = useContext(MyContext);

  if (currentDevice == "Other") {
    return (
      <div className='p-3 vh100 '>
        <div className='row h-100'>
          <div className='col-4 bg-light-subtle'>
            <div className='w-100 h-100 d-flex flex-column'>
              <h2>Messages</h2>
              <input type="search" className='form-control my-2' placeholder='🔍 search' />
              <div className=' flex-grow-1 w-100 MyScroller scrollable-container'>

              <Contacts />
              </div>
            </div>

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
