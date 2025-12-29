import "/src/teacherFetch.js"; // protection against fetch() in infinite loops
import { reaction, observable, configure } from "mobx";
import {dishesConst} from "/src/dishesConst.js";
import { model } from "/src/DinnerModel.js";    // Import the javascript model 
import { connectToPersistence } from "./firestoreModel";
configure({ enforceActions: "never", });  // we don't use Mobx actions in the Lab


// reactive model setup uses observable from mobx to export the model (application state) to the app 
export const reactiveModel = observable(model);   

// making the reactive model available at the browser JavasScript Console
window.myModel= reactiveModel;
window.dishesConst= dishesConst;

// Connecting to Persistence. Passing the side effect watcher ensures that our firestoreModel does not depend on your reactive object technology.
connectToPersistence(reactiveModel, reaction);


/*
// Inittial Search 
myModel.doSearch({});
*/
