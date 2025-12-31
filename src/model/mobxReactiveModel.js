/**
 * MobX Reactive Model
 * Wraps the plain model with MobX observability
 */
import "../teacherFetch.js"; // Protection against infinite fetch loops
import { reaction, observable, configure } from "mobx";
import { model } from "./DinnerModel.js";
import { connectToPersistence } from "./firestoreModel.js";

// Disable strict mode - we don't use MobX actions in this lab
configure({ enforceActions: "never" });

// Make model reactive
export const reactiveModel = observable(model);

// Connect to Firebase persistence
connectToPersistence(reactiveModel, reaction);

// Debug: expose to browser console
if (typeof window !== 'undefined') {
    window.myModel = reactiveModel;
}
