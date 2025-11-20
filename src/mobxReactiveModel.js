import "/src/teacherFetch.js"; // protection against fetch() in infinite loops
import { reaction, observable, configure } from "mobx";
import {dishesConst} from "/src/dishesConst.js";
import { model } from "/src/DinnerModel.js";    // Import the javascript model 

import { connectToPersistence } from "./firestoreModel";


configure({ enforceActions: "never", });  // we don't use Mobx actions in the Lab


// reactive model setup uses observable from mobx to export the model (application state) to the app 
export const reactiveModel = observable(model);    // reactive model setup


// ------ for Lab debug purposes ----------
// making the reactive model available at the browser JavasScript Console
window.myModel= reactiveModel;

window.dishesConst= dishesConst;


// returns the reactive value 
function currentDishIDACB(){
    return reactiveModel.currentDishId;
}

// side effect function whenever the dish ID changes
function currentDishSideEffectACB(){
    return reactiveModel.currentDishEffect();
}
// wathcer reaction for watching changes in currentDishId and triggering side effect    
reaction(currentDishIDACB, currentDishSideEffectACB);


// runs the firestore initialization (connecting persistence), Connecting to persistence. 
// We pass the model and the reaction funciton , allowing firestoreModel to observe changes without importing Mobs directly
// Passing the side effect watcher ensures that our firestoreModel does not depend on your reactive object technology.
connectToPersistence(reactiveModel, reaction);




myModel.doSearch({});

