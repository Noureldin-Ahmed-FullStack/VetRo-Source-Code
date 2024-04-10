// useFirebaseAuth.js
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signOut, signInWithPopup } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import { MyContext } from './ContextProvider'
import { auth, provider, app, db } from '../Firebase/firebase';
import { InsertUserData } from './InsertToUsers';
import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const authentic = getAuth(app);

export function UseFirebaseAuth() {
  const [user, setUser] = useState(null);
  
  const { userObj, setUserObj } = useContext(MyContext);
  const { UserDBData, setUserDBData } = useContext(MyContext);
  const usersRef = collection(db, "Users");
 


  /*save data of user in db (passant) */
  const InsertUserData = () => {
    console.log(userObj);
    auth.onAuthStateChanged(async (trig) => {
      if (trig) {        
        const documentRef = doc(db, 'Users', trig.uid);
        const docSnapshot = await getDoc(documentRef);
        if (!docSnapshot.exists()) {
          const userDoc = doc(usersRef, trig.uid);
          setDoc(userDoc, {
            uid: trig.uid,
            userName: trig.displayName,
            email: trig.email,
            userPFP: trig.photoURL,
            pets: null,
            isDoctor: false,
            decided:false,
            createdAt: serverTimestamp()
          }
          );
        } else if (docSnapshot.exists()) {
          const isDoc = docSnapshot.data().isDoctor
          if (isDoc) {
            toast.success(`Welcome Dr. ${docSnapshot.data().userName}!`, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else {
            toast.success(`Welcome ${docSnapshot.data().userName}!`, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        }
      }
    });
  }

  // const InsertDocData = () => {
  //   console.log(userObj);
  //   auth.onAuthStateChanged(async (trig) => {
  //     if (trig) {
  //       const documentRef = doc(db, 'Users', trig.uid);
  //       const docSnapshot = await getDoc(documentRef);
        

  //       if (!docSnapshot.exists()) {
  //         const userDoc = doc(usersRef, trig.uid);

  //         setDoc(userDoc, {
  //           uid: trig.uid,
  //           DoctorName: trig.displayName,
  //           availableFrom: null,
  //           availableTill: null,
  //           clinics:null,
  //           phoneNumber: null,
  //           email: trig.email,
  //           userPFP: trig.photoURL,
  //           isDoctor: true
  //         })

  //       } else if (docSnapshot.exists()) {
  //         const isDoc = docSnapshot.data().isDoctor

  //         if (isDoc) {
  //           toast.success("Welcome!", {
  //             position: "top-center",
  //             autoClose: 5000,
  //             hideProgressBar: false,
  //             closeOnClick: true,
  //             pauseOnHover: true,
  //             draggable: true,
  //             progress: undefined,
  //             theme: "light",
  //           });

  //         } else {
  //           toast.warn("you already have an accout as a user", {
  //             position: "top-center",
  //             autoClose: 5000,
  //             hideProgressBar: false,
  //             closeOnClick: true,
  //             pauseOnHover: true,
  //             draggable: true,
  //             progress: undefined,
  //             theme: "light",
  //           });

  //         }
  //         // console.log("you are a user silly!")
  //         // toast("you are a user silly!")

  //       }
  //     }
  //   });
  // }
  async function updatePetsFieldForUser(newPetsData) {
    const usersCollection = collection(db, 'Users');

    try {
      // Find the specific user document by userId
      // const userQuery = query(usersCollection, where('uid', '==', userId));
      // const userQuerySnapshot = await getDocs(userQuery);
      const userDocRef = doc(usersCollection, userObj.uid);
      if (userDocRef) {
        // Get the reference to the user document
        // const userDoc = userQuerySnapshot.docs[0].ref;

        // Update the "pets" field for the user document
        console.log(userDocRef);
        await updateDoc(userDocRef, {
          pets: newPetsData,
        });

        console.log(`"pets" field updated successfully for user ${userDocRef.id}`);
      } else {
        console.log(`User with ID ${userDocRef.id} not found`);
      }
    } catch (error) {
      console.error('Error updating "pets" field:', error);
    }
  }


  /////////////////
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(authentic, provider);
      // setUserObj(authentic)
      await InsertUserData()
      // if (isDoctor) {
      //   InsertDocData()
      // } else {
      //   InsertUserData()
      // }
    } catch (error) {
      console.error(error);
    }
  };


  const signOutUser = async () => {
    try {
      // await signOut(authentic);
      // await setprofilePhotoURL("https://ssniper.sirv.com/Images/3.png") 
      await setUserObj(null)
      await setUserDBData(null)
      await localStorage.clear()
    } catch (error) {
      console.error(error);
    }
  };

  return { user, signInWithGoogle, signOutUser, updatePetsFieldForUser };
}
