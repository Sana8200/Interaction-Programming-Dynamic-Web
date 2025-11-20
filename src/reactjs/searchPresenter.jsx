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

        /* Custom Event Handlers */
        // pass Set search text as an ACB 
        function handleTextChagneACB(text) {
            props.model.setSearchQuery(text);
        }

        // pass set search dish type 
        function handleTypeChangeACB(type) {
            props.model.setSearchType(type);

        }

        // pass search now! 
        /* (this custom even has no parameter, 
           because it looks inside props.model.searchParams (where query and type are already stroed) 
           and it passes those stored parameters to props.model.doSearch ) */
        function handleSearchACB() {
            props.model.doSearch(props.model.searchParams);

        }

        // this custom event handler will trigger the current idsh side effect, which will fill in the current dish promise state 
        function handleDishClickACB(dish) {
            props.model.setCurrentDishId(dish.id);    
        }

        // SearchFormView always visible, SuspenseView or SearchResultsView rendered only if search results promise state data is truthy
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
                                               error = {state.error} /> 
                            || <SearchResultsView searchResults = {state.data}
                                                  onDishClick = {handleDishClickACB} /> 
                }
            </div>
        );
    }
);

export { Search };


