import { dishType, menuPrice, sortDishes } from "../utilities.js";
import "../style/style.css";

export function SidebarView(props) {
    const { number, dishes, onNumberChange, onSelectedDish, onSelectedRemoveDish } = props;

    return (
        <div className="sidebar-box">
            {/* Guest Counter */}
            <button disabled={number === 1} onClick={() => onNumberChange(number - 1)}>
                -
            </button>
            {number}
            <button onClick={() => onNumberChange(number + 1)}>+</button>

            {/* Dish Table */}
            <table>
                <tbody>
                    {sortDishes(dishes).map(dish => (
                        <tr key={dish.id}>
                            <td>
                                <button onClick={() => onSelectedRemoveDish(dish)}>X</button>
                            </td>
                            <td>
                                <a
                                    href="#/details"
                                    onClick={() => onSelectedDish(dish)}
                                >
                                    {dish.title}
                                </a>
                            </td>
                            <td>{dishType(dish)}</td>
                            <td className="align-right">
                                {(dish.pricePerServing * number).toFixed(2)} SEK
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td></td>
                        <td>Total:</td>
                        <td></td>
                        <td className="align-right">
                            {(menuPrice(dishes) * number).toFixed(2)} SEK
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
