import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../Firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import axios from 'axios';

import { jwtDecode } from "jwt-decode";
// Create a context
export let MyContext = createContext();


export default function MyContextProvider(props) {
  // let [profilePhotoURL, setprofilePhotoURL] = useState('https://ssniper.sirv.com/Images/3.png');
  const [userObj, setUserObj] = useState();
  const [UserDBData, setUserDBData] = useState();
  const [currentDevice, setCurrentDevice] = useState();
  const [SelectedContactData, setSelectedContactData] = useState(null);
  const [pending, setPending] = useState(true);
  const [myAuth, setMyAuth] = useState(false);

  const fetchData = async (userId) => {
    try {
      const documentRef = doc(db, 'Users', userId);
      const docSnapshot = await getDoc(documentRef);
      const userData = docSnapshot.data();
      // console.log(userData);
      setUserDBData(userData);
      console.log(userData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setPending(false);
    }
  };
  const fetchUserData = async (userId) => {
    console.log(userId);
    try {
      await axios.get(`https://vet-ro-server.vercel.app/getSingleUser/${userId}`)
        .then(response => {
          console.log(response.data.message);
          setUserDBData(response.data.message)
          setPending(false);
        })
        .catch(error => {
          console.error('Error:', error);
          setPending(false);
        });


      setPending(false);

      // setUserDBData(userData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setPending(false);
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
    const locStor = localStorage.getItem('token')
    if (locStor) {
      const decoded = jwtDecode(locStor)
    setUserObj(decoded)
    console.log(decoded);
    fetchUserData(decoded.uid)
    }else{
      console.log("no token");
      localStorage.clear()
    }
    setPending(false)
  }, []);

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
    setCurrentDevice,
    SelectedContactData,
    setSelectedContactData
  };

  return (
    <MyContext.Provider value={contextValue}>
      {props.children}
    </MyContext.Provider>
  )
}
