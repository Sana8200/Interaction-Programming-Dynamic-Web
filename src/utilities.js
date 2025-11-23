
export function compareIngredientsCB(ingredientA, ingredientB){
    // Compare by aisle
    if(ingredientA.aisle < ingredientB.aisle){
        return -1;     // return negative value if order is correct 
    }
    if(ingredientA.aisle > ingredientB.aisle){
        return 1;     
    }

    if(ingredientA.name < ingredientB.name) {
        return -1; 
    }
    if(ingredientA.name > ingredientB.name) {
        return 1; 
    }
    return 0;     // return 0 if parameters are equal 
}

export function sortIngredients(ingredients){ 
    const ingredientCopy = [...ingredients];     
    ingredientCopy.sort(compareIngredientsCB);    

    return ingredientCopy;
}

export function isKnownTypeCB(type){
    if(type == "starter" || type == "main course" || type == "dessert" ){     // this function recognizes only starter, main course, dessert 
        return true;     
    }else{
        return false;
    }
}

export function dishType(dish){    
    if(!dish.dishTypes){    
        return "";     
    } 
    const knownType = dish.dishTypes.filter(isKnownTypeCB);   
    if(knownType.length > 0){    
        return knownType[0];    
    } else {
        return "";      
    }
}



export function compareDishesCB(dishA, dishB){
    const typeOrder = {   // Creating a map to give each type a numberic value 
        "" : 0,   // No type comes first 
        "starter" :  1,
        "main course" : 2,
        "dessert" : 3
    };

    const typeA = dishType(dishA);
    const typeB = dishType(dishB);

    const orderA = typeOrder[typeA];
    const orderB = typeOrder[typeB];

    return orderA - orderB;   // by subtracting we get the correct sort order, -1 correct order, 1 reverse order, 0 equal 
}


export function sortDishes(dishes){
    const dishesCopy = [...dishes];    
    dishesCopy.sort(compareDishesCB);    
    return dishesCopy;
}


export function menuPrice(dishesArray){
    function calTotalPriceCB(accumulator, dish) {    
        // debugger;
        return accumulator + dish.pricePerServing     
    }
    const totalPrice = dishesArray.reduce(calTotalPriceCB, 0);    
    return totalPrice;
}


export function shoppingList(dishes){
    const result={}; 
    function keepJustIngredientsCB(dish){
        return dish.extendedIngredients;
    }
    function ingredientCB(ingredient){
        if(result[ingredient.id] === undefined){ 
            result[ingredient.id]={...ingredient};
        } else {
            result[ingredient.id].amount +=  ingredient.amount;
        }
    }
    const arrayOfIngredientArrays= dishes.map(keepJustIngredientsCB);
    const allIngredients= arrayOfIngredientArrays.flat();    
    allIngredients.forEach(ingredientCB);

    return Object.values(result);
}

