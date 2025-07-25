// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 🔁 Replace these with your actual config values from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAV6BAg6gzlET9Hb6Mynuc6ydjk1KEWoao",
  authDomain: "phantom-grid.firebaseapp.com",
  projectId: "phantom-grid",
  storageBucket: "phantom-grid.firebasestorage.app",
  messagingSenderId: "110293104496",
  appId: "1:110293104496:web:39172aa50ebd2d670c41b5",
  measurementId: "G-2HZPDMWK13"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
