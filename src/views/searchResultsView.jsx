import "../style/style.css";

export function SearchResultsView(props) {
    const { searchResults, onDishClick } = props;

    function handleDishClick(dish) {
        onDishClick(dish);
        window.location.hash = "#/details";
    }

    return (
        <div className="search-results-container">
            {searchResults.map(dish => (
                <span
                    key={dish.id}
                    className="search-result"
                    onClick={() => handleDishClick(dish)}
                >
                    <img src={dish.image} height={100} alt={dish.title} />
                    <div>{dish.title}</div>
                </span>
            ))}
        </div>
    );
}
