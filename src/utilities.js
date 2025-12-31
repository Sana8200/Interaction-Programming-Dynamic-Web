/**
 * Utility Functions
 * Sorting, filtering, and calculation helpers
 */

const KNOWN_DISH_TYPES = ["starter", "main course", "dessert"];
const TYPE_ORDER = { "": 0, "starter": 1, "main course": 2, "dessert": 3 };

/**
 * Compare ingredients for sorting (by aisle, then by name)
 */
export function compareIngredientsCB(a, b) {
    if (a.aisle < b.aisle) return -1;
    if (a.aisle > b.aisle) return 1;
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
}

/**
 * Sort ingredients by aisle and name
 * @param {Array} ingredients
 * @returns {Array} Sorted copy
 */
export function sortIngredients(ingredients) {
    return [...ingredients].sort(compareIngredientsCB);
}

/**
 * Check if dish type is recognized
 */
export function isKnownTypeCB(type) {
    return KNOWN_DISH_TYPES.includes(type);
}

/**
 * Get the primary dish type (starter, main course, or dessert)
 * @param {object} dish
 * @returns {string} Dish type or empty string
 */
export function dishType(dish) {
    if (!dish.dishTypes) return "";
    const knownType = dish.dishTypes.find(isKnownTypeCB);
    return knownType || "";
}

/**
 * Compare dishes for sorting (by type order)
 */
export function compareDishesCB(a, b) {
    return TYPE_ORDER[dishType(a)] - TYPE_ORDER[dishType(b)];
}

/**
 * Sort dishes by type (starter → main course → dessert)
 * @param {Array} dishes
 * @returns {Array} Sorted copy
 */
export function sortDishes(dishes) {
    return [...dishes].sort(compareDishesCB);
}

/**
 * Calculate total menu price
 * @param {Array} dishes
 * @returns {number} Total price per serving
 */
export function menuPrice(dishes) {
    return dishes.reduce((total, dish) => total + dish.pricePerServing, 0);
}

/**
 * Generate shopping list from dishes
 * Aggregates ingredients by ID, summing amounts
 * @param {Array} dishes
 * @returns {Array} Aggregated ingredients
 */
export function shoppingList(dishes) {
    const ingredientMap = {};

    dishes
        .flatMap(dish => dish.extendedIngredients)
        .forEach(ingredient => {
            if (ingredientMap[ingredient.id]) {
                ingredientMap[ingredient.id].amount += ingredient.amount;
            } else {
                ingredientMap[ingredient.id] = { ...ingredient };
            }
        });

    return Object.values(ingredientMap);
}


