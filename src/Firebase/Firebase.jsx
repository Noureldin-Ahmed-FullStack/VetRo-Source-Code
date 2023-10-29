// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7E6p13qq-TGp8qFUmFi4etCwqEl829cQ",
  authDomain: "vetro-chat.firebaseapp.com",
  projectId: "vetro-chat",
  storageBucket: "vetro-chat.appspot.com",
  messagingSenderId: "1034295472704",
  appId: "1:1034295472704:web:e7fa6d9bc798cc95a725a5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();