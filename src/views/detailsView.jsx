import "/src/style.css"

// rendering the details of a specific dish 
export function DetailsView(props) {
    // props used : dishData, guests, idDishInMenu, onAddToMenu

    const dish = props.dishData;

    // Callback for ingredients rendering (for rendering each ingredient in the list(name, amount, measurement unit))
    function ingredientCB(ingredient){
        return(
            <div key = {ingredient.id}  className="ingredient">
                <span>{ingredient.name}</span>
                <span>{ingredient.amount}</span>
                <span>{ingredient.unit}</span>
            </div>
        );
    }

    // event handler for clicking adding to menu
    function handleAddToMenuACB(){
        props.onAddToMenu();
    };


    return (
        <div className="details-view">

            {/* Action Buttons (Add/Cancel) */}
            <div className="button-details">
                {/* if the dish is already in the menu, the add to menu button disabled, otherwise add to menu */}
                <button disabled={props.isDishInMenu} onClick={handleAddToMenuACB}>
                    Add to menu
                </button>
                <button onClick={() => window.location.hash = "#/search"}>
                    Cancel
                </button>
            </div>

            {/* Dish Header: Title */}
            <h2>{dish.title}</h2>

            {/* Top Section: Image and Price Side-by-Side */}
            <div className="top-section">
                <img 
                    src={dish.image}
                    alt={dish.title}
                    height={150}
                />
                
                {/* Dish prise shown for one person, but also for all guests, ingredients quantities shown per person 
                 // (use a different prop name for this same value in detailsView, sidebarView, summeryView to illustrate that views are independent of each other) */}
                <div className="details-price bordered-box">
                    <p>Price: {dish.pricePerServing.toFixed(2)} per serving</p>
                    <p>
                        Total for {props.guests} guests: 
                        {(dish.pricePerServing * props.guests).toFixed(2)}
                    </p>
                </div>
            </div>


            {/* Ingredients List */}
            <div className="ingredients-details bordered-box">
                <h3>Ingredients</h3>
                {dish.extendedIngredients.map(ingredientCB)}
            </div>

            {/* Cooking Instructions */}
            <div className="details-instructions bordered-box">
                <h3>Instructions</h3>
                <p>{dish.instructions}</p>
            </div>

            {/* Link to the dish source website for more information */}
            <a href={dish.sourceUrl} target="_blank" rel="noopener noreferrer">
                    More information
            </a>

        </div>
    );
}