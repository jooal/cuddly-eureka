import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import devConfigs from "env/dev.json"
import prodConfigs from "env/prod.json"
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
  "prod": prodConfigs.firebase,
  "dev": devConfigs.firebase
}[process.env.NODE_ENV] || devConfigs.firebase

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
