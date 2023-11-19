// useFirebaseAuth.js
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signOut, signInWithPopup } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import { MyContext } from './ContextProvider'
import { auth, provider, app, db } from '../Firebase/firebase';
import { InsertUserData } from './InsertToUsers';
import { addDoc, collection, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const authentic = getAuth(app);

export function UseFirebaseAuth() {
  const [user, setUser] = useState(null);
  // const { profilePhotoURL, setprofilePhotoURL } = useContext(MyContext);
  // const { myAuth, setMyAuth } = useContext(MyContext);
  const { userObj, setUserObj } = useContext(MyContext);
  const usersRef = collection(db, "Users");
  const doctorsRef = collection(db, "Doctors");
  // const petRef = collection(db, "Pets")
  // const petDocumentRef = doc(petRef, "1");


  /*save data of user in db (passant) */
  const InsertUserData = () => {
    console.log(userObj);
    auth.onAuthStateChanged(async (trig) => {
      if (trig) {
        const m = trig.email;
        const UserEmailExistsQuery = query(usersRef, where('email', '==', m));
        const DocEmailExistsQuery = query(doctorsRef, where('email', '==', m));
        const UserEmailExistsResult = await getDocs(UserEmailExistsQuery);
        const DocEmailExistsResult = await getDocs(DocEmailExistsQuery);
        if (UserEmailExistsResult.empty && DocEmailExistsResult.empty) {
          const userDoc = doc(usersRef, trig.uid);
          setDoc(userDoc, {
            uid: trig.uid,
            userName: trig.displayName,
            email: trig.email,
            userPFP: trig.photoURL,
            pets: null,
          }
          );
        }else if(!DocEmailExistsResult.empty){
          // toast("you are a Doctor silly!")
          toast.warn("you are a Doctor silly!", {
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
    });
  }

  const InsertDocData = () => {
    console.log(userObj);
    auth.onAuthStateChanged(async (trig) => {
      if (trig) {
        const m = trig.email;
        const UserEmailExistsQuery = query(usersRef, where('email', '==', m));
        const DocEmailExistsQuery = query(doctorsRef, where('email', '==', m));
        const UserEmailExistsResult = await getDocs(UserEmailExistsQuery);
        const DocEmailExistsResult = await getDocs(DocEmailExistsQuery);

        if (UserEmailExistsResult.empty && DocEmailExistsResult.empty) {
          const DoctorDoc = doc(doctorsRef, trig.uid);
          setDoc(DoctorDoc, {
            uid: trig.uid,
            userName: trig.displayName,
            phoneNumber: null,
            availableFrom: null,
            availableTill: null,
            email: trig.email,
            userPFP: trig.photoURL,
            clinics: null,
          }
          );
        }else if(!UserEmailExistsResult.empty){
          // console.log("you are a user silly!")
          // toast("you are a user silly!")
          toast.warn('you are a user silly!', {
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
    });
  }
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
  const signInWithGoogle = async (isDoctor) => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(authentic, provider);
      // setUserObj(authentic)
      if (isDoctor) {
        InsertDocData()
      }else{
        InsertUserData()
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGoogleAsDoctor = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(authentic, provider);
      // setUserObj(authentic)

      InsertDocData()
    } catch (error) {
      console.error(error);
    }
  };
  const signOutUser = async () => {
    try {
      await signOut(authentic);
      // await setprofilePhotoURL("https://ssniper.sirv.com/Images/3.png") 
      await setUserObj(null)
    } catch (error) {
      console.error(error);
    }
  };

  return { user, signInWithGoogle, signOutUser, updatePetsFieldForUser, signInWithGoogleAsDoctor };
}
