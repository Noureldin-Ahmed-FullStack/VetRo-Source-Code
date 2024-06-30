import React, { useContext, useEffect } from 'react'
import NavbarComponent from './NavbarComponent'
// import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { MyContext } from './ContextProvider'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Loading from './Loading';
import Sidebar from './Sidebar';
// import { useAuthState } from 'react-firebase-hooks/auth';

// import { onAuthStateChanged } from 'firebase/auth';
// import { app, auth } from '../Firebase/firebase';

export default function Layout() {
  // let { profilePhotoURL, setprofilePhotoURL } = useContext(MyContext)
  const { pending, setPending } = useContext(MyContext);
  const { currentDevice, setCurrentDevice } = useContext(MyContext);
  useEffect(() => {
    console.log("Layout component Updated");
    sessionStorage.clear();
  }, []);

  return (
    <>
      {pending ? (
        <Loading />
      ) : (
        // className={`${currentDevice =='Other' ? 'myPaddingTop' : ''}`}
        <>
          <NavbarComponent />
          <div className={` bg-body-secondary d-flex flex-column flex-grow-1 w-100 ${currentDevice =='Other' ? 'myPaddingTop' : ''}`}>
            <Outlet />
          </div>
          <Sidebar />

        </>
      )}
    </>
  )
}
