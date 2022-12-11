// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithRedirect, getRedirectResult } from "firebase/auth";


// fire base register object
export const firebaseConfig = {
  apiKey: "AIzaSyCugOyQBIeB73hpJwzWEUYgfoEbHUr5HBE",
  authDomain: "gontop-7c932.firebaseapp.com",
  projectId: "gontop-7c932",
  storageBucket: "gontop-7c932.appspot.com",
  messagingSenderId: "497628204317",
  appId: "1:497628204317:web:0c2367066ce7554f13e5f4",
  measurementId: "G-DDVWL81CB4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


const auth = getAuth();
const provider = new GoogleAuthProvider();

export function signupWithGoogle() {
    signInWithRedirect(auth, provider);

}

export const siginRedirectResult = () => {
    getRedirectResult(auth)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      console.log("redirect user ", user);
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(error);
    });
}



export function signInWithGooglePopUp(cb) {
  signInWithPopup(auth, provider)
  .then((result) => {
    cb(false,result);
  }).catch((error) => {
    cb(true, error);
  });
}
