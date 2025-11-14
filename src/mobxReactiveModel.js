import "/src/teacherFetch.js"; // protection against fetch() in infinite loops
import { observable, configure } from "mobx";
configure({ enforceActions: "never", });  // we don't use Mobx actions in the Lab


import { model } from "/src/DinnerModel.js";    // Import the javascript model 

export const reactiveModel = observable(model);    // reactive model setup
// reactive model setup uses observable from mobx to export the model (application state) to the app 



// ------ for Lab debug purposes ----------
// making the reactive model available at the browser JavasScript Console
window.myModel= reactiveModel;

// making some example dishes available 
import {dishesConst} from "/src/dishesConst.js";
window.dishesConst= dishesConst;

//myModel.addToMenu(dishesConst[2]); //You can test with more/different dishes
// Bootstrapping, setting up the inital state (index.js)
myModel.addToMenu(dishesConst[0]);
myModel.addToMenu(dishesConst[1]);
myModel.addToMenu(dishesConst[2]);
myModel.addToMenu(dishesConst[3]);
myModel.addToMenu(dishesConst[4]);
myModel.addToMenu(dishesConst[5]);
myModel.addToMenu(dishesConst[6]);
myModel.addToMenu(dishesConst[7]);
