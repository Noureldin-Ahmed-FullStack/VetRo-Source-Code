import React, { createContext, useContext, useState } from 'react';

// Create a context
export let MyContext = createContext();


export default function MyContextProvider(props) {
  let [profilePhotoURL, setprofilePhotoURL] = useState('https://ssniper.sirv.com/Images/3.png');
  const [userObj, setUserObj] = useState(null);
  var [myAuth, setMyAuth] = useState();
  const contextValue = {
    profilePhotoURL,
    setprofilePhotoURL,
    userObj,
    setUserObj,
    myAuth,
    setMyAuth,
  };
  return (
  <MyContext.Provider value={contextValue}>
    {props.children}
  </MyContext.Provider>
  )
}
