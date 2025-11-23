import { dishType, menuPrice, sortDishes } from "/src/utilities.js";
import "/src/style.css"


export function SidebarView(props) {
    // props: number, dishes, onNumberChange, onSelectedDish, onSelectedRemoveDish

    function handleMinusACB() {
        console.log("Decreasing the number of guests:", props.number - 1);
        props.onNumberChange(props.number - 1);
    }
    function handlePlusACB() {
        console.log("Increasing the number of guests:", props.number + 1);
        props.onNumberChange(props.number + 1);
    }

    return (
        <div className="sidebar-box">
            {/* minus button disables when the number is excatly equals to 1 */}
            <button
                disabled={props.number === 1}
                onClick={handleMinusACB}>
                -
            </button>

            {props.number}

            <button
                onClick={handlePlusACB}>
                +
            </button>

            {/* Dish table */}
            <table >
                <tbody>
                    {
                        sortDishes(props.dishes)?.map(dishTableRowCB)
                    }
                    <tr>
                        <td></td>
                        <td >Total:</td>
                        <td></td>
                        <td className="align-right">
                            {(menuPrice(props.dishes) * props.number).toFixed(2)} SEK
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );


    /* Array Rendering Callback */
    function dishTableRowCB(dish) {

        function handleDishLinkACB() {
            props.onSelectedDish(dish);
        }
        function handleRemoveDishACB() {
            props.onSelectedRemoveDish(dish);
        }

        return (
            // Use dish ID as the unique react key
            <tr key={dish.id}>
                <td>
                    <button onClick={handleRemoveDishACB}>
                        X
                    </button>
                </td>
                <td>
                    {/* fire a custom event, the parameter is dish as object */}
                    <a href="#/details" onClick={handleDishLinkACB}>
                        {dish.title}
                    </a>
                </td>
                <td>
                    {dishType(dish)}
                </td>
                <td className="align-right">
                    {/* Price per dish, scaled by guest count */}
                    {(dish.pricePerServing * props.number).toFixed(2)} SEK
                </td>
            </tr>
        );
    }
}
