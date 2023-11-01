import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB7E6p13qq-TGp8qFUmFi4etCwqEl829cQ",
    authDomain: "vetro-chat.firebaseapp.com",
    projectId: "vetro-chat",
    storageBucket: "vetro-chat.appspot.com",
    messagingSenderId: "1034295472704",
    appId: "1:1034295472704:web:e7fa6d9bc798cc95a725a5"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  export {auth, provider};