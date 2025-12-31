import { observer } from "mobx-react-lite"; 
import { SearchFormView } from "../views/searchFormView.jsx";
import { SearchResultsView } from "../views/searchResultsView.jsx";
import { SuspenseView } from "../views/suspenseView.jsx";
import { useState, useEffect, useRef } from "react";

const Search = observer(
    function SearchRender(props){
        
        const state = props.model.searchResultsPromiseState;
        const dishTypeOptions = ["starter", "main course", "dessert"];

        // Component state for search parameters (moved from mode to presenter to use useState and useEffect)
        const [searchText, setSearchText] = useState("");
        const [searchType, setSearchType] = useState("");

        // Ref to store the timeout ID (persists across renders without causing re-render)
        const debounceTimer = useRef(null);

        // Debounced search effect - runs when searchText or searchType changes
        useEffect(() => {
            // Clearning existence timers 
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }

            // Set new timer - wait 1 second before searching
            debounceTimer.current = setTimeout(() => {
                props.model.doSearch({ query: searchText, type: searchType });
            }, 1000);

            // clear timer if component unmounts or dependencies change
            return () => {
                if (debounceTimer.current) {
                    clearTimeout(debounceTimer.current);
                }
            };
        }, [searchText, searchType]);  // Re-run when text or type changes, this is dependency parameters, so if these changes, re run 

        
        function handleTextChagneACB(text) {
            setSearchText(text);
        }

        function handleTypeChangeACB(type) {
            setSearchType(type);
        }

        // Manual search (button click) - immediate, no debounce
        function handleSearchACB() {
            // Clear any pending debounced search
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
            props.model.doSearch({ query: searchText, type: searchType });
        }


        function handleDishClickACB(dish) {
            props.model.setCurrentDishId(dish.id);    
        }

        return (
            <div>
                <SearchFormView dishTypeOptions = {dishTypeOptions}
                                text = {searchText}
                                type = {searchType}
                                onTextChange = {handleTextChagneACB}
                                onTypeChange = {handleTypeChangeACB}
                                onSearchClick = {handleSearchACB}
                />
      
                { !state.data && <SuspenseView promise = {state.promise} 
                                               error = {state.error} 
                                               onStartSearch = {handleSearchACB} /> 
                            || <SearchResultsView searchResults = {state.data}
                                                  onDishClick = {handleDishClickACB} /> 
                }
            </div>
        );
    }
);

export { Search };