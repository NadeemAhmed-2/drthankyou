import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection,addDoc,getDoc,doc,onSnapshot } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCCfg9MPb7GnHueSoOBIIcxc72KdFnqLXA",
  authDomain: "drthankyou-62330.firebaseapp.com",
  projectId: "drthankyou-62330",
  storageBucket: "drthankyou-62330.firebasestorage.app",
  messagingSenderId: "429670750883",
  appId: "1:429670750883:web:fb1f65228535fc8f663d16",
  measurementId: "G-3VDM5Y00X4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); 
// Firebase authentication functions
export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = () => {
  return signOut(auth);
};
export {collection,addDoc,getDoc,doc,onSnapshot};