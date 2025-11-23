import { initializeApp } from "firebase/app";     // Initialize firebase app, telling firebase library to wake up, importing it 
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";    // getFirestore for accessing the specific datatbase service
import { firebaseConfig } from "/src/firebaseConfig.js";    // Contais specific keys (API key, Project ID) so Good knows it's me asking for access 

// creating an active firebase application instance using the config key 
const app = initializeApp(firebaseConfig);

// and then for that app, we get the key to the firestore database 
const db = getFirestore(app);

// Exporting (db(database), doc(document), setDoc(writing data to doc), getDoc(reading data to doc)) to window for testing 
window.db = db;                
window.doc = doc;              
window.setDoc = setDoc;        
window.getDoc = getDoc;       

// defines specific folder, ensuring it goes to my box (by my canvas ID), for organizing 
const COLLECTION = "dinnerModel795";

// Logic for connecting to could and saving and getting datat. parameters: model(not the model from DinnerModel), watchFunction (reactions in react)
export function connectToPersistence(model, watchFunction) {

    // Return a combination of the 3 model properties that we persist
    function watchDataACB() {
        return [model.numberOfGuests, model.dishes, model.currentDishId];
    }

    // setting the document to save using database, a document COLLECTION, the document name 
    const theDoc = doc(db, COLLECTION, "Menu");

    // Save to Firestore when data changes (persisting the imporatant data of the model)
    function saveToFireStoreACB() {
        // model.ready a property that will be managed by persistence, side effect only saves to persistance if model.ready is TRUE
        if (!model.ready) {
            return;
        }
        const dataToSave = {
            numberOfGuests: model.numberOfGuests,
            dishes: model.dishes,
            currentDishId: model.currentDishId
        };
        setDoc(theDoc, dataToSave, { merge: true });
    }

    // Application Side Effect. Watcher function activation (If watchDataACB changes, saveToFireStoreACB will happens and save data)
    watchFunction(watchDataACB, saveToFireStoreACB);

    // getDoc to read from fireStore, we set the model.ready to false to prevent read-write race conditions (model.ready is false while reading)
    model.ready = false;

    // Reading data from cloud, exporting data from snapshot
    function readSnapShotACB(snapshot) {
        // default : 2, null, empty array
        const data = snapshot.data() || {};
        model.numberOfGuests = data?.numberOfGuests || 2;      
        model.dishes = data?.dishes || [];
        model.currentDishId = data?.currentDishId || null;

        model.ready = true;    // Set it true, ensuring the app is loading and works even after if there is problem in data 
    }

    // Error Handling
    function getDocErrorACB(error) {
        console.error("Error reading from persistence:", error);
        model.ready = true;    // We set it true, because we don't want user to know about error, so ensuring app is loading and works even after error 
    }

    // Read data from the cloud, getDoc will return a promise so we need to resolve it using the ACB functions 
    getDoc(theDoc).then(readSnapShotACB).catch(getDocErrorACB);
}
