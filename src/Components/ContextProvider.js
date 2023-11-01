import React, { createContext, useContext, useState } from 'react';

// Create a context
export let MyContext = createContext();


export default function MyContextProvider(props) {
  let [profilePhotoURL, setprofilePhotoURL] = useState('https://ssniper.sirv.com/Images/3.png');
  return (
  <MyContext.Provider value={{ profilePhotoURL, setprofilePhotoURL }}>
    {props.children}
  </MyContext.Provider>
  )
}
