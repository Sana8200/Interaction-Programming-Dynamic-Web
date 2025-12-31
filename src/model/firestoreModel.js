/**
 * Firestore Model
 * Handles persistence of model state to Firebase Firestore
 */
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebaseConfig.js";
import { onAuthChange } from "../Authservice.js";

const COLLECTION = "dinnerModel";

/**
 * Connect model to Firestore persistence
 * @param {object} model - The reactive model
 * @param {function} watchFunction - MobX reaction function
 */
export function connectToPersistence(model, watchFunction) {
    let unsubscribeSnapshot = null;
    let unsubscribeReaction = null;
    let isFirstLoad = true;

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

        isFirstLoad = true;

        if (user) {
            handleUserLogin(user);
        } else {
            handleUserLogout();
        }
    });

    function handleUserLogin(user) {
        model.setUser(user);
        model.setReady(false);

        const userDoc = doc(db, COLLECTION, user.uid);

        // Set up real-time listener
        unsubscribeSnapshot = onSnapshot(
            userDoc,
            (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.data();
                    
                    // Only update model on first load to avoid loops
                    if (isFirstLoad) {
                        model.numberOfGuests = data.numberOfGuests ?? 2;
                        model.dishes = data.dishes ?? [];
                        model.currentDishId = data.currentDishId ?? null;
                    }
                } else {
                    // Create initial document for new user
                    setDoc(userDoc, {
                        numberOfGuests: 2,
                        dishes: [],
                        currentDishId: null
                    }).catch(err => console.error("Failed to create initial document:", err));
                    
                    model.numberOfGuests = 2;
                    model.dishes = [];
                    model.currentDishId = null;
                }

                // Set ready and setup reaction after first load
                if (isFirstLoad) {
                    isFirstLoad = false;
                    model.setReady(true);
                    setupSaveReaction(userDoc);
                }
            },
            (error) => {
                console.error("Firestore listener error:", error);
                model.setReady(true);
            }
        );
    }

    function setupSaveReaction(userDoc) {
        unsubscribeReaction = watchFunction(
            // What to watch
            () => [
                model.numberOfGuests,
                model.dishes.length,
                JSON.stringify(model.dishes),
                model.currentDishId
            ],
            // What to do when it changes
            () => {
                if (!model.ready) return;

                setDoc(userDoc, {
                    numberOfGuests: model.numberOfGuests,
                    dishes: model.dishes,
                    currentDishId: model.currentDishId
                }, { merge: true }).catch(err => console.error("Save failed:", err));
            },
            { fireImmediately: false }
        );
    }

    function handleUserLogout() {
        model.setUser(null);
        model.resetToDefaults();
        model.setReady(true);
    }
}