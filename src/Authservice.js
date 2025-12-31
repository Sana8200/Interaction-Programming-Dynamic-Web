/**
 * Authentication Service
 * Centralized Firebase authentication logic - presenters call these simple functions.
 */
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import { auth } from "./config/firebaseConfig.js";

/**
 * Login with email and password
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<{success: boolean, user?: object, error?: string}>}
 */
export async function loginWithEmail(email, password) {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return { success: true, user: result.user };
    } catch (err) {
        const errorMessages = {
            "auth/invalid-credential": "Invalid email or password.",
            "auth/wrong-password": "Invalid email or password.",
            "auth/too-many-requests": "Too many attempts. Try again later.",
            "auth/user-not-found": "No account found with this email.",
        };
        return { 
            success: false, 
            error: errorMessages[err.code] || "Login failed. Please try again." 
        };
    }
}

/**
 * Sign up with email and password
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<{success: boolean, user?: object, error?: string}>}
 */
export async function signupWithEmail(email, password) {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        return { success: true, user: result.user };
    } catch (err) {
        const errorMessages = {
            "auth/email-already-in-use": "An account with this email already exists.",
            "auth/invalid-email": "Invalid email address.",
            "auth/weak-password": "Password must be at least 6 characters.",
        };
        return { 
            success: false, 
            error: errorMessages[err.code] || "Signup failed. Please try again." 
        };
    }
}

/**
 * Logout the current user
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function logout() {
    try {
        await signOut(auth);
        return { success: true };
    } catch (err) {
        return { success: false, error: "Logout failed." };
    }
}

/**
 * Listen for authentication state changes
 * @param {function} callback - Called with user object (or null) when auth state changes
 * @returns {function} Unsubscribe function
 */
export function onAuthChange(callback) {
    return onAuthStateChanged(auth, callback);
}
