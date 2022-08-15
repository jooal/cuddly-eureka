import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  signInWithRedirect,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZyla4_LB-iXXOJhuZ7wnihi8job9yn_Q",
  authDomain: "groundwork-b8326.firebaseapp.com",
  projectId: "groundwork-b8326",
  storageBucket: "groundwork-b8326.appspot.com",
  messagingSenderId: "763747430748",
  appId: "1:763747430748:web:cba40687e28cffeacbd199",
  measurementId: "G-WTX4ZV6ZZJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithRedirect(auth, provider)
    .then(result => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;
      const userId = result.user.uid;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
      localStorage.setItem("userId", userId);
    })
    .catch(error => {
      console.log(error);
    });
};

export const userSignOut = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful. Return to read only home page
      console.log("success");
    })
    .catch(error => {
      // An error happened.
      console.log("error");
    });
};

export { db };
