/* 
   The Model keeps the state of the application (Application State). 
   It is an abstract object, i.e. it knows nothing about graphics and interaction.
*/
import { resolvePromise } from "./resolvePromise.js";
import { searchDishes, getDishDetails } from "./dishSource.js";      


export const model = {  
    numberOfGuests: 2,
    dishes: [],
    currentDishId: null,  // null means "intentionally empty"

    // defining searchParam and searchResultPromiseState model property (value an empty object)
    searchParams: {},
    searchResultsPromiseState:{},

    // Stores details of the currently selected dish
    currentDishPromiseState: {},


    setCurrentDishId(dishId){
        this.currentDishId= dishId;     // Set the model current dish ID
    },
    
    setNumberOfGuests(number){     
        if (!Number.isInteger(number) || number < 1){         // Only accepts integers larger than zero
            throw new Error ("number of guests not a positive integer");
        }
        this.numberOfGuests = number;    // Set the number of guests 
    },
    
    addToMenu(dishToAdd){
        // array spread syntax exercise
        // It sets this.dishes to a new array [   ] where we spread (...) the elements of the existing this.dishes
        this.dishes= [...this.dishes, dishToAdd];   // Creates a new array, putting all the old dishes back in and add dishToAdd at the end 
    },



    // filter callback exercise
    removeFromMenu(dishToRemove){
        function shouldWeKeepDishCB(dish){
            // We will not keep the dish that has the same id as dishToRemove if any
            return dish.id !== dishToRemove.id;   // returns true for every dish except the one to remove 
        }
        this.dishes= this.dishes.filter(shouldWeKeepDishCB);   // filter creates a new array, keeping only the dishes which returned true
    },
    

    // Takes a string as a parameter and sets it to the query property of searchParams
    setSearchQuery(query){
        this.searchParams.query = query;
    },

    // Takes a string as a parameter and sets it to the types property of searchParams 
    setSearchType(type){
        this.searchParams.type = type;
    },

    // Takes an object as a parameter, invokes a promise and stores data
    doSearch(params){
        const searchPromise = searchDishes(params);
        resolvePromise(searchPromise, this.searchResultsPromiseState);   
    },


    currentDishEffect(){
        if(this.currentDishId){
            // what should happen everytime currentDishId changes
            const promise = getDishDetails(this.currentDishId);
            resolvePromise(promise, this.currentDishPromiseState);
        } else {
            // don't initiate api call if id is falsy 
            resolvePromise(undefined, this.currentDishPromiseState);
        }      
    }
};



