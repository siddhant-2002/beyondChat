// Import the functions you need from the SDKs you need


import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDWIhaETmUsy0K_Hk2HU362DBTCEmQxfzU",
  authDomain: "beyondchat-ab46f.firebaseapp.com",
  projectId: "beyondchat-ab46f",
  storageBucket: "beyondchat-ab46f.firebasestorage.app",
  messagingSenderId: "1072350657144",
  appId: "1:1072350657144:web:bb0e8a1c1b146c5bd08b8d",
  measurementId: "G-SZFL5PB8G4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);