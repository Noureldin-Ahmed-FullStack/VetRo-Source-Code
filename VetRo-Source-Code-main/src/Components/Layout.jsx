import React, { useContext } from 'react'
import NavbarComponent from './NavbarComponent'
// import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { MyContext } from './ContextProvider'
// import { useAuthState } from 'react-firebase-hooks/auth';

// import { onAuthStateChanged } from 'firebase/auth';
// import { app, auth } from '../Firebase/firebase';

export default function Layout() {
  // let { profilePhotoURL, setprofilePhotoURL } = useContext(MyContext)
  const { pending, setPending } = useContext(MyContext);
  // let { myAuth, setMyAuth } = useContext(MyContext)
  // const [user] = useAuthState(auth)

  // useEffect(() => {
  //   if (user) {
  //     setUserObj(user);
  //     setMyAuth("Logged in")
  //     setprofilePhotoURL(user.photoURL);
  //     console.log(user);
  //   } else {
  //     setMyAuth("Not Logged in")
  //     setUserObj(null);
  //     setprofilePhotoURL("https://ssniper.sirv.com/Images/3.png");
  //   }
  // }, [user]);


  // if (user) {
  //   setUserObj(user)
  //   if (userObj !== null && userObj.photoURL) {
  //     setMyAuth("Logged in")
  //     setprofilePhotoURL(userObj.photoURL);
  //   }
  //   // setprofilePhotoURL(userObj.photoURL)
  // }
   //}
  // onAuthStateChanged(auth, (currentUser) => {
  //   if (currentUser != null) {
  //     setUserObj(currentUser)
  //     setMyAuth("Logged in")
  //     console.log(userObj);
  //     if (userObj !== null && userObj.photoURL) {
  //       setprofilePhotoURL(userObj.photoURL);
  //     }
  //     // setprofilePhotoURL(userObj.photoURL)
  //   }

  // })

  return (
    <>
     {pending ? (
         <div className='loading'>
         <div id="loading">
           <div className="sk-cube-grid">
             <div className="sk-cube sk-cube1" />
             <div className="sk-cube sk-cube2" />
             <div className="sk-cube sk-cube3" />
             <div className="sk-cube sk-cube4" />
             <div className="sk-cube sk-cube5" />
             <div className="sk-cube sk-cube6" />
             <div className="sk-cube sk-cube7" />
             <div className="sk-cube sk-cube8" />
             <div className="sk-cube sk-cube9" />
           </div>
         </div>
       </div>
      ) : (
        <>
      <div className='tall GreenishBG'>
        <Outlet />
      </div>
      <NavbarComponent />
      </>
      )}
    </>
  )
}
