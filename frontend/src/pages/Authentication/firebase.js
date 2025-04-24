// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyANLFwy1pwP8QdHjG5ySpchqE51NZMZnR8",
  authDomain: "e-commerce-b599e.firebaseapp.com",
  projectId: "e-commerce-b599e",
  appId: "1:135624701088:web:eac51a43ae29a1cfbec5c5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => signInWithPopup(auth, provider);
