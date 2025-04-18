import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Firebase configuration (replace with your credentials)
const firebaseConfig = {
    apiKey: "AIzaSyBzRuCetPIyiB0IzAEPHuMUHkiMqNug7sY",
    authDomain: "keepme-only.firebaseapp.com",
    projectId: "keepme-only",
    storageBucket: "keepme-only.firebasestorage.app",
    messagingSenderId: "1007359821453",
    appId: "1:1007359821453:web:5d644c6a4565e4535704c4",
    measurementId: "G-H7ZKW33E29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Authentication
const provider = new GoogleAuthProvider();
const db = getFirestore(app);


// Export for use in other components
export { auth, db, provider, signInWithPopup, signOut };


