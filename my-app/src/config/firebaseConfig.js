import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQ72DSNZH2vsoVEImkHo7mOO2HYCQRJPQ",
  authDomain: "poll-creator-6cc8e.firebaseapp.com",
  projectId: "poll-creator-6cc8e",
  storageBucket: "poll-creator-6cc8e.firebasestorage.app",
  messagingSenderId: "904103322609",
  appId: "1:904103322609:web:369453c1a0efb144e49a50",
  measurementId: "G-YVFXL9CLTC"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);