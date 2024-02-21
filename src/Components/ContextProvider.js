import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../Firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

// Create a context
export let MyContext = createContext();


export default function MyContextProvider(props) {
  // let [profilePhotoURL, setprofilePhotoURL] = useState('https://ssniper.sirv.com/Images/3.png');
  const [userObj, setUserObj] = useState();
  const [UserDBData, setUserDBData] = useState();
  const [currentDevice, setCurrentDevice] = useState();
  const [pending, setPending] = useState(true);
  var [myAuth, setMyAuth] = useState("false");

  const fetchData = async (userId) => {
    try {
        const documentRef = doc(db, 'Users', userId);
        const docSnapshot = await getDoc(documentRef);
        const userData = docSnapshot.data();
        // console.log(userData);
        setUserDBData(userData);
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
      setPending(false);
    }
};
const detectDevice = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  if (/android/.test(userAgent)) {
    return 'Android';
  } else if (/iphone|ipad|ipod/.test(userAgent)) {
    return 'iOS';
  } else {
    return 'Other';
  }
};


useEffect(() => {
    const device = detectDevice();
    setCurrentDevice(device)
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser !== null) {
        setUserObj(currentUser);
        fetchData(currentUser.uid)
        setMyAuth("Logged in");
        setPending(false)
        // console.log(currentUser);
      }else if(currentUser===null){
        setPending(false)
      }
    });

    // Cleanup function for useEffect
    return () => unsubscribe();
  }, [auth, setMyAuth ,setPending]);

  const contextValue = {
    userObj,
    setUserObj,
    myAuth,
    setMyAuth,
    pending,
    setPending,
    UserDBData,
    setUserDBData,
    currentDevice,
    setCurrentDevice
  };
 
  return (
    <MyContext.Provider value={contextValue}>
      {props.children}
    </MyContext.Provider>
  )
}
