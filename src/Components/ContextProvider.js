import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/firebase';

// Create a context
export let MyContext = createContext();


export default function MyContextProvider(props) {
  // let [profilePhotoURL, setprofilePhotoURL] = useState('https://ssniper.sirv.com/Images/3.png');
  const [userObj, setUserObj] = useState();
  const [pending, setPending] = useState(true);
  var [myAuth, setMyAuth] = useState("false");
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser !== null) {
        setUserObj(currentUser);
        setMyAuth("Logged in");
        setPending(false)
        console.log(currentUser);
      }else if(currentUser===null){
        setPending(false)
      }
    });

    // Cleanup function for useEffect
    return () => unsubscribe();
  }, [auth, setMyAuth ,setPending]);
  //  onAuthStateChanged(auth, (currentUser) => { 
  //   if (currentUser != null) {
  //     setUserObj(currentUser)
  //     setMyAuth("Logged in") 
  //     console.log(userObj);      
  //   }
  // })
  const contextValue = {
    userObj,
    setUserObj,
    myAuth,
    setMyAuth,
    pending,
    setPending,
  };
  // if (userObj === null) {
  //   return (
  //     <div className='tall bg-danger'>
  //       <p>Loading...</p>
  //     </div>
  //   )
  // }
  return (
    <MyContext.Provider value={contextValue}>
      {props.children}
    </MyContext.Provider>
  )
}
