// import { getAuth, setPersistence, browserSessionPersistence, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
// const auth = getAuth();
//   const provider = new GoogleAuthProvider();
//   const isRedirecting = new URLSearchParams(window.location.search).has('mode');
//   if (!isRedirecting) {
// // Enable session persistence
// setPersistence(auth, browserSessionPersistence)
//   .then(() => {
//     // Session persistence successfully enabled
//     console.log("Persistence")
//     signInWithRedirect(auth, provider);
//   })
//   .catch((error) => {
//     // Handle errors
//     console.error('Error enabling persistence:', error);
//   });
// }
// import { getAuth, setPersistence, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";

// const auth = getAuth();
// setPersistence(auth, )
//   .then(() => {
//     const provider = new GoogleAuthProvider();
//     // In memory persistence will be applied to the signed in Google user
//     // even though the persistence was set to 'none' and a page redirect
//     // occurred.
//     return signInWithRedirect(auth, provider);
//   })
//   .catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });