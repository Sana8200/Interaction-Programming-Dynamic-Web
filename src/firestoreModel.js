import { initializeApp } from "firebase/app";     // Initialize firebase app, telling firebase library to wake up, importing it 
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";    // getFirestore for accessing the specific datatbase service
import { firebaseConfig } from "/src/firebaseConfig.js";    // Contais specific keys (API key, Project ID) so Good knows it's me asking for access 


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.db = db;                
window.doc = doc;              
window.setDoc = setDoc;        
window.getDoc = getDoc;       

const COLLECTION = "MyDinnerModel(private)";


export function connectToPersistence(model, watchFunction) {
    function watchDataACB() {
        return [model.numberOfGuests, model.dishes, model.currentDishId];
    }
    const theDoc = doc(db, COLLECTION, "Planner");
    function saveToFireStoreACB() {
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
    watchFunction(watchDataACB, saveToFireStoreACB);


    model.ready = false;
    function readSnapShotACB(snapshot) {
        const data = snapshot.data() || {};
        model.numberOfGuests = data?.numberOfGuests || 2;      
        model.dishes = data?.dishes || [];
        model.currentDishId = data?.currentDishId || null;
        model.ready = true;    
    }
    function getDocErrorACB(error) {
        console.error("Error reading from persistence:", error);
        model.ready = true;   
    }
    getDoc(theDoc).then(readSnapShotACB).catch(getDocErrorACB);
}





