// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA4ZvPNLeKWmcRs9FciHZLpyJeFrqgP-4A",
  authDomain: "otp-531a8.firebaseapp.com",
  projectId: "otp-531a8",
  storageBucket: "otp-531a8.appspot.com",
  messagingSenderId: "687945347725",
  appId: "1:687945347725:web:20118b3b98ff5a9ff6e8c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
