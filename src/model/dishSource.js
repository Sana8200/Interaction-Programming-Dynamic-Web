/**
 * Dish Source
 * API calls to Spoonacular via proxy
 */
import { PROXY_KEY, PROXY_URL } from "../config/apiConfig.js";

const API_OPTIONS = {
    headers: {
        "X-DH2642-Key": PROXY_KEY,
        "X-DH2642-Group": "795",
    }
};

/**
 * Handle HTTP response
 */
function handleResponse(response) {
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
}

/**
 * Search dishes by query and type
 * @param {object} searchParams - { query, type }
 * @returns {Promise<Array>} Array of dish results
 */
export function searchDishes(searchParams) {
    const queryString = new URLSearchParams(searchParams).toString();
    const url = `${PROXY_URL}/recipes/complexSearch?${queryString}`;

    return fetch(url, API_OPTIONS)
        .then(handleResponse)
        .then(response => response.results);
}

/**
 * Get detailed info for multiple dishes
 * @param {Array<number>} ids - Array of dish IDs
 * @returns {Promise<Array>} Array of detailed dish objects
 */
export function getMenuDetails(ids) {
    const queryString = new URLSearchParams({ ids: ids.join(',') }).toString();
    const url = `${PROXY_URL}/recipes/informationBulk?${queryString}`;

    return fetch(url, API_OPTIONS).then(handleResponse);
}

/**
 * Get detailed info for a single dish
 * @param {number} id - Dish ID
 * @returns {Promise<object>} Detailed dish object
 */
export function getDishDetails(id) {
    return getMenuDetails([id]).then(dishes => dishes[0]);
}
