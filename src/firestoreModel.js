import { initializeApp } from "firebase/app";     // Imports Firebase initialization
import { getFirestore, doc, setDoc, onSnapshot } from "firebase/firestore";    // Imports Firestore functions
import { firebaseConfig } from "/src/firebaseConfig.js";    // Imports specific Firebase credentials

// Initialize a Firebase application instance
const app = initializeApp(firebaseConfig);

// Get the key to the Firestore database service
const db = getFirestore(app);

// Expose key functions to the window for easy testing/debugging
window.db = db;
window.doc = doc;
window.setDoc = setDoc;
window.onSnapshot = onSnapshot;

// Defines the collection path and document name for user data
const COLLECTION = "dinnerModel795";

// Connects model changes to Firestore (Save/Load logic)
export function connectToPersistence(model, watchFunction) {

    // Returns the three model properties that need to be persisted
    function watchDataACB() {
        return [model.numberOfGuests, model.dishes, model.currentDishId];
    }

    // Reference to the specific document path for this user/app
    const theDoc = doc(db, COLLECTION, "Menu");

    // Side effect to run when model data changes (triggers watchFunction)
    function saveToFireStoreACB() {
        // Prevents saving while data is still loading (initial read)
        if (!model.ready) {
            return;
        }
        const dataToSave = {
            numberOfGuests: model.numberOfGuests,
            dishes: model.dishes,
            currentDishId: model.currentDishId
        };
        // Save the data to Firestore, merging with existing fields
        setDoc(theDoc, dataToSave, { merge: true });
    }

    // Set up MobX/Vue reaction: when watchDataACB changes, call saveToFireStoreACB
    watchFunction(watchDataACB, saveToFireStoreACB);

    // Block saving until initial load is complete
    model.ready = false;


    // This callback is called immediately with the current data, everytime data changes in firestore to process data retrived from firestore
    function readSnapShotACB(snapshot) {
        // Use persisted data or default values (2, [], null)
        const data = snapshot.data() || {};
        model.numberOfGuests = data?.numberOfGuests || 2;      
        model.dishes = data?.dishes || [];
        model.currentDishId = data?.currentDishId || null;
        model.ready = true;      // Data is loaded, unblock saving/UI
    }
    
    function onSnapshotErrorACB(error) {
        console.error("Error listening to persistence:", error);
        model.ready = true;   
    }
    
    onSnapshot(theDoc, readSnapShotACB, onSnapshotErrorACB);        // real-time listener

}