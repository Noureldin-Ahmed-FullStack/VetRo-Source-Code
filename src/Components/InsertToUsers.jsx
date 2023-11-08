import { addDoc, collection } from 'firebase/firestore'
import React, { useContext } from 'react'
import { db } from '../Firebase/firebase'
import { app, auth } from '../Firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { MyContext } from './ContextProvider';




export default function InsertToUsers() {

  const usersRef = collection(db, "Users")
  const { userObj, setUserObj } = useContext(MyContext);
 const InsertUserData = async () =>{
       if (userObj) {
        console.log(userObj);
       }
        // await addDoc(usersRef, {
        //     // userID: 
        // }
        // )
    }
  return (
    <div>InsertToUsers</div>
  )
}


   
