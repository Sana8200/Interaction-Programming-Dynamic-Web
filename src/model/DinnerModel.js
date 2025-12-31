/**
 * Dinner Model
 * Core application state - knows nothing about UI/graphics
 */
import { resolvePromise } from "./resolvePromise.js";
import { searchDishes } from "./dishSource.js";

export const model = {
    // State
    numberOfGuests: 2,
    dishes: [],
    currentDishId: null,
    searchResultsPromiseState: {},
    
    // Auth state
    user: null,
    ready: false,

    // Auth methods
    setUser(user) {
        this.user = user;
    },

    setReady(isReady) {
        this.ready = isReady;
    },

    // Dish selection
    setCurrentDishId(dishId) {
        this.currentDishId = dishId;
    },

    // Guest management
    setNumberOfGuests(number) {
        if (!Number.isInteger(number) || number < 1) {
            throw new Error("Number of guests must be a positive integer");
        }
        this.numberOfGuests = number;
    },

    // Menu management
    addToMenu(dish) {
        this.dishes = [...this.dishes, dish];
    },

    removeFromMenu(dishToRemove) {
        this.dishes = this.dishes.filter(dish => dish.id !== dishToRemove.id);
    },

    // Search
    doSearch(params) {
        const searchPromise = searchDishes(params);
        resolvePromise(searchPromise, this.searchResultsPromiseState);
    },

    // Reset on logout
    resetToDefaults() {
        this.numberOfGuests = 2;
        this.dishes = [];
        this.currentDishId = null;
        this.searchResultsPromiseState = {};
        this.ready = false;
    },
};