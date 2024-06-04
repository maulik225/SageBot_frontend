// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChcqk4JnNx3yftpcqaNmfmsAYEB4Iui6w",
  authDomain: "sagebot-4fd0e.firebaseapp.com",
  projectId: "sagebot-4fd0e",
  storageBucket: "sagebot-4fd0e.appspot.com",
  messagingSenderId: "1096710458045",
  appId: "1:1096710458045:web:fdedf1627b4080b11245d4",
  measurementId: "G-9G1VJNQEBV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
const provider = new GoogleAuthProvider();
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup,provider };
