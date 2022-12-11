/**
 * signup with google
 */

import { GoogleAuthProvider, getAuth, signInWithRedirect } from "firebase/auth";

export default function signupWithGoogle(cb) {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithRedirect(auth, provider)
    .then((result) => {
        // user credential
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // the sign in user info
        const user = result.user;
        cb(user);
    }).catch((error) => {
        // handle error
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        cb(error, credential);

    })

}


