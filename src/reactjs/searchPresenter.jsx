import { observer } from "mobx-react-lite";
import { useState, useEffect, useRef } from "react";
import { SearchFormView } from "../views/searchFormView.jsx";
import { SearchResultsView } from "../views/searchResultsView.jsx";
import { SuspenseView } from "../views/suspenseView.jsx";

const DISH_TYPES = ["starter", "main course", "dessert"];
const DEBOUNCE_MS = 1000;

export const Search = observer(function Search(props) {
    const { model } = props;
    const state = model.searchResultsPromiseState;

    const [searchText, setSearchText] = useState("");
    const [searchType, setSearchType] = useState("");
    const debounceTimer = useRef(null);

    // Debounced search
    useEffect(() => {
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(() => {
            model.doSearch({ query: searchText, type: searchType });
        }, DEBOUNCE_MS);

        return () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
        };
    }, [searchText, searchType, model]);

    function handleSearch() {
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }
        model.doSearch({ query: searchText, type: searchType });
    }

    function handleDishClick(dish) {
        model.setCurrentDishId(dish.id);
    }

    return (
        <div>
            <SearchFormView
                dishTypeOptions={DISH_TYPES}
                text={searchText}
                type={searchType}
                onTextChange={setSearchText}
                onTypeChange={setSearchType}
                onSearchClick={handleSearch}
            />

            {state.data ? (
                <SearchResultsView
                    searchResults={state.data}
                    onDishClick={handleDishClick}
                />
            ) : (
                <SuspenseView
                    promise={state.promise}
                    error={state.error}
                    onStartSearch={handleSearch}
                />
            )}
        </div>
    );
});
