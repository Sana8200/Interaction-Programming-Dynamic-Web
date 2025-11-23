import "/src/style.css"

export function SearchResultsView(props) {
    // props used: searchResults, onDishClick
    function searchResultCB(dish) {

        function handleSearchResultsACB() {
            props.onDishClick(dish);
            window.location.hash = "#/details";
        }

        // Each dish is rendered in a span, which contains an image and a DIV for the dish name 
        return (
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
        <div className="search-results-container">
            {props.searchResults.map(searchResultCB)}
        </div>
    );
}
