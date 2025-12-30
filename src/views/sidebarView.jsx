import { dishType, menuPrice, sortDishes } from "/src/utilities.js";
import "/src/style/style.css";


export function SidebarView(props) {
    // props: number, dishes, onNumberChange, onSelectedDish, onSelectedRemoveDish

    // Event handler for - button 
    function handleMinusACB() {
        console.log("Decreasing the number of guests:", props.number - 1);
        props.onNumberChange(props.number - 1);
    }

    // Event handler for + button 
    function handlePlusACB() {
        console.log("Increasing the number of guests:", props.number + 1);
        props.onNumberChange(props.number + 1);
    }

    return (
        <div className="sidebar-box">
            {/* minus button disables when the number is excatly equals to 1 */}
            <button disabled={props.number === 1} onClick={handleMinusACB}> - </button> 
            {props.number}
            <button onClick={handlePlusACB}> + </button>

            {/* Dish table */}
            <table >
                <tbody>
                    {   // mapping dish array to table rows after sorting 
                        sortDishes(props.dishes)?.map(dishTableRowCB)
                    }
                    <tr>
                        <td></td>
                        <td >Total:</td>
                        <td></td>
                        <td className="align-right">
                            {/* Total price, scaled by guest count */}
                            {(menuPrice(props.dishes) * props.number).toFixed(2)} SEK
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );

    /* Array Rendering Callback */
    // A template for each dish row 
    function dishTableRowCB(dish) {

        // Nested handler for dish link click
        function handleDishLinkACB() {
            props.onSelectedDish(dish);
        }

        // Nested handler for X button click 
        function handleRemoveDishACB() {
            props.onSelectedRemoveDish(dish);
        }

        return (
            // Use dish ID as the unique react key
            <tr key={dish.id}>
                <td>
                    {/* X button for deleting a dish */}
                    <button onClick={handleRemoveDishACB}>
                        X
                    </button>
                </td>
                <td>
                    {/* dish name as a hyperlink using # as href, hyperlink destination for single page application */}
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
