// initialize Firebase app, tells the firebase library to wake up, importing it
import { initializeApp } from "firebase/app";

// getFirestor is for accessing the specific database service. Firebase has many services now we just want database 
import {getFirestore, doc, setDoc, getDoc} from "firebase/firestore";

// contains specific keys (API Key, Project ID) so Google knows it's us asking for access.
import {firebaseConfig} from "/src/firebaseConfig.js";

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


    // return a combination (e.g. array) of the 3 model properties that we persist
    function watchDataACB(){
        return [model.numberOfGuests, model.dishes, model.currentDishId];

    }


    // setting the document to save using database, a document COLLECTION, the document name 
    const theDoc = doc(db, COLLECTION, "DinnerPlan");


    // side effect function will be invoked when watchDataACB changes, it'll save the model to firestore
    // whenever one important property of the model changes, we persist(save) (the important parts of) the model
    function saveToFireStoreACB(){

        // mode.ready is the property that will be managed entirely by the persistence, no need to define it in DinnerModel.js
        // We do not want to save the model while it is being read, 
        // to avoid infinite loops since the model is persisted every time it changes, including during reading!
        // The test checks that the side effect only saves to persistence if model.ready is true, so if it's not true, it returns and stops 
        if(!model.ready){
            return;
        }     
        const dataToSave = {
            numberOfGuests: model.numberOfGuests,
            currentDishId: model.currentDishId,
            dishIDs: model.dishes.map(function(dish) {
                return dish.id;
            })   
        };

        // Sending a fireStore
        setDoc(theDoc, dataToSave);
    } 

    // Application Side Effect. Watcher function activation
    watchFunction(watchDataACB, saveToFireStoreACB);

    function displayACB(snapshot){
        const dataFromCloud = snapshot.data();
        appDiv.innerHTML = "Data from the cloud: <pre>"+JSON.stringify(dataFromCloud)+"</pre>";
    }


// read data from the cloud! Returns promise!
    getDoc(theDoc).then(displayACB).catch(console.error);
}

