/* 
   The Model keeps the state of the application (Application State). 
   It is an abstract object, i.e. it knows nothing about graphics and interaction.
*/
import { resolvePromise } from "./resolvePromise.js";
import { searchDishes } from "./dishSource.js";

export const model = {
    numberOfGuests: 2,
    dishes: [],
    currentDishId: null,  // null means "intentionally empty"
    searchResultsPromiseState: {},
    user: null,     // The logged-in user object (null = not logged in)
    ready: false,   // Is data loaded from Firebase?

    // Called by firestoreModel when user logs in or out
    setUser(user){
        this.user = user;
    },

    setCurrentDishId(dishId) {
        this.currentDishId = dishId;     // Set the ID of the currently selected dish
    },

    setNumberOfGuests(number) {
        // Only accept positive integers
        if (!Number.isInteger(number) || number < 1) {
            throw new Error("number of guests not a positive integer");
        }
        this.numberOfGuests = number;    // Update guest count
    },

    addToMenu(dishToAdd) {
        // Creates a new array with the new dish appended
        this.dishes = [...this.dishes, dishToAdd];
    },


    removeFromMenu(dishToRemove) {
        function shouldWeKeepDishCB(dish) {
            // Keep the dish if its ID does not match the one to remove
            return dish.id !== dishToRemove.id;
        }
        // Filter creates a new array excluding the dish to remove
        this.dishes = this.dishes.filter(shouldWeKeepDishCB);
    },

    // Executes a search based on current parameters and stores the promise state
    doSearch(params) {
        const searchPromise = searchDishes(params);
        resolvePromise(searchPromise, this.searchResultsPromiseState);
    },

    // Called on logout - resets and clear all user data
    resetToDefaults() {
        this.numberOfGuests = 2;
        this.dishes = [];
        this.currentDishId = null;
        this.ready = false;
    },
};