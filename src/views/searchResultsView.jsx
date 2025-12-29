import "/src/style/style.css";

// Each object of searchResults prop is a dish search API result. Search results don't contain the full dish info, only name, id, image URL,...
export function SearchResultsView(props) {
    // props used: searchResults, onDishClick
    // This creates HTML for one dish search result
    function searchResultCB(dish) {

        // event handler for dish click 
        function handleSearchResultsACB() {
            props.onDishClick(dish);
            window.location.hash = "#/details";
        }

        // Each dish is rendered in a span, which contains an image and a DIV for the dish name 
        return (
            // the key prop is needed by React when rendering arrays 
            <span key={dish.id}
                className="search-result"
                onClick={handleSearchResultsACB}>

                <img src={dish.image}
                    height={100}
                    alt={dish.title}
                />

                <div>
                    {dish.title}
                </div>
            </span>
        );
    }
    return (
        // looping through the searchResults array and run the function for each element
        <div className="search-results-container">
            {props.searchResults.map(searchResultCB)}
        </div>
    );
}
