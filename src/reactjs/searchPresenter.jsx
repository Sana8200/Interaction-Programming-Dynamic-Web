import { observer } from "mobx-react-lite"; 
import { SearchFormView } from "../views/searchFormView.jsx";
import { SearchResultsView } from "../views/searchResultsView.jsx";
import { SuspenseView } from "../views/suspenseView.jsx";

const Search = observer(
    function SearchRender(props){
        
        const state = props.model.searchResultsPromiseState;
        const dishTypeOptions = ["starter", "main course", "dessert"];

        const searchText = props.model.searchParams.query;
        const searchType = props.model.searchParams.type;

        function handleTextChagneACB(text) {
            props.model.setSearchQuery(text);
        }

        function handleTypeChangeACB(type) {
            props.model.setSearchType(type);
        }

        // Triggering the search 
        function handleSearchACB() {
            props.model.doSearch(props.model.searchParams);
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