import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

import { auth } from "./firebase"; // Import initialized auth from firebase.js


// Google Sign-In
const signInWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        provider.addScope("profile"); // Request profile information
        provider.addScope("email");   // Request email information
        const result = await signInWithPopup(auth, provider);
        // Wait for Firebase to update the user state
        await new Promise((resolve) => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    resolve(user);
                    unsubscribe();
                }
            });
        });
        console.log("User Info:", result.user); // Debugging: Check user info
    } catch (error) {
        console.error("Error signing in:", error.message);
    }
};


// Function to update the user menu dynamically
function updateUserMenu(user) {
    const userEmail = document.getElementById("user-email");
    const userPic = document.getElementById("user-pic");
    const userName = document.getElementById("user-name");


    if (user && userEmail && userName && userPic) {
        // User is signed in
        userEmail.textContent = user.email || "No Email";
        userPic.src = user.photoURL || "../assets/user.png";
        userName.textContent = user.displayName || "No Name";
    } else if (userName && userEmail && userPic) {
        // User is signed out
        userEmail.textContent = "Not logged in";
        userPic.src = "../assets/user.png";
        userName.textContent = "Guest";
    }
}

// Check authentication state
onAuthStateChanged(auth, (user) => {
    updateUserMenu(user);
});

const logout = async () => {
    try {
        await signOut(auth);
        updateUserMenu(null);
        console.log("User signed out");
    } catch (error) {
        console.error("Error signing out:", error.message);
    }
};

export { signInWithGoogle, logout };
