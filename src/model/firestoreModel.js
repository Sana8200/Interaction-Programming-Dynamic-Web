/**
 * Firestore Model
 * Handles persistence of model state to Firebase Firestore
 */
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebaseConfig.js";
import { onAuthChange } from "/src/Authservice.js";

const COLLECTION = "dinnerModel";

// Expose key functions to the window for easy testing/debugging
window.db = db;
window.doc = doc;
window.setDoc = setDoc;
window.onSnapshot = onSnapshot;

/**
 * Connect model to Firestore persistence
 * @param {object} model - The reactive model
 * @param {function} watchFunction - MobX reaction function
 */
export function connectToPersistence(model, watchFunction) {
    let unsubscribeSnapshot = null;
    let unsubscribeReaction = null;

    onAuthChange((user) => {
        // Cleanup previous listeners
        if (unsubscribeSnapshot) {
            unsubscribeSnapshot();
            unsubscribeSnapshot = null;
        }
        if (unsubscribeReaction) {
            unsubscribeReaction();
            unsubscribeReaction = null;
        }

        if (user) {
            handleUserLogin(user, model, watchFunction);
        } else {
            handleUserLogout(model);
        }
    });

    function handleUserLogin(user, model, watchFunction) {
        model.setUser(user);
        model.setReady(false);

        const userDoc = doc(db, COLLECTION, user.uid);

        // First: Load data from Firestore
        unsubscribeSnapshot = onSnapshot(
            userDoc,
            (snapshot) => {
                const data = snapshot.data();
                
                if (data) {
                    // Load existing data
                    model.numberOfGuests = data.numberOfGuests ?? 2;
                    model.dishes = data.dishes ?? [];
                    model.currentDishId = data.currentDishId ?? null;
                } else {
                    // New user - initialize with defaults and save
                    model.numberOfGuests = 2;
                    model.dishes = [];
                    model.currentDishId = null;
                    
                    // Create initial document for new user
                    setDoc(userDoc, {
                        numberOfGuests: 2,
                        dishes: [],
                        currentDishId: null
                    }).catch(err => console.error("Failed to create initial doc:", err));
                }

                // Mark as ready AFTER loading data
                if (!model.ready) {
                    model.setReady(true);
                    
                    // Setup save reaction AFTER first load completes
                    setupSaveReaction();
                }
            },
            (error) => {
                console.error("Firestore listener error:", error);
                model.setReady(true); // Allow UI to work even if persistence fails
            }
        );

        function setupSaveReaction() {
            // Watch for changes and save to Firestore
            unsubscribeReaction = watchFunction(
                // What to watch
                () => [model.numberOfGuests, model.dishes, model.currentDishId],
                // What to do when it changes
                () => {
                    if (!model.ready) return;
                    
                    const dataToSave = {
                        numberOfGuests: model.numberOfGuests,
                        dishes: model.dishes,
                        currentDishId: model.currentDishId
                    };

                    setDoc(userDoc, dataToSave, { merge: true })
                        .then(() => console.log("Data saved to Firestore"))
                        .catch((err) => console.error("Save failed:", err));
                },
                // Options: don't fire immediately (we just loaded)
                { fireImmediately: false }
            );
        }
    }

    function handleUserLogout(model) {
        model.setUser(null);
        model.resetToDefaults();
        model.setReady(true);
    }
}
