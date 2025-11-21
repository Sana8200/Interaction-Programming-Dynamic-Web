// initialize Firebase app, tells the firebase library to wake up, importing it
import { initializeApp } from "firebase/app";

// getFirestor is for accessing the specific database service. Firebase has many services now we just want database 
import {getFirestore, doc, setDoc, getDoc} from "firebase/firestore";

// contains specific keys (API Key, Project ID) so Google knows it's us asking for access.
import {firebaseConfig} from "/src/firebaseConfig.js";
import { getMenuDetails } from "./dishSource";


// creating an active firebase application instance using the config key 
const app= initializeApp(firebaseConfig);

// and then for that app, we get the key to the firestore database 
const db= getFirestore(app);


// Exporting db and other functions to window for testing in teh Console, These are specific tools
window.db = db;                // db now holds the live connection to the cloud 
window.doc = doc;              // points to a specific file  
window.setDoc = setDoc;        // writes data to this file
window.getDoc = getDoc;        // reads data from this file 



// defines specific folder, ensuring it goes to my box (by my canvas ID), for organizing 
const COLLECTION="dinnerModel795";



// the logic for saving specific dinner data 
// Parameters : model ( the model that is first parameter of this function). don't import the model from DinnerModel as it is not reactive 
export function connectToPersistence(model, watchFunction){

    console.log("Persistance is connected");

    // Return a combination of the 3 model properties that we persist
    function watchDataACB(){
        return [model.numberOfGuests, model.dishes, model.currentDishId];
    }

    // setting the document to save using database, a document COLLECTION, the document name 
    const theDoc = doc(db, COLLECTION, "DinnerPlan");

    // Save to Firestore when data changes (persisting the imporatant data of the model)
    function saveToFireStoreACB(){

       // model.ready a property that will be managed by persistence, side effect only saves to persistance if model.ready is TRUE
       if(!model.ready){
            return;
        }

        console.log("Data is Saving to FireStore....")

        const dataToSave = {
            numberOfGuests: model.numberOfGuests,
            dishIDs: model.dishes,
            currentDishId: model.currentDishId,  
        };
        // Sending a fireStore
        setDoc(theDoc, dataToSave, { merge: true });
    } 

    // Application Side Effect. Watcher function activation
    watchFunction(watchDataACB, saveToFireStoreACB);

    // 3. Read from Firestore
    // Set model.ready to false to prevent read-write race conditions (saving while reading)
    model.ready = false; 

    function persistenceToModelACB(data) {
        // Set model properties from data or use defaults if data is missing/null
        model.numberOfGuests = data?.numberOfGuests || 2;
        model.currentDishId = data?.currentDishId || null;

        // Handle dishes
        if (data?.dishIDs && data.dishIDs.length > 0) {
            // If we have dish IDs, fetch the full details from the API
            return getMenuDetails(data.dishIDs).then(function(dishes) {
                model.dishes = dishes;
                // Important: Set ready to true only after dishes are loaded
                model.ready = true;
            });
        } else {
            // No dishes or empty array, set empty and ready
            model.dishes = [];
            model.ready = true;
        }
    }

    function onGetDocACB(snapshot){
        // The test mock might not implement .exists(), so we try to get data directly.
        // In Firestore, .data() returns undefined if the document doesn't exist.
        const dataFromCloud = snapshot.data();    
        if(dataFromCloud) {
            console.log("Data from the cloud:", dataFromCloud);
            return persistenceToModelACB(dataFromCloud);
        } else {
            console.log("No data found in Firestore, initializing with defaults.");
            return persistenceToModelACB(null); // Pass null to trigger defaults
        }
    }

    function onGetDocErrorACB(error) {
        console.error("Error reading from persistence:", error);
        // Ensure app becomes ready even if reading fails, so the user can use it (it will be blank/default)
        model.ready = true; 
    }

    // Read data from the cloud
    getDoc(theDoc)
        .then(onGetDocACB)
        .catch(onGetDocErrorACB);
}