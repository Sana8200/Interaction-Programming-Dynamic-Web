import "../style/style.css";

export function SearchFormView(props) {
    const { dishTypeOptions, text, type, onTextChange, onTypeChange, onSearchClick } = props;

    return (
        <div className="search-boxes">
            <input
                value={text || ""}
                onChange={(e) => onTextChange(e.target.value)}
                placeholder="🔍 Search..."
            />

            <select value={type || ""} onChange={(e) => onTypeChange(e.target.value)}>
                <option value="">Choose:</option>
                {dishTypeOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>

            <button onClick={onSearchClick}>Search!</button>
            <button onClick={() => window.location.hash = "#/summary"}>Summary</button>
        </div>
    );
}
