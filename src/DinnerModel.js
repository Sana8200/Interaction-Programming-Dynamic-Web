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
        this.currentDishId= dishId;    
    },
    
    setNumberOfGuests(number){     
        if (!Number.isInteger(number) || number < 1){        
            throw new Error ("number of guests not a positive integer");
        }
        this.numberOfGuests = number;    
    },
    
    addToMenu(dishToAdd){
        this.dishes= [...this.dishes, dishToAdd];  
    },

    // filter callback exercise
    removeFromMenu(dishToRemove){
        function shouldWeKeepDishCB(dish){
            return dish.id !== dishToRemove.id;   // returns true for every dish except the one to remove 
        }
        this.dishes= this.dishes.filter(shouldWeKeepDishCB);   // filter creates a new array, keeping only the dishes which returned true
    },
    
    setSearchQuery(query){
        this.searchParams.query = query;
    },

    setSearchType(type){
        this.searchParams.type = type;
    },

    doSearch(params){
        const searchPromise = searchDishes(params);
        resolvePromise(searchPromise, this.searchResultsPromiseState);   
    },


    currentDishEffect(){
        if(this.currentDishId){
            const promise = getDishDetails(this.currentDishId);
            resolvePromise(promise, this.currentDishPromiseState);
        } else {
            // don't initiate api call if id is falsy 
            resolvePromise(undefined, this.currentDishPromiseState);
        }      
    }
};



