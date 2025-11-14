/* 
   The Model keeps the state of the application (Application State). 
   It is an abstract object, i.e. it knows nothing about graphics and interaction.
*/
export const model = {  
    numberOfGuests: 2,
    dishes: [],
    currentDishId: null,  // null means "intentionally empty"

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
    
 
    // more methods will be added here, don't forget to separate them with comma!
};