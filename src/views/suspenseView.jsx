import "../style/style.css";
import dinnerImage from "../style/dinner_table.jpg";

export function SuspenseView(props) {
    const { promise, error, onStartSearch } = props;

    // Error state
    if (error) {
        return (
            <div className="suspense-error">
                <span>{error.toString()}</span>
            </div>
        );
    }

    // Loading state
    if (promise && !error) {
        return (
            <div className="suspense-loading">
                <img src="https://brfenergi.se/iprog/loading.gif" alt="Loading..." />
            </div>
        );
    }

    // Welcome state (no search started)
    return (
        <div className="welcome-container">
            <div className="welcome-text">
                <h1>Welcome to Dinner Planner! 🍽️</h1>
                <p>
                    Discover delicious recipes, plan your menu, and generate your
                    shopping list automatically in{" "}
                    <a href="#/summary" className="summery-pointer">Summary</a>.
                </p>
                <p className="welcome-hint">
                    Use the search bar above or select a dish type to get started!
                </p>
            </div>
            <img
                onClick={onStartSearch}
                src={dinnerImage}
                alt="Dinner Table"
                className="welcome-image"
                style={{ cursor: "pointer" }}
                title="Click to see some food!"
            />
            <div style={{ fontSize: "0.8rem", color: "#888", marginTop: "5px" }}>
                Image by Freepik
            </div>
        </div>
    );
}