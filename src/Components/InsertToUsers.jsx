import { addDoc, collection } from 'firebase/firestore'
import React, { useContext } from 'react'
import { db } from '../Firebase/firebase'
import { app, auth } from '../Firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { MyContext } from './ContextProvider';


export function InsertUserData(){
  const { userObj } = useContext(MyContext);
  if (userObj) {
   console.log(userObj);
  }
  
}

export default function InsertToUsers() {

  // const usersRef = collection(db, "Users")
  // const { userObj, setUserObj } = useContext(MyContext);
    
  return (
    <div>InsertToUsers</div>
  )
}

   
