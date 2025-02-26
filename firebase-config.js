// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getDatabase, ref, set, get, onValue } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbH67CgYGYJv4FXrtWYKiWA8ACTXK5shE",
  authDomain: "pol-me.firebaseapp.com",
  databaseURL: "https://pol-me-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pol-me",
  storageBucket: "pol-me.firebasestorage.app",
  messagingSenderId: "447211103879",
  appId: "1:447211103879:web:2a9362f2470a10663aba22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export { db, ref, set, get, onValue };