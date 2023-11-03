// useFirebaseAuth.js
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signOut, signInWithPopup } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import { MyContext } from './ContextProvider'
import { auth, provider, app } from '../Firebase/firebase';


const authentic = getAuth(app);

export function UseFirebaseAuth() {
  const [user, setUser] = useState(null);
  const { profilePhotoURL, setprofilePhotoURL } = useContext(MyContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authentic, (user) => {
      if (user) {
        setUser(user);
        setprofilePhotoURL(user.photoURL)
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(authentic, provider);
    } catch (error) {
      console.error(error);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(authentic);
      await setprofilePhotoURL("https://ssniper.sirv.com/Images/3.png")
    } catch (error) {
      console.error(error);
    }
  };

  return { user, signInWithGoogle, signOutUser };
}
