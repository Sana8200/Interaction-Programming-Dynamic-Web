/* uncomment the export below to enable the 1.1.2 test suite! */
export function compareIngredientsCB(ingredientA, ingredientB){
    // Compare by aisle
    if(ingredientA.aisle < ingredientB.aisle){
        return -1;     // return negative value if order is correct 
    }
    if(ingredientA.aisle > ingredientB.aisle){
        return 1;     // return positive vlaue if order is reversed 
    }

    // Compare by name, if aisles are the same
    if(ingredientA.name < ingredientB.name) {
        return -1; 
    }
    if(ingredientA.name > ingredientB.name) {
        return 1; 
    }
    return 0;     // return 0 if parameters are equal 
}

export function sortIngredients(ingredients){ 
    const ingredientCopy = [...ingredients];     // creating a clone (copy) of the array, sorted array should not be the same object as original array 
    ingredientCopy.sort(compareIngredientsCB);    // sorting the clone array and passing compareIngredinctsCB as callback, sort(someCB)

    return ingredientCopy;
}

export function isKnownTypeCB(type){
    // don't forget the return keyword (goes for all functions below)
    if(type == "starter" || type == "main course" || type == "dessert" ){     // this function recognizes only starter, main course, dessert 
        return true;     
    }else{
        return false;
    }
}

export function dishType(dish){     // use filter(CB) / find(CB)  to check the given dish has any of the known types  
    if(!dish.dishTypes){    // No dishtye property, return empty string 
        return "";     
    } 

    const knownType = dish.dishTypes.filter(isKnownTypeCB);   // used filter(CB)

    if(knownType.length > 0){     // Checking for known types if any 
        return knownType[0];    // return the first elemetn if any
    } else {
        return "";      // return empty string if no known types 
    }
}


export function compareDishesCB(dishA, dishB){
    const typeOrder = {   // Creating a map to give each type a numberic value 
        "" : 0,   // No type comes first 
        "starter" :  1,
        "main course" : 2,
        "dessert" : 3
    };

    // Using dishType to find type of the dish
    const typeA = dishType(dishA);
    const typeB = dishType(dishB);

    // looking up the numeric value for each type 
    const orderA = typeOrder[typeA];
    const orderB = typeOrder[typeB];

    return orderA - orderB;   // by subtracting we get the correct sort order, -1 correct order, 1 reverse order, 0 equal 
}

export function sortDishes(dishes){
    const dishesCopy = [...dishes];    // clone of the array 

    dishesCopy.sort(compareDishesCB);    // Sort the clone of the array using compareDishesCB callback 

    return dishesCopy;
}

export function menuPrice(dishesArray){
    function calTotalPriceCB(accumulator, dish) {    // Callback made
        // debugger;
        return accumulator + dish.pricePerServing     
    }

    const totalPrice = dishesArray.reduce(calTotalPriceCB, 0);    // call reduce with the callback fist parameter and 0 as second parameter (computing the total starting from zero)

    return totalPrice;
}


export function shoppingList(dishes){
    const result={}; // object used as mapping between ingredient ID and ingredient object

    // we define the callback inside the function, though this is not strictly needed in this case. But see below.
    function keepJustIngredientsCB(dish){
        return dish.extendedIngredients;
    }
    
    // ingredientCB must be defined inside shopingList() because it needs access to `result`
    function ingredientCB(ingredient){
        if(result[ingredient.id] === undefined){  // more general: !result[ingredient.id]
            result[ingredient.id]={...ingredient};
        } else {
            result[ingredient.id].amount +=  ingredient.amount;
        }
    }

    const arrayOfIngredientArrays= dishes.map(keepJustIngredientsCB);
    const allIngredients= arrayOfIngredientArrays.flat();    
    allIngredients.forEach(ingredientCB);

    // the 3 lines above can be written as a function chain:
    // dishes.map(callback1).flat().forEach(callback2);

    // now we transform the result object into an array: we drop the keys and only keep the values
    return Object.values(result);
}

