// Instead of writing Firebase auth code in every presenter, we put it all here. Presenters just call these simple functions.
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import { auth } from "/src/config/firebaseConfig.js";

// login, takes email and password and tries to log in the user 
export async function loginWithEmail(email, password) {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return { success: true, user: result.user };
    } catch (err) {
        // Login failed - convert Firebase error codes messages for the user 
        let errorMessage = "Login failed. Please try again.";

        if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
            errorMessage = "Invalid email or password.";
        } else if (err.code === "auth/too-many-requests") {
            errorMessage = "Too many attempts. Try again later.";
        } else if (err.code === "auth/user-not-found") {
            errorMessage = "No account found with this email.";
        }
        return { success: false, error: errorMessage };
    }
}

// signpu, takes email and password, creates a new user account 
export async function signupWithEmail(email, password) {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        return { success: true, user: result.user };
    } catch (err) {
        // Signup failed - convert Firebase error codes to messages
        let errorMessage = "Signup failed. Please try again.";

        if (err.code === "auth/email-already-in-use") {
            errorMessage = "An account with this email already exists.";
        } else if (err.code === "auth/invalid-email") {
            errorMessage = "Invalid email address.";
        } else if (err.code === "auth/weak-password") {
            errorMessage = "Password must be at least 6 characters.";
        }
        return { success: false, error: errorMessage };
    }
}

// logou the current user
export async function logout() {
    try {
        await signOut(auth);
        return { success: true };
    } catch (err) {
        return { success: false, error: "Logout failed." };
    }
}

// LISTEN FOR LOGIN/LOGOUT, with this we don't need to manually check, if user logged in, firebase will tell us when it changes 
export function onAuthChange(callback) {
    return onAuthStateChanged(auth, callback);
}