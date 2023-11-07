// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBdHNpb-aSMvR8KNCuInVWICWoBBJ6Rsbk",
  authDomain: "aigen-353fb.firebaseapp.com",
  projectId: "aigen-353fb",
  storageBucket: "aigen-353fb.appspot.com",
  messagingSenderId: "883036972026",
  appId: "1:883036972026:web:23be2f6a62ecb41f097a43",
  measurementId: "G-NKHPZ9WVDN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth,provider};
