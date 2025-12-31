import { sortIngredients } from "../utilities.js";
import "../style/style.css";

export function SummaryView(props) {
    const { people, ingredients } = props;

    return (
        <div className="summary-view">
            Summary for <span title="nr guests">{people}</span>
            {people === 1 ? " person" : " persons"}:

            <button
                className="button button-back"
                onClick={() => window.location.hash = "#/search"}
            >
                Back to Search
            </button>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Aisle</th>
                        <th>Quantity</th>
                        <th>Unit</th>
                    </tr>
                </thead>
                <tbody>
                    {sortIngredients(ingredients).map(ingredient => (
                        <tr key={ingredient.id}>
                            <td>{ingredient.name}</td>
                            <td>{ingredient.aisle}</td>
                            <td className="align-right">
                                {(ingredient.amount * people).toFixed(2)}
                            </td>
                            <td>{ingredient.unit}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
