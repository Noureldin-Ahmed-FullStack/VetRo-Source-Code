import { initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, GoogleAuthProvider, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//     apiKey: "AIzaSyB7E6p13qq-TGp8qFUmFi4etCwqEl829cQ",
//     authDomain: "vetro-chat.firebaseapp.com",
//     projectId: "vetro-chat",
//     storageBucket: "vetro-chat.appspot.com",
//     messagingSenderId: "1034295472704",
//     appId: "1:1034295472704:web:e7fa6d9bc798cc95a725a5"
//   };
// const firebaseConfig = {
//   apiKey: "AIzaSyATrIrxV4zLcM1rZLoaqKXZKHI2URXB-Qw",
//   authDomain: "test-97854.firebaseapp.com",
//   projectId: "test-97854",
//   storageBucket: "test-97854.appspot.com",
//   messagingSenderId: "709799345513",
//   appId: "1:709799345513:web:46533109268a3c414e11f8"
// };
const firebaseConfig = {
  apiKey: "AIzaSyCteOLbcI8mFd0p3qDVx0Mzp4y5cdg6zSY",
  authDomain: "testserver2-7242a.firebaseapp.com",
  projectId: "testserver2-7242a",
  storageBucket: "testserver2-7242a.appspot.com",
  messagingSenderId: "6171993828",
  appId: "1:6171993828:web:b7bce583368e055a312ef1",
  measurementId: "G-B8BX5RCW78"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
setPersistence(auth, browserLocalPersistence);
export { auth, provider, app, db };