import "/src/style/style.css";


// This Form should remeber the vlaues when the view is hidden and shown again to the user 
export function SearchFormView(props) {
    // props used : dishTypeOptions, text, type, onTextChange, onTypeChange, onSearchClick

    function dishTypeOptionsCB(optionStrng) {
        return <option key={optionStrng} value={optionStrng}>{optionStrng}</option>;
    }

    // Event Handler 
    function handleTextChagneACB(event) {
        props.onTextChange(event.target.value);
    }

    function handleTypeChangeACB(event) {
        props.onTypeChange(event.target.value);
    }

    function handleSearchACB(event) {
        props.onSearchClick();
    }

    // someProp || "" show the prop if it's defiend, or an empty string otherwise 
    return (
        <div className="search-boxes">
            <input value={props.text || ""}
                onChange={handleTextChagneACB}
                placeholder="🔍 Search..." />

            <select value={props.type || ""}
                onChange={handleTypeChangeACB}>

                <option value="">Choose:</option>
                {props.dishTypeOptions.map(dishTypeOptionsCB)}
            </select>

            <button onClick={handleSearchACB}>
                Search!
            </button>

            <button onClick={() => window.location.hash = "#/summary"}>
                Summary
            </button>

        </div>
    );

}