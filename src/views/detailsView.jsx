import "../style/style.css";

export function DetailsView(props) {
    const { dishData: dish, guests, isDishInMenu, onAddToMenu } = props;

    return (
        <div className="details-view">
            {/* Action Buttons */}
            <div className="button-details">
                <button disabled={isDishInMenu} onClick={onAddToMenu}>
                    Add to menu
                </button>
                <button onClick={() => window.location.hash = "#/search"}>
                    Cancel
                </button>
            </div>

            {/* Dish Title */}
            <h2>{dish.title}</h2>

            {/* Image and Price */}
            <div className="top-section">
                <img src={dish.image} alt={dish.title} height={150} />
                <div className="details-price bordered-box">
                    <p>Price: {dish.pricePerServing.toFixed(2)} SEK per serving</p>
                    <p>Total for {guests} guests: {(dish.pricePerServing * guests).toFixed(2)} SEK</p>
                </div>
            </div>

            {/* Ingredients */}
            <div className="ingredients-details bordered-box">
                <h3>Ingredients</h3>
                {dish.extendedIngredients.map(ingredient => (
                    <div key={ingredient.id} className="ingredient">
                        <span>{ingredient.name}</span>
                        <span>{ingredient.amount}</span>
                        <span>{ingredient.unit}</span>
                    </div>
                ))}
            </div>

            {/* Instructions */}
            <div className="details-instructions bordered-box">
                <h3>Instructions</h3>
                <p>{dish.instructions}</p>
            </div>

            {/* Source Link */}
            <a href={dish.sourceUrl} target="_blank" rel="noopener noreferrer">
                More information
            </a>
        </div>
    );
}
