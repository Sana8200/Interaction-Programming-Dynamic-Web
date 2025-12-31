import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "/src/config/firebaseConfig.js";
import { onAuthChange } from "/src/Authservice.js";

// Expose key functions to the window for easy testing/debugging
window.db = db;
window.doc = doc;
window.setDoc = setDoc;
window.onSnapshot = onSnapshot;

// Defines the collection path for user data
const COLLECTION = "dinnerModel795";

// Connects model changes to Firestore (Save/Load logic)
export function connectToPersistence(model, watchFunction) {

    // Store cleanup function for snapshot listener
    let unsubscribeSnapshot = null;

    onAuthChange(function (user) {

        // Clean up previous listener when auth state changes
        if (unsubscribeSnapshot) {
            unsubscribeSnapshot();
            unsubscribeSnapshot = null;
        }

        if (user) {
            // USER LOGGED IN
            model.setUser(user);
            model.ready = false;

            // Wait for Firebase Auth to propagate before accessing Firestore
            setTimeout(function connectToFirestoreACB() {

                // Reference to the user's document: dinnerModel795/{userId}
                const theDoc = doc(db, COLLECTION, user.uid);

                // Returns the three model properties that need to be persisted
                function watchDataACB() {
                    return [model.numberOfGuests, model.dishes, model.currentDishId];
                }

                // Saves data to Firestore when model changes
                function saveToFireStoreACB() {
                    if (!model.ready) {
                        return;
                    }
                    const dataToSave = {
                        numberOfGuests: model.numberOfGuests,
                        dishes: model.dishes,
                        currentDishId: model.currentDishId
                    };
                    // Catch errors silently - next save will work
                    setDoc(theDoc, dataToSave, { merge: true }).catch(function (error) {
                        console.log("Saving, saving in next try");
                    });
                }

                // Set up MobX reaction: when data changes, save to Firestore
                watchFunction(watchDataACB, saveToFireStoreACB);

                // Callback for reading Firestore data
                function readSnapShotACB(snapshot) {
                    const data = snapshot.data() || {};
                    model.numberOfGuests = data?.numberOfGuests || 2;
                    model.dishes = data?.dishes || [];
                    model.currentDishId = data?.currentDishId || null;
                    model.ready = true;
                }

                function onSnapshotErrorACB(error) {
                    console.error("Error listening to persistence:", error);
                    // Still set ready so UI works even if persistence fails
                    model.ready = true;
                }

                // Real-time listener for this user's document
                unsubscribeSnapshot = onSnapshot(theDoc, readSnapShotACB, onSnapshotErrorACB);

            }, 500);  // 500ms delay

        } else {
            // USER LOGGED OUT
            model.setUser(null);
            model.resetToDefaults();
            model.ready = true;
        }
    });
}