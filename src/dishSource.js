
import { PROXY_KEY, PROXY_URL } from "./apiConfig";


// gotResponseACB extracts the JSON body from the response, handling the raw HTTP respons. json() also returns a promise
function gotResponseACB(response){
    // throwing an error if the HTTP status is not 200, otherwise returning the parsed JSON promise
    if (!response.ok){
        throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
}

// keepJustDishesACB extracts just the array of dishes from the API response object
// API returns an object with results property contains teh array of dishes we want, we return only this array 
function keepJustDishesACB(response){
    return response.results;
}


// fetches dishes from the dish soruce API based on the given search parameters
export function searchDishes(searchParams){

    // converting the search parameters object into a query string
    const queryString = new URLSearchParams(searchParams).toString();

    // constructing the final URL : Proxy + API endpoint + query string
    const sourceURL = PROXY_URL + "/recipes/complexSearch" + "?" + queryString;

    // Defining the options (object) for the fetch call with headers 
    const options = {
        headers: {
            "X-DH2642-Key": PROXY_KEY,
            "X-DH2642-Group": "795", 
        }
    };

    // call fetch to make API request. fetch returns a promise, so we chan .then callbacks to process the response
    return fetch(sourceURL, options).then(gotResponseACB).then(keepJustDishesACB);     
}

 

export function getMenuDetails(ids_array){
    // object containing the property name and the id array as value 
    const searchParams = { ids: ids_array.join(',') };
    const queryString = new URLSearchParams(searchParams).toString();
    const sourceURL = PROXY_URL + "/recipes/informationBulk" + "?" + queryString;

    const options = {
        headers: {
            "X-DH2642-Key": PROXY_KEY,
            "X-DH2642-Group": "795", 
        }
    };

    // Result is from API an array of dishes, no need to processing 
    return fetch(sourceURL, options).then(gotResponseACB);
}



// Fetches details of a single dish by its ID (first element of the result arrya)
export function getDishDetails(id){
    function arrayToObjectACB(dishArray){
        return dishArray[0];
   }
    return getMenuDetails([id]).then(arrayToObjectACB);
}