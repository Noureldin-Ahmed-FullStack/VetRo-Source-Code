// useFirebaseAuth.js
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signOut, signInWithPopup } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import { MyContext } from './ContextProvider'
import { auth, provider, app, db } from '../Firebase/firebase';
import { InsertUserData } from './InsertToUsers';
import { addDoc, collection, doc, getDocs, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const authentic = getAuth(app);

export function UseFirebaseAuth() {
  const [user, setUser] = useState(null);  
  // const { profilePhotoURL, setprofilePhotoURL } = useContext(MyContext);
  // const { myAuth, setMyAuth } = useContext(MyContext);
  const { userObj, setUserObj } = useContext(MyContext);
  const usersRef = collection(db, "Users");
  // const petRef = collection(db, "Pets")
  // const petDocumentRef = doc(petRef, "1");

  

      /*save data of user in db (passant) */
  const InsertUserData = () => {  
    console.log(userObj);
    auth.onAuthStateChanged(async(trig) => {
      if(trig){
      const m = trig.email;
      const emailExistsQuery = query(usersRef, where('email', '==', m));
      const emailExistsResult = await getDocs(emailExistsQuery);
      if (emailExistsResult.empty) {
        addDoc(usersRef, {
      uid: trig.uid,
      userName: trig.displayName,
      email:trig.email,
      userPFP: trig.photoURL,
      pets: null,
    });
  }
}
  });
}



  // useEffect(() => {

  //   const unsubscribe = onAuthStateChanged(authentic, (user) => {
  //     if (user) {
  //       setUser(user);
  //       setprofilePhotoURL(user.photoURL)
  //       setMyAuth("Logged in")
  //     } else {
  //       setUser(null);
  //       setMyAuth("Not Logged in")
  //     }
  //   });

  //   return () => unsubscribe();
  // }, []);
/////////////////
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(authentic, provider);
      // setUserObj(authentic)

      InsertUserData()
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

  return { user, signInWithGoogle, signOutUser };
}
