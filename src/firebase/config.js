// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBq7YZUjLMxPut3TPbMpgx397I5PuBFtH0",
  authDomain: "react-journalapp-681a0.firebaseapp.com",
  projectId: "react-journalapp-681a0",
  storageBucket: "react-journalapp-681a0.appspot.com",
  messagingSenderId: "550963734662",
  appId: "1:550963734662:web:58b7940f0e2479826ac907"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const firebaseBD = getFirestore(FirebaseApp);