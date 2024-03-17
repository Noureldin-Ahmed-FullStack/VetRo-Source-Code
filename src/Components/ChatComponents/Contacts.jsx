import { collection, doc, getDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../Firebase/firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'
import { MyContext } from '../ContextProvider'
import '../../MyCss/Chat.css'

export default function Contacts() {
     // const UserChatsRef = collection(db, "UserChats")
     
    function formatTimeAgo(timestamp) {
      const test = new Date(timestamp);
      const now = new Date();
      const diff = now - test;
  
      // Convert milliseconds to minutes
      const minutes = Math.floor(diff / (1000 * 60));
  
      if (minutes < 1440) { // Less than a day (24 hours)
          const hours = Math.floor(minutes / 60);
          const mins = minutes % 60;
          
          if (hours > 0) {
              return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
          } else {
              return `${mins} ${mins === 1 ? 'minute' : 'minutes'} ago`;
          }
      } else {
          // More than a day, return the date string
          if (test.toString() == "Invalid Date") {
            return null
          }
          return test.toString();
      }
  }
    const [UserContacts, setUserContacts] = useState()
    const { SelectedContactData, setSelectedContactData } = useContext(MyContext);
    const { userObj, setUserObj } = useContext(MyContext);
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearch = (event) => {
        setSearchQuery(event.target.value); // Update search query state
    };
    const filteredData = UserContacts?.filter(item =>
        item.OtherPersonName.toLowerCase().includes(searchQuery.toLowerCase())
    );
     const getDocumentById = async (collectionName, documentId) => {
        try {
          const docRef = doc(db, collectionName, documentId);
          const docSnapshot = await getDoc(docRef);
          
          if (docSnapshot.exists()) {
            return {...docSnapshot.data() };
          } else {
            console.log("No such document!");
            return null;
          }
        } catch (error) {
          console.error("Error getting document:", error);
          return null;
        }
      };
    
    useEffect(() => {
        getDocumentById("UserChats", userObj.uid)
        .then(doc => {
          if (doc) {
            console.log("Document data:", doc.ChatRooms);
            setUserContacts(doc.ChatRooms)
          } else {
            console.log("Document not found!");
          }
        })
        .catch(error => {
          console.error("Error:", error);
        });

    }, [])
  return (
    <div className='w-100 h-100 d-flex flex-column'>
              <h2>Messages</h2>
              <input type="text" value={searchQuery} onChange={handleSearch} className='form-control my-2' placeholder='🔍 search' />
              <div className=' flex-grow-1 w-100 MyScroller scrollable-container'>

              <div className='w-100 '>
        {
            filteredData?.map((Contacts, index) => (
                <div onClick={()=>setSelectedContactData(Contacts)} key={Contacts?.ChatRoomID} className='d-flex justify-content-center '>
                  <div className=" myCard2 p-3 w-100 row  " >
                    <div className='col-3 p-0 d-flex align-items-center'>
                      <img className="circle-round-2" src={Contacts?.otherPersonPic} alt="Card image" />
                    </div>
                    <div className='p-0 col-9'>
                      <div className="h-100">
                        <h5 className="card-title pb-2">Dr. {Contacts?.OtherPersonName}</h5>
                        
                        <div className='d-flex justify-content-between'>
                        <span className='text-secondary text-truncate'>{Contacts?.LastMsg}</span>
                          <div className=' ps-5'>
                            <span className='text-secondary'>{formatTimeAgo(Contacts?.LastMsgTimeStamp)}</span>
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
            </div>
    
  )
}
