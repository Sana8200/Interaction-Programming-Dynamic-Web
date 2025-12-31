/**
 * Example dishes for testing - NOT use in production code!
 * Amount: base amount of a single ingredient for one serving
 */
export const dishesConst = [
    {
        id: 1,
        title: "French toast",
        dishTypes: ["snack", "appetizer"],
        pricePerServing: 21.34,
        summary: "In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine.",
        extendedIngredients: [
            { id: 1101, name: "egg", unit: "pcs", aisle: "Egg & Dairy", amount: 1 },
            { id: 1102, name: "milk", amount: 30, unit: "ml", aisle: "Eggs & Dairy" },
            { name: "sugar", id: 1103, aisle: "Baking", amount: 7, unit: "g" },
            { name: "ground nutmeg", id: 1104, aisle: "Baking", amount: 0.5, unit: "g" },
            { name: "white bread", id: 1105, aisle: "Bakery", amount: 2, unit: "slices" },
        ],
    },
    {
        id: 2,
        title: "Sourdough Starter",
        pricePerServing: 11.22,
        dishTypes: ["starter", "appetizer"],
        summary: "Here is how you make it...",
        extendedIngredients: [
            { name: "egg", amount: 2, unit: "pcs", aisle: "Eggs & Dairy", id: 1101 },
            { name: "water activated dry yeast", aisle: "Baking", id: 1106, amount: 0.5, unit: "g" },
            { id: 1, name: "water", aisle: "(home)", amount: 30, unit: "ml" },
            { name: "flour", aisle: "Baking", id: 1107, amount: 15, unit: "g" },
        ],
    },
    {
        id: 100,
        title: "Meat balls",
        dishTypes: ["lunch", "dinner", "main course", "main dish"],
        pricePerServing: 82.41,
        summary: "Preheat an oven to 400 degrees F (200 degrees C).",
        extendedIngredients: [
            { id: 1101, name: "egg", unit: "pcs", aisle: "Eggs & Dairy", amount: 3 },
            { id: 1, aisle: "(home)", name: "water", amount: 50, unit: "ml" },
            { aisle: "Meat", name: "extra lean ground beef", amount: 115, unit: "g", id: 1115 },
            { aisle: "Spices", name: "sea salt", amount: 0.5, unit: "g", id: 1116 },
        ],
    },
    {
        id: 200,
        title: "Chocolate Ice cream",
        dishTypes: ["brunch", "dessert"],
        pricePerServing: 16.42,
        summary: "Here is how you make it...",
        extendedIngredients: [
            { aisle: "Frozen", name: "ice cream", id: 1126, amount: 100, unit: "ml" },
            { aisle: "Baking", name: "black chocolate", id: 1127, amount: 150, unit: "g" },
        ],
    },
];

// Helper function
function getDishDetails(id) {
    return dishesConst.find((d) => d.id === id);
}

// Test data sets
dishesConst.dishes1 = [getDishDetails(2), getDishDetails(100), getDishDetails(200)];
dishesConst.dishes2 = [getDishDetails(2), getDishDetails(100)];

// Deep freeze to prevent modifications
function deepFreeze(object) {
    const propNames = Object.getOwnPropertyNames(object);
    for (const name of propNames) {
        const value = object[name];
        if (value && typeof value === "object") {
            deepFreeze(value);
        }
    }
    return Object.freeze(object);
}

deepFreeze(dishesConst);