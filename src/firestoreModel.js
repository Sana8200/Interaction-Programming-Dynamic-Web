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

    // Reading data from cloud, exporting data from snapshot, nad setting the new numberOfGuests, dieshes, currentDishID
    function readSnapShotACB(snapshot) {
        const data = snapshot.data() || {};
        // If there is no data, or a problem in data, properties seeting to defauls, nubmerOfGuests to 2, dishes returns empty array, currentDishId returns null 
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





/* Question to ask: 
In the lecture video, it's been told we are not supposed to save all dishes data and we are just supposed to save the dish id to cloud, 
however I implemented that way, but for getting back. the dish details, i needed to call getMenuDetails, and map the ids to get the dish details, 
I implemented this way because it was like this in the lecture video. The way I implemented first website worked, it could save the just dish id, and getting back the dish details, 
however, I didn't pass the unit test related to this part at all, even though i tried many different ways. finallly i decided to just go in an easy and simple 
way which worked. But I just got tired and got confused because this simple thing took me one and half day, I issued a problem and waited for half a day, but got no answer, then
I just implemented the simple way. It's fixed now, but I'm not sure still that are we supposed to save just dish id to the cloud, or the whole dish details works as well?
But generally I couldn't pass the unit tests by saving just dish Ids and reading back and calling gerMenu detals, the web was working excatly how it should but I couldn't pass the unit tests. 
*/