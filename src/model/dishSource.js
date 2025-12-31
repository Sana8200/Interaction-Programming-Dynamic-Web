import { PROXY_KEY, PROXY_URL } from "./apiConfig";

// Callback to handle HTTP response and parse JSON.
function gotResponseACB(response) {
    // Throw an error if HTTP status is not successful (200-299 range)
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
}

// Callback to extract the relevant array of dishes from the API response object.
function keepJustDishesACB(response) {
    return response.results;
}

// Fetches dishes from the Spoonacular API based on search parameters.
export function searchDishes(searchParams) {

    // Convert search parameters object to a URL query string
    const queryString = new URLSearchParams(searchParams).toString();

    // Construct the full URL for complex search
    const sourceURL = PROXY_URL + "/recipes/complexSearch" + "?" + queryString;

    // Define mandatory headers for the fetch call
    const options = {
        headers: {
            "X-DH2642-Key": PROXY_KEY,
            "X-DH2642-Group": "795",
        }
    };

    // Chain promises: fetch -> check response -> parse JSON -> extract results array
    return fetch(sourceURL, options).then(gotResponseACB).then(keepJustDishesACB);
}

// Fetches bulk details for an array of dish IDs.
export function getMenuDetails(ids_array) {
    // Create query parameter from the array of IDs
    const searchParams = { ids: ids_array.join(',') };
    const queryString = new URLSearchParams(searchParams).toString();
    const sourceURL = PROXY_URL + "/recipes/informationBulk" + "?" + queryString;

    const options = {
        headers: {
            "X-DH2642-Key": PROXY_KEY,
            "X-DH2642-Group": "795",
        }
    };

    // Fetches the array of detailed dish objects
    return fetch(sourceURL, options).then(gotResponseACB);
}

// Fetches full details for a single dish ID.
export function getDishDetails(id) {
    // Callback to return the single dish object (the first element of the bulk response array)
    function arrayToObjectACB(dishArray) {
        return dishArray[0];
    }
    return getMenuDetails([id]).then(arrayToObjectACB);
}