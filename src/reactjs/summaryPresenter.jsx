import { SummaryView } from "/src/views/summaryView.jsx";    // importing the view
import { observer } from "mobx-react-lite";

import { shoppingList } from "../utilities.js";


const Summary = observer(             // needed for the presenter to update (its view) when relevant parts of the model change
    function SummaryRender(props){

        const peopleProp = props.model.numberOfGuests;   // getting the number of guests from the model 
        const ingredientsProp = shoppingList(props.model.dishes); // passes dishes array from the model (for calculating ingredients props from shoppingList)

        return <SummaryView people={peopleProp}    // Render SummaryView, passing the data as props 
                            ingredients={ingredientsProp}
               />;   
    }
);

export { Summary };