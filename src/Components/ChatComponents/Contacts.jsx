import { collection, doc, getDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../Firebase/firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'
import { MyContext } from '../ContextProvider'
import '../../MyCss/Chat.css'

export default function Contacts() {
     // const UserChatsRef = collection(db, "UserChats")
     
    const [UserContacts, setUserContacts] = useState()
    const { SelectedContactData, setSelectedContactData } = useContext(MyContext);
    const { userObj, setUserObj } = useContext(MyContext);
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
    <div className='w-100 '>
        {
            UserContacts?.map((Contacts, index) => (
                <div onClick={()=>setSelectedContactData(Contacts)} key={Contacts?.ChatRoomID} className='d-flex justify-content-center '>
                  <div className=" myCard2 p-3 w-100 row  " >
                    <div className='col-3 p-0 d-flex align-items-center'>
                      <img className="circle-round-2" src={Contacts?.otherPersonPic} alt="Card image" />
                    </div>
                    <div className='p-0 col-9'>
                      <div className="h-100">
                        <h5 className="card-title pb-2">Dr.{Contacts?.OtherPersonName}</h5>
                        
                        <div className='d-flex justify-content-between'>
                        <span className='text-secondary text-truncate'>{Contacts?.LastMessage}</span>
                          <div className=' ps-5'>
                            <span className='text-secondary'>16:20</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              ))
        }
    </div>
  )
}
